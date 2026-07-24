// ── Webinar Command Center — host Zoom webinars from the platform ──
import { shell } from './layout'
import { FUNNEL_SLUGS } from '../funnels'

export const webinarsPage = () => shell('Webinar Command Center', 'webinars', `
<section id="zm-hero" class="mb-8">
  <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider"><i class="fas fa-video mr-1"></i> Zoom · Live Events</p>
  <h1 class="text-4xl font-extrabold text-white leading-tight mb-3">Webinar <span class="grad-text">Command Center</span></h1>
  <p class="text-gray-400 max-w-3xl">Create and run <strong class="text-white">Zoom webinars right from GrowthOS</strong>. Link an event to a funnel and every lead auto-registers with Zoom, gets a <strong class="text-white">unique join link instantly</strong>, and lands in LeadFlow, GHL, email and alerts — the complete webinar workflow on one platform.</p>
  <div class="mt-4 grid md:grid-cols-4 gap-3 max-w-4xl text-xs">
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-3"><p class="font-bold text-mk-gold mb-1"><i class="fas fa-key mr-1"></i>1. Connect Zoom</p><p class="text-gray-400">S2S OAuth app at <span class="text-gray-300">marketplace.zoom.us</span> → drop 3 keys in the <a href="/integrations" class="text-mk-cyan underline">Key Vault</a></p></div>
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-3"><p class="font-bold text-mk-gold mb-1"><i class="fas fa-calendar-plus mr-1"></i>2. Create event</p><p class="text-gray-400">Webinar (or auto-fallback to registration meeting) + cloud recording</p></div>
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-3"><p class="font-bold text-mk-gold mb-1"><i class="fas fa-filter mr-1"></i>3. Link a funnel</p><p class="text-gray-400">Registration page at <code>/t/webinar-live</code> — leads auto-register</p></div>
    <div class="bg-[#0d1b30] border border-blue-900/40 rounded-xl p-3"><p class="font-bold text-mk-gold mb-1"><i class="fas fa-paper-plane mr-1"></i>4. Fill the room</p><p class="text-gray-400">Email + <strong class="text-gray-300">SMS blast</strong> your lead segments below</p></div>
  </div>
</section>

<section id="zm-status" class="mb-8">
  <div id="zm-conn" class="text-sm text-gray-400"><i class="fas fa-arrows-rotate mr-1"></i>Checking Zoom connection…</div>
</section>

<section id="zm-create" class="mb-10 bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
  <h2 class="text-xl font-bold text-white mb-4"><i class="fas fa-calendar-plus text-mk-gold mr-2"></i>Schedule a Webinar</h2>
  <div class="grid md:grid-cols-2 gap-4 mb-4">
    <div>
      <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Topic *</label>
      <input id="zm-topic" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white" placeholder="The Client-Getting System Nobody Is Teaching">
    </div>
    <div>
      <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Linked funnel (auto-registers its leads)</label>
      <select id="zm-funnel" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white">
        <option value="">— none —</option>
        ${FUNNEL_SLUGS.map((s) => `<option${s === 'webinar-live' ? ' selected' : ''}>${s}</option>`).join('')}
      </select>
    </div>
  </div>
  <div class="grid md:grid-cols-4 gap-4 mb-4">
    <div>
      <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Date &amp; time *</label>
      <input id="zm-start" type="datetime-local" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white">
    </div>
    <div>
      <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Duration (min)</label>
      <input id="zm-duration" type="number" value="60" min="10" max="720" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white">
    </div>
    <div>
      <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Timezone</label>
      <select id="zm-tz" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white">
        <option>America/Chicago</option><option>America/Denver</option><option>America/New_York</option><option>America/Los_Angeles</option><option>America/Phoenix</option><option>UTC</option>
      </select>
    </div>
    <div class="flex items-end">
      <button onclick="createEvent(this)" class="gold-bg text-black font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90 w-full"><i class="fas fa-video mr-2"></i>Create Event</button>
    </div>
  </div>
  <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Agenda (optional)</label>
  <textarea id="zm-agenda" rows="2" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-xs text-white" placeholder="What attendees will learn…"></textarea>
  <p class="text-[11px] text-gray-600 mt-2">Tries a true Zoom <strong>webinar</strong> first; if your account has no webinar license it transparently falls back to a <strong>registration-enabled meeting</strong> — same funnel workflow either way. Cloud recording is on automatically.</p>
  <p id="zm-msg" class="text-sm text-gray-400 mt-3"></p>
</section>

<section id="zm-list" class="mb-10">
  <h2 class="text-xl font-bold text-white mb-3"><i class="fas fa-calendar-days text-mk-gold mr-2"></i>Your Events</h2>
  <div class="overflow-x-auto bg-[#0d1b30] border border-blue-900/40 rounded-2xl">
    <table class="w-full text-sm">
      <thead><tr class="text-left text-gray-400 border-b border-blue-900/40"><th class="p-3">Topic</th><th class="p-3">Kind</th><th class="p-3">Start</th><th class="p-3">Funnel page</th><th class="p-3">Registrants</th><th class="p-3">Links</th><th class="p-3"></th></tr></thead>
      <tbody id="zm-rows"><tr><td colspan="7" class="p-6 text-center text-gray-500">Loading…</td></tr></tbody>
    </table>
  </div>
  <p class="text-[11px] text-gray-600 mt-2"><i class="fas fa-lightbulb text-mk-gold mr-1"></i>Share the <strong>funnel page link</strong> in ads/emails — leads who sign up there are auto-registered with Zoom and shown their personal join link on the spot. <strong>Start</strong> is your host link.</p>
</section>

<section id="zm-sms" class="mb-10 bg-[#0d1b30] border border-blue-900/40 rounded-2xl p-6">
  <h2 class="text-xl font-bold text-white mb-1"><i class="fas fa-comment-sms text-mk-gold mr-2"></i>SMS Blast <span class="text-xs font-normal text-gray-500 ml-2">Twilio · fill the room by text</span></h2>
  <div id="sms-conn" class="text-xs text-gray-500 mb-4">Checking Twilio…</div>
  <div class="grid md:grid-cols-3 gap-4 mb-4">
    <div>
      <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Segment</label>
      <select id="sms-funnel" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white"><option value="">All leads with a phone</option></select>
    </div>
    <div class="md:col-span-2">
      <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Manual numbers (optional — overrides segment)</label>
      <input id="sms-to" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white font-mono" placeholder="+15055550101, +15055550102">
    </div>
  </div>
  <label class="block text-xs text-gray-400 mb-1 font-semibold uppercase tracking-wider">Message</label>
  <textarea id="sms-body" rows="3" maxlength="1600" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-4 py-3 text-sm text-white" placeholder="🔴 We're LIVE in 1 hour! Grab your seat: https://…  Reply STOP to opt out."></textarea>
  <div class="flex flex-wrap gap-3 mt-4">
    <button onclick="sendSms(this,false)" class="gold-bg text-black font-bold px-6 py-3 rounded-xl text-sm hover:opacity-90"><i class="fas fa-paper-plane mr-2"></i>Send Blast</button>
    <button onclick="sendSms(this,true)" class="border border-blue-900/60 text-gray-300 font-bold px-6 py-3 rounded-xl text-sm hover:bg-blue-900/20"><i class="fas fa-vial mr-2"></i>Send Test (to TWILIO_TO)</button>
  </div>
  <p class="text-[11px] text-gray-600 mt-3"><i class="fas fa-scale-balanced mr-1"></i>TCPA reminder: only text leads who gave SMS consent, include opt-out language, and honor STOP requests.</p>
  <p id="sms-msg" class="text-sm text-gray-400 mt-2"></p>
  <div id="sms-log" class="mt-4"></div>
</section>

<script>
var KEY_STORE='growthos_admin_key';
function adminKey(){ return localStorage.getItem(KEY_STORE)||''; }
function hdrs(extra){ var h=extra||{}; var k=adminKey(); if(k) h['x-admin-key']=k; return h; }
function esc(s){ return String(s==null?'':s).replace(/</g,'&lt;'); }

async function loadStatus(){
  try{
    var r=await fetch('/api/zoom/status',{headers:hdrs()}); var j=await r.json();
    if(!j.ok){ if(r.status===401){ var k=prompt('Admin key required:'); if(k){ localStorage.setItem(KEY_STORE,k); return loadStatus(); } } document.getElementById('zm-conn').innerHTML='<span class="text-red-400">'+esc(j.error)+'</span>'; return; }
    var conn=document.getElementById('zm-conn');
    if(!j.configured){
      conn.innerHTML='<span class="px-3 py-1.5 rounded-full border border-yellow-500/50 text-yellow-300 text-xs"><i class="fas fa-triangle-exclamation mr-1"></i>Zoom not connected — add <code>ZOOM_ACCOUNT_ID</code> + <code>ZOOM_CLIENT_ID</code> + <code>ZOOM_CLIENT_SECRET</code> in the <a class="underline" href="/integrations">Key Vault</a> (Server-to-Server OAuth app from marketplace.zoom.us)</span>';
    } else if(j.connected){
      conn.innerHTML='<span class="px-3 py-1.5 rounded-full border border-emerald-500/50 text-emerald-300 text-xs"><i class="fas fa-circle-check mr-1"></i>Connected as <strong>'+esc(j.account&&j.account.email)+'</strong>'+((j.account&&j.account.webinarLicense)?' · <i class="fas fa-certificate mr-0.5"></i>Webinar license':' · meetings mode (no webinar license — auto-fallback)')+'</span> <span class="text-xs text-gray-500 ml-2">'+(j.registrationsTotal||0)+' total registrations</span>';
    } else {
      conn.innerHTML='<span class="px-3 py-1.5 rounded-full border border-red-500/50 text-red-300 text-xs"><i class="fas fa-circle-xmark mr-1"></i>Keys set but verification failed: '+esc(j.error)+'</span>';
    }
    var rows=j.events||[];
    document.getElementById('zm-rows').innerHTML=rows.length?rows.map(function(w){
      var funnelLink=w.funnel?('<a class="text-mk-cyan hover:underline text-xs" target="_blank" href="/t/'+esc(w.funnel)+'?webinar='+encodeURIComponent(w.zoom_id)+'">/t/'+esc(w.funnel)+'</a>'):'—';
      var links=(w.start_url?'<a class="text-emerald-400 hover:underline text-xs mr-2" target="_blank" href="'+esc(w.start_url)+'">Start</a>':'')+(w.join_url?'<a class="text-mk-cyan hover:underline text-xs mr-2" target="_blank" href="'+esc(w.join_url)+'">Join</a>':'')+(w.registration_url?'<a class="text-gray-400 hover:underline text-xs" target="_blank" href="'+esc(w.registration_url)+'">Zoom reg</a>':'');
      return '<tr class="border-b border-blue-900/20"><td class="p-3 text-white font-semibold">'+esc(w.topic)+'</td><td class="p-3"><span class="text-xs px-2 py-0.5 rounded-full border '+(w.kind==='webinar'?'border-mk-gold/50 text-mk-goldLight':'border-blue-500/40 text-blue-300')+'">'+esc(w.kind)+'</span></td><td class="p-3 text-gray-400 text-xs">'+esc(w.start_time)+'<br><span class="text-gray-600">'+esc(w.timezone)+'</span></td><td class="p-3">'+funnelLink+'</td><td class="p-3 text-center"><button onclick="showRegs(\\''+esc(w.zoom_id)+'\\')" class="text-mk-cyan text-xs hover:underline">'+(w.registrants||0)+' <i class="fas fa-users ml-0.5"></i></button></td><td class="p-3">'+links+'</td><td class="p-3"><button onclick="delEvent(\\''+esc(w.zoom_id)+'\\')" class="text-red-400 text-xs hover:underline">cancel</button></td></tr>';
    }).join(''):'<tr><td colspan="7" class="p-6 text-center text-gray-500">No events yet — schedule your first webinar above.</td></tr>';
  }catch(e){ document.getElementById('zm-conn').innerHTML='<span class="text-red-400">'+esc(e.message)+'</span>'; }
}

async function createEvent(btn){
  var topic=document.getElementById('zm-topic').value.trim();
  var start=document.getElementById('zm-start').value;
  var m=document.getElementById('zm-msg');
  if(!topic||!start){ m.innerHTML='<span class="text-yellow-300">Topic and date/time are required.</span>'; return; }
  btn.disabled=true; var orig=btn.innerHTML; btn.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i>Creating…';
  try{
    var body={topic:topic,startTime:start,duration:parseInt(document.getElementById('zm-duration').value,10)||60,timezone:document.getElementById('zm-tz').value,agenda:document.getElementById('zm-agenda').value.trim(),funnel:document.getElementById('zm-funnel').value};
    var r=await fetch('/api/zoom/webinars',{method:'POST',headers:hdrs({'Content-Type':'application/json'}),body:JSON.stringify(body)});
    var j=await r.json();
    if(r.status===401){ var k=prompt('Admin key required:'); if(k){ localStorage.setItem(KEY_STORE,k); btn.disabled=false; btn.innerHTML=orig; return createEvent(btn); } }
    m.innerHTML=j.ok?('✅ '+esc(j.kind)+' created'+(body.funnel?(' — funnel page: <a class="text-mk-cyan underline" target="_blank" href="/t/'+esc(body.funnel)+'?webinar='+encodeURIComponent(j.event.id)+'">/t/'+esc(body.funnel)+'?webinar='+esc(j.event.id)+'</a>'):'')):('❌ '+esc(j.error||'failed'));
    if(j.ok) loadStatus();
  }catch(e){ m.innerHTML='<span class="text-red-400">'+esc(e.message)+'</span>'; }
  btn.disabled=false; btn.innerHTML=orig;
}

async function delEvent(id){
  if(!confirm('Cancel this event in Zoom?')) return;
  var r=await fetch('/api/zoom/webinars/'+encodeURIComponent(id),{method:'DELETE',headers:hdrs()});
  var j=await r.json();
  if(!j.ok) alert('Failed: '+(j.error||'unknown'));
  loadStatus();
}

async function showRegs(id){
  var r=await fetch('/api/zoom/webinars/'+encodeURIComponent(id)+'/registrants',{headers:hdrs()});
  var j=await r.json();
  if(!j.ok) return alert(j.error||'failed');
  var list=(j.stored||[]).map(function(x){return (x.name||'—')+' <'+x.email+'>'+(x.phone?(' '+x.phone):'');}).join('\\n');
  alert('Registrants ('+(j.stored||[]).length+' stored):\\n\\n'+(list||'None yet.'));
}

async function loadSms(){
  try{
    var r=await fetch('/api/sms/status',{headers:hdrs()}); var j=await r.json();
    if(!j.ok) return;
    var conn=document.getElementById('sms-conn');
    conn.innerHTML=j.configured?('<span class="text-emerald-300"><i class="fas fa-circle-check mr-1"></i>Twilio connected — sending from <strong>'+esc(j.from)+'</strong></span>'):('<span class="text-yellow-300"><i class="fas fa-triangle-exclamation mr-1"></i>Not connected — add <code>TWILIO_ACCOUNT_SID</code> + <code>TWILIO_AUTH_TOKEN</code> + <code>TWILIO_FROM</code> in the <a class="underline" href="/integrations">Key Vault</a></span>');
    var sel=document.getElementById('sms-funnel');
    if(sel.options.length<=1&&j.segments) sel.innerHTML='<option value="">All leads with a phone</option>'+j.segments.map(function(s){return '<option value="'+esc(s.funnel)+'">'+esc(s.funnel||'(unknown)')+' — '+s.n+' phones</option>'}).join('');
    if(j.log&&j.log.length){
      document.getElementById('sms-log').innerHTML='<p class="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-2">Recent blasts</p>'+j.log.slice(0,5).map(function(l){
        return '<div class="text-xs text-gray-400 border-b border-blue-900/20 py-1.5">'+(l.ok?'<span class="text-emerald-400">✓</span>':'<span class="text-red-400">✗</span>')+' '+l.sent_count+'/'+l.to_count+' sent · '+esc(l.funnel||'all')+' · '+esc((l.body||'').slice(0,60))+'… <span class="text-gray-600">'+esc(l.created_at)+'</span></div>';
      }).join('');
    }
  }catch(e){}
}

async function sendSms(btn,test){
  var body=document.getElementById('sms-body').value.trim();
  var m=document.getElementById('sms-msg');
  if(!body){ m.innerHTML='<span class="text-yellow-300">Write a message first.</span>'; return; }
  if(!test&&!confirm('Send this SMS blast now?')) return;
  btn.disabled=true; var orig=btn.innerHTML; btn.innerHTML='<i class="fas fa-spinner fa-spin mr-2"></i>Sending…';
  try{
    var payload={body:body,test:!!test};
    var to=document.getElementById('sms-to').value.trim();
    if(!test){ if(to) payload.to=to; else payload.funnel=document.getElementById('sms-funnel').value; }
    var r=await fetch('/api/sms/send',{method:'POST',headers:hdrs({'Content-Type':'application/json'}),body:JSON.stringify(payload)});
    var j=await r.json();
    if(r.status===401){ var k=prompt('Admin key required:'); if(k){ localStorage.setItem(KEY_STORE,k); btn.disabled=false; btn.innerHTML=orig; return sendSms(btn,test); } }
    m.innerHTML=j.ok?('✅ Sent '+j.sent+'/'+j.recipients+(test?' (test)':'')):('❌ '+esc(j.error||(j.errors&&j.errors[0])||'failed'));
    loadSms();
  }catch(e){ m.innerHTML='<span class="text-red-400">'+esc(e.message)+'</span>'; }
  btn.disabled=false; btn.innerHTML=orig;
}

loadStatus(); loadSms();
</script>
`)
