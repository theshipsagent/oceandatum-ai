import { Link } from 'react-router-dom'
import Layout from '../components/layout/Layout'
import RegisterForm from '../components/auth/RegisterForm'

export default function RegisterPage() {
  return (
    <Layout>
      <div style={{ maxWidth: '500px', margin: '0 auto' }}>
        <div className="card">
          <h1 className="mb-3 text-center">Create Account</h1>
          <div className="alert alert-info mb-3">
            Start your <strong>3-day free trial</strong> with full access to all
            features!
          </div>
          <RegisterForm />
          <div className="text-center mt-3">
            <p>
              Already have an account?{' '}
              <Link to="/login">Sign in here</Link>
            </p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
