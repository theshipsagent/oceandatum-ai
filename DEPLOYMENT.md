# Deployment Guide - Datum TOTP 2FA System

Step-by-step guide to deploy the Datum authentication system to production.

## Pre-Deployment Checklist

- [ ] Supabase account created
- [ ] GitHub repository created
- [ ] Domain configured (oceandatum.ai)
- [ ] SMTP credentials obtained
- [ ] Node.js 20+ installed
- [ ] All code committed to Git

**Note**: No need to install Supabase CLI - we use `npx supabase` instead!

## Step 1: Create Supabase Project

1. Go to [supabase.com](https://supabase.com/dashboard)
2. Click "New Project"
3. Fill in:
   - **Name**: oceandatum-ai
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to users
4. Wait for project to initialize (~2 minutes)
5. Note your:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon key: `eyJhbG...`
   - Service role key: `eyJhbG...` (keep secret!)

## Step 2: Initialize Supabase Locally

```bash
cd oceandatum.ai

# Install Supabase CLI if not installed
npm install -g supabase

# Login to Supabase
npx supabase login

# Link to your project
npx supabase link --project-ref YOUR_PROJECT_REF
```

Replace `YOUR_PROJECT_REF` with the ID from your Supabase project URL.

## Step 3: Apply Database Migrations

```bash
# Push all migrations to Supabase
npx supabase db push

# Verify migrations were applied
npx supabase db status
```

You should see all 4 migrations applied:
- `20260116000001_create_profiles_table`
- `20260116000002_create_trial_requests_table`
- `20260116000003_create_totp_setup_tokens_table`
- `20260116000004_create_admin_functions`

## Step 4: Configure Supabase Secrets

### Generate Encryption Key

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Copy the output (64-character hex string).

### Set All Secrets

```bash
# Required secrets
npx supabase secrets set ENCRYPTION_KEY="your-64-char-hex-key"
npx supabase secrets set ADMIN_EMAIL="your-admin@email.com"

# SMTP settings (example for Gmail)
npx supabase secrets set SMTP_HOST="smtp.gmail.com"
npx supabase secrets set SMTP_PORT="587"
npx supabase secrets set SMTP_USER="your-email@gmail.com"
npx supabase secrets set SMTP_PASSWORD="your-app-password"
npx supabase secrets set SMTP_FROM="noreply@oceandatum.ai"

# Optional: Use Resend instead of SMTP
# npx supabase secrets set RESEND_API_KEY="re_xxxxxxxxxxxx"

# Trial configuration
npx supabase secrets set TRIAL_DURATION_DAYS="3"
npx supabase secrets set TOTP_WINDOW="1"
npx supabase secrets set TOTP_ISSUER="Datum"
```

**For Gmail SMTP:**
1. Enable 2-Step Verification
2. Generate App Password: [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
3. Use the 16-character password as `SMTP_PASSWORD`

### Verify Secrets

```bash
npx supabase secrets list
```

Should show all secrets (values hidden).

## Step 5: Deploy Edge Functions

```bash
# Deploy all functions
npx supabase functions deploy totp-setup
npx supabase functions deploy totp-verify-setup
npx supabase functions deploy totp-validate-login
npx supabase functions deploy trial-request
npx supabase functions deploy admin-reset-trial

# Verify deployment
npx supabase functions list
```

All functions should show as "Deployed".

### Test Edge Functions

```bash
# Test TOTP setup (requires auth token)
curl https://YOUR_PROJECT.supabase.co/functions/v1/totp-setup \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

## Step 6: Configure Frontend

### Create Production .env

Create `.env` file (don't commit this!):

```env
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Test Local Build

```bash
# Install dependencies
npm install

# Build production bundle
npm run build

# Preview production build
npm run preview
```

Visit `http://localhost:4173` and test:
- [ ] Registration works
- [ ] Email verification works
- [ ] TOTP setup works
- [ ] Login works
- [ ] Trial system works

## Step 7: Configure GitHub

### Set Repository Secrets

1. Go to your GitHub repository
2. Settings > Secrets and variables > Actions
3. Add repository secrets:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your anon key

### Enable GitHub Pages

1. Settings > Pages
2. Source: **GitHub Actions**
3. Save

### Update CNAME (if using custom domain)

Edit `oceandatum.ai/CNAME`:
```
oceandatum.ai
```

### Configure DNS

In your domain registrar (e.g., Cloudflare, Namecheap):

**For apex domain (oceandatum.ai):**
```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
```

**For www subdomain:**
```
CNAME www  YOUR_GITHUB_USERNAME.github.io
```

**Wait for DNS propagation** (up to 24 hours, usually <1 hour)

## Step 8: Deploy to Production

### Commit and Push

```bash
git add .
git commit -m "Deploy Datum TOTP 2FA system"
git push origin main
```

### Monitor Deployment

1. Go to GitHub repository > Actions
2. Watch the "Deploy to GitHub Pages" workflow
3. Should complete in 2-3 minutes

### Verify Deployment

Visit your domain: `https://oceandatum.ai`

Test complete flow:
1. [ ] Homepage loads
2. [ ] Can navigate to /register
3. [ ] Registration works
4. [ ] Verification email received
5. [ ] Click verification link
6. [ ] TOTP setup page loads
7. [ ] QR code displays
8. [ ] Can scan with Google Authenticator
9. [ ] Verification code works
10. [ ] Dashboard loads
11. [ ] Trial banner shows
12. [ ] Can log out
13. [ ] Can log in with TOTP
14. [ ] Protected routes require auth

## Step 9: Configure Email Notifications

### Test Email Sending

Submit a trial request and verify admin email is received.

If emails aren't working:

1. **Check SMTP logs** in Supabase Functions
2. **Verify SMTP credentials** are correct
3. **Try alternative provider** (Resend, SendGrid)

### Alternative: Use Resend

If SMTP isn't working, use Resend:

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain
3. Get API key
4. Set secret:
   ```bash
   npx supabase secrets set RESEND_API_KEY="re_xxxxxxxxxxxx"
   ```
5. Redeploy functions

## Step 10: Production Testing

### Create Test Accounts

Create 3 test users with different states:

1. **Active trial user**
   - Register normally
   - Complete TOTP setup
   - Verify trial works

2. **Expired trial user**
   ```sql
   UPDATE profiles
   SET trial_expiration_date = now() - interval '1 day'
   WHERE email = 'expired@test.com';
   ```
   - Try to login
   - Verify redirect to trial-expired page
   - Submit trial request
   - Verify admin email received

3. **Full access user**
   ```sql
   UPDATE profiles
   SET is_trial_user = false
   WHERE email = 'premium@test.com';
   ```
   - Login should work without trial restrictions

### Admin Operations

Test admin functions:

```bash
# Reset trial
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/admin-reset-trial \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email": "expired@test.com", "days": 3}'

# Verify user received email
# Verify user can now login
```

### Security Testing

1. **Test RLS policies**
   - Try accessing other users' data
   - Should fail with 403/404

2. **Test TOTP validation**
   - Try wrong codes
   - Try expired codes
   - Verify lockout after failures

3. **Test trial enforcement**
   - Expired trial can't access dashboard
   - Trial extension works
   - Non-trial users have full access

## Step 11: Monitoring Setup

### Set Up Monitoring

1. **Supabase Dashboard**
   - Bookmark dashboard URL
   - Monitor daily:
     - Database usage
     - Function invocations
     - Error rates

2. **GitHub Actions**
   - Enable notifications for workflow failures
   - Review deploy logs weekly

3. **Database Checks**
   - Run statistics query daily:
     ```sql
     SELECT * FROM get_trial_statistics();
     ```

### Create Monitoring Script

```bash
#!/bin/bash
# monitor.sh - Run daily

echo "=== Trial Statistics ==="
npx supabase db execute "SELECT * FROM get_trial_statistics();"

echo "\n=== Pending Trial Requests ==="
npx supabase db execute "
  SELECT user_email, reason, created_at
  FROM trial_requests
  WHERE status = 'pending'
  ORDER BY created_at DESC;
"

echo "\n=== Users Expiring Today ==="
npx supabase db execute "
  SELECT email, trial_expiration_date
  FROM profiles
  WHERE is_trial_user = true
    AND trial_expiration_date::date = CURRENT_DATE
  ORDER BY trial_expiration_date;
"
```

## Step 12: Documentation

### Update DNS Documentation

Document your DNS setup for team:
- Domain registrar
- DNS settings
- SSL certificate status

### Create Runbook

Create internal runbook with:
- Admin credentials (secure location)
- Emergency procedures
- Escalation contacts
- Common tasks

### Train Team

Ensure team knows:
- How to reset trials
- How to monitor system
- How to handle user issues
- Security procedures

## Post-Deployment Checklist

- [ ] All Edge Functions deployed and working
- [ ] Frontend deployed to GitHub Pages
- [ ] Custom domain working with SSL
- [ ] Database migrations applied
- [ ] RLS policies working
- [ ] Email notifications working
- [ ] Trial system working
- [ ] Admin functions working
- [ ] All secrets configured
- [ ] Monitoring set up
- [ ] Team trained
- [ ] Documentation updated
- [ ] Backup strategy defined

## Rollback Procedure

If deployment fails:

### Rollback Frontend

```bash
# Revert to previous commit
git revert HEAD
git push origin main

# Or restore from GitHub Actions artifact
```

### Rollback Database

```bash
# Restore from Supabase backup
# Supabase Dashboard > Database > Backups
```

### Rollback Edge Functions

```bash
# Redeploy previous version
git checkout PREVIOUS_COMMIT
npx supabase functions deploy --no-verify-jwt
```

## Troubleshooting

### Frontend Not Loading

1. Check GitHub Actions logs
2. Verify DNS settings
3. Check browser console for errors
4. Verify environment variables

### Edge Functions Failing

1. Check function logs:
   ```bash
   npx supabase functions logs function-name
   ```
2. Verify secrets are set
3. Test locally
4. Check database connectivity

### Emails Not Sending

1. Verify SMTP credentials
2. Check function logs
3. Try test email
4. Consider alternative provider

### Trial System Not Working

1. Check database migrations
2. Verify RLS policies
3. Test database functions
4. Check profile creation trigger

## Performance Optimization

### Frontend

- [ ] Enable Cloudflare CDN
- [ ] Configure caching headers
- [ ] Optimize images
- [ ] Enable compression

### Database

- [ ] Add indexes for common queries
- [ ] Set up connection pooling
- [ ] Monitor slow queries
- [ ] Regular VACUUM

### Edge Functions

- [ ] Minimize cold starts
- [ ] Optimize dependencies
- [ ] Cache API responses
- [ ] Monitor execution time

## Security Hardening

- [ ] Enable Supabase API rate limiting
- [ ] Set up Web Application Firewall (Cloudflare)
- [ ] Enable DDoS protection
- [ ] Configure Content Security Policy
- [ ] Set up audit logging
- [ ] Regular security audits
- [ ] Dependency updates

## Maintenance Schedule

### Daily
- Review trial statistics
- Check pending trial requests
- Monitor error logs

### Weekly
- Review Edge Function logs
- Check database performance
- Update dependencies
- Review security alerts

### Monthly
- Backup verification
- Security audit
- Performance review
- Documentation update

### Quarterly
- Rotate keys
- Team training
- System upgrade
- Disaster recovery drill

## Support

For deployment issues:
- **Email**: devops@datum.example.com
- **Slack**: #datum-deployment
- **On-call**: See PagerDuty rotation

---

**Deployment Date**: ___________
**Deployed By**: ___________
**Version**: 1.0.0
