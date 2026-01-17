import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import LoginForm from '../components/auth/LoginForm'

export default function LoginPage() {
  return (
    <Layout>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="card">
          <h1 className="mb-3 text-center">Sign In</h1>
          <LoginForm />
          <div className="text-center mt-3">
            <p>
              Don't have an account?{' '}
              <Link to="/register">Register here</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
