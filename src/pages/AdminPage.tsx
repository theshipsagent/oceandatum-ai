import { useState } from 'react'
import Layout from '../components/layout/Layout'
import { supabase } from '../lib/supabaseClient'

export default function AdminPage() {
  const [email, setEmail] = useState('')
  const [days, setDays] = useState(3)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)
  const [autoApproveDomain, setAutoApproveDomain] = useState('@oceandatum.ai')

  const handleGrantAccess = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    try {
      // Check if user already exists in profiles
      const { data: existingProfile, error: profileError } = await supabase
        .from('profiles')
        .select('id, email, totp_enabled')
        .eq('email', email)
        .single()

      if (existingProfile) {
        // User exists - extend their trial
        const trialStart = new Date()
        const trialEnd = new Date()
        trialEnd.setDate(trialEnd.getDate() + days)

        const { error: updateError } = await supabase
          .from('profiles')
          .update({
            trial_start_date: trialStart.toISOString(),
            trial_expiration_date: trialEnd.toISOString(),
            is_trial_user: true,
            updated_at: new Date().toISOString()
          })
          .eq('email', email)

        if (updateError) throw updateError

        setMessage({
          type: 'success',
          text: `Access extended for ${email} (${days} days). User can now log in.`
        })
      } else {
        // New user - they need to register first
        setMessage({
          type: 'error',
          text: `User ${email} not found. They need to register first (use /register route or send them the link).`
        })
      }

      setEmail('')
    } catch (error) {
      console.error('Error granting access:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to grant access'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleCreateInvite = async () => {
    setLoading(true)
    setMessage(null)

    try {
      // For admin, you would typically:
      // 1. Create a magic link or invite code
      // 2. Or manually create the user in Supabase Auth

      setMessage({
        type: 'success',
        text: `Send this registration link to the user: ${window.location.origin}/register?email=${encodeURIComponent(email)}`
      })
    } catch (error) {
      console.error('Error creating invite:', error)
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to create invite'
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h1>Admin Panel</h1>
        <p style={{ marginBottom: '2rem', color: 'rgba(255,255,255,0.7)' }}>
          Manage user access and approvals
        </p>

        {message && (
          <div
            style={{
              padding: '1rem',
              marginBottom: '1.5rem',
              borderRadius: '8px',
              background: message.type === 'success'
                ? 'rgba(100,255,180,0.1)'
                : 'rgba(255,100,100,0.1)',
              border: `1px solid ${message.type === 'success' ? 'rgba(100,255,180,0.3)' : 'rgba(255,100,100,0.3)'}`,
              color: message.type === 'success' ? '#64ffb4' : '#ff6464'
            }}
          >
            {message.text}
          </div>
        )}

        {/* Grant Access Form */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Grant Access to User</h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1.5rem' }}>
            User must register first before you can grant them access.
          </p>

          <form onSubmit={handleGrantAccess}>
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>
                User Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="user@company.com"
                required
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(0,0,0,0.3)',
                  color: '#fff',
                  fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label htmlFor="days" style={{ display: 'block', marginBottom: '0.5rem' }}>
                Trial Duration (days)
              </label>
              <input
                type="number"
                id="days"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                min="1"
                max="365"
                required
                style={{
                  width: '150px',
                  padding: '0.75rem',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(0,0,0,0.3)',
                  color: '#fff',
                  fontSize: '1rem'
                }}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-glass btn-glass-primary"
              style={{
                padding: '0.75rem 2rem',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1
              }}
            >
              {loading ? 'Processing...' : 'Grant Access'}
            </button>
          </form>
        </div>

        {/* Auto-Approve Domain */}
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 style={{ marginBottom: '1rem' }}>Auto-Approve Domain</h2>
          <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', marginBottom: '1rem' }}>
            Anyone registering with email ending in: <strong>{autoApproveDomain}</strong> will automatically get {days}-day trial access.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,180,0.8)' }}>
            ⚠️ This requires updating the registration Edge Function to check domain on signup.
          </p>
        </div>

        {/* Quick Actions */}
        <div className="card">
          <h2 style={{ marginBottom: '1rem' }}>Quick Actions</h2>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href={`https://supabase.com/dashboard/project/xxctitcsnsshmmcvyamy/editor/profiles`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass btn-glass-secondary"
              style={{ padding: '0.75rem 1.5rem', textDecoration: 'none' }}
            >
              View All Users
            </a>

            <a
              href={`https://supabase.com/dashboard/project/xxctitcsnsshmmcvyamy/editor/trial_requests`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass btn-glass-secondary"
              style={{ padding: '0.75rem 1.5rem', textDecoration: 'none' }}
            >
              View Trial Requests
            </a>

            <a
              href={`https://supabase.com/dashboard/project/xxctitcsnsshmmcvyamy/database/query`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-glass btn-glass-secondary"
              style={{ padding: '0.75rem 1.5rem', textDecoration: 'none' }}
            >
              Run SQL Queries
            </a>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.3)', borderRadius: '6px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Common SQL Queries:</h3>
            <pre style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', whiteSpace: 'pre-wrap' }}>
{`-- View all users with trial status
SELECT email, is_trial_user, trial_expiration_date, created_at
FROM profiles
ORDER BY created_at DESC;

-- Convert trial to full access
UPDATE profiles
SET is_trial_user = false, trial_expiration_date = NULL
WHERE email = 'user@example.com';

-- Delete user completely
DELETE FROM auth.users
WHERE email = 'user@example.com';`}
            </pre>
          </div>
        </div>

        {/* Instructions */}
        <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(100,255,180,0.05)', borderRadius: '8px', border: '1px solid rgba(100,255,180,0.2)' }}>
          <h3 style={{ marginBottom: '1rem', color: '#64ffb4' }}>How to Add New Users:</h3>
          <ol style={{ paddingLeft: '1.5rem', lineHeight: '1.8' }}>
            <li>User emails you requesting access to <strong>datum@oceandatum.ai</strong></li>
            <li>Have them register at <strong>/register</strong> route (or send them direct link)</li>
            <li>Once registered, come back here and enter their email above</li>
            <li>Click "Grant Access" to give them trial access</li>
            <li>They can now log in and use the platform</li>
          </ol>

          <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', color: '#64ffb4' }}>Auto-Approve @oceandatum.ai:</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            Anyone with an <strong>@oceandatum.ai</strong> email can register and will automatically get {days} days access.
            No manual approval needed. This is configured in the registration process.
          </p>
        </div>
      </div>
    </Layout>
  )
}
