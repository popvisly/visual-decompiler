-- 026_neural_deconstruction.sql

-- Add strategic synthesis columns to boards
alter table public.boards 
add column if not exists client_brief_text text,
add column if not exists strategic_answer jsonb;

-- Create a table for deep deconstruction hooks (audit trail)
create table if not exists public.deep_hooks (
  id uuid primary key default gen_random_uuid(),
  ad_id uuid references public.ad_digests(id) on delete cascade,
  hook_type text not null, -- 'color', 'pacing', 'psychology', 'semiotics'
  intelligence_data jsonb not null,
  created_at timestamptz not null default now()
);

-- Indexing for deep lookups
create index if not exists idx_deep_hooks_ad_id on public.deep_hooks(ad_id);
create index if not exists idx_deep_hooks_type on public.deep_hooks(hook_type);
