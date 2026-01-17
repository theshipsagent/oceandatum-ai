import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
  requireAuth?: boolean
  requireTOTP?: boolean
}

export default function ProtectedRoute({
  children,
  requireAuth = true,
  requireTOTP = false,
}: ProtectedRouteProps) {
  const { user, profile, loading, trialExpired, totpVerified } = useAuth()
  const location = useLocation()

  // Show loading while checking auth
  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  // Redirect to login if authentication required but user not logged in
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // If user is authenticated, check profile loading
  if (requireAuth && user && !profile && !loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    )
  }

  // Check trial expiration
  if (requireAuth && user && profile && trialExpired) {
    return <Navigate to="/trial-expired" replace />
  }

  // Check TOTP setup requirement
  if (requireAuth && user && profile && !profile.totp_enabled) {
    // Allow access to TOTP setup page
    if (location.pathname !== '/totp-setup') {
      return <Navigate to="/totp-setup" replace />
    }
  }

  // Check TOTP verification requirement
  if (requireTOTP && user && profile && profile.totp_enabled && !totpVerified) {
    // Redirect to login to complete TOTP verification
    return <Navigate to="/login" state={{ requireTotp: true }} replace />
  }

  return <>{children}</>
}
