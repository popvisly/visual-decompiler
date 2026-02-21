-- 012_collaborative_boards.sql

-- Add org_id to ad_digests if not exists
alter table public.ad_digests 
add column if not exists org_id text;

-- Create Boards table
create table if not exists public.boards (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  description text,
  user_id uuid not null, -- Creator
  org_id text, -- Clerk Org ID (optional)
  is_public boolean default false,
  sharing_token uuid default gen_random_uuid() -- For client sharing
);

-- Many-to-Many junction for ads in boards
create table if not exists public.board_items (
  board_id uuid references public.boards(id) on delete cascade,
  ad_id uuid references public.ad_digests(id) on delete cascade,
  added_at timestamptz not null default now(),
  primary key (board_id, ad_id)
);

-- Indexes
create index if not exists idx_boards_user_id on public.boards(user_id);
create index if not exists idx_boards_org_id on public.boards(org_id);
create index if not exists idx_boards_sharing_token on public.boards(sharing_token);

-- RLS for Boards
alter table public.boards enable row level security;

-- Board items indexing
create index if not exists idx_board_items_board_id on public.board_items(board_id);

-- Policies (Simplified for worker/admin access, specific apps will handle filtering)
-- In a real app, you'd add detailed SELECT policies for users/orgs.
