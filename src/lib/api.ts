import { supabase } from './supabaseClient'

// TOTP API
export interface TOTPSetupResponse {
  success: boolean
  qrCode?: string
  secret?: string
  error?: string
}

export interface TOTPVerifyResponse {
  success: boolean
  error?: string
}

export interface TOTPValidateResponse {
  success: boolean
  trial_expired?: boolean
  error?: string
}

export async function setupTOTP(): Promise<TOTPSetupResponse> {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: 'Not authenticated' }
    }

    const response = await supabase.functions.invoke('totp-setup', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
    })

    if (response.error) {
      return { success: false, error: response.error.message }
    }

    return response.data
  } catch (error) {
    console.error('TOTP setup error:', error)
    return { success: false, error: 'Failed to setup TOTP' }
  }
}

export async function verifyTOTPSetup(token: string): Promise<TOTPVerifyResponse> {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: 'Not authenticated' }
    }

    const response = await supabase.functions.invoke('totp-verify-setup', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: { token },
    })

    if (response.error) {
      return { success: false, error: response.error.message }
    }

    return response.data
  } catch (error) {
    console.error('TOTP verify error:', error)
    return { success: false, error: 'Failed to verify TOTP' }
  }
}

export async function validateTOTPLogin(token: string): Promise<TOTPValidateResponse> {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: 'Not authenticated' }
    }

    const response = await supabase.functions.invoke('totp-validate-login', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: { token },
    })

    if (response.error) {
      return { success: false, error: response.error.message }
    }

    return response.data
  } catch (error) {
    console.error('TOTP validate error:', error)
    return { success: false, error: 'Failed to validate TOTP' }
  }
}

// Trial API
export interface TrialRequestResponse {
  success: boolean
  error?: string
}

export async function requestTrial(reason: string): Promise<TrialRequestResponse> {
  try {
    const { data: { session } } = await supabase.auth.getSession()

    if (!session) {
      return { success: false, error: 'Not authenticated' }
    }

    const response = await supabase.functions.invoke('trial-request', {
      headers: {
        Authorization: `Bearer ${session.access_token}`,
      },
      body: { reason },
    })

    if (response.error) {
      return { success: false, error: response.error.message }
    }

    return response.data
  } catch (error) {
    console.error('Trial request error:', error)
    return { success: false, error: 'Failed to request trial' }
  }
}

// Profile helpers
export async function getProfile(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single()

  if (error) {
    console.error('Get profile error:', error)
    return null
  }

  return data
}

export async function checkTrialExpiration(userId: string): Promise<boolean> {
  const profile = await getProfile(userId)

  if (!profile) return false

  if (!profile.is_trial_user) return false

  if (!profile.trial_expiration_date) return false

  return new Date(profile.trial_expiration_date) < new Date()
}
