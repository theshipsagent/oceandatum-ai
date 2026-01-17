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

    // Get user profile
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()

    if (fetchError || !profile) {
      return errorResponse('Profile not found')
    }

    // Check if TOTP is enabled
    if (!profile.totp_enabled || !profile.totp_secret) {
      return errorResponse('TOTP not enabled for this account')
    }

    // Check trial expiration
    if (profile.is_trial_user && profile.trial_expiration_date) {
      const expirationDate = new Date(profile.trial_expiration_date)
      if (expirationDate < new Date()) {
        return jsonResponse({
          success: false,
          trial_expired: true,
          error: 'Trial period has expired',
        })
      }
    }

    // Decrypt the secret
    const secret = await decrypt(profile.totp_secret)

    // Verify the token
    const isValid = await verifyTOTPToken(secret, token)

    if (!isValid) {
      return errorResponse('Invalid authentication code')
    }

    // Success!
    return jsonResponse({
      success: true,
      trial_expired: false,
    })
  } catch (error) {
    console.error('TOTP validate login error:', error)
    return errorResponse('Failed to validate TOTP')
  }
})

/**
 * Verify TOTP token
 */
async function verifyTOTPToken(secret: string, token: string): Promise<boolean> {
  try {
    const window = parseInt(Deno.env.get('TOTP_WINDOW') || '1')
    const currentTime = Math.floor(Date.now() / 1000)
    const timeStep = 30

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
  const key = base32Decode(secret)
  const counter = Math.floor(time / 30)
  const hmac = await generateHMAC(key, counter)
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
  const counterBytes = new Uint8Array(8)
  for (let i = 7; i >= 0; i--) {
    counterBytes[i] = counter & 0xff
    counter >>= 8
  }

  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-1' },
    false,
    ['sign']
  )

  const signature = await crypto.subtle.sign('HMAC', cryptoKey, counterBytes)
  return new Uint8Array(signature)
}

/**
 * Extract TOTP code from HMAC
 */
function extractCode(hmac: Uint8Array, digits: number): string {
  const offset = hmac[hmac.length - 1] & 0x0f

  const code =
    ((hmac[offset] & 0x7f) << 24) |
    ((hmac[offset + 1] & 0xff) << 16) |
    ((hmac[offset + 2] & 0xff) << 8) |
    (hmac[offset + 3] & 0xff)

  return (code % Math.pow(10, digits)).toString().padStart(digits, '0')
}
