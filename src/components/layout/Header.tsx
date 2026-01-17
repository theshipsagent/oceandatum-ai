import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function Header() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  return (
    <header
      style={{
        backgroundColor: 'var(--primary-color)',
        color: 'white',
        padding: '1rem 0',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Link
            to="/"
            style={{
              color: 'white',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              textDecoration: 'none',
            }}
          >
            Datum
          </Link>

          <nav>
            {user ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Link
                  to="/dashboard"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Dashboard
                </Link>
                <span style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {user.email}
                </span>
                <button
                  onClick={handleSignOut}
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <Link
                  to="/login"
                  style={{ color: 'white', textDecoration: 'none' }}
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="btn btn-secondary"
                  style={{ padding: '0.5rem 1rem' }}
                >
                  Register
                </Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
