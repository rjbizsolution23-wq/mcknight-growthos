// ── Cloudflare Deploy — ship funnels to the user's own CF account ──
import { shell } from './layout'

export const deployPage = () => shell('Cloudflare Deploy', 'deploy', `
<section id="cf-hero" class="mb-8">
  <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider"><i class="fas fa-cloud mr-1"></i> Your Cloudflare Account</p>
  <h1 class="text-4xl font-extrabold text-white leading-tight mb-3">Cloudflare <span class="grad-text">Deploy</span></h1>
  <p class="text-gray-400 max-w-3xl">One-click deploy any funnel to <strong class="text-white">your own Cloudflare account</strong> as a standalone Worker with its own <code class="text-mk-goldLight">*.workers.dev</code> URL. The deployed funnel bakes in your customizations and AI-agent copy — and every lead still flows back into LeadFlow CRM, GHL, email and alerts automatically.</p>
  <div class="mt-4 grid md:grid-cols-3 gap-3 max-w-3xl text-xs">
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-3"><p class="font-bold text-mk-gold mb-1"><i class="fas fa-key mr-1"></i>1. Add keys</p><p class="text-gray-400">Drop <code>CF_DEPLOY_API_TOKEN</code> + <code>CF_DEPLOY_ACCOUNT_ID</code> in the <a href="/integrations" class="text-mk-cyan underline">Key Vault</a></p></div>
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-3"><p class="font-bold text-mk-gold mb-1"><i class="fas fa-rocket mr-1"></i>2. Pick a funnel</p><p class="text-gray-400">Choose any of the 30 funnels, optionally customize params</p></div>
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-3"><p class="font-bold text-mk-gold mb-1"><i class="fas fa-globe mr-1"></i>3. Live in ~5s</p><p class="text-gray-400">Standalone Worker URL on your account — leads still flow here</p></div>
  </div>
</section>

<section id="cf-status" class="mb-8">
  <div id="cf-conn" class="text-sm text-gray-400"><i class="fas fa-arrows-rotate mr-1"></i>Checking Cloudflare connection…</div>
</section>

<section id="cf-form" class="mb-10 bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
  <h2 class="text-xl font-bold text-white mb-4"><i class="fas fa-rocket text-mk-gold mr-2"></i>Deploy a Funnel</h2>
  <div class="grid md:grid-cols-3 gap-4 mb-4">
    <div>
      <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Funnel</label>
      <select id="cf-funnel" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white"><option value="">Select funnel…</option></select>
    </div>
    <div>
      <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Worker name (optional)</label>
      <input id="cf-name" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white" placeholder="growthos-mortgage">
    </div>
    <div class="flex items-end">
      <button onclick="deployNow(this)" class="gold-bg text-black font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 w-full"><i class="fas fa-cloud-arrow-up mr-2"></i>Deploy to My Cloudflare</button>
    </div>
  </div>
  <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Customization params (optional — one per line, <code>key=value</code>)</label>
  <textarea id="cf-params" rows="3" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-xs text-white font-mono" placeholder="company=Summit Home Lending&#10;city=Denver&#10;brandColor=#d4a72c"></textarea>
  <p class="text-[11px] text-gray-600 mt-2">Live AI-agent copy is merged automatically; your explicit params always win. Same param system as the Funnel Studio.</p>
  <p id="cf-msg" class="text-sm text-gray-400 mt-3"></p>
</section>

<section id="cf-list" class="mb-10">
  <h2 class="text-xl font-bold text-white mb-3"><i class="fas fa-server text-mk-gold mr-2"></i>Your Deployments</h2>
  <div class="overflow-x-auto bg-[#0d1b30] border border-blue-900/40 rounded-2xl">
    <table class="w-full text-sm">
      <thead><tr class="text-left text-gray-400 border-b border-blue-900/40"><th class="p-3">Funnel</th><th class="p-3">Worker</th><th class="p-3">URL</th><th class="p-3">Status</th><th class="p-3">Deployed (UTC)</th><th class="p-3"></th></tr></thead>
      <tbody id="cf-rows"><tr><td colspan="6" class="p-6 text-center text-gray-500">Loading…</td></tr></tbody>
    </table>
  </div>
</section>

<script>
var KEY_STORE='growthos_admin_key';
function adminKey(){ return localStorage.getItem(KEY_STORE)||''; }
function hdrs(extra){ var h=extra||{}; var k=adminKey(); if(k) h['x-admin-key']=k; return h; }
function esc(s){ return String(s==null?'':s).replace(/</g,'&lt;'); }
async function loadStatus(){
  try{
    var r=await fetch('/api/cf/status',{headers:hdrs()}); var j=await r.json();
    if(!j.ok){ if(r.status===401){ var k=prompt('Admin key required:'); if(k){ localStorage.setItem(KEY_STORE,k); return loadStatus(); } } document.getElementById('cf-conn').innerHTML='<span class="text-red-400">'+esc(j.error)+'</span>'; return; }
    var conn=document.getElementById('cf-conn');
    if(!j.configured){
      conn.innerHTML='<span class="px-3 py-1.5 rounded-full border border-yellow-500/50 text-yellow-300 text-xs"><i class="fas fa-triangle-exclamation mr-1"></i>Not connected — add <code>CF_DEPLOY_API_TOKEN</code> + <code>CF_DEPLOY_ACCOUNT_ID</code> in the <a class="underline" href="/integrations">Key Vault</a></span>';
    } else if(j.verify && j.verify.ok){
      conn.innerHTML='<span class="px-3 py-1.5 rounded-full border border-emerald-500/50 text-emerald-300 text-xs"><i class="fas fa-circle-check mr-1"></i>Connected — deploys to <strong>*.'+esc(j.verify.subdomain)+'.workers.dev</strong></span>';
    } else {
      conn.innerHTML='<span class="px-3 py-1.5 rounded-full border border-red-500/50 text-red-300 text-xs"><i class="fas fa-circle-xmark mr-1"></i>Keys set but verification failed: '+esc(j.verify&&j.verify.error)+'</span>';
    }
    var sel=document.getElementById('cf-funnel');
    if(sel.options.length<=1) sel.innerHTML='<option value="">Select funnel…</option>'+j.funnels.map(function(f){return '<option>'+f+'</option>'}).join('');
    var rows=j.deployments||[];
    document.getElementById('cf-rows').innerHTML=rows.length?rows.map(function(d){
      var st=d.status==='active'?'<span class="text-emerald-400">active</span>':d.status==='deleted'?'<span class="text-gray-500">deleted</span>':'<span class="text-red-400" title="'+esc(d.error)+'">failed</span>';
      return '<tr class="border-b border-blue-900/20"><td class="p-3 text-white font-semibold">'+esc(d.funnel)+'</td><td class="p-3 text-gray-400 font-mono text-xs">'+esc(d.worker_name)+'</td><td class="p-3">'+(d.url?'<a class="text-mk-cyan hover:underline text-xs" href="'+esc(d.url)+'" target="_blank">'+esc(d.url)+'</a>':'—')+'</td><td class="p-3">'+st+'</td><td class="p-3 text-gray-500 text-xs">'+esc(d.created_at)+'</td><td class="p-3">'+(d.status==='active'?'<button onclick="delDeploy(\\''+esc(d.worker_name)+'\\')" class="text-red-400 text-xs hover:underline">delete</button>':'')+'</td></tr>';
    }).join(''):'<tr><td colspan="6" class="p-6 text-center text-gray-500">No deployments yet.</td></tr>';
  }catch(e){ document.getElementById('cf-conn').innerHTML='<span class="text-red-400">'+esc(e.message)+'</span>'; }
}
function parseParams(){
  var out={}; document.getElementById('cf-params').value.split(/\\n/).forEach(function(l){
    var m=l.trim().match(/^([A-Za-z][A-Za-z0-9_]*)\\s*=\\s*(.+)$/); if(m) out[m[1]]=m[2].trim();
  }); return out;
}
async function deployNow(btn){
  var funnel=document.getElementById('cf-funnel').value;
  var m=document.getElementById('cf-msg');
  if(!funnel){ m.textContent='Pick a funnel first'; return; }
  btn.disabled=true; m.textContent='Deploying '+funnel+' to your Cloudflare account…';
  try{
    var body={funnel:funnel,params:parseParams()};
    var name=document.getElementById('cf-name').value.trim(); if(name) body.name=name;
    var r=await fetch('/api/cf/deploy',{method:'POST',headers:hdrs({'Content-Type':'application/json'}),body:JSON.stringify(body)});
    var j=await r.json();
    m.innerHTML=j.ok?('✅ Live: <a class="text-mk-cyan underline" target="_blank" href="'+esc(j.url)+'">'+esc(j.url)+'</a>'):('❌ '+esc(j.error||'failed'));
  }catch(e){ m.textContent='Error: '+e.message; }
  btn.disabled=false; loadStatus();
}
async function delDeploy(name){
  if(!confirm('Delete worker "'+name+'" from your Cloudflare account?')) return;
  var r=await fetch('/api/cf/deploy/'+encodeURIComponent(name),{method:'DELETE',headers:hdrs()});
  var j=await r.json();
  document.getElementById('cf-msg').textContent=j.ok?('Deleted '+name):('❌ '+(j.error||'failed'));
  loadStatus();
}
loadStatus();
</script>
`)
