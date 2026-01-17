import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import '../styles/glassmorphism.css'

export default function GlassmorphismLandingPage() {
  const { user } = useAuth()

  return (
    <div className="glass-container">
      {/* Video Background */}
      <div className="video-background">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="background-video"
          poster="/ocean-poster.jpg"
        >
          <source src="/ocean-drone.mp4" type="video/mp4" />
          {/* Fallback to image if video doesn't load */}
        </video>
        {/* Overlay for better text readability */}
        <div className="video-overlay"></div>
      </div>

      {/* Animated particles */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="glass-content">
        {/* Logo placeholder */}
        <div className="logo-container">
          <div className="logo-text">DATUM</div>
          <div className="logo-subtitle">Ocean Intelligence Platform</div>
        </div>

        {/* Main Glass Card */}
        <div className="glass-card">
          <div className="glass-card-content">
            <h1 className="glass-title">
              Maritime Intelligence
              <br />
              <span className="gradient-text">Redefined</span>
            </h1>

            <p className="glass-description">
              Enterprise-grade data platform with military-level security.
              Access comprehensive vessel tracking, port intelligence, and
              maritime analytics.
            </p>

            {/* Feature Pills */}
            <div className="feature-pills">
              <div className="feature-pill">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>TOTP 2FA Security</span>
              </div>
              <div className="feature-pill">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Real-time Data</span>
              </div>
              <div className="feature-pill">
                <svg className="feature-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Global Coverage</span>
              </div>
            </div>

            {/* CTA Buttons */}
            {!user ? (
              <div className="cta-buttons">
                <Link to="/register" className="btn-glass btn-glass-primary">
                  <span>Start Free Trial</span>
                  <svg className="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                <Link to="/login" className="btn-glass btn-glass-secondary">
                  <span>Sign In</span>
                </Link>
              </div>
            ) : (
              <div className="cta-buttons">
                <Link to="/dashboard" className="btn-glass btn-glass-primary">
                  <span>Enter Dashboard</span>
                  <svg className="btn-arrow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
              </div>
            )}

            {/* Trust Indicators */}
            <div className="trust-indicators">
              <div className="trust-item">
                <div className="trust-number">256-bit</div>
                <div className="trust-label">Encryption</div>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <div className="trust-number">3-day</div>
                <div className="trust-label">Free Trial</div>
              </div>
              <div className="trust-divider"></div>
              <div className="trust-item">
                <div className="trust-number">24/7</div>
                <div className="trust-label">Support</div>
              </div>
            </div>
          </div>
        </div>

        {/* Secondary Features */}
        <div className="secondary-features">
          <div className="feature-card-small">
            <div className="feature-icon-large">🚢</div>
            <h3>Vessel Tracking</h3>
            <p>Real-time AIS data and historical vessel movements</p>
          </div>
          <div className="feature-card-small">
            <div className="feature-icon-large">📊</div>
            <h3>Analytics</h3>
            <p>Advanced maritime intelligence and predictive insights</p>
          </div>
          <div className="feature-card-small">
            <div className="feature-icon-large">🔒</div>
            <h3>Compliance</h3>
            <p>Industry-standard security and data protection</p>
          </div>
        </div>

        {/* Footer */}
        <div className="glass-footer">
          <p>© 2026 Datum Maritime Intelligence. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
}
