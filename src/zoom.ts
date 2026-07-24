// ── McKnight GrowthOS — Zoom Webinar engine ──────────────────────
// Server-to-Server OAuth (grant_type=account_credentials) — backend
// automation, no user interaction. Token lifetime 1h, cached per-isolate.
// Covers: create/list/get/delete webinars + meetings, registrant
// management (auto-register funnel leads → unique join_url per lead),
// start URLs for the host. All persisted to D1.
//
// Keys (Key Vault): ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET
// Zoom app type: "Server-to-Server OAuth" at marketplace.zoom.us

export type ZoomEnv = {
  ZOOM_ACCOUNT_ID?: string
  ZOOM_CLIENT_ID?: string
  ZOOM_CLIENT_SECRET?: string
  DB?: any
}

const ZOOM_API = 'https://api.zoom.us/v2'

export const zoomConfigured = (env: ZoomEnv | undefined) =>
  !!(env?.ZOOM_ACCOUNT_ID && env?.ZOOM_CLIENT_ID && env?.ZOOM_CLIENT_SECRET)

// ── S2S OAuth token (1h lifetime; cache 50min per isolate) ─────
let _tok: { at: number; token: string; key: string } | null = null

export const getZoomToken = async (env: ZoomEnv): Promise<string> => {
  const cacheKey = `${env.ZOOM_ACCOUNT_ID}:${env.ZOOM_CLIENT_ID}`
  if (_tok && _tok.key === cacheKey && Date.now() - _tok.at < 50 * 60 * 1000) return _tok.token
  const basic = btoa(`${env.ZOOM_CLIENT_ID}:${env.ZOOM_CLIENT_SECRET}`)
  const r = await fetch(`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=${encodeURIComponent(env.ZOOM_ACCOUNT_ID!)}`, {
    method: 'POST',
    headers: { Authorization: `Basic ${basic}` }
  })
  const j: any = await r.json().catch(() => ({}))
  if (!j.access_token) throw new Error(j.reason || j.error || `Zoom OAuth failed (HTTP ${r.status})`)
  _tok = { at: Date.now(), token: j.access_token, key: cacheKey }
  return j.access_token
}
export const invalidateZoomToken = () => { _tok = null }

