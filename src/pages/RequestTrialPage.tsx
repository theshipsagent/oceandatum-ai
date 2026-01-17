import Layout from '../components/layout/Layout'
import RequestTrialForm from '../components/trial/RequestTrialForm'

export default function RequestTrialPage() {
  return (
    <Layout>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <div className="card">
          <RequestTrialForm />
        </div>
      </div>
    </Layout>
  )
}
