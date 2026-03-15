alter table public.boards
add column if not exists archived_at timestamptz;

create index if not exists idx_boards_archived_at
on public.boards(archived_at);
