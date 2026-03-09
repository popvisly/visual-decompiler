-- 038_add_whitelabel_active_to_agencies.sql
ALTER TABLE public.agencies ADD COLUMN is_whitelabel_active BOOLEAN DEFAULT FALSE;
