// ── McKnight GrowthOS — Change Agent ─────────────────────────────
// Takes plain-English change requests ("change the headline to X,
// make the CTA say Book Now, switch the city to Denver") and applies
// them to the target funnel by writing param overrides that merge into
// the funnel at render time — same pipeline as the SEO agent, so
// changes are LIVE immediately and URL params still win.
//
// Safety rails:
//  - The agent may ONLY set params that exist in the funnel's schema
//    (FUNNEL_PARAMS + COMMON_PARAMS) — it can never inject arbitrary HTML/JS
//  - Values are length-capped and stored as plain text (templates escape)
//  - Every request + decided changes + result persisted in D1 change_requests
//  - Full revert per request

import { FUNNEL_PARAMS, COMMON_PARAMS, allowedParams } from './paramschema'
import { logAgent, type AgentEnv } from './agents'

const MODEL = '@cf/meta/llama-4-scout-17b-16e-instruct'

const SYSTEM = `You are the Change Agent for McKnight GrowthOS funnels. Users describe changes to a funnel landing page in plain English. You translate their request into a JSON object of {parameterName: newValue} using ONLY the allowed parameters provided. Rules:
- Only use parameter names from the allowed list. Never invent new ones.
- Values are plain text (no HTML, no scripts).
- STYLE & EFFECTS are fully supported — you CAN change animations, effects, fonts, shadows, particles and layout feel via these params:
  anim (fade|slide-up|slide-left|slide-right|zoom|flip|blur|none) — section entrance animation
  animSpeed (slow|normal|fast) — animation speed
  fx (max|normal|subtle|off) — overall effect intensity ("calmer page" → subtle, "no animations" → off)
  particles (stars|snow|bubbles|fireflies|confetti|none) — floating hero particles
  confetti (1) — confetti burst when a lead submits
  heroFx (aurora|blobs|spotlight|grid|waves|none) — hero background effect
  font (modern|elegant|bold|playful|mono) — typography preset
  radius (sharp|soft|round|pill) — corner style
  btnFx (pulse|shine|bounce|glow|shake|none) — CTA button animation
  cursorFx (glow|ring|none) — custom cursor effect
  shadowFx (soft|dramatic|neon|flat) — card shadow style
  bgPattern (dots|grid|noise|none) — page background pattern
  tilt/kinetic/marquee (0 to disable 3D card tilt / animated headline / scrolling strips)
- Map style requests to those params: "more exciting/flashy" → particles + btnFx=bounce + heroFx=spotlight; "elegant/luxury" → font=elegant + shadowFx=dramatic + fx=subtle; "fun/playful" → font=playful + particles=confetti + radius=pill; "professional/clean" → fx=subtle + shadowFx=soft + bgPattern=none; "celebrate signups" → confetti=1.
- brandColor/accentColor (hex) recolor every CTA/accent; theme=dark for dark mode.
- If the user asks for something truly impossible with the available parameters, put an explanation in "_note" instead of guessing.
- Keep compliance: no guaranteed-results claims, no fake statistics.
- Also include "_summary": one sentence describing what you changed.
Respond with ONLY a valid JSON object — no markdown, no chatter.`

const extractJSON = (text: string): Record<string, string> | null => {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/)
  const candidate = fenced ? fenced[1] : text
  const start = candidate.indexOf('{')
  const end = candidate.lastIndexOf('}')
  if (start === -1 || end === -1 || end <= start) return null
  try {
    const parsed = JSON.parse(candidate.slice(start, end + 1))
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
      const clean: Record<string, string> = {}
      for (const [k, v] of Object.entries(parsed)) {
        if (typeof v === 'string' || typeof v === 'number') clean[k] = String(v).slice(0, 400)
      }
      return clean
    }
  } catch { /* noop */ }
  return null
}

// Merge new param overrides into copy_overrides WITHOUT clobbering
// what other agents (SEO agent) have written.
export const mergeOverrides = async (env: AgentEnv, funnel: string, changes: Record<string, string>, agent: string) => {
  let existing: Record<string, string> = {}
  try {
    const row = await env.DB?.prepare('SELECT overrides FROM copy_overrides WHERE funnel=?').bind(funnel).first()
    if (row?.overrides) existing = JSON.parse(row.overrides as string)
  } catch { /* fresh */ }
  const merged = { ...existing, ...changes }
  await env.DB.prepare('INSERT INTO copy_overrides (funnel, overrides, agent, updated_at) VALUES (?,?,?,CURRENT_TIMESTAMP) ON CONFLICT(funnel) DO UPDATE SET overrides=excluded.overrides, agent=excluded.agent, updated_at=CURRENT_TIMESTAMP')
    .bind(funnel, JSON.stringify(merged), agent).run()
  return merged
}

