ALTER TABLE public.extractions
ADD COLUMN IF NOT EXISTS clone_output JSONB;
