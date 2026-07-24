// ── v6.7: Agent Access Layer — Brand Asset API + MCP server ────────────────
// Gives AI agents / builders programmatic access to the McKnight brand system:
// design tokens, brand themes (official fleet hexes + live funnel themes),
// logo/shield assets, fonts and the 27 fleet documents — so they can pull the
// brand into any build via plain REST (GET /api/brand/*) or MCP (POST /mcp).
// Read-only + public by design: everything exposed here is already public
// static content; no secrets ever flow through this module.
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { BRAND_THEMES, FUNNEL_BRAND } from './templates/helpers'
import { GROUPS, FLEET_BRANDS } from './pages/fleet'
import { FUNNEL_SLUGS } from './funnels'

const API_VERSION = '1.0.0'

// ── Design tokens (structured JSON mirror of /static/fleet/design-tokens.css) ──
export const DESIGN_TOKENS = {
  meta: { brand: 'The Contracting Preacher / McKnight Opportunity Group', version: '1.0', cssUrl: '/static/fleet/design-tokens.css', prefix: '--tcp-' },
  colors: {
    primary: { navy: '#0A1628', 'navy-2': '#0F1E36', 'navy-3': '#152947' },
    accent: { gold: '#C9A961', 'gold-dark': '#B08D3F', 'gold-light': '#E4CB92' },
    neutrals: { ivory: '#F7F3EA', 'ivory-2': '#EFE8D6', white: '#FFFFFF', 'body-bg': '#EBE4D2' },
    semantic: { red: '#8B1F1F', ok: '#2F6B4A', warn: '#B87A1F' },
    text: { slate: '#4A5568', 'slate-2': '#718096', line: '#E5DFD0', 'line-2': '#D6CFB8' },
  },
  typography: {
    fonts: {
      serif: "'Playfair Display', Georgia, serif",
      sans: "'Inter', system-ui, -apple-system, sans-serif",
      mono: "'IBM Plex Mono', ui-monospace, monospace",
    },
    googleFontsImport: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,800;1,400&family=Inter:wght@300;400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
    scale: { hero: '80px', h1: '64px', h2: '44px', h3: '28px', lede: '22px', body: '16px', small: '14px', eyebrow: '12px', mono: '11px' },
    lineHeights: { tight: 0.96, heading: 1.05, normal: 1.5, relaxed: 1.7 },
    letterSpacing: { hero: '-0.02em', heading: '-0.01em', body: '0', eyebrow: '0.2em', tag: '0.14em' },
  },
  spacing: { xs: '4px', sm: '8px', md: '16px', lg: '24px', xl: '32px', '2xl': '48px', '3xl': '64px', '4xl': '96px' },
  radius: { default: '2px', pill: '20px', full: '9999px' },
  shadows: {
    sm: '0 2px 6px -3px rgba(10,22,40,0.15)',
    card: '0 12px 30px -18px rgba(10,22,40,0.25)',
    lift: '0 20px 40px -30px rgba(10,22,40,0.35)',
    modal: '0 30px 80px -30px rgba(0,0,0,0.5)',
    toast: '0 20px 40px -20px rgba(10,22,40,0.5)',
  },
  motion: { transition: '0.15s ease', fast: '0.12s ease', slow: '0.25s cubic-bezier(0.2, 0.8, 0.2, 1)' },
  layout: { container: '1360px', containerDoc: '1180px', sidebar: '260px', zModal: 300, zToast: 200 },
  gradients: {
    aurora: 'radial-gradient(circle at 85% 20%, rgba(201,169,97,0.20), transparent 45%), radial-gradient(circle at 15% 90%, rgba(201,169,97,0.10), transparent 50%), #0A1628',
    brandStrip: 'linear-gradient(90deg, #0A1628 0%, #0A1628 62%, #C9A961 62%, #C9A961 100%)',
    cta: 'linear-gradient(135deg, #8B1F1F 0%, #6d1616 100%)',
    darkVertical: 'linear-gradient(180deg, #0A1628 0%, #152947 100%)',
    ivoryFade: 'linear-gradient(180deg, #FFFFFF 0%, #F7F3EA 100%)',
    slider: 'linear-gradient(90deg, #0A1628, #C9A961)',
  },
} as const

