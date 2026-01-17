import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// Database types
export interface Profile {
  id: string
  email: string
  totp_secret: string | null
  totp_enabled: boolean
  trial_start_date: string | null
  trial_expiration_date: string | null
  is_trial_user: boolean
  created_at: string
  updated_at: string
}

export interface TrialRequest {
  id: string
  user_email: string
  user_id: string | null
  reason: string
  status: 'pending' | 'approved' | 'denied'
  created_at: string
  responded_at: string | null
  admin_notes: string | null
}

export interface TOTPSetupToken {
  id: string
  user_id: string
  totp_secret: string
  expires_at: string
  verified: boolean
  created_at: string
}
