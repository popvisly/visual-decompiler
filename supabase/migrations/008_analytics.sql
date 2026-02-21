-- 008_analytics.sql
-- Add analytics columns for report shareability

alter table public.ad_digests 
  add column if not exists view_count int default 0,
  add column if not exists last_viewed_at timestamptz;

-- Index for future dashboard "most viewed" filters
create index if not exists idx_ad_digests_view_count on public.ad_digests(view_count desc);
