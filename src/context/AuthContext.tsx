import React, { createContext, useState, useEffect, useContext } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase, Profile } from '../lib/supabaseClient'
import { getProfile, checkTrialExpiration } from '../lib/api'

interface AuthContextType {
  user: User | null
  session: Session | null
  profile: Profile | null
  loading: boolean
  trialExpired: boolean
  totpVerified: boolean
  setTotpVerified: (verified: boolean) => void
  refreshProfile: () => Promise<void>
  signUp: (email: string, password: string) => Promise<{ error: any }>
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [trialExpired, setTrialExpired] = useState(false)
  const [totpVerified, setTotpVerified] = useState(false)

  // Function to refresh profile data
  const refreshProfile = async () => {
    if (!user) {
      setProfile(null)
      setTrialExpired(false)
      return
    }

    try {
      const profileData = await getProfile(user.id)
      setProfile(profileData)

      // Check trial expiration
      if (profileData) {
        const expired = await checkTrialExpiration(user.id)
        setTrialExpired(expired)

        // Check TOTP verification from session storage
        const verified = sessionStorage.getItem('totp_verified') === 'true'
        setTotpVerified(verified)
      }
    } catch (error) {
      console.error('Error refreshing profile:', error)
    }
  }

  // Initialize auth state
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)

      // Clear TOTP verification on sign out
      if (!session) {
        sessionStorage.removeItem('totp_verified')
        setTotpVerified(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  // Load profile when user changes
  useEffect(() => {
    if (user) {
      refreshProfile()
    } else {
      setProfile(null)
      setTrialExpired(false)
    }
  }, [user])

  // Sign up function
  const signUp = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/totp-setup`,
        },
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  // Sign in function
  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  // Sign out function
  const signOut = async () => {
    sessionStorage.removeItem('totp_verified')
    setTotpVerified(false)
    await supabase.auth.signOut()
  }

  const value = {
    user,
    session,
    profile,
    loading,
    trialExpired,
    totpVerified,
    setTotpVerified,
    refreshProfile,
    signUp,
    signIn,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
