import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useTrial } from '../../hooks/useTrial'

export default function RequestTrialForm() {
  const { user } = useAuth()
  const { submitRequest, loading, error, success } = useTrial()

  const [reason, setReason] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    const result = await submitRequest(reason)

    if (result) {
      setReason('')
    }
  }

  if (success) {
    return (
      <div className="alert alert-success">
        <h3 className="mb-2">Request Submitted!</h3>
        <p>
          Your trial extension request has been received. We'll review it and send
          you an email within 24-48 hours with our decision.
        </p>
        <p className="mb-0">
          <strong>What happens next?</strong> If approved, you'll receive a new
          3-day trial period automatically.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h2 className="mb-3">Request Trial Extension</h2>

      {error && (
        <div className="alert alert-error" role="alert">
          {error}
        </div>
      )}

      <div className="alert alert-info mb-3">
        Please tell us why you'd like to extend your trial. This helps us better
        understand your needs and improve our service.
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={user?.email || ''}
            disabled
            readOnly
          />
        </div>

        <div className="form-group">
          <label htmlFor="reason" className="form-label">
            Reason for Extension Request
          </label>
          <textarea
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            rows={5}
            placeholder="Please explain why you need more time to evaluate the platform..."
          />
          <small className="form-text text-muted">
            Be specific about what you're trying to accomplish or evaluate
          </small>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          disabled={loading || reason.trim().length < 20}
        >
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>

        {reason.trim().length < 20 && reason.trim().length > 0 && (
          <div className="form-error mt-2">
            Please provide at least 20 characters explaining your reason
          </div>
        )}
      </form>
    </div>
  )
}
