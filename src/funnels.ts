// ── Single source of truth: every live funnel template slug ────
export const FUNNEL_SLUGS = [
  'event-landing', 'sponsor-deck', 'tax-lead', 'credit-service', 'credit-saas',
  'real-estate', 'fitness', 'coaching', 'ecommerce', 'saas-trial',
  'law-firm', 'home-services', 'med-spa', 'insurance', 'agency',
  'restaurant', 'dental', 'auto-services', 'salon', 'mortgage',
  'chiropractic', 'pet-care', 'landscaping', 'cleaning', 'childcare',
  'tutoring', 'accounting', 'photography', 'wedding-venue', 'moving',
  'webinar-live', 'vsl',
] as const

export type FunnelSlug = typeof FUNNEL_SLUGS[number]
export const isFunnelSlug = (s: string): s is FunnelSlug => (FUNNEL_SLUGS as readonly string[]).includes(s)
