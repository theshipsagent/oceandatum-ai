import { useAuth } from '../../hooks/useAuth'
import { useTrial } from '../../hooks/useTrial'

export default function TrialBanner() {
  const { profile } = useAuth()
  const { formatTrialStatus, calculateDaysRemaining } = useTrial()

  if (!profile || !profile.is_trial_user || !profile.trial_expiration_date) {
    return null
  }

  const daysRemaining = calculateDaysRemaining(profile.trial_expiration_date)
  const isExpiringSoon = daysRemaining <= 1

  return (
    <div
      className={`alert ${isExpiringSoon ? 'alert-warning' : 'alert-info'}`}
      style={{
        borderRadius: 0,
        textAlign: 'center',
        marginBottom: 0,
      }}
    >
      <strong>Trial Account:</strong> {formatTrialStatus(profile.trial_expiration_date)}
    </div>
  )
}
