// ── RJ SEO KEEPER — Cloudflare Worker ──────────────────────────
// Runs daily via cron. Keeps funnels.rjbusinesssolutions.org indexed & fresh:
//  1. Fetches the live sitemap (also warms the edge cache)
//  2. Submits every URL to IndexNow (Bing / Yandex / Seznam / Naver shared index)
//  3. Warms the top funnel pages so crawlers always hit a hot cache
//  4. Records last-run status in KV-free memory-safe way (health endpoint reports live)
// Manual trigger: GET https://rj-seo-keeper.<subdomain>.workers.dev/run

const SITE = 'https://funnels.rjbusinesssolutions.org'
const INDEXNOW_KEY = '0ba4bc5051534cffb4f950503fd5563d'

async function getSitemapUrls(): Promise<string[]> {
  const r = await fetch(`${SITE}/sitemap.xml`, { headers: { 'User-Agent': 'RJ-SEO-Keeper/1.0' } })
  if (!r.ok) throw new Error(`sitemap fetch failed: ${r.status}`)
  const xml = await r.text()
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
}

async function submitIndexNow(urls: string[]) {
  const endpoints = ['https://www.bing.com/indexnow', 'https://api.indexnow.org/indexnow', 'https://yandex.com/indexnow']
  let last: { status: number; ok: boolean; endpoint: string } = { status: 0, ok: false, endpoint: '' }
  for (const ep of endpoints) {
    const res = await submitTo(ep, urls)
    last = { ...res, endpoint: ep }
    if (res.ok) return last
  }
  return last
}

async function submitTo(endpoint: string, urls: string[]) {
  const r = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({
      host: new URL(SITE).host,
      key: INDEXNOW_KEY,
      keyLocation: `${SITE}/${INDEXNOW_KEY}.txt`,
      urlList: urls
    })
  })
  return { status: r.status, ok: r.status === 200 || r.status === 202 }
}

async function warmCache(urls: string[]) {
  // Warm the highest-value pages so bots always get fast responses (CWV ranking signal)
  const top = urls.filter((u) => u.includes('/t/') || u.endsWith('.org/') || u.endsWith('.org')).slice(0, 18)
  const results = await Promise.allSettled(top.map((u) => fetch(u, { headers: { 'User-Agent': 'RJ-SEO-Keeper-Warmer/1.0' }, cf: { cacheEverything: false } })))
  return { warmed: results.filter((r) => r.status === 'fulfilled').length, of: top.length }
}

async function runDaily() {
  const started = new Date().toISOString()
  const urls = await getSitemapUrls()
  const [indexnow, warm] = await Promise.all([submitIndexNow(urls), warmCache(urls)])
  const summary = { started, site: SITE, urls: urls.length, indexnow, warm, finished: new Date().toISOString() }
  console.log('RJ SEO Keeper run:', JSON.stringify(summary))
  return summary
}

export default {
  // Daily cron (06:07 UTC ≈ overnight US) — see wrangler.jsonc triggers
  async scheduled(_event: ScheduledEvent, _env: unknown, ctx: ExecutionContext) {
    ctx.waitUntil(runDaily())
  },

  // Manual trigger + health
  async fetch(req: Request): Promise<Response> {
    const { pathname } = new URL(req.url)
    if (pathname === '/run') {
      try {
        const summary = await runDaily()
        return Response.json({ ok: true, ...summary })
      } catch (e) {
        return Response.json({ ok: false, error: String(e) }, { status: 500 })
      }
    }
    return Response.json({
      ok: true,
      worker: 'rj-seo-keeper',
      purpose: 'Daily IndexNow submission + cache warming for funnels.rjbusinesssolutions.org',
      schedule: '07 6 * * * (daily 06:07 UTC)',
      manual: '/run'
    })
  }
}