const zFetch = async (env: ZoomEnv, path: string, init: RequestInit = {}): Promise<any> => {
  const token = await getZoomToken(env)
  const r = await fetch(`${ZOOM_API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json', ...(init.headers || {}) }
  })
  if (r.status === 204) return {}
  const j: any = await r.json().catch(() => ({}))
  if (!r.ok) throw new Error(j.message || `Zoom API ${r.status} on ${path}`)
  return j
}

// Verify credentials + detect webinar capability (needs Webinar license)
export const zoomVerify = async (env: ZoomEnv): Promise<{ ok: boolean; error?: string; user?: any; webinarLicense?: boolean }> => {
  if (!zoomConfigured(env)) return { ok: false, error: 'Add ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET in the Key Vault' }
  try {
    const me = await zFetch(env, '/users/me')
    // feature.webinar_capacity > 0 → webinar licensed
    let webinarLicense = false
    try {
      const settings = await zFetch(env, `/users/me/settings`)
      webinarLicense = !!(settings?.feature?.webinar_capacity && settings.feature.webinar_capacity > 0)
    } catch { /* settings scope may be missing */ }
    return { ok: true, user: { id: me.id, email: me.email, name: `${me.first_name || ''} ${me.last_name || ''}`.trim(), type: me.type, pmi: me.pmi }, webinarLicense }
  } catch (e: any) { return { ok: false, error: String(e?.message || e).slice(0, 300) } }
}

// ── Create a webinar (falls back to a meeting if no webinar license) ──
export type CreateEventOpts = {
  topic: string
  startTime: string        // ISO: 2026-08-01T18:00:00Z or local + timezone
  duration?: number        // minutes
  timezone?: string
  agenda?: string
  funnel?: string          // linked funnel slug for the registration page
  useMeeting?: boolean     // force meeting instead of webinar
}

export const createZoomEvent = async (env: ZoomEnv, opts: CreateEventOpts): Promise<{ ok: boolean; event?: any; kind?: string; error?: string }> => {
  if (!zoomConfigured(env)) return { ok: false, error: 'Zoom keys not configured — add them in the Key Vault' }
  const base = {
    topic: opts.topic.slice(0, 200),
    start_time: opts.startTime,
    duration: Math.min(Math.max(opts.duration || 60, 15), 720),
    timezone: opts.timezone || 'America/Denver',
    agenda: (opts.agenda || '').slice(0, 2000),
  }
  try {
    let event: any, kind: 'webinar' | 'meeting'
    if (!opts.useMeeting) {
      try {
        event = await zFetch(env, '/users/me/webinars', {
          method: 'POST',
          body: JSON.stringify({
            ...base, type: 5, // scheduled webinar
            settings: {
              approval_type: 0,               // auto-approve registrants
              registration_type: 1,           // register once, attend any
              registrants_email_notification: true,
              auto_recording: 'cloud',
              practice_session: true,
              host_video: true, panelists_video: true,
              question_and_answer: { enable: true },
            }
          })
        })
        kind = 'webinar'
      } catch (e: any) {
        // No webinar license (common) → graceful fallback to registration meeting
        if (!/webinar/i.test(String(e?.message)) && !/200/.test(String(e?.message))) throw e
        event = await zFetch(env, '/users/me/meetings', {
          method: 'POST',
          body: JSON.stringify({
            ...base, type: 2, // scheduled meeting
            settings: { approval_type: 0, registration_type: 1, registrants_email_notification: true, auto_recording: 'cloud', waiting_room: false, join_before_host: false, host_video: true, participant_video: false, mute_upon_entry: true }
          })
        })
        kind = 'meeting'
      }
    } else {
      event = await zFetch(env, '/users/me/meetings', {
        method: 'POST',
        body: JSON.stringify({ ...base, type: 2, settings: { approval_type: 0, registration_type: 1, registrants_email_notification: true, auto_recording: 'cloud', waiting_room: false, mute_upon_entry: true } })
      })
      kind = 'meeting'
    }

    // Persist to D1 — system of record for the command center
    try {
      await env.DB?.prepare(`INSERT INTO webinars (zoom_id, kind, topic, start_time, duration, timezone, agenda, funnel, join_url, start_url, registration_url, status)
        VALUES (?,?,?,?,?,?,?,?,?,?,?,'scheduled')
        ON CONFLICT(zoom_id) DO UPDATE SET topic=excluded.topic, start_time=excluded.start_time, duration=excluded.duration, agenda=excluded.agenda, funnel=excluded.funnel, updated_at=CURRENT_TIMESTAMP`)
        .bind(String(event.id), kind, base.topic, base.start_time, base.duration, base.timezone, base.agenda, opts.funnel || null,
              event.join_url || '', event.start_url || '', event.registration_url || '').run()
    } catch { /* log only */ }

    return { ok: true, kind, event: { id: event.id, topic: event.topic, start_time: event.start_time, duration: event.duration, timezone: event.timezone, join_url: event.join_url, start_url: event.start_url, registration_url: event.registration_url } }
  } catch (e: any) { return { ok: false, error: String(e?.message || e).slice(0, 400) } }
}

// ── Register a lead as webinar/meeting registrant → unique join_url ──
export const registerLead = async (
  env: ZoomEnv,
  zoomId: string,
  kind: string,
  lead: { email: string; name?: string; phone?: string }
): Promise<{ ok: boolean; joinUrl?: string; registrantId?: string; error?: string }> => {
  if (!zoomConfigured(env)) return { ok: false, error: 'Zoom not configured' }
  const [first, ...rest] = (lead.name || 'Guest').trim().split(/\s+/)
  const path = kind === 'webinar' ? `/webinars/${zoomId}/registrants` : `/meetings/${zoomId}/registrants`
  try {
    const r = await zFetch(env, path, {
      method: 'POST',
      body: JSON.stringify({ email: lead.email, first_name: first.slice(0, 60), last_name: (rest.join(' ') || '-').slice(0, 60), phone: lead.phone || undefined })
    })
    try {
      await env.DB?.prepare(`INSERT INTO webinar_registrations (zoom_id, email, name, phone, registrant_id, join_url) VALUES (?,?,?,?,?,?)`)
        .bind(String(zoomId), lead.email, lead.name || '', lead.phone || '', String(r.registrant_id || r.id || ''), r.join_url || '').run()
    } catch { /* log only */ }
    return { ok: true, joinUrl: r.join_url, registrantId: String(r.registrant_id || r.id || '') }
  } catch (e: any) { return { ok: false, error: String(e?.message || e).slice(0, 300) } }
}

// ── List upcoming events (webinars + meetings, merged) ─────────
export const listZoomEvents = async (env: ZoomEnv): Promise<{ ok: boolean; events?: any[]; error?: string }> => {
  if (!zoomConfigured(env)) return { ok: false, error: 'Zoom not configured' }
  try {
    const out: any[] = []
    try {
      const w = await zFetch(env, '/users/me/webinars?page_size=30&type=upcoming')
      for (const x of w.webinars || []) out.push({ ...x, kind: 'webinar' })
    } catch { /* no webinar license */ }
    const m = await zFetch(env, '/users/me/meetings?page_size=30&type=upcoming')
    for (const x of m.meetings || []) if (x.type === 2 || x.type === 8) out.push({ ...x, kind: 'meeting' })
    out.sort((a, b) => String(a.start_time || '').localeCompare(String(b.start_time || '')))
    return { ok: true, events: out }
  } catch (e: any) { return { ok: false, error: String(e?.message || e).slice(0, 300) } }
}

// ── Registrant list for one event ──────────────────────────────
export const listRegistrants = async (env: ZoomEnv, zoomId: string, kind: string): Promise<{ ok: boolean; registrants?: any[]; error?: string }> => {
  try {
    const path = kind === 'webinar' ? `/webinars/${zoomId}/registrants?page_size=100` : `/meetings/${zoomId}/registrants?page_size=100`
    const r = await zFetch(env, path)
    return { ok: true, registrants: r.registrants || [] }
  } catch (e: any) { return { ok: false, error: String(e?.message || e).slice(0, 300) } }
}

// ── Delete an event ─────────────────────────────────────────────
export const deleteZoomEvent = async (env: ZoomEnv, zoomId: string, kind: string): Promise<{ ok: boolean; error?: string }> => {
  try {
    await zFetch(env, kind === 'webinar' ? `/webinars/${zoomId}` : `/meetings/${zoomId}`, { method: 'DELETE' })
    try { await env.DB?.prepare("UPDATE webinars SET status='deleted', updated_at=CURRENT_TIMESTAMP WHERE zoom_id=?").bind(String(zoomId)).run() } catch { /* log */ }
    return { ok: true }
  } catch (e: any) { return { ok: false, error: String(e?.message || e).slice(0, 300) } }
}

// ── D1-side listings (work even before Zoom keys are added) ────
export const listStoredWebinars = async (env: ZoomEnv): Promise<any[]> => {
  try {
    const rows = await env.DB?.prepare("SELECT * FROM webinars WHERE status != 'deleted' ORDER BY start_time ASC LIMIT 100").all()
    return (rows?.results || []) as any[]
  } catch { return [] }
}

export const findWebinarForFunnel = async (env: ZoomEnv, funnel: string): Promise<any | null> => {
  try {
    return await env.DB?.prepare("SELECT * FROM webinars WHERE funnel=? AND status='scheduled' AND start_time >= datetime('now','-3 hour') ORDER BY start_time ASC LIMIT 1").bind(funnel).first()
  } catch { return null }
}
