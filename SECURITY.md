# Security Architecture - Datum TOTP 2FA System

This document details the security measures implemented in the Datum authentication system.

## Overview

The system implements multiple layers of security:

1. **Authentication Layer** - Supabase Auth + TOTP 2FA
2. **Encryption Layer** - AES-256-GCM for secrets
3. **Database Layer** - PostgreSQL with Row-Level Security
4. **Network Layer** - HTTPS, CORS, rate limiting
5. **Application Layer** - Input validation, XSS protection

## Authentication Architecture

### Two-Factor Authentication (TOTP)

**Algorithm**: RFC 6238 - Time-Based One-Time Password

**Implementation Details:**
- **Hash**: HMAC-SHA1
- **Time Step**: 30 seconds
- **Code Length**: 6 digits
- **Window**: ±1 (60-second tolerance)
- **Counter**: Unix timestamp / 30

**Security Properties:**
- ✅ Time-based, expires every 30 seconds
- ✅ Cryptographically secure HMAC
- ✅ Resistant to replay attacks (within window)
- ✅ Secrets never transmitted
- ✅ Device-independent (portable to new device)

**Attack Mitigation:**
- **Brute Force**: 1,000,000 possible codes, 30-second window
- **Replay**: Codes expire after 60 seconds (±1 window)
- **Phishing**: Code displayed on user's device only
- **MITM**: Encrypted secrets, HTTPS transport

### Authentication Flow

```
1. User registers → Email/password stored in Supabase Auth
2. Email verification → Confirms email ownership
3. TOTP setup → Generates secret, encrypts, stores encrypted
4. User scans QR → Secret copied to authenticator app
5. User verifies → Proves they have the secret
6. Login → Email/password + TOTP code required
```

### Secret Storage

**TOTP secrets are encrypted at rest:**

```typescript
// Never stored in plaintext
plainSecret → encrypt(AES-256-GCM) → ciphertext:iv → database
```

**Decryption only happens:**
- During TOTP validation (server-side)
- In Edge Function with service role access
- Never sent to client

## Encryption

### Algorithm: AES-256-GCM

**Properties:**
- **Mode**: Galois/Counter Mode (authenticated encryption)
- **Key Size**: 256 bits (32 bytes)
- **IV Size**: 96 bits (12 bytes)
- **Tag Size**: 128 bits (authentication tag)

**Why AES-256-GCM?**
- ✅ Authenticated encryption (integrity + confidentiality)
- ✅ NIST approved
- ✅ Fast (hardware acceleration available)
- ✅ Resistant to timing attacks
- ✅ Detects tampering

### Key Management

**Encryption Key:**
- Generated with crypto.randomBytes(32)
- 256 bits = 2^256 possible keys
- Stored in Supabase Edge Function environment
- Never logged or transmitted
- Rotatable (requires re-encryption)

**Best Practices:**
```bash
# Generate key
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Store securely
supabase secrets set ENCRYPTION_KEY="..."

# Rotate quarterly
# See ADMIN_GUIDE.md for rotation procedure
```

### Storage Format

```
Encrypted Data Format: "base64(ciphertext):base64(iv)"

Example:
"XyZ123abc...def456==:AbC789...==xyz123"
 ^ciphertext (varies)  ^IV (12 bytes)
```

**Why this format?**
- IV must be unique per encryption
- IV doesn't need to be secret
- Storing with ciphertext allows decryption
- Base64 encoding for text storage

## Database Security

### Row-Level Security (RLS)

**Enabled on all tables:**

```sql
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE trial_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE totp_setup_tokens ENABLE ROW LEVEL SECURITY;
```

**Policies:**

1. **Profiles Table**
   ```sql
   -- Users can only access their own profile
   CREATE POLICY "Users can view own profile"
     ON profiles FOR SELECT
     USING (auth.uid() = id);

   -- Expired trials cannot read
   CREATE POLICY "Block expired trials"
     ON profiles FOR SELECT
     USING (NOT is_trial_expired(auth.uid()));
   ```

