-- 024_agency_notifications.sql
-- Store notifications for agency staff regarding client activity

create table if not exists public.notifications (
    id uuid primary key default gen_random_uuid(),
    org_id text references public.org_settings(org_id) on delete cascade,
    title text not null,
    message text not null,
    link text, -- Link to the relevant specific board or ad
    read boolean default false,
    created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.notifications enable row level security;

-- Policies
create policy "Org members can read their notifications"
    on public.notifications
    for select
    to authenticated
    using (
        org_id in (
            select org_id from public.profiles where user_id = auth.uid()::text
        )
    );

create policy "Service role has full access to notifications"
    on public.notifications
    for all
    to authenticated
    using (true)
    with check (true);
