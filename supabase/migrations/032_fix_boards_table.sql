-- 032_fix_boards_table.sql

-- The original 012 migration may have failed or had user_id as uuid, 
-- which conflicts with Clerk's text-based user IDs.

-- Create Boards table if not exists
create table if not exists public.boards (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  description text,
  user_id text not null, -- Fixed: clerk uses text like 'user_2...'
  org_id text, -- Clerk Org ID (optional)
  is_public boolean default false,
  sharing_token uuid default gen_random_uuid()
);

-- If the table existed previously but with a uuid column, we alter it
-- This block is safe to run even if it's already text
do $$
begin
  if exists (
    select 1 
    from information_schema.columns 
    where table_schema='public' 
      and table_name='boards' 
      and column_name='user_id' 
      and data_type='uuid'
  ) then
    alter table public.boards alter column user_id type text using user_id::text;
  end if;
end
$$;

-- Create board_items junction table if not exists
create table if not exists public.board_items (
  board_id uuid references public.boards(id) on delete cascade,
  ad_id uuid references public.ad_digests(id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (board_id, ad_id)
);

-- Safe Index Creation
create index if not exists idx_boards_user_id on public.boards(user_id);
create index if not exists idx_boards_org_id on public.boards(org_id);
create index if not exists idx_boards_sharing_token on public.boards(sharing_token);
create index if not exists idx_board_items_board_id on public.board_items(board_id);

-- Enable RLS (API routes bypass this using service_role, but it's good practice)
alter table public.boards enable row level security;
alter table public.board_items enable row level security;
