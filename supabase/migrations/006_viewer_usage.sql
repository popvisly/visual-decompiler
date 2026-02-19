-- Migration: V1 App Gate — Viewer Usage Tracking
-- Implements Ray's v1_app_gate_spec

-- 1. Viewer usage tracking table
CREATE TABLE IF NOT EXISTS viewer_usage (
    viewer_id UUID PRIMARY KEY,
    free_analyses_used INT DEFAULT 0,
    pro BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Add viewer columns to ad_digests
ALTER TABLE ad_digests
    ADD COLUMN IF NOT EXISTS viewer_id UUID,
    ADD COLUMN IF NOT EXISTS access_level TEXT DEFAULT 'full';

-- 3. Index for viewer lookups
CREATE INDEX IF NOT EXISTS idx_ad_digests_viewer ON ad_digests(viewer_id);

-- 4. RLS: viewer_usage is service-role only (no anon access)
ALTER TABLE viewer_usage ENABLE ROW LEVEL SECURITY;
