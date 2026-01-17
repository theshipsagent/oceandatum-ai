-- Create trial_requests table
CREATE TABLE IF NOT EXISTS public.trial_requests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_email TEXT NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'denied')),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  responded_at TIMESTAMPTZ,
  admin_notes TEXT
);

-- Create indexes
CREATE INDEX IF NOT EXISTS trial_requests_user_email_idx ON public.trial_requests(user_email);
CREATE INDEX IF NOT EXISTS trial_requests_status_idx ON public.trial_requests(status);
CREATE INDEX IF NOT EXISTS trial_requests_created_at_idx ON public.trial_requests(created_at);

-- Enable Row Level Security
ALTER TABLE public.trial_requests ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own trial requests
CREATE POLICY "Users can view own trial requests"
  ON public.trial_requests
  FOR SELECT
  USING (auth.uid() = user_id OR user_email = auth.email());

-- Policy: Users can insert their own trial requests
CREATE POLICY "Users can insert own trial requests"
  ON public.trial_requests
  FOR INSERT
  WITH CHECK (auth.uid() = user_id OR user_email = auth.email());

-- Policy: Authenticated users can create trial requests
CREATE POLICY "Authenticated users can create trial requests"
  ON public.trial_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Grant permissions
GRANT ALL ON public.trial_requests TO authenticated;
GRANT SELECT ON public.trial_requests TO anon;
