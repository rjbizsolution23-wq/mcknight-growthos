import { shell, copyBlock } from './layout'

export const seoPage = () => shell('SEO / AEO / SGE Engine', 'seo', `
<section id="seo-hero" class="mb-10">
  <h1 class="text-3xl md:text-4xl font-extrabold text-white mb-2"><i class="fas fa-magnifying-glass-chart grad-text mr-2"></i>SEO · AEO · SGE <span class="grad-text">Engine</span></h1>
  <p class="text-gray-400 max-w-3xl">Generate a complete search pack for any funnel or client site: meta tags, Open Graph, Twitter cards, JSON-LD schema, sitemap.xml, robots.txt (AI-crawler ready), plus AEO answer blocks engineered for Google SGE / AI Overviews, ChatGPT Search, and Perplexity.</p>
  <div class="flex flex-wrap gap-2 mt-4 text-xs">
    <span class="bg-blue-500/15 text-blue-300 px-3 py-1 rounded-full"><i class="fas fa-check mr-1"></i>Classic SEO</span>
    <span class="bg-blue-500/15 text-blue-300 px-3 py-1 rounded-full"><i class="fas fa-check mr-1"></i>AEO (Answer Engine Optimization)</span>
    <span class="bg-blue-500/15 text-blue-300 px-3 py-1 rounded-full"><i class="fas fa-check mr-1"></i>SGE / AI Overviews</span>
    <span class="bg-blue-500/15 text-blue-300 px-3 py-1 rounded-full"><i class="fas fa-check mr-1"></i>OG Graph + Twitter Cards</span>
    <span class="bg-blue-500/15 text-blue-300 px-3 py-1 rounded-full"><i class="fas fa-check mr-1"></i>JSON-LD Schema</span>
    <span class="bg-blue-500/15 text-blue-300 px-3 py-1 rounded-full"><i class="fas fa-check mr-1"></i>GPTBot / AI-crawler robots.txt</span>
  </div>
</section>

<!-- GENERATOR -->
<section id="seo-generator" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-bolt text-brand-cyan mr-2"></i>SEO Pack Generator</h2>
  <div class="grid lg:grid-cols-2 gap-6">
    <form id="seo-form" class="card p-6 space-y-4">
      <div><label class="block text-xs font-semibold text-gray-300 mb-1">Business / Funnel Name *</label>
        <input name="name" required placeholder="Summit Realty Group" class="w-full bg-[#060a14] border border-blue-900/60 rounded-lg px-3 py-2 text-sm text-white"></div>
      <div><label class="block text-xs font-semibold text-gray-300 mb-1">Description (140–160 chars ideal) *</label>
        <textarea name="desc" required rows="3" placeholder="Albuquerque's data-driven home selling team. Free 24-hour home value reports, 340+ homes sold, average 4.2% over list price." class="w-full bg-[#060a14] border border-blue-900/60 rounded-lg px-3 py-2 text-sm text-white"></textarea></div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="block text-xs font-semibold text-gray-300 mb-1">Site URL *</label>
          <input name="url" required placeholder="https://summitrealty.com" class="w-full bg-[#060a14] border border-blue-900/60 rounded-lg px-3 py-2 text-sm text-white"></div>
        <div><label class="block text-xs font-semibold text-gray-300 mb-1">City (local SEO)</label>
          <input name="city" placeholder="Albuquerque" class="w-full bg-[#060a14] border border-blue-900/60 rounded-lg px-3 py-2 text-sm text-white"></div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div><label class="block text-xs font-semibold text-gray-300 mb-1">Niche / Schema type</label>
          <select name="niche" class="w-full bg-[#060a14] border border-blue-900/60 rounded-lg px-3 py-2 text-sm text-white">
            <option value="LocalBusiness">LocalBusiness (general)</option>
            <option value="RealEstateAgent">Real Estate</option>
            <option value="HealthClub">Fitness / Gym</option>
            <option value="ProfessionalService">Coaching / Consulting</option>
            <option value="Store">E-commerce</option>
            <option value="SoftwareApplication">SaaS</option>
            <option value="LegalService">Law Firm</option>
            <option value="HomeAndConstructionBusiness">Home Services</option>
            <option value="MedicalBusiness">Med Spa</option>
            <option value="InsuranceAgency">Insurance</option>
            <option value="MarketingAgency">Marketing Agency</option>
            <option value="AccountingService">Tax Resolution</option>
            <option value="FinancialService">Credit Repair</option>
          </select></div>
        <div><label class="block text-xs font-semibold text-gray-300 mb-1">Keywords (comma-sep)</label>
          <input name="keywords" placeholder="sell my house albuquerque, home value report" class="w-full bg-[#060a14] border border-blue-900/60 rounded-lg px-3 py-2 text-sm text-white"></div>
      </div>
      <div><label class="block text-xs font-semibold text-gray-300 mb-1">Logo / OG image URL</label>
        <input name="logo" placeholder="https://... (1200×630 recommended — defaults to RJ logo)" class="w-full bg-[#060a14] border border-blue-900/60 rounded-lg px-3 py-2 text-sm text-white"></div>
      <button type="submit" class="grad-bg text-white font-bold px-6 py-3 rounded-xl w-full"><i class="fas fa-wand-magic-sparkles mr-2"></i>Generate Full SEO Pack</button>
      <p class="text-[11px] text-gray-500">Also available as API: <code class="text-blue-300">GET /api/seo-pack?name=&desc=&url=&city=&niche=&keywords=</code></p>
    </form>

    <div id="seo-output" class="hidden space-y-4">
      <div class="card p-4"><div class="flex items-center justify-between mb-2"><h4 class="font-semibold text-white text-sm"><i class="fas fa-code text-brand-cyan mr-2"></i>Complete &lt;head&gt; Block (paste-ready)</h4>
        <button class="bg-gray-800 hover:bg-brand-cyan hover:text-white text-gray-300 text-xs px-3 py-1.5 rounded-lg" data-copy-target="seo-out-head"><i class="far fa-copy mr-1"></i>Copy</button></div>
        <pre id="seo-out-head" class="text-xs text-gray-300 bg-[#060a14] rounded-lg p-3 max-h-64 overflow-y-auto"></pre></div>
      <div class="card p-4"><div class="flex items-center justify-between mb-2"><h4 class="font-semibold text-white text-sm"><i class="fas fa-diagram-project text-brand-cyan mr-2"></i>JSON-LD Schema</h4>
        <button class="bg-gray-800 hover:bg-brand-cyan hover:text-white text-gray-300 text-xs px-3 py-1.5 rounded-lg" data-copy-target="seo-out-schema"><i class="far fa-copy mr-1"></i>Copy</button></div>
        <pre id="seo-out-schema" class="text-xs text-gray-300 bg-[#060a14] rounded-lg p-3 max-h-48 overflow-y-auto"></pre></div>
      <div class="grid grid-cols-2 gap-4">
        <div class="card p-4"><div class="flex items-center justify-between mb-2"><h4 class="font-semibold text-white text-sm">sitemap.xml</h4>
          <button class="bg-gray-800 hover:bg-brand-cyan hover:text-white text-gray-300 text-xs px-3 py-1.5 rounded-lg" data-copy-target="seo-out-sitemap"><i class="far fa-copy mr-1"></i>Copy</button></div>
          <pre id="seo-out-sitemap" class="text-[11px] text-gray-300 bg-[#060a14] rounded-lg p-3 max-h-40 overflow-y-auto"></pre></div>
        <div class="card p-4"><div class="flex items-center justify-between mb-2"><h4 class="font-semibold text-white text-sm">robots.txt (AI-ready)</h4>
          <button class="bg-gray-800 hover:bg-brand-cyan hover:text-white text-gray-300 text-xs px-3 py-1.5 rounded-lg" data-copy-target="seo-out-robots"><i class="far fa-copy mr-1"></i>Copy</button></div>
          <pre id="seo-out-robots" class="text-[11px] text-gray-300 bg-[#060a14] rounded-lg p-3 max-h-40 overflow-y-auto"></pre></div>
      </div>
      <div class="card p-4"><div class="flex items-center justify-between mb-2"><h4 class="font-semibold text-white text-sm"><i class="fas fa-robot text-brand-cyan mr-2"></i>AEO Answer Block (for SGE / AI Overviews)</h4>
        <button class="bg-gray-800 hover:bg-brand-cyan hover:text-white text-gray-300 text-xs px-3 py-1.5 rounded-lg" data-copy-target="seo-out-aeo"><i class="far fa-copy mr-1"></i>Copy</button></div>
        <pre id="seo-out-aeo" class="text-xs text-gray-300 bg-[#060a14] rounded-lg p-3 max-h-48 overflow-y-auto"></pre></div>
    </div>
  </div>
</section>

<!-- FUNNEL SEO PARAMS -->
<section id="seo-funnel-params" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-link text-brand-cyan mr-2"></i>Built-In Funnel SEO (every template, automatic)</h2>
  <div class="card p-6 mb-4">
    <p class="text-sm text-gray-300 mb-4">Every one of the 15 live templates now auto-generates <strong class="text-white">title, meta description, robots, OG graph, Twitter cards, and JSON-LD ProfessionalService schema</strong> — and every field is overridable via URL parameters:</p>
    <div class="overflow-x-auto"><table class="w-full text-xs text-left">
      <thead><tr class="text-blue-300 border-b border-blue-900/50"><th class="py-2 pr-4">Param</th><th class="py-2 pr-4">Does</th><th class="py-2">Example</th></tr></thead>
      <tbody class="text-gray-300 divide-y divide-blue-900/30">
        <tr><td class="py-2 pr-4 font-mono text-blue-300">seoTitle</td><td class="py-2 pr-4">Overrides page title + OG/Twitter title</td><td class="py-2 font-mono">seoTitle=Sell Fast in ABQ</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">seoDesc</td><td class="py-2 pr-4">Meta + OG + Twitter description</td><td class="py-2 font-mono">seoDesc=Free 24hr home value report</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">seoKeywords</td><td class="py-2 pr-4">Meta keywords tag</td><td class="py-2 font-mono">seoKeywords=sell home,realtor</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">canonical</td><td class="py-2 pr-4">Canonical URL + og:url</td><td class="py-2 font-mono">canonical=https://mysite.com/sell</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">ogImage</td><td class="py-2 pr-4">OG + Twitter share image (1200×630)</td><td class="py-2 font-mono">ogImage=https://.../share.jpg</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">theme=dark</td><td class="py-2 pr-4"><strong class="text-white">Dark background mode</strong> — flips the entire funnel to RJ Navy dark</td><td class="py-2 font-mono">theme=dark</td></tr>
        <tr><td class="py-2 pr-4 font-mono text-blue-300">noindex=1</td><td class="py-2 pr-4">Blocks indexing (drafts/tests)</td><td class="py-2 font-mono">noindex=1</td></tr>
      </tbody>
    </table></div>
  </div>
  ${copyBlock('seo-example-url', 'Example: fully SEO-loaded dark funnel URL', `/t/real-estate?agentName=Rick Jefferson&city=Albuquerque&theme=dark&seoTitle=Sell Your ABQ Home in 11 Days — Summit Realty&seoDesc=Free 24-hour home value report from Albuquerque's #1 data-driven listing team. 340+ homes sold, 4.2% over list average.&seoKeywords=sell my house albuquerque,albuquerque realtor,home value report&canonical=https://summitrealty.com/sell&ogImage=https://summitrealty.com/og-share.jpg`)}
</section>

<!-- CHECKLISTS -->
<section id="seo-checklists" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-list-check text-brand-cyan mr-2"></i>The 2026 Search Trinity — Launch Checklists</h2>
  <div class="grid md:grid-cols-3 gap-4">
    <div class="card p-5">
      <h3 class="font-bold text-white mb-3"><i class="fas fa-magnifying-glass text-blue-400 mr-2"></i>Classic SEO</h3>
      <ul class="text-xs text-gray-300 space-y-2">
        <li>✅ Title ≤60 chars, primary keyword first</li>
        <li>✅ Meta description 140–160 chars with CTA</li>
        <li>✅ One H1; logical H2/H3 hierarchy</li>
        <li>✅ Canonical URL on every page</li>
        <li>✅ sitemap.xml submitted to Search Console</li>
        <li>✅ Core Web Vitals: LCP &lt;2.5s, INP &lt;200ms, CLS &lt;0.1</li>
        <li>✅ Descriptive alt text on all images</li>
        <li>✅ Internal links — zero orphan pages</li>
        <li>✅ HTTPS + mobile-first (375px tested)</li>
      </ul>
    </div>
    <div class="card p-5">
      <h3 class="font-bold text-white mb-3"><i class="fas fa-comments text-blue-400 mr-2"></i>AEO — Answer Engines</h3>
      <ul class="text-xs text-gray-300 space-y-2">
        <li>✅ FAQPage JSON-LD on every FAQ section</li>
        <li>✅ Question-form H2s ("How much does X cost?")</li>
        <li>✅ 40–60 word direct answers right under each question</li>
        <li>✅ Speakable, quotable sentences (AI engines lift verbatim)</li>
        <li>✅ Stats + numbers with sources (AI loves citable data)</li>
        <li>✅ HowTo schema for process content</li>
        <li>✅ Entity consistency: same NAP everywhere</li>
        <li>✅ Author/Person schema for E-E-A-T</li>
      </ul>
    </div>
    <div class="card p-5">
      <h3 class="font-bold text-white mb-3"><i class="fas fa-robot text-blue-400 mr-2"></i>SGE / AI Overviews</h3>
      <ul class="text-xs text-gray-300 space-y-2">
        <li>✅ robots.txt allows GPTBot, Google-Extended, PerplexityBot, ClaudeBot</li>
        <li>✅ First 100 words answer the core query directly</li>
        <li>✅ Comparison tables (SGE loves structured comparisons)</li>
        <li>✅ "Best / vs / cost / near me" query coverage</li>
        <li>✅ Fresh dates in content + lastmod in sitemap</li>
        <li>✅ Organization schema linking all social profiles (sameAs)</li>
        <li>✅ Reviews/aggregateRating schema where truthful</li>
        <li>✅ Original data → the citation magnet strategy</li>
      </ul>
    </div>
  </div>
</section>

<!-- SCHEMA LIBRARY -->
<section id="seo-schema-library" class="mb-12">
  <h2 class="text-2xl font-bold text-white mb-4"><i class="fas fa-cubes text-brand-cyan mr-2"></i>Schema Library (copy-paste JSON-LD)</h2>
  ${copyBlock('seo-schema-faq', 'FAQPage schema (fill in your Q&As)', `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    { "@type": "Question", "name": "How much does it cost?",
      "acceptedAnswer": { "@type": "Answer", "text": "Pricing starts at $X/month with no long-term contract. Most clients choose the $Y plan which includes..." } },
    { "@type": "Question", "name": "How long does it take to see results?",
      "acceptedAnswer": { "@type": "Answer", "text": "Most clients see first results within X–Y weeks. Full outcomes typically develop over Z months depending on..." } }
  ]
}
<\/script>`)}
  ${copyBlock('seo-schema-review', 'AggregateRating schema (ONLY with real, verifiable reviews)', `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "YOUR BUSINESS",
  "aggregateRating": { "@type": "AggregateRating", "ratingValue": "4.9", "reviewCount": "127" }
}
<\/script>
<!-- ⚠️ FTC: ratings must reflect genuine reviews you can substantiate. Fabricated review schema = deceptive practice. -->`)}
  ${copyBlock('seo-schema-howto', 'HowTo schema (process/service pages)', `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to [achieve outcome]",
  "step": [
    { "@type": "HowToStep", "name": "Step 1 name", "text": "What happens in step 1." },
    { "@type": "HowToStep", "name": "Step 2 name", "text": "What happens in step 2." },
    { "@type": "HowToStep", "name": "Step 3 name", "text": "What happens in step 3." }
  ]
}
<\/script>`)}
  ${copyBlock('seo-schema-breadcrumb', 'BreadcrumbList schema', `<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://yoursite.com/" },
    { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://yoursite.com/services" },
    { "@type": "ListItem", "position": 3, "name": "This Page", "item": "https://yoursite.com/services/this-page" }
  ]
}
<\/script>`)}
</section>
`)
