# Datum - TOTP 2FA + 3-Day Trial System

A production-ready authentication system with TOTP (Time-based One-Time Password) two-factor authentication and 3-day trial management for oceandatum.ai.

## Features

- ✅ **TOTP 2FA Authentication** - Industry-standard two-factor authentication
- ✅ **3-Day Trial System** - Automatic trial period with extension requests
- ✅ **Secure Encryption** - AES-256-GCM encryption for TOTP secrets
- ✅ **Row-Level Security** - PostgreSQL RLS for data protection
- ✅ **Serverless Backend** - Supabase Edge Functions (Deno)
- ✅ **Modern Frontend** - React + TypeScript + Vite
- ✅ **Email Notifications** - Admin alerts for trial requests
- ✅ **GitHub Pages Hosting** - Free, secure SSL hosting

## Tech Stack

### Frontend
- **React 18** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool
- **React Router** - Navigation
- **Supabase JS** - Backend client
- **QRCode.react** - QR code generation

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Database with RLS
- **Edge Functions** - Serverless functions (Deno)
- **AES-256-GCM** - Encryption

### Hosting
- **GitHub Pages** - Frontend hosting
- **Supabase** - Backend hosting
- **GitHub Actions** - CI/CD

## Project Structure

```
oceandatum.ai/
├── src/                      # React frontend
│   ├── components/
│   │   ├── auth/            # Authentication components
│   │   ├── trial/           # Trial management components
│   │   └── layout/          # Layout components
│   ├── pages/               # Page components
│   ├── context/             # React context
│   ├── hooks/               # Custom hooks
│   ├── lib/                 # Utilities
│   └── styles/              # CSS
├── supabase/
│   ├── migrations/          # Database migrations
│   └── functions/           # Edge Functions
│       ├── _shared/         # Shared utilities
│       ├── totp-setup/      # TOTP setup endpoint
│       ├── totp-verify-setup/
│       ├── totp-validate-login/
│       ├── trial-request/
│       └── admin-reset-trial/
├── .github/workflows/       # GitHub Actions
└── public/                  # Static assets
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm or yarn
- Supabase account

**Note**: No need to install Supabase CLI globally. We use `npx supabase` instead!

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd oceandatum.ai
npm install
```

### 2. Set Up Supabase

