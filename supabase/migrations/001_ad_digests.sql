-- 001_ad_digests.sql
-- visual-decompiler: store strict vision digests as jsonb + generated columns for fast filters

create table if not exists public.ad_digests (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Where the media lives (url to object storage, CDN, etc.)
  media_url text not null,

  -- processing state machine
  status text not null default 'processed' check (status in ('queued','processing','processed','needs_review','failed')),

  -- optional: which model/prompt produced this digest
  model text,
  prompt_version text,

  -- the full structured payload from the black box
  digest jsonb not null,

  -- ==== Generated columns (developer experience + performance) ====
  -- Note: these will be NULL if the key is missing.
  brand_guess text generated always as ((digest #>> '{meta,brand_guess}')) stored,
  trigger_mechanic text generated always as ((digest #>> '{classification,trigger_mechanic}')) stored,
  secondary_trigger_mechanic text generated always as ((digest #>> '{classification,secondary_trigger_mechanic}')) stored,
  claim_type text generated always as ((digest #>> '{classification,claim_type}')) stored,
  offer_type text generated always as ((digest #>> '{classification,offer_type}')) stored,
  narrative_framework text generated always as ((digest #>> '{classification,narrative_framework}')) stored,
  gaze_priority text generated always as ((digest #>> '{classification,gaze_priority}')) stored,
  cognitive_load text generated always as ((digest #>> '{classification,cognitive_load}')) stored
);

-- Basic indexes
create index if not exists idx_ad_digests_created_at on public.ad_digests(created_at desc);
create index if not exists idx_ad_digests_status on public.ad_digests(status);

-- Fast filtering indexes (btree)
create index if not exists idx_ad_digests_brand_guess on public.ad_digests(brand_guess);
create index if not exists idx_ad_digests_trigger_mechanic on public.ad_digests(trigger_mechanic);
create index if not exists idx_ad_digests_secondary_trigger_mechanic on public.ad_digests(secondary_trigger_mechanic);
create index if not exists idx_ad_digests_claim_type on public.ad_digests(claim_type);
create index if not exists idx_ad_digests_offer_type on public.ad_digests(offer_type);
create index if not exists idx_ad_digests_narrative_framework on public.ad_digests(narrative_framework);

-- Flexible jsonb querying (GIN)
-- Supports queries like: digest -> 'classification' ->> 'trigger_mechanic' = 'Rebellion_Disruption'
create index if not exists idx_ad_digests_digest_gin on public.ad_digests using gin (digest);

-- RLS: lock down direct client access by default.
alter table public.ad_digests enable row level security;

-- No public policies by default.
