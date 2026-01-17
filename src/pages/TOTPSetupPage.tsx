import Layout from '../components/layout/Layout'
import TOTPSetup from '../components/auth/TOTPSetup'

export default function TOTPSetupPage() {
  return (
    <Layout>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card">
          <TOTPSetup />
        </div>
      </div>
    </Layout>
  )
}
