-- 021_shared_portals.sql
-- Infrastructure for secure, white-labeled client sharing

-- Ensure boards can store briefs for shared access
alter table public.boards add column if not exists last_brief text;

create table if not exists public.shared_links (
    id uuid primary key default gen_random_uuid(),
    slug text unique not null, -- Cryptographic slug for the URL
    org_id text not null references public.org_settings(org_id),
    board_id uuid references public.boards(id) on delete cascade,
    ad_digest_id uuid references public.ad_digests(id) on delete cascade,
    created_at timestamptz not null default now(),
    expires_at timestamptz,
    settings jsonb default '{}'::jsonb, -- { "show_brief": true, "show_anomalies": true }
    
    -- Ensure either board_id or ad_digest_id is present, but not both in this specific implementation (or both allowed)
    constraint content_check check (board_id is not null or ad_digest_id is not null)
);

-- Enable RLS
alter table public.shared_links enable row level security;

-- Policies for shared_links
create policy "Anyone with a slug can read a shared link"
    on public.shared_links for select
    to anon, authenticated
    using (true);

create policy "Org members can manage their shared links"
    on public.shared_links for all
    to authenticated
    using (auth.uid()::text in (
        select user_id from public.profiles where org_id = shared_links.org_id
    ));

-- Grant access to linked content for anonymous users
-- This is critical: if a link is shared, the underlying ad/board must be readable by anon
-- We use a function or a specific policy check for this.

-- Update ad_digests RLS for shared access
create policy "Anon can read shared ad digests"
    on public.ad_digests for select
    to anon, authenticated
    using (
        exists (
            select 1 from public.shared_links 
            where shared_links.ad_digest_id = ad_digests.id
            or exists (
                select 1 from public.board_items 
                where board_items.board_id = shared_links.board_id 
                and board_items.ad_digest_id = ad_digests.id
            )
        )
    );

-- Update boards RLS for shared access
create policy "Anon can read shared boards"
    on public.boards for select
    to anon, authenticated
    using (
        exists (
            select 1 from public.shared_links 
            where shared_links.board_id = boards.id
        )
    );
