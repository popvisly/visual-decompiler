-- 034_phase2_intelligence_vault.sql

-- 1. Create Agencies Table
CREATE TABLE IF NOT EXISTS agencies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  tier TEXT NOT NULL, -- e.g., 'Boutique', 'Enterprise'
  whitelabel_logo TEXT,
  primary_hex TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create Brands Table
CREATE TABLE IF NOT EXISTS brands (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  agency_id UUID NOT NULL REFERENCES agencies(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  market_sector TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Assets Table
CREATE TABLE IF NOT EXISTS assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_id UUID NOT NULL REFERENCES brands(id) ON DELETE CASCADE,
  type TEXT NOT NULL, -- 'STATIC', 'CAROUSEL', 'LANDING_PAGE'
  file_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Create Extractions Table
CREATE TABLE IF NOT EXISTS extractions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID NOT NULL UNIQUE REFERENCES assets(id) ON DELETE CASCADE,
  confidence_score INT NOT NULL,
  primary_mechanic TEXT NOT NULL,
  visual_style TEXT NOT NULL,
  color_palette TEXT[] NOT NULL,
  evidence_anchors JSONB NOT NULL,
  dna_prompt TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- --- ROW LEVEL SECURITY (RLS) POLICIES ---
-- Enable RLS on all new tables
ALTER TABLE agencies ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE extractions ENABLE ROW LEVEL SECURITY;

-- AGENCIES: Authenticated users can view agencies. Service role has full access.
CREATE POLICY "Authenticated users can read agencies"
  ON agencies FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Service role has full access to agencies"
  ON agencies FOR ALL
  USING (true)
  WITH CHECK (true);

-- BRANDS: Authenticated users can view and manage brands.
CREATE POLICY "Authenticated users can read brands"
  ON brands FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert brands"
  ON brands FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update brands"
  ON brands FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete brands"
  ON brands FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Service role has full access to brands"
  ON brands FOR ALL
  USING (true)
  WITH CHECK (true);

-- ASSETS: Authenticated users can view and manage assets.
CREATE POLICY "Authenticated users can read assets"
  ON assets FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert assets"
  ON assets FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update assets"
  ON assets FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete assets"
  ON assets FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Service role has full access to assets"
  ON assets FOR ALL
  USING (true)
  WITH CHECK (true);

-- EXTRACTIONS: Authenticated users can view and manage extractions.
CREATE POLICY "Authenticated users can read extractions"
  ON extractions FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can insert extractions"
  ON extractions FOR INSERT
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update extractions"
  ON extractions FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete extractions"
  ON extractions FOR DELETE
  USING (auth.role() = 'authenticated');

CREATE POLICY "Service role has full access to extractions"
  ON extractions FOR ALL
  USING (true)
  WITH CHECK (true);
