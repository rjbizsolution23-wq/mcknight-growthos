// ── McKnight GrowthOS Key Vault ─────────────────────────────────
// Upload keys in a file (.env format) or paste individually — each key
// auto-routes to its integration. Stored in D1 `settings`, merged over
// Cloudflare env secrets at request time (D1 value wins so the UI is
// always authoritative once used). Reads are admin-locked; values are
// masked in every API response.

export type KeyDef = {
  name: string
  group: string
  label: string
  hint?: string
  secret?: boolean // masked in UI (default true unless explicitly false)
}

export const KEY_GROUPS: Record<string, { icon: string; title: string; desc: string }> = {
  security:  { icon: 'fa-lock',            title: 'Security',            desc: 'Locks admin endpoints (LeadFlow CRM, Key Vault, Agents, Mailer)' },
  email:     { icon: 'fa-envelope',        title: 'Email / Mailers',     desc: 'Lead notifications + campaign mailer (SMTP relay via provider APIs)' },
  crm:       { icon: 'fa-address-book',    title: 'CRM (GoHighLevel)',   desc: 'Contact upsert, notes, opportunities, workflows' },
  payments:  { icon: 'fa-credit-card',     title: 'Payments (Stripe)',   desc: 'Checkout sessions from funnels' },
  alerts:    { icon: 'fa-bell',            title: 'Alerts & Fan-out',    desc: 'Slack, Discord, Telegram, Twilio SMS, Zapier/Make webhook, Airtable' },
}

export const KNOWN_KEYS: KeyDef[] = [
  { name: 'ADMIN_API_KEY',       group: 'security', label: 'Admin API Key', hint: 'Any strong string — locks /leads, vault, agents, mailer' },
  // Email / mailers
  { name: 'RESEND_API_KEY',      group: 'email', label: 'Resend API Key', hint: 're_...' },
  { name: 'SENDGRID_API_KEY',    group: 'email', label: 'SendGrid API Key', hint: 'SG....' },
  { name: 'MAILGUN_API_KEY',     group: 'email', label: 'Mailgun API Key' },
  { name: 'MAILGUN_DOMAIN',      group: 'email', label: 'Mailgun Domain', hint: 'mg.yourdomain.com', secret: false },
  { name: 'POSTMARK_SERVER_TOKEN', group: 'email', label: 'Postmark Server Token' },
  { name: 'BREVO_API_KEY',       group: 'email', label: 'Brevo (Sendinblue) API Key', hint: 'xkeysib-...' },
  { name: 'SMTP2GO_API_KEY',     group: 'email', label: 'SMTP2GO API Key', hint: 'api-... (SMTP relay over HTTPS)' },
  { name: 'MAIL_PROVIDER',       group: 'email', label: 'Preferred Mail Provider', hint: 'resend | sendgrid | mailgun | postmark | brevo | smtp2go (auto if blank)', secret: false },
  { name: 'LEAD_NOTIFY_EMAIL',   group: 'email', label: 'Lead Notification Inbox', hint: 'where new-lead emails go', secret: false },
  { name: 'LEAD_FROM_EMAIL',     group: 'email', label: 'From Address', hint: 'Name <you@yourdomain.com> — must be verified with your provider', secret: false },
  // CRM
  { name: 'GHL_API_KEY',         group: 'crm', label: 'GoHighLevel API Key' },
  { name: 'GHL_LOCATION_ID',     group: 'crm', label: 'GHL Location ID', secret: false },
  { name: 'GHL_PIPELINE_ID',     group: 'crm', label: 'GHL Pipeline ID (optional)', secret: false },
  { name: 'GHL_STAGE_ID',        group: 'crm', label: 'GHL Stage ID (optional)', secret: false },
  { name: 'GHL_WORKFLOW_ID',     group: 'crm', label: 'GHL Workflow ID (optional)', secret: false },
  // Payments
  { name: 'STRIPE_SECRET_KEY',   group: 'payments', label: 'Stripe Secret Key', hint: 'sk_live_... / sk_test_...' },
  // Alerts / fan-out
  { name: 'LEAD_WEBHOOK_URL',    group: 'alerts', label: 'Zapier / Make / n8n Webhook URL', secret: false },
  { name: 'SLACK_WEBHOOK_URL',   group: 'alerts', label: 'Slack Incoming Webhook URL' },
  { name: 'DISCORD_WEBHOOK_URL', group: 'alerts', label: 'Discord Webhook URL' },
  { name: 'TELEGRAM_BOT_TOKEN',  group: 'alerts', label: 'Telegram Bot Token' },
  { name: 'TELEGRAM_CHAT_ID',    group: 'alerts', label: 'Telegram Chat ID', secret: false },
  { name: 'TWILIO_ACCOUNT_SID',  group: 'alerts', label: 'Twilio Account SID' },
  { name: 'TWILIO_AUTH_TOKEN',   group: 'alerts', label: 'Twilio Auth Token' },
  { name: 'TWILIO_FROM',         group: 'alerts', label: 'Twilio From Number', hint: '+1...', secret: false },
  { name: 'TWILIO_TO',           group: 'alerts', label: 'Twilio Alert-To Number', hint: '+1...', secret: false },
  { name: 'AIRTABLE_API_KEY',    group: 'alerts', label: 'Airtable API Key', hint: 'pat...' },
  { name: 'AIRTABLE_BASE_ID',    group: 'alerts', label: 'Airtable Base ID', hint: 'app...', secret: false },
  { name: 'AIRTABLE_TABLE',      group: 'alerts', label: 'Airtable Table Name', secret: false },
]

