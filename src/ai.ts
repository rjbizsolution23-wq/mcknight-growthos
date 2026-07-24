// ── McKnight GrowthOS — Multi-Provider AI Router ─────────
// v6.5: OpenRouter + Hugging Face + Cloudflare Workers AI in one
// fail-soft chain. Every AI feature (Builder copy fill, social posts,
// Change Agent, SEO agent, lead insights) routes through runLLM here.
//   Provider order (first configured wins, failures fall through):
//     1. OpenRouter   — OPENROUTER_API_KEY (+ optional OPENROUTER_MODEL)
//     2. Hugging Face — HF_API_TOKEN (+ optional HF_MODEL)
//     3. Workers AI   — AI binding (always available on Cloudflare, free)
//   Override order with AI_PROVIDER = openrouter | huggingface | workers
//   All keys live in the Key Vault (/integrations) — hot-swap, no redeploy.

export type AiEnv = {
  AI?: { run: (model: string, input: Record<string, unknown>) => Promise<{ response?: string }> }
  OPENROUTER_API_KEY?: string
  OPENROUTER_MODEL?: string
  HF_API_TOKEN?: string
  HF_MODEL?: string
  AI_PROVIDER?: string
}

const MODEL = '@cf/meta/llama-4-scout-17b-16e-instruct'
const OR_DEFAULT = 'meta-llama/llama-4-scout:free'
const HF_DEFAULT = 'meta-llama/Llama-3.1-8B-Instruct'

export const aiConfigured = (env: AiEnv | undefined) => !!(env?.AI || env?.OPENROUTER_API_KEY || env?.HF_API_TOKEN)

// Provider status for /api/health + /integrations badges
export const aiProviders = (env: AiEnv | undefined) => {
  const p = {
    openrouter: !!env?.OPENROUTER_API_KEY,
    huggingface: !!env?.HF_API_TOKEN,
    workersAi: !!env?.AI,
  }
  return { ...p, chain: providerOrder(env).join(' → ') || 'none' }
}

const providerOrder = (env: AiEnv | undefined): string[] => {
  const avail: string[] = []
  if (env?.OPENROUTER_API_KEY) avail.push('openrouter')
  if (env?.HF_API_TOKEN) avail.push('huggingface')
  if (env?.AI) avail.push('workers')
  const pref = (env?.AI_PROVIDER || '').toLowerCase().trim()
  if (pref && avail.includes(pref)) return [pref, ...avail.filter((a) => a !== pref)]
  return avail
}

// OpenAI-compatible chat call (OpenRouter + Hugging Face router share the shape)
const chatCompletion = async (url: string, key: string, model: string, system: string, user: string, maxTokens: number, temperature: number, extra: Record<string, string> = {}): Promise<string> => {
  const res = await fetch(url, {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json', ...extra },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
      max_tokens: maxTokens,
      temperature,
    }),
  })
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 180)}`)
  const j = await res.json() as { choices?: Array<{ message?: { content?: string } }> }
  const content = j?.choices?.[0]?.message?.content
  if (!content) throw new Error('Empty completion')
  return content.trim()
}

export const runLLM = async (env: AiEnv, system: string, user: string, maxTokens = 900, temperature = 0.7): Promise<string> => {
  const order = providerOrder(env)
  if (!order.length) throw new Error('No AI provider configured (add OPENROUTER_API_KEY / HF_API_TOKEN in /integrations, or deploy to Cloudflare for Workers AI)')
  let lastErr = ''
  for (const p of order) {
    try {
      if (p === 'openrouter') {
        return await chatCompletion('https://openrouter.ai/api/v1/chat/completions', env.OPENROUTER_API_KEY!, env.OPENROUTER_MODEL || OR_DEFAULT, system, user, maxTokens, temperature, { 'HTTP-Referer': 'https://mcknight-growthos.pages.dev', 'X-Title': 'McKnight GrowthOS' })
      }
      if (p === 'huggingface') {
        return await chatCompletion('https://router.huggingface.co/v1/chat/completions', env.HF_API_TOKEN!, env.HF_MODEL || HF_DEFAULT, system, user, maxTokens, temperature)
      }
      // workers
      const out = await env.AI!.run(MODEL, {
        messages: [{ role: 'system', content: system }, { role: 'user', content: user }],
        max_tokens: maxTokens,
        temperature,
      })
      const r = out?.response as unknown
      if (typeof r === 'string') return r.trim()
      if (r && typeof r === 'object') return JSON.stringify(r)
      return ''
    } catch (e: any) {
      lastErr = `${p}: ${String(e?.message || e).slice(0, 160)}`
      // fall through to next provider
    }
  }
  throw new Error(`All AI providers failed — last error ${lastErr}`)
}

// Extract the first JSON object from an LLM response (handles ```json fences and chatter)
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
        if (typeof v === 'string' || typeof v === 'number') clean[k] = String(v).slice(0, 300)
      }
      return clean
    }
  } catch { /* fallthrough */ }
  return null
}

