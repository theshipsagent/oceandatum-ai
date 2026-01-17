-- Create temporary TOTP setup tokens table
CREATE TABLE IF NOT EXISTS public.totp_setup_tokens (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  totp_secret TEXT NOT NULL, -- Encrypted
  expires_at TIMESTAMPTZ NOT NULL,
  verified BOOLEAN DEFAULT false NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Create indexes
CREATE INDEX IF NOT EXISTS totp_setup_tokens_user_id_idx ON public.totp_setup_tokens(user_id);
CREATE INDEX IF NOT EXISTS totp_setup_tokens_expires_at_idx ON public.totp_setup_tokens(expires_at);

-- Enable Row Level Security
ALTER TABLE public.totp_setup_tokens ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own setup tokens
CREATE POLICY "Users can view own setup tokens"
  ON public.totp_setup_tokens
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Service role can manage all tokens (for cleanup)
CREATE POLICY "Service role can manage all tokens"
  ON public.totp_setup_tokens
  FOR ALL
  USING (true);

-- Function to cleanup expired TOTP setup tokens
CREATE OR REPLACE FUNCTION public.cleanup_expired_totp_tokens()
RETURNS void AS $$
BEGIN
  DELETE FROM public.totp_setup_tokens
  WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Grant permissions
GRANT ALL ON public.totp_setup_tokens TO authenticated;
