create table if not exists public.usage_log (
    id uuid primary key default gen_random_uuid(),
    user_id text not null references public.users(id) on delete cascade,
    event_type text not null default 'analysis_completed',
    metadata jsonb not null default '{}'::jsonb,
    created_at timestamptz not null default now()
);

create index if not exists idx_usage_log_user_created_at
    on public.usage_log(user_id, created_at desc);

alter table public.usage_log enable row level security;

drop policy if exists "Service role has full access to usage_log" on public.usage_log;
create policy "Service role has full access to usage_log"
    on public.usage_log
    for all
    using (true)
    with check (true);
