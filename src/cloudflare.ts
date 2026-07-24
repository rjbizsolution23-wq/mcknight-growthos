// ── McKnight GrowthOS — Cloudflare Deploy engine ─────────────────
// Users drop their own Cloudflare API token + account id in the Key
// Vault, then one-click deploy any funnel to THEIR account as a
// standalone Worker on their workers.dev subdomain.
//
// How it works:
//  1. The funnel is rendered server-side with the chosen params baked in
//  2. A tiny standalone Worker script is generated: serves the HTML at /,
//     and proxies /static/*, /api/lead, /api/checkout etc. back to the
//     platform origin — so leads STILL flow into LeadFlow CRM, GHL,
//     email, alerts... everything.
//  3. Uploaded via the Cloudflare API (PUT workers/scripts) + workers.dev
//     subdomain enabled. Live URL in ~5 seconds.
// Every deployment is persisted in D1 `cf_deployments`.

export type CfEnv = {
  CF_DEPLOY_API_TOKEN?: string
  CF_DEPLOY_ACCOUNT_ID?: string
  DB?: any
}

const CF_API = 'https://api.cloudflare.com/client/v4'

export const cfConfigured = (env: CfEnv | undefined) => !!(env?.CF_DEPLOY_API_TOKEN && env?.CF_DEPLOY_ACCOUNT_ID)

const cfFetch = async (env: CfEnv, path: string, init: RequestInit = {}): Promise<any> => {
  const r = await fetch(`${CF_API}${path}`, {
    ...init,
    headers: { Authorization: `Bearer ${env.CF_DEPLOY_API_TOKEN}`, ...(init.headers || {}) }
  })
  const j: any = await r.json().catch(() => ({}))
  if (!j.success) {
    const msg = (j.errors || []).map((e: any) => e.message).join('; ') || `HTTP ${r.status}`
    throw new Error(msg)
  }
  return j.result
}

// Verify the token + account are valid (used by /api/cf/status)
export const cfVerify = async (env: CfEnv): Promise<{ ok: boolean; error?: string; subdomain?: string }> => {
  if (!cfConfigured(env)) return { ok: false, error: 'Add CF_DEPLOY_API_TOKEN and CF_DEPLOY_ACCOUNT_ID in the Key Vault' }
  try {
    const sub = await getSubdomain(env)
    return { ok: true, subdomain: sub }
  } catch (e: any) { return { ok: false, error: String(e?.message || e).slice(0, 300) } }
}

// Get (or create) the account's workers.dev subdomain
const getSubdomain = async (env: CfEnv): Promise<string> => {
  try {
    const r = await cfFetch(env, `/accounts/${env.CF_DEPLOY_ACCOUNT_ID}/workers/subdomain`)
    if (r?.subdomain) return r.subdomain
  } catch { /* fallthrough to create */ }
  // No subdomain yet — register one from the account id
  const name = `growthos-${String(env.CF_DEPLOY_ACCOUNT_ID).slice(0, 12)}`
  const r = await cfFetch(env, `/accounts/${env.CF_DEPLOY_ACCOUNT_ID}/workers/subdomain`, {
    method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ subdomain: name })
  })
  return r?.subdomain || name
}

// Generate the standalone Worker script for a rendered funnel
export const buildWorkerScript = (html: string, platformOrigin: string): string => `// Deployed by McKnight GrowthOS — standalone funnel worker
const HTML = ${JSON.stringify(html)};
const ORIGIN = ${JSON.stringify(platformOrigin)};
export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/' || url.pathname === '/index.html') {
      return new Response(HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'public, max-age=300' } });
    }
    // Proxy static assets + APIs (lead capture, checkout, hooks) to the platform
    // so every lead still lands in LeadFlow CRM / GHL / email / alerts.
    const upstream = new Request(ORIGIN + url.pathname + url.search, request);
    return fetch(upstream);
  }
}
`

