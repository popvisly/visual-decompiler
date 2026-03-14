-- Phase 2: white-label dossier identity fields for Agency Settings
ALTER TABLE public.agencies ADD COLUMN IF NOT EXISTS logo_url TEXT;
ALTER TABLE public.agencies ADD COLUMN IF NOT EXISTS descriptor TEXT;
ALTER TABLE public.agencies ADD COLUMN IF NOT EXISTS contact_email TEXT;
ALTER TABLE public.agencies ADD COLUMN IF NOT EXISTS confidentiality_notice TEXT;
ALTER TABLE public.agencies ALTER COLUMN primary_hex SET DEFAULT '#141414';