// ── AI Copy Fill: generate every Builder field value for a template ──
export const generateFunnelCopy = async (
  env: AiEnv,
  template: string,
  fields: string[],
  brief: string
): Promise<{ ok: boolean; fields?: Record<string, string>; error?: string }> => {
  try {
    const system = `You are a direct-response funnel copywriter for McKnight GrowthOS. You write high-converting, compliance-aware copy for local business funnels (no guaranteed-results claims, no fake scarcity, FTC-safe). You respond with ONLY a valid JSON object — no explanations, no markdown.`
    const user = `Template: "${template}" funnel landing page.
Client brief: ${brief.slice(0, 600)}

Write a value for each of these exact JSON keys: ${fields.join(', ')}.
Rules:
- Realistic proof numbers (e.g. "1,200+", "4.9") — believable, not inflated
- "city" must be the client's city from the brief (or a plausible one)
- Offers must be specific and compelling with a real-sounding dollar value where relevant
- deadline: a date in YYYY-MM-DD format about 4 weeks from 2026-07-22
- Keep each value under 90 characters
Respond with ONLY the JSON object.`
    const raw = await runLLM(env, system, user, 800)
    const parsed = extractJSON(raw)
    if (!parsed) return { ok: false, error: 'AI returned unparseable output — try again' }
    // Only return requested fields
    const out: Record<string, string> = {}
    for (const f of fields) if (parsed[f]) out[f] = parsed[f]
    if (!Object.keys(out).length) return { ok: false, error: 'AI returned no usable fields — try again' }
    return { ok: true, fields: out }
  } catch (e) {
    return { ok: false, error: String(e).slice(0, 200) }
  }
}

// ── v3.5: Social AI Studio — platform-specific promo posts for a funnel ──
const PLATFORMS = ['facebook', 'instagram', 'linkedin', 'x', 'tiktok'] as const

