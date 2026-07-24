// ── Funnel Analytics — per-funnel data separation ────────────────
import { shell } from './layout'

export const analyticsPage = () => shell('Funnel Analytics', 'analytics', `
<section id="an-hero" class="mb-8">
  <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider"><i class="fas fa-chart-line mr-1"></i> Per-Funnel Data Separation</p>
  <h1 class="text-4xl font-extrabold text-white leading-tight mb-3">Funnel <span class="grad-text">Analytics</span></h1>
  <p class="text-gray-400 max-w-3xl">Every funnel tracks its own views, leads and conversion rate — fully separated. View tracking fires automatically on every funnel page load with zero visitor latency.</p>
</section>

<section id="an-controls" class="mb-6 flex flex-wrap items-center gap-3">
  <label class="text-sm text-gray-400 font-semibold">Window:</label>
  <select id="an-days" onchange="loadAnalytics()" class="bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-2.5 text-sm text-white">
    <option value="7">Last 7 days</option>
    <option value="30" selected>Last 30 days</option>
    <option value="90">Last 90 days</option>
  </select>
  <span id="an-msg" class="text-sm text-gray-500"></span>
</section>

<section id="an-summary" class="mb-8 grid grid-cols-2 md:grid-cols-4 gap-3">
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-5"><p class="text-3xl font-extrabold text-white" id="an-total-views">—</p><p class="text-xs text-gray-500 uppercase tracking-wider mt-1">Funnel Views</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-5"><p class="text-3xl font-extrabold text-mk-goldLight" id="an-total-leads">—</p><p class="text-xs text-gray-500 uppercase tracking-wider mt-1">Leads Captured</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-5"><p class="text-3xl font-extrabold text-emerald-400" id="an-conv">—</p><p class="text-xs text-gray-500 uppercase tracking-wider mt-1">Avg Conversion</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-5"><p class="text-3xl font-extrabold text-mk-cyan" id="an-active">—</p><p class="text-xs text-gray-500 uppercase tracking-wider mt-1">Active Funnels</p></div>
</section>

<section id="an-chart-wrap" class="mb-8 bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
  <h2 class="text-lg font-bold text-white mb-4"><i class="fas fa-wave-square text-mk-gold mr-2"></i>Daily Views</h2>
  <div class="h-64"><canvas id="an-chart"></canvas></div>
</section>

<section id="an-table" class="mb-10">
  <h2 class="text-xl font-bold text-white mb-3"><i class="fas fa-table-list text-mk-gold mr-2"></i>Per-Funnel Breakdown</h2>
  <div class="overflow-x-auto bg-[#0d1b30] border border-blue-900/40 rounded-2xl">
    <table class="w-full text-sm">
      <thead><tr class="text-left text-gray-400 border-b border-blue-900/40"><th class="p-3">Funnel</th><th class="p-3 text-right">Views</th><th class="p-3 text-right">Leads</th><th class="p-3 text-right">Conversion</th><th class="p-3"></th></tr></thead>
      <tbody id="an-rows"><tr><td colspan="5" class="p-6 text-center text-gray-500">Loading…</td></tr></tbody>
    </table>
  </div>
  <p class="text-xs text-gray-600 mt-3">Conversion = leads ÷ views for the selected window. Funnels only appear after their first tracked view or lead.</p>
</section>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
var KEY_STORE='growthos_admin_key';
function adminKey(){ return localStorage.getItem(KEY_STORE)||''; }
function hdrs(extra){ var h=extra||{}; var k=adminKey(); if(k) h['x-admin-key']=k; return h; }
function esc(s){ return String(s==null?'':s).replace(/</g,'&lt;'); }
var chart=null;
async function loadAnalytics(){
  var days=document.getElementById('an-days').value;
  var msg=document.getElementById('an-msg'); msg.textContent='Loading…';
  try{
    var r=await fetch('/api/analytics?days='+days,{headers:hdrs()}); var j=await r.json();
    if(!j.ok){ if(r.status===401){ var k=prompt('Admin key required:'); if(k){ localStorage.setItem(KEY_STORE,k); return loadAnalytics(); } } msg.textContent=j.error||'error'; return; }
    msg.textContent='';
    var fs=j.funnels||[];
    var tv=fs.reduce(function(a,f){return a+f.views},0), tl=fs.reduce(function(a,f){return a+f.leads},0);
    document.getElementById('an-total-views').textContent=tv.toLocaleString();
    document.getElementById('an-total-leads').textContent=tl.toLocaleString();
    document.getElementById('an-conv').textContent=tv?((tl/tv)*100).toFixed(1)+'%':'—';
    document.getElementById('an-active').textContent=fs.length+' / 30';
    document.getElementById('an-rows').innerHTML=fs.length?fs.map(function(f){
      return '<tr class="border-b border-blue-900/20"><td class="p-3 text-white font-semibold"><a class="hover:text-mk-cyan" href="/t/'+esc(f.funnel)+'" target="_blank">'+esc(f.funnel)+'</a></td><td class="p-3 text-right text-gray-300">'+f.views.toLocaleString()+'</td><td class="p-3 text-right text-mk-goldLight font-semibold">'+f.leads.toLocaleString()+'</td><td class="p-3 text-right '+(f.conversion===null?'text-gray-600':(f.conversion>=3?'text-emerald-400':'text-gray-300'))+'">'+(f.conversion===null?'—':f.conversion+'%')+'</td><td class="p-3 text-right"><a href="/leads?funnel='+esc(f.funnel)+'" class="text-xs text-mk-cyan hover:underline">leads →</a></td></tr>';
    }).join(''):'<tr><td colspan="5" class="p-6 text-center text-gray-500">No traffic yet — share your funnel links to start collecting data.</td></tr>';
    var daily=j.daily||[];
    var ctx=document.getElementById('an-chart').getContext('2d');
    if(chart) chart.destroy();
    chart=new Chart(ctx,{type:'line',data:{labels:daily.map(function(d){return d.day}),datasets:[{label:'Views',data:daily.map(function(d){return d.views}),borderColor:'#d4a72c',backgroundColor:'rgba(212,167,44,0.12)',fill:true,tension:0.35,pointRadius:3,pointBackgroundColor:'#f4ce65'}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{labels:{color:'#9ca3af'}}},scales:{x:{ticks:{color:'#6b7280'},grid:{color:'rgba(30,58,95,0.3)'}},y:{beginAtZero:true,ticks:{color:'#6b7280',precision:0},grid:{color:'rgba(30,58,95,0.3)'}}}}});
  }catch(e){ msg.textContent='Error: '+e.message; }
}
loadAnalytics();
</script>
`)
