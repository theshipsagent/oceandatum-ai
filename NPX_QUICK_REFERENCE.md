# NPX Supabase Quick Reference Card

**Important**: Supabase CLI no longer supports `npm install -g`. Use `npx supabase` instead!

## One-Line Replacement

```bash
# Old (doesn't work) ❌
supabase [command]

# New (works!) ✅
npx supabase [command]
```

## Essential Commands

### Setup (One Time)
```bash
npx supabase login                           # Authenticate with Supabase
npx supabase link --project-ref YOUR_REF     # Link to your project
```

### Database
```bash
npx supabase db push                         # Apply all migrations
npx supabase db status                       # Check migration status
npx supabase db reset                        # Reset database (deletes data!)
npx supabase db execute "SELECT * FROM ..."  # Run SQL query
```

### Secrets Management
```bash
npx supabase secrets set KEY="value"         # Set a secret
npx supabase secrets list                    # List all secrets (values hidden)
npx supabase secrets unset KEY               # Delete a secret
```

### Edge Functions
```bash
npx supabase functions deploy function-name  # Deploy single function
npx supabase functions deploy                # Deploy all functions
npx supabase functions list                  # List deployed functions
npx supabase functions logs function-name    # View logs
npx supabase functions logs function-name --tail  # Follow logs
npx supabase functions serve                 # Test locally
```

### Project Management
```bash
npx supabase projects list                   # List all projects
npx supabase projects create "Project Name"  # Create new project
```

## Complete Deployment Workflow

```bash
# 1. Navigate to project
cd "path/to/oceandatum.ai"

# 2. Login (one time)
npx supabase login

# 3. Link (one time)
npx supabase link --project-ref YOUR_PROJECT_REF

# 4. Apply database schema
npx supabase db push

# 5. Set all secrets
npx supabase secrets set ENCRYPTION_KEY="$(node -e "console.log(require('crypto').randomBytes(32).toString('hex'))")"
npx supabase secrets set ADMIN_EMAIL="your-email@gmail.com"
npx supabase secrets set SMTP_HOST="smtp.gmail.com"
npx supabase secrets set SMTP_PORT="587"
npx supabase secrets set SMTP_USER="your-email@gmail.com"
npx supabase secrets set SMTP_PASSWORD="your-gmail-app-password"
npx supabase secrets set TRIAL_DURATION_DAYS="3"
npx supabase secrets set TOTP_WINDOW="1"
npx supabase secrets set TOTP_ISSUER="Datum"

# 6. Deploy all functions
npx supabase functions deploy totp-setup
npx supabase functions deploy totp-verify-setup
npx supabase functions deploy totp-validate-login
npx supabase functions deploy trial-request
npx supabase functions deploy admin-reset-trial

# 7. Verify
npx supabase db status
npx supabase functions list
npx supabase secrets list
```

## Admin Operations

### Reset User Trial
```bash
# Via Edge Function API (recommended)
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/admin-reset-trial \
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com", "days": 3}'

# Via SQL
npx supabase db execute "SELECT reset_user_trial('user@example.com', 3)"
```

### View Statistics
```bash
npx supabase db execute "SELECT * FROM get_trial_statistics()"
```

### Check Pending Requests
```bash
npx supabase db execute "
  SELECT user_email, reason, created_at
  FROM trial_requests
  WHERE status = 'pending'
  ORDER BY created_at DESC
"
```

## Troubleshooting Commands

### Check Connection
```bash
npx supabase db status
```

### View Function Logs
```bash
npx supabase functions logs totp-setup --tail
```

### Test Function Locally
```bash
npx supabase start                  # Start local Supabase
npx supabase functions serve        # Serve functions locally
# Test at: http://localhost:54321/functions/v1/function-name
```

### Clear Local Cache
```bash
# NPX caches downloads in:
# Windows: %LOCALAPPDATA%\npm-cache
# Mac/Linux: ~/.npm

# Clear if having issues
npm cache clean --force
```

## Environment Variables

Get from Supabase Dashboard > Settings > API:

```bash
# Project URL
https://YOUR_PROJECT_REF.supabase.co

# Anon Key (public)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Service Role Key (secret - for admin only!)
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Useful Flags

```bash
--project-ref REF     # Specify project
--debug               # Show debug output
--workdir PATH        # Set working directory
--help                # Show help
```

## Common Errors & Fixes

### "npx: command not found"
- **Fix**: Install Node.js from nodejs.org

### "Project not linked"
- **Fix**: Run `npx supabase link --project-ref YOUR_REF`

### "Permission denied"
- **Fix**: Run as administrator or check file permissions

### "Network error"
- **Fix**: Check internet connection and firewall

### Functions won't deploy
- **Fix**: Verify `supabase/functions/function-name/index.ts` exists
- **Fix**: Check for syntax errors in function code

### Secrets not working
- **Fix**: Redeploy functions after setting secrets: `npx supabase functions deploy`

## Performance Tips

### Cache CLI Permanently
```bash
# Download and cache (one time)
npx supabase@latest --help

# Now all subsequent calls are instant
```

### Create Alias (Bash/Zsh)
```bash
# Add to ~/.bashrc or ~/.zshrc
alias sb='npx supabase'

# Use it
sb login
sb db push
```

### Create Alias (PowerShell)
```powershell
# Add to $PROFILE
function sb { npx supabase $args }

# Use it
sb login
sb db push
```

## Getting Help

```bash
npx supabase --help                  # General help
npx supabase db --help               # Database commands
npx supabase functions --help        # Function commands
npx supabase secrets --help          # Secrets commands
```

## External Resources

- **Documentation**: [supabase.com/docs](https://supabase.com/docs)
- **CLI Repo**: [github.com/supabase/cli](https://github.com/supabase/cli)
- **Status Page**: [status.supabase.com](https://status.supabase.com)
- **Discord**: [discord.supabase.com](https://discord.supabase.com)

---

**Remember**: Always use `npx supabase` instead of just `supabase`!

**Print this page and keep it handy during deployment.**
