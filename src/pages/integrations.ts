import { shell, copyBlock } from './layout'

export const integrationsPage = () => shell('Integration Hub', 'integrations', `
<section id="int-hero" class="mb-10">
  <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2"><i class="fas fa-plug grad-text mr-2"></i>Integration <span class="grad-text">Hub</span></h1>
  <p class="text-gray-400 max-w-3xl">GoHighLevel, Stripe, Email, Zapier/Make, Slack, Discord, Telegram, Twilio SMS and Airtable — all wired into every funnel out of the box. On each lead, every configured channel fires <strong class="text-white">in parallel</strong>. Add only the secrets you want; nothing can ever break a funnel.</p>
  <div id="int-status" class="mt-4 flex gap-2 text-xs flex-wrap">
    <span id="int-status-ghl" class="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full"><i class="fas fa-arrows-rotate mr-1"></i>GoHighLevel: checking…</span>
    <span id="int-status-stripe" class="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full"><i class="fab fa-stripe mr-1"></i>Stripe: checking…</span>
    <span id="int-status-email" class="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full"><i class="fas fa-envelope mr-1"></i>Email: checking…</span>
    <span id="int-status-webhook" class="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full"><i class="fas fa-bolt mr-1"></i>Zapier/Make: checking…</span>
    <span id="int-status-slack" class="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full"><i class="fab fa-slack mr-1"></i>Slack: checking…</span>
    <span id="int-status-discord" class="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full"><i class="fab fa-discord mr-1"></i>Discord: checking…</span>
    <span id="int-status-telegram" class="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full"><i class="fab fa-telegram mr-1"></i>Telegram: checking…</span>
    <span id="int-status-twilio" class="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full"><i class="fas fa-comment-sms mr-1"></i>Twilio SMS: checking…</span>
    <span id="int-status-airtable" class="bg-gray-800 text-gray-400 px-3 py-1.5 rounded-full"><i class="fas fa-table mr-1"></i>Airtable: checking…</span>
  </div>
</section>

<!-- v2.0 KEY VAULT -->
<section id="int-vault" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-2"><i class="fas fa-vault text-mk-gold mr-2"></i>Key Vault <span class="text-[10px] gold-bg text-black font-mono ml-1 align-middle px-1.5 py-0.5 rounded">v2.0 · NO REDEPLOY NEEDED</span></h2>
  <p class="text-gray-400 text-sm mb-5 max-w-3xl">Upload your keys as a <code class="text-mk-goldLight">.env</code> file (or paste them) and every key <strong class="text-white">auto-routes to its integration instantly</strong> — email, GHL, Stripe, alerts, mailers. Vault keys override deployed secrets, take effect in seconds, and never require a redeploy.</p>

  <div class="grid lg:grid-cols-2 gap-5 mb-6">
    <div class="card p-6">
      <h3 class="font-bold text-white text-sm mb-3"><i class="fas fa-file-arrow-up text-mk-gold mr-2"></i>Upload .env File</h3>
      <p class="text-xs text-gray-400 mb-3">Standard <code class="text-blue-300">KEY=value</code> format — comments, quotes and <code class="text-blue-300">export</code> prefixes are handled. Unknown keys are safely ignored and reported.</p>
      <input type="file" id="kv-file" accept=".env,.txt,text/plain" class="block w-full text-xs text-gray-400 mb-3 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-mk-gold file:text-black hover:file:opacity-90 file:cursor-pointer">
      <button onclick="uploadEnvFile(this)" class="gold-bg text-black font-bold px-5 py-2.5 rounded-xl text-sm hover:opacity-90"><i class="fas fa-upload mr-2"></i>Upload &amp; Route Keys</button>
    </div>
    <div class="card p-6">
      <h3 class="font-bold text-white text-sm mb-3"><i class="fas fa-paste text-mk-gold mr-2"></i>Or Paste Keys</h3>
      <textarea id="kv-paste" rows="4" class="w-full bg-[#060a14] border border-blue-900/60 rounded-xl px-3 py-2.5 text-xs text-white font-mono mb-3" placeholder="RESEND_API_KEY=re_xxxx&#10;GHL_API_KEY=pit-xxxx&#10;STRIPE_SECRET_KEY=sk_live_xxxx"></textarea>
      <button onclick="uploadEnvText(this)" class="border border-mk-gold/50 text-mk-goldLight font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-mk-gold/10"><i class="fas fa-route mr-2"></i>Route Pasted Keys</button>
    </div>
  </div>
  <p id="kv-msg" class="text-sm text-gray-400 mb-5"></p>

  <h3 class="font-bold text-white text-sm mb-3"><i class="fas fa-list-check text-mk-gold mr-2"></i>Key Status — All Integrations</h3>
  <div id="kv-groups" class="space-y-4"><p class="text-gray-500 text-sm">Loading vault…</p></div>
</section>

<!-- v3.4 FAN-OUT HUB -->
<section id="int-fanout" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-2"><i class="fas fa-tower-broadcast text-brand-cyan mr-2"></i>Lead Fan-Out <span class="text-[10px] text-amber-400 font-mono ml-1 align-middle">v3.4 · 6 CHANNELS</span></h2>
  <p class="text-gray-400 text-sm mb-5 max-w-3xl">Every lead simultaneously: saved to D1 → synced to GHL → emailed → <strong class="text-white">broadcast to every channel below that has secrets set</strong>. Test everything at once with the button at the bottom.</p>
  <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-5">

    <div class="card p-5">
      <h3 class="font-bold text-white text-sm mb-2"><i class="fas fa-bolt text-amber-400 mr-2"></i>Zapier / Make / n8n <span class="text-[9px] font-mono bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded">6,000+ APPS</span></h3>
      <p class="text-xs text-gray-400 mb-3">Generic JSON webhook → connect leads to Google Sheets, HubSpot, Salesforce, Notion, anything. Payload: <code class="text-blue-300">{event, at, funnel, lead{…}}</code></p>
      <ol class="text-[11px] text-gray-400 space-y-1 list-decimal list-inside mb-2">
        <li>Zapier: create Zap → trigger “Webhooks by Zapier → Catch Hook” → copy URL</li>
        <li>Make: add “Custom webhook” module → copy URL</li>
        <li><code class="text-blue-300">wrangler pages secret put LEAD_WEBHOOK_URL</code></li>
      </ol>
    </div>

    <div class="card p-5">
      <h3 class="font-bold text-white text-sm mb-2"><i class="fab fa-slack text-purple-400 mr-2"></i>Slack Alerts</h3>
      <p class="text-xs text-gray-400 mb-3">Rich lead card in any channel — name, funnel, contact info, campaign + link to the LeadFlow CRM.</p>
      <ol class="text-[11px] text-gray-400 space-y-1 list-decimal list-inside mb-2">
        <li>api.slack.com/apps → Create App → Incoming Webhooks → On</li>
        <li>“Add New Webhook to Workspace” → pick channel → copy URL</li>
        <li><code class="text-blue-300">wrangler pages secret put SLACK_WEBHOOK_URL</code></li>
      </ol>
    </div>

    <div class="card p-5">
      <h3 class="font-bold text-white text-sm mb-2"><i class="fab fa-discord text-indigo-400 mr-2"></i>Discord Alerts</h3>
      <p class="text-xs text-gray-400 mb-3">Branded embed card per lead — great for team servers or client war-rooms.</p>
      <ol class="text-[11px] text-gray-400 space-y-1 list-decimal list-inside mb-2">
        <li>Channel → ⚙️ Edit Channel → Integrations → Webhooks → New</li>
        <li>Copy Webhook URL</li>
        <li><code class="text-blue-300">wrangler pages secret put DISCORD_WEBHOOK_URL</code></li>
      </ol>
    </div>

    <div class="card p-5">
      <h3 class="font-bold text-white text-sm mb-2"><i class="fab fa-telegram text-sky-400 mr-2"></i>Telegram Alerts</h3>
      <p class="text-xs text-gray-400 mb-3">Lead pings straight to your phone (or a client group chat) via your own bot.</p>
      <ol class="text-[11px] text-gray-400 space-y-1 list-decimal list-inside mb-2">
        <li>Message <code class="text-blue-300">@BotFather</code> → /newbot → copy token</li>
        <li>Message your bot once, then visit <code class="text-blue-300">api.telegram.org/bot&lt;TOKEN&gt;/getUpdates</code> → copy <code class="text-blue-300">chat.id</code></li>
        <li>Set <code class="text-blue-300">TELEGRAM_BOT_TOKEN</code> + <code class="text-blue-300">TELEGRAM_CHAT_ID</code></li>
      </ol>
    </div>

    <div class="card p-5">
      <h3 class="font-bold text-white text-sm mb-2"><i class="fas fa-comment-sms text-red-400 mr-2"></i>Twilio SMS <span class="text-[9px] font-mono bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded">SPEED-TO-LEAD</span></h3>
      <p class="text-xs text-gray-400 mb-3">Text alert the second a lead lands — calling within 5 minutes multiplies contact rates.</p>
      <ol class="text-[11px] text-gray-400 space-y-1 list-decimal list-inside mb-2">
        <li>console.twilio.com → copy Account SID + Auth Token</li>
        <li>Buy/verify a From number; To = your cell</li>
        <li>Set <code class="text-blue-300">TWILIO_ACCOUNT_SID</code>, <code class="text-blue-300">TWILIO_AUTH_TOKEN</code>, <code class="text-blue-300">TWILIO_FROM</code>, <code class="text-blue-300">TWILIO_TO</code></li>
      </ol>
    </div>

    <div class="card p-5">
      <h3 class="font-bold text-white text-sm mb-2"><i class="fas fa-table text-yellow-400 mr-2"></i>Airtable Rows <span class="text-[9px] font-mono bg-blue-900/60 text-blue-300 px-1.5 py-0.5 rounded">CLIENT-SHAREABLE</span></h3>
      <p class="text-xs text-gray-400 mb-3">Every lead appended to a base — share a filtered view with each client, zero exports.</p>
      <ol class="text-[11px] text-gray-400 space-y-1 list-decimal list-inside mb-2">
        <li>airtable.com/create/tokens → PAT with <code class="text-blue-300">data.records:write</code> scope + your base</li>
        <li>Base with fields: Name, Email, Phone, Funnel, Source, Campaign, Payload, Created At</li>
        <li>Set <code class="text-blue-300">AIRTABLE_API_KEY</code>, <code class="text-blue-300">AIRTABLE_BASE_ID</code> (appXXXX from base URL), optional <code class="text-blue-300">AIRTABLE_TABLE</code> (default “Leads”)</li>
      </ol>
    </div>
  </div>

  <div class="card p-5 flex flex-wrap items-center gap-4">
    <div class="flex-1 min-w-[240px]">
      <h3 class="font-bold text-white text-sm mb-1"><i class="fas fa-vial-circle-check text-brand-success mr-2"></i>Test all channels at once</h3>
      <p class="text-xs text-gray-400">Sends a sample “Integration Test” lead through every configured channel and reports per-channel results. Nothing is saved to your LeadFlow CRM.</p>
    </div>
    <button id="btn-hooks-test" class="grad-bg text-white text-sm font-bold px-5 py-2.5 rounded-lg hover:opacity-90"><i class="fas fa-paper-plane mr-1"></i>Send Test Alert</button>
    <pre id="hooks-test-out" class="w-full text-xs text-gray-300 bg-[#060a14] border border-blue-900/40 rounded-lg p-3 hidden whitespace-pre-wrap"></pre>
  </div>
</section>

<!-- GOHIGHLEVEL -->
<section id="int-ghl" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-arrows-rotate text-brand-cyan mr-2"></i>GoHighLevel CRM Sync <span class="text-[10px] text-amber-400 font-mono ml-1 align-middle">v3.1 · API v2</span></h2>
  <div class="grid lg:grid-cols-2 gap-6 mb-4">
    <div class="card p-6">
      <h3 class="font-bold text-white mb-3">1 · Setup (5 minutes, works with your existing sub-account)</h3>
      <ol class="text-sm text-gray-300 space-y-2 list-decimal list-inside">
        <li>In your GHL sub-account: <span class="text-blue-300">Settings → Private Integrations → Create</span></li>
        <li>Scopes: <code class="text-blue-300">contacts.write</code>, <code class="text-blue-300">contacts.readonly</code>, <code class="text-blue-300">opportunities.write</code>, <code class="text-blue-300">locations.readonly</code> (+ <code class="text-blue-300">workflows.readonly</code> if enrolling)</li>
        <li>Copy the <code class="text-blue-300">pit-…</code> token + your <strong>Location ID</strong> (Settings → Business Profile)</li>
        <li>Local: add both to <code class="text-blue-300">.dev.vars</code> · Production:<br><code class="text-blue-300">npx wrangler pages secret put GHL_API_KEY</code><br><code class="text-blue-300">npx wrangler pages secret put GHL_LOCATION_ID</code></li>
        <li>Verify: open <a href="/api/ghl/status" target="_blank" class="text-blue-300 underline">/api/ghl/status</a> → <code class="text-emerald-300">connected: true</code></li>
      </ol>
      <div class="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-200">
        <i class="fas fa-shield-halved mr-1"></i><strong>Security:</strong> the PIT token lives server-side only (Cloudflare secret) — never in frontend code, never in a funnel URL, never in git.
      </div>
    </div>
    <div class="card p-6">
      <h3 class="font-bold text-white mb-3">2 · What happens on every lead — automatically</h3>
      <ul class="text-sm text-gray-300 space-y-2">
        <li><i class="fas fa-check text-emerald-400 mr-2"></i><strong>Contact upsert</strong> — dedupes by email/phone, so existing GHL contacts get updated, not duplicated</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i><strong>Auto-tags</strong> — <code class="text-blue-300">growthos</code> + <code class="text-blue-300">funnel-{slug}</code> (e.g. <code>funnel-mortgage</code>) + offer tag + <code>utm-{campaign}</code> → trigger your existing GHL automations off these</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i><strong>Attribution note</strong> — full form details + UTM/gclid/fbclid/ttclid + source URL pinned to the contact</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i><strong>Opportunity</strong> (optional) — auto-created in your pipeline when <code class="text-blue-300">GHL_PIPELINE_ID</code> + <code class="text-blue-300">GHL_STAGE_ID</code> are set</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i><strong>Workflow enrollment</strong> (optional) — every lead dropped into the workflow in <code class="text-blue-300">GHL_WORKFLOW_ID</code></li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i><strong>Never breaks the funnel</strong> — if GHL is down or unconfigured, the lead is still accepted + emailed</li>
      </ul>
      <p class="text-xs text-gray-500 mt-3">Per-funnel custom tags: add <code class="text-blue-300">?ghlTag=client-acme,spring-promo</code> to any funnel URL (or the Builder field) — those tags ride along on every lead from that link. Perfect for white-label client attribution.</p>
    </div>
  </div>
  ${copyBlock('int-ghl-test', 'Test the GHL sync from terminal (after secrets are set)', `# 1. Connection check
curl https://mcknight-growthos.pages.dev/api/ghl/status

# 2. Fire a test lead — watch it land in GHL Contacts with tags growthos + funnel-mortgage
curl -X POST https://mcknight-growthos.pages.dev/api/lead \\
  -H "Content-Type: application/json" \\
  -d '{"name":"GHL Test Lead","email":"ghltest@example.com","phone":"+15055550100","_source":"/t/mortgage?utm_campaign=test","utm_campaign":"test"}'`)}
  ${copyBlock('int-ghl-ids', 'Find your Pipeline / Stage / Workflow IDs (optional extras)', `# Pipelines + stage IDs (uses your same PIT token)
curl -H "Authorization: Bearer pit-XXXX" -H "Version: 2021-07-28" \\
  "https://services.leadconnectorhq.com/opportunities/pipelines?locationId=YOUR_LOCATION_ID"

# Workflows
curl -H "Authorization: Bearer pit-XXXX" -H "Version: 2021-07-28" \\
  "https://services.leadconnectorhq.com/workflows/?locationId=YOUR_LOCATION_ID"

# Then:
npx wrangler pages secret put GHL_PIPELINE_ID
npx wrangler pages secret put GHL_STAGE_ID
npx wrangler pages secret put GHL_WORKFLOW_ID`)}
</section>

<!-- STRIPE -->
<section id="int-stripe" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fab fa-stripe text-brand-cyan mr-2"></i>Stripe Payments</h2>
  <div class="grid lg:grid-cols-2 gap-6 mb-4">
    <div class="card p-6">
      <h3 class="font-bold text-white mb-3">1 · Setup (2 minutes)</h3>
      <ol class="text-sm text-gray-300 space-y-2 list-decimal list-inside">
        <li>Grab your secret key from <span class="text-blue-300">dashboard.stripe.com → Developers → API keys</span></li>
        <li>Local: copy <code class="text-blue-300">.dev.vars.example</code> → <code class="text-blue-300">.dev.vars</code>, paste key</li>
        <li>Production: <code class="text-blue-300">npx wrangler pages secret put STRIPE_SECRET_KEY</code></li>
        <li>Done. <code class="text-blue-300">POST /api/checkout</code> is live.</li>
      </ol>
      <div class="mt-4 bg-amber-500/10 border border-amber-500/30 rounded-lg p-3 text-xs text-amber-200">
        <i class="fas fa-shield-halved mr-1"></i><strong>Security:</strong> the secret key lives server-side only — never in frontend code, never in git. Test with <code>sk_test_</code> keys first.
      </div>
    </div>
    <div class="card p-6">
      <h3 class="font-bold text-white mb-3">2 · Use it — two modes</h3>
      <p class="text-xs text-gray-400 mb-2 font-semibold uppercase">A — Existing Stripe Price ID (recommended)</p>
      <pre class="text-xs text-gray-300 bg-[#060a14] rounded-lg p-3 mb-3">fetch('/api/checkout', { method:'POST',
  headers:{'Content-Type':'application/json'},
  body: JSON.stringify({ priceId:'price_xxx' })
}).then(r=>r.json()).then(d=>location.href=d.url)</pre>
      <p class="text-xs text-gray-400 mb-2 font-semibold uppercase">B — Ad-hoc price (one-time or subscription)</p>
      <pre class="text-xs text-gray-300 bg-[#060a14] rounded-lg p-3">// One-time $1,997 setup
{ name:'DFY Social Growth — Setup', amount:199700 }
// $997/mo subscription
{ name:'DFY Social Growth — Monthly', amount:99700, interval:'month' }</pre>
    </div>
  </div>
  ${copyBlock('int-stripe-button', 'Drop-in checkout button (paste into any funnel/page)', `<button onclick="fetch('/api/checkout',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:'DFY Social Growth — Setup',amount:199700})}).then(r=>r.json()).then(d=>{if(d.url)location.href=d.url;else alert(d.error)})" style="background:linear-gradient(135deg,#2563eb,#0ea5e9);color:#fff;font-weight:700;padding:16px 40px;border-radius:16px;border:none;font-size:18px;cursor:pointer">Get Started — $1,997 →</button>`)}
  ${copyBlock('int-stripe-tiers', 'GrowthOS 3-tier pricing wiring (Free / Pro / Enterprise pattern)', `// Tier buttons — swap in your real Stripe Price IDs
const TIERS = {
  starter:    { priceId: 'price_STARTER_ID' },     // e.g. $497/mo
  pro:        { priceId: 'price_PRO_ID' },         // e.g. $997/mo  ← "Most Popular"
  enterprise: { priceId: 'price_ENTERPRISE_ID' }   // e.g. $2,497/mo
}
document.querySelectorAll('[data-tier]').forEach(btn => btn.addEventListener('click', async () => {
  const r = await fetch('/api/checkout', { method:'POST', headers:{'Content-Type':'application/json'},
    body: JSON.stringify(TIERS[btn.dataset.tier]) })
  const d = await r.json()
  if (d.url) location.href = d.url; else alert(d.error)
}))`)}
</section>

<!-- EMAIL -->
<section id="int-email" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-envelope-open-text text-brand-cyan mr-2"></i>Email / Lead Delivery (Resend)</h2>
  <div class="grid lg:grid-cols-2 gap-6 mb-4">
    <div class="card p-6">
      <h3 class="font-bold text-white mb-3">1 · Setup (3 minutes)</h3>
      <ol class="text-sm text-gray-300 space-y-2 list-decimal list-inside">
        <li>Free account at <span class="text-blue-300">resend.com</span> (3,000 emails/mo free)</li>
        <li>Verify your sending domain (or use onboarding@resend.dev to test)</li>
        <li>Local: add <code class="text-blue-300">RESEND_API_KEY</code> + <code class="text-blue-300">LEAD_NOTIFY_EMAIL</code> to <code class="text-blue-300">.dev.vars</code></li>
        <li>Production: <code class="text-blue-300">npx wrangler pages secret put RESEND_API_KEY</code></li>
      </ol>
      <div class="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 text-xs text-blue-200">
        <i class="fas fa-wand-magic-sparkles mr-1"></i><strong>Already wired:</strong> all 8 lead-capture funnels (real estate, coaching, law, home services, med spa, insurance, agency, tax) POST to <code>/api/lead</code> automatically. You get a branded GrowthOS lead email for every submission.
      </div>
    </div>
    <div class="card p-6">
      <h3 class="font-bold text-white mb-3">2 · How the funnel forms behave</h3>
      <ul class="text-sm text-gray-300 space-y-2">
        <li><i class="fas fa-check text-emerald-400 mr-2"></i>Form fields auto-serialize to JSON + <code class="text-blue-300">_source</code> (page URL)</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i>Button shows spinner → "✓ Submitted!" state</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i>No API key yet? Lead still accepted (never breaks the funnel) — you just don't get the email until configured</li>
        <li><i class="fas fa-check text-emerald-400 mr-2"></i>TCPA consent checkboxes remain required on regulated verticals</li>
      </ul>
      <p class="text-xs text-gray-500 mt-3">GoHighLevel sync runs automatically alongside email (see the GHL section above) — or point a form at any external webhook via <code>data-lead-form="https://your-webhook-url"</code>.</p>
    </div>
  </div>
  ${copyBlock('int-lead-test', 'Test the lead API from terminal', `curl -X POST https://YOUR-DOMAIN/api/lead \\
  -H "Content-Type: application/json" \\
  -d '{"name":"Test Lead","email":"test@example.com","phone":"(505) 555-0100","_source":"manual-test"}'`)}
  ${copyBlock('int-lead-form', 'Add lead capture to ANY custom page', `<form data-lead-form>
  <input name="name" placeholder="Full name" required>
  <input name="email" type="email" placeholder="Email" required>
  <input name="phone" type="tel" placeholder="Phone">
  <label><input type="checkbox" required> I agree to be contacted by phone/text/email. Consent not required to purchase.</label>
  <button type="submit">Send My Info →</button>
</form>
<script src="/static/app.js"><\/script>`)}
</section>

<!-- SECRETS REFERENCE -->
<section id="int-secrets" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-key text-brand-cyan mr-2"></i>Secrets Reference</h2>
  <div class="card p-6 overflow-x-auto">
    <table class="w-full text-xs text-left">
      <thead><tr class="text-blue-300 border-b border-blue-900/50"><th class="py-2 pr-4">Secret</th><th class="py-2 pr-4">Used by</th><th class="py-2 pr-4">Required for</th><th class="py-2">Set with</th></tr></thead>
      <tbody class="text-gray-300 divide-y divide-blue-900/30">
        <tr><td class="py-2 pr-4 font-mono text-blue-300">STRIPE_SECRET_KEY</td><td class="py-2 pr-4">/api/checkout</td><td class="py-2 pr-4">Payments</td><td class="py-2 font-mono">wrangler pages secret put STRIPE_SECRET_KEY</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">RESEND_API_KEY</td><td class="py-2 pr-4">/api/lead</td><td class="py-2 pr-4">Lead emails</td><td class="py-2 font-mono">wrangler pages secret put RESEND_API_KEY</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">LEAD_NOTIFY_EMAIL</td><td class="py-2 pr-4">/api/lead</td><td class="py-2 pr-4">Where leads land (default: support@rjbusinesssolutions.org)</td><td class="py-2 font-mono">wrangler pages secret put LEAD_NOTIFY_EMAIL</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">LEAD_FROM_EMAIL</td><td class="py-2 pr-4">/api/lead</td><td class="py-2 pr-4">Sender identity (verified domain)</td><td class="py-2 font-mono">wrangler pages secret put LEAD_FROM_EMAIL</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">GHL_API_KEY</td><td class="py-2 pr-4">/api/lead · /api/ghl/status</td><td class="py-2 pr-4">GHL contact sync (PIT token)</td><td class="py-2 font-mono">wrangler pages secret put GHL_API_KEY</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">GHL_LOCATION_ID</td><td class="py-2 pr-4">/api/lead</td><td class="py-2 pr-4">Your sub-account location</td><td class="py-2 font-mono">wrangler pages secret put GHL_LOCATION_ID</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">GHL_PIPELINE_ID</td><td class="py-2 pr-4">/api/lead</td><td class="py-2 pr-4">Auto-opportunities (optional)</td><td class="py-2 font-mono">wrangler pages secret put GHL_PIPELINE_ID</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">GHL_STAGE_ID</td><td class="py-2 pr-4">/api/lead</td><td class="py-2 pr-4">Pipeline stage (with pipeline)</td><td class="py-2 font-mono">wrangler pages secret put GHL_STAGE_ID</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">GHL_WORKFLOW_ID</td><td class="py-2 pr-4">/api/lead</td><td class="py-2 pr-4">Workflow enrollment (optional)</td><td class="py-2 font-mono">wrangler pages secret put GHL_WORKFLOW_ID</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">LEAD_WEBHOOK_URL</td><td class="py-2 pr-4">/api/lead · /api/hooks/*</td><td class="py-2 pr-4">Zapier / Make / n8n / custom webhook</td><td class="py-2 font-mono">wrangler pages secret put LEAD_WEBHOOK_URL</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">SLACK_WEBHOOK_URL</td><td class="py-2 pr-4">/api/lead · /api/hooks/*</td><td class="py-2 pr-4">Slack lead alerts</td><td class="py-2 font-mono">wrangler pages secret put SLACK_WEBHOOK_URL</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">DISCORD_WEBHOOK_URL</td><td class="py-2 pr-4">/api/lead · /api/hooks/*</td><td class="py-2 pr-4">Discord lead alerts</td><td class="py-2 font-mono">wrangler pages secret put DISCORD_WEBHOOK_URL</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">TELEGRAM_BOT_TOKEN</td><td class="py-2 pr-4">/api/lead · /api/hooks/*</td><td class="py-2 pr-4">Telegram alerts (with chat id)</td><td class="py-2 font-mono">wrangler pages secret put TELEGRAM_BOT_TOKEN</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">TELEGRAM_CHAT_ID</td><td class="py-2 pr-4">/api/lead · /api/hooks/*</td><td class="py-2 pr-4">Destination chat/group</td><td class="py-2 font-mono">wrangler pages secret put TELEGRAM_CHAT_ID</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">TWILIO_ACCOUNT_SID</td><td class="py-2 pr-4">/api/lead · /api/hooks/*</td><td class="py-2 pr-4">SMS alerts (with 3 below)</td><td class="py-2 font-mono">wrangler pages secret put TWILIO_ACCOUNT_SID</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">TWILIO_AUTH_TOKEN</td><td class="py-2 pr-4">/api/lead · /api/hooks/*</td><td class="py-2 pr-4">Twilio auth</td><td class="py-2 font-mono">wrangler pages secret put TWILIO_AUTH_TOKEN</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">TWILIO_FROM / TWILIO_TO</td><td class="py-2 pr-4">/api/lead · /api/hooks/*</td><td class="py-2 pr-4">Sender number / your cell</td><td class="py-2 font-mono">wrangler pages secret put TWILIO_FROM · …TWILIO_TO</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">AIRTABLE_API_KEY</td><td class="py-2 pr-4">/api/lead · /api/hooks/*</td><td class="py-2 pr-4">Airtable rows (with base id)</td><td class="py-2 font-mono">wrangler pages secret put AIRTABLE_API_KEY</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">AIRTABLE_BASE_ID / AIRTABLE_TABLE</td><td class="py-2 pr-4">/api/lead · /api/hooks/*</td><td class="py-2 pr-4">Base (appXXXX) / table (default “Leads”)</td><td class="py-2 font-mono">wrangler pages secret put AIRTABLE_BASE_ID</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-amber-300">ADMIN_API_KEY</td><td class="py-2 pr-4">/api/leads* · /api/links · /api/ai/insights</td><td class="py-2 pr-4"><i class="fas fa-lock mr-1"></i>Locks the LeadFlow CRM + CSV export behind a key (recommended for production)</td><td class="py-2 font-mono">wrangler pages secret put ADMIN_API_KEY</td></tr>
      </tbody>
    </table>
  </div>
</section>

<script>
var KEY_STORE='growthos_admin_key';
function adminKey(){ return localStorage.getItem(KEY_STORE)||''; }
function kvHdrs(extra){ var h=extra||{}; var k=adminKey(); if(k) h['x-admin-key']=k; return h; }
function kvEsc(s){ return String(s==null?'':s).replace(/</g,'&lt;'); }
async function loadVault(){
  try{
    var r=await fetch('/api/keys',{headers:kvHdrs()}); var j=await r.json();
    if(!j.ok){ if(r.status===401){ var k=prompt('Admin key required to view the Key Vault:'); if(k){ localStorage.setItem(KEY_STORE,k); return loadVault(); } } document.getElementById('kv-groups').innerHTML='<p class="text-red-400 text-sm">'+kvEsc(j.error)+'</p>'; return; }
    var groups=j.groups||{}; var byGroup={};
    (j.keys||[]).forEach(function(k){ (byGroup[k.group]=byGroup[k.group]||[]).push(k); });
    document.getElementById('kv-groups').innerHTML=Object.keys(groups).map(function(g){
      var meta=groups[g], ks=byGroup[g]||[];
      var conf=ks.filter(function(k){return k.configured}).length;
      return '<div class="card p-5"><div class="flex items-center justify-between mb-3 flex-wrap gap-2"><h4 class="font-bold text-white text-sm"><i class="fas '+meta.icon+' text-mk-gold mr-2"></i>'+kvEsc(meta.title)+' <span class="text-[10px] text-gray-500 font-normal ml-1">'+kvEsc(meta.desc)+'</span></h4><span class="text-[10px] '+(conf?'text-emerald-400':'text-gray-600')+' font-mono">'+conf+'/'+ks.length+' configured</span></div><div class="overflow-x-auto"><table class="w-full text-xs"><tbody class="divide-y divide-blue-900/30">'+ks.map(function(k){
        return '<tr><td class="py-2 pr-3 font-mono text-blue-300 whitespace-nowrap">'+kvEsc(k.name)+'</td><td class="py-2 pr-3 text-gray-400">'+kvEsc(k.label)+'</td><td class="py-2 pr-3 whitespace-nowrap">'+(k.configured?'<span class="text-emerald-400"><i class="fas fa-circle-check mr-1"></i>'+kvEsc(k.masked)+'</span> <span class="text-[9px] text-gray-600 uppercase">'+k.source+'</span>':'<span class="text-gray-600">not set</span>')+'</td><td class="py-2 whitespace-nowrap text-right"><button onclick="setKey(\\''+k.name+'\\')" class="text-mk-cyan hover:underline mr-3">set</button>'+(k.source==='vault'?'<button onclick="delKey(\\''+k.name+'\\')" class="text-red-400 hover:underline">remove</button>':'')+'</td></tr>';
      }).join('')+'</tbody></table></div></div>';
    }).join('');
  }catch(e){ document.getElementById('kv-groups').innerHTML='<p class="text-red-400 text-sm">'+kvEsc(e.message)+'</p>'; }
}
async function uploadEnvText(btn){
  var text=document.getElementById('kv-paste').value.trim();
  if(!text){ document.getElementById('kv-msg').textContent='Nothing to upload'; return; }
  await pushEnv(btn,text); document.getElementById('kv-paste').value='';
}
async function uploadEnvFile(btn){
  var f=document.getElementById('kv-file').files[0];
  if(!f){ document.getElementById('kv-msg').textContent='Choose a .env file first'; return; }
  var text=await f.text(); await pushEnv(btn,text);
}
async function pushEnv(btn,text){
  var m=document.getElementById('kv-msg'); btn.disabled=true; m.textContent='Routing keys…';
  try{
    var r=await fetch('/api/keys/upload',{method:'POST',headers:kvHdrs({'Content-Type':'text/plain'}),body:text});
    var j=await r.json();
    if(!j.ok && r.status===401){ var k=prompt('Admin key required:'); if(k){ localStorage.setItem(KEY_STORE,k); btn.disabled=false; return pushEnv(btn,text); } }
    m.textContent=j.ok?('✅ '+j.message):('❌ '+(j.error||'failed'));
  }catch(e){ m.textContent='Error: '+e.message; }
  btn.disabled=false; loadVault(); if(typeof loadIntStatus==='function') try{loadIntStatus()}catch(e){}
}
async function setKey(name){
  var v=prompt('Value for '+name+':'); if(!v) return;
  var body={}; body[name]=v;
  var r=await fetch('/api/keys',{method:'POST',headers:kvHdrs({'Content-Type':'application/json'}),body:JSON.stringify(body)});
  var j=await r.json();
  document.getElementById('kv-msg').textContent=j.ok?('✅ '+name+' saved — live in seconds'):('❌ '+(j.error||'failed'));
  loadVault();
}
async function delKey(name){
  if(!confirm('Remove '+name+' from the vault? (Falls back to deployed secret if one exists)')) return;
  await fetch('/api/keys/'+name,{method:'DELETE',headers:kvHdrs()});
  loadVault();
}
loadVault();
</script>
`)
