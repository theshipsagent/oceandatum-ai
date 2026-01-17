-- Create profiles table that extends auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  totp_secret TEXT, -- Encrypted TOTP secret
  totp_enabled BOOLEAN DEFAULT false NOT NULL,
  trial_start_date TIMESTAMPTZ,
  trial_expiration_date TIMESTAMPTZ,
  is_trial_user BOOLEAN DEFAULT true NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS profiles_email_idx ON public.profiles(email);

-- Create index on trial expiration for faster queries
CREATE INDEX IF NOT EXISTS profiles_trial_expiration_idx ON public.profiles(trial_expiration_date);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own profile
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- Policy: Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id);

-- Policy: Users can insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to update updated_at on profile changes
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to check if trial is expired
CREATE OR REPLACE FUNCTION public.is_trial_expired(user_id UUID)
RETURNS BOOLEAN AS $$
DECLARE
  profile_record RECORD;
BEGIN
  SELECT trial_expiration_date, is_trial_user
  INTO profile_record
  FROM public.profiles
  WHERE id = user_id;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  -- Non-trial users never expire
  IF NOT profile_record.is_trial_user THEN
    RETURN false;
  END IF;

  -- Check if trial date is in the past
  IF profile_record.trial_expiration_date IS NULL THEN
    RETURN false;
  END IF;

  RETURN profile_record.trial_expiration_date < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- RLS policy to block expired trials from accessing data
CREATE POLICY "Block expired trials from reading profiles"
  ON public.profiles
  FOR SELECT
  USING (
    auth.uid() = id AND
    (NOT is_trial_expired(auth.uid()))
  );

-- Function to automatically create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, created_at, updated_at)
  VALUES (NEW.id, NEW.email, now(), now());
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile when user signs up
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Grant necessary permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT ALL ON public.profiles TO authenticated;
GRANT SELECT ON public.profiles TO anon;
