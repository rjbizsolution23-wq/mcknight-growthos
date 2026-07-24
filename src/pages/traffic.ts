// ── v6.5 Traffic Command Center — post → traffic → landing page ──
// One loop: pick a funnel (any brand/business) → AI writes platform
// posts with a UTM-tracked link → publish → every click + lead is
// attributed back to the campaign here. Multi-business by design:
// each campaign carries its own brand, business name and funnel.
import { shell } from './layout'

export const trafficPage = () => shell('Traffic Engine', 'traffic', `
<section id="tr-hero" class="mb-8">
  <p class="inline-block gold-bg text-black text-xs font-bold px-3 py-1.5 rounded-full mb-4 uppercase tracking-wider"><i class="fas fa-bullhorn mr-1"></i> Post → Traffic → Landing Page → Lead</p>
  <h1 class="text-4xl font-extrabold text-white leading-tight mb-3">Traffic <span class="grad-text">Engine</span></h1>
  <p class="text-gray-400 max-w-3xl">The full acquisition loop for every business you run: AI writes platform-native posts that drive UTM-tracked traffic into any of the 42 branded funnels — clicks, leads and conversions attribute back to each campaign automatically.</p>
</section>

<div class="grid lg:grid-cols-2 gap-6 mb-10">
  <section id="tr-create" class="card p-6">
    <h2 class="text-lg font-bold text-white mb-4"><i class="fas fa-wand-magic-sparkles text-mk-gold mr-2"></i>Launch a Campaign</h2>
    <div class="space-y-3">
      <label class="block"><span class="text-xs text-gray-400 font-medium">Funnel (the landing page traffic goes to)</span>
        <select id="tr-funnel" class="mt-1 w-full bg-[#060a14] border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200"></select>
      </label>
      <div class="grid grid-cols-2 gap-3">
        <label class="block"><span class="text-xs text-gray-400 font-medium">Business Name (any company you run)</span>
          <input id="tr-business" type="text" placeholder="McKnight Capital Ready" class="mt-1 w-full bg-[#060a14] border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200">
        </label>
        <label class="block"><span class="text-xs text-gray-400 font-medium">Campaign Name (for attribution)</span>
          <input id="tr-campaign" type="text" placeholder="summer-credit-push" class="mt-1 w-full bg-[#060a14] border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200">
        </label>
      </div>
      <label class="block"><span class="text-xs text-gray-400 font-medium">Brief (what's the offer / angle?)</span>
        <textarea id="tr-brief" rows="3" placeholder="Free credit readiness assessment for small business owners in New Mexico — education-first, no guarantees." class="mt-1 w-full bg-[#060a14] border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200"></textarea>
      </label>
      <label class="block"><span class="text-xs text-gray-400 font-medium">Extra funnel params (optional — brandColor=..., ghlTag=...)</span>
        <input id="tr-params" type="text" placeholder="ghlTag=summer-push&brandColor=059669" class="mt-1 w-full bg-[#060a14] border border-gray-700 rounded-lg px-3 py-2.5 text-sm text-gray-200 font-mono">
      </label>
      <button id="tr-go" class="w-full grad-bg text-white font-bold py-3.5 rounded-xl hover:opacity-90"><i class="fas fa-bolt mr-2"></i>Generate Campaign Posts →</button>
      <p id="tr-status" class="text-xs text-gray-500"></p>
    </div>
  </section>

  <section id="tr-loop" class="card p-6">
    <h2 class="text-lg font-bold text-white mb-4"><i class="fas fa-arrows-spin text-mk-cyan mr-2"></i>How the Loop Works</h2>
    <ol class="space-y-3 text-sm text-gray-300">
      <li class="flex gap-3"><span class="w-7 h-7 rounded-full gold-bg text-black font-extrabold text-xs flex items-center justify-center shrink-0">1</span><span><strong class="text-white">Post</strong> — AI writes FB / IG / LinkedIn / X / TikTok posts, each carrying your UTM-tracked funnel link.</span></li>
      <li class="flex gap-3"><span class="w-7 h-7 rounded-full gold-bg text-black font-extrabold text-xs flex items-center justify-center shrink-0">2</span><span><strong class="text-white">Traffic</strong> — clicks land on the branded funnel; views are counted per-funnel with zero latency.</span></li>
      <li class="flex gap-3"><span class="w-7 h-7 rounded-full gold-bg text-black font-extrabold text-xs flex items-center justify-center shrink-0">3</span><span><strong class="text-white">Capture</strong> — leads save to D1 with utm_source / medium / campaign + gclid / fbclid attribution.</span></li>
      <li class="flex gap-3"><span class="w-7 h-7 rounded-full gold-bg text-black font-extrabold text-xs flex items-center justify-center shrink-0">4</span><span><strong class="text-white">Follow-up</strong> — GHL sync, email, Twilio SMS speed-to-lead, Zoom webinar auto-registration, ClientOS pipeline.</span></li>
      <li class="flex gap-3"><span class="w-7 h-7 rounded-full gold-bg text-black font-extrabold text-xs flex items-center justify-center shrink-0">5</span><span><strong class="text-white">Attribute</strong> — every campaign's leads roll up below, so you double down on what converts.</span></li>
    </ol>
    <div class="mt-5 pt-4 border-t border-blue-900/40 grid grid-cols-3 gap-3 text-center">
      <div><p class="text-2xl font-extrabold text-white" id="tr-stat-campaigns">—</p><p class="text-[10px] text-gray-500 uppercase tracking-wider">Campaigns</p></div>
      <div><p class="text-2xl font-extrabold text-mk-goldLight" id="tr-stat-leads">—</p><p class="text-[10px] text-gray-500 uppercase tracking-wider">Attributed Leads</p></div>
      <div><p class="text-2xl font-extrabold text-emerald-400" id="tr-stat-sources">—</p><p class="text-[10px] text-gray-500 uppercase tracking-wider">Traffic Sources</p></div>
    </div>
  </section>
</div>

<section id="tr-result" class="mb-10 hidden">
  <h2 class="text-lg font-bold text-white mb-4"><i class="fas fa-share-nodes text-brand-pink mr-2"></i>Your Posts — copy, paste, publish</h2>
  <div class="card p-4 mb-4"><p class="text-xs text-gray-400 mb-1">Tracked funnel link (in every post):</p><a id="tr-url" target="_blank" class="text-mk-cyan text-sm break-all underline"></a></div>
  <div id="tr-posts" class="grid md:grid-cols-2 gap-4"></div>
</section>

<section id="tr-attribution" class="mb-10 grid md:grid-cols-2 gap-6">
  <div class="card p-6">
    <h2 class="text-lg font-bold text-white mb-4"><i class="fas fa-chart-pie text-mk-gold mr-2"></i>Leads by Source (30d)</h2>
    <div id="tr-sources" class="space-y-2 text-sm"><p class="text-gray-500">Loading…</p></div>
  </div>
  <div class="card p-6">
    <h2 class="text-lg font-bold text-white mb-4"><i class="fas fa-flag text-mk-cyan mr-2"></i>Leads by Campaign (30d)</h2>
    <div id="tr-campaigns-att" class="space-y-2 text-sm"><p class="text-gray-500">Loading…</p></div>
  </div>
</section>

<section id="tr-history" class="mb-10">
  <h2 class="text-lg font-bold text-white mb-4"><i class="fas fa-clock-rotate-left text-mk-gold mr-2"></i>Campaign History</h2>
  <div id="tr-list" class="space-y-3"><p class="text-gray-500 text-sm">Loading…</p></div>
</section>

<script>
(function(){
  var FUNNELS = []
  function esc(s){var d=document.createElement('div');d.textContent=String(s==null?'':s);return d.innerHTML}

  fetch('/api/funnels').then(function(r){return r.json()}).then(function(j){
    FUNNELS = j.funnels || []
    var sel = document.getElementById('tr-funnel')
    sel.innerHTML = FUNNELS.map(function(f){return '<option value="'+f+'">'+f+'</option>'}).join('')
  }).catch(function(){})

  function loadAttribution(){
    fetch('/api/traffic/attribution').then(function(r){return r.json()}).then(function(j){
      if(!j.ok) return
      var total = 0
      var srcEl = document.getElementById('tr-sources')
      srcEl.innerHTML = (j.bySource||[]).length ? (j.bySource||[]).map(function(s){ total += s.n; return '<div class="flex justify-between items-center bg-[#060a14] border border-blue-900/40 rounded-lg px-3 py-2"><span class="text-gray-300">'+esc(s.src)+'</span><span class="text-white font-bold">'+s.n+'</span></div>'}).join('') : '<p class="text-gray-500">No leads in window yet — launch a campaign above.</p>'
      var cEl = document.getElementById('tr-campaigns-att')
      cEl.innerHTML = (j.byCampaign||[]).length ? (j.byCampaign||[]).map(function(s){return '<div class="flex justify-between items-center bg-[#060a14] border border-blue-900/40 rounded-lg px-3 py-2"><span class="text-gray-300">'+esc(s.utm_campaign)+'</span><span class="text-mk-goldLight font-bold">'+s.n+'</span></div>'}).join('') : '<p class="text-gray-500">No campaign-attributed leads yet.</p>'
      document.getElementById('tr-stat-leads').textContent = total
      document.getElementById('tr-stat-sources').textContent = (j.bySource||[]).length
    }).catch(function(){})
  }

  function loadCampaigns(){
    fetch('/api/traffic/campaigns').then(function(r){return r.json()}).then(function(j){
      if(!j.ok) return
      document.getElementById('tr-stat-campaigns').textContent = (j.campaigns||[]).length
      var el = document.getElementById('tr-list')
      if(!(j.campaigns||[]).length){ el.innerHTML = '<p class="text-gray-500 text-sm">No campaigns yet.</p>'; return }
      el.innerHTML = j.campaigns.map(function(cp){
        return '<div class="card p-4"><div class="flex flex-wrap items-center justify-between gap-2 mb-2">'
          + '<div><span class="text-white font-bold">'+esc(cp.campaign)+'</span> <span class="text-xs text-gray-500 ml-2">'+esc(cp.funnel)+(cp.business?' · '+esc(cp.business):'')+'</span></div>'
          + '<div class="flex items-center gap-3"><span class="text-xs bg-emerald-900/50 text-emerald-300 px-2 py-1 rounded-full font-bold">'+cp.leads+' leads</span>'
          + '<a href="'+esc(cp.funnel_url)+'" target="_blank" class="text-xs text-mk-cyan underline">open funnel</a></div></div>'
          + '<details class="text-xs text-gray-400"><summary class="cursor-pointer hover:text-white">View posts</summary><div class="mt-2 space-y-2">'
          + Object.keys(cp.posts||{}).map(function(p){return '<div class="bg-[#060a14] border border-blue-900/40 rounded-lg p-3"><p class="text-mk-gold font-bold uppercase text-[10px] mb-1">'+esc(p)+'</p><p class="whitespace-pre-wrap text-gray-300">'+esc(cp.posts[p])+'</p></div>'}).join('')
          + '</div></details></div>'
      }).join('')
    }).catch(function(){})
  }

  document.getElementById('tr-go').addEventListener('click', function(){
    var btn = this, st = document.getElementById('tr-status')
    btn.disabled = true; btn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>AI is writing your posts…'
    st.textContent = ''
    fetch('/api/traffic/campaign', { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({
      funnel: document.getElementById('tr-funnel').value,
      business: document.getElementById('tr-business').value,
      campaign: document.getElementById('tr-campaign').value,
      brief: document.getElementById('tr-brief').value,
      params: document.getElementById('tr-params').value
    })}).then(function(r){return r.json()}).then(function(j){
      btn.disabled = false; btn.innerHTML = '<i class="fas fa-bolt mr-2"></i>Generate Campaign Posts →'
      if(!j.ok){ st.textContent = '❌ ' + (j.error||'failed'); return }
      st.textContent = '✅ Campaign "'+j.campaign+'" saved'
      document.getElementById('tr-url').textContent = j.funnelUrl
      document.getElementById('tr-url').href = j.funnelUrl
      var icons = {facebook:'fa-facebook',instagram:'fa-instagram',linkedin:'fa-linkedin',x:'fa-x-twitter',tiktok:'fa-tiktok'}
      document.getElementById('tr-posts').innerHTML = Object.keys(j.posts||{}).map(function(p){
        var id = 'tr-post-'+p
        return '<div class="card p-4"><div class="flex items-center justify-between mb-2"><p class="text-mk-gold font-bold uppercase text-xs"><i class="fab '+(icons[p]||'fa-share')+' mr-1"></i>'+esc(p)+'</p>'
          + '<button onclick="navigator.clipboard.writeText(document.getElementById(\\''+id+'\\').textContent).then(()=>{this.textContent=\\'✓ copied\\'})" class="text-[10px] text-mk-cyan border border-blue-800 px-2 py-1 rounded-lg hover:bg-blue-900/30">copy</button></div>'
          + '<p id="'+id+'" class="text-xs text-gray-300 whitespace-pre-wrap">'+esc(j.posts[p])+'</p></div>'
      }).join('')
      document.getElementById('tr-result').classList.remove('hidden')
      document.getElementById('tr-result').scrollIntoView({behavior:'smooth'})
      loadCampaigns(); loadAttribution()
    }).catch(function(e){ btn.disabled = false; btn.innerHTML = '<i class="fas fa-bolt mr-2"></i>Generate Campaign Posts →'; st.textContent = '❌ '+e })
  })

  loadAttribution(); loadCampaigns()
})()
</script>
`)