const KNOWN = new Set(KNOWN_KEYS.map((k) => k.name))
export const isKnownKey = (name: string) => KNOWN.has(name)

// Parse an uploaded .env-style file: KEY=value lines, # comments,
// optional `export ` prefix, quoted values. Unknown keys are reported
// back (not silently dropped) so nothing "disappears".
export const parseEnvFile = (text: string): { accepted: Record<string, string>; unknown: string[]; skipped: number } => {
  const accepted: Record<string, string> = {}
  const unknown: string[] = []
  let skipped = 0
  for (const raw of text.split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const m = line.replace(/^export\s+/, '').match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
    if (!m) { skipped++; continue }
    const name = m[1].toUpperCase()
    let val = m[2].trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1)
    if (!val) { skipped++; continue }
    if (KNOWN.has(name)) accepted[name] = val.slice(0, 2000)
    else unknown.push(name)
  }
  return { accepted, unknown, skipped }
}

export const maskValue = (v: string) => (v.length <= 8 ? '••••' : v.slice(0, 4) + '••••' + v.slice(-4))

// ── cfg(): env + D1 merged config ──────────────────────────────
// Cached per-isolate for 30s so hot paths (lead POST) don't add a
// D1 query per request beyond the first.
type CfgCache = { at: number; map: Record<string, string> }
let _cache: CfgCache | null = null

export const loadVault = async (env: any): Promise<Record<string, string>> => {
  if (!env?.DB) return {}
  if (_cache && Date.now() - _cache.at < 30_000) return _cache.map
  try {
    const rows = await env.DB.prepare('SELECT key, value FROM settings').all()
    const map: Record<string, string> = {}
    for (const r of (rows.results || []) as Array<{ key: string; value: string }>) map[r.key] = r.value
    _cache = { at: Date.now(), map }
    return map
  } catch { return {} }
}

export const invalidateVaultCache = () => { _cache = null }

// Returns a proxy-ish merged env object: D1 vault value wins over env secret.
export const cfg = async (env: any): Promise<any> => {
  const vault = await loadVault(env)
  if (!Object.keys(vault).length) return env
  return new Proxy(env || {}, {
    get(target, prop: string) {
      if (typeof prop === 'string' && prop in vault) return vault[prop]
      return (target as any)[prop]
    }
  })
}
