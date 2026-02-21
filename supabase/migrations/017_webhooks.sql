-- 017_webhooks.sql

-- Organization level webhooks for real-time intelligence
create table if not exists public.webhooks (
    id uuid primary key default gen_random_uuid(),
    org_id text not null, -- Clerk Org ID
    created_at timestamptz not null default now(),
    url text not null,
    secret_token text,
    event_types text[] default '{analysis_complete, strategic_anomaly}', -- types: analysis_complete, strategic_anomaly
    is_active boolean default true
);

-- RLS
alter table public.webhooks enable row level security;

create policy "Org members can manage webhooks"
    on public.webhooks
    for all
    to authenticated
    using (true); -- Filtered in API