// ── Brand asset files at /static/fleet/assets/ ──
export const BRAND_ASSETS = [
  { file: 'logo-horizontal-light.png', kind: 'logo', desc: 'Horizontal logo — for dark backgrounds (light artwork)' },
  { file: 'logo-horizontal-dark.png', kind: 'logo', desc: 'Horizontal logo — for light backgrounds (dark artwork)' },
  { file: 'shield-navy.png', kind: 'mark', desc: 'MOG shield mark — navy fill' },
  { file: 'shield-gold.png', kind: 'mark', desc: 'MOG shield mark — gold fill' },
  { file: 'shield-outline-lg.png', kind: 'mark', desc: 'MOG shield mark — large outline' },
  { file: 'og-image.png', kind: 'social', desc: 'Open Graph share image (1200×630)' },
  { file: 'favicon-32.png', kind: 'icon', desc: 'Favicon 32×32' },
  { file: 'apple-touch-icon.png', kind: 'icon', desc: 'Apple touch icon (180×180)' },
] as const

const abs = (origin: string, path: string) => `${origin}${path}`

const assetList = (origin: string) => BRAND_ASSETS.map((a) => ({ ...a, url: abs(origin, `/static/fleet/assets/${a.file}`) }))

const fleetThemes = () => (FLEET_BRANDS as readonly (readonly [string, string, string])[]).map(([num, name, accent]) => ({ num, name, accent }))

const liveThemes = () => Object.values(BRAND_THEMES).map((t) => ({ key: t.key, name: t.name, icon: t.icon, tagline: t.tagline, color: t.color, color2: t.color2, darkText: t.darkText }))

const docsIndex = (origin: string) => GROUPS.map((g) => ({
  group: g.key, title: g.title, tag: g.tag,
  docs: g.docs.map((d) => ({ slug: d.file.replace(/\.html$/, ''), title: d.title, desc: d.desc, url: abs(origin, `/static/fleet/${d.file}`) })),
}))

const devFiles = (origin: string) => ([
  { file: 'design-tokens.css', desc: 'Paste-ready CSS custom properties (all tokens)', url: abs(origin, '/static/fleet/design-tokens.css') },
  { file: 'tailwind.config.example.js', desc: 'Tailwind config with brand tokens pre-wired', url: abs(origin, '/static/fleet/tailwind.config.example.js') },
  { file: 'deck_stage.js', desc: 'Presentation deck engine (keyboard nav, print, notes)', url: abs(origin, '/static/fleet/deck_stage.js') },
  { file: 'HANDOFF-README.md', desc: 'Official handoff package README', url: abs(origin, '/static/fleet/HANDOFF-README.md') },
])

const manifest = (origin: string) => ({
  name: 'McKnight Brand Asset API',
  version: API_VERSION,
  description: 'Read-only brand system API for AI agents & builders. Pull design tokens, brand themes, logos/shields, fonts and fleet documents into any build.',
  base: origin,
  auth: 'none (public read-only)',
  endpoints: {
    'GET /api/brand': 'This manifest',
    'GET /api/brand/tokens': 'Design tokens as structured JSON (colors, type, spacing, radius, shadows, motion, gradients)',
    'GET /api/brand/tokens.css': 'Design tokens as paste-ready CSS custom properties',
    'GET /api/brand/themes': 'All brand themes: official fleet accents + live funnel themes (color/color2/tagline/icon)',
    'GET /api/brand/themes/:key': 'One live theme by key (mog, growthos, contracting, capital, mortgage, housing, freight, fleetworks, earlylearning, learning)',
    'GET /api/brand/assets': 'Logo / shield / icon / social image files with absolute URLs',
    'GET /api/brand/docs': '27 fleet document deliverables, grouped, with absolute URLs',
    'GET /api/brand/fonts': 'Font stacks + Google Fonts import URL',
    'GET /api/brand/llms.txt': 'Plain-text agent guide (also at /llms.txt)',
  },
  mcp: {
    endpoint: abs(origin, '/mcp'),
    transport: 'streamable-http (JSON-RPC 2.0 over POST)',
    tools: ['get_brand_manifest', 'get_brand_tokens', 'list_brand_themes', 'get_brand_theme', 'list_brand_assets', 'list_fleet_docs', 'get_fonts'],
  },
  usage: {
    curl: `curl ${origin}/api/brand/tokens`,
    css: `<link rel="stylesheet" href="${origin}/static/fleet/design-tokens.css">`,
    logo: `<img src="${origin}/static/fleet/assets/logo-horizontal-light.png" alt="McKnight">`,
  },
})