2. **Trial Requests Table**
   ```sql
   -- Users see only their requests
   CREATE POLICY "Users can view own requests"
     ON trial_requests FOR SELECT
     USING (user_id = auth.uid());
   ```

3. **TOTP Setup Tokens Table**
   ```sql
   -- Temporary tokens, auto-expire
   -- Only user can access their token
   CREATE POLICY "Users can view own tokens"
     ON totp_setup_tokens FOR SELECT
     USING (user_id = auth.uid());
   ```

### SQL Injection Prevention

**All queries use parameterized statements:**

```typescript
// Safe ✅
await supabase
  .from('profiles')
  .select('*')
  .eq('id', userId)

// Never use string concatenation ❌
// await supabase.query(`SELECT * FROM profiles WHERE id = '${userId}'`)
```

**Supabase automatically parameterizes all queries.**

### Data Encryption

**Encrypted Fields:**
- `profiles.totp_secret` - AES-256-GCM encrypted
- `totp_setup_tokens.totp_secret` - AES-256-GCM encrypted

**Plaintext Fields (non-sensitive):**
- Email addresses (needed for lookup)
- Trial dates (needed for queries)
- Boolean flags

**Sensitive Data Never Logged:**
- Encryption keys
- TOTP secrets (encrypted or decrypted)
- User passwords
- Service role keys

## Network Security

### HTTPS/TLS

**Frontend:**
- GitHub Pages enforces HTTPS
- TLS 1.2+ only
- Valid SSL certificate

**Backend:**
- Supabase enforces HTTPS
- All API calls over TLS
- No mixed content

### CORS Configuration

```typescript
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}
```

**Why allow '*'?**
- Frontend domain may change
- Supabase handles authentication
- JWT validates requests

**In production, restrict to domain:**
```typescript
'Access-Control-Allow-Origin': 'https://oceandatum.ai'
```

### Rate Limiting

**Supabase Built-in:**
- 60 requests per minute per IP
- Automatic DDoS protection
- Configurable in dashboard

**Application-level:**
- Trial requests: 1 per 24 hours per user
- Implemented in Edge Function
- Database-enforced

**TOTP Brute Force Protection:**
- 30-second window for code validity
- New code every 30 seconds
- Maximum 2 attempts per code
- Built-in Supabase Auth lockout

## Application Security

### XSS Protection

**React automatically escapes:**
```tsx
// Safe - React escapes by default ✅
<div>{userInput}</div>

// Unsafe - Only use for trusted content ❌
<div dangerouslySetInnerHTML={{__html: userInput}} />
```

**Content Security Policy:**
```html
<meta http-equiv="Content-Security-Policy"
      content="default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'">
```

### Input Validation

**Frontend Validation:**
```typescript
// Email format
/^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Password strength
minLength: 8

// TOTP token
/^\d{6}$/

// Trial reason
minLength: 20
```

**Backend Validation:**
```typescript
// Always validate on server
if (!token || !/^\d{6}$/.test(token)) {
  return errorResponse('Invalid token format')
}
```

**Never trust client input:**
- Validate all inputs
- Sanitize before storage
- Escape before display

### CSRF Protection

**Not needed because:**
- No cookie-based sessions
- JWT in Authorization header
- Supabase handles CSRF for Auth endpoints

**APIs require Authorization header:**
```typescript
const authHeader = req.headers.get('Authorization')
if (!authHeader) return errorResponse('Unauthorized', 401)
```

## Trial System Security

### Trial Expiration Enforcement

**Multiple layers:**

1. **Database trigger** - Updates timestamps
2. **RLS policy** - Blocks access to data
3. **Edge Function** - Validates on login
4. **Frontend** - Checks and redirects

**Why multiple layers?**
- Defense in depth
- Failsafe if one layer fails
- Different attack vectors

### Trial Abuse Prevention

