// ── McKnight GrowthOS — AI Agent layer ──────────────────────────
// Autonomous copy-optimization agents running on Workers AI.
//
// SEO/SGE/AEO Copy Agent: rewrites each funnel's search-facing copy
// (title, description, keywords, hero hooks) weekly, optimized for
// classic SEO + Google SGE / AI Overviews + answer engines (AEO).
// Overrides are stored in D1 `copy_overrides` and merged into funnel
// params at render time — the agent's copy becomes the live default,
// while explicit URL params still win (client customizations are never
// clobbered).
//
// Scheduling: Cloudflare Pages has no cron, so the agent uses a
// "lazy weekly cron" — any funnel traffic after 7 days since the last
// run triggers a background refresh (ctx.waitUntil, zero added latency)
// — plus a Run Now button on /agents.

export type AgentEnv = {
  AI?: { run: (model: string, input: Record<string, unknown>) => Promise<{ response?: string }> }
  DB?: any
}

const MODEL = '@cf/meta/llama-4-scout-17b-16e-instruct'
export const AGENT_WEEK_MS = 7 * 24 * 3600 * 1000

// Fields the agent may override per funnel — search-facing copy only.
// It never touches pricing, names, phone numbers or legal disclaimers.
export const AGENT_FIELDS = ['seoTitle', 'seoDesc', 'seoKeywords'] as const

const AGENT_SYSTEM = `You are the SEO/SGE/AEO optimization agent for McKnight GrowthOS funnels. You rewrite search-facing metadata to maximize visibility in:
1. Classic Google/Bing SEO (keyword-rich, <60 char titles, <155 char descriptions, high CTR)
2. Google SGE / AI Overviews (clear entity statements, direct answers, natural language)
3. Answer engines — ChatGPT, Perplexity, Claude (question-answer phrasing, factual claims)
Rules: compliance-aware copy only — no guaranteed results, no fake urgency, no invented statistics or credentials. You respond with ONLY a valid JSON object, no markdown, no explanation.`

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

export const logAgent = async (env: AgentEnv, agent: string, funnel: string | null, action: string, detail = '') => {
  try { await env.DB?.prepare('INSERT INTO agent_log (agent, funnel, action, detail) VALUES (?,?,?,?)').bind(agent, funnel, action, detail.slice(0, 500)).run() } catch { /* never throws */ }
}

// ── Run the SEO agent for ONE funnel ────────────────────────────
export const optimizeFunnelCopy = async (
  env: AgentEnv,
  funnel: string,
  context: { views7d?: number; leads7d?: number } = {}
): Promise<{ ok: boolean; overrides?: Record<string, string>; error?: string }> => {
  if (!env.AI || !env.DB) return { ok: false, error: 'AI or DB binding missing' }
  try {
    const niche = funnel.replace(/-/g, ' ')
    const perf = context.views7d !== undefined
      ? `Last 7 days: ${context.views7d} views, ${context.leads7d || 0} leads (${context.views7d ? (((context.leads7d || 0) / context.views7d) * 100).toFixed(1) : 0}% conversion). ${(context.leads7d || 0) === 0 && (context.views7d || 0) > 20 ? 'Conversion is weak — take a sharper angle.' : 'Iterate on what works.'}`
      : 'No performance data yet — optimize for first impressions.'
    const user = `Funnel: "${niche}" lead-generation landing page (local service business).
${perf}
Current date: ${new Date().toISOString().slice(0, 10)} — factor in seasonality for this niche.

Write fresh search-optimized metadata. Respond with exactly this JSON:
{"seoTitle": "<compelling <60 char title with primary keyword>", "seoDesc": "<direct-answer 120-155 char meta description a search AI would quote>", "seoKeywords": "<6-10 comma-separated keywords incl. long-tail question phrases>"}`

    const out = await env.AI.run(MODEL, {
      messages: [{ role: 'system', content: AGENT_SYSTEM }, { role: 'user', content: user }],
      max_tokens: 500, temperature: 0.8
    })
    const raw = typeof out?.response === 'string' ? out.response : JSON.stringify(out?.response || '')
    const parsed = extractJSON(raw)
    if (!parsed || !parsed.seoTitle) { await logAgent(env, 'seo-agent', funnel, 'parse_fail', raw.slice(0, 200)); return { ok: false, error: 'Could not parse agent output' } }

    const overrides: Record<string, string> = {}
    for (const f of AGENT_FIELDS) if (parsed[f]) overrides[f] = parsed[f]
    // MERGE with existing overrides (v3.0: never clobber Change Agent edits)
    let existing: Record<string, string> = {}
    try {
      const row = await env.DB.prepare('SELECT overrides FROM copy_overrides WHERE funnel=?').bind(funnel).first()
      if (row?.overrides) existing = JSON.parse(row.overrides as string)
    } catch { /* fresh */ }
    const merged = { ...existing, ...overrides }
    await env.DB.prepare('INSERT INTO copy_overrides (funnel, overrides, agent, updated_at) VALUES (?,?,?,CURRENT_TIMESTAMP) ON CONFLICT(funnel) DO UPDATE SET overrides=excluded.overrides, agent=excluded.agent, updated_at=CURRENT_TIMESTAMP')
      .bind(funnel, JSON.stringify(merged), 'seo-agent').run()
    await logAgent(env, 'seo-agent', funnel, 'optimized', overrides.seoTitle || '')
    return { ok: true, overrides }
  } catch (e: any) {
    await logAgent(env, 'seo-agent', funnel, 'error', String(e?.message || e))
    return { ok: false, error: String(e?.message || e).slice(0, 300) }
  }
}