// ── llms.txt content (agent-readable plain-text guide) ──
export const llmsTxt = (origin: string) => `# McKnight GrowthOS — Brand Asset API (for AI agents & builders)

> Read-only, public, no auth. Use these endpoints to pull the official
> McKnight Opportunity Group / The Contracting Preacher brand system
> (tokens, colors, fonts, logos, documents) into any build.

## REST API (JSON)
- ${origin}/api/brand              — manifest + usage
- ${origin}/api/brand/tokens       — design tokens JSON (colors, typography, spacing, radius, shadows, motion, gradients)
- ${origin}/api/brand/tokens.css   — same tokens as CSS custom properties (--tcp-*)
- ${origin}/api/brand/themes       — all 10 brand themes: official fleet accent hexes + live funnel themes
- ${origin}/api/brand/themes/{key} — one theme; keys: mog growthos contracting capital mortgage housing freight fleetworks earlylearning learning
- ${origin}/api/brand/assets       — logos, shields, icons, OG image (absolute PNG URLs)
- ${origin}/api/brand/docs         — 27 fleet HTML deliverables (brand kit, capability statement, decks, trackers...)
- ${origin}/api/brand/fonts        — font stacks + Google Fonts import

## MCP server (Model Context Protocol)
- Endpoint: ${origin}/mcp  (streamable HTTP, JSON-RPC 2.0)
- Tools: get_brand_manifest, get_brand_tokens, list_brand_themes, get_brand_theme, list_brand_assets, list_fleet_docs, get_fonts
- Connect (Claude Code):  claude mcp add --transport http mcknight-brand ${origin}/mcp
- Connect (generic config): {"mcpServers":{"mcknight-brand":{"url":"${origin}/mcp"}}}

## Core palette (The Contracting Preacher / MOG)
navy #0A1628 · gold #C9A961 · gold-light #E4CB92 · ivory #F7F3EA · red(CTA only) #8B1F1F
Fonts: Playfair Display (serif headings) · Inter (sans body) · IBM Plex Mono (labels/eyebrows)

## Official fleet accents (10 brands)
${(FLEET_BRANDS as readonly (readonly [string, string, string])[]).map(([n, name, hex]) => `- ${n} ${name}: ${hex}`).join('\n')}

## Static files (direct)
- Tokens CSS:  ${origin}/static/fleet/design-tokens.css
- Tailwind:    ${origin}/static/fleet/tailwind.config.example.js
- Assets:      ${origin}/static/fleet/assets/{logo-horizontal-light,logo-horizontal-dark,shield-navy,shield-gold,shield-outline-lg,og-image,favicon-32,apple-touch-icon}.png
- Docs:        ${origin}/static/fleet/{slug}.html  (see /api/brand/docs for slugs)

## Rules for builders
1. Gold #C9A961 is the prestige accent; red #8B1F1F is for CTAs/urgency ONLY, never decoration.
2. Headings: Playfair Display. Body: Inter. Eyebrows/labels: IBM Plex Mono, uppercase, 0.2em tracking.
3. Radius is 2px nearly everywhere (pill 20px, avatar 9999px). Spacing on a 4pt baseline.
4. Use logo-horizontal-light.png on dark surfaces, logo-horizontal-dark.png on light surfaces.
`

// ── REST router (mounted at /api/brand) ──────────────────────────────────
export const brandApi = new Hono()
brandApi.use('*', cors())

const cacheHdr = { 'Cache-Control': 'public, max-age=300' }

