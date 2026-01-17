import Layout from '../components/layout/Layout'
import { useAuth } from '../hooks/useAuth'
import { useTrial } from '../hooks/useTrial'

export default function DashboardPage() {
  const { profile } = useAuth()
  const { formatTrialStatus } = useTrial()

  return (
    <Layout showTrialBanner={true}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h1 className="mb-3">Dashboard</h1>

        <div className="card mb-3">
          <h2 className="mb-3">Welcome to Datum!</h2>
          <p>
            You've successfully set up two-factor authentication and are now
            securely logged in to your account.
          </p>

          {profile && profile.is_trial_user && (
            <div className="alert alert-info mt-3">
              <strong>Trial Status:</strong>{' '}
              {formatTrialStatus(profile.trial_expiration_date)}
            </div>
          )}
        </div>

        <div className="card mb-3">
          <h3 className="mb-2">Account Information</h3>
          <table style={{ width: '100%' }}>
            <tbody>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem 0', fontWeight: 500 }}>Email</td>
                <td style={{ padding: '0.75rem 0' }}>{profile?.email}</td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem 0', fontWeight: 500 }}>
                  2FA Status
                </td>
                <td style={{ padding: '0.75rem 0' }}>
                  <span style={{ color: 'var(--success-color)' }}>
                    ✓ Enabled
                  </span>
                </td>
              </tr>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.75rem 0', fontWeight: 500 }}>
                  Account Type
                </td>
                <td style={{ padding: '0.75rem 0' }}>
                  {profile?.is_trial_user ? 'Trial' : 'Full Access'}
                </td>
              </tr>
              <tr>
                <td style={{ padding: '0.75rem 0', fontWeight: 500 }}>
                  Member Since
                </td>
                <td style={{ padding: '0.75rem 0' }}>
                  {profile?.created_at
                    ? new Date(profile.created_at).toLocaleDateString()
                    : 'N/A'}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="card">
          <h3 className="mb-2">Next Steps</h3>
          <ul style={{ lineHeight: '2' }}>
            <li>Explore maritime data and vessel intelligence</li>
            <li>Set up API access for your applications</li>
            <li>Configure data export preferences</li>
            <li>Review security settings and audit logs</li>
          </ul>
        </div>
      </div>
    </Layout>
  )
}
