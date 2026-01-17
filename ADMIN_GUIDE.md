# Admin Guide - Datum TOTP 2FA System

This guide covers administrative tasks for managing the Datum authentication system.

## Table of Contents

- [Access Requirements](#access-requirements)
- [Trial Management](#trial-management)
- [User Management](#user-management)
- [Monitoring](#monitoring)
- [Troubleshooting](#troubleshooting)
- [Security](#security)

## Access Requirements

### Admin Email

The admin email is configured in Supabase secrets:
```bash
npx supabase secrets set ADMIN_EMAIL="your-admin@email.com"
```

Only this email can:
- Reset user trials
- View all trial requests
- Access admin Edge Functions

### Service Role Key

For admin operations, you'll need the Supabase service role key:
1. Go to Supabase Dashboard > Settings > API
2. Copy "service_role" key (keep secret!)
3. Use in Authorization header: `Bearer YOUR_SERVICE_ROLE_KEY`

## Trial Management

### Approve Trial Extension

When you receive a trial extension request email, review the user's reason and approve/deny:

#### Approve (Reset Trial)

```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/admin-reset-trial \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "days": 3
  }'
```

**Response:**
```json
{
  "success": true,
  "message": "Trial reset successfully",
  "data": {
    "email": "user@example.com",
    "trial_start": "2026-01-16T10:00:00Z",
    "trial_end": "2026-01-19T10:00:00Z",
    "email_sent": true
  }
}
```

The user will receive an email notification and can immediately log in.

#### Deny Request

To deny without resetting trial, update the request status in the database:

```sql
UPDATE trial_requests
SET
  status = 'denied',
  responded_at = now(),
  admin_notes = 'Reason for denial'
WHERE user_email = 'user@example.com'
  AND status = 'pending';
```

**Note:** Consider sending a manual email to the user explaining the denial.

### View Trial Requests

#### All Pending Requests

```sql
SELECT
  user_email,
  reason,
  created_at
FROM trial_requests
WHERE status = 'pending'
ORDER BY created_at ASC;
```

#### Request History for User

```sql
SELECT
  reason,
  status,
  created_at,
  responded_at,
  admin_notes
FROM trial_requests
WHERE user_email = 'user@example.com'
ORDER BY created_at DESC;
```

### Trial Statistics

Get overview of trial system:

```sql
SELECT * FROM get_trial_statistics();
```

**Returns:**
```json
{
  "total_users": 150,
  "trial_users": 120,
  "active_trials": 45,
  "expired_trials": 75,
  "pending_requests": 5
}
```

### Bulk Trial Extensions

To extend trials for multiple users:

```bash
#!/bin/bash
# bulk-extend-trials.sh

SERVICE_KEY="your-service-role-key"
PROJECT_URL="https://your-project.supabase.co"

emails=(
  "user1@example.com"
  "user2@example.com"
  "user3@example.com"
)

for email in "${emails[@]}"; do
  echo "Extending trial for $email..."
  curl -X POST "$PROJECT_URL/functions/v1/admin-reset-trial" \
    -H "Authorization: Bearer $SERVICE_KEY" \
    -H "Content-Type: application/json" \
    -d "{\"email\": \"$email\", \"days\": 3}"
  echo ""
  sleep 1
done
```

## User Management

### View User Profile

```sql
SELECT
  id,
  email,
  totp_enabled,
  trial_start_date,
  trial_expiration_date,
  is_trial_user,
  created_at
FROM profiles
WHERE email = 'user@example.com';
```

### Check Trial Status

```sql
SELECT
  email,
  is_trial_user,
  trial_expiration_date,
  is_trial_expired(id) as expired,
  CASE
    WHEN NOT is_trial_user THEN 'Full Access'
    WHEN trial_expiration_date IS NULL THEN 'No Trial Set'
    WHEN trial_expiration_date < now() THEN 'Expired'
    ELSE 'Active'
  END as status
FROM profiles
WHERE email = 'user@example.com';
```

### Convert Trial to Full Access

To give a user permanent access:

```sql
UPDATE profiles
SET
  is_trial_user = false,
  trial_expiration_date = NULL,
  updated_at = now()
WHERE email = 'user@example.com';
```

### Disable User TOTP

If a user loses access to their authenticator:

```sql
-- WARNING: This will require the user to set up TOTP again
UPDATE profiles
SET
  totp_secret = NULL,
  totp_enabled = false,
  updated_at = now()
WHERE email = 'user@example.com';
```

**Important:** Notify the user that they'll need to set up TOTP again on next login.

### Delete User

To completely remove a user:

```sql
-- This will cascade delete all related data
DELETE FROM auth.users
WHERE email = 'user@example.com';
```

**Warning:** This is irreversible. User data will be permanently deleted.

## Monitoring

### Active Users

Users who logged in recently:

```sql
SELECT
  p.email,
  p.trial_expiration_date,
  u.last_sign_in_at
FROM profiles p
JOIN auth.users u ON u.id = p.id
WHERE u.last_sign_in_at > now() - interval '7 days'
ORDER BY u.last_sign_in_at DESC;
```

### Trial Expiration Report

Users expiring in next 24 hours:

```sql
SELECT
  email,
  trial_expiration_date,
  trial_expiration_date - now() as time_remaining
FROM profiles
WHERE is_trial_user = true
  AND trial_expiration_date BETWEEN now() AND now() + interval '1 day'
ORDER BY trial_expiration_date ASC;
```

### Failed Login Attempts

Check Supabase Auth logs in Dashboard:
1. Go to Authentication > Logs
2. Filter by "Failed" status
3. Look for patterns of failed attempts

### Edge Function Logs

View function execution logs:

```bash
# View recent logs
npx supabase functions logs totp-validate-login --tail

# View logs from specific time
npx supabase functions logs totp-setup --since 1h
```

### Database Performance

Monitor slow queries:

```sql
-- Enable query logging (if not already enabled)
ALTER DATABASE postgres SET log_min_duration_statement = 1000;

-- View recent queries
SELECT
  query,
  calls,
  total_time,
  mean_time
FROM pg_stat_statements
ORDER BY mean_time DESC
LIMIT 10;
```

## Troubleshooting

### User Can't Log In

#### Check 1: Email Verified
```sql
SELECT
  email,
  email_confirmed_at
FROM auth.users
WHERE email = 'user@example.com';
```

If `email_confirmed_at` is NULL, resend verification:
```sql
-- In Supabase Dashboard: Authentication > Users > Send recovery email
```

#### Check 2: Trial Expired
```sql
SELECT
  email,
  trial_expiration_date,
  is_trial_expired(id) as expired
FROM profiles
WHERE email = 'user@example.com';
```

If expired, reset trial using admin function.

#### Check 3: TOTP Issues
```sql
SELECT
  email,
  totp_enabled,
  totp_secret IS NOT NULL as has_secret
FROM profiles
WHERE email = 'user@example.com';
```

If `totp_enabled` is false but should be true, user needs to complete setup.

### Edge Function Errors

#### View Error Logs
```bash
npx supabase functions logs function-name --filter error
```

#### Test Locally
```bash
# Start local Supabase
supabase start

# Serve functions locally
npx supabase functions serve

# Test with curl
curl -X POST http://localhost:54321/functions/v1/totp-setup \
  -H "Authorization: Bearer YOUR_ANON_KEY" \
  -H "Content-Type: application/json"
```

#### Common Issues

1. **Missing Environment Variables**
   ```bash
   npx supabase secrets list
   # Verify all required secrets are set
   ```

2. **CORS Errors**
   - Check `_shared/cors.ts` is imported
   - Verify `handleCors()` is called first

3. **Database Connection Errors**
   - Check Supabase project is running
   - Verify service role key is correct

### Email Not Sending

#### Check Configuration
```bash
npx supabase secrets list
# Verify SMTP settings are correct
```

#### Test Email Function

Create test Edge Function:
```typescript
import { sendEmail } from '../_shared/email.ts'

serve(async (req: Request) => {
  const result = await sendEmail({
    to: 'test@example.com',
    subject: 'Test Email',
    html: '<p>This is a test</p>'
  })

  return new Response(JSON.stringify({ sent: result }))
})
```

#### Alternative: Use Email Service API

If SMTP isn't working, use Resend or SendGrid:

```bash
# For Resend
npx supabase secrets set RESEND_API_KEY="your-key"

# For SendGrid
npx supabase secrets set SENDGRID_API_KEY="your-key"
```

Update `_shared/email.ts` to use their API instead of SMTP.

## Security

### Audit User Actions

Monitor suspicious activity:

```sql
-- Multiple failed TOTP attempts
-- (Check Edge Function logs)
npx supabase functions logs totp-validate-login --filter "Invalid authentication code"

-- Multiple trial requests from same IP
SELECT
  user_email,
  COUNT(*) as request_count,
  MAX(created_at) as last_request
FROM trial_requests
WHERE created_at > now() - interval '7 days'
GROUP BY user_email
HAVING COUNT(*) > 3;
```

### Rotate Encryption Key

If encryption key is compromised:

1. **Generate new key**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

2. **Re-encrypt all secrets**
   ```typescript
   // Create migration script
   // This requires old and new keys
   const oldKey = 'OLD_KEY'
   const newKey = 'NEW_KEY'

   // For each user:
   // 1. Decrypt with old key
   // 2. Encrypt with new key
   // 3. Update profile
   ```

3. **Update secret**
   ```bash
   npx supabase secrets set ENCRYPTION_KEY="new-key"
   ```

4. **Redeploy functions**
   ```bash
   npx supabase functions deploy --no-verify-jwt
   ```

### Review RLS Policies

Verify Row-Level Security is working:

```sql
-- Test as regular user (should only see own data)
SET ROLE authenticated;
SET request.jwt.claim.sub = 'USER_UUID';

SELECT * FROM profiles;
-- Should only return one row (user's own profile)

-- Reset to admin
RESET ROLE;
```

### Access Logs

Enable audit logging:

```sql
-- Create audit table
CREATE TABLE audit_log (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID,
  action TEXT,
  table_name TEXT,
  record_id UUID,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create audit trigger function
CREATE OR REPLACE FUNCTION audit_trigger()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO audit_log (
    user_id,
    action,
    table_name,
    record_id,
    old_data,
    new_data
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    to_jsonb(OLD),
    to_jsonb(NEW)
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Apply to sensitive tables
CREATE TRIGGER audit_profiles
  AFTER INSERT OR UPDATE OR DELETE ON profiles
  FOR EACH ROW EXECUTE FUNCTION audit_trigger();
```

## Backup and Recovery

### Database Backup

Supabase automatically backs up your database. To restore:

1. Go to Supabase Dashboard > Database > Backups
2. Select backup point
3. Click "Restore"

### Manual Backup

```bash
# Backup profiles table
npx supabase db dump --data-only -t profiles > profiles_backup.sql

# Backup trial requests
npx supabase db dump --data-only -t trial_requests > trial_requests_backup.sql
```

### Export User List

```sql
COPY (
  SELECT
    email,
    totp_enabled,
    is_trial_user,
    trial_expiration_date,
    created_at
  FROM profiles
  ORDER BY created_at DESC
) TO '/tmp/users_export.csv' WITH CSV HEADER;
```

## Best Practices

1. **Regular Monitoring**
   - Check trial expiration report daily
   - Review pending requests weekly
   - Monitor Edge Function logs for errors

2. **Trial Extensions**
   - Review each request individually
   - Document reason in admin_notes
   - Standard extension: 3 days
   - Special cases: up to 7 days

3. **User Communication**
   - Respond to trial requests within 24-48 hours
   - Send personalized emails for denials
   - Proactively reach out to active trial users

4. **Security**
   - Rotate service role key quarterly
   - Review audit logs monthly
   - Update dependencies regularly

5. **Documentation**
   - Keep this guide updated
   - Document custom procedures
   - Share knowledge with team

## Emergency Procedures

### System Down

1. Check Supabase status page
2. View Edge Function logs for errors
3. Test database connectivity
4. Verify GitHub Pages is serving
5. Check DNS configuration

### Mass Trial Reset

If system issues affected trials:

```sql
-- Extend all active trials by 3 days
UPDATE profiles
SET
  trial_expiration_date = trial_expiration_date + interval '3 days',
  updated_at = now()
WHERE is_trial_user = true
  AND trial_expiration_date > now();
```

### Data Breach Response

1. **Immediately**
   - Rotate all keys and secrets
   - Force logout all users
   - Disable affected Edge Functions

2. **Investigation**
   - Review audit logs
   - Check access logs
   - Identify compromised data

3. **Recovery**
   - Restore from backup if needed
   - Reset affected user passwords
   - Require TOTP re-setup for all users

4. **Communication**
   - Notify affected users
   - Document incident
   - Update security procedures

## Support Escalation

### Contact Channels

- **Supabase Support**: support@supabase.io
- **Technical Issues**: Create GitHub issue
- **Security Issues**: Email security team immediately

### When to Escalate

- Database performance degradation
- Edge Functions consistently failing
- Security incidents
- Data integrity issues
- Unusual user activity patterns

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [TOTP RFC 6238](https://tools.ietf.org/html/rfc6238)
- [PostgreSQL RLS Guide](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)

---

**Last Updated**: 2026-01-16
**Version**: 1.0.0
