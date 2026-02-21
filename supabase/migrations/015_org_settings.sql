-- 015_org_settings.sql

-- Organization level settings for white-labeling
create table if not exists public.org_settings (
    org_id text primary key, -- Clerk Org ID
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    logo_url text,
    primary_color text default '#BB9E7B', -- Brand accent color
    custom_domain text,
    white_label_enabled boolean default false
);

-- RLS
alter table public.org_settings enable row level security;

-- Policy: Anyone in the org can read, only admins (logic in API) can write
-- For simplicity in the migration, we'll allow selection for authenticated users
create policy "Authenticated users can read org settings"
    on public.org_settings
    for select
    to authenticated
    using (true);
