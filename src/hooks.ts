// ── McKnight GrowthOS — Integration Fan-Out layer ──────
// v3.4.0: On every lead, notify every configured channel IN PARALLEL.
// All integrations are optional (set only the secrets you want),
// edge-native (fetch only, no SDKs), and NEVER throw — a failed
// integration can never break a funnel.
//
// Secrets (wrangler pages secret put / .dev.vars):
//   LEAD_WEBHOOK_URL      — Zapier / Make / n8n / any webhook (JSON POST)
//   SLACK_WEBHOOK_URL     — Slack Incoming Webhook
//   DISCORD_WEBHOOK_URL   — Discord channel webhook
//   TELEGRAM_BOT_TOKEN + TELEGRAM_CHAT_ID — Telegram bot alerts
//   TWILIO_ACCOUNT_SID + TWILIO_AUTH_TOKEN + TWILIO_FROM + TWILIO_TO — SMS alerts
//   AIRTABLE_API_KEY + AIRTABLE_BASE_ID + AIRTABLE_TABLE — Airtable rows

export type HooksEnv = {
  LEAD_WEBHOOK_URL?: string
  SLACK_WEBHOOK_URL?: string
  DISCORD_WEBHOOK_URL?: string
  TELEGRAM_BOT_TOKEN?: string
  TELEGRAM_CHAT_ID?: string
  TWILIO_ACCOUNT_SID?: string
  TWILIO_AUTH_TOKEN?: string
  TWILIO_FROM?: string
  TWILIO_TO?: string
  AIRTABLE_API_KEY?: string
  AIRTABLE_BASE_ID?: string
  AIRTABLE_TABLE?: string
}

export type HookResult = { channel: string; ok: boolean; error?: string }

const funnelOf = (src: string | undefined): string => {
  const m = (src || '').match(/\/t\/([a-z0-9-]+)/i)
  return m ? m[1] : 'funnel'
}

const leadSummary = (lead: Record<string, string>) => {
  const who = lead.name || lead.email || lead.phone || 'Unknown'
  const funnel = funnelOf(lead._source)
  const bits = [
    lead.email && `📧 ${lead.email}`,
    lead.phone && `📞 ${lead.phone}`,
    lead._utm_campaign && `📣 ${lead._utm_campaign}`
  ].filter(Boolean).join('  ·  ')
  return { who, funnel, bits }
}

const safeFetch = async (channel: string, url: string, init: RequestInit, okCheck?: (r: Response) => Promise<boolean>): Promise<HookResult> => {
  try {
    const r = await fetch(url, init)
    const ok = okCheck ? await okCheck(r) : r.ok
    return ok ? { channel, ok: true } : { channel, ok: false, error: `HTTP ${r.status}: ${(await r.text()).slice(0, 150)}` }
  } catch (e) {
    return { channel, ok: false, error: String(e).slice(0, 150) }
  }
}

// ── Zapier / Make / n8n / custom webhook — full JSON payload ──
const sendWebhook = (env: HooksEnv, lead: Record<string, string>): Promise<HookResult> =>
  safeFetch('webhook', env.LEAD_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'User-Agent': 'McKnight-GrowthOS/1.0' },
    body: JSON.stringify({
      event: 'lead.created',
      at: new Date().toISOString(),
      funnel: funnelOf(lead._source),
      lead
    })
  })

// ── Slack Incoming Webhook — Block Kit card ───────────────────
const sendSlack = (env: HooksEnv, lead: Record<string, string>): Promise<HookResult> => {
  const { who, funnel, bits } = leadSummary(lead)
  return safeFetch('slack', env.SLACK_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: `🔥 New lead: ${who} — ${funnel}`,
      blocks: [
        { type: 'header', text: { type: 'plain_text', text: `🔥 New Funnel Lead — ${funnel}`, emoji: true } },
        { type: 'section', fields: [
          { type: 'mrkdwn', text: `*Name:*\n${who}` },
          { type: 'mrkdwn', text: `*Funnel:*\n${funnel}` },
          ...(lead.email ? [{ type: 'mrkdwn', text: `*Email:*\n${lead.email}` }] : []),
          ...(lead.phone ? [{ type: 'mrkdwn', text: `*Phone:*\n${lead.phone}` }] : []),
          ...(lead._utm_campaign ? [{ type: 'mrkdwn', text: `*Campaign:*\n${lead._utm_campaign}` }] : [])
        ].slice(0, 10) },
        { type: 'context', elements: [{ type: 'mrkdwn', text: `McKnight GrowthOS · ${lead._source || ''} · <https://mcknight-growthos.pages.dev/leads|Open LeadFlow CRM>` }] }
      ]
    })
  })
}

