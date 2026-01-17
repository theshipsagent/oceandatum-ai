import Header from './Header'
import Footer from './Footer'
import TrialBanner from '../trial/TrialBanner'

interface LayoutProps {
  children: React.ReactNode
  showTrialBanner?: boolean
}

export default function Layout({ children, showTrialBanner = false }: LayoutProps) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      {showTrialBanner && <TrialBanner />}
      <main style={{ flex: 1, padding: '2rem 0' }}>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </div>
  )
}
