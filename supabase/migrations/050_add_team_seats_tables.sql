create table if not exists public.agency_members (
    id uuid primary key default gen_random_uuid(),
    agency_id uuid not null references public.agencies(id) on delete cascade,
    user_id text,
    email text not null,
    name text,
    role text not null default 'analyst',
    status text not null default 'active',
    invited_by text,
    joined_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint agency_members_role_check check (role in ('owner', 'admin', 'analyst')),
    constraint agency_members_status_check check (status in ('active', 'invited', 'revoked'))
);

create unique index if not exists idx_agency_members_agency_email
on public.agency_members (agency_id, lower(email));

create index if not exists idx_agency_members_agency_id
on public.agency_members (agency_id);

create table if not exists public.team_invitations (
    id uuid primary key default gen_random_uuid(),
    agency_id uuid not null references public.agencies(id) on delete cascade,
    email text not null,
    role text not null default 'analyst',
    invite_token text not null unique,
    invited_by text,
    message text,
    expires_at timestamptz not null,
    accepted_at timestamptz,
    revoked_at timestamptz,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now(),
    constraint team_invitations_role_check check (role in ('owner', 'admin', 'analyst'))
);

create index if not exists idx_team_invitations_agency_id
on public.team_invitations (agency_id);

create index if not exists idx_team_invitations_email
on public.team_invitations (lower(email));
