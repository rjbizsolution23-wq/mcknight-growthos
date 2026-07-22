// ── GoHighLevel (LeadConnector API v2) integration ─────────────
// Edge-native (fetch only). Auth: Private Integration Token (PIT).
// Setup: GHL sub-account → Settings → Private Integrations → create token
// with scopes: contacts.write, contacts.readonly, opportunities.write,
// locations.readonly, workflows.readonly (optional).
// Secrets (wrangler pages secret put … / .dev.vars):
//   GHL_API_KEY      — pit-xxxxxxxx token (required)
//   GHL_LOCATION_ID  — sub-account location ID (required)
//   GHL_PIPELINE_ID  — pipeline for auto-opportunities (optional)
//   GHL_STAGE_ID     — stage inside that pipeline (optional, required with pipeline)
//   GHL_WORKFLOW_ID  — workflow to enroll every new lead into (optional)

const GHL_BASE = 'https://services.leadconnectorhq.com'
const GHL_VERSION = '2021-07-28'

export type GhlEnv = {
  GHL_API_KEY?: string
  GHL_LOCATION_ID?: string
  GHL_PIPELINE_ID?: string
  GHL_STAGE_ID?: string
  GHL_WORKFLOW_ID?: string
}

export const ghlConfigured = (env: GhlEnv | undefined) => !!(env?.GHL_API_KEY && env?.GHL_LOCATION_ID)

