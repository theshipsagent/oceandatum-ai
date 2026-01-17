# Quick Start Guide - Get Running in 30 Minutes

The fastest way to get Datum TOTP 2FA system deployed and running.

## Prerequisites (5 minutes)

```bash
# Verify Node.js version (need 20+)
node --version

# Clone and install
cd oceandatum.ai
npm install

# Note: We use npx supabase (no installation needed!)
```

## Supabase Setup (10 minutes)

### 1. Create Project
1. Go to [supabase.com/dashboard](https://supabase.com/dashboard)
2. Click "New Project"
3. Name: `oceandatum-ai`
4. Generate password (save it!)
5. Choose region, create

### 2. Link Project
```bash
npx supabase login
npx supabase link --project-ref YOUR_PROJECT_REF
```

Get `YOUR_PROJECT_REF` from project URL: `https://xxxxx.supabase.co`

### 3. Apply Migrations
```bash
npx supabase db push
```

### 4. Set Secrets
```bash
# Generate encryption key
KEY=$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")
echo "Generated key: $KEY"

# Set secrets (replace values)
npx supabase secrets set ENCRYPTION_KEY="$KEY"
npx supabase secrets set ADMIN_EMAIL="your-email@gmail.com"
npx supabase secrets set SMTP_HOST="smtp.gmail.com"
npx supabase secrets set SMTP_PORT="587"
npx supabase secrets set SMTP_USER="your-email@gmail.com"
npx supabase secrets set SMTP_PASSWORD="your-gmail-app-password"
npx supabase secrets set SMTP_FROM="noreply@oceandatum.ai"
npx supabase secrets set TRIAL_DURATION_DAYS="3"
npx supabase secrets set TOTP_WINDOW="1"
npx supabase secrets set TOTP_ISSUER="Datum"
```

**Gmail App Password:**
[myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)

### 5. Deploy Functions
```bash
npx supabase functions deploy totp-setup
npx supabase functions deploy totp-verify-setup
npx supabase functions deploy totp-validate-login
npx supabase functions deploy trial-request
npx supabase functions deploy admin-reset-trial
```

## Frontend Setup (5 minutes)

### 1. Create .env
```bash
# Get these from Supabase Dashboard > Settings > API
cat > .env << EOF
VITE_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
EOF
```

### 2. Test Locally
```bash
npm run dev
```

Visit `http://localhost:5173` and test:
- Registration
- TOTP setup
- Login

## Deploy to Production (10 minutes)

### 1. Configure GitHub Secrets
Repository Settings > Secrets > Actions:
- `VITE_SUPABASE_URL`: Your Supabase URL
- `VITE_SUPABASE_ANON_KEY`: Your anon key

### 2. Enable GitHub Pages
Repository Settings > Pages:
- Source: **GitHub Actions**

### 3. Deploy
```bash
git add .
git commit -m "Deploy Datum"
git push origin main
```

Wait 2-3 minutes, then visit `https://oceandatum.ai`

## Quick Test

### Test Registration
1. Go to `/register`
2. Enter email/password
3. Check email for verification
4. Click verification link
5. Scan QR code with Google Authenticator
6. Enter 6-digit code
7. Should see dashboard

### Test Login
1. Go to `/login`
2. Enter email/password
3. Enter TOTP code
4. Should see dashboard with trial banner

### Test Trial Request
1. Manually expire trial:
   ```sql
   UPDATE profiles
   SET trial_expiration_date = now() - interval '1 day'
   WHERE email = 'your-test-email';
   ```
2. Try to login
3. Should redirect to trial-expired page
4. Click "Request Extension"
5. Fill form, submit
6. Check admin email

### Test Admin Reset
```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/admin-reset-trial \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "days": 3}'
```

## Common Issues

### Build Fails
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Functions Not Working
```bash
# Check logs
npx supabase functions logs totp-setup

# Verify secrets
npx supabase secrets list
```

### Email Not Sending
- Verify SMTP credentials
- Check Gmail app password
- Try Resend instead (see DEPLOYMENT.md)

### Trial Not Expiring
```sql
-- Check profile
SELECT * FROM profiles WHERE email = 'user@example.com';

-- Test function
SELECT is_trial_expired(id) FROM profiles WHERE email = 'user@example.com';
```

## Next Steps

- Read [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for admin operations
- Read [SECURITY.md](./SECURITY.md) for security details
- Set up monitoring (see DEPLOYMENT.md)
- Configure backups
- Review RLS policies

## Emergency Rollback

### Frontend
```bash
git revert HEAD
git push origin main
```

### Backend
```bash
# Restore database backup in Supabase Dashboard
# Redeploy previous function versions
```

## Support

- **Documentation**: See README.md
- **Admin Tasks**: See ADMIN_GUIDE.md
- **Deployment Help**: See DEPLOYMENT.md
- **Security Info**: See SECURITY.md

## Success Checklist

- [ ] Supabase project created
- [ ] Database migrations applied
- [ ] Secrets configured
- [ ] Edge Functions deployed
- [ ] Frontend deployed
- [ ] Custom domain working
- [ ] Registration tested
- [ ] TOTP setup tested
- [ ] Login tested
- [ ] Trial system tested
- [ ] Admin reset tested

**All checked? You're live! 🎉**

---

**Time Required**: 30-35 minutes
**Difficulty**: Medium
**Prerequisites**: Node.js, Git, Supabase CLI
