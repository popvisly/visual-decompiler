-- Store generated production blueprints alongside each forensic extraction.
ALTER TABLE public.extractions
ADD COLUMN IF NOT EXISTS blueprint JSONB;