**Rate Limiting:**
```sql
SELECT has_pending_trial_request('user@example.com', 24)
-- Returns true if request in last 24 hours
```

**Email Verification Required:**
- Can't create account without verified email
- Prevents mass account creation

**TOTP Required:**
- Can't use trial without authenticator app
- Prevents easy account sharing
- Harder to automate

**Potential Enhancements:**
- IP-based rate limiting
- Device fingerprinting
- Payment verification
- Phone verification

## Edge Function Security

### Authentication

**Every function checks auth:**
```typescript
const user = await getUserFromToken(authHeader)
if (!user) return errorResponse('Unauthorized', 401)
```

**Admin functions check admin:**
```typescript
const adminEmail = Deno.env.get('ADMIN_EMAIL')
if (user.email !== adminEmail) {
  return errorResponse('Forbidden', 403)
}
```

### Environment Variables

**Never hardcode secrets:**
```typescript
// Good ✅
const key = Deno.env.get('ENCRYPTION_KEY')

// Bad ❌
const key = 'abc123...'
```

**Set via Supabase CLI:**
```bash
supabase secrets set KEY="value"
```

**Access control:**
- Service role can access secrets
- Anon key cannot access secrets
- User JWTs cannot access secrets

### Error Handling

**Never expose internals:**
```typescript
// Good ✅
return errorResponse('Failed to setup TOTP')

// Bad ❌
return errorResponse(`Database error: ${error.message}`)
```

**Log details server-side:**
```typescript
console.error('Detailed error:', error)
return errorResponse('Generic user-facing message')
```

## Session Management

### JWT Tokens

**Supabase Auth issues JWTs:**
- Signed with secret key
- Short-lived (1 hour default)
- Auto-refreshed
- Includes user metadata

**Token Structure:**
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
^header
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
^payload (user ID, email, expiry)
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
^signature
```

**Verification:**
- Every API call validates JWT
- Checks signature
- Checks expiration
- Extracts user ID

### Session Storage

**Where tokens stored:**
```typescript
// localStorage (persistent)
localStorage.setItem('supabase.auth.token', token)

// sessionStorage (TOTP verification flag)
sessionStorage.setItem('totp_verified', 'true')
```

**Why sessionStorage for TOTP?**
- Cleared on tab close
- Requires TOTP on new session
- Prevents "remember me" bypass

### Logout

**Clears all session data:**
```typescript
// Clear TOTP flag
sessionStorage.removeItem('totp_verified')

// Sign out (clears JWT)
await supabase.auth.signOut()