brandApi.get('/', (c) => c.json(manifest(new URL(c.req.url).origin), 200, cacheHdr))
brandApi.get('/tokens', (c) => c.json({ ok: true, tokens: DESIGN_TOKENS }, 200, cacheHdr))
brandApi.get('/tokens.css', (c) => c.redirect('/static/fleet/design-tokens.css', 302))
brandApi.get('/themes', (c) => c.json({
  ok: true,
  official_fleet_accents: fleetThemes(),
  live_funnel_themes: liveThemes(),
  funnel_brand_map: FUNNEL_BRAND,
  funnel_slugs: FUNNEL_SLUGS,
  note: 'official_fleet_accents = handoff palette (source of truth for brand identity); live_funnel_themes = colors currently rendered on the 42 funnels.',
}, 200, cacheHdr))
brandApi.get('/themes/:key', (c) => {
  const key = c.req.param('key')
  const t = (BRAND_THEMES as Record<string, any>)[key]
  if (!t) return c.json({ ok: false, error: `Unknown theme '${key}'. Valid: ${Object.keys(BRAND_THEMES).join(', ')}` }, 404)
  const official = fleetThemes().find((f) => f.name.toLowerCase().includes(key === 'mog' ? 'opportunity' : key === 'contracting' ? 'preacher' : key === 'earlylearning' ? 'early learning' : key === 'learning' ? 'learningos' : key === 'fleetworks' ? 'fleetworks' : key))
  return c.json({ ok: true, theme: t, official_fleet_accent: official?.accent || null }, 200, cacheHdr)
})
brandApi.get('/assets', (c) => c.json({ ok: true, base: `${new URL(c.req.url).origin}/static/fleet/assets/`, assets: assetList(new URL(c.req.url).origin) }, 200, cacheHdr))
brandApi.get('/docs', (c) => {
  const origin = new URL(c.req.url).origin
  return c.json({ ok: true, count: GROUPS.reduce((n, g) => n + g.docs.length, 0) + 1, hub: { slug: 'index', title: 'Fleet Package Hub', desc: 'Official handoff package index page', url: abs(origin, '/static/fleet/index.html') }, groups: docsIndex(origin), dev_files: devFiles(origin) }, 200, cacheHdr)
})
brandApi.get('/fonts', (c) => c.json({ ok: true, fonts: DESIGN_TOKENS.typography.fonts, googleFontsImport: DESIGN_TOKENS.typography.googleFontsImport, usage: { headings: 'Playfair Display (serif)', body: 'Inter (sans)', labels: 'IBM Plex Mono (mono, uppercase, 0.2em tracking)' } }, 200, cacheHdr))
brandApi.get('/llms.txt', (c) => c.text(llmsTxt(new URL(c.req.url).origin)))

// ── MCP server (Model Context Protocol, streamable HTTP / JSON-RPC 2.0) ──
const MCP_TOOLS = [
  { name: 'get_brand_manifest', description: 'Get the full brand API manifest: endpoints, usage snippets, MCP info for the McKnight brand system.', inputSchema: { type: 'object', properties: {}, required: [] } },
  { name: 'get_brand_tokens', description: 'Get all design tokens as structured JSON: colors (navy/gold/ivory system), typography (Playfair Display/Inter/IBM Plex Mono + scale), spacing, radius, shadows, motion, gradients. Use these to style any build in the McKnight / Contracting Preacher brand.', inputSchema: { type: 'object', properties: {}, required: [] } },
  { name: 'list_brand_themes', description: 'List all 10 McKnight fleet brand themes: official handoff accent hexes AND live funnel theme colors (color/color2/tagline/icon), plus the funnel→brand map.', inputSchema: { type: 'object', properties: {}, required: [] } },
  { name: 'get_brand_theme', description: 'Get one brand theme by key.', inputSchema: { type: 'object', properties: { key: { type: 'string', description: 'Theme key: mog, growthos, contracting, capital, mortgage, housing, freight, fleetworks, earlylearning, learning' } }, required: ['key'] } },
  { name: 'list_brand_assets', description: 'List logo / shield / icon / social-image files with absolute PNG URLs ready to embed in builds (use logo-horizontal-light on dark backgrounds, -dark on light).', inputSchema: { type: 'object', properties: {}, required: [] } },
  { name: 'list_fleet_docs', description: 'List the 27 official fleet HTML deliverables (brand kit, capability statement, proposal deck, trackers, templates) grouped by category, with absolute URLs, plus dev files (design-tokens.css, tailwind config).', inputSchema: { type: 'object', properties: {}, required: [] } },
  { name: 'get_fonts', description: 'Get brand font stacks and the ready-to-use Google Fonts import URL (Playfair Display + Inter + IBM Plex Mono).', inputSchema: { type: 'object', properties: {}, required: [] } },
]

