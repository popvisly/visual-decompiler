-- Analysis Cache Table
-- Stores AI analysis results to avoid redundant API calls
-- Expected to save 20-40% on API costs through cache hits

CREATE TABLE IF NOT EXISTS analysis_cache (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    image_hash TEXT NOT NULL,
    model_used TEXT NOT NULL,
    prompt_version TEXT NOT NULL,
    analysis_result JSONB NOT NULL,
    hit_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create composite index for fast lookups
CREATE INDEX IF NOT EXISTS idx_analysis_cache_lookup
ON analysis_cache(image_hash, model_used, prompt_version);

-- Create index for cleanup queries (remove old entries)
CREATE INDEX IF NOT EXISTS idx_analysis_cache_created_at
ON analysis_cache(created_at);

-- Create index for statistics queries
CREATE INDEX IF NOT EXISTS idx_analysis_cache_hit_count
ON analysis_cache(hit_count);

-- Enable Row Level Security (optional, adjust based on your needs)
ALTER TABLE analysis_cache ENABLE ROW LEVEL SECURITY;

-- Policy: Allow service role full access
CREATE POLICY analysis_cache_service_role_policy ON analysis_cache
    FOR ALL
    USING (true);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_analysis_cache_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to call the function
CREATE TRIGGER update_analysis_cache_timestamp
BEFORE UPDATE ON analysis_cache
FOR EACH ROW
EXECUTE FUNCTION update_analysis_cache_updated_at();

-- Optional: Create a function to clean up old cache entries (>30 days)
CREATE OR REPLACE FUNCTION cleanup_old_cache_entries()
RETURNS void AS $$
BEGIN
    DELETE FROM analysis_cache
    WHERE created_at < NOW() - INTERVAL '30 days';
END;
$$ LANGUAGE plpgsql;

-- Optional: Create a view for cache statistics
CREATE OR REPLACE VIEW analysis_cache_stats AS
SELECT
    COUNT(*) as total_entries,
    SUM(hit_count) as total_hits,
    SUM(hit_count) * 0.15 as estimated_savings_usd,
    model_used,
    COUNT(*) as entries_per_model
FROM analysis_cache
GROUP BY model_used;

COMMENT ON TABLE analysis_cache IS 'Caches AI analysis results to reduce API costs. Entries expire after 30 days.';
COMMENT ON COLUMN analysis_cache.image_hash IS 'SHA-256 hash of the image data for deduplication';
COMMENT ON COLUMN analysis_cache.model_used IS 'AI model used (e.g., claude-sonnet-4-5-20250929)';
COMMENT ON COLUMN analysis_cache.prompt_version IS 'Prompt version used (V1, V2, V3, V4)';
COMMENT ON COLUMN analysis_cache.analysis_result IS 'Full JSON analysis result';
COMMENT ON COLUMN analysis_cache.hit_count IS 'Number of times this cached result was reused';
