-- Update handle_new_user function to auto-approve @oceandatum.ai domain
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  trial_days INTEGER := 3;
  user_domain TEXT;
  auto_approve_domain TEXT := '@oceandatum.ai';
BEGIN
  -- Extract domain from email
  user_domain := substring(NEW.email from '@.*$');

  -- Create profile
  IF user_domain = auto_approve_domain THEN
    -- Auto-approve users with @oceandatum.ai domain
    INSERT INTO public.profiles (
      id,
      email,
      trial_start_date,
      trial_expiration_date,
      is_trial_user,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      NEW.email,
      now(),
      now() + (trial_days || ' days')::INTERVAL,
      true,
      now(),
      now()
    );
  ELSE
    -- Regular users - no automatic trial
    -- They need admin approval to get access
    INSERT INTO public.profiles (
      id,
      email,
      trial_start_date,
      trial_expiration_date,
      is_trial_user,
      created_at,
      updated_at
    )
    VALUES (
      NEW.id,
      NEW.email,
      NULL,
      NULL,
      true, -- Still trial user, but no dates set (blocked until admin approves)
      now(),
      now()
    );
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Comment explaining the auto-approval logic
COMMENT ON FUNCTION public.handle_new_user() IS
'Automatically creates user profile on signup. Users with @oceandatum.ai domain get automatic 3-day trial. Other users need admin approval.';
