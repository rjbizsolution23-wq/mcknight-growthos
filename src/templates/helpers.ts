// Template helpers — shared by all live funnel templates
export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

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
  const desc = param(q, 'seoDesc', opts.desc || (title + ' — high-converting funnel built on the RJ Business Solutions Supreme Funnel System.'))
  const keywords = param(q, 'seoKeywords', '')
  const canonical = param(q, 'canonical', '')
  const ogImage = param(q, 'ogImage', 'https://storage.googleapis.com/msgsndr/qQnxRHDtyx0uydPd5sRl/media/67eb83c5e519ed689430646b.jpeg')
  const dark = (q.theme || '').toLowerCase() === 'dark'
  const noindex = q.noindex === '1'

  const schema: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': opts.type || 'ProfessionalService',
    name: seoTitle,
    description: desc,
    image: ogImage,
    ...(canonical ? { url: canonical } : {}),
    provider: { '@type': 'Organization', name: 'RJ Business Solutions', url: 'https://rjbusinesssolutions.org' }
  }
  const faqSchema = opts.faq && opts.faq.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: opts.faq.map(f => ({
      '@type': 'Question', name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  } : null

  // Dark theme: CSS override layer flips light Tailwind utilities to RJ Navy
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
${canonical ? `<link rel="canonical" href="${canonical}">` : ''}
<meta property="og:type" content="website">
<meta property="og:title" content="${seoTitle}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="${ogImage}">
${canonical ? `<meta property="og:url" content="${canonical}">` : ''}
<meta property="og:site_name" content="RJ Business Solutions">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${seoTitle}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="${ogImage}">
<meta name="twitter:site" content="@ricksolutions1">
<script type="application/ld+json">${JSON.stringify(schema)}</script>
${faqSchema ? `<script type="application/ld+json">${JSON.stringify(faqSchema)}</script>` : ''}
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  body { font-family:'Inter',sans-serif; }
  h1,h2,h3,h4 { font-family:'Poppins',sans-serif; }
  .pulse-glow { animation: pulseglow 2s infinite; }
  @keyframes pulseglow { 0%,100% { box-shadow:0 0 0 0 rgba(249,115,22,.6);} 50% { box-shadow:0 0 0 12px rgba(249,115,22,0);} }${darkCss}
</style>
</head>`
}

export const templateBadge = `
<aside class="fixed bottom-4 right-4 z-50 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-gray-700 max-w-xs">
  <p><i class="fas fa-wand-magic-sparkles text-cyan-400 mr-1"></i><strong>Live Template</strong> — customize via <a href="/builder" class="text-cyan-400 underline">Builder</a>. Attorney review required before launch.</p>
</aside>`
