// Template helpers — shared by all live funnel templates
export const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

export const param = (q: Record<string, string | undefined>, key: string, fallback: string) => {
  const v = q[key]
  return v && v.trim() ? esc(v.trim()) : fallback
}

// Deadline 14 days out by default (real countdown, resets per visit for demo purposes — replace with fixed date in production)
export const defaultDeadline = () => new Date(Date.now() + 14 * 86400000).toISOString()

export const funnelHead = (title: string) => `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<link rel="icon" type="image/svg+xml" href="/static/favicon.svg">
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@600;700;800&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
  body { font-family:'Inter',sans-serif; }
  h1,h2,h3,h4 { font-family:'Poppins',sans-serif; }
  .pulse-glow { animation: pulseglow 2s infinite; }
  @keyframes pulseglow { 0%,100% { box-shadow:0 0 0 0 rgba(249,115,22,.6);} 50% { box-shadow:0 0 0 12px rgba(249,115,22,0);} }
</style>
</head>`

export const templateBadge = `
<aside class="fixed bottom-4 right-4 z-50 bg-gray-900 text-white text-xs px-3 py-2 rounded-lg shadow-xl border border-gray-700 max-w-xs">
  <p><i class="fas fa-wand-magic-sparkles text-cyan-400 mr-1"></i><strong>Live Template</strong> — customize via <a href="/builder" class="text-cyan-400 underline">Builder</a>. Attorney review required before launch.</p>
</aside>`
