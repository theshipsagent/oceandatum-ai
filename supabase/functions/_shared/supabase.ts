import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0'

/**
 * Create a Supabase client for Edge Functions
 * Uses the service role key for admin operations
 */
export function createSupabaseClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey)
}

/**
 * Create a Supabase client with user JWT
 * For operations that should respect RLS
 */
export function createSupabaseClientWithAuth(authToken: string) {
  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Missing Supabase environment variables')
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // Set the auth token
  supabase.auth.setSession({
    access_token: authToken,
    refresh_token: '',
  })

  return supabase
}

/**
 * Get user from JWT token
 */
export async function getUserFromToken(authHeader: string | null) {
  if (!authHeader) {
    return null
  }

  const token = authHeader.replace('Bearer ', '')

  const supabaseUrl = Deno.env.get('SUPABASE_URL')
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')

  if (!supabaseUrl || !supabaseAnonKey) {
    return null
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  const { data: { user }, error } = await supabase.auth.getUser(token)

  if (error || !user) {
    return null
  }

  return user
}
