import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts'
import { getUserFromToken, createSupabaseClient } from '../_shared/supabase.ts'
import { sendTrialApprovalEmail } from '../_shared/email.ts'

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    // Get user from token (must be admin)
    const authHeader = req.headers.get('Authorization')
    const user = await getUserFromToken(authHeader)

    if (!user || !user.email) {
      return errorResponse('Unauthorized', 401)
    }

    // Check if user is admin
    const adminEmail = Deno.env.get('ADMIN_EMAIL')
    if (user.email !== adminEmail) {
      return errorResponse('Forbidden: Admin access required', 403)
    }

    // Parse request body
    const { email, days } = await req.json()

    if (!email) {
      return errorResponse('Email is required')
    }

    const trialDays = days || parseInt(Deno.env.get('TRIAL_DURATION_DAYS') || '3')

    const supabase = createSupabaseClient()

    // Call the reset_user_trial database function
    const { data, error } = await supabase.rpc('reset_user_trial', {
      target_email: email,
      trial_days: trialDays,
    })

    if (error) {
      console.error('Database error:', error)
      return errorResponse('Failed to reset trial')
    }

    if (!data.success) {
      return errorResponse(data.error || 'Failed to reset trial')
    }

    // Send approval email to user
    const expirationDate = new Date(data.trial_end).toLocaleString()
    const emailSent = await sendTrialApprovalEmail(email, expirationDate)

    if (!emailSent) {
      console.error('Failed to send approval email')
      // Don't fail the request, just log the error
    }

    return jsonResponse({
      success: true,
      message: 'Trial reset successfully',
      data: {
        email: data.email,
        trial_start: data.trial_start,
        trial_end: data.trial_end,
        email_sent: emailSent,
      },
    })
  } catch (error) {
    console.error('Admin reset trial error:', error)
    return errorResponse('Failed to reset trial')
  }
})
