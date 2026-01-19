import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { handleCors, jsonResponse, errorResponse } from '../_shared/cors.ts'
import { createSupabaseClient, getUserFromToken } from '../_shared/supabase.ts'

// Admin email that's allowed to create users
const ADMIN_EMAIL = 'wsd@oceandatum.ai'

serve(async (req: Request) => {
  // Handle CORS
  const corsResponse = handleCors(req)
  if (corsResponse) return corsResponse

  try {
    // Verify admin authentication
    const authHeader = req.headers.get('Authorization')
    const user = await getUserFromToken(authHeader)

    if (!user || user.email !== ADMIN_EMAIL) {
      return errorResponse('Unauthorized: Admin access required', 403)
    }

    // Parse request body
    const { email, trialDays } = await req.json()

    if (!email || !email.includes('@')) {
      return errorResponse('Valid email is required')
    }

    const days = parseInt(trialDays) || 3

    // Create Supabase admin client (with service role key)
    const supabase = createSupabaseClient()

    // Generate a temporary password
    const tempPassword = 'TempPass' + crypto.randomUUID().substring(0, 8)

    // Create the user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
      email: email,
      password: tempPassword,
      email_confirm: true,
    })

    if (authError) {
      console.error('Auth error:', authError)
      return errorResponse(`Failed to create user: ${authError.message}`)
    }

    if (!authData.user) {
      return errorResponse('User creation failed: No user data returned')
    }

    // Calculate trial dates
    const trialStartDate = new Date().toISOString()
    const trialExpirationDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString()

    // Update the user's profile with trial information
    const { error: profileError } = await supabase
      .from('profiles')
      .update({
        trial_start_date: trialStartDate,
        trial_expiration_date: trialExpirationDate,
        is_trial_user: true,
      })
      .eq('id', authData.user.id)

    if (profileError) {
      console.error('Profile error:', profileError)
      return errorResponse(`User created but profile update failed: ${profileError.message}`)
    }

    // Send password reset email so user can set their own password
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://oceandatum.ai/reset-password.html',
    })

    if (resetError) {
      console.warn('Password reset email failed:', resetError)
      // Don't fail the request - user was created successfully
    }

    return jsonResponse({
      success: true,
      message: `User ${email} created successfully with ${days} day trial`,
      userId: authData.user.id,
      trialExpirationDate: trialExpirationDate,
    })
  } catch (error) {
    console.error('Error creating user:', error)
    return errorResponse(`Unexpected error: ${error.message}`)
  }
})
