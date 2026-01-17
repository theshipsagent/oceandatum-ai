# Windows Setup Guide - Supabase CLI with NPX

## Why NPX Instead of Global Install?

The Supabase CLI **no longer supports global npm installation** (`npm install -g supabase`). Instead, we use `npx` which:

✅ **No installation needed** - Downloads and runs automatically
✅ **Always uses latest version** - No manual updates
✅ **No PATH issues** - Works immediately
✅ **No permission errors** - Runs in user space

## Quick Start

Every command in the documentation that uses `supabase` should be replaced with `npx supabase`:

```bash
# ❌ Old way (doesn't work)
supabase login

# ✅ New way (works!)
npx supabase login
```

## Common Commands Reference

| Task | Command |
|------|---------|
| **Login to Supabase** | `npx supabase login` |
| **Link project** | `npx supabase link --project-ref YOUR_REF` |
| **Apply migrations** | `npx supabase db push` |
| **Check status** | `npx supabase db status` |
| **Set secrets** | `npx supabase secrets set KEY="value"` |
| **List secrets** | `npx supabase secrets list` |
| **Deploy function** | `npx supabase functions deploy function-name` |
| **View logs** | `npx supabase functions logs function-name` |

## First-Time Setup

### 1. Verify Node.js
```bash
node --version
# Should be v20 or higher
```

If not installed, download from [nodejs.org](https://nodejs.org)

### 2. Navigate to Project
```bash
cd "G:\My Drive\LLM\theshipsagent.github.io\oceandatum.ai"
```

### 3. Login to Supabase
```bash
npx supabase login
```

This will:
1. Download Supabase CLI (first time only)
2. Open browser for authentication
3. Save credentials locally

### 4. Link to Your Project
```bash
npx supabase link --project-ref YOUR_PROJECT_REF
```

Get `YOUR_PROJECT_REF` from your Supabase project URL:
`https://xxxxxxxxxxxxx.supabase.co` ← the `xxxxxxxxxxxxx` part

## Complete Deployment Example

Here's the full deployment using npx:

```bash
# Navigate to project
cd "G:\My Drive\LLM\theshipsagent.github.io\oceandatum.ai"

# Login (one time)
npx supabase login

# Link project (one time)
npx supabase link --project-ref YOUR_PROJECT_REF

# Apply database migrations
npx supabase db push

# Generate encryption key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Set secrets (replace with your values)
npx supabase secrets set ENCRYPTION_KEY="your-generated-key"
npx supabase secrets set ADMIN_EMAIL="your-email@gmail.com"
npx supabase secrets set SMTP_HOST="smtp.gmail.com"
npx supabase secrets set SMTP_PORT="587"
npx supabase secrets set SMTP_USER="your-email@gmail.com"
npx supabase secrets set SMTP_PASSWORD="your-gmail-app-password"
npx supabase secrets set SMTP_FROM="noreply@oceandatum.ai"
npx supabase secrets set TRIAL_DURATION_DAYS="3"
npx supabase secrets set TOTP_WINDOW="1"
npx supabase secrets set TOTP_ISSUER="Datum"

# Verify secrets are set
npx supabase secrets list

# Deploy all Edge Functions
npx supabase functions deploy totp-setup
npx supabase functions deploy totp-verify-setup
npx supabase functions deploy totp-validate-login
npx supabase functions deploy trial-request
npx supabase functions deploy admin-reset-trial

# Check function status
npx supabase functions list
```

## Gmail SMTP Setup

To get Gmail app password:

1. Go to [myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
2. Select "Mail" and "Windows Computer"
3. Click "Generate"
4. Copy the 16-character password
5. Use it for `SMTP_PASSWORD` (no spaces)

## Troubleshooting

### "npx: command not found"
**Solution**: Install Node.js from [nodejs.org](https://nodejs.org)

### "Permission denied" errors
**Solution**: Run PowerShell as Administrator, or use regular Command Prompt

### NPX downloads every time
**First run**: NPX downloads CLI (~50MB) - this is normal
**Subsequent runs**: Uses cached version (instant)

### Functions won't deploy
Check:
```bash
# 1. Verify you're linked
npx supabase db status

# 2. Check if functions exist
dir supabase\functions

# 3. Try deploying with full path
npx supabase functions deploy totp-setup --project-ref YOUR_REF
```

### Database migrations fail
```bash
# Check current migration status
npx supabase db status

# If needed, reset (WARNING: deletes data)
npx supabase db reset

# Or manually run SQL in Supabase Dashboard SQL Editor
```

## Performance Tips

### Speed Up NPX (Optional)

Cache the CLI permanently:
```bash
# This downloads once and keeps it
npx supabase@latest --help

# Now subsequent runs are instant
```

### Use Aliases (PowerShell)

Add to your PowerShell profile:
```powershell
# Open profile
notepad $PROFILE

# Add this line
function sb { npx supabase $args }

# Now you can use:
sb login
sb db push
sb functions deploy totp-setup
```

## Alternative: Manual Binary Download

If npx doesn't work for some reason:

1. Download from [github.com/supabase/cli/releases](https://github.com/supabase/cli/releases)
2. Get `supabase_windows_amd64.zip`
3. Extract to `C:\supabase\`
4. Add to PATH or use full path: `C:\supabase\supabase.exe login`

## Common Windows Issues

### Path with Spaces
```bash
# Use quotes around paths with spaces
cd "G:\My Drive\LLM\theshipsagent.github.io\oceandatum.ai"

# Not: cd G:\My Drive\LLM\... (will fail)
```

### PowerShell Execution Policy
If scripts are blocked:
```powershell
# Run PowerShell as Administrator
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Firewall Blocking
If npx hangs:
1. Check Windows Firewall
2. Allow Node.js through firewall
3. Try different network (not corporate)

## Verification

After setup, verify everything works:

```bash
# Check database
npx supabase db status

# Check functions
npx supabase functions list

# Check secrets (values hidden)
npx supabase secrets list
```

All should show green/success status.

## Next Steps

Once setup is complete, follow:
1. **QUICKSTART.md** - Deploy frontend
2. **DEPLOYMENT.md** - Full deployment guide
3. **ADMIN_GUIDE.md** - Admin operations

## Support

If you encounter issues:
1. Check Node.js version: `node --version`
2. Try in regular Command Prompt (not PowerShell)
3. Verify internet connection (npx needs to download)
4. Check Supabase status page: [status.supabase.com](https://status.supabase.com)

---

**Summary**: Replace all `supabase` commands with `npx supabase` and you're good to go! No installation needed.