const ghlFetch = async (env: GhlEnv, path: string, method: string, body?: unknown) => {
  const res = await fetch(`${GHL_BASE}${path}`, {
    method,
    headers: {
      Authorization: `Bearer ${env.GHL_API_KEY}`,
      Version: GHL_VERSION,
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: body ? JSON.stringify(body) : undefined
  })
  const text = await res.text()
  let json: any = null
  try { json = JSON.parse(text) } catch { /* non-JSON error body */ }
  return { ok: res.ok, status: res.status, json, text: text.slice(0, 500) }
}

// Split "Jane Q Doe" → { firstName: 'Jane', lastName: 'Q Doe' }
const splitName = (name?: string) => {
  const n = (name || '').trim()
  if (!n) return { firstName: undefined, lastName: undefined }
  const parts = n.split(/\s+/)
  return { firstName: parts[0], lastName: parts.slice(1).join(' ') || undefined }
}

// Derive a clean funnel slug from _source path e.g. "/t/mortgage?x=1" → "mortgage"
const funnelSlug = (source?: string) => {
  const m = (source || '').match(/\/t\/([a-z0-9-]+)/i)
  return m ? m[1] : 'command-center'
}

const ATTR_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid', 'ttclid', 'referrer']
const META_KEYS = new Set(['name', 'email', 'phone', '_source', '_offer', '_ghlTag', ...ATTR_KEYS])

export type GhlResult = {
  attempted: boolean
  ok: boolean
  contactId?: string
  opportunity?: boolean
  workflow?: boolean
  note?: boolean
  error?: string
}

// Push a funnel lead into GHL: upsert contact → note → opportunity → workflow.
// Never throws — always returns a result object so /api/lead never breaks.
export const pushLeadToGHL = async (env: GhlEnv | undefined, lead: Record<string, string>): Promise<GhlResult> => {
  if (!env || !ghlConfigured(env)) return { attempted: false, ok: false, error: 'GHL not configured (set GHL_API_KEY + GHL_LOCATION_ID)' }
  if (!lead.email && !lead.phone) return { attempted: false, ok: false, error: 'Lead has no email or phone — GHL upsert skipped' }

  try {
    const slug = funnelSlug(lead._source)
    const { firstName, lastName } = splitName(lead.name)

    // ── Tags: system tag + funnel slug + offer + custom client tag ──
    const tags = ['rj-funnel', `funnel-${slug}`]
    if (lead._offer) tags.push(`offer-${lead._offer.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60)}`)
    if (lead._ghlTag) tags.push(...lead._ghlTag.split(',').map((t) => t.trim().toLowerCase().slice(0, 60)).filter(Boolean).slice(0, 5))
    if (lead.utm_campaign) tags.push(`utm-${lead.utm_campaign.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 50)}`)

    // ── 1. Upsert contact (GHL dedupes by email/phone per location) ──
    const upsertBody: Record<string, unknown> = {
      locationId: env.GHL_LOCATION_ID,
      firstName,
      lastName,
      email: lead.email || undefined,
      phone: lead.phone || undefined,
      source: `RJ Funnel — ${slug}`,
      tags
    }
    const up = await ghlFetch(env, '/contacts/upsert', 'POST', upsertBody)
    if (!up.ok) return { attempted: true, ok: false, error: `contact upsert ${up.status}: ${up.text}` }
    const contactId: string | undefined = up.json?.contact?.id || up.json?.contact?._id || up.json?.id
    if (!contactId) return { attempted: true, ok: false, error: 'upsert succeeded but no contact id in response' }

    const result: GhlResult = { attempted: true, ok: true, contactId }

    // ── 2. Attribution + form-detail note on the contact ──
    const attrLines = ATTR_KEYS.filter((k) => lead[k]).map((k) => `${k}: ${lead[k]}`)
    const extraLines = Object.entries(lead)
      .filter(([k, v]) => !META_KEYS.has(k) && v)
      .map(([k, v]) => `${k}: ${v}`)
    const noteBody = [
      `🔥 New funnel lead — ${slug}`,
      `Source URL: ${lead._source || 'n/a'}`,
      lead._offer ? `Offer clicked: ${lead._offer}` : '',
      extraLines.length ? `\n— Form details —\n${extraLines.join('\n')}` : '',
      attrLines.length ? `\n— Attribution —\n${attrLines.join('\n')}` : '',
      `\nCaptured: ${new Date().toISOString()} via RJ Funnel Command Center`
    ].filter(Boolean).join('\n')
    const note = await ghlFetch(env, `/contacts/${contactId}/notes`, 'POST', { body: noteBody.slice(0, 5000) })
    result.note = note.ok

    // ── 3. Opportunity (optional — needs pipeline + stage) ──
    if (env.GHL_PIPELINE_ID && env.GHL_STAGE_ID) {
      const opp = await ghlFetch(env, '/opportunities/', 'POST', {
        locationId: env.GHL_LOCATION_ID,
        pipelineId: env.GHL_PIPELINE_ID,
        pipelineStageId: env.GHL_STAGE_ID,
        contactId,
        name: `${lead.name || lead.email || lead.phone || 'Funnel lead'} — ${slug}`,
        status: 'open',
        source: `RJ Funnel — ${slug}`
      })
      result.opportunity = opp.ok
    }

    // ── 4. Workflow enrollment (optional) ──
    if (env.GHL_WORKFLOW_ID) {
      const wf = await ghlFetch(env, `/contacts/${contactId}/workflow/${env.GHL_WORKFLOW_ID}`, 'POST', {
        eventStartTime: new Date().toISOString()
      })
      result.workflow = wf.ok
    }

    return result
  } catch (e: any) {
    return { attempted: true, ok: false, error: String(e?.message || e).slice(0, 300) }
  }
}

// Connection test — used by GET /api/ghl/status and the /integrations badge.
export const ghlStatus = async (env: GhlEnv | undefined) => {
  if (!env || !ghlConfigured(env)) {
    return { configured: false, connected: false, note: 'Set GHL_API_KEY + GHL_LOCATION_ID secrets (see /integrations).' }
  }
  const res = await ghlFetch(env, `/locations/${env.GHL_LOCATION_ID}`, 'GET')
  return {
    configured: true,
    connected: res.ok,
    location: res.ok ? { id: env.GHL_LOCATION_ID, name: res.json?.location?.name || res.json?.name } : undefined,
    pipeline: !!(env.GHL_PIPELINE_ID && env.GHL_STAGE_ID),
    workflow: !!env.GHL_WORKFLOW_ID,
    error: res.ok ? undefined : `HTTP ${res.status}: ${res.text.slice(0, 200)}`
  }
}
