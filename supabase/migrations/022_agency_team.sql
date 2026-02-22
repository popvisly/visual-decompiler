-- 022_agency_team.sql
-- Support for member listing and seat management

create table if not exists public.profiles (
    user_id text primary key, -- Clerk User ID
    org_id text references public.org_settings(org_id),
    email text,
    name text,
    role text default 'member', -- 'admin' or 'member'
    avatar_url text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies
create policy "Users can read profiles in their organization"
    on public.profiles
    for select
    to authenticated
    using (
        org_id in (
            select org_id from public.profiles where user_id = auth.uid()::text
        )
    );

create policy "Users can update their own profile"
    on public.profiles
    for update
    to authenticated
    using (user_id = auth.uid()::text);

-- Grant access to service role
create policy "Service role has full access to profiles"
    on public.profiles
    for all
    to authenticated
    using (true)
    with check (true);