// ── Batch: run for every funnel (Run Now / weekly refresh) ─────
export const optimizeAllFunnels = async (env: AgentEnv, funnels: string[]): Promise<{ ok: boolean; optimized: string[]; failed: string[] }> => {
  const optimized: string[] = []
  const failed: string[] = []
  for (const f of funnels) {
    let stats: { views7d?: number; leads7d?: number } = {}
    try {
      const v = await env.DB?.prepare("SELECT COALESCE(SUM(views),0) n FROM funnel_views WHERE funnel=? AND day >= date('now','-7 day')").bind(f).first()
      const l = await env.DB?.prepare("SELECT COUNT(*) n FROM leads WHERE funnel=? AND created_at >= datetime('now','-7 day')").bind(f).first()
      stats = { views7d: Number(v?.n || 0), leads7d: Number(l?.n || 0) }
    } catch { /* stats optional */ }
    const r = await optimizeFunnelCopy(env, f, stats)
    ;(r.ok ? optimized : failed).push(f)
  }
  await logAgent(env, 'seo-agent', null, 'batch_complete', `optimized ${optimized.length}, failed ${failed.length}`)
  return { ok: failed.length === 0, optimized, failed }
}

// ── Read a funnel's current overrides (merged at render time) ──
export const getCopyOverrides = async (env: AgentEnv, funnel: string): Promise<Record<string, string>> => {
  try {
    const row = await env.DB?.prepare('SELECT overrides FROM copy_overrides WHERE funnel=?').bind(funnel).first()
    if (row?.overrides) return JSON.parse(row.overrides as string)
  } catch { /* noop */ }
  return {}
}

// ── Lazy weekly cron: called on funnel traffic; refreshes stale copy in
// the background via ctx.waitUntil (no latency added to the visitor).
export const maybeRefreshFunnel = async (env: AgentEnv, funnel: string): Promise<void> => {
  try {
    const row = await env.DB?.prepare('SELECT updated_at FROM copy_overrides WHERE funnel=?').bind(funnel).first()
    const last = row?.updated_at ? new Date(String(row.updated_at) + 'Z').getTime() : 0
    if (Date.now() - last < AGENT_WEEK_MS) return
    // claim the slot immediately to prevent stampedes, then optimize
    await env.DB?.prepare('INSERT INTO copy_overrides (funnel, overrides, agent, updated_at) VALUES (?, COALESCE((SELECT overrides FROM copy_overrides WHERE funnel=?),\'{}\'), \'seo-agent\', CURRENT_TIMESTAMP) ON CONFLICT(funnel) DO UPDATE SET updated_at=CURRENT_TIMESTAMP').bind(funnel, funnel).run()
    let stats: { views7d?: number; leads7d?: number } = {}
    try {
      const v = await env.DB?.prepare("SELECT COALESCE(SUM(views),0) n FROM funnel_views WHERE funnel=? AND day >= date('now','-7 day')").bind(funnel).first()
      const l = await env.DB?.prepare("SELECT COUNT(*) n FROM leads WHERE funnel=? AND created_at >= datetime('now','-7 day')").bind(funnel).first()
      stats = { views7d: Number(v?.n || 0), leads7d: Number(l?.n || 0) }
    } catch { /* noop */ }
    await optimizeFunnelCopy(env, funnel, stats)
  } catch { /* background — never surfaces */ }
}

// ── View tracking: per-funnel daily counter (background) ───────
export const trackView = async (env: AgentEnv, funnel: string): Promise<void> => {
  try {
    await env.DB?.prepare("INSERT INTO funnel_views (funnel, day, views) VALUES (?, date('now'), 1) ON CONFLICT(funnel, day) DO UPDATE SET views = views + 1").bind(funnel).run()
  } catch { /* never throws */ }
}
