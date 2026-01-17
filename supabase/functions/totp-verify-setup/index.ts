import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts'
import { decrypt } from '../_shared/encryption.ts'
import { getUserFromToken, createSupabaseClient } from '../_shared/supabase.ts'

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    // Get user from token
    const authHeader = req.headers.get('Authorization')
    const user = await getUserFromToken(authHeader)

    if (!user) {
      return errorResponse('Unauthorized', 401)
    }

    // Parse request body
    const { token } = await req.json()

    if (!token || !/^\d{6}$/.test(token)) {
      return errorResponse('Invalid token format')
    }

    const supabase = createSupabaseClient()

    // Get the setup token for this user
    const { data: setupToken, error: fetchError } = await supabase
      .from('totp_setup_tokens')
      .select('*')
      .eq('user_id', user.id)
      .single()

    if (fetchError || !setupToken) {
      return errorResponse('No setup token found. Please restart setup.')
    }

    // Check if expired
    if (new Date(setupToken.expires_at) < new Date()) {
      // Delete expired token
      await supabase
        .from('totp_setup_tokens')
        .delete()
        .eq('user_id', user.id)

      return errorResponse('Setup token expired. Please restart setup.')
    }

    // Decrypt the secret
    const secret = await decrypt(setupToken.totp_secret)

    // Verify the token
    const isValid = await verifyTOTPToken(secret, token)

    if (!isValid) {
      return errorResponse('Invalid verification code')
    }

    // Token is valid! Move secret to user profile and enable TOTP
    // Also set trial dates
    const trialDays = parseInt(Deno.env.get('TRIAL_DURATION_DAYS') || '3')
    const trialStart = new Date()
    const trialEnd = new Date(Date.now() + trialDays * 24 * 60 * 60 * 1000)

    const { error: updateError } = await supabase
      .from('profiles')
      .update({
        totp_secret: setupToken.totp_secret,
        totp_enabled: true,
        trial_start_date: trialStart.toISOString(),
        trial_expiration_date: trialEnd.toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Profile update error:', updateError)
      return errorResponse('Failed to enable TOTP')
    }

    // Delete the setup token
    await supabase
      .from('totp_setup_tokens')
      .delete()
      .eq('user_id', user.id)

    return jsonResponse({
      success: true,
    })
  } catch (error) {
    console.error('TOTP verify setup error:', error)
    return errorResponse('Failed to verify TOTP')
  }
})

/**
 * Verify TOTP token using a simple implementation
 * Since god_crypto's TOTP might have issues, let's implement manually
 */
async function verifyTOTPToken(secret: string, token: string): Promise<boolean> {
  try {
    // Simple TOTP verification
    // Time window: ±1 (30-second window = ±30 seconds)
    const window = parseInt(Deno.env.get('TOTP_WINDOW') || '1')
    const currentTime = Math.floor(Date.now() / 1000)
    const timeStep = 30 // 30-second time step

    // Check current time and ±window
    for (let i = -window; i <= window; i++) {
      const time = currentTime + (i * timeStep)
      const generatedToken = await generateTOTPForTime(secret, time)

      if (generatedToken === token) {
        return true
      }
    }

    return false
  } catch (error) {
    console.error('TOTP verification error:', error)
    return false
  }
}

/**
 * Generate TOTP for a specific time
 */
async function generateTOTPForTime(secret: string, time: number): Promise<string> {
  // Decode base32 secret
  const key = base32Decode(secret)

  // Calculate counter (time / 30)
  const counter = Math.floor(time / 30)

  // Generate HMAC
  const hmac = await generateHMAC(key, counter)

  // Extract 6-digit code
  return extractCode(hmac, 6)
}

/**
 * Base32 decode
 */
function base32Decode(encoded: string): Uint8Array {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
  let bits = ''

  for (const char of encoded.toUpperCase()) {
    const val = alphabet.indexOf(char)
    if (val === -1) continue
    bits += val.toString(2).padStart(5, '0')
  }

  const bytes = []
  for (let i = 0; i + 8 <= bits.length; i += 8) {
    bytes.push(parseInt(bits.substring(i, i + 8), 2))
  }

  return new Uint8Array(bytes)
}

/**
 * Generate HMAC-SHA1
 */
async function generateHMAC(key: Uint8Array, counter: number): Promise<Uint8Array> {
  // Convert counter to 8-byte array (big-endian)
  const counterBytes = new Uint8Array(8)
  for (let i = 7; i >= 0; i--) {
    counterBytes[i] = counter & 0xff
    counter >>= 8
  }

  // Import key for HMAC
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  )

  // Generate HMAC
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, counterBytes)

  return new Uint8Array(signature)
}

/**
 * Extract TOTP code from HMAC
 */
function extractCode(hmac: Uint8Array, digits: number): string {
  // Dynamic truncation
  const offset = hmac[hmac.length - 1] & 0x0f

  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)

  // Return last 'digits' digits
  const otp = (code % Math.pow(10, digits)).toString().padStart(digits, '0')

  return otp
}
