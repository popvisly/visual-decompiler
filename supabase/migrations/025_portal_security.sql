-- 025_portal_security.sql
-- Add password protection for shared portals

alter table public.shared_links 
add column if not exists password_hash text;

-- No RLS changes needed as the existing policies verify the link exists, 
-- but the application layer will enforce the password check if hash is present.
