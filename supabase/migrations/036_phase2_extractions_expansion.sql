-- Migration: Add full_dossier JSONB column to extractions to store the deep semantic intelligence payload from V1.
ALTER TABLE public.extractions ADD COLUMN full_dossier JSONB;
