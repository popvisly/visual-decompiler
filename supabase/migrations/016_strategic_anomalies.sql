-- 016_strategic_anomalies.sql

-- Add anomaly detection columns to ad_digests
alter table public.ad_digests 
add column if not exists is_anomaly boolean default false,
add column if not exists anomaly_score float default 0.0,
add column if not exists anomaly_reason text;

-- Index for fast filtering of strategic shifts
create index if not exists idx_ad_digests_is_anomaly on public.ad_digests(is_anomaly) where is_anomaly = true;
