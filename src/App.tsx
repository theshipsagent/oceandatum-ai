import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import TOTPSetupPage from './pages/TOTPSetupPage'
import DashboardPage from './pages/DashboardPage'
import TrialExpiredPage from './pages/TrialExpiredPage'
import RequestTrialPage from './pages/RequestTrialPage'
import ProtectedRoute from './components/auth/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/trial-expired" element={<TrialExpiredPage />} />
          <Route path="/request-trial" element={<RequestTrialPage />} />

          {/* Protected routes */}
          <Route
            path="/totp-setup"
            element={
              <ProtectedRoute requireAuth={true}>
                <TOTPSetupPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute requireAuth={true} requireTOTP={true}>
                <DashboardPage />
              </ProtectedRoute>
            }
          />

          {/* Catch all */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
