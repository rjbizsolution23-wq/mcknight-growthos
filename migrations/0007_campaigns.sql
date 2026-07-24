-- v6.5: Traffic Engine — saved social campaigns (post → traffic → funnel)
CREATE TABLE IF NOT EXISTS campaigns (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  funnel TEXT NOT NULL,
  brand TEXT DEFAULT '',
  business TEXT DEFAULT '',
  campaign TEXT NOT NULL,
  funnel_url TEXT NOT NULL,
  posts TEXT NOT NULL,            -- JSON {facebook, instagram, linkedin, x, tiktok}
  brief TEXT DEFAULT '',
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_campaigns_funnel ON campaigns(funnel);
CREATE INDEX IF NOT EXISTS idx_campaigns_campaign ON campaigns(campaign);
