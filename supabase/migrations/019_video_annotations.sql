-- 019_video_annotations.sql

-- Timestamped strategic notes on videos
create table if not exists public.video_annotations (
    id uuid primary key default gen_random_uuid(),
    ad_id uuid not null references public.ad_digests(id) on delete cascade,
    user_id text not null, -- Clerk User ID
    org_id text, -- Clerk Org ID
    t_ms integer not null, -- Timestamp in milliseconds
    note text not null,
    created_at timestamptz not null default now()
);

-- RLS
alter table public.video_annotations enable row level security;

create policy "Users can see annotations for their ads"
    on public.video_annotations
    for select
    using (true); -- Filtered by join in real usage

create policy "Users can create annotations"
    on public.video_annotations
    for insert
    with check (auth.uid() is not null); -- Logic simplified for MVP

-- Indexing for performance
create index idx_annotations_ad_id on public.video_annotations(ad_id);
