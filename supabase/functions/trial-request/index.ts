import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts'
import { getUserFromToken, createSupabaseClient } from '../_shared/supabase.ts'
import { sendTrialRequestEmail } from '../_shared/email.ts'

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    // Get user from token
    const authHeader = req.headers.get('Authorization')
    const user = await getUserFromToken(authHeader)

    if (!user || !user.email) {
      return errorResponse('Unauthorized', 401)
    }

    // Parse request body
    const { reason } = await req.json()

    if (!reason || reason.trim().length < 20) {
      return errorResponse('Please provide a detailed reason (minimum 20 characters)')
    }

    const supabase = createSupabaseClient()

    // Check for existing pending request (rate limiting)
    const { data: existingRequest } = await supabase
      .from('trial_requests')
      .select('*')
      .eq('user_email', user.email)
      .eq('status', 'pending')
      .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
      .single()

    if (existingRequest) {
      return errorResponse(
        'You already have a pending trial request. Please wait for a response before submitting another.'
      )
    }

    // Create trial request
    const { error: insertError } = await supabase
      .from('trial_requests')
      .insert({
        user_email: user.email,
        user_id: user.id,
        reason: reason.trim(),
        status: 'pending',
      })

    if (insertError) {
      console.error('Database error:', insertError)
      return errorResponse('Failed to submit trial request')
    }

    // Send email notification to admin
    const emailSent = await sendTrialRequestEmail(user.email, reason.trim())

    if (!emailSent) {
      console.error('Failed to send admin notification email')
      // Don't fail the request, just log the error
    }

    return jsonResponse({
      success: true,
      message: 'Trial request submitted successfully',
    })
  } catch (error) {
    console.error('Trial request error:', error)
    return errorResponse('Failed to submit trial request')
  }
})
