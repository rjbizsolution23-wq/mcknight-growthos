// Template helpers — shared by all live funnel templates

// ── McKNIGHT BRAND SYSTEM (single source of truth — GrowthOS spec) ──
// McKnight GrowthOS · AI-Powered Conversion and Revenue Operations Platform
// Parent: McKnight Opportunity Group · Technology: Powered by RJ Business Solutions
export const BRAND = {
  name: 'McKnight GrowthOS',
  parent: 'McKnight Opportunity Group',
  poweredBy: 'RJ Business Solutions',
  tagline: 'Turn attention into pipeline—and pipeline into growth.',
  logo: '/static/logo.svg',
  url: 'https://mcknight-growthos.pages.dev',
  navy: '#0a1628',       // McKnight navy
  deepNavy: '#050b16',   // McKnight deep navy
  royal: '#1e3a8a',      // gradient mid-stop
  royalDeep: '#0a1628',
  navyBlack: '#050b16',
  blue: '#2563eb',       // growth blue
  cyan: '#0ea5e9',       // growth cyan (product accent)
  indigo: '#4f46e5',     // growth indigo
  gold: '#d4a72c',       // McKnight gold
  goldLight: '#f4ce65',  // McKnight gold light
  address: '1342 NM 333, Tijeras, NM 87059',
  region: 'US-NM',
  placename: 'Tijeras, New Mexico',
  geo: '35.0620;-106.3861',
  phone: '',
  twitter: '@ricksolutions1'
}
export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

// ── v5.1 FUNNEL BRAND THEMING — every funnel renders in its brand's colors ──
// Mirrors ClientOS BRANDS + FUNNEL_PIPELINE: the funnel that feeds a brand's
// pipeline also wears that brand's identity. Single source of truth here for
// the visual layer; clientos.ts owns the CRM routing layer (kept in sync).
export type BrandTheme = {
  key: string; name: string; icon: string; tagline: string
  color: string; color2: string   // primary + light accent
  darkText: boolean               // true → dark text on primary buttons (light colors)
}
export const BRAND_THEMES: Record<string, BrandTheme> = {
  growthos:    { key: 'growthos',    name: 'McKnight GrowthOS',           icon: 'fa-rocket',         tagline: 'Turn attention into pipeline—and pipeline into growth.', color: '#d4a72c', color2: '#f4ce65', darkText: true },
  contracting: { key: 'contracting', name: 'Contracting Preacher OS',     icon: 'fa-file-contract',  tagline: 'Win government contracts with systems, not luck.',       color: '#2563eb', color2: '#60a5fa', darkText: false },
  capital:     { key: 'capital',     name: 'McKnight Capital Ready',      icon: 'fa-coins',          tagline: 'Get fundable. Get funded. Stay funded.',                 color: '#059669', color2: '#34d399', darkText: false },
  mortgage:    { key: 'mortgage',    name: 'McKnight MortgageOS',         icon: 'fa-house-chimney',  tagline: 'Mortgage technology that closes.',                       color: '#7c3aed', color2: '#a78bfa', darkText: false },
  housing:     { key: 'housing',     name: 'McKnight Housing Initiative', icon: 'fa-building',       tagline: 'Pathways to ownership for every family.',                color: '#0ea5e9', color2: '#7dd3fc', darkText: true },
  freight:     { key: 'freight',     name: 'McKnight DriverHub',          icon: 'fa-truck',          tagline: 'Keep America moving — drivers first.',                   color: '#f59e0b', color2: '#fcd34d', darkText: true },
  fleetworks:  { key: 'fleetworks',  name: 'FleetWorks ServiceHub',       icon: 'fa-wrench',         tagline: 'Fleet uptime is the business.',                          color: '#dc2626', color2: '#f87171', darkText: false },
  learning:    { key: 'learning',    name: 'McKnight LearningOS',         icon: 'fa-graduation-cap', tagline: 'Every child ready. Every family supported.',             color: '#ec4899', color2: '#f9a8d4', darkText: false },
}
// Funnel slug → brand key (visual). Matches FUNNEL_PIPELINE routing in clientos.ts.
export const FUNNEL_BRAND: Record<string, string> = {
  'tax-lead': 'capital', 'credit-service': 'capital', 'credit-saas': 'capital', 'accounting': 'capital',
  'mortgage': 'mortgage',
  'real-estate': 'housing',
  'moving': 'freight',
  'auto-services': 'fleetworks',
  'childcare': 'learning', 'tutoring': 'learning',
  'sponsor-deck': 'contracting',
  // everything else wears the flagship GrowthOS identity
}
export const brandThemeFor = (slug: string | undefined): BrandTheme =>
  BRAND_THEMES[(slug && FUNNEL_BRAND[slug]) || 'growthos']

