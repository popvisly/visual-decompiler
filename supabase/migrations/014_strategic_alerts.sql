-- 014_strategic_alerts.sql

-- Create a table for strategic alerts
create table if not exists public.monitored_patterns (
    id uuid primary key default gen_random_uuid(),
    created_at timestamptz not null default now(),
    name text not null,
    target_embedding vector(1536) not null,
    similarity_threshold float default 0.8,
    user_id uuid not null,
    org_id text,
    is_active boolean default true
);

-- RLS
alter table public.monitored_patterns enable row level security;

-- Policies
create policy "Users can manage their own patterns"
    on public.monitored_patterns
    for all
    using (auth.uid() = user_id);
