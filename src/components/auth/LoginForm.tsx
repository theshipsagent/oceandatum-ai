import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useTotp } from '../../hooks/useTotp'

export default function LoginForm() {
  const navigate = useNavigate()
  const { signIn, profile } = useAuth()
  const { validate, loading: totpLoading, error: totpError } = useTotp()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [totpToken, setTotpToken] = useState('')
  const [showTotpInput, setShowTotpInput] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      // First step: Sign in with email and password
      if (!showTotpInput) {
        const { error: signInError } = await signIn(email, password)

        if (signInError) {
          setError(signInError.message)
          setLoading(false)
          return
        }

        // Wait a moment for profile to load
        await new Promise(resolve => setTimeout(resolve, 500))

        // Check if TOTP is enabled
        if (profile?.totp_enabled) {
          setShowTotpInput(true)
          setLoading(false)
        } else {
          // No TOTP setup yet, redirect to setup
          navigate('/totp-setup')
        }
      } else {
        // Second step: Validate TOTP
        const result = await validate(totpToken)

        if (!result.success) {
          if (result.trialExpired) {
            navigate('/trial-expired')
          } else {
            setError(totpError || 'Invalid authentication code')
          }
          setLoading(false)
          return
        }

        // Success! Redirect to dashboard
        navigate('/dashboard')
      }
    } catch (err) {
      setError('An unexpected error occurred')
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}

      {!showTotpInput ? (
        <>
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </>
      ) : (
        <>
          <div className="alert alert-info mb-3">
            Enter the 6-digit code from your authenticator app
          </div>

          <div className="form-group">
            <label htmlFor="totp" className="form-label">
              Authentication Code
            </label>
            <input
              id="totp"
              type="text"
              value={totpToken}
              onChange={(e) => setTotpToken(e.target.value.replace(/\D/g, '').slice(0, 6))}
              required
              autoComplete="one-time-code"
              placeholder="000000"
              maxLength={6}
              pattern="[0-9]{6}"
              style={{ fontSize: '1.5rem', letterSpacing: '0.5rem', textAlign: 'center' }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={totpLoading || totpToken.length !== 6}
          >
            {totpLoading ? 'Verifying...' : 'Verify & Sign In'}
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-block mt-2"
            onClick={() => {
              setShowTotpInput(false)
              setTotpToken('')
              setError(null)
            }}
          >
            Back
          </button>
        </>
      )}
    </form>
  )
}
