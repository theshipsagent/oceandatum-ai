import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTotp } from '../../hooks/useTotp'

export default function TOTPSetup() {
  const navigate = useNavigate()
  const { setup, verify, loading, error } = useTotp()

  const [qrCode, setQrCode] = useState<string | null>(null)
  const [secret, setSecret] = useState<string | null>(null)
  const [verifyToken, setVerifyToken] = useState('')
  const [showVerify, setShowVerify] = useState(false)

  useEffect(() => {
    initializeSetup()
  }, [])

  const initializeSetup = async () => {
    const result = await setup()

    if (result && result.success) {
      setQrCode(result.qrCode || null)
      setSecret(result.secret || null)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()

    const success = await verify(verifyToken)

    if (success) {
      navigate('/dashboard')
    }
  }

  if (loading && !qrCode) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!showVerify && qrCode) {
    return (
      <div>
        <h2 className="mb-3">Set Up Two-Factor Authentication</h2>

        <div className="alert alert-info mb-3">
          <strong>Step 1:</strong> Scan the QR code below with your authenticator app
          (Google Authenticator, Authy, or similar)
        </div>

        <div className="text-center mb-3">
          <img src={qrCode} alt="TOTP QR Code" style={{ maxWidth: '300px' }} />
        </div>

        {secret && (
          <div className="alert alert-warning mb-3">
            <strong>Manual Entry:</strong> If you can't scan the QR code, enter this
            secret manually:
            <div
              className="mt-2"
              style={{
                fontFamily: 'monospace',
                fontSize: '1.1rem',
                wordBreak: 'break-all',
                userSelect: 'all',
              }}
            >
              {secret}
            </div>
          </div>
        )}

        <button
          className="btn btn-primary btn-block"
          onClick={() => setShowVerify(true)}
        >
          I've Scanned the Code
        </button>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-3">Verify Your Setup</h2>

      {error && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}

      <div className="alert alert-info mb-3">
        <strong>Step 2:</strong> Enter the 6-digit code from your authenticator app
        to verify the setup
      </div>

      <form onSubmit={handleVerify}>
        <div className="form-group">
          <label htmlFor="token" className="form-label">
            Verification Code
          </label>
          <input
            id="token"
            type="text"
            value={verifyToken}
            onChange={(e) =>
              setVerifyToken(e.target.value.replace(/\D/g, '').slice(0, 6))
            }
            required
            autoComplete="one-time-code"
            placeholder="000000"
            maxLength={6}
            pattern="[0-9]{6}"
            style={{
              fontSize: '1.5rem',
              letterSpacing: '0.5rem',
              textAlign: 'center',
            }}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading || verifyToken.length !== 6}
        >
          {loading ? 'Verifying...' : 'Verify & Continue'}
        </button>

        <button
          type="button"
          className="btn btn-secondary btn-block mt-2"
          onClick={() => {
            setShowVerify(false)
            setVerifyToken('')
          }}
        >
          Back to QR Code
        </button>
      </form>
    </div>
  )
}
