export default function Footer() {
  return (
    <footer
      style={{
        backgroundColor: 'var(--text-dark)',
        color: 'white',
        padding: '2rem 0',
        marginTop: 'auto',
      }}
    >
      <div className="container">
        <div style={{ textAlign: 'center' }}>
          <p style={{ margin: 0, color: 'rgba(255,255,255,0.8)' }}>
            &copy; {new Date().getFullYear()} Datum. All rights reserved.
          </p>
          <p style={{ margin: '0.5rem 0 0 0', color: 'rgba(255,255,255,0.6)' }}>
            Secure Maritime Data Platform
          </p>
        </div>
      </div>
    </footer>
  )
}
