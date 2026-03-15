create table if not exists intelligence_cache (
    id uuid primary key default gen_random_uuid(),
    user_id uuid not null references auth.users(id) on delete cascade,
    cache_key text not null unique,
    route text not null,
    sector_filter text,
    window_days integer not null,
    payload jsonb not null default '{}'::jsonb,
    computed_at timestamptz not null default now(),
    expires_at timestamptz not null,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
);

create index if not exists intelligence_cache_user_route_idx
    on intelligence_cache (user_id, route);

create index if not exists intelligence_cache_expires_at_idx
    on intelligence_cache (expires_at);

create or replace function set_intelligence_cache_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

drop trigger if exists intelligence_cache_set_updated_at on intelligence_cache;

create trigger intelligence_cache_set_updated_at
before update on intelligence_cache
for each row
execute function set_intelligence_cache_updated_at();
