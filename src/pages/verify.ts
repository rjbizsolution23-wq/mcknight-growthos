// ── v6.2 Fleet Verification & Launch-Readiness Command Center ──
// The entire P0/P1/P2 verification framework as a live, trackable system.
// Websites are built; production CLAIMS stay locked per brand until every
// blocking item is verified. Work the packet here, watch the gates go green.
import { shell } from './layout'

export const verifyPage = () => shell('Fleet Verification', 'verify', `
<section id="vf-hero" class="mb-6">
  <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider"><i class="fas fa-clipboard-check mr-1"></i> Fleet Verification Command Center</p>
  <h1 class="text-4xl font-extrabold text-white leading-tight mb-2">Launch <span class="grad-text">Readiness</span> <span class="text-lg font-normal text-gray-500">P0 / P1 / P2 verification gates</span></h1>
  <p class="text-gray-400 max-w-3xl">The fleet's sites are <strong class="text-white">built and deployed</strong> — what gates public launch is <strong class="text-white">verification</strong>: legal entities, name clearance, credentials, offers, pricing, compliance packets and evidence. Every item from the framework is tracked here. A brand's gate goes <span class="text-emerald-400 font-bold">green</span> only when all of its blocking items are verified.</p>
</section>

<section id="vf-stats" class="mb-6 grid grid-cols-2 md:grid-cols-5 gap-3">
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-2xl font-extrabold text-white" id="vs-total">—</p><p class="text-[11px] text-gray-500 uppercase tracking-wider">Total items</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-2xl font-extrabold text-red-400" id="vs-p0">—</p><p class="text-[11px] text-gray-500 uppercase tracking-wider">P0 done</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-2xl font-extrabold text-yellow-300" id="vs-p1">—</p><p class="text-[11px] text-gray-500 uppercase tracking-wider">P1 done</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-2xl font-extrabold text-cyan-300" id="vs-p2">—</p><p class="text-[11px] text-gray-500 uppercase tracking-wider">P2 done</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-2xl font-extrabold text-emerald-400" id="vs-ready">—</p><p class="text-[11px] text-gray-500 uppercase tracking-wider">Brands launch-ready</p></div>
</section>

<!-- Launch gates per brand -->
<section id="vf-gates" class="mb-8">
  <h2 class="text-xl font-bold text-white mb-3"><i class="fas fa-traffic-light text-mk-goldLight mr-2"></i>Brand Launch Gates</h2>
  <div id="gates-grid" class="grid grid-cols-2 md:grid-cols-5 gap-3"></div>
  <p class="text-[11px] text-gray-500 mt-2"><i class="fas fa-lock mr-1"></i>Gate = all blocking items for the brand <em>and</em> fleet-wide blocking items verified/NA. Until green: sites stay live but production claims (credentials, stats, regulated language, pricing contracts) remain locked out of copy.</p>
</section>

<!-- Filters -->
<section id="vf-filters" class="mb-4 flex flex-wrap items-center gap-2">
  <select id="f-brand" onchange="loadItems()" class="bg-[#060a14] border border-blue-900/60 rounded-xl px-3 py-2 text-sm text-white"><option value="">All brands</option></select>
  <select id="f-priority" onchange="loadItems()" class="bg-[#060a14] border border-blue-900/60 rounded-xl px-3 py-2 text-sm text-white">
    <option value="">All priorities</option><option value="P0">P0 — before development</option><option value="P1">P1 — content &amp; ops</option><option value="P2">P2 — trust &amp; launch</option>
  </select>
  <select id="f-status" onchange="loadItems()" class="bg-[#060a14] border border-blue-900/60 rounded-xl px-3 py-2 text-sm text-white">
    <option value="">All statuses</option><option value="pending">Pending</option><option value="in_progress">In progress</option><option value="received">Received</option><option value="verified">Verified</option><option value="blocked">Blocked</option><option value="na">N/A</option>
  </select>
  <label class="text-xs text-gray-400 flex items-center gap-1.5 ml-1"><input type="checkbox" id="f-blocking" onchange="loadItems()" class="accent-yellow-400"> Blocking only</label>
  <span id="f-count" class="text-xs text-gray-500 ml-auto"></span>
</section>

<!-- Items -->
<section id="vf-items" class="space-y-2 mb-10"></section>

<script>
const VBRANDS = { fleet:'Fleet-wide', mog:'Opportunity Group', contracting:'Contracting Preacher', housing:'Housing Initiative', capital:'Capital Ready', mortgage:'MortgageOS', growthos:'GrowthOS', freight:'Freight Systems', fleetworks:'FleetWorks', earlylearning:'Early Learning', learning:'LearningOS' }
const VCOLORS = { mog:'#d4a72c', contracting:'#d4a72c', housing:'#16a34a', capital:'#059669', mortgage:'#2563eb', growthos:'#0ea5e9', freight:'#4682b4', fleetworks:'#f97316', earlylearning:'#38bdf8', learning:'#7c3aed', fleet:'#94a3b8' }
const VSTATUS = { pending:['Pending','#64748b'], in_progress:['In progress','#eab308'], received:['Received','#38bdf8'], verified:['Verified','#10b981'], blocked:['Blocked','#ef4444'], na:['N/A','#475569'] }

const fb = document.getElementById('f-brand')
for (const [k,v] of Object.entries(VBRANDS)) { const o = document.createElement('option'); o.value = k; o.textContent = v; fb.appendChild(o) }

async function loadSummary() {
  const r = await fetch('/api/verify/summary').then(r => r.json()).catch(() => null)
  if (!r || !r.ok) return
  document.getElementById('vs-total').textContent = r.total
  for (const p of ['P0','P1','P2']) {
    const v = r.priorities[p] || { total: 0, done: 0 }
    document.getElementById('vs-' + p.toLowerCase()).textContent = v.done + '/' + v.total
  }
  const ready = Object.values(r.launch_ready).filter(Boolean).length
  document.getElementById('vs-ready').textContent = ready + '/' + Object.keys(r.launch_ready).length
  const g = document.getElementById('gates-grid'); g.innerHTML = ''
  for (const [b, ok] of Object.entries(r.launch_ready)) {
    const v = r.brands[b], c = VCOLORS[b] || '#94a3b8'
    const pct = v.total ? Math.round(v.done / v.total * 100) : 0
    g.insertAdjacentHTML('beforeend',
      '<div class="bg-[#0d1b30] border rounded-xl p-3.5" style="border-color:' + c + '40">' +
      '<div class="flex items-center justify-between mb-1.5"><span class="text-xs font-bold" style="color:' + c + '">' + (VBRANDS[b] || b) + '</span>' +
      '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full ' + (ok ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/15 text-red-300') + '">' + (ok ? 'READY' : 'GATED') + '</span></div>' +
      '<div class="h-1.5 bg-gray-800 rounded-full overflow-hidden mb-1.5"><div class="h-full rounded-full" style="width:' + pct + '%;background:' + c + '"></div></div>' +
      '<p class="text-[10px] text-gray-500">' + v.done + '/' + v.total + ' items · ' + v.blockingDone + '/' + v.blocking + ' blocking</p></div>')
  }
}

async function loadItems() {
  const qp = new URLSearchParams()
  const b = document.getElementById('f-brand').value; if (b) qp.set('brand', b)
  const p = document.getElementById('f-priority').value; if (p) qp.set('priority', p)
  const s = document.getElementById('f-status').value; if (s) qp.set('status', s)
  const r = await fetch('/api/verify/items?' + qp).then(r => r.json()).catch(() => null)
  if (!r || !r.ok) return
  let items = r.items
  if (document.getElementById('f-blocking').checked) items = items.filter(i => i.blocking)
  document.getElementById('f-count').textContent = items.length + ' items'
  const el = document.getElementById('vf-items'); el.innerHTML = ''
  let lastSec = ''
  for (const it of items) {
    if (it.section !== lastSec) { lastSec = it.section; el.insertAdjacentHTML('beforeend', '<h3 class="text-xs uppercase tracking-widest text-gray-500 font-bold pt-4 pb-1">' + it.priority + ' · ' + it.section.replace(/-/g, ' ') + '</h3>') }
    const st = VSTATUS[it.status] || VSTATUS.pending, c = VCOLORS[it.brand] || '#94a3b8'
    el.insertAdjacentHTML('beforeend',
      '<div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4" data-id="' + it.id + '">' +
      '<div class="flex flex-wrap items-start gap-2">' +
      '<div class="flex-1 min-w-[240px]">' +
      '<p class="text-sm font-bold text-white">' + (it.blocking ? '<i class="fas fa-lock text-yellow-400 text-xs mr-1.5" title="Launch-blocking"></i>' : '') + it.item + '</p>' +
      '<p class="text-[11px] text-gray-500 mt-1 leading-relaxed">' + it.detail + '</p>' +
      (it.evidence ? '<p class="text-[11px] text-cyan-300 mt-1"><i class="fas fa-paperclip mr-1"></i>' + it.evidence + '</p>' : '') +
      (it.notes ? '<p class="text-[11px] text-gray-400 mt-1 italic">' + it.notes + '</p>' : '') + '</div>' +
      '<div class="flex flex-col items-end gap-1.5">' +
      '<span class="text-[10px] font-bold px-2 py-0.5 rounded-full" style="background:' + c + '22;color:' + c + '">' + (VBRANDS[it.brand] || it.brand) + '</span>' +
      '<select onchange="setStatus(' + it.id + ', this.value)" class="bg-[#060a14] border border-blue-900/60 rounded-lg px-2 py-1 text-[11px]" style="color:' + st[1] + '">' +
      Object.entries(VSTATUS).map(([k, v]) => '<option value="' + k + '"' + (k === it.status ? ' selected' : '') + '>' + v[0] + '</option>').join('') +
      '</select>' +
      '<button onclick="addEvidence(' + it.id + ')" class="text-[10px] text-gray-500 hover:text-cyan-300"><i class="fas fa-paperclip mr-0.5"></i>evidence</button>' +
      '</div></div></div>')
  }
}

async function setStatus(id, status) {
  await fetch('/api/verify/items/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status }) })
  loadSummary(); loadItems()
}
async function addEvidence(id) {
  const ev = prompt('Evidence reference (doc link, file name, confirmation #):'); if (ev === null) return
  const notes = prompt('Notes (optional):') || ''
  await fetch('/api/verify/items/' + id, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ evidence: ev, notes }) })
  loadItems()
}
loadSummary(); loadItems()
</script>
`)