// ── Discord webhook — embed card ──────────────────────────────
const sendDiscord = (env: HooksEnv, lead: Record<string, string>): Promise<HookResult> => {
  const { who, funnel } = leadSummary(lead)
  return safeFetch('discord', env.DISCORD_WEBHOOK_URL!, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: 'GrowthOS Alerts',
      embeds: [{
        title: `🔥 New Lead — ${funnel}`,
        color: 0x2563eb,
        fields: [
          { name: 'Name', value: who, inline: true },
          ...(lead.email ? [{ name: 'Email', value: lead.email, inline: true }] : []),
          ...(lead.phone ? [{ name: 'Phone', value: lead.phone, inline: true }] : []),
          ...(lead._utm_campaign ? [{ name: 'Campaign', value: lead._utm_campaign, inline: true }] : [])
        ].slice(0, 8),
        footer: { text: 'McKnight GrowthOS' },
        timestamp: new Date().toISOString()
      }]
    })
  }, async (r) => r.status === 204 || r.ok)
}

// ── Telegram bot — message to chat ────────────────────────────
const sendTelegram = (env: HooksEnv, lead: Record<string, string>): Promise<HookResult> => {
  const { who, funnel, bits } = leadSummary(lead)
  const text = `🔥 *New Funnel Lead*\n*${who.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&')}* — ${funnel}\n${bits ? bits.replace(/[_*[\]()~`>#+\-=|{}.!\\]/g, '\\$&') : ''}\n\n[Open LeadFlow CRM](https://mcknight-growthos.pages.dev/leads)`
  return safeFetch('telegram', `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text, parse_mode: 'MarkdownV2', disable_web_page_preview: true })
  })
}

// ── Twilio SMS — speed-to-lead text alert ─────────────────────
const sendTwilioSMS = (env: HooksEnv, lead: Record<string, string>): Promise<HookResult> => {
  const { who, funnel } = leadSummary(lead)
  const body = new URLSearchParams({
    From: env.TWILIO_FROM!,
    To: env.TWILIO_TO!,
    Body: `🔥 New lead: ${who} — ${funnel} funnel${lead.phone ? ` · ${lead.phone}` : ''}${lead.email ? ` · ${lead.email}` : ''}`.slice(0, 320)
  })
  return safeFetch('twilio', `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`, {
    method: 'POST',
    headers: {
      Authorization: 'Basic ' + btoa(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: body.toString()
  })
}

// ── Airtable — append row to base ─────────────────────────────
const sendAirtable = (env: HooksEnv, lead: Record<string, string>): Promise<HookResult> =>
  safeFetch('airtable', `https://api.airtable.com/v0/${env.AIRTABLE_BASE_ID}/${encodeURIComponent(env.AIRTABLE_TABLE || 'Leads')}`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.AIRTABLE_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      records: [{ fields: {
        Name: lead.name || '',
        Email: lead.email || '',
        Phone: lead.phone || '',
        Funnel: funnelOf(lead._source),
        Source: lead._source || '',
        Campaign: lead._utm_campaign || '',
        Payload: JSON.stringify(lead).slice(0, 4000),
        'Created At': new Date().toISOString()
      } }],
      typecast: true
    })
  })

// ── Which channels are configured? ────────────────────────────
export const hooksConfigured = (env: HooksEnv | undefined) => ({
  webhook: !!env?.LEAD_WEBHOOK_URL,
  slack: !!env?.SLACK_WEBHOOK_URL,
  discord: !!env?.DISCORD_WEBHOOK_URL,
  telegram: !!(env?.TELEGRAM_BOT_TOKEN && env?.TELEGRAM_CHAT_ID),
  twilio: !!(env?.TWILIO_ACCOUNT_SID && env?.TWILIO_AUTH_TOKEN && env?.TWILIO_FROM && env?.TWILIO_TO),
  airtable: !!(env?.AIRTABLE_API_KEY && env?.AIRTABLE_BASE_ID)
})

// ── Fan out to every configured channel in parallel ──────────
export const fanOutLead = async (env: HooksEnv, lead: Record<string, string>): Promise<HookResult[]> => {
  const cfg = hooksConfigured(env)
  const jobs: Promise<HookResult>[] = []
  if (cfg.webhook) jobs.push(sendWebhook(env, lead))
  if (cfg.slack) jobs.push(sendSlack(env, lead))
  if (cfg.discord) jobs.push(sendDiscord(env, lead))
  if (cfg.telegram) jobs.push(sendTelegram(env, lead))
  if (cfg.twilio) jobs.push(sendTwilioSMS(env, lead))
  if (cfg.airtable) jobs.push(sendAirtable(env, lead))
  if (!jobs.length) return []
  return Promise.all(jobs)
}