export const param = (q: Record<string, string | undefined>, key: string, fallback: string) => {
  const v = q[key]
  return v && v.trim() ? esc(v.trim()) : fallback
}

// Deadline 14 days out by default (real countdown, resets per visit for demo purposes — replace with fixed date in production)
export const defaultDeadline = () => new Date(Date.now() + 14 * 86400000).toISOString()

// ── SEO / AEO / SGE ENGINE ─────────────────────────────────────
// Every funnel head auto-generates: title, meta description, keywords,
// canonical, robots, OG graph, Twitter cards, JSON-LD ProfessionalService
// + optional FAQPage schema, and dark theme. All overridable via URL params:
//   seoTitle, seoDesc, seoKeywords, canonical, ogImage, theme=dark, noindex=1
export const funnelHead = (
  title: string,
  q: Record<string, string | undefined> = {},
  opts: { desc?: string; type?: string; faq?: Array<{ q: string; a: string }> } = {}
) => {
  const seoTitle = param(q, 'seoTitle', title)
  const desc = param(q, 'seoDesc', opts.desc || (title + ' — conversion-focused funnel built on McKnight GrowthOS.'))
  const keywords = param(q, 'seoKeywords', '')
  const canonical = param(q, 'canonical', '')
  const ogImage = param(q, 'ogImage', 'https://mcknight-growthos.pages.dev/static/logo.svg')
  const dark = (q.theme || '').toLowerCase() === 'dark'
  const noindex = q.noindex === '1'

  // v2.2 — Tracking pixels (all optional via URL params / builder)
  const ga4 = param(q, 'ga4', '')          // G-XXXXXXX
  const gtm = param(q, 'gtm', '')          // GTM-XXXXXX
  const metaPixel = param(q, 'metaPixel', '') // Meta/Facebook Pixel ID
  const ttPixel = param(q, 'ttPixel', '')  // TikTok Pixel ID
  // v2.2 — Conversion layer config (exit-intent, sticky CTA, progress, redirect)
  const rjfCfg: Record<string, string> = {}
  for (const k of ['exit', 'sticky', 'progress', 'toTop'] as const) { if (q[k] === '0') rjfCfg[k] = '0' }
  if (q.cta && q.cta.trim()) rjfCfg.ctaText = esc(q.cta.trim())
  if (q.exitTitle && q.exitTitle.trim()) rjfCfg.exitTitle = esc(q.exitTitle.trim())
  if (q.exitDesc && q.exitDesc.trim()) rjfCfg.exitDesc = esc(q.exitDesc.trim())
  if (q.redirect && /^(https?:\/\/|\/)/.test(q.redirect.trim())) rjfCfg.redirect = esc(q.redirect.trim())
  // v3.1 — GoHighLevel: custom tags attached to every lead from this funnel URL (comma-separated)
  if (q.ghlTag && q.ghlTag.trim()) rjfCfg.ghlTag = esc(q.ghlTag.trim().slice(0, 200))

  // ── v5.1 — BRAND THEMING: funnel wears its brand's identity ──
  // index.tsx injects q._slug; brandThemeFor maps it to the brand palette.
  // URL param brand=<key> can force any brand (demos/white-label previews).
  const theme = (q.brand && BRAND_THEMES[q.brand]) ? BRAND_THEMES[q.brand] : brandThemeFor(q._slug)
  rjfCfg.brandKey = theme.key
  rjfCfg.brandName = theme.name
  rjfCfg.brandIcon = theme.icon
  rjfCfg.brandTagline = theme.tagline
  rjfCfg.brandHex = theme.color

  // v3.0 — WHITE-LABEL LAYER: client branding via URL params (sellable all-in-one)
  //   bizLogo   — client logo URL → injected top-of-hero + footer by motion.js
  //   brandColor — primary hex → remaps CTA/accent colors across the funnel
  //   accentColor — secondary hex for gradients (defaults to brandColor)
  const bizLogo = q.bizLogo && /^https?:\/\//.test(q.bizLogo.trim()) ? esc(q.bizLogo.trim()) : ''
  const brandColor = q.brandColor && /^#?[0-9a-fA-F]{6}$/.test(q.brandColor.trim()) ? '#' + q.brandColor.trim().replace('#', '') : ''
  const accentColor = q.accentColor && /^#?[0-9a-fA-F]{6}$/.test(q.accentColor.trim()) ? '#' + q.accentColor.trim().replace('#', '') : brandColor
  if (bizLogo) rjfCfg.bizLogo = bizLogo
  if (brandColor) rjfCfg.brandColor = brandColor

  // Brand override CSS — remaps the funnel's orange/blue CTA system to client colors
  const brandCss = brandColor ? `
  :root { --rj-client:${brandColor}; --rj-client-2:${accentColor}; }
  .pulse-glow, .bg-orange-500, [class*="bg-orange-5"] { background-color:${brandColor} !important; background-image:none !important; }
  .bg-orange-600, .hover\\:bg-orange-600:hover { background-color:${accentColor} !important; }
  .text-orange-400, .text-orange-500, .text-orange-300 { color:${brandColor} !important; }
  @keyframes pulseglow { 0%,100% { box-shadow:0 0 0 0 ${brandColor}99; } 50% { box-shadow:0 0 0 12px transparent; } }
  ::selection { background:${brandColor}; }
  input:focus,select:focus,textarea:focus { border-color:${brandColor} !important; box-shadow:0 0 0 3px ${brandColor}2e; }
  .rj-grad-text { background:linear-gradient(100deg,${brandColor} 10%,${accentColor} 50%,${brandColor} 90%); background-size:220% 100%; -webkit-background-clip:text; background-clip:text; }` : ''

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': opts.type || 'ProfessionalService',
    name: seoTitle,
    description: desc,
    image: ogImage,
    ...(canonical ? { url: canonical } : {}),
    areaServed: { '@type': 'State', name: 'New Mexico' },
    provider: {
      '@type': 'Organization',
      name: BRAND.name,
      url: BRAND.url,
      logo: { '@type': 'ImageObject', url: BRAND.logo },
      slogan: BRAND.tagline,
      address: { '@type': 'PostalAddress', streetAddress: '1342 NM 333', addressLocality: 'Tijeras', addressRegion: 'NM', postalCode: '87059', addressCountry: 'US' }
    }
  }
  const faqSchema = opts.faq && opts.faq.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: opts.faq.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  } : null

  // Dark theme: CSS override layer flips light Tailwind utilities to McKnight Navy
  // ── v2.0: McKnight brand layer — every funnel rendered in the McKnight
  // navy/gold/cyan system by default. Remaps the legacy orange CTA system
  // to McKnight Gold and hero gradients toward McKnight Navy. A client
  // white-label brandColor (below) still wins — it is injected after this.
  const mcknightCss = `
  :root { --mk-navy:#0a1628; --mk-deep:#050b16; --mk-gold:#d4a72c; --mk-gold-2:#f4ce65; --mk-blue:#2563eb; --mk-cyan:#0ea5e9; }
  .pulse-glow, .bg-orange-500, [class*="bg-orange-5"] { background-color:var(--mk-gold) !important; background-image:none !important; color:#0a1628 !important; }
  .bg-orange-600, .hover\\:bg-orange-600:hover, .hover\\:bg-orange-700:hover { background-color:var(--mk-gold-2) !important; color:#0a1628 !important; }
  .text-orange-400, .text-orange-500, .text-orange-300, .text-orange-600 { color:var(--mk-gold) !important; }
  .border-orange-500, .border-orange-400 { border-color:var(--mk-gold) !important; }
  [class*="from-gray-950"] { --tw-gradient-from:var(--mk-navy) var(--tw-gradient-from-position) !important; }
  [class*="via-zinc-900"], [class*="via-slate-900"], [class*="via-stone-900"] { --tw-gradient-via:#0d1b30 !important; }
  @keyframes pulseglow { 0%,100% { box-shadow:0 0 0 0 rgba(212,167,44,.55); } 50% { box-shadow:0 0 0 12px rgba(212,167,44,0); } }
  ::selection { background:var(--mk-gold); color:#0a1628; }
  .rj-aurora { background:radial-gradient(38% 45% at 22% 28%,rgba(30,58,138,.55) 0%,transparent 70%),radial-gradient(32% 40% at 78% 20%,rgba(14,165,233,.4) 0%,transparent 70%),radial-gradient(30% 42% at 60% 82%,rgba(212,167,44,.25) 0%,transparent 70%) !important; }
  .rj-grad-text { background:linear-gradient(100deg,#f4ce65 10%,#d4a72c 35%,#0ea5e9 60%,#f4ce65 90%); background-size:220% 100%; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
  .rj-glow-border::before { background:conic-gradient(from var(--rj-ang,0deg),rgba(212,167,44,0),rgba(212,167,44,.85),rgba(14,165,233,.9),rgba(30,58,138,.65),rgba(212,167,44,0)) !important; }`

  // ── v5.1 Brand theme CSS — remaps CTA/accent system to the funnel's brand
  // colors. Injected AFTER mcknightCss (so it wins over the flagship gold)
  // and BEFORE brandCss (so a client white-label brandColor still wins).
  const btnText = theme.darkText ? '#0a1628' : '#ffffff'
  const brandThemeCss = theme.key === 'growthos' ? '' : `
  :root { --mk-brand:${theme.color}; --mk-brand-2:${theme.color2}; }
  .pulse-glow, .bg-orange-500, [class*="bg-orange-5"] { background-color:${theme.color} !important; background-image:none !important; color:${btnText} !important; }
  .bg-orange-600, .hover\\:bg-orange-600:hover, .hover\\:bg-orange-700:hover { background-color:${theme.color2} !important; color:${btnText} !important; }
  .text-orange-400, .text-orange-500, .text-orange-300, .text-orange-600 { color:${theme.color2} !important; }
  .border-orange-500, .border-orange-400 { border-color:${theme.color} !important; }
  .text-amber-300, .text-amber-400, .text-amber-500, .bg-amber-500\\/20 { color:${theme.color2} !important; }
  @keyframes pulseglow { 0%,100% { box-shadow:0 0 0 0 ${theme.color}99; } 50% { box-shadow:0 0 0 12px transparent; } }
  ::selection { background:${theme.color}; color:${btnText}; }
  input:focus,select:focus,textarea:focus { border-color:${theme.color} !important; box-shadow:0 0 0 3px ${theme.color}2e !important; }
  .rj-aurora { background:radial-gradient(38% 45% at 22% 28%,${theme.color}52 0%,transparent 70%),radial-gradient(32% 40% at 78% 20%,${theme.color2}3d 0%,transparent 70%),radial-gradient(30% 42% at 60% 82%,rgba(30,58,138,.3) 0%,transparent 70%) !important; }
  .rj-grad-text { background:linear-gradient(100deg,${theme.color2} 10%,${theme.color} 40%,#0ea5e9 65%,${theme.color2} 90%); background-size:220% 100%; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
  .rj-glow-border::before { background:conic-gradient(from var(--rj-ang,0deg),${theme.color}00,${theme.color}d9,${theme.color2}e6,rgba(30,58,138,.65),${theme.color}00) !important; }
  ::-webkit-scrollbar-thumb { background:linear-gradient(${theme.color},${theme.color2}); }`

  const darkCss = dark ? `
  html[data-theme=dark] body{background:#0f172a!important;color:#e2e8f0!important}
  [data-theme=dark] .bg-white{background:#0f172a!important}
  [data-theme=dark] .bg-gray-50,[data-theme=dark] .bg-gray-100,[data-theme=dark] .bg-slate-50,[data-theme=dark] .bg-blue-50,[data-theme=dark] .bg-orange-50,[data-theme=dark] .bg-emerald-50,[data-theme=dark] .bg-red-50,[data-theme=dark] .bg-amber-50,[data-theme=dark] .bg-purple-50,[data-theme=dark] .bg-pink-50,[data-theme=dark] .bg-cyan-50,[data-theme=dark] .bg-teal-50,[data-theme=dark] .bg-indigo-50,[data-theme=dark] .bg-yellow-50{background:#0b1226!important}
  [data-theme=dark] .text-gray-900,[data-theme=dark] .text-gray-800{color:#f1f5f9!important}
  [data-theme=dark] .text-gray-700,[data-theme=dark] .text-gray-600{color:#cbd5e1!important}
  [data-theme=dark] .border-gray-100,[data-theme=dark] .border-gray-200,[data-theme=dark] .border-gray-300{border-color:#1e3a8a55!important}
  [data-theme=dark] .shadow-lg,[data-theme=dark] .shadow-xl,[data-theme=dark] .shadow-md{box-shadow:0 10px 30px rgba(0,0,0,.5)!important}
  [data-theme=dark] input,[data-theme=dark] select,[data-theme=dark] textarea{background:#111c36!important;color:#e2e8f0!important;border-color:#1e3a8a!important}` : ''

  return `<!DOCTYPE html>
<html lang="en"${dark ? ' data-theme="dark"' : ''}>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${seoTitle}</title>
<meta name="description" content="${desc}">
${keywords ? `<meta name="keywords" content="${keywords}">` : ''}
<meta name="robots" content="${noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large'}">
<meta name="theme-color" content="${dark ? '#000B26' : '#003399'}">
<meta name="geo.region" content="${BRAND.region}">
<meta name="geo.placename" content="${BRAND.placename}">
<meta name="geo.position" content="${BRAND.geo}">
<meta name="ICBM" content="35.0620, -106.3861">
<meta name="author" content="${BRAND.name}">
<meta property="og:locale" content="en_US">
${canonical ? `<link rel="canonical" href="${canonical}">` : ''}
<meta property="og:type" content="website">
<meta property="og:title" content="${seoTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImage}">
${canonical ? `<meta property="og:url" content="${canonical}">` : ''}
<meta property="og:site_name" content="McKnight GrowthOS">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${seoTitle}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${ogImage}">
<meta name="twitter:site" content="@ricksolutions1">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
${faqSchema ? `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>` : ''}
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
<link rel="apple-touch-icon" href="${BRAND.logo}">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800;900&family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  /* ── McKnight GrowthOS Design System v1.0 — luxury glassmorphism 3.0 + kinetic motion ── */
  :root { --rj-royal:#003399; --rj-royal-deep:#002266; --rj-navy-black:#000B26; --rj-blue:#2563eb; --rj-cyan:#0ea5e9; --rj-gold:#F59E0B; }
  html { scroll-behavior:smooth; }
  body { font-family:'Inter',sans-serif; -webkit-font-smoothing:antialiased; text-rendering:optimizeLegibility; overflow-x:hidden; }
  h1 { font-family:'Playfair Display',Georgia,serif; letter-spacing:-0.02em; }
  h2,h3,h4 { font-family:'Poppins',sans-serif; letter-spacing:-0.02em; }
  ::selection { background:var(--rj-royal); color:#fff; }
  ::-webkit-scrollbar { width:10px; }
  ::-webkit-scrollbar-thumb { background:linear-gradient(var(--rj-royal),var(--rj-cyan)); border-radius:6px; }
  ::-webkit-scrollbar-track { background:transparent; }

  /* shadcn-style focus rings + input polish */
  a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible { outline:2px solid #0ea5e9; outline-offset:2px; border-radius:8px; }
  input,select,textarea { transition:border-color .2s ease,box-shadow .2s ease,background-color .2s ease; }
  input:focus,select:focus,textarea:focus { border-color:#0ea5e9 !important; box-shadow:0 0 0 3px rgba(14,165,233,.18); outline:none; }

  /* buttons — spring lift + shine sweep */
  a,button { transition:transform .25s cubic-bezier(.22,1,.36,1),box-shadow .3s ease,background-color .2s ease,color .2s ease,border-color .2s ease,opacity .2s ease; }
  .pulse-glow { position:relative; overflow:hidden; animation:pulseglow 2s infinite; will-change:transform; }
  .pulse-glow:hover { transform:translateY(-3px) scale(1.02); }
  .pulse-glow:active { transform:translateY(-1px) scale(.99); }
  .pulse-glow::after { content:''; position:absolute; top:0; left:-80%; width:55%; height:100%; background:linear-gradient(105deg,transparent,rgba(255,255,255,.35),transparent); transform:skewX(-20deg); animation:shine 3.4s ease-in-out infinite; pointer-events:none; }
  @keyframes shine { 0%,55% { left:-80%; } 100% { left:135%; } }
  @keyframes pulseglow { 0%,100% { box-shadow:0 0 0 0 rgba(249,115,22,.6);} 50% { box-shadow:0 0 0 12px rgba(249,115,22,0);} }

  /* Glassmorphism 3.0 — liquid-glass spec */
  .glass { background:linear-gradient(135deg,rgba(255,255,255,.62) 0%,rgba(255,255,255,.42) 50%,rgba(255,255,255,.58) 100%); backdrop-filter:blur(20px) saturate(180%); -webkit-backdrop-filter:blur(20px) saturate(180%); border:1px solid rgba(255,255,255,.45); box-shadow:0 8px 32px rgba(0,11,38,.12), inset 0 0 0 1px rgba(255,255,255,.1); }
  .glass-dark { background:linear-gradient(135deg,rgba(255,255,255,.1) 0%,rgba(255,255,255,.05) 50%,rgba(255,255,255,.1) 100%), rgba(0,11,38,.55); backdrop-filter:blur(20px) saturate(180%); -webkit-backdrop-filter:blur(20px) saturate(180%); border:1px solid rgba(255,255,255,.18); box-shadow:0 8px 32px rgba(0,0,0,.12), inset 0 0 0 1px rgba(255,255,255,.1); }

  /* Aurora ambient layer (injected into hero by motion.js) */
  .rj-aurora { position:absolute; inset:-20%; pointer-events:none; z-index:0; opacity:.5; background:radial-gradient(38% 45% at 22% 28%,rgba(0,51,153,.55) 0%,transparent 70%),radial-gradient(32% 40% at 78% 20%,rgba(14,165,233,.4) 0%,transparent 70%),radial-gradient(30% 42% at 60% 82%,rgba(245,158,11,.22) 0%,transparent 70%); filter:blur(50px); animation:aurora 22s ease-in-out infinite alternate; }
  @keyframes aurora { 0% { transform:translate(0,0) rotate(0deg) scale(1); } 100% { transform:translate(4%,-5%) rotate(6deg) scale(1.12); } }

  /* Kinetic hero typography (chars tagged by motion.js) */
  .rj-kinetic .rj-ch { display:inline-block; opacity:0; transform:translateY(.55em) rotate(3deg); animation:chIn .7s cubic-bezier(.16,1,.3,1) forwards; animation-delay:var(--ch-d,0ms); }
  @keyframes chIn { to { opacity:1; transform:none; } }

  /* Magnetic buttons (behavior via motion.js) */
  .rj-magnetic { will-change:transform; }

  /* ── v2.5 PREMIUM PACK ── */
  /* 3D tilt cards (behavior via motion.js) */
  .rj-tilt { transform-style:preserve-3d; transition:transform .3s cubic-bezier(.22,1,.36,1), box-shadow .3s ease; }

  /* Conic border glow — rotating gradient ring on hero glass cards */
  .rj-glow-border { position:relative; }
  .rj-glow-border::before { content:''; position:absolute; inset:-1.5px; border-radius:inherit; padding:1.5px; background:conic-gradient(from var(--rj-ang,0deg),rgba(14,165,233,0),rgba(14,165,233,.85),rgba(0,51,153,.9),rgba(245,158,11,.65),rgba(14,165,233,0)); -webkit-mask:linear-gradient(#fff 0 0) content-box,linear-gradient(#fff 0 0); -webkit-mask-composite:xor; mask-composite:exclude; animation:rjSpin 5s linear infinite; pointer-events:none; }
  @property --rj-ang { syntax:'<angle>'; initial-value:0deg; inherits:false; }
  @keyframes rjSpin { to { --rj-ang:360deg; } }
  @supports not (background:conic-gradient(from var(--rj-ang,0deg),#000,#fff)) { .rj-glow-border::before { animation:none; opacity:.55; } }

  /* Animated gradient text — for stat numbers + key headline words */
  .rj-grad-text { background:linear-gradient(100deg,#60a5fa 10%,#0ea5e9 35%,#93c5fd 55%,#0ea5e9 75%,#60a5fa 90%); background-size:220% 100%; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; animation:rjGradSlide 5s ease-in-out infinite; }
  @keyframes rjGradSlide { 0%,100% { background-position:0% 0; } 50% { background-position:100% 0; } }

  /* Blur-in reveal variant — sections drift in from soft focus */
  .mo-reveal.rj-blur { filter:blur(10px); }
  .mo-reveal.rj-blur.mo-in { filter:blur(0); transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1),filter .8s ease; transition-delay:var(--mo-delay,0ms); }

  /* Shimmer skeleton for images while loading */
  img[loading=lazy] { background:linear-gradient(100deg,rgba(148,163,184,.08) 40%,rgba(148,163,184,.22) 50%,rgba(148,163,184,.08) 60%); background-size:200% 100%; animation:rjShimmer 1.6s linear infinite; }
  @keyframes rjShimmer { to { background-position:-200% 0; } }

  /* Marquee (logo strips / social proof rows tagged by motion.js) */
  .rj-marquee { display:flex; gap:2.5rem; width:max-content; animation:rjMarquee 26s linear infinite; }
  .rj-marquee:hover { animation-play-state:paused; }
  @keyframes rjMarquee { to { transform:translateX(-50%); } }

  @media (prefers-reduced-motion:reduce) {
    .rj-glow-border::before,.rj-grad-text,.rj-marquee,img[loading=lazy] { animation:none; }
    .rj-tilt { transform:none !important; }
    .mo-reveal.rj-blur { filter:none; }
  }

  /* framer-style scroll reveal (elements tagged by motion.js) */
  .mo-reveal { opacity:0; transform:translateY(26px) scale(.985); transition:opacity .75s cubic-bezier(.16,1,.3,1),transform .75s cubic-bezier(.16,1,.3,1); transition-delay:var(--mo-delay,0ms); will-change:opacity,transform; }
  .mo-reveal.mo-in { opacity:1; transform:none; }

  /* hover-lift cards (tagged by motion.js) */
  .mo-lift { transition:transform .35s cubic-bezier(.22,1,.36,1),box-shadow .35s ease; }
  .mo-lift:hover { transform:translateY(-5px); box-shadow:0 22px 55px -14px rgba(37,99,235,.28) !important; }

  /* ambient gradient blobs (injected into hero by motion.js) */
  .mo-blob { position:absolute; border-radius:9999px; filter:blur(75px); opacity:.45; pointer-events:none; animation:blobFloat 16s ease-in-out infinite alternate; z-index:0; }
  @keyframes blobFloat { 0% { transform:translate(0,0) scale(1); } 100% { transform:translate(46px,-34px) scale(1.18); } }

  /* icon micro-animations */
  i.fas,i.far,i.fab { transition:transform .3s cubic-bezier(.34,1.56,.64,1); display:inline-block; }
  a:hover > i,button:hover > i { transform:translateX(4px) scale(1.08); }
  .mo-lift:hover i.fas:first-of-type,.mo-lift:hover i.far:first-of-type { transform:scale(1.18) rotate(-5deg); }

  /* numerals + countdowns */
  [data-countdown] { font-variant-numeric:tabular-nums; }

  @media (prefers-reduced-motion:reduce) {
    html { scroll-behavior:auto; }
    .mo-reveal { opacity:1; transform:none; transition:none; }
    .mo-lift,.mo-lift:hover { transform:none; }
    .mo-blob,.pulse-glow,.pulse-glow::after,.rj-aurora { animation:none; }
    .rj-kinetic .rj-ch { opacity:1; transform:none; animation:none; }
    a,button,i.fas,i.far,i.fab { transition:none; }
  }${mcknightCss}${brandThemeCss}${darkCss}${brandCss}
</style>
<script defer src="/static/motion.js"></script>
<script>window.__RJF=${JSON.stringify(rjfCfg)}</script>
<script defer src="/static/funnel-extras.js"></script>
${gtm ? `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s);j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');</script>` : ''}
${ga4 ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${ga4}"></script>
<script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga4}');</script>` : ''}
${metaPixel ? `<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${metaPixel}');fbq('track','PageView');</script>` : ''}
${ttPixel ? `<script>!function(w,d,t){w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];ttq.methods=['page','track','identify','instances','debug','on','off','once','ready','alias','group','enableCookie','disableCookie'];ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);ttq.load=function(e){var i='https://analytics.tiktok.com/i18n/pixel/events.js';ttq._i=ttq._i||{};ttq._i[e]=[];ttq._i[e]._u=i;ttq._t=ttq._t||{};ttq._t[e]=+new Date;ttq._o=ttq._o||{};ttq._o[e]={};var o=document.createElement('script');o.type='text/javascript';o.async=!0;o.src=i+'?sdkid='+e+'&lib='+t;var a=document.getElementsByTagName('script')[0];a.parentNode.insertBefore(o,a)};ttq.load('${ttPixel}');ttq.page();}(window,document,'ttq');</script>` : ''}
</head>`
}

export const templateBadge = `
<aside class="fixed bottom-4 right-4 z-50 glass-dark text-white text-xs px-3.5 py-2.5 rounded-xl shadow-2xl max-w-xs">
  <p><i class="fas fa-wand-magic-sparkles text-cyan-400 mr-1"></i><strong>Live Template</strong> — customize via <a href="/builder" class="text-cyan-400 underline">Builder</a>. Attorney review required before launch.</p>
</aside>`
