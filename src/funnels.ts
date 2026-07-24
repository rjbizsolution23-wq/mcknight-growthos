// ── Single source of truth: every live funnel template slug ────
export const FUNNEL_SLUGS = [
  'event-landing', 'sponsor-deck', 'tax-lead', 'credit-service', 'credit-saas',
  'real-estate', 'fitness', 'coaching', 'ecommerce', 'saas-trial',
  'law-firm', 'home-services', 'med-spa', 'insurance', 'agency',
  'restaurant', 'dental', 'auto-services', 'salon', 'mortgage',
  'chiropractic', 'pet-care', 'landscaping', 'cleaning', 'childcare',
  'tutoring', 'accounting', 'photography', 'wedding-venue', 'moving',
  'webinar-live', 'vsl',
  // v6.0 brand flagship sites — full fleet
  'opportunity-group', 'contracting-preacher', 'housing-initiative', 'capital-ready',
  'mortgageos', 'growth-command', 'freight-systems', 'fleetworks',
  'early-learning', 'learningos',
] as const

export type FunnelSlug = typeof FUNNEL_SLUGS[number]
export const isFunnelSlug = (s: string): s is FunnelSlug => (FUNNEL_SLUGS as readonly string[]).includes(s)

// ── v6.0: Brand flagship sites — blueprint-authored copy is canonical.
// The AI SEO agent must NEVER override titles/descriptions on these:
// brand taglines, compliance language and attribution are hand-written.
export const BRAND_SITE_SLUGS = new Set<string>([
  'opportunity-group', 'contracting-preacher', 'housing-initiative', 'capital-ready',
  'mortgageos', 'growth-command', 'freight-systems', 'fleetworks',
  'early-learning', 'learningos',
])
