-- 007_media_hash.sql
-- Add hash column for content-based deduplication

alter table public.ad_digests 
  add column if not exists media_hash text;

-- Index for fast dedupe lookups
create index if not exists idx_ad_digests_media_hash on public.ad_digests(media_hash);

-- Optional: Add a note that we won't make it UNIQUE yet to allow for partial migrations, 
-- but the worker will use it to skip Vision calls.
comment on column public.ad_digests.media_hash is 'SHA-256 hash of the media content for deduplication';
