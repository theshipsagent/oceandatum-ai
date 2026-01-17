import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'

export default function TrialExpiredPage() {
  return (
    <Layout>
      <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
        <div className="card">
          <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>⏰</div>
          <h1 className="mb-3">Your Trial Has Ended</h1>

          <p className="mb-3" style={{ fontSize: '1.1rem', color: 'var(--text-light)' }}>
            Thank you for trying Datum! Your 3-day trial period has expired.
          </p>

          <div className="alert alert-info mb-3" style={{ textAlign: 'left' }}>
            <h3 className="mb-2">What's Next?</h3>
            <ul style={{ marginBottom: 0 }}>
              <li>Request an additional trial period to continue evaluating</li>
              <li>Contact our team to discuss full access options</li>
              <li>Explore our pricing and features</li>
            </ul>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <Link to="/request-trial" className="btn btn-primary btn-block">
              Request Trial Extension
            </Link>

            <div style={{ marginTop: '1rem' }}>
              <p style={{ color: 'var(--text-light)', marginBottom: '0.5rem' }}>
                Need help?
              </p>
              <a
                href="mailto:support@datum.example.com"
                style={{
                  color: 'var(--primary-color)',
                  textDecoration: 'none',
                }}
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
