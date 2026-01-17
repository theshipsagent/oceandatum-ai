import { useState } from 'react'
import { requestTrial } from '../lib/api'

export function useTrial() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const submitRequest = async (reason: string) => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const result = await requestTrial(reason)

      if (!result.success) {
        setError(result.error || 'Failed to submit trial request')
        return false
      }

      setSuccess(true)
      return true
    } catch (err) {
      setError('Failed to submit trial request')
      return false
    } finally {
      setLoading(false)
    }
  }

  const calculateDaysRemaining = (expirationDate: string | null): number => {
    if (!expirationDate) return 0

    const now = new Date()
    const expiration = new Date(expirationDate)
    const diff = expiration.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

    return Math.max(0, days)
  }

  const formatTrialStatus = (expirationDate: string | null): string => {
    const days = calculateDaysRemaining(expirationDate)

    if (days === 0) return 'Trial expired'
    if (days === 1) return '1 day remaining'
    return `${days} days remaining`
  }

  return {
    submitRequest,
    calculateDaysRemaining,
    formatTrialStatus,
    loading,
    error,
    success,
  }
}
