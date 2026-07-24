// ── McKnight ClientOS — CRM + Client Operations command center ──
// GrowthOS captures the lead. ClientOS manages everything after.
import { shell } from './layout'

export const clientsPage = () => shell('McKnight ClientOS', 'clients', `
<section id="co-hero" class="mb-6">
  <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider"><i class="fas fa-people-arrows mr-1"></i> McKnight ClientOS</p>
  <h1 class="text-4xl font-extrabold text-white leading-tight mb-2">Client<span class="grad-text">OS</span> <span class="text-lg font-normal text-gray-500">Unified CRM &amp; Client Operations</span></h1>
  <p class="text-gray-400 max-w-3xl">Every client. Every conversation. Every next step. Connected. — GrowthOS captures the lead; <strong class="text-white">ClientOS runs everything after</strong>: Client 360, brand pipelines, tasks, tickets, referrals and transparent health scores across the entire McKnight ecosystem.</p>
</section>

<section id="co-stats" class="mb-6 grid grid-cols-2 md:grid-cols-6 gap-3">
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-2xl font-extrabold text-white" id="st-clients">—</p><p class="text-[11px] text-gray-500 uppercase tracking-wider">Clients</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-2xl font-extrabold text-mk-goldLight" id="st-pipeline">—</p><p class="text-[11px] text-gray-500 uppercase tracking-wider">Open pipeline $</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-2xl font-extrabold text-emerald-400" id="st-health">—</p><p class="text-[11px] text-gray-500 uppercase tracking-wider">Avg health</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-2xl font-extrabold text-white" id="st-tickets">—</p><p class="text-[11px] text-gray-500 uppercase tracking-wider">Open tickets</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-2xl font-extrabold text-orange-400" id="st-overdue">—</p><p class="text-[11px] text-gray-500 uppercase tracking-wider">Overdue tasks</p></div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-4"><p class="text-2xl font-extrabold text-yellow-300" id="st-expiring">—</p><p class="text-[11px] text-gray-500 uppercase tracking-wider">Docs expiring 30d</p></div>
</section>

<section id="co-tabs" class="mb-5 flex flex-wrap gap-2">
  <button data-tab="board" class="co-tab gold-bg text-black font-bold px-4 py-2 rounded-xl text-sm"><i class="fas fa-columns mr-1"></i>Pipelines</button>
  <button data-tab="list" class="co-tab bg-[#0d1b30] border border-blue-900/40 text-gray-300 font-bold px-4 py-2 rounded-xl text-sm"><i class="fas fa-address-book mr-1"></i>Clients</button>
  <button data-tab="tickets" class="co-tab bg-[#0d1b30] border border-blue-900/40 text-gray-300 font-bold px-4 py-2 rounded-xl text-sm"><i class="fas fa-life-ring mr-1"></i>Tickets</button>
  <button data-tab="referrals" class="co-tab bg-[#0d1b30] border border-blue-900/40 text-gray-300 font-bold px-4 py-2 rounded-xl text-sm"><i class="fas fa-handshake mr-1"></i>Referrals</button>
</section>

<!-- ═══ TAB: PIPELINE BOARD ═══ -->
<section id="tab-board">
  <div class="flex flex-wrap items-center gap-3 mb-4">
    <select id="bd-pipeline" onchange="loadBoard()" class="bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-2.5 text-sm text-white"></select>
    <span id="bd-brand" class="text-xs text-gray-500"></span>
    <span id="bd-summary" class="text-xs text-gray-500 ml-auto"></span>
  </div>
  <div id="bd-cols" class="flex gap-3 overflow-x-auto pb-4" style="min-height:300px"></div>
</section>

<!-- ═══ TAB: CLIENT LIST ═══ -->
<section id="tab-list" class="hidden">
  <div class="flex flex-wrap items-center gap-3 mb-4">
    <input id="cl-q" placeholder="Search name, email, phone, business…" class="bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-2.5 text-sm text-white w-64" onkeydown="if(event.key==='Enter')loadClients()">
    <select id="cl-brand" onchange="loadClients()" class="bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-2.5 text-sm text-white"><option value="">All brands</option></select>
    <select id="cl-stage" onchange="loadClients()" class="bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-2.5 text-sm text-white"><option value="">All lifecycle stages</option></select>
    <button onclick="newClient()" class="gold-bg text-black font-bold px-4 py-2.5 rounded-xl text-sm ml-auto"><i class="fas fa-user-plus mr-1"></i>New Client</button>
  </div>
  <div class="overflow-x-auto bg-[#0d1b30] border border-blue-900/40 rounded-2xl">
    <table class="w-full text-sm">
      <thead><tr class="text-left text-gray-400 border-b border-blue-900/40"><th class="p-3">Client</th><th class="p-3">Brand</th><th class="p-3">Lifecycle</th><th class="p-3">Health</th><th class="p-3">Value</th><th class="p-3">Next action</th><th class="p-3">Last contact</th></tr></thead>
      <tbody id="cl-rows"><tr><td colspan="7" class="p-6 text-center text-gray-500">Loading…</td></tr></tbody>
    </table>
  </div>
  <p id="cl-total" class="text-xs text-gray-600 mt-2"></p>
</section>

<!-- ═══ TAB: TICKETS ═══ -->
<section id="tab-tickets" class="hidden">
  <div class="flex flex-wrap items-center gap-3 mb-4">
    <button onclick="newTicket()" class="gold-bg text-black font-bold px-4 py-2.5 rounded-xl text-sm"><i class="fas fa-plus mr-1"></i>New Ticket</button>
    <span class="text-xs text-gray-500">New → Assigned → Investigating → Waiting → Escalated → Resolved → Closed</span>
  </div>
  <div class="overflow-x-auto bg-[#0d1b30] border border-blue-900/40 rounded-2xl">
    <table class="w-full text-sm">
      <thead><tr class="text-left text-gray-400 border-b border-blue-900/40"><th class="p-3">#</th><th class="p-3">Subject</th><th class="p-3">Client</th><th class="p-3">Brand</th><th class="p-3">Priority</th><th class="p-3">Status</th><th class="p-3"></th></tr></thead>
      <tbody id="tk-rows"><tr><td colspan="7" class="p-6 text-center text-gray-500">Loading…</td></tr></tbody>
    </table>
  </div>
</section>

<!-- ═══ TAB: REFERRALS ═══ -->
<section id="tab-referrals" class="hidden">
  <div class="flex flex-wrap items-center gap-3 mb-4">
    <button onclick="newReferral()" class="gold-bg text-black font-bold px-4 py-2.5 rounded-xl text-sm"><i class="fas fa-plus mr-1"></i>Log Referral</button>
    <span class="text-xs text-gray-500"><i class="fas fa-scale-balanced mr-1"></i>Regulated verticals (legal, mortgage, credit, housing, gov-con) have vertical-specific compensation rules — disclosure + consent tracked per referral.</span>
  </div>
  <div class="overflow-x-auto bg-[#0d1b30] border border-blue-900/40 rounded-2xl">
    <table class="w-full text-sm">
      <thead><tr class="text-left text-gray-400 border-b border-blue-900/40"><th class="p-3">Referrer</th><th class="p-3">Referred</th><th class="p-3">Service</th><th class="p-3">Brand</th><th class="p-3">Disclosure</th><th class="p-3">Comp</th><th class="p-3">Status</th><th class="p-3"></th></tr></thead>
      <tbody id="rf-rows"><tr><td colspan="8" class="p-6 text-center text-gray-500">Loading…</td></tr></tbody>
    </table>
  </div>
</section>

<!-- ═══ CLIENT 360 DRAWER ═══ -->
<div id="c360" class="hidden fixed inset-0 z-50">
  <div class="absolute inset-0 bg-black/70" onclick="close360()"></div>
  <aside class="absolute right-0 top-0 h-full w-full md:w-[720px] bg-[#0a1628] border-l border-blue-900/40 overflow-y-auto p-6">
    <div class="flex items-start justify-between mb-4">
      <div id="c360-head"></div>
      <button onclick="close360()" class="text-gray-500 hover:text-white text-xl"><i class="fas fa-xmark"></i></button>
    </div>
    <div id="c360-body" class="space-y-6"></div>
  </aside>
</div>

<script>
var KEY_STORE='growthos_admin_key';
function adminKey(){ return localStorage.getItem(KEY_STORE)||''; }
function hdrs(extra){ var h=extra||{}; var k=adminKey(); if(k) h['x-admin-key']=k; return h; }
function esc(s){ return String(s==null?'':s).replace(/</g,'&lt;'); }
function money(v){ return '$'+(Math.round(v||0)).toLocaleString(); }
var META=null;

async function apiGet(url){
  var r=await fetch(url,{headers:hdrs()}); var j=await r.json();
  if(!j.ok&&r.status===401){ var k=prompt('Admin key required:'); if(k){ localStorage.setItem(KEY_STORE,k); return apiGet(url); } }
  return j;
}
async function apiPost(url,body,method){
  var r=await fetch(url,{method:method||'POST',headers:hdrs({'Content-Type':'application/json'}),body:JSON.stringify(body)});
  var j=await r.json();
  if(!j.ok&&r.status===401){ var k=prompt('Admin key required:'); if(k){ localStorage.setItem(KEY_STORE,k); return apiPost(url,body,method); } }
  return j;
}

// ── Tabs ──
document.querySelectorAll('.co-tab').forEach(function(b){
  b.addEventListener('click',function(){
    document.querySelectorAll('.co-tab').forEach(function(x){ x.className='co-tab bg-[#0d1b30] border border-blue-900/40 text-gray-300 font-bold px-4 py-2 rounded-xl text-sm'; });
    b.className='co-tab gold-bg text-black font-bold px-4 py-2 rounded-xl text-sm';
    ['board','list','tickets','referrals'].forEach(function(t){ document.getElementById('tab-'+t).classList.toggle('hidden',t!==b.dataset.tab); });
    if(b.dataset.tab==='list') loadClients();
    if(b.dataset.tab==='tickets') loadTickets();
    if(b.dataset.tab==='referrals') loadReferrals();
  });
});

// ── Meta + stats ──
async function loadMeta(){
  META=await apiGet('/api/clientos/meta');
  var sel=document.getElementById('bd-pipeline');
  sel.innerHTML=Object.keys(META.pipelines).map(function(k){ return '<option value="'+k+'">'+esc(META.pipelines[k].name)+' ('+esc(META.brands[META.pipelines[k].brand].name)+')</option>'; }).join('');
  document.getElementById('cl-brand').innerHTML='<option value="">All brands</option>'+Object.keys(META.brands).map(function(k){ return '<option value="'+k+'">'+esc(META.brands[k].name)+'</option>'; }).join('');
  document.getElementById('cl-stage').innerHTML='<option value="">All lifecycle stages</option>'+META.lifecycle.map(function(s){ return '<option>'+s+'</option>'; }).join('');
  loadBoard();
}
async function loadStats(){
  var j=await apiGet('/api/clientos/stats');
  if(!j.ok) return;
  document.getElementById('st-clients').textContent=j.clients;
  var pv=0; (j.openPipelines||[]).forEach(function(p){ pv+=p.v||0; });
  document.getElementById('st-pipeline').textContent=money(pv);
  document.getElementById('st-health').textContent=j.avgHealth;
  document.getElementById('st-tickets').textContent=j.openTickets;
  document.getElementById('st-overdue').textContent=j.overdueTasks;
  document.getElementById('st-expiring').textContent=j.expiringDocs;
}

// ── Pipeline board ──
async function loadBoard(){
  var p=document.getElementById('bd-pipeline').value||'consulting';
  var j=await apiGet('/api/opportunities?pipeline='+encodeURIComponent(p));
  if(!j.ok) return;
  var brand=META&&META.pipelines[p]?META.brands[META.pipelines[p].brand]:null;
  document.getElementById('bd-brand').innerHTML=brand?('<i class="fas '+brand.icon+' mr-1" style="color:'+brand.color+'"></i>'+esc(brand.name)):'';
  var won=0,lost=0; (j.closed||[]).forEach(function(x){ if(x.status==='won')won=x.n; if(x.status==='lost')lost=x.n; });
  document.getElementById('bd-summary').textContent=(j.opportunities||[]).length+' open · '+won+' won · '+lost+' lost';
  var byStage={}; j.stages.forEach(function(s){ byStage[s]=[]; });
  (j.opportunities||[]).forEach(function(o){ (byStage[o.stage]=byStage[o.stage]||[]).push(o); });
  document.getElementById('bd-cols').innerHTML=j.stages.map(function(s){
    var cards=(byStage[s]||[]).map(function(o){
      var who=(o.first_name||'')+' '+(o.last_name||''); if(!who.trim()) who=o.business_name||o.email||o.phone||'#'+o.client_id;
      var hb=o.health_score>=75?'text-emerald-400':o.health_score>=60?'text-yellow-300':o.health_score>=40?'text-orange-400':'text-red-400';
      return '<div class="bg-[#060a14] border border-blue-900/50 rounded-xl p-3 mb-2 cursor-pointer hover:border-mk-gold/60" onclick="open360('+o.client_id+')">'
        +'<p class="text-white text-xs font-bold mb-1">'+esc(who.trim())+'</p>'
        +'<p class="text-[10px] text-gray-500 mb-2">'+esc(o.title)+'</p>'
        +'<div class="flex items-center justify-between text-[10px]"><span class="text-mk-goldLight">'+money(o.value)+'</span><span class="'+hb+'"><i class="fas fa-heart-pulse mr-0.5"></i>'+(o.health_score||'—')+'</span></div>'
        +'<div class="flex gap-1 mt-2">'
        +'<button onclick="event.stopPropagation();moveOpp('+o.id+',\\''+esc(s)+'\\',-1)" class="flex-1 text-[10px] text-gray-500 hover:text-white bg-blue-900/20 rounded py-0.5">←</button>'
        +'<button onclick="event.stopPropagation();moveOpp('+o.id+',\\''+esc(s)+'\\',1)" class="flex-1 text-[10px] text-gray-500 hover:text-white bg-blue-900/20 rounded py-0.5">→</button>'
        +'<button onclick="event.stopPropagation();closeOpp('+o.id+',\\'won\\')" class="flex-1 text-[10px] text-emerald-500 hover:text-emerald-300 bg-emerald-900/20 rounded py-0.5">✓</button>'
        +'<button onclick="event.stopPropagation();closeOpp('+o.id+',\\'lost\\')" class="flex-1 text-[10px] text-red-500 hover:text-red-300 bg-red-900/20 rounded py-0.5">✗</button>'
        +'</div></div>';
    }).join('');
    return '<div class="flex-shrink-0 w-56"><p class="text-[11px] font-bold text-gray-400 uppercase tracking-wider mb-2 flex justify-between"><span>'+esc(s)+'</span><span class="text-gray-600">'+(byStage[s]||[]).length+'</span></p>'+(cards||'<div class="border border-dashed border-blue-900/40 rounded-xl p-3 text-center text-[10px] text-gray-600">empty</div>')+'</div>';
  }).join('');
}
async function moveOpp(id,cur,dir){
  var p=document.getElementById('bd-pipeline').value;
  var stages=META.pipelines[p].stages;
  var i=stages.indexOf(cur)+dir;
  if(i<0||i>=stages.length) return;
  await apiPost('/api/opportunities/'+id+'/move',{stage:stages[i]});
  loadBoard(); loadStats();
}
async function closeOpp(id,status){
  var reason=status==='lost'?(prompt('Lost reason (optional):')||''):'';
  await apiPost('/api/opportunities/'+id+'/move',{status:status,lost_reason:reason});
  loadBoard(); loadStats();
}

// ── Client list ──
async function loadClients(){
  var q=new URLSearchParams();
  var s=document.getElementById('cl-q').value.trim(); if(s) q.set('q',s);
  var b=document.getElementById('cl-brand').value; if(b) q.set('brand',b);
  var st=document.getElementById('cl-stage').value; if(st) q.set('lifecycle',st);
  var j=await apiGet('/api/clients?'+q.toString());
  if(!j.ok) return;
  document.getElementById('cl-total').textContent=j.total+' clients';
  document.getElementById('cl-rows').innerHTML=(j.clients||[]).length?(j.clients||[]).map(function(cl){
    var who=((cl.first_name||'')+' '+(cl.last_name||'')).trim()||cl.business_name||cl.email||cl.phone;
    var brand=META&&META.brands[cl.brand]?META.brands[cl.brand]:null;
    var hb=cl.health_score>=75?'text-emerald-400':cl.health_score>=60?'text-yellow-300':cl.health_score>=40?'text-orange-400':'text-red-400';
    return '<tr class="border-b border-blue-900/20 cursor-pointer hover:bg-blue-900/10" onclick="open360('+cl.id+')">'
      +'<td class="p-3"><p class="text-white font-semibold">'+esc(who)+'</p><p class="text-[11px] text-gray-500">'+esc(cl.email||'')+(cl.phone?' · '+esc(cl.phone):'')+'</p></td>'
      +'<td class="p-3 text-xs">'+(brand?('<i class="fas '+brand.icon+' mr-1" style="color:'+brand.color+'"></i>'+esc(brand.name)):esc(cl.brand))+'</td>'
      +'<td class="p-3"><span class="text-xs px-2 py-0.5 rounded-full border border-blue-500/40 text-blue-300">'+esc(cl.lifecycle_stage)+'</span></td>'
      +'<td class="p-3 '+hb+' font-bold">'+(cl.health_score||'—')+'</td>'
      +'<td class="p-3 text-mk-goldLight text-xs">'+money(cl.account_value)+'</td>'
      +'<td class="p-3 text-gray-400 text-xs">'+esc(cl.next_action||'—')+'</td>'
      +'<td class="p-3 text-gray-500 text-xs">'+esc((cl.last_contact||'').slice(0,16))+'</td></tr>';
  }).join(''):'<tr><td colspan="7" class="p-6 text-center text-gray-500">No clients yet — every funnel lead auto-creates one, or add manually.</td></tr>';
}
async function newClient(){
  var email=prompt('Client email:'); if(!email) return;
  var first=prompt('First name:')||''; var last=prompt('Last name:')||'';
  var brand=prompt('Brand ('+Object.keys(META.brands).join(' | ')+'):','growthos')||'growthos';
  var j=await apiPost('/api/clients',{email:email,first_name:first,last_name:last,brand:brand,lead_source:'manual'});
  if(j.ok){ loadClients(); loadStats(); } else alert(j.error||'failed');
}

// ── Client 360 drawer ──
async function open360(id){
  document.getElementById('c360').classList.remove('hidden');
  document.getElementById('c360-head').innerHTML='<p class="text-gray-500 text-sm">Loading…</p>';
  document.getElementById('c360-body').innerHTML='';
  var j=await apiGet('/api/clients/'+id);
  if(!j.ok){ document.getElementById('c360-head').innerHTML='<p class="text-red-400">'+esc(j.error)+'</p>'; return; }
  var cl=j.client;
  var who=((cl.first_name||'')+' '+(cl.last_name||'')).trim()||cl.business_name||cl.email;
  var brand=META&&META.brands[cl.brand]?META.brands[cl.brand]:{name:cl.brand,icon:'fa-circle',color:'#888'};
  document.getElementById('c360-head').innerHTML=
    '<div><p class="text-[11px] uppercase tracking-wider" style="color:'+brand.color+'"><i class="fas '+brand.icon+' mr-1"></i>'+esc(brand.name)+'</p>'
    +'<h2 class="text-2xl font-extrabold text-white">'+esc(who)+'</h2>'
    +'<p class="text-xs text-gray-500">'+esc(cl.email||'')+(cl.phone?' · '+esc(cl.phone):'')+' · <span class="text-blue-300">'+esc(cl.lifecycle_stage)+'</span>'+(cl.funnel?' · funnel: '+esc(cl.funnel):'')+'</p></div>';
  var h=j.health;
  var factors=h.factors.map(function(f){ return '<div class="flex justify-between text-[11px] py-1 border-b border-blue-900/20"><span class="text-gray-400">'+esc(f.label)+' <span class="text-gray-600">('+esc(f.why)+')</span></span><span class="text-white font-mono">'+f.earned+'/'+f.weight+'</span></div>'; }).join('');
  var timeline=(j.timeline||[]).map(function(a){
    var icon={note:'fa-note-sticky',email:'fa-envelope',sms:'fa-comment-sms',call:'fa-phone',meeting:'fa-handshake',stage:'fa-arrow-right-arrow-left',task:'fa-list-check',document:'fa-file',payment:'fa-dollar-sign',ticket:'fa-life-ring',webinar:'fa-video',system:'fa-robot'}[a.kind]||'fa-circle';
    return '<div class="flex gap-3 py-2 border-b border-blue-900/20"><i class="fas '+icon+' text-mk-gold text-xs mt-1"></i><div class="flex-1"><p class="text-xs text-white">'+esc(a.subject)+'</p>'+(a.body?'<p class="text-[11px] text-gray-500">'+esc(a.body)+'</p>':'')+'<p class="text-[10px] text-gray-600">'+esc((a.created_at||'').slice(0,16))+' · '+esc(a.actor)+'</p></div></div>';
  }).join('')||'<p class="text-xs text-gray-600">No activity yet.</p>';
  var opps=(j.opportunities||[]).map(function(o){
    return '<div class="flex justify-between items-center text-xs py-1.5 border-b border-blue-900/20"><span class="text-white">'+esc(o.title)+'</span><span><span class="text-gray-500 mr-2">'+esc(o.pipeline)+' · '+esc(o.stage)+'</span><span class="'+(o.status==='won'?'text-emerald-400':o.status==='lost'?'text-red-400':'text-blue-300')+'">'+esc(o.status)+'</span></span></div>';
  }).join('')||'<p class="text-xs text-gray-600">No opportunities.</p>';
  var tasks=(j.tasks||[]).map(function(t){
    return '<div class="flex justify-between items-center text-xs py-1.5 border-b border-blue-900/20"><span class="'+(t.status==='done'?'text-gray-500 line-through':'text-white')+'">'+esc(t.title)+(t.due_date?' <span class="text-gray-600">due '+esc(t.due_date)+'</span>':'')+'</span>'
      +(t.status!=='done'?'<button onclick="doneTask('+t.id+','+cl.id+')" class="text-emerald-400 hover:underline">done</button>':'<span class="text-emerald-500">✓</span>')+'</div>';
  }).join('')||'<p class="text-xs text-gray-600">No tasks.</p>';
  var docs=(j.documents||[]).map(function(d){
    var vs={verified:'text-emerald-400',rejected:'text-red-400',expired:'text-orange-400'}[d.verification_status]||'text-gray-500';
    return '<div class="flex justify-between text-xs py-1.5 border-b border-blue-900/20"><span class="text-white">'+esc(d.name)+' <span class="text-gray-600">('+esc(d.category)+')</span></span><span class="'+vs+'">'+esc(d.verification_status)+(d.expiration_date?' · exp '+esc(d.expiration_date):'')+'</span></div>';
  }).join('')||'<p class="text-xs text-gray-600">No documents.</p>';
  document.getElementById('c360-body').innerHTML=
    '<div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-4"><div class="flex items-center justify-between mb-2"><h3 class="font-bold text-white text-sm"><i class="fas fa-heart-pulse text-mk-gold mr-2"></i>Health Score — <span style="color:'+h.color+'">'+h.score+' · '+esc(h.band)+'</span></h3></div>'+factors+'<p class="text-[10px] text-gray-600 mt-2">Transparent operational factors only — never protected demographics.</p></div>'
    +'<div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-4"><h3 class="font-bold text-white text-sm mb-2"><i class="fas fa-filter text-mk-gold mr-2"></i>Opportunities</h3>'+opps+'</div>'
    +'<div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-4"><div class="flex justify-between items-center mb-2"><h3 class="font-bold text-white text-sm"><i class="fas fa-list-check text-mk-gold mr-2"></i>Tasks</h3><button onclick="addTask('+cl.id+')" class="text-mk-cyan text-xs hover:underline">+ task</button></div>'+tasks+'</div>'
    +'<div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-4"><div class="flex justify-between items-center mb-2"><h3 class="font-bold text-white text-sm"><i class="fas fa-folder-open text-mk-gold mr-2"></i>Document Vault</h3><button onclick="addDoc('+cl.id+')" class="text-mk-cyan text-xs hover:underline">+ document</button></div>'+docs+'</div>'
    +'<div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-4"><div class="flex justify-between items-center mb-2"><h3 class="font-bold text-white text-sm"><i class="fas fa-timeline text-mk-gold mr-2"></i>Unified Timeline</h3><button onclick="addNote('+cl.id+')" class="text-mk-cyan text-xs hover:underline">+ log touch</button></div><div class="max-h-96 overflow-y-auto">'+timeline+'</div></div>';
}
function close360(){ document.getElementById('c360').classList.add('hidden'); }
async function addNote(id){
  var kind=prompt('Type (note | email | sms | call | meeting | payment):','note')||'note';
  var subject=prompt('Subject:'); if(!subject) return;
  var body=prompt('Details (optional):')||'';
  await apiPost('/api/clients/'+id+'/activity',{kind:kind,subject:subject,body:body});
  open360(id);
}
async function addTask(id){
  var title=prompt('Task title:'); if(!title) return;
  var due=prompt('Due date (YYYY-MM-DD, optional):')||'';
  await apiPost('/api/clients/'+id+'/tasks',{title:title,due_date:due});
  open360(id);
}
async function doneTask(tid,cid){ await apiPost('/api/tasks/'+tid+'/status',{status:'done'}); open360(cid); }
async function addDoc(id){
  var name=prompt('Document name:'); if(!name) return;
  var cat=prompt('Category (identity | formation | tax | banking | contracts | certifications | licenses | insurance | credit | mortgage | housing | driver | vehicle | childcare | general):','general')||'general';
  var exp=prompt('Expiration date (YYYY-MM-DD, optional):')||'';
  await apiPost('/api/clients/'+id+'/documents',{name:name,category:cat,expiration_date:exp});
  open360(id);
}

// ── Tickets ──
async function loadTickets(){
  var j=await apiGet('/api/tickets');
  if(!j.ok) return;
  document.getElementById('tk-rows').innerHTML=(j.tickets||[]).length?(j.tickets||[]).map(function(t){
    var who=((t.first_name||'')+' '+(t.last_name||'')).trim()||t.email||'—';
    var pc={urgent:'text-red-400',high:'text-orange-400',normal:'text-gray-300',low:'text-gray-500'}[t.priority]||'text-gray-300';
    return '<tr class="border-b border-blue-900/20"><td class="p-3 text-gray-500 text-xs">#'+t.id+'</td><td class="p-3 text-white text-xs font-semibold">'+esc(t.subject)+'</td><td class="p-3 text-gray-400 text-xs">'+esc(who)+'</td><td class="p-3 text-gray-500 text-xs">'+esc(t.brand)+'</td><td class="p-3 text-xs '+pc+'">'+esc(t.priority)+'</td><td class="p-3"><span class="text-xs px-2 py-0.5 rounded-full border border-blue-500/40 text-blue-300">'+esc(t.status)+'</span></td>'
      +'<td class="p-3"><button onclick="ticketStatus('+t.id+')" class="text-mk-cyan text-xs hover:underline">update</button></td></tr>';
  }).join(''):'<tr><td colspan="7" class="p-6 text-center text-gray-500">No open tickets.</td></tr>';
}
async function newTicket(){
  var subject=prompt('Ticket subject:'); if(!subject) return;
  var desc=prompt('Description (optional):')||'';
  var pri=prompt('Priority (low | normal | high | urgent):','normal')||'normal';
  var j=await apiPost('/api/tickets',{subject:subject,description:desc,priority:pri});
  if(j.ok){ loadTickets(); loadStats(); } else alert(j.error||'failed');
}
async function ticketStatus(id){
  var st=prompt('New status (new | assigned | investigating | waiting_client | waiting_internal | escalated | resolved | closed | reopened):'); if(!st) return;
  var res=(st==='resolved'||st==='closed')?(prompt('Resolution note (optional):')||''):'';
  var j=await apiPost('/api/tickets/'+id+'/status',{status:st,resolution:res});
  if(j.ok){ loadTickets(); loadStats(); } else alert(j.error||'failed');
}

// ── Referrals ──
async function loadReferrals(){
  var j=await apiGet('/api/referrals');
  if(!j.ok) return;
  document.getElementById('rf-rows').innerHTML=(j.referrals||[]).length?(j.referrals||[]).map(function(r){
    return '<tr class="border-b border-blue-900/20"><td class="p-3 text-white text-xs">'+esc(r.referrer_name||('#'+r.referrer_client_id))+'</td><td class="p-3 text-gray-300 text-xs">'+esc(r.referred_name||(r.referred_client_id?'#'+r.referred_client_id:'—'))+'</td><td class="p-3 text-gray-400 text-xs">'+esc(r.service||'—')+'</td><td class="p-3 text-gray-500 text-xs">'+esc(r.brand)+'</td>'
      +'<td class="p-3 text-xs">'+(r.disclosure_provided?'<span class="text-emerald-400">✓</span>':'<span class="text-red-400">✗</span>')+' / '+(r.client_consent?'<span class="text-emerald-400">✓</span>':'<span class="text-red-400">✗</span>')+'</td>'
      +'<td class="p-3 text-mk-goldLight text-xs">'+money(r.compensation)+' <span class="text-gray-600">('+esc(r.compensation_status)+')</span></td>'
      +'<td class="p-3"><span class="text-xs px-2 py-0.5 rounded-full border border-blue-500/40 text-blue-300">'+esc(r.status)+'</span></td>'
      +'<td class="p-3"><button onclick="refStatus('+r.id+')" class="text-mk-cyan text-xs hover:underline">update</button></td></tr>';
  }).join(''):'<tr><td colspan="8" class="p-6 text-center text-gray-500">No referrals logged.</td></tr>';
}
async function newReferral(){
  var referrer=prompt('Referrer name:'); if(!referrer) return;
  var referred=prompt('Referred person/business name:')||'';
  var service=prompt('Service referred for:')||'';
  var disc=confirm('Was the referral-fee disclosure provided?');
  var cons=confirm('Did the client consent to the referral?');
  var comp=prompt('Compensation amount (0 if none):','0')||'0';
  var j=await apiPost('/api/referrals',{referrer_name:referrer,referred_name:referred,service:service,disclosure_provided:disc,client_consent:cons,compensation:parseFloat(comp)||0});
  if(j.ok) loadReferrals(); else alert(j.error||'failed');
}
async function refStatus(id){
  var st=prompt('New status (new | contacted | converted | paid | declined):'); if(!st) return;
  var j=await apiPost('/api/referrals/'+id+'/status',{status:st});
  if(j.ok) loadReferrals(); else alert(j.error||'failed');
}

loadMeta(); loadStats();
</script>
`)