// Supabase invalidates token server-side
```

## Monitoring and Auditing

### Logging

**What we log:**
- Authentication attempts (success/failure)
- Edge Function invocations
- Database queries (slow queries)
- Error messages (sanitized)

**What we DON'T log:**
- Passwords
- TOTP secrets
- Encryption keys
- Full JWT tokens
- Personally identifiable info (unless necessary)

### Audit Trail

**Enable audit logging:**
```sql
CREATE TABLE audit_log (
  id BIGSERIAL PRIMARY KEY,
  user_id UUID,
  action TEXT,
  table_name TEXT,
  timestamp TIMESTAMPTZ DEFAULT now()
);
```

**Monitor:**
- Failed login attempts
- Multiple TOTP failures
- Trial request patterns
- Admin actions

### Alerts

**Set up alerts for:**
- Repeated failed logins (> 5 in 1 hour)
- Edge Function errors (> 10% error rate)
- Database connection issues
- Unusual trial request volume

## Compliance

### GDPR Compliance

**Right to Access:**
```sql
-- Export user data
SELECT * FROM profiles WHERE id = 'USER_ID';
SELECT * FROM trial_requests WHERE user_id = 'USER_ID';
```

**Right to Deletion:**
```sql
-- Delete user (cascades to all related data)
DELETE FROM auth.users WHERE id = 'USER_ID';
```

**Data Minimization:**
- Only collect necessary data
- Email, password, TOTP secret
- Trial dates for access control
- No unnecessary tracking

**Data Protection:**
- Encryption at rest
- TLS in transit
- RLS prevents unauthorized access
- Regular backups

### Security Standards

**OWASP Top 10 Compliance:**
- ✅ A01: Broken Access Control - RLS + JWT
- ✅ A02: Cryptographic Failures - AES-256-GCM
- ✅ A03: Injection - Parameterized queries
- ✅ A04: Insecure Design - Multi-layer security
- ✅ A05: Security Misconfiguration - Hardened defaults
- ✅ A06: Vulnerable Components - Regular updates
- ✅ A07: Auth Failures - 2FA required
- ✅ A08: Data Integrity - Authenticated encryption
- ✅ A09: Logging Failures - Comprehensive logging
- ✅ A10: SSRF - No user-controlled URLs

## Incident Response

### Security Incident Procedure

1. **Detect**
   - Monitor logs for anomalies
   - User reports
   - Automated alerts

2. **Contain**
   - Disable affected functions
   - Revoke compromised tokens
   - Block malicious IPs

3. **Eradicate**
   - Identify root cause
   - Patch vulnerability
   - Rotate affected secrets

4. **Recover**
   - Restore from backup if needed
   - Re-enable services
   - Monitor closely

5. **Learn**
   - Document incident
   - Update procedures
   - Improve monitoring

### Emergency Contacts

**Security Issues:**
- Email: security@datum.example.com
- Phone: +1-XXX-XXX-XXXX (24/7)
- PagerDuty: On-call rotation

## Security Checklist

### Deployment Security

- [ ] All secrets set in Supabase
- [ ] HTTPS enforced
- [ ] CORS configured
- [ ] RLS enabled on all tables
- [ ] Rate limiting enabled
- [ ] Error messages sanitized
- [ ] Logging configured
- [ ] Backup strategy defined

### Ongoing Security

- [ ] Review logs weekly
- [ ] Update dependencies monthly
- [ ] Rotate keys quarterly
- [ ] Security audit annually
- [ ] Penetration test annually
- [ ] Team security training

### User Security

- [ ] Strong password required (8+ chars)
- [ ] Email verification required
- [ ] 2FA required (TOTP)
- [ ] Session timeout configured
- [ ] Logout clears all tokens

## Security Best Practices

### For Developers

1. **Never commit secrets**
   - Use `.gitignore`
   - Use environment variables
   - Use secret management tools

2. **Validate all inputs**
   - Client-side AND server-side
   - Whitelist, don't blacklist
   - Sanitize before storage

3. **Use parameterized queries**
   - Never concatenate SQL
   - Use ORM/query builder
   - Escape user input

4. **Implement defense in depth**
   - Multiple security layers
   - Assume components can fail
   - Redundant checks

5. **Keep dependencies updated**
   - Regular npm audit
   - Security patches ASAP
   - Monitor security advisories

### For Administrators

1. **Rotate keys regularly**
   - Quarterly encryption key rotation
   - Annual service role key rotation
   - Immediate rotation if compromised

2. **Monitor aggressively**
   - Daily log review
   - Set up automated alerts
   - Track security metrics

3. **Backup everything**
   - Daily database backups
   - Test restore procedure
   - Offsite backup storage

4. **Limit access**
   - Principle of least privilege
   - Separate dev/prod environments
   - Audit admin actions

5. **Document everything**
   - Security procedures
   - Incident responses
   - Configuration changes

## Security Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [NIST Cryptographic Standards](https://csrc.nist.gov/projects/cryptographic-standards-and-guidelines)
- [RFC 6238 - TOTP](https://tools.ietf.org/html/rfc6238)
- [Supabase Security](https://supabase.com/docs/guides/platform/security)
- [PostgreSQL RLS](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)

---

**Last Updated**: 2026-01-16
**Version**: 1.0.0
**Classification**: Internal Use Only
