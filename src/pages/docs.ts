// ── v6.7.1: Master Documentation viewer ────────────────────────
// Renders /static/docs/MASTER-DOCUMENTATION.md in-app with a sticky
// table of contents, search, and download button. Marked.js from CDN.
import { shell } from './layout'

const DOCS = [
  { file: 'MASTER-DOCUMENTATION.md', label: 'Master Documentation', icon: 'fa-book', desc: 'Every page, endpoint, parameter, integration and runbook' },
  { file: 'GTM-SALES-PLAN.md', label: 'GTM & Sales Plan', icon: 'fa-bullseye', desc: 'The complete plan to market and sell the GrowthOS model' },
]

export const docsPage = () => shell('Documentation', 'docs', `
<section id="docs-hero" class="mb-6">
  <div class="flex flex-wrap items-center justify-between gap-4">
    <div>
      <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-2 uppercase tracking-wider"><i class="fas fa-book mr-1"></i> Documentation Center</p>
      <h1 class="text-4xl font-extrabold text-white leading-tight">Platform <span class="grad-text">Documentation</span></h1>
      <p id="docs-desc" class="text-gray-400 mt-1 text-sm">Every page, endpoint, parameter, integration and runbook — v6.7.0</p>
    </div>
    <div class="flex gap-2">
      <a id="docs-dl" href="/static/docs/MASTER-DOCUMENTATION.md" download="MASTER-DOCUMENTATION.md" class="gold-bg text-black font-bold px-5 py-2.5 rounded-lg text-sm"><i class="fas fa-download mr-2"></i>Download .md</a>
      <a id="docs-raw" href="/static/docs/MASTER-DOCUMENTATION.md" target="_blank" class="bg-gray-800 border border-gray-700 text-gray-300 font-semibold px-5 py-2.5 rounded-lg text-sm"><i class="fas fa-file-lines mr-2"></i>Raw</a>
      <button onclick="window.print()" class="bg-gray-800 border border-gray-700 text-gray-300 font-semibold px-5 py-2.5 rounded-lg text-sm"><i class="fas fa-print mr-2"></i>Print / PDF</button>
    </div>
  </div>
  <div id="docs-tabs" class="flex gap-2 mt-5 flex-wrap">
    ${DOCS.map((d, i) => `<button data-doc="${d.file}" data-desc="${d.desc}" class="docs-tab ${i === 0 ? 'docs-tab-active' : ''} px-4 py-2 rounded-lg text-sm font-semibold border transition"><i class="fas ${d.icon} mr-2"></i>${d.label}</button>`).join('')}
  </div>
</section>

<div class="grid lg:grid-cols-[240px_1fr] gap-6 items-start">
  <aside id="docs-toc" class="card p-4 lg:sticky lg:top-4 max-h-[85vh] overflow-y-auto hidden lg:block">
    <input id="docs-search" type="text" placeholder="Filter sections…" class="w-full bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm text-gray-200 mb-3">
    <nav id="docs-toc-list" class="space-y-1 text-sm"></nav>
  </aside>
  <main id="docs-content" class="card p-8 docs-md min-w-0">
    <p class="text-gray-400"><i class="fas fa-spinner fa-spin mr-2"></i>Loading documentation…</p>
  </main>
</div>

<style>
.docs-md h1{font-size:1.9rem;font-weight:800;color:#fff;margin:1.5rem 0 1rem;border-bottom:2px solid rgba(212,167,44,.35);padding-bottom:.5rem}
.docs-md h2{font-size:1.45rem;font-weight:700;color:#f4ce65;margin:2.2rem 0 .8rem;scroll-margin-top:1rem}
.docs-md h3{font-size:1.12rem;font-weight:700;color:#e5e7eb;margin:1.5rem 0 .6rem}
.docs-md p{color:#9ca3af;line-height:1.7;margin:.6rem 0}
.docs-md a{color:#38bdf8}.docs-md a:hover{text-decoration:underline}
.docs-md strong{color:#e5e7eb}
.docs-md ul,.docs-md ol{color:#9ca3af;margin:.6rem 0 .6rem 1.4rem;line-height:1.7}
.docs-md ul{list-style:disc}.docs-md ol{list-style:decimal}
.docs-md code{background:#111827;border:1px solid #374151;border-radius:4px;padding:.1rem .35rem;font-size:.85em;color:#fbbf24}
.docs-md pre{background:#0b1220;border:1px solid #1f2937;border-radius:8px;padding:1rem;overflow-x:auto;margin:.8rem 0}
.docs-md pre code{background:none;border:none;padding:0;color:#a5f3fc;font-size:.82rem;line-height:1.5}
.docs-md table{width:100%;border-collapse:collapse;margin:.8rem 0;font-size:.85rem}
.docs-md th{background:#111827;color:#f4ce65;text-align:left;padding:.55rem .7rem;border:1px solid #374151;font-weight:700}
.docs-md td{padding:.5rem .7rem;border:1px solid #1f2937;color:#9ca3af}
.docs-md tr:hover td{background:rgba(255,255,255,.02)}
.docs-md hr{border-color:#1f2937;margin:1.8rem 0}
.docs-md blockquote{border-left:3px solid #d4a72c;padding-left:1rem;color:#d1d5db;margin:.8rem 0;font-style:italic}
#docs-toc-list a{display:block;padding:.35rem .6rem;border-radius:6px;color:#9ca3af}
#docs-toc-list a:hover{background:#1f2937;color:#f4ce65}
.docs-tab{background:#111827;border-color:#374151;color:#9ca3af}
.docs-tab:hover{color:#fff;border-color:#6b7280}
.docs-tab-active{background:linear-gradient(135deg,#d4a72c,#f4ce65);border-color:#d4a72c;color:#000}
.docs-tab-active:hover{color:#000}
@media print{#docs-toc,#docs-hero .flex.gap-2,aside,nav.sidebar{display:none!important}.docs-md{color:#000}}
</style>
<script src="https://cdn.jsdelivr.net/npm/marked@12.0.0/marked.min.js"></script>
<script>
(() => {
  const el = document.getElementById('docs-content');
  const toc = document.getElementById('docs-toc-list');
  const search = document.getElementById('docs-search');
  let links = [];

  async function loadDoc(file) {
    el.innerHTML = '<p class="text-gray-400"><i class="fas fa-spinner fa-spin mr-2"></i>Loading\u2026</p>';
    toc.innerHTML = ''; links = []; search.value = '';
    document.getElementById('docs-dl').href = '/static/docs/' + file;
    document.getElementById('docs-dl').setAttribute('download', file);
    document.getElementById('docs-raw').href = '/static/docs/' + file;
    try {
      const res = await fetch('/static/docs/' + file);
      const md = await res.text();
      el.innerHTML = marked.parse(md, { mangle: false, headerIds: true });
      el.querySelectorAll('h2').forEach((h, i) => {
        const id = h.id || ('sec-' + i); h.id = id;
        const a = document.createElement('a');
        a.href = '#' + id; a.textContent = h.textContent.replace(/^\\d+\\.\\s*/, '');
        toc.appendChild(a); links.push(a);
      });
      window.scrollTo(0, 0);
    } catch (err) {
      el.innerHTML = '<p class="text-red-400">Failed to load documentation: ' + err + '</p>';
    }
  }

  search.addEventListener('input', (e) => {
    const q = e.target.value.toLowerCase();
    links.forEach((a) => { a.style.display = a.textContent.toLowerCase().includes(q) ? '' : 'none'; });
  });

  document.querySelectorAll('.docs-tab').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.docs-tab').forEach((b) => b.classList.remove('docs-tab-active'));
      btn.classList.add('docs-tab-active');
      document.getElementById('docs-desc').textContent = btn.dataset.desc;
      history.replaceState(null, '', '?doc=' + btn.dataset.doc);
      loadDoc(btn.dataset.doc);
    });
  });

  const initial = new URLSearchParams(location.search).get('doc');
  const valid = initial && document.querySelector('.docs-tab[data-doc="' + initial + '"]');
  if (valid) { valid.click(); } else { loadDoc('MASTER-DOCUMENTATION.md'); }
})();
</script>
`)