// ── Process one plain-English change request ────────────────────
export const processChangeRequest = async (
  env: AgentEnv,
  funnel: string,
  request: string
): Promise<{ ok: boolean; changes?: Record<string, string>; summary?: string; note?: string; requestId?: number; error?: string }> => {
  if (!env.AI || !env.DB) return { ok: false, error: 'AI or DB binding missing (deploy to Cloudflare for AI)' }
  const params = [...(FUNNEL_PARAMS[funnel] || []), ...COMMON_PARAMS]
  if (!params.length) return { ok: false, error: 'Unknown funnel' }

  try {
    // Current live values (overrides) for context
    let current: Record<string, string> = {}
    try {
      const row = await env.DB.prepare('SELECT overrides FROM copy_overrides WHERE funnel=?').bind(funnel).first()
      if (row?.overrides) current = JSON.parse(row.overrides as string)
    } catch { /* none */ }

    const paramList = params.map((p) => `- ${p.name}: current="${current[p.name] || p.default}"`).join('\n')
    const user = `Funnel: "${funnel.replace(/-/g, ' ')}" landing page.

Allowed parameters (name: current value/default):
${paramList}

User's change request:
"""${request.slice(0, 1500)}"""

Return the JSON of parameter changes.`

    const out = await env.AI.run(MODEL, {
      messages: [{ role: 'system', content: SYSTEM }, { role: 'user', content: user }],
      max_tokens: 700, temperature: 0.3
    })
    const raw = typeof out?.response === 'string' ? out.response : JSON.stringify(out?.response || '')
    const parsed = extractJSON(raw)
    if (!parsed) {
      await env.DB.prepare("INSERT INTO change_requests (funnel, request, status, error) VALUES (?,?,'rejected','parse_fail')").bind(funnel, request.slice(0, 1500)).run()
      return { ok: false, error: 'Could not understand that request — try rephrasing' }
    }

    const summary = parsed._summary || ''
    const note = parsed._note || ''
    delete parsed._summary; delete parsed._note

    // Enforce the allow-list — drop anything outside the schema
    const allowed = allowedParams(funnel)
    const changes: Record<string, string> = {}
    const dropped: string[] = []
    for (const [k, v] of Object.entries(parsed)) {
      if (allowed.has(k) && v.trim()) changes[k] = v.trim()
      else dropped.push(k)
    }

    if (!Object.keys(changes).length) {
      const err = note || 'No applicable changes found for this funnel'
      const ins = await env.DB.prepare("INSERT INTO change_requests (funnel, request, summary, status, error) VALUES (?,?,?,'rejected',?)")
        .bind(funnel, request.slice(0, 1500), summary.slice(0, 400), err.slice(0, 400)).run()
      return { ok: false, error: err, requestId: ins.meta?.last_row_id }
    }

    // Apply — merged into live render pipeline
    await mergeOverrides(env, funnel, changes, 'change-agent')
    const ins = await env.DB.prepare("INSERT INTO change_requests (funnel, request, changes, summary, status) VALUES (?,?,?,?,'applied')")
      .bind(funnel, request.slice(0, 1500), JSON.stringify(changes), (summary || `Updated ${Object.keys(changes).join(', ')}`).slice(0, 400)).run()
    await logAgent(env, 'change-agent', funnel, 'applied', Object.keys(changes).join(', '))

    return { ok: true, changes, summary: summary || `Updated ${Object.keys(changes).join(', ')}`, note: note || (dropped.length ? `Ignored unknown fields: ${dropped.join(', ')}` : ''), requestId: ins.meta?.last_row_id }
  } catch (e: any) {
    await logAgent(env, 'change-agent', funnel, 'error', String(e?.message || e))
    return { ok: false, error: String(e?.message || e).slice(0, 300) }
  }
}

// ── Revert one applied change request ───────────────────────────
export const revertChangeRequest = async (env: AgentEnv, requestId: number): Promise<{ ok: boolean; error?: string }> => {
  if (!env.DB) return { ok: false, error: 'DB missing' }
  try {
    const row = await env.DB.prepare("SELECT funnel, changes FROM change_requests WHERE id=? AND status='applied'").bind(requestId).first()
    if (!row) return { ok: false, error: 'Request not found or not applied' }
    const changes = JSON.parse((row.changes as string) || '{}')

    // Remove exactly these keys from the funnel's overrides
    let existing: Record<string, string> = {}
    try {
      const cur = await env.DB.prepare('SELECT overrides FROM copy_overrides WHERE funnel=?').bind(row.funnel).first()
      if (cur?.overrides) existing = JSON.parse(cur.overrides as string)
    } catch { /* none */ }
    for (const k of Object.keys(changes)) delete existing[k]
    if (Object.keys(existing).length) {
      await env.DB.prepare('UPDATE copy_overrides SET overrides=?, updated_at=CURRENT_TIMESTAMP WHERE funnel=?').bind(JSON.stringify(existing), row.funnel).run()
    } else {
      await env.DB.prepare('DELETE FROM copy_overrides WHERE funnel=?').bind(row.funnel).run()
    }
    await env.DB.prepare("UPDATE change_requests SET status='reverted' WHERE id=?").bind(requestId).run()
    await logAgent(env, 'change-agent', row.funnel as string, 'reverted', `request #${requestId}`)
    return { ok: true }
  } catch (e: any) { return { ok: false, error: String(e?.message || e).slice(0, 300) } }
}

// ── History ─────────────────────────────────────────────────────
export const listChangeRequests = async (env: AgentEnv, funnel?: string): Promise<any[]> => {
  try {
    const q = funnel
      ? env.DB?.prepare('SELECT id, funnel, request, changes, summary, status, error, created_at FROM change_requests WHERE funnel=? ORDER BY id DESC LIMIT 50').bind(funnel)
      : env.DB?.prepare('SELECT id, funnel, request, changes, summary, status, error, created_at FROM change_requests ORDER BY id DESC LIMIT 50')
    const rows = await q?.all()
    return (rows?.results || []) as any[]
  } catch { return [] }
}
