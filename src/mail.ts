// ── McKnight GrowthOS Mailer ────────────────────────────────────
// Send campaign email straight from the platform through any configured
// SMTP-relay provider's HTTPS API (Workers can't open raw SMTP sockets,
// so relays are the edge-native equivalent — same providers, same DKIM/
// SPF-authenticated delivery): Resend, SendGrid, Mailgun, Postmark,
// Brevo, SMTP2GO. Auto-picks the first configured provider unless
// MAIL_PROVIDER pins one.

export type MailEnv = {
  RESEND_API_KEY?: string
  SENDGRID_API_KEY?: string
  MAILGUN_API_KEY?: string
  MAILGUN_DOMAIN?: string
  POSTMARK_SERVER_TOKEN?: string
  BREVO_API_KEY?: string
  SMTP2GO_API_KEY?: string
  MAIL_PROVIDER?: string
  LEAD_FROM_EMAIL?: string
}

export type MailResult = { ok: boolean; provider: string; error?: string }

const PROVIDERS = ['resend', 'sendgrid', 'mailgun', 'postmark', 'brevo', 'smtp2go'] as const
type Provider = typeof PROVIDERS[number]

export const mailProvidersConfigured = (env: MailEnv | undefined) => ({
  resend: !!env?.RESEND_API_KEY,
  sendgrid: !!env?.SENDGRID_API_KEY,
  mailgun: !!(env?.MAILGUN_API_KEY && env?.MAILGUN_DOMAIN),
  postmark: !!env?.POSTMARK_SERVER_TOKEN,
  brevo: !!env?.BREVO_API_KEY,
  smtp2go: !!env?.SMTP2GO_API_KEY,
})

export const pickProvider = (env: MailEnv | undefined): Provider | null => {
  const conf = mailProvidersConfigured(env)
  const pinned = (env?.MAIL_PROVIDER || '').toLowerCase().trim() as Provider
  if (pinned && PROVIDERS.includes(pinned) && conf[pinned]) return pinned
  for (const p of PROVIDERS) if (conf[p]) return p
  return null
}

const parseFrom = (from: string): { email: string; name: string } => {
  const m = from.match(/^(.*)<([^>]+)>\s*$/)
  if (m) return { name: m[1].trim().replace(/^"|"$/g, ''), email: m[2].trim() }
  return { name: '', email: from.trim() }
}

export const sendMail = async (
  env: MailEnv,
  opts: { to: string[]; subject: string; html: string; from?: string; provider?: string }
): Promise<MailResult> => {
  const provider = (opts.provider && PROVIDERS.includes(opts.provider as Provider) && mailProvidersConfigured(env)[opts.provider as Provider])
    ? opts.provider as Provider
    : pickProvider(env)
  if (!provider) return { ok: false, provider: 'none', error: 'No mail provider configured — add a key in the Key Vault (/integrations)' }
  const from = opts.from || env.LEAD_FROM_EMAIL || 'McKnight GrowthOS <onboarding@resend.dev>'
  const f = parseFrom(from)
  const to = opts.to.filter((e) => /.+@.+\..+/.test(e)).slice(0, 500)
  if (!to.length) return { ok: false, provider, error: 'No valid recipients' }

  try {
    let res: Response
    switch (provider) {
      case 'resend':
        res = await fetch('https://api.resend.com/emails', {
          method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ from, to, subject: opts.subject, html: opts.html })
        }); break
      case 'sendgrid':
        res = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST', headers: { Authorization: `Bearer ${env.SENDGRID_API_KEY}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ personalizations: to.map((e) => ({ to: [{ email: e }] })), from: { email: f.email, name: f.name || undefined }, subject: opts.subject, content: [{ type: 'text/html', value: opts.html }] })
        }); break
      case 'mailgun': {
        const form = new URLSearchParams()
        form.set('from', from); form.set('subject', opts.subject); form.set('html', opts.html)
        for (const e of to) form.append('to', e)
        res = await fetch(`https://api.mailgun.net/v3/${env.MAILGUN_DOMAIN}/messages`, {
          method: 'POST', headers: { Authorization: 'Basic ' + btoa('api:' + env.MAILGUN_API_KEY), 'Content-Type': 'application/x-www-form-urlencoded' },
          body: form.toString()
        }); break
      }
      case 'postmark':
        res = await fetch('https://api.postmarkapp.com/email/batch', {
          method: 'POST', headers: { 'X-Postmark-Server-Token': env.POSTMARK_SERVER_TOKEN!, 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify(to.map((e) => ({ From: from, To: e, Subject: opts.subject, HtmlBody: opts.html, MessageStream: 'broadcast' })))
        }); break
      case 'brevo':
        res = await fetch('https://api.brevo.com/v3/smtp/email', {
          method: 'POST', headers: { 'api-key': env.BREVO_API_KEY!, 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ sender: { email: f.email, name: f.name || 'McKnight GrowthOS' }, to: to.map((e) => ({ email: e })), subject: opts.subject, htmlContent: opts.html })
        }); break
      case 'smtp2go':
        res = await fetch('https://api.smtp2go.com/v3/email/send', {
          method: 'POST', headers: { 'Content-Type': 'application/json', 'X-Smtp2go-Api-Key': env.SMTP2GO_API_KEY! },
          body: JSON.stringify({ sender: from, to, subject: opts.subject, html_body: opts.html })
        }); break
    }
    if (!res!.ok) {
      const err = await res!.text()
      return { ok: false, provider, error: `${res!.status}: ${err.slice(0, 300)}` }
    }
    return { ok: true, provider }
  } catch (e: any) {
    return { ok: false, provider, error: String(e?.message || e).slice(0, 300) }
  }
}

// Campaign wrapper: branded shell around user content
export const campaignHtml = (subject: string, bodyHtml: string, unsubNote = true) => `
<div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#ffffff">
  <div style="background:linear-gradient(135deg,#0a1628 0%,#1e3a8a 48%,#0ea5e9 100%);padding:24px;border-radius:12px 12px 0 0">
    <h2 style="color:#ffffff;margin:0;font-size:20px">${subject.replace(/</g, '&lt;')}</h2>
    <p style="color:#d4a72c;margin:6px 0 0;font-size:12px;font-weight:600">McKnight GrowthOS</p>
  </div>
  <div style="padding:24px;border:1px solid #e2e8f0;border-top:none;color:#1f2937;font-size:15px;line-height:1.65">${bodyHtml}</div>
  <div style="padding:16px 24px;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;background:#f8fafc">
    <p style="font-size:11px;color:#94a3b8;margin:0">© ${new Date().getFullYear()} McKnight Opportunity Group · Powered by RJ Business Solutions${unsubNote ? ' · Reply STOP or unsubscribe to opt out' : ''}</p>
  </div>
</div>`
