// Email sending utility using SMTP
// Uses external SMTP service (Gmail, SendGrid, etc.)

interface EmailOptions {
  to: string
  subject: string
  text?: string
  html?: string
}

interface SMTPConfig {
  host: string
  port: number
  username: string
  password: string
  from: string
}

/**
 * Get SMTP configuration from environment variables
 */
function getSMTPConfig(): SMTPConfig {
  const host = Deno.env.get('SMTP_HOST')
  const port = Deno.env.get('SMTP_PORT')
  const username = Deno.env.get('SMTP_USER')
  const password = Deno.env.get('SMTP_PASSWORD')
  const from = Deno.env.get('SMTP_FROM') || Deno.env.get('ADMIN_EMAIL')

  if (!host || !port || !username || !password || !from) {
    throw new Error('Missing SMTP configuration in environment variables')
  }

  return {
    host,
    port: parseInt(port),
    username,
    password,
    from,
  }
}

/**
 * Send an email using SMTP
 * This is a simplified implementation. In production, consider using
 * a service like SendGrid, Resend, or AWS SES via their APIs.
 */
export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const config = getSMTPConfig()

    // For now, we'll use a simple fetch to an email API
    // In production, you'd want to use a proper SMTP library or email service API

    // Example using Resend API (you can swap this with SendGrid, etc.)
    const resendApiKey = Deno.env.get('RESEND_API_KEY')

    if (resendApiKey) {
      // Use Resend API if available
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: config.from,
          to: options.to,
          subject: options.subject,
          html: options.html || options.text,
        }),
      })

      return response.ok
    }

    // Fallback: Log email to console (for development)
    console.log('===== EMAIL =====')
    console.log('To:', options.to)
    console.log('From:', config.from)
    console.log('Subject:', options.subject)
    console.log('Body:', options.text || options.html)
    console.log('=================')

    // In development, always return true
    // In production, implement proper SMTP or use an email service API
    return true
  } catch (error) {
    console.error('Email sending error:', error)
    return false
  }
}

/**
 * Send trial request notification to admin
 */
export async function sendTrialRequestEmail(
  userEmail: string,
  reason: string
): Promise<boolean> {
  const adminEmail = Deno.env.get('ADMIN_EMAIL')

  if (!adminEmail) {
    console.error('ADMIN_EMAIL not configured')
    return false
  }

  const html = `
    <h2>New Trial Extension Request</h2>
    <p><strong>User Email:</strong> ${userEmail}</p>
    <p><strong>Reason:</strong></p>
    <blockquote style="border-left: 3px solid #ccc; padding-left: 1rem; margin: 1rem 0;">
      ${reason}
    </blockquote>
    <p>To approve this request, use the admin API:</p>
    <pre style="background: #f4f4f4; padding: 1rem; border-radius: 4px;">
curl -X POST https://YOUR_PROJECT.supabase.co/functions/v1/admin-reset-trial \\
  -H "Authorization: Bearer YOUR_SERVICE_ROLE_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{"email": "${userEmail}", "days": 3}'
    </pre>
  `

  return await sendEmail({
    to: adminEmail,
    subject: `Trial Extension Request - ${userEmail}`,
    html,
  })
}

/**
 * Send trial approval notification to user
 */
export async function sendTrialApprovalEmail(
  userEmail: string,
  expirationDate: string
): Promise<boolean> {
  const html = `
    <h2>Trial Extended!</h2>
    <p>Good news! Your trial extension request has been approved.</p>
    <p><strong>New Trial Expiration:</strong> ${expirationDate}</p>
    <p>You can now log in and continue using Datum.</p>
    <p>
      <a href="https://oceandatum.ai/login" style="display: inline-block; background: #0066cc; color: white; padding: 0.75rem 1.5rem; text-decoration: none; border-radius: 4px;">
        Sign In to Datum
      </a>
    </p>
  `

  return await sendEmail({
    to: userEmail,
    subject: 'Your Trial Has Been Extended',
    html,
  })
}
