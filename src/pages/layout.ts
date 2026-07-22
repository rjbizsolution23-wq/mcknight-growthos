// Shared app shell — RJ Funnel Command Center
export const shell = (title: string, active: string, content: string, extraHead = '') => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | RJ Funnel Command Center</title>
<meta name="description" content="RJ Business Solutions builds AI-powered automation, credit technology, funnels, client portals, CRM workflows, and growth systems for businesses ready to scale.">
<meta property="og:type" content="website">
<meta property="og:site_name" content="RJ Business Solutions">
<meta property="og:title" content="${title} | RJ Funnel Command Center">
<meta property="og:description" content="AI-powered automation, credit technology, funnels, client portals, CRM workflows, and growth systems for businesses ready to scale.">
<meta property="og:url" content="https://rjbusinesssolutions.org">
<meta property="og:image" content="https://storage.googleapis.com/msgsndr/qQnxRHDtyx0uydPd5sRl/media/67eb83c5e519ed689430646b.jpeg">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title} | RJ Funnel Command Center">
<meta name="twitter:description" content="AI-powered automation, credit technology, funnels, and growth systems for businesses ready to scale.">
<meta name="twitter:image" content="https://storage.googleapis.com/msgsndr/qQnxRHDtyx0uydPd5sRl/media/67eb83c5e519ed689430646b.jpeg">
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
<link rel="apple-touch-icon" href="https://storage.googleapis.com/msgsndr/qQnxRHDtyx0uydPd5sRl/media/67eb83c5e519ed689430646b.jpeg">
<meta name="theme-color" content="#003399">
<meta name="geo.region" content="US-NM">
<meta name="geo.placename" content="Tijeras, New Mexico">
<meta name="geo.position" content="35.0620;-106.3861">
<meta name="ICBM" content="35.0620, -106.3861">
<script type="application/ld+json">{"@context":"https://schema.org","@type":"Organization","name":"RJ Business Solutions","legalName":"RJ Business Solutions","url":"https://rjbusinesssolutions.org","logo":"https://storage.googleapis.com/msgsndr/qQnxRHDtyx0uydPd5sRl/media/67eb83c5e519ed689430646b.jpeg","email":"support@rjbusinesssolutions.org","founder":{"@type":"Person","name":"Rick Jefferson","url":"https://www.linkedin.com/in/rick-jefferson-314998235"},"address":{"@type":"PostalAddress","streetAddress":"1342 NM 333","addressLocality":"Tijeras","addressRegion":"NM","postalCode":"87059","addressCountry":"US"},"sameAs":["https://www.linkedin.com/in/rick-jefferson-314998235","https://www.tiktok.com/@rick_jeff_solution","https://twitter.com/ricksolutions1"],"contactPoint":{"@type":"ContactPoint","contactType":"Customer Support","email":"support@rjbusinesssolutions.org"}}</script>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet">
<script>
tailwind.config = {
  theme: { extend: {
    fontFamily: { heading: ['Space Grotesk','Poppins','sans-serif'], body: ['Inter','sans-serif'], mono: ['Space Grotesk','monospace'] },
    colors: { brand: { cyan:'#0ea5e9', pink:'#2563eb', dark:'#0f172a', success:'#10b981', warn:'#f59e0b', danger:'#ef4444' }, rj: { blue:'#2563eb', sky:'#0ea5e9', deep:'#1e3a8a', navy:'#0f172a', soft:'#f8fafc', light:'#eff6ff', border:'#bfdbfe', muted:'#dbeafe', success:'#10b981', warning:'#f59e0b', danger:'#ef4444', text:'#0f172a', mutedText:'#475569' } }
  }}
}
</script>
<style>
  body { font-family:'Inter',sans-serif; background:#0f172a; color:#e5e7eb; }
  h1,h2,h3,h4 { font-family:'Space Grotesk','Poppins',sans-serif; }
  .grad-text { background:linear-gradient(135deg,#2563eb,#0ea5e9); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .grad-bg { background:linear-gradient(135deg,#2563eb 0%,#0ea5e9 100%); }
  .card { background:#0b1226; border:1px solid #1e3a8a55; border-radius:1rem; transition:transform .3s cubic-bezier(.22,1,.36,1),border-color .25s ease,box-shadow .3s ease; }
  .card:hover { border-color:#0ea5e9; transform:translateY(-3px); box-shadow:0 18px 45px -16px rgba(14,165,233,.25); }
  .glass-dark { background:rgba(8,14,30,.55); backdrop-filter:blur(18px) saturate(150%); -webkit-backdrop-filter:blur(18px) saturate(150%); border:1px solid rgba(255,255,255,.12); }
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
<header id="main-nav" class="sticky top-0 z-50 bg-[#0f172a]/90 backdrop-blur border-b border-blue-900/50">
  <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
    <a href="/" class="flex items-center gap-2">
      <img src="https://storage.googleapis.com/msgsndr/qQnxRHDtyx0uydPd5sRl/media/67eb83c5e519ed689430646b.jpeg" alt="RJ Business Solutions logo" class="w-9 h-9 rounded-lg object-cover border border-blue-800">
      <span class="font-heading font-bold text-white text-lg">RJ <span class="grad-text">Funnel Command Center</span></span>
    </a>
    <div class="flex items-center gap-1 text-sm flex-wrap">
      ${[
        ['/', 'Dashboard', 'dashboard'],
        ['/events', 'Events & Sponsors', 'events'],
        ['/tax', 'Tax', 'tax'],
        ['/credit', 'Credit Repair', 'credit'],
        ['/builder', 'Builder', 'builder'],
        ['/leads', 'Lead Inbox', 'leads'],
        ['/emails', 'Email Vault', 'emails'],
        ['/compliance', 'Compliance Vault', 'compliance'],
        ['/seo', 'SEO Engine', 'seo'],
        ['/integrations', 'Integrations', 'integrations'],
        ['/brand', 'Brand Kit', 'brand'],
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
          <img src="https://storage.googleapis.com/msgsndr/qQnxRHDtyx0uydPd5sRl/media/67eb83c5e519ed689430646b.jpeg" alt="RJ Business Solutions logo" class="w-10 h-10 rounded-lg object-cover border border-blue-800">
          <p class="font-heading font-bold text-white text-base">RJ Business Solutions</p>
        </div>
        <p class="text-xs text-gray-500 mb-3">AI-powered systems, automation, and growth infrastructure for businesses ready to scale.</p>
        <p class="text-xs">1342 NM 333, Tijeras, New Mexico 87059</p>
      </div>
      <div>
        <p class="font-semibold text-white text-xs uppercase tracking-wide mb-3">Connect</p>
        <ul class="space-y-1.5 text-xs">
          <li><a href="https://rjbusinesssolutions.org" class="hover:text-rj-sky text-gray-400"><i class="fas fa-globe mr-2 text-blue-500"></i>rjbusinesssolutions.org</a></li>
          <li><a href="mailto:support@rjbusinesssolutions.org" class="hover:text-rj-sky text-gray-400"><i class="fas fa-envelope mr-2 text-blue-500"></i>support@rjbusinesssolutions.org</a></li>
          <li><a href="https://www.linkedin.com/in/rick-jefferson-314998235" class="hover:text-rj-sky text-gray-400"><i class="fab fa-linkedin mr-2 text-blue-500"></i>LinkedIn</a></li>
          <li><a href="https://www.tiktok.com/@rick_jeff_solution" class="hover:text-rj-sky text-gray-400"><i class="fab fa-tiktok mr-2 text-blue-500"></i>TikTok</a></li>
          <li><a href="https://twitter.com/ricksolutions1" class="hover:text-rj-sky text-gray-400"><i class="fab fa-x-twitter mr-2 text-blue-500"></i>Twitter/X</a></li>
        </ul>
      </div>
      <p class="text-xs max-w-xs text-gray-500">All templates are compliance-engineered but require review by a licensed attorney in your state before launch. Not legal advice.</p>
    </div>
    <div class="border-t border-blue-900/40 pt-5 flex flex-wrap justify-between gap-3 text-xs text-gray-500">
      <p>© 2026 RJ Business Solutions. All rights reserved.</p>
      <p>Privacy Policy · Terms of Service · Refund Policy · Accessibility</p>
    </div>
  </div>
</footer>
<script src="/static/app.js"></script>
<script>
// Command Center scroll reveal (lightweight)
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
