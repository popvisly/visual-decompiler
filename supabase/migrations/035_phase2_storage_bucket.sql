-- 035_phase2_storage_bucket.sql

-- 1. Create a new storage bucket for agency assets
INSERT INTO storage.buckets (id, name, public)
VALUES ('vault-assets', 'vault-assets', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Set up RLS security policies for the bucket (Read)
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access"
  ON storage.objects FOR SELECT
  USING ( bucket_id = 'vault-assets' );

-- 3. Set up RLS security policies for the bucket (Write/Upload)
DROP POLICY IF EXISTS "Authenticated users can upload assets" ON storage.objects;
CREATE POLICY "Authenticated users can upload assets"
  ON storage.objects FOR INSERT
  WITH CHECK ( bucket_id = 'vault-assets' AND auth.role() = 'authenticated' );