function mcpToolResult(name: string, args: any, origin: string): { content: any } | { error: string } {
  const wrap = (obj: unknown) => ({ content: [{ type: 'text', text: JSON.stringify(obj, null, 2) }] })
  switch (name) {
    case 'get_brand_manifest': return wrap(manifest(origin))
    case 'get_brand_tokens': return wrap(DESIGN_TOKENS)
    case 'list_brand_themes': return wrap({ official_fleet_accents: fleetThemes(), live_funnel_themes: liveThemes(), funnel_brand_map: FUNNEL_BRAND })
    case 'get_brand_theme': {
      const key = String(args?.key || '')
      const t = (BRAND_THEMES as Record<string, any>)[key]
      if (!t) return { error: `Unknown theme '${key}'. Valid keys: ${Object.keys(BRAND_THEMES).join(', ')}` }
      return wrap(t)
    }
    case 'list_brand_assets': return wrap({ base: `${origin}/static/fleet/assets/`, assets: assetList(origin) })
    case 'list_fleet_docs': return wrap({ hub: { title: 'Fleet Package Hub', url: `${origin}/static/fleet/index.html` }, groups: docsIndex(origin), dev_files: devFiles(origin) })
    case 'get_fonts': return wrap({ fonts: DESIGN_TOKENS.typography.fonts, googleFontsImport: DESIGN_TOKENS.typography.googleFontsImport })
    default: return { error: `Unknown tool '${name}'` }
  }
}

export const mcp = new Hono()
mcp.use('*', cors())

// GET /mcp — human/agent discovery info (MCP itself uses POST)
mcp.get('/', (c) => {
  const origin = new URL(c.req.url).origin
  return c.json({
    name: 'mcknight-brand', title: 'McKnight Brand Asset MCP Server', version: API_VERSION,
    protocol: 'MCP (JSON-RPC 2.0 over streamable HTTP)', endpoint: `${origin}/mcp`,
    tools: MCP_TOOLS.map((t) => t.name),
    connect: {
      claude_code: `claude mcp add --transport http mcknight-brand ${origin}/mcp`,
      config_json: { mcpServers: { 'mcknight-brand': { url: `${origin}/mcp` } } },
      curl_example: `curl -X POST ${origin}/mcp -H 'Content-Type: application/json' -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"get_brand_tokens","arguments":{}}}'`,
    },
    rest_alternative: `${origin}/api/brand`,
  })
})

mcp.post('/', async (c) => {
  let body: any
  try { body = await c.req.json() } catch { return c.json({ jsonrpc: '2.0', id: null, error: { code: -32700, message: 'Parse error' } }, 400) }
  const reqs: any[] = Array.isArray(body) ? body : [body]
  const origin = new URL(c.req.url).origin
  const out: any[] = []
  for (const r of reqs) {
    const { id, method, params } = r || {}
    // Notifications (no id) → no response entry
    if (id === undefined || id === null) {
      if (typeof method === 'string' && method.startsWith('notifications/')) continue
      if (method === undefined) { out.push({ jsonrpc: '2.0', id: null, error: { code: -32600, message: 'Invalid Request' } }); continue }
      continue
    }
    const reply = (result?: any, error?: any) => out.push(error ? { jsonrpc: '2.0', id, error } : { jsonrpc: '2.0', id, result })
    switch (method) {
      case 'initialize':
        reply({
          protocolVersion: params?.protocolVersion || '2025-03-26',
          capabilities: { tools: { listChanged: false } },
          serverInfo: { name: 'mcknight-brand', title: 'McKnight Brand Asset MCP Server', version: API_VERSION },
          instructions: 'Read-only brand system server for McKnight Opportunity Group / The Contracting Preacher. Use get_brand_tokens for the design system, list_brand_assets for logo/shield URLs, list_brand_themes for the 10-brand palette, list_fleet_docs for the 27 deliverables. Follow brand rules: gold #C9A961 = prestige accent, red #8B1F1F = CTA only, Playfair Display headings, Inter body, IBM Plex Mono labels, 2px radius.',
        })
        break
      case 'ping': reply({}); break
      case 'tools/list': reply({ tools: MCP_TOOLS }); break
      case 'tools/call': {
        const res = mcpToolResult(params?.name, params?.arguments, origin)
        if ('error' in res) reply({ content: [{ type: 'text', text: res.error }], isError: true })
        else reply(res)
        break
      }
      case 'resources/list': reply({ resources: [] }); break
      case 'prompts/list': reply({ prompts: [] }); break
      default: reply(undefined, { code: -32601, message: `Method not found: ${method}` })
    }
  }
  if (out.length === 0) return c.body(null, 202)
  return c.json(Array.isArray(body) ? out : out[0])
})
