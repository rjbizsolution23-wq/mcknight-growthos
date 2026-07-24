// Shared app shell — McKnight GrowthOS
// AI-Powered Conversion and Revenue Operations Platform
// Parent: McKnight Opportunity Group · Powered by RJ Business Solutions
export const shell = (title: string, active: string, content: string, extraHead = '') => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | McKnight GrowthOS</title>
<meta name="description" content="McKnight GrowthOS connects conversion-focused funnels, lead management, email and SMS follow-up, SEO intelligence, social content and performance analytics—so businesses can capture more opportunities and move the right leads forward.">
<meta property="og:type" content="website">
<meta property="og:site_name" content="McKnight GrowthOS">
<meta property="og:title" content="${title} | McKnight GrowthOS">
<meta property="og:description" content="AI-powered conversion and revenue operations platform: funnels, CRM, follow-up, SEO, social content, compliance controls and growth analytics in one system.">
<meta property="og:url" content="https://mcknight-growthos.pages.dev">
<meta property="og:image" content="/static/logo.svg">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${title} | McKnight GrowthOS">
<meta name="twitter:description" content="Turn attention into pipeline—and pipeline into growth.">
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
<link rel="apple-touch-icon" href="/static/logo.svg">
<meta name="theme-color" content="#0a1628">
<meta name="geo.region" content="US-NM">
<meta name="geo.placename" content="Tijeras, New Mexico">
<meta name="geo.position" content="35.0620;-106.3861">
<meta name="ICBM" content="35.0620, -106.3861">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"SoftwareApplication","name":"McKnight GrowthOS","applicationCategory":"BusinessApplication","operatingSystem":"Web","description":"AI-Powered Conversion and Revenue Operations Platform — funnels, CRM, follow-up, SEO intelligence, social content, compliance controls and growth analytics.","publisher":{"@type":"Organization","name":"McKnight Opportunity Group","address":{"@type":"PostalAddress","streetAddress":"1342 NM 333","addressLocality":"Tijeras","addressRegion":"NM","postalCode":"87059","addressCountry":"US"}},"provider":{"@type":"Organization","name":"RJ Business Solutions","url":"https://rjbusinesssolutions.org"},"slogan":"Turn attention into pipeline—and pipeline into growth."}</script>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet">
<script>
tailwind.config = {
  theme: { extend: {
    fontFamily: { heading: ['Space Grotesk','Poppins','sans-serif'], body: ['Inter','sans-serif'], mono: ['Space Grotesk','monospace'] },
    colors: {
      brand: { cyan:'#0ea5e9', pink:'#2563eb', gold:'#d4a72c', dark:'#0a1628', success:'#10b981', warn:'#f59e0b', danger:'#ef4444' },
      mk: { navy:'#0a1628', deep:'#050b16', gold:'#d4a72c', goldLight:'#f4ce65', blue:'#2563eb', cyan:'#0ea5e9', indigo:'#4f46e5', soft:'#f8fafc', muted:'#dbeafe', success:'#10b981', warning:'#f59e0b', danger:'#ef4444', text:'#0f172a', mutedText:'#64748b' }
    }
  }}
}
</script>
<style>
  :root {
    --mcknight-navy:#0a1628; --mcknight-deep-navy:#050b16;
    --mcknight-gold:#d4a72c; --mcknight-gold-light:#f4ce65;
    --growth-blue:#2563eb; --growth-cyan:#0ea5e9; --growth-indigo:#4f46e5;
  }
  body { font-family:'Inter',sans-serif; background:#0a1628; color:#e5e7eb; }
  h1,h2,h3,h4 { font-family:'Space Grotesk','Poppins',sans-serif; }
  .grad-text { background:linear-gradient(135deg,#2563eb,#0ea5e9); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .gold-text { background:linear-gradient(135deg,#d4a72c,#f4ce65); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .grad-bg { background:linear-gradient(135deg,#0a1628 0%,#1e3a8a 48%,#0ea5e9 100%); }
  .gold-bg { background:linear-gradient(135deg,#d4a72c 0%,#f4ce65 100%); }
  .card { background:#0d1b30; border:1px solid #1e3a8a55; border-radius:1rem; transition:transform .3s cubic-bezier(.22,1,.36,1),border-color .25s ease,box-shadow .3s ease; }
  .card:hover { border-color:#0ea5e9; transform:translateY(-3px); box-shadow:0 18px 45px -16px rgba(14,165,233,.25); }
  .glass-dark { background:rgba(6,12,26,.55); backdrop-filter:blur(18px) saturate(150%); -webkit-backdrop-filter:blur(18px) saturate(150%); border:1px solid rgba(255,255,255,.12); }
  a,button { transition:transform .25s cubic-bezier(.22,1,.36,1),background-color .2s ease,color .2s ease,border-color .2s ease,opacity .2s ease; }
  a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible { outline:2px solid #0ea5e9; outline-offset:2px; border-radius:8px; }
  input:focus,select:focus,textarea:focus { border-color:#0ea5e9 !important; box-shadow:0 0 0 3px rgba(14,165,233,.18); outline:none; }
  ::selection { background:#2563eb; color:#fff; }
  .mo-reveal { opacity:0; transform:translateY(22px); transition:opacity .7s cubic-bezier(.16,1,.3,1),transform .7s cubic-bezier(.16,1,.3,1); transition-delay:var(--mo-delay,0ms); }
  .mo-reveal.mo-in { opacity:1; transform:none; }
  @media (prefers-reduced-motion:reduce) { .mo-reveal { opacity:1; transform:none; transition:none; } .card,.card:hover,a,button { transition:none; transform:none; } }
  .copy-block { position:relative; }
  .copy-btn { position:absolute; top:.5rem; right:.5rem; }
  pre { white-space:pre-wrap; word-break:break-word; }
  ::-webkit-scrollbar { width:8px; height:8px; }
  ::-webkit-scrollbar-thumb { background:#1f2937; border-radius:4px; }
</style>
${extraHead}
</head>
<body class="min-h-screen">
<div id="announce-bar" class="gold-bg text-[#0a1628] text-center text-xs font-semibold px-4 py-1.5">
  McKnight GrowthOS — AI funnels, CRM, follow-up, compliance controls and conversion intelligence in one platform.
</div>
<header id="main-nav" class="sticky top-0 z-50 bg-[#0a1628]/90 backdrop-blur border-b border-blue-900/50">
  <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
    <a href="/" class="flex items-center gap-2.5">
      <img src="/static/logo.svg" alt="McKnight GrowthOS logo" class="w-9 h-9 rounded-lg">
      <span class="font-heading font-bold text-white text-lg leading-tight">McKNIGHT <span class="grad-text">Growth</span><span class="gold-text">OS</span></span>
    </a>
    <div class="flex items-center gap-1 text-sm flex-wrap">
      ${[
        ['/', 'Growth Command Center', 'dashboard'],
        ['/events', 'Event Growth', 'events'],
        ['/tax', 'Tax Growth', 'tax'],
        ['/credit', 'Credit Growth', 'credit'],
        ['/ecosystem', 'Ecosystem', 'ecosystem'],
        ['/passport', 'Passport', 'passport'],
        ['/builder', 'Funnel Studio', 'builder'],
        ['/leads', 'LeadFlow CRM', 'leads'],
        ['/emails', 'Campaign Vault', 'emails'],
        ['/compliance', 'Compliance Guard', 'compliance'],
        ['/seo', 'SEO Intelligence', 'seo'],
        ['/agents', 'AI Agents', 'agents'],
        ['/mailer', 'Mail Command', 'mailer'],
        ['/analytics', 'Analytics', 'analytics'],
        ['/integrations', 'Integration Hub', 'integrations'],
        ['/brand', 'Brand Control Center', 'brand'],
      ].map(([href, label, key]) =>
        `<a href="${href}" class="px-3 py-1.5 rounded-lg ${active === key ? 'grad-bg text-white font-semibold' : 'text-gray-300 hover:text-white hover:bg-gray-800'}">${label}</a>`
      ).join('')}
    </div>
  </nav>
</header>
<main class="max-w-7xl mx-auto px-4 py-8">
${content}
</main>
<footer class="border-t border-blue-900/50 mt-16">
  <div class="max-w-7xl mx-auto px-4 py-10 text-sm text-gray-400">
    <div class="flex flex-wrap items-start justify-between gap-8 mb-8">
      <div class="max-w-sm">
        <div class="flex items-center gap-3 mb-3">
          <img src="/static/logo.svg" alt="McKnight GrowthOS logo" class="w-10 h-10 rounded-lg">
          <div>
            <p class="font-heading font-bold text-white text-base leading-tight">McKNIGHT Growth<span class="gold-text">OS</span></p>
            <p class="text-[10px] text-gray-500">AI-Powered Conversion &amp; Revenue Operations Platform</p>
          </div>
        </div>
        <p class="text-xs text-gray-500 mb-3">Turn attention into pipeline—and pipeline into growth. One connected system for capturing demand, qualifying leads, automating follow-up and improving conversion performance.</p>
        <p class="text-xs">A McKnight Opportunity Group platform · 1342 NM 333, Tijeras, New Mexico 87059</p>
      </div>
      <div>
        <p class="font-semibold text-white text-xs uppercase tracking-wide mb-3">Platform</p>
        <ul class="space-y-1.5 text-xs">
          <li><a href="/ecosystem" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-sitemap mr-2 text-blue-500"></i>McKnight Ecosystem</a></li>
          <li><a href="/passport" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-passport mr-2 text-blue-500"></i>Readiness Passport</a></li>
          <li><a href="/builder" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-hammer mr-2 text-blue-500"></i>Funnel Studio</a></li>
          <li><a href="/leads" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-inbox mr-2 text-blue-500"></i>LeadFlow CRM</a></li>
          <li><a href="/emails" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-envelope mr-2 text-blue-500"></i>Campaign Vault</a></li>
          <li><a href="/compliance" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-shield-halved mr-2 text-blue-500"></i>Compliance Guard</a></li>
          <li><a href="/seo" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-magnifying-glass-chart mr-2 text-blue-500"></i>SEO Intelligence</a></li>
          <li><a href="/agents" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-robot mr-2 text-blue-500"></i>AI Agent Command</a></li>
          <li><a href="/mailer" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-paper-plane mr-2 text-blue-500"></i>Mail Command</a></li>
          <li><a href="/analytics" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-chart-line mr-2 text-blue-500"></i>Funnel Analytics</a></li>
          <li><a href="/integrations" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-plug mr-2 text-blue-500"></i>Integration Hub</a></li>
        </ul>
      </div>
      <div>
        <p class="font-semibold text-white text-xs uppercase tracking-wide mb-3">Technology</p>
        <ul class="space-y-1.5 text-xs">
          <li class="text-gray-400"><i class="fas fa-microchip mr-2 text-mk-gold"></i>Powered by RJ Business Solutions</li>
          <li><a href="https://rjbusinesssolutions.org" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-globe mr-2 text-blue-500"></i>rjbusinesssolutions.org</a></li>
          <li><a href="mailto:support@rjbusinesssolutions.org" class="hover:text-mk-cyan text-gray-400"><i class="fas fa-envelope mr-2 text-blue-500"></i>support@rjbusinesssolutions.org</a></li>
          <li><a href="https://www.linkedin.com/in/rick-jefferson-314998235" class="hover:text-mk-cyan text-gray-400"><i class="fab fa-linkedin mr-2 text-blue-500"></i>LinkedIn</a></li>
        </ul>
      </div>
      <p class="text-xs max-w-xs text-gray-500">McKnight GrowthOS provides marketing, workflow and decision-support technology. Templates, disclosures and compliance tools are provided for operational support and do not constitute legal, tax, financial or regulatory advice. Customers remain responsible for professional review, licensing, consent management, advertising approval and compliance with applicable laws.</p>
    </div>
    <div class="border-t border-blue-900/40 pt-5 flex flex-wrap justify-between gap-3 text-xs text-gray-500">
      <p>© 2026 McKnight Opportunity Group. All rights reserved. · Powered by RJ Business Solutions</p>
      <p>Privacy Policy · Terms of Service · Refund Policy · Accessibility</p>
    </div>
  </div>
</footer>
<script src="/static/app.js"></script>
<script>
// Growth Command Center scroll reveal (lightweight)
(() => {
  const els = []
  document.querySelectorAll('main section, main .card').forEach((el, i) => {
    el.classList.add('mo-reveal'); el.style.setProperty('--mo-delay', Math.min((i % 8) * 55, 380) + 'ms'); els.push(el)
  })
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('mo-in'); io.unobserve(e.target) } }), { threshold: .08, rootMargin: '0px 0px -6% 0px' })
    els.forEach(el => io.observe(el))
    requestAnimationFrame(() => els.forEach(el => { if (el.getBoundingClientRect().top < innerHeight) el.classList.add('mo-in') }))
  } else els.forEach(el => el.classList.add('mo-in'))
})()
</script>
</body>
</html>`

// Copy-block helper — renders a pre block with a copy button
export const copyBlock = (id: string, label: string, text: string) => `
<article class="copy-block card p-4 mb-4" id="${id}">
  <div class="flex items-center justify-between mb-2">
    <h4 class="font-semibold text-white text-sm"><i class="fas fa-file-lines text-brand-cyan mr-2"></i>${label}</h4>
    <button class="copy-btn-inline bg-gray-800 hover:bg-brand-cyan hover:text-white text-gray-300 text-xs px-3 py-1.5 rounded-lg" data-copy-target="${id}-text"><i class="far fa-copy mr-1"></i>Copy</button>
  </div>
  <pre id="${id}-text" class="text-xs text-gray-300 bg-[#060a14] rounded-lg p-3 max-h-72 overflow-y-auto">${text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}</pre>
</article>`
