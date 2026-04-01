alter table public.agency_members enable row level security;
alter table public.team_invitations enable row level security;
alter table public.pulse_results enable row level security;
alter table public.deep_hooks enable row level security;

drop policy if exists "Service role has full access to agency_members" on public.agency_members;
create policy "Service role has full access to agency_members"
    on public.agency_members
    for all
    using (auth.role() = 'service_role')
    with check (auth.role() = 'service_role');

drop policy if exists "Service role has full access to team_invitations" on public.team_invitations;
create policy "Service role has full access to team_invitations"
    on public.team_invitations
    for all
    using (auth.role() = 'service_role')
    with check (auth.role() = 'service_role');

drop policy if exists "Service role has full access to pulse_results" on public.pulse_results;
create policy "Service role has full access to pulse_results"
    on public.pulse_results
    for all
    using (auth.role() = 'service_role')
    with check (auth.role() = 'service_role');

drop policy if exists "Service role has full access to deep_hooks" on public.deep_hooks;
create policy "Service role has full access to deep_hooks"
    on public.deep_hooks
    for all
    using (auth.role() = 'service_role')
    with check (auth.role() = 'service_role');
