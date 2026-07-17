// Shared app shell — RJ Funnel Command Center
export const shell = (title: string, active: string, content: string, extraHead = '') => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title} | RJ Funnel Command Center</title>
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600&family=Space+Grotesk:wght@500;600&display=swap" rel="stylesheet">
<script>
tailwind.config = {
  theme: { extend: {
    fontFamily: { heading: ['Poppins','sans-serif'], body: ['Inter','sans-serif'], mono: ['Space Grotesk','monospace'] },
    colors: { brand: { cyan:'#06b6d4', pink:'#ec4899', dark:'#030712', success:'#10b981', warn:'#fbbf24', danger:'#ef4444' } }
  }}
}
</script>
<style>
  body { font-family:'Inter',sans-serif; background:#030712; color:#e5e7eb; }
  h1,h2,h3,h4 { font-family:'Poppins',sans-serif; }
  .grad-text { background:linear-gradient(90deg,#06b6d4,#ec4899); -webkit-background-clip:text; background-clip:text; color:transparent; }
  .grad-bg { background:linear-gradient(90deg,#06b6d4,#ec4899); }
  .card { background:#0b1020; border:1px solid #1f2937; border-radius:1rem; }
  .card:hover { border-color:#06b6d4; }
  .copy-block { position:relative; }
  .copy-btn { position:absolute; top:.5rem; right:.5rem; }
  pre { white-space:pre-wrap; word-break:break-word; }
  ::-webkit-scrollbar { width:8px; height:8px; }
  ::-webkit-scrollbar-thumb { background:#1f2937; border-radius:4px; }
</style>
${extraHead}
</head>
<body class="min-h-screen">
<header id="main-nav" class="sticky top-0 z-50 bg-[#030712]/90 backdrop-blur border-b border-gray-800">
  <nav class="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
    <a href="/" class="flex items-center gap-2">
      <span class="grad-bg w-8 h-8 rounded-lg flex items-center justify-center text-white"><i class="fas fa-filter"></i></span>
      <span class="font-heading font-bold text-white text-lg">RJ <span class="grad-text">Funnel Command Center</span></span>
    </a>
    <div class="flex items-center gap-1 text-sm flex-wrap">
      ${[
        ['/', 'Dashboard', 'dashboard'],
        ['/events', 'Events & Sponsors', 'events'],
        ['/tax', 'Tax', 'tax'],
        ['/credit', 'Credit Repair', 'credit'],
        ['/builder', 'Builder', 'builder'],
        ['/emails', 'Email Vault', 'emails'],
        ['/compliance', 'Compliance Vault', 'compliance'],
      ].map(([href, label, key]) =>
        `<a href="${href}" class="px-3 py-1.5 rounded-lg ${active === key ? 'grad-bg text-white font-semibold' : 'text-gray-300 hover:text-white hover:bg-gray-800'}">${label}</a>`
      ).join('')}
    </div>
  </nav>
</header>
<main class="max-w-7xl mx-auto px-4 py-8">
${content}
</main>
<footer class="border-t border-gray-800 mt-16">
  <div class="max-w-7xl mx-auto px-4 py-8 text-sm text-gray-400 flex flex-wrap items-center justify-between gap-4">
    <div>
      <p class="font-heading font-bold text-white">RJ Business Solutions</p>
      <p>1342 NM 333, Tijeras, New Mexico 87059 · <a href="https://rjbusinesssolutions.org" class="text-brand-cyan hover:underline">rjbusinesssolutions.org</a></p>
    </div>
    <p class="text-xs max-w-md">All templates are compliance-engineered but require review by a licensed attorney in your state before launch. Not legal advice.</p>
  </div>
</footer>
<script src="/static/app.js"></script>
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
