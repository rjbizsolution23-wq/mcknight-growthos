// ── /leads — LeadFlow CRM CRM (v3.3, Cloudflare D1 + Workers AI) ──
import { shell } from './layout'

export const leadsPage = () => shell('LeadFlow CRM', 'leads', `
<section id="leads-hero" class="py-8">
  <p class="inline-block bg-gray-800 text-brand-cyan text-xs font-mono px-3 py-1 rounded-full mb-3"><i class="fas fa-database mr-1"></i>CLOUDFLARE D1 · EVERY LEAD STORED FOREVER · AI INSIGHTS</p>
  <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2">Lead <span class="grad-text">Inbox</span></h1>
  <p class="text-gray-400 max-w-3xl">Every form submission from all 30 funnels lands here automatically — stored in your Cloudflare D1 database. Filter, work the pipeline, export CSV for clients, and let AI tell you who to call first.</p>
</section>

<section id="admin-lock" class="card p-4 mb-6 hidden border !border-amber-700/60">
  <div class="flex items-center flex-wrap gap-3">
    <p class="text-sm text-amber-300 font-semibold"><i class="fas fa-lock mr-2"></i>This inbox is protected by an admin key.</p>
    <input id="admin-key-input" type="password" placeholder="Enter ADMIN_API_KEY…" class="bg-[#060a14] border border-amber-800/60 rounded-lg px-3 py-2 text-sm text-white w-64">
    <button id="btn-unlock" class="grad-bg text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90"><i class="fas fa-unlock mr-1"></i>Unlock</button>
    <span id="unlock-status" class="text-xs text-gray-500"></span>
  </div>
</section>

<section id="lead-stats" class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
  <div class="card p-5 text-center"><p class="text-3xl font-extrabold grad-text" id="stat-total">—</p><p class="text-xs text-gray-500 mt-1">Total Leads</p></div>
  <div class="card p-5 text-center"><p class="text-3xl font-extrabold text-brand-success" id="stat-today">—</p><p class="text-xs text-gray-500 mt-1">Today</p></div>
  <div class="card p-5 text-center"><p class="text-3xl font-extrabold text-brand-cyan" id="stat-week">—</p><p class="text-xs text-gray-500 mt-1">Last 7 Days</p></div>
  <div class="card p-5 text-center"><p class="text-lg font-bold text-white truncate" id="stat-top-funnel">—</p><p class="text-xs text-gray-500 mt-1">Top Funnel</p></div>
</section>

<section id="ai-insights" class="card p-5 mb-8">
  <div class="flex items-center justify-between flex-wrap gap-3 mb-2">
    <h2 class="font-bold text-white"><i class="fas fa-brain text-brand-pink mr-2"></i>AI Lead Insights <span class="text-[10px] font-mono bg-blue-900/50 text-blue-300 px-2 py-0.5 rounded ml-2">Workers AI · llama-3.1</span></h2>
    <button id="btn-insights" class="grad-bg text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90"><i class="fas fa-wand-magic-sparkles mr-1"></i>Analyze My Leads</button>
  </div>
  <pre id="insights-out" class="text-sm text-gray-300 bg-[#060a14] border border-blue-900/40 rounded-lg p-4 hidden whitespace-pre-wrap"></pre>
  <p id="insights-hint" class="text-xs text-gray-500">One click: AI summarizes lead volume, tells you the top 3 leads to call first today, and flags patterns (best campaigns, gaps). Runs on your Cloudflare account — no API key needed.</p>
</section>

<section id="lead-filters" class="flex flex-wrap items-center gap-3 mb-4">
  <input id="f-search" type="text" placeholder="Search name / email / phone…" class="bg-[#060a14] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white w-64">
  <select id="f-funnel" class="bg-[#060a14] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white"><option value="">All funnels</option></select>
  <select id="f-status" class="bg-[#060a14] border border-gray-700 rounded-lg px-3 py-2 text-sm text-white">
    <option value="">All statuses</option>
    <option value="new">New</option><option value="contacted">Contacted</option><option value="qualified">Qualified</option><option value="won">Won</option><option value="lost">Lost</option>
  </select>
  <button id="btn-refresh" class="text-sm text-gray-300 border border-gray-700 px-3 py-2 rounded-lg hover:bg-gray-800"><i class="fas fa-rotate mr-1"></i>Refresh</button>
  <a href="/api/leads/export.csv" id="csv-link" class="ml-auto text-sm text-brand-cyan border border-blue-800 px-3 py-2 rounded-lg hover:bg-blue-900/30"><i class="fas fa-file-csv mr-1"></i>Export CSV</a>
</section>

<section id="lead-table-wrap" class="card p-0 overflow-x-auto mb-10">
  <table class="w-full text-sm">
    <thead><tr class="text-left text-xs text-gray-500 border-b border-blue-900/40">
      <th class="px-4 py-3">Lead</th><th class="px-4 py-3">Contact</th><th class="px-4 py-3">Funnel</th><th class="px-4 py-3">Campaign</th><th class="px-4 py-3">GHL</th><th class="px-4 py-3">Status</th><th class="px-4 py-3">When</th>
    </tr></thead>
    <tbody id="lead-rows"><tr><td colspan="7" class="px-4 py-10 text-center text-gray-500" id="lead-empty">Loading leads…</td></tr></tbody>
  </table>
  <div class="flex items-center justify-between px-4 py-3 border-t border-blue-900/40 text-xs text-gray-500">
    <span id="lead-count">—</span>
    <div class="flex gap-2">
      <button id="pg-prev" class="px-3 py-1.5 border border-gray-700 rounded hover:bg-gray-800 disabled:opacity-40" disabled>← Prev</button>
      <button id="pg-next" class="px-3 py-1.5 border border-gray-700 rounded hover:bg-gray-800 disabled:opacity-40" disabled>Next →</button>
    </div>
  </div>
</section>

<section id="how-it-works" class="grid md:grid-cols-3 gap-4 mb-10">
  <div class="card p-5"><h3 class="font-bold text-white text-sm mb-2"><i class="fas fa-bolt text-brand-cyan mr-2"></i>Automatic capture</h3><p class="text-xs text-gray-400">Every lead form on all 30 funnels (plus exit-intent popups and rescue modals) writes to D1 the instant it's submitted — alongside email + GHL sync. Zero setup.</p></div>
  <div class="card p-5"><h3 class="font-bold text-white text-sm mb-2"><i class="fas fa-arrows-split-up-and-left text-brand-cyan mr-2"></i>Pipeline statuses</h3><p class="text-xs text-gray-400">Click any status pill to advance the lead: new → contacted → qualified → won/lost. Filter by status to build today's call list.</p></div>
  <div class="card p-5"><h3 class="font-bold text-white text-sm mb-2"><i class="fas fa-file-export text-brand-cyan mr-2"></i>Client-ready export</h3><p class="text-xs text-gray-400">One-click CSV (up to 5,000 leads) with full attribution: funnel, UTM campaign/source/medium, GHL contact ID — drop straight into any spreadsheet or CRM import.</p></div>
</section>

<script>
(function(){
  var offset = 0, limit = 50, total = 0;
  // v3.5: admin key (only needed when ADMIN_API_KEY secret is set server-side)
  var KEY_STORE = 'growthos_admin_key';
  function adminKey(){ try { return localStorage.getItem(KEY_STORE) || ''; } catch(e){ return ''; } }
  function hdrs(extra){ var h = extra || {}; var k = adminKey(); if (k) h['x-admin-key'] = k; return h; }
  function syncCsvLink(){ var a = document.getElementById('csv-link'); var k = adminKey(); a.href = '/api/leads/export.csv' + (k ? '?key=' + encodeURIComponent(k) : ''); }
  function showLock(msg){
    document.getElementById('admin-lock').classList.remove('hidden');
    if (msg) document.getElementById('unlock-status').textContent = msg;
  }
  function handle401(){ showLock(adminKey() ? 'Key rejected — check it and try again.' : ''); showEmpty('Locked — enter your admin key above to view leads.'); }
  var STATUSES = ['new','contacted','qualified','won','lost'];
  var COLORS = { 'new':'bg-blue-900/60 text-blue-300', contacted:'bg-amber-900/60 text-amber-300', qualified:'bg-purple-900/60 text-purple-300', won:'bg-emerald-900/60 text-emerald-300', lost:'bg-gray-800 text-gray-500' };
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }

  function loadStats(){
    fetch('/api/leads/stats', { headers: hdrs() }).then(function(r){ if(r.status===401){ handle401(); throw new Error('401'); } return r.json(); }).then(function(d){
      if(!d.ok) return;
      document.getElementById('stat-total').textContent = d.total;
      document.getElementById('stat-today').textContent = d.today;
      document.getElementById('stat-week').textContent = d.week;
      document.getElementById('stat-top-funnel').textContent = (d.byFunnel[0] ? d.byFunnel[0].funnel + ' (' + d.byFunnel[0].n + ')' : '—');
      var sel = document.getElementById('f-funnel');
      while (sel.options.length > 1) sel.remove(1);
      d.byFunnel.forEach(function(f){ var o=document.createElement('option'); o.value=f.funnel; o.textContent=f.funnel+' ('+f.n+')'; sel.appendChild(o); });
    }).catch(function(){});
  }

  function loadLeads(){
    var p = new URLSearchParams({ limit:limit, offset:offset });
    var q = document.getElementById('f-search').value.trim(); if(q) p.set('q', q);
    var fn = document.getElementById('f-funnel').value; if(fn) p.set('funnel', fn);
    var st = document.getElementById('f-status').value; if(st) p.set('status', st);
    fetch('/api/leads?'+p.toString(), { headers: hdrs() }).then(function(r){ if(r.status===401){ handle401(); throw new Error('401'); } return r.json(); }).then(function(d){
      if(!d.ok){ showEmpty(d.error||'Error loading leads'); return; }
      total = d.total;
      document.getElementById('lead-count').textContent = 'Showing ' + (d.leads.length ? (offset+1)+'–'+(offset+d.leads.length) : 0) + ' of ' + total;
      document.getElementById('pg-prev').disabled = offset <= 0;
      document.getElementById('pg-next').disabled = offset + limit >= total;
      var tb = document.getElementById('lead-rows');
      if(!d.leads.length){ showEmpty('No leads match — leads appear here automatically as your funnels capture them.'); return; }
      tb.innerHTML = d.leads.map(function(l){
        var pills = STATUSES.map(function(s){
          var on = l.status === s;
          return '<button data-lead="'+l.id+'" data-status="'+s+'" class="lead-status text-[10px] px-1.5 py-0.5 rounded '+(on?COLORS[s]+' font-bold':'text-gray-600 hover:text-gray-300')+'">'+s+'</button>';
        }).join('');
        return '<tr class="border-b border-blue-900/20 hover:bg-blue-950/20">'
          + '<td class="px-4 py-3 font-semibold text-white">'+esc(l.name||'—')+'</td>'
          + '<td class="px-4 py-3 text-gray-400 text-xs">'+esc(l.email||'')+(l.phone?'<br>'+esc(l.phone):'')+'</td>'
          + '<td class="px-4 py-3"><span class="text-xs bg-gray-800 text-brand-cyan px-2 py-0.5 rounded">'+esc(l.funnel||'—')+'</span></td>'
          + '<td class="px-4 py-3 text-xs text-gray-500">'+esc(l.utm_campaign||'—')+'</td>'
          + '<td class="px-4 py-3 text-xs">'+(l.ghl_contact_id?'<i class="fas fa-check text-brand-success" title="Synced to GoHighLevel"></i>':'<span class="text-gray-700">—</span>')+'</td>'
          + '<td class="px-4 py-3"><div class="flex gap-1 flex-wrap">'+pills+'</div></td>'
          + '<td class="px-4 py-3 text-xs text-gray-500 whitespace-nowrap">'+esc((l.created_at||'').replace('T',' ').slice(0,16))+'</td>'
          + '</tr>';
      }).join('');
      tb.querySelectorAll('.lead-status').forEach(function(btn){
        btn.addEventListener('click', function(){
          fetch('/api/leads/'+btn.dataset.lead, { method:'PATCH', headers: hdrs({'Content-Type':'application/json'}), body: JSON.stringify({ status: btn.dataset.status }) }).then(function(r){ if(r.status===401) handle401(); loadLeads(); loadStats(); });
        });
      });
    }).catch(function(){ showEmpty('Could not reach the leads API.'); });
  }
  function showEmpty(msg){ document.getElementById('lead-rows').innerHTML = '<tr><td colspan="7" class="px-4 py-10 text-center text-gray-500">'+esc(msg)+'</td></tr>'; document.getElementById('lead-count').textContent='0 leads'; }

  document.getElementById('btn-refresh').addEventListener('click', function(){ offset=0; loadLeads(); loadStats(); });
  document.getElementById('f-funnel').addEventListener('change', function(){ offset=0; loadLeads(); });
  document.getElementById('f-status').addEventListener('change', function(){ offset=0; loadLeads(); });
  var t; document.getElementById('f-search').addEventListener('input', function(){ clearTimeout(t); t=setTimeout(function(){ offset=0; loadLeads(); }, 350); });
  document.getElementById('pg-prev').addEventListener('click', function(){ offset=Math.max(0,offset-limit); loadLeads(); });
  document.getElementById('pg-next').addEventListener('click', function(){ offset+=limit; loadLeads(); });

  document.getElementById('btn-insights').addEventListener('click', function(){
    var btn=this, out=document.getElementById('insights-out');
    btn.disabled=true; btn.innerHTML='<i class="fas fa-spinner fa-spin mr-1"></i>Analyzing…';
    out.classList.remove('hidden'); out.textContent='Thinking…';
    fetch('/api/ai/insights', { method:'POST', headers: hdrs() }).then(function(r){ if(r.status===401){ handle401(); return { ok:false, error:'Locked — enter your admin key above.' }; } return r.json(); }).then(function(d){
      out.textContent = d.ok ? d.insights : ('⚠ ' + (d.error||'AI unavailable'));
    }).catch(function(){
      out.textContent = '⚠ AI unavailable in this environment — works in production on Cloudflare.';
    }).finally(function(){ btn.disabled=false; btn.innerHTML='<i class="fas fa-wand-magic-sparkles mr-1"></i>Analyze My Leads'; });
  });

  document.getElementById('btn-unlock').addEventListener('click', function(){
    var v = document.getElementById('admin-key-input').value.trim();
    if(!v) return;
    try { localStorage.setItem(KEY_STORE, v); } catch(e){}
    document.getElementById('unlock-status').textContent = 'Checking…';
    fetch('/api/leads/stats', { headers: hdrs() }).then(function(r){
      if(r.status===401){ document.getElementById('unlock-status').textContent = '❌ Wrong key.'; return; }
      document.getElementById('unlock-status').textContent = '✅ Unlocked!';
      document.getElementById('admin-lock').classList.add('hidden');
      syncCsvLink(); offset=0; loadStats(); loadLeads();
    }).catch(function(){ document.getElementById('unlock-status').textContent = 'Network error.'; });
  });
  document.getElementById('admin-key-input').addEventListener('keydown', function(e){ if(e.key==='Enter') document.getElementById('btn-unlock').click(); });

  syncCsvLink(); loadStats(); loadLeads();
})();
</script>
`)
