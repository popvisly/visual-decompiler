-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT,
    tier TEXT NOT NULL DEFAULT 'free',
    usage_count INTEGER NOT NULL DEFAULT 0,
    billing_cycle_reset TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Add user_id to ad_digests
ALTER TABLE ad_digests
ADD COLUMN IF NOT EXISTS user_id TEXT REFERENCES users(id) ON DELETE SET NULL;

-- Create index for faster lookups by user
CREATE INDEX IF NOT EXISTS idx_ad_digests_user_id ON ad_digests(user_id);

-- Enable RLS on users table (important for Supabase)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Allow service role full access (Next.js server uses this)
CREATE POLICY "Service role has full access to users"
    ON users
    FOR ALL
    USING (true)
    WITH CHECK (true);
