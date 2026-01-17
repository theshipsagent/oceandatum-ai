# Supabase Setup Instructions

## Prerequisites
- Supabase account
- Node.js 20+ installed (for npx)

**Note**: No need to install Supabase CLI globally. We use `npx supabase` instead!

## Initial Setup

### 1. Link to Supabase Project
```bash
npx supabase link --project-ref YOUR_PROJECT_REF
```

### 2. Apply Database Migrations
```bash
npx supabase db push
```

This will create:
- `profiles` table (extends auth.users with TOTP and trial fields)
- `trial_requests` table (trial extension requests)
- `totp_setup_tokens` table (temporary TOTP setup tokens)
- Helper functions for trial management
- Row-Level Security policies

### 3. Set Supabase Secrets
```bash
npx supabase secrets set ENCRYPTION_KEY="your-32-byte-hex-key"
npx supabase secrets set ADMIN_EMAIL="your-admin@email.com"
npx supabase secrets set SMTP_HOST="smtp.gmail.com"
npx supabase secrets set SMTP_PORT="587"
npx supabase secrets set SMTP_USER="your-smtp-user"
npx supabase secrets set SMTP_PASSWORD="your-smtp-password"
npx supabase secrets set TRIAL_DURATION_DAYS="3"
npx supabase secrets set TOTP_WINDOW="1"
npx supabase secrets set TOTP_ISSUER="Datum"
```

### 4. Generate Encryption Key
```bash
# Generate a secure 32-byte hex key for AES-256
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 5. Deploy Edge Functions
```bash
# Deploy all functions
npx supabase functions deploy totp-setup
npx supabase functions deploy totp-verify-setup
npx supabase functions deploy totp-validate-login
npx supabase functions deploy trial-request
npx supabase functions deploy admin-reset-trial
```

## Environment Variables

### Frontend (.env)
```
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Backend (Supabase Secrets)
- `ENCRYPTION_KEY` - 32-byte hex key for AES-256-GCM encryption
- `ADMIN_EMAIL` - Email address for admin notifications
- `SMTP_HOST` - SMTP server hostname
- `SMTP_PORT` - SMTP server port
- `SMTP_USER` - SMTP username
- `SMTP_PASSWORD` - SMTP password
- `TRIAL_DURATION_DAYS` - Trial duration (default: 3)
- `TOTP_WINDOW` - TOTP time window for validation (default: 1 = ±30 seconds)
- `TOTP_ISSUER` - Name displayed in authenticator app (default: "Datum")

## Database Functions

### Admin Functions
- `reset_user_trial(email, days)` - Extend user trial
- `get_trial_statistics()` - Get trial statistics
- `has_pending_trial_request(email, hours)` - Check for pending requests

### System Functions
- `is_trial_expired(user_id)` - Check if user's trial has expired
- `cleanup_expired_totp_tokens()` - Remove expired TOTP setup tokens
- `handle_new_user()` - Automatically create profile on signup
- `handle_updated_at()` - Update timestamp trigger

## Testing Database Setup

### Test Profile Creation
```sql
-- Check if profiles table exists
SELECT * FROM public.profiles LIMIT 1;

-- Check if RLS is enabled
SELECT tablename, rowsecurity FROM pg_tables WHERE tablename = 'profiles';
```

### Test Trial Functions
```sql
-- Test trial expiration check
SELECT is_trial_expired('user-uuid-here');

-- Test trial reset (as service role)
SELECT reset_user_trial('user@example.com', 3);

-- Get statistics
SELECT get_trial_statistics();
```

## Troubleshooting

### Migration Errors
If migrations fail, check:
1. Database connection: `npx supabase db status`
2. Migration syntax: Review SQL files in `migrations/`
3. Existing tables: Drop and recreate if needed

### RLS Policies
If users can't access data:
1. Check if RLS is enabled: `ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;`
2. Verify policies: `SELECT * FROM pg_policies WHERE tablename = 'profiles';`
3. Test with service role key to bypass RLS

### Edge Functions
If functions aren't working:
1. Check logs: `npx supabase functions logs function-name`
2. Verify secrets: `npx supabase secrets list`
3. Test locally: `npx supabase functions serve`
