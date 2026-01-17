import { useState } from 'react'
import { setupTOTP, verifyTOTPSetup, validateTOTPLogin } from '../lib/api'
import { useAuth } from './useAuth'

export function useTotp() {
  const { refreshProfile, setTotpVerified } = useAuth()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const setup = async () => {
    setLoading(true)
    setError(null)

    try {
      const result = await setupTOTP()

      if (!result.success) {
        setError(result.error || 'Failed to setup TOTP')
        return null
      }

      return result
    } catch (err) {
      setError('Failed to setup TOTP')
      return null
    } finally {
      setLoading(false)
    }
  }

  const verify = async (token: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await verifyTOTPSetup(token)

      if (!result.success) {
        setError(result.error || 'Invalid verification code')
        return false
      }

      // Refresh profile to get updated TOTP status
      await refreshProfile()
      return true
    } catch (err) {
      setError('Failed to verify TOTP')
      return false
    } finally {
      setLoading(false)
    }
  }

  const validate = async (token: string) => {
    setLoading(true)
    setError(null)

    try {
      const result = await validateTOTPLogin(token)

      if (!result.success) {
        if (result.trial_expired) {
          setError('Your trial has expired')
          return { success: false, trialExpired: true }
        }
        setError(result.error || 'Invalid authentication code')
        return { success: false, trialExpired: false }
      }

      // Set TOTP verified flag in session storage
      sessionStorage.setItem('totp_verified', 'true')
      setTotpVerified(true)

      return { success: true, trialExpired: false }
    } catch (err) {
      setError('Failed to validate TOTP')
      return { success: false, trialExpired: false }
    } finally {
      setLoading(false)
    }
  }

  return {
    setup,
    verify,
    validate,
    loading,
    error,
  }
}
