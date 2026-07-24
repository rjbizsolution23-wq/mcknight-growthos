-- v6.2 Fleet Verification & Launch-Readiness Command Center
-- Every P0/P1/P2 verification item from the fleet framework, trackable per brand.
-- Launch gates: a brand's public "production claims" stay locked until every
-- blocking item for that brand is verified (or marked not-applicable).

CREATE TABLE IF NOT EXISTS verification_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  priority TEXT NOT NULL DEFAULT 'P0',            -- P0 | P1 | P2
  section TEXT NOT NULL,                          -- legal-entity | name-clearance | domains | founder | brand-assets | offers | pricing | compliance | case-studies | testimonials | portfolio | sops | staffing | tech-inventory | dev-access | data-migration | integrations | policies | support | monitoring | founder-packet
  brand TEXT NOT NULL DEFAULT 'fleet',            -- brand key (mog/contracting/...) or 'fleet'
  item TEXT NOT NULL,                             -- short title
  detail TEXT DEFAULT '',                         -- required fields / evidence spec
  status TEXT NOT NULL DEFAULT 'pending',         -- pending | in_progress | received | verified | blocked | na
  blocking INTEGER NOT NULL DEFAULT 0,            -- 1 = launch gate for this brand
  evidence TEXT DEFAULT '',                       -- doc link / reference once provided
  notes TEXT DEFAULT '',
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_verify_brand ON verification_items(brand);
CREATE INDEX IF NOT EXISTS idx_verify_status ON verification_items(status);
CREATE INDEX IF NOT EXISTS idx_verify_priority ON verification_items(priority);
