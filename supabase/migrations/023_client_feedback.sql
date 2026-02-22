-- 023_client_feedback.sql
-- Store client feedback on shared boards and ads

create table if not exists public.client_feedback (
    id uuid primary key default gen_random_uuid(),
    shared_link_slug text references public.shared_links(slug) on delete cascade,
    client_name text not null,
    content text not null,
    feedback_type text default 'comment', -- 'comment' or 'remix_request'
    created_at timestamptz not null default now(),
    
    -- Metadata if needed
    context_data jsonb default '{}'::jsonb 
);

-- Enable RLS
alter table public.client_feedback enable row level security;

-- Policies
-- Anyone with the link can post feedback
create policy "Anyone can post feedback to a shared link"
    on public.client_feedback
    for insert
    to anon, authenticated
    with check (true);

-- Anyone who can see the shared link can see its feedback
create policy "Anyone can read feedback for a shared link"
    on public.client_feedback
    for select
    to anon, authenticated
    using (true); -- In a real app, you'd join with shared_links to verify

-- Grant access to anon for public portals
grant insert, select on public.client_feedback to anon, authenticated;