#### Create Supabase Project
1. Go to [supabase.com](https://supabase.com)
2. Create a new project
3. Note your project URL and anon key

#### Link Project
```bash
npx supabase link --project-ref YOUR_PROJECT_REF
```

#### Apply Migrations
```bash
npx supabase db push
```

#### Set Secrets
```bash
# Generate encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Set secrets
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

#### Deploy Edge Functions
```bash
npx supabase functions deploy totp-setup
npx supabase functions deploy totp-verify-setup
npx supabase functions deploy totp-validate-login
npx supabase functions deploy trial-request
npx supabase functions deploy admin-reset-trial
```

### 3. Configure Frontend

Create `.env` file:
```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Run Locally

```bash
npm run dev
```

Visit `http://localhost:5173`

### 5. Deploy to GitHub Pages

#### Configure GitHub Secrets
In your GitHub repository settings, add these secrets:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

#### Enable GitHub Pages
1. Go to repository Settings > Pages
2. Source: GitHub Actions

#### Push to Deploy
```bash
git add .
git commit -m "Initial deployment"
git push origin main
```

The GitHub Action will automatically build and deploy.

## Usage

### User Registration Flow

1. User visits `/register`
2. Enters email and password
3. Receives verification email
4. Clicks verification link
5. Redirected to `/totp-setup`
6. Scans QR code with authenticator app
7. Enters 6-digit verification code
8. Trial period starts (3 days)
9. Redirected to `/dashboard`

### User Login Flow

1. User visits `/login`
2. Enters email and password
3. Enters 6-digit TOTP code from app
4. System checks trial expiration
5. If valid, redirected to `/dashboard`
6. If expired, redirected to `/trial-expired`

### Trial Extension Flow

1. User clicks "Request Trial Extension"
2. Fills out reason form
3. Admin receives email notification
4. Admin approves via API call
5. User receives approval email
6. User can log in with new 3-day trial

## Admin Guide

See [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) for detailed admin instructions.

### Quick Admin Tasks

#### Reset User Trial
```bash
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/admin-reset-trial \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "days": 3}'
```

#### Get Trial Statistics
```sql
SELECT * FROM get_trial_statistics();
```

## Security

### TOTP Implementation
- **Algorithm**: HMAC-SHA1 (RFC 6238)
- **Time Step**: 30 seconds
- **Code Length**: 6 digits
- **Window**: ±1 (60-second tolerance)

### Encryption
- **Algorithm**: AES-256-GCM
- **Key Length**: 256 bits (32 bytes)
- **IV**: Random 12 bytes per encryption
- **Storage**: Base64-encoded `ciphertext:iv` format

### Database Security
- **Row-Level Security (RLS)** enabled on all tables
- **Encrypted secrets** in TOTP storage
- **Service role** for admin operations only
- **JWT authentication** for Edge Functions

### Rate Limiting
- **Trial requests**: 1 per 24 hours per email
- **TOTP validation**: Supabase built-in (60 req/min per IP)
- **Login attempts**: Supabase Auth handles

## Troubleshooting

### Frontend Issues

#### Build Errors
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

#### Environment Variables Not Working
- Ensure variables start with `VITE_`
- Restart dev server after changing `.env`
- Check GitHub Secrets are set correctly

### Backend Issues

#### Edge Function Errors
```bash
# View logs
npx supabase functions logs totp-setup

# Test locally
npx supabase functions serve
```

#### Database Issues
```bash
# Check migration status
npx supabase db status

# Reset database (WARNING: deletes all data)
npx supabase db reset
```

### Authentication Issues

#### TOTP Codes Not Working
- Check system time on server and device
- Verify TOTP window setting (default: 1)
- Ensure encryption key is set correctly

#### Trial Expiration Not Working
- Check `trial_expiration_date` in profiles table
- Verify RLS policies are enabled
- Test `is_trial_expired()` function

## Testing

### Manual Testing Checklist

- [ ] User can register with email/password
- [ ] User receives verification email
- [ ] User can set up TOTP with QR code
- [ ] User can log in with TOTP code
- [ ] Trial countdown displays correctly
- [ ] Trial expiration redirects to correct page
- [ ] User can request trial extension
- [ ] Admin receives trial request email
- [ ] Admin can reset user trial
- [ ] User receives trial approval email
- [ ] Protected routes require authentication
- [ ] TOTP required for dashboard access

### Test Users

Create test users with different trial states:
```sql
-- Expired trial user
UPDATE profiles
SET trial_expiration_date = now() - interval '1 day'
WHERE email = 'test@example.com';

-- Non-trial user
UPDATE profiles
SET is_trial_user = false
WHERE email = 'premium@example.com';
```

## Performance

### Frontend
- **Build size**: ~150KB gzipped
- **First load**: <2s on 3G
- **Time to Interactive**: <3s

### Backend
- **Cold start**: 200-500ms
- **Warm start**: <100ms
- **Database queries**: <50ms

## Monitoring

### Metrics to Track
- User registrations
- TOTP setup completion rate
- Trial expiration rate
- Trial extension requests
- Login success/failure rate

### Supabase Dashboard
Monitor in Supabase console:
- Database usage
- Edge Function invocations
- API request count
- Error rates

## Contributing

1. Create feature branch
2. Make changes
3. Test thoroughly
4. Submit pull request

## License

Proprietary - All rights reserved

## Support

For issues or questions:
- Create GitHub issue
- Email: support@datum.example.com

## Changelog

### v1.0.0 (2026-01-16)
- Initial release
- TOTP 2FA authentication
- 3-day trial system
- Admin tools
- GitHub Pages deployment
