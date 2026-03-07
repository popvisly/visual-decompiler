-- 036_add_user_id_to_assets.sql

-- Add the column to track asset ownership
ALTER TABLE public.assets ADD COLUMN IF NOT EXISTS user_id TEXT REFERENCES users(id) ON DELETE CASCADE;

-- Update RLS to ensure asset ownership is respected
DROP POLICY IF EXISTS "Authenticated users can read assets" ON public.assets;
CREATE POLICY "Users can read their own assets"
  ON public.assets FOR SELECT
  USING (auth.uid()::text = user_id OR user_id IS NULL);