const sanitizeWorkerName = (s: string) => s.toLowerCase().replace(/[^a-z0-9-]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '').slice(0, 54)

// ── Deploy one funnel to the user's Cloudflare account ─────────
export const deployFunnel = async (
  env: CfEnv,
  opts: { funnel: string; html: string; platformOrigin: string; name?: string; params?: Record<string, string> }
): Promise<{ ok: boolean; url?: string; workerName?: string; error?: string }> => {
  if (!cfConfigured(env)) return { ok: false, error: 'Cloudflare keys not configured — add them in the Key Vault' }
  const workerName = sanitizeWorkerName(opts.name || `growthos-${opts.funnel}`) || `growthos-${opts.funnel}`
  try {
    const script = buildWorkerScript(opts.html, opts.platformOrigin)

    // Upload as ES module (multipart)
    const metadata = JSON.stringify({ main_module: 'worker.js', compatibility_date: '2024-01-01' })
    const form = new FormData()
    form.append('metadata', new Blob([metadata], { type: 'application/json' }), 'metadata')
    form.append('worker.js', new Blob([script], { type: 'application/javascript+module' }), 'worker.js')
    await cfFetch(env, `/accounts/${env.CF_DEPLOY_ACCOUNT_ID}/workers/scripts/${workerName}`, { method: 'PUT', body: form })

    // Enable workers.dev route for the script
    await cfFetch(env, `/accounts/${env.CF_DEPLOY_ACCOUNT_ID}/workers/scripts/${workerName}/subdomain`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ enabled: true, previews_enabled: false })
    })

    const subdomain = await getSubdomain(env)
    const url = `https://${workerName}.${subdomain}.workers.dev`

    // Persist deployment
    try {
      await env.DB?.prepare(`INSERT INTO cf_deployments (funnel, worker_name, url, account_id, params, status, updated_at)
        VALUES (?,?,?,?,?,'active',CURRENT_TIMESTAMP)`)
        .bind(opts.funnel, workerName, url, env.CF_DEPLOY_ACCOUNT_ID, JSON.stringify(opts.params || {})).run()
    } catch { /* log only */ }

    return { ok: true, url, workerName }
  } catch (e: any) {
    const error = String(e?.message || e).slice(0, 400)
    try {
      await env.DB?.prepare(`INSERT INTO cf_deployments (funnel, worker_name, url, account_id, params, status, error, updated_at)
        VALUES (?,?,?,?,?,'failed',?,CURRENT_TIMESTAMP)`)
        .bind(opts.funnel, workerName, '', env.CF_DEPLOY_ACCOUNT_ID || '', JSON.stringify(opts.params || {}), error).run()
    } catch { /* log only */ }
    return { ok: false, error }
  }
}

// ── Delete a deployed funnel worker ────────────────────────────
export const deleteDeployment = async (env: CfEnv, workerName: string): Promise<{ ok: boolean; error?: string }> => {
  if (!cfConfigured(env)) return { ok: false, error: 'Cloudflare keys not configured' }
  try {
    await cfFetch(env, `/accounts/${env.CF_DEPLOY_ACCOUNT_ID}/workers/scripts/${sanitizeWorkerName(workerName)}`, { method: 'DELETE' })
    try { await env.DB?.prepare("UPDATE cf_deployments SET status='deleted', updated_at=CURRENT_TIMESTAMP WHERE worker_name=?").bind(workerName).run() } catch { /* log only */ }
    return { ok: true }
  } catch (e: any) { return { ok: false, error: String(e?.message || e).slice(0, 300) } }
}

// ── List deployments (from D1 — the system of record) ──────────
export const listDeployments = async (env: CfEnv): Promise<any[]> => {
  try {
    const rows = await env.DB?.prepare('SELECT id, funnel, worker_name, url, status, error, params, created_at, updated_at FROM cf_deployments ORDER BY id DESC LIMIT 100').all()
    return (rows?.results || []) as any[]
  } catch { return [] }
}
