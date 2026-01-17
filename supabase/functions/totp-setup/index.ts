import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { encode as base32encode } from 'https://deno.land/std@0.224.0/encoding/base32.ts'
import { handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts'
import { encrypt } from '../_shared/encryption.ts'
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

    // Generate a random secret (20 bytes = 160 bits)
    const secret = crypto.getRandomValues(new Uint8Array(20))
    const secretBase32 = base32encode(secret)

    // Encrypt the secret before storing
    const encryptedSecret = await encrypt(secretBase32)

    // Get issuer name from env
    const issuer = Deno.env.get('TOTP_ISSUER') || 'Datum'

    // Create TOTP URI for QR code
    const totpUri = `otpauth://totp/${issuer}:${user.email}?secret=${secretBase32}&issuer=${issuer}`

    // Generate QR code as data URL
    const qrCodeDataUrl = await generateQRCode(totpUri)

    // Store encrypted secret in temporary table (expires in 15 minutes)
    const supabase = createSupabaseClient()
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString()

    // Delete any existing setup tokens for this user
    await supabase
      .from('totp_setup_tokens')
      .delete()
      .eq('user_id', user.id)

    // Insert new setup token
    const { error: insertError } = await supabase
      .from('totp_setup_tokens')
      .insert({
        user_id: user.id,
        totp_secret: encryptedSecret,
        expires_at: expiresAt,
      })

    if (insertError) {
      console.error('Database error:', insertError)
      return errorResponse('Failed to create setup token')
    }

    return jsonResponse({
      success: true,
      qrCode: qrCodeDataUrl,
      secret: secretBase32,
    })
  } catch (error) {
    console.error('TOTP setup error:', error)
    return errorResponse('Failed to setup TOTP')
  }
})

/**
 * Generate QR code as data URL
 * Uses a QR code generation library
 */
async function generateQRCode(data: string): Promise<string> {
  try {
    // Use QR code API service
    const qrApiUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(data)}`

    // Fetch the QR code image
    const response = await fetch(qrApiUrl)
    const arrayBuffer = await response.arrayBuffer()

    // Convert to base64
    const base64 = btoa(String.fromCharCode(...new Uint8Array(arrayBuffer)))

    // Return as data URL
    return `data:image/png;base64,${base64}`
  } catch (error) {
    console.error('QR code generation error:', error)
    throw new Error('Failed to generate QR code')
  }
}