export const generateSocialPosts = async (
  env: AiEnv,
  template: string,
  funnelUrl: string,
  brief: string
): Promise<{ ok: boolean; posts?: Record<string, string>; error?: string }> => {
  try {
    const system = `You are a social media marketer for local service businesses. You write scroll-stopping, platform-native promo posts that drive clicks to a lead-generation funnel. FTC-compliant: no guaranteed results, no fake scarcity. You respond with ONLY a valid JSON object — no explanations, no markdown fences.`
    const user = `Funnel: "${template}" landing page for a local business.
Business brief: ${(brief || 'A local ' + template + ' business').slice(0, 500)}
Funnel link to include in EVERY post: ${funnelUrl}

Write one promo post per platform as JSON with these exact keys: ${PLATFORMS.join(', ')}.
Platform rules:
- facebook: 60-120 words, friendly + benefit-led, 1-2 emojis, ends with the link and a clear CTA
- instagram: caption style, line breaks, 3-5 emojis, ends with "Link in bio →" AND the link, then 8-12 niche hashtags
- linkedin: professional tone, short paragraphs, a business insight angle, no hashtag spam (max 3), link at end
- x: under 260 characters INCLUDING the link, punchy hook, 1-2 hashtags
- tiktok: a 15-second video script: HOOK line, 2-3 quick beats, CTA to tap the link; casual Gen-Z-friendly tone

Every post must include the funnel link exactly as given. Respond with ONLY the JSON object.`
    const raw = await runLLM(env, system, user, 2000)
    // extractJSON caps at 300 chars per value — social posts are longer, parse manually
    const fenced = raw.match(/```(?:json)?\s*([\s\S]*?)```/)
    const candidate = (fenced ? fenced[1] : raw).trim()
    const start = candidate.indexOf('{')
    if (start === -1) return { ok: false, error: 'AI returned unparseable output — try again' }
    const end = candidate.lastIndexOf('}')
    let parsed: Record<string, unknown> | null = null
    if (end > start) { try { parsed = JSON.parse(candidate.slice(start, end + 1)) } catch { /* try repair below */ } }
    if (!parsed) {
      // Truncated JSON (token limit) — repair by closing the open string + object
      let body = candidate.slice(start).replace(/,\s*"[^"]*$/, '').replace(/,\s*$/, '')
      const quotes = (body.match(/(?<!\\)"/g) || []).length
      if (quotes % 2 === 1) body += '"'
      try { parsed = JSON.parse(body + '}') } catch { /* give up */ }
    }
    if (!parsed || typeof parsed !== 'object') return { ok: false, error: 'AI returned invalid JSON — try again' }
    // Some models nest under a wrapper key like {"posts": {...}} — unwrap
    if (!PLATFORMS.some((p) => typeof parsed![p] === 'string')) {
      for (const v of Object.values(parsed)) {
        if (v && typeof v === 'object' && PLATFORMS.some((p) => typeof (v as Record<string, unknown>)[p] === 'string')) {
          parsed = v as Record<string, unknown>; break
        }
      }
    }
    const posts: Record<string, string> = {}
    for (const p of PLATFORMS) {
      const v = parsed[p]
      if (typeof v === 'string' && v.trim()) posts[p] = v.trim().slice(0, 2200)
      else if (v && typeof v === 'object') { // e.g. {text: "..."} or nested parts
        const t = (v as Record<string, unknown>).text || (v as Record<string, unknown>).post || (v as Record<string, unknown>).content
        if (typeof t === 'string' && t.trim()) posts[p] = t.trim().slice(0, 2200)
      }
    }
    if (!Object.keys(posts).length) return { ok: false, error: 'AI returned no usable posts — try again' }
    return { ok: true, posts }
  } catch (e) {
    return { ok: false, error: String(e).slice(0, 200) }
  }
}

// ── AI Lead Insights: summarize + prioritize recent leads ─────
export const generateLeadInsights = async (
  env: AiEnv,
  leads: Array<Record<string, unknown>>
): Promise<{ ok: boolean; insights?: string; error?: string }> => {
  try {
    const compact = leads.slice(0, 60).map((l) => ({
      funnel: l.funnel, name: l.name, email: l.email, phone: l.phone,
      campaign: l.utm_campaign, status: l.status, at: l.created_at
    }))
    const system = `You are a sales operations analyst for a funnel agency. Be concise, actionable, plain text (no markdown headers). Max 10 short lines.`
    const user = `Here are the most recent funnel leads as JSON:
${JSON.stringify(compact).slice(0, 6000)}

Give me:
1. One-line summary (volume, top funnels)
2. Top 3 leads to call FIRST today and why (name + funnel)
3. Any pattern worth acting on (best campaign/funnel, gaps)
Plain text, short lines, no fluff.`
    const insights = await runLLM(env, system, user, 500)
    if (!insights) return { ok: false, error: 'Empty AI response' }
    return { ok: true, insights }
  } catch (e) {
    return { ok: false, error: String(e).slice(0, 200) }
  }
}
