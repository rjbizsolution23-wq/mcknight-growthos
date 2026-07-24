// ── AI Agent Command — SEO/SGE/AEO copy agents ──────────────────
import { shell } from './layout'

export const agentsPage = () => shell('AI Agent Command', 'agents', `
<section id="ag-hero" class="mb-8">
  <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider"><i class="fas fa-robot mr-1"></i> Autonomous Optimization</p>
  <h1 class="text-4xl font-extrabold text-white leading-tight mb-3">AI Agent <span class="grad-text">Command</span></h1>
  <p class="text-gray-400 max-w-3xl">The SEO/SGE/AEO agent rewrites every funnel's search-facing copy <strong class="text-white">weekly</strong> — optimized for classic search, Google AI Overviews and answer engines (ChatGPT, Perplexity). It reads each funnel's last-7-day views + conversion and sharpens the angle when conversion is weak. Explicit URL params always win, so client customizations are never touched.</p>
  <div class="mt-4 grid md:grid-cols-3 gap-3 max-w-3xl text-xs">
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-3"><p class="font-bold text-mk-gold mb-1"><i class="fas fa-magnifying-glass mr-1"></i>SEO</p><p class="text-gray-400">Keyword-rich titles &lt;60 chars, CTR-tuned descriptions</p></div>
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-3"><p class="font-bold text-mk-gold mb-1"><i class="fas fa-wand-magic-sparkles mr-1"></i>SGE / AI Overviews</p><p class="text-gray-400">Direct-answer phrasing search AIs can quote</p></div>
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-3"><p class="font-bold text-mk-gold mb-1"><i class="fas fa-comments mr-1"></i>AEO</p><p class="text-gray-400">Question-answer long-tail keywords for answer engines</p></div>
  </div>
</section>

<section id="ag-controls" class="mb-8 flex flex-wrap items-center gap-3">
  <button onclick="runAll(this)" class="gold-bg text-black font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90"><i class="fas fa-bolt mr-2"></i>Run Agent Now — All 30 Funnels</button>
  <select id="ag-one" class="bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white"><option value="">Run one funnel…</option></select>
  <button onclick="runOne(this)" class="border border-mk-gold/50 text-mk-goldLight font-semibold px-5 py-3 rounded-xl text-sm hover:bg-mk-gold/10">Run Selected</button>
  <span id="ag-msg" class="text-sm text-gray-400"></span>
</section>

<section id="ch-agent" class="mb-10 bg-[#0d1b30] border border-mk-gold/30 rounded-2xl p-6">
  <h2 class="text-xl font-bold text-white mb-1"><i class="fas fa-wand-magic-sparkles text-mk-gold mr-2"></i>Change Agent <span class="text-[10px] gold-bg text-black font-mono ml-1 align-middle px-1.5 py-0.5 rounded">v3.0 · PLAIN ENGLISH</span></h2>
  <p class="text-gray-400 text-sm mb-4 max-w-3xl">Describe any change in plain English — “change the company name to Summit Lending, make the city Denver, CTA should say Book My Call” — and the agent applies it to the live funnel instantly. Only real funnel fields can be changed (never arbitrary code), every change is logged, and one-click revert.</p>
  <div class="grid md:grid-cols-4 gap-3 mb-3">
    <select id="ch-funnel" class="bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white"><option value="">Pick funnel…</option></select>
    <textarea id="ch-request" rows="2" class="md:col-span-2 bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white" placeholder="e.g. Change the company to Summit Home Lending, city to Denver, and make the CTA say Book My Call"></textarea>
    <button onclick="applyChange(this)" class="gold-bg text-black font-bold px-5 py-3 rounded-xl text-sm hover:opacity-90 self-start"><i class="fas fa-bolt mr-2"></i>Apply Change</button>
  </div>
  <p id="ch-msg" class="text-sm text-gray-400 mb-4"></p>
  <h3 class="font-bold text-white text-sm mb-2"><i class="fas fa-clock-rotate-left text-mk-gold mr-2"></i>Change History</h3>
  <div class="overflow-x-auto">
    <table class="w-full text-xs">
      <thead><tr class="text-left text-gray-400 border-b border-blue-900/40"><th class="p-2">When (UTC)</th><th class="p-2">Funnel</th><th class="p-2">Request</th><th class="p-2">Applied</th><th class="p-2">Status</th><th class="p-2"></th></tr></thead>
      <tbody id="ch-rows"><tr><td colspan="6" class="p-4 text-center text-gray-500">Loading…</td></tr></tbody>
    </table>
  </div>
</section>

<section id="ag-table" class="mb-10">
  <h2 class="text-xl font-bold text-white mb-3"><i class="fas fa-table-list text-mk-gold mr-2"></i>Live Copy Overrides</h2>
  <div class="overflow-x-auto bg-[#0d1b30] border border-blue-900/40 rounded-2xl">
    <table class="w-full text-sm">
      <thead><tr class="text-left text-gray-400 border-b border-blue-900/40"><th class="p-3">Funnel</th><th class="p-3">Agent Title</th><th class="p-3">Last Optimized</th><th class="p-3"></th></tr></thead>
      <tbody id="ag-rows"><tr><td colspan="4" class="p-6 text-center text-gray-500">Loading…</td></tr></tbody>
    </table>
  </div>
</section>

<section id="ag-log" class="mb-10">
  <h2 class="text-xl font-bold text-white mb-3"><i class="fas fa-scroll text-mk-gold mr-2"></i>Agent Activity Log</h2>
  <div id="ag-log-rows" class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-4 font-mono text-xs text-gray-400 max-h-80 overflow-y-auto">Loading…</div>
</section>

<script>
var KEY_STORE='growthos_admin_key';
function adminKey(){ return localStorage.getItem(KEY_STORE)||''; }
function hdrs(extra){ var h=extra||{}; var k=adminKey(); if(k) h['x-admin-key']=k; return h; }
function esc(s){ return String(s==null?'':s).replace(/</g,'&lt;'); }
async function loadStatus(){
  try{
    var r=await fetch('/api/agents/status',{headers:hdrs()}); var j=await r.json();
    if(!j.ok){ if(r.status===401){ var k=prompt('Admin key required:'); if(k){ localStorage.setItem(KEY_STORE,k); return loadStatus(); } } document.getElementById('ag-rows').innerHTML='<tr><td colspan="4" class="p-6 text-center text-red-400">'+esc(j.error)+'</td></tr>'; return; }
    var sel=document.getElementById('ag-one'); sel.innerHTML='<option value="">Run one funnel…</option>'+j.funnels.map(function(f){return '<option>'+f+'</option>'}).join('');
    var csel=document.getElementById('ch-funnel'); if(csel.options.length<=1) csel.innerHTML='<option value="">Pick funnel…</option>'+j.funnels.map(function(f){return '<option>'+f+'</option>'}).join('');
    var oMap={}; (j.overrides||[]).forEach(function(o){ oMap[o.funnel]=o; });
    document.getElementById('ag-rows').innerHTML=j.funnels.map(function(f){
      var o=oMap[f]; var title=''; if(o){ try{ title=(JSON.parse(o.overrides).seoTitle)||''; }catch(e){} }
      return '<tr class="border-b border-blue-900/20"><td class="p-3 text-white font-semibold"><a class="hover:text-mk-cyan" href="/t/'+f+'" target="_blank">'+f+'</a></td><td class="p-3 text-gray-300">'+(title?esc(title):'<span class="text-gray-600">hand-written default</span>')+'</td><td class="p-3 text-gray-500">'+(o?esc(o.updated_at)+' UTC':'—')+'</td><td class="p-3">'+(o?'<button onclick="clearOne(\\''+f+'\\')" class="text-red-400 text-xs hover:underline">reset</button>':'')+'</td></tr>';
    }).join('');
    document.getElementById('ag-log-rows').innerHTML=(j.log&&j.log.length)?j.log.map(function(l){ return '<p class="mb-1"><span class="text-gray-600">'+esc(l.created_at)+'</span> <span class="text-mk-cyan">'+esc(l.agent)+'</span> '+(l.funnel?'<span class="text-mk-goldLight">'+esc(l.funnel)+'</span> ':'')+esc(l.action)+(l.detail?' — <span class="text-gray-500">'+esc(l.detail)+'</span>':'')+'</p>'; }).join(''):'<p class="text-gray-600">No agent activity yet — hit Run Agent Now.</p>';
    if(!j.ai) document.getElementById('ag-msg').textContent='⚠ Workers AI available in deployed environment only';
  }catch(e){ document.getElementById('ag-rows').innerHTML='<tr><td colspan="4" class="p-6 text-center text-red-400">'+esc(e.message)+'</td></tr>'; }
}
async function runAll(btn){
  btn.disabled=true; var m=document.getElementById('ag-msg'); m.textContent='Optimizing all 30 funnels (60–120s)…';
  try{ var r=await fetch('/api/agents/run',{method:'POST',headers:hdrs({'Content-Type':'application/json'}),body:'{}'}); var j=await r.json();
    m.textContent=j.ok?('✅ Optimized '+j.optimized.length+' funnels'):(j.error||('Optimized '+(j.optimized||[]).length+', failed '+(j.failed||[]).length));
  }catch(e){ m.textContent='Error: '+e.message; }
  btn.disabled=false; loadStatus();
}
async function runOne(btn){
  var f=document.getElementById('ag-one').value; if(!f) return;
  btn.disabled=true; var m=document.getElementById('ag-msg'); m.textContent='Optimizing '+f+'…';
  try{ var r=await fetch('/api/agents/run',{method:'POST',headers:hdrs({'Content-Type':'application/json'}),body:JSON.stringify({funnel:f})}); var j=await r.json();
    m.textContent=j.ok?('✅ '+f+' → "'+(j.overrides&&j.overrides.seoTitle||'')+'"'):(j.error||'failed');
  }catch(e){ m.textContent='Error: '+e.message; }
  btn.disabled=false; loadStatus();
}
async function clearOne(f){
  if(!confirm('Reset '+f+' to hand-written copy?')) return;
  await fetch('/api/agents/overrides/'+f,{method:'DELETE',headers:hdrs()}); loadStatus();
}
async function loadChanges(){
  try{
    var r=await fetch('/api/changes',{headers:hdrs()}); var j=await r.json();
    if(!j.ok) return;
    document.getElementById('ch-rows').innerHTML=(j.requests&&j.requests.length)?j.requests.map(function(c){
      var ch=''; try{ var o=JSON.parse(c.changes||'{}'); ch=Object.keys(o).map(function(k){return '<span class="text-mk-goldLight">'+k+'</span>=“'+esc(o[k]).slice(0,40)+'”'}).join(', '); }catch(e){}
      var st=c.status==='applied'?'<span class="text-emerald-400">applied</span>':c.status==='reverted'?'<span class="text-gray-500">reverted</span>':'<span class="text-red-400" title="'+esc(c.error)+'">rejected</span>';
      return '<tr class="border-b border-blue-900/20"><td class="p-2 text-gray-500 whitespace-nowrap">'+esc(c.created_at)+'</td><td class="p-2 text-white"><a class="hover:text-mk-cyan" target="_blank" href="/t/'+esc(c.funnel)+'">'+esc(c.funnel)+'</a></td><td class="p-2 text-gray-400 max-w-[280px] truncate" title="'+esc(c.request)+'">'+esc(c.request)+'</td><td class="p-2 text-gray-300">'+(ch||'—')+'</td><td class="p-2">'+st+'</td><td class="p-2">'+(c.status==='applied'?'<button onclick="revertChange('+c.id+')" class="text-red-400 hover:underline">revert</button>':'')+'</td></tr>';
    }).join(''):'<tr><td colspan="6" class="p-4 text-center text-gray-500">No change requests yet — try one above.</td></tr>';
  }catch(e){}
}
async function applyChange(btn){
  var f=document.getElementById('ch-funnel').value, req=document.getElementById('ch-request').value.trim();
  var m=document.getElementById('ch-msg');
  if(!f||!req){ m.textContent='Pick a funnel and describe the change'; return; }
  btn.disabled=true; m.textContent='Agent is applying your change…';
  try{
    var r=await fetch('/api/changes',{method:'POST',headers:hdrs({'Content-Type':'application/json'}),body:JSON.stringify({funnel:f,request:req})});
    var j=await r.json();
    if(j.ok){ m.innerHTML='✅ '+esc(j.summary)+(j.note?' <span class="text-gray-500">('+esc(j.note)+')</span>':'')+' — <a class="text-mk-cyan underline" target="_blank" href="/t/'+f+'">view live</a>'; document.getElementById('ch-request').value=''; }
    else m.textContent='❌ '+(j.error||'failed');
  }catch(e){ m.textContent='Error: '+e.message; }
  btn.disabled=false; loadChanges(); loadStatus();
}
async function revertChange(id){
  if(!confirm('Revert change #'+id+'?')) return;
  await fetch('/api/changes/'+id+'/revert',{method:'POST',headers:hdrs()});
  loadChanges(); loadStatus();
}
loadStatus();
loadChanges();
</script>
`)
