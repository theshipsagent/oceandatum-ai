import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import { useAuth } from '../hooks/useAuth'

export default function LandingPage() {
  const { user } = useAuth()

  return (
    <Layout>
      <div
        style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '3rem 1rem',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            color: 'var(--primary-color)',
          }}
        >
          Welcome to Datum
        </h1>

        <p
          style={{
            fontSize: '1.25rem',
            color: 'var(--text-light)',
            marginBottom: '2rem',
          }}
        >
          Secure Maritime Data Platform with Enterprise-Grade Authentication
        </p>

        <div
          className="card"
          style={{
            marginBottom: '2rem',
            textAlign: 'left',
          }}
        >
          <h2 className="mb-3">Features</h2>
          <ul style={{ lineHeight: '2' }}>
            <li>
              <strong>Two-Factor Authentication:</strong> Industry-standard TOTP
              2FA for enhanced security
            </li>
            <li>
              <strong>3-Day Trial:</strong> Experience the platform risk-free
            </li>
            <li>
              <strong>Secure Data Access:</strong> Enterprise-grade data protection
            </li>
            <li>
              <strong>Maritime Intelligence:</strong> Comprehensive vessel and port
              data
            </li>
          </ul>
        </div>

        {!user ? (
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            <Link to="/register" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Get Started - Free Trial
            </Link>
            <Link to="/login" className="btn btn-secondary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Sign In
            </Link>
          </div>
        ) : (
          <div>
            <Link to="/dashboard" className="btn btn-primary" style={{ fontSize: '1.1rem', padding: '1rem 2rem' }}>
              Go to Dashboard
            </Link>
          </div>
        )}

        <div style={{ marginTop: '3rem', padding: '2rem', backgroundColor: 'var(--bg-light)', borderRadius: '8px' }}>
          <h3 className="mb-2">Why Choose Datum?</h3>
          <p style={{ color: 'var(--text-light)' }}>
            We provide secure access to comprehensive maritime data with
            state-of-the-art security measures. Your data is protected with
            military-grade encryption and two-factor authentication.
          </p>
        </div>
      </div>
    </Layout>
  )
}
