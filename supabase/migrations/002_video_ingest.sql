-- 002_video_ingest.sql
-- Add video support columns and hard-block deduplication

alter table public.ad_digests 
  add column if not exists media_type text,
  add column if not exists media_kind text check (media_kind in ('image', 'video')),
  add column if not exists parent_id uuid references public.ad_digests(id),
  add column if not exists source text;

-- Index for future grouping
create index if not exists idx_ad_digests_parent_id on public.ad_digests(parent_id);

-- Hard-block deduplication: prevent duplicate processing of the same URL with the same prompt version
-- This ensures cost control and prevents database clutter.
create unique index if not exists idx_ad_digests_media_url_prompt_version 
  on public.ad_digests(media_url, prompt_version);

-- Update existing column for media_url to be btree indexed for fast lookups (already indexed in 001 if we search by brand etc, but good to be explicit for dedupe)
create index if not exists idx_ad_digests_media_url on public.ad_digests(media_url);
