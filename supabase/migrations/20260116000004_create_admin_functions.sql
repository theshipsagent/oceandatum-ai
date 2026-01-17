-- Admin function to reset/extend user trial
CREATE OR REPLACE FUNCTION public.reset_user_trial(
  target_email TEXT,
  trial_days INTEGER DEFAULT 3
)
RETURNS JSON AS $$
DECLARE
  target_user_id UUID;
  new_trial_start TIMESTAMPTZ;
  new_trial_end TIMESTAMPTZ;
  result JSON;
BEGIN
  -- Find user by email
  SELECT id INTO target_user_id
  FROM public.profiles
  WHERE email = target_email;

  IF NOT FOUND THEN
    RETURN json_build_object(
      'success', false,
      'error', 'User not found'
    );
  END IF;

  -- Calculate new trial dates
  new_trial_start := now();
  new_trial_end := now() + (trial_days || ' days')::INTERVAL;

  -- Update profile with new trial dates
  UPDATE public.profiles
  SET
    trial_start_date = new_trial_start,
    trial_expiration_date = new_trial_end,
    is_trial_user = true,
    updated_at = now()
  WHERE id = target_user_id;

  -- Update any pending trial requests to approved
  UPDATE public.trial_requests
  SET
    status = 'approved',
    responded_at = now()
  WHERE user_email = target_email
    AND status = 'pending';

  result := json_build_object(
    'success', true,
    'user_id', target_user_id,
    'email', target_email,
    'trial_start', new_trial_start,
    'trial_end', new_trial_end
  );

  RETURN result;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get trial statistics (for admin)
CREATE OR REPLACE FUNCTION public.get_trial_statistics()
RETURNS JSON AS $$
DECLARE
  stats JSON;
BEGIN
  SELECT json_build_object(
    'total_users', COUNT(*),
    'trial_users', COUNT(*) FILTER (WHERE is_trial_user = true),
    'active_trials', COUNT(*) FILTER (WHERE is_trial_user = true AND trial_expiration_date > now()),
    'expired_trials', COUNT(*) FILTER (WHERE is_trial_user = true AND trial_expiration_date < now()),
    'pending_requests', (SELECT COUNT(*) FROM public.trial_requests WHERE status = 'pending')
  ) INTO stats
  FROM public.profiles;

  RETURN stats;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check for existing pending trial requests (rate limiting)
CREATE OR REPLACE FUNCTION public.has_pending_trial_request(
  check_email TEXT,
  within_hours INTEGER DEFAULT 24
)
RETURNS BOOLEAN AS $$
DECLARE
  request_count INTEGER;
BEGIN
  SELECT COUNT(*) INTO request_count
  FROM public.trial_requests
  WHERE user_email = check_email
    AND status = 'pending'
    AND created_at > (now() - (within_hours || ' hours')::INTERVAL);

  RETURN request_count > 0;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant execute permissions to authenticated users
GRANT EXECUTE ON FUNCTION public.has_pending_trial_request(TEXT, INTEGER) TO authenticated;
