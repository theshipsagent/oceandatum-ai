import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'

export default function RegisterForm() {
  const { signUp } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    // Validate passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    // Validate password strength
    if (password.length < 8) {
      setError('Password must be at least 8 characters long')
      setLoading(false)
      return
    }

    try {
      const { error: signUpError } = await signUp(email, password)

      if (signUpError) {
        setError(signUpError.message)
        setLoading(false)
        return
      }

      setSuccess(true)
    } catch (err) {
      setError('An unexpected error occurred')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    const isAutoApproved = email.endsWith('@oceandatum.ai')

    return (
      <div className="alert alert-success">
        <h3 className="mb-2">
          {isAutoApproved ? 'Account Created!' : 'Registration Submitted'}
        </h3>
        <p>
          We've sent you a verification link to <strong>{email}</strong>.
          Please click the link in the email to verify your account.
        </p>
        {isAutoApproved ? (
          <p style={{ marginTop: '1rem' }}>
            ✓ Your <strong>@oceandatum.ai</strong> email has been automatically approved.
            After email verification, you can proceed to TOTP setup and start your 3-day trial.
          </p>
        ) : (
          <div style={{ marginTop: '1rem', padding: '1rem', background: 'rgba(255,255,180,0.1)', borderRadius: '6px' }}>
            <p style={{ fontWeight: 500, marginBottom: '0.5rem' }}>⏳ Awaiting Admin Approval</p>
            <p style={{ fontSize: '0.9rem' }}>
              Your registration is pending approval. Please contact{' '}
              <a href="mailto:datum@oceandatum.ai" style={{ color: '#64ffb4' }}>
                datum@oceandatum.ai
              </a>{' '}
              to request access. Once approved, you'll be able to log in.
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit}>
      {error && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}

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
          autoComplete="new-password"
          placeholder="••••••••"
          minLength={8}
        />
        <small className="form-text text-muted">
          Must be at least 8 characters long
        </small>
      </div>

      <div className="form-group">
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          autoComplete="new-password"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="btn btn-primary btn-block"
        disabled={loading}
      >
        {loading ? 'Creating account...' : 'Create Account'}
      </button>
    </form>
  )
}
