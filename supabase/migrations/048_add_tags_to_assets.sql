alter table public.assets
add column if not exists tags text[] not null default '{}'::text[];

create index if not exists assets_tags_gin_idx
on public.assets
using gin (tags);
