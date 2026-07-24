// ── Mail Command — send branded email campaigns from the platform ──
import { shell } from './layout'

export const mailerPage = () => shell('Mail Command', 'mailer', `
<section id="ml-hero" class="mb-8">
  <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider"><i class="fas fa-paper-plane mr-1"></i> Email From The Platform</p>
  <h1 class="text-4xl font-extrabold text-white leading-tight mb-3">Mail <span class="grad-text">Command</span></h1>
  <p class="text-gray-400 max-w-3xl">Send branded campaigns straight from GrowthOS through your connected SMTP-relay provider (Resend, SendGrid, Mailgun, Postmark, Brevo or SMTP2GO). Target every lead, a single funnel's leads, or a pasted list. Always test-send first.</p>
</section>

<section id="ml-status" class="mb-8">
  <h2 class="text-xl font-bold text-white mb-3"><i class="fas fa-plug text-mk-gold mr-2"></i>Provider Status</h2>
  <div id="ml-providers" class="flex flex-wrap gap-2 text-xs">Loading…</div>
</section>

<section id="ml-compose" class="mb-10 grid lg:grid-cols-3 gap-6">
  <div class="lg:col-span-2 bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
    <h2 class="text-xl font-bold text-white mb-4"><i class="fas fa-pen-nib text-mk-gold mr-2"></i>Compose Campaign</h2>
    <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Subject</label>
    <input id="ml-subject" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white mb-4" placeholder="Your next step with McKnight Opportunity Group…">
    <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Message (HTML allowed — wrapped in branded template automatically)</label>
    <textarea id="ml-body" rows="10" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white mb-4 font-mono" placeholder="<p>Hi there,</p>&#10;<p>Here's what's new…</p>"></textarea>
    <div class="flex flex-wrap gap-3">
      <button onclick="sendMail(this,true)" class="border border-mk-gold/50 text-mk-goldLight font-semibold px-5 py-3 rounded-xl text-sm hover:bg-mk-gold/10"><i class="fas fa-vial mr-2"></i>Test Send (to me)</button>
      <button onclick="sendMail(this,false)" class="gold-bg text-black font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90"><i class="fas fa-paper-plane mr-2"></i>Send Campaign</button>
      <span id="ml-msg" class="text-sm text-gray-400 self-center"></span>
    </div>
  </div>
  <div class="bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
    <h2 class="text-lg font-bold text-white mb-4"><i class="fas fa-users text-mk-gold mr-2"></i>Audience</h2>
    <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Segment by funnel</label>
    <select id="ml-funnel" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white mb-4"><option value="">All funnels</option></select>
    <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Lead status</label>
    <select id="ml-lstatus" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white mb-4"><option value="">Any status</option><option>new</option><option>contacted</option><option>qualified</option><option>won</option><option>lost</option></select>
    <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Or paste recipients (comma / newline)</label>
    <textarea id="ml-to" rows="3" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-xs text-white mb-4 font-mono" placeholder="a@example.com, b@example.com"></textarea>
    <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Provider</label>
    <select id="ml-provider" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white"><option value="">Auto (active provider)</option></select>
    <p id="ml-count" class="text-xs text-gray-500 mt-4"></p>
  </div>
</section>

<section id="ml-log" class="mb-10">
  <h2 class="text-xl font-bold text-white mb-3"><i class="fas fa-scroll text-mk-gold mr-2"></i>Send Log</h2>
  <div class="overflow-x-auto bg-[#0d1b30] border border-blue-900/40 rounded-2xl">
    <table class="w-full text-sm">
      <thead><tr class="text-left text-gray-400 border-b border-blue-900/40"><th class="p-3">When (UTC)</th><th class="p-3">Provider</th><th class="p-3">Subject</th><th class="p-3">Funnel</th><th class="p-3">Recipients</th><th class="p-3">Result</th></tr></thead>
      <tbody id="ml-log-rows"><tr><td colspan="6" class="p-6 text-center text-gray-500">Loading…</td></tr></tbody>
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
    var r=await fetch('/api/mail/status',{headers:hdrs()}); var j=await r.json();
    if(!j.ok){ if(r.status===401){ var k=prompt('Admin key required:'); if(k){ localStorage.setItem(KEY_STORE,k); return loadStatus(); } } document.getElementById('ml-providers').innerHTML='<span class="text-red-400">'+esc(j.error)+'</span>'; return; }
    var provMap=j.providers||{}; var names=Object.keys(provMap);
    var anyOn=names.some(function(n){return provMap[n]});
    document.getElementById('ml-providers').innerHTML=(names.map(function(n){
      var on=provMap[n], act=(n===j.active);
      return '<span class="px-3 py-1.5 rounded-full border '+(act?'gold-bg text-black border-transparent font-bold':(on?'border-emerald-500/50 text-emerald-300':'border-blue-900/60 text-gray-500'))+'">'+esc(n)+(act?' • active':(on?' • ready':' • no key'))+'</span>';
    }).join(''))+(anyOn?'':' <span class="text-yellow-400 ml-2"><i class="fas fa-triangle-exclamation mr-1"></i>No mail provider configured — add a key in <a class="underline" href="/integrations">Integrations → Key Vault</a></span>');
    var sel=document.getElementById('ml-provider');
    sel.innerHTML='<option value="">Auto ('+(j.active||'none')+')</option>'+names.filter(function(n){return provMap[n]}).map(function(n){return '<option>'+n+'</option>'}).join('');
    var fsel=document.getElementById('ml-funnel');
    fsel.innerHTML='<option value="">All funnels</option>'+(j.segments||[]).map(function(s){return '<option value="'+esc(s.funnel)+'">'+esc(s.funnel)+' ('+s.n+' leads)</option>'}).join('');
    var total=(j.segments||[]).reduce(function(a,s){return a+(s.n||0)},0);
    document.getElementById('ml-count').textContent=total+' total leads with email on file';
    document.getElementById('ml-log-rows').innerHTML=(j.log&&j.log.length)?j.log.map(function(l){
      return '<tr class="border-b border-blue-900/20"><td class="p-3 text-gray-500">'+esc(l.created_at)+'</td><td class="p-3 text-mk-cyan">'+esc(l.provider)+'</td><td class="p-3 text-white">'+esc(l.subject)+'</td><td class="p-3 text-gray-400">'+esc(l.funnel||'all')+'</td><td class="p-3 text-gray-300">'+l.to_count+'</td><td class="p-3">'+(l.ok?'<span class="text-emerald-400">sent</span>':'<span class="text-red-400" title="'+esc(l.error)+'">failed</span>')+'</td></tr>';
    }).join(''):'<tr><td colspan="6" class="p-6 text-center text-gray-500">No sends yet.</td></tr>';
  }catch(e){ document.getElementById('ml-providers').innerHTML='<span class="text-red-400">'+esc(e.message)+'</span>'; }
}
async function sendMail(btn,test){
  var subject=document.getElementById('ml-subject').value.trim();
  var html=document.getElementById('ml-body').value.trim();
  var m=document.getElementById('ml-msg');
  if(!subject||!html){ m.textContent='Subject and message required'; return; }
  var body={subject:subject,html:html,test:!!test};
  var f=document.getElementById('ml-funnel').value; if(f) body.funnel=f;
  var st=document.getElementById('ml-lstatus').value; if(st) body.status=st;
  var p=document.getElementById('ml-provider').value; if(p) body.provider=p;
  var to=document.getElementById('ml-to').value.trim();
  if(to) body.to=to.split(/[\\s,;]+/).filter(function(x){return x.indexOf('@')>0});
  if(!test && !confirm('Send this campaign for real? Test first if you have not.')) return;
  btn.disabled=true; m.textContent=test?'Sending test…':'Sending campaign…';
  try{ var r=await fetch('/api/mail/send',{method:'POST',headers:hdrs({'Content-Type':'application/json'}),body:JSON.stringify(body)}); var j=await r.json();
    m.textContent=j.ok?('✅ Sent via '+j.provider+' to '+j.recipients+' recipient'+(j.recipients===1?'':'s')):('❌ '+(j.error||'failed'));
  }catch(e){ m.textContent='Error: '+e.message; }
  btn.disabled=false; loadStatus();
}
loadStatus();
</script>
`)
