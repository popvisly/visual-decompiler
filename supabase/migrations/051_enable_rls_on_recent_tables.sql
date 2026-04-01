do $$
begin
    if exists (
        select 1
        from information_schema.tables
        where table_schema = 'public' and table_name = 'agency_members'
    ) then
        execute 'alter table public.agency_members enable row level security';
        execute 'drop policy if exists "Service role has full access to agency_members" on public.agency_members';
        execute $sql$
            create policy "Service role has full access to agency_members"
                on public.agency_members
                for all
                using (auth.role() = 'service_role')
                with check (auth.role() = 'service_role')
        $sql$;
    end if;

    if exists (
        select 1
        from information_schema.tables
        where table_schema = 'public' and table_name = 'team_invitations'
    ) then
        execute 'alter table public.team_invitations enable row level security';
        execute 'drop policy if exists "Service role has full access to team_invitations" on public.team_invitations';
        execute $sql$
            create policy "Service role has full access to team_invitations"
                on public.team_invitations
                for all
                using (auth.role() = 'service_role')
                with check (auth.role() = 'service_role')
        $sql$;
    end if;

    if exists (
        select 1
        from information_schema.tables
        where table_schema = 'public' and table_name = 'pulse_results'
    ) then
        execute 'alter table public.pulse_results enable row level security';
        execute 'drop policy if exists "Service role has full access to pulse_results" on public.pulse_results';
        execute $sql$
            create policy "Service role has full access to pulse_results"
                on public.pulse_results
                for all
                using (auth.role() = 'service_role')
                with check (auth.role() = 'service_role')
        $sql$;
    end if;

    if exists (
        select 1
        from information_schema.tables
        where table_schema = 'public' and table_name = 'deep_hooks'
    ) then
        execute 'alter table public.deep_hooks enable row level security';
        execute 'drop policy if exists "Service role has full access to deep_hooks" on public.deep_hooks';
        execute $sql$
            create policy "Service role has full access to deep_hooks"
                on public.deep_hooks
                for all
                using (auth.role() = 'service_role')
                with check (auth.role() = 'service_role')
        $sql$;
    end if;

    if exists (
        select 1
        from information_schema.tables
        where table_schema = 'public' and table_name = 'intelligence_cache'
    ) then
        execute 'alter table public.intelligence_cache enable row level security';
        execute 'drop policy if exists "Service role has full access to intelligence_cache" on public.intelligence_cache';
        execute $sql$
            create policy "Service role has full access to intelligence_cache"
                on public.intelligence_cache
                for all
                using (auth.role() = 'service_role')
                with check (auth.role() = 'service_role')
        $sql$;
    end if;

    if exists (
        select 1
        from information_schema.tables
        where table_schema = 'public' and table_name = 'simulations'
    ) then
        execute 'alter table public.simulations enable row level security';
        execute 'drop policy if exists "Service role has full access to simulations" on public.simulations';
        execute $sql$
            create policy "Service role has full access to simulations"
                on public.simulations
                for all
                using (auth.role() = 'service_role')
                with check (auth.role() = 'service_role')
        $sql$;
    end if;

    if exists (
        select 1
        from information_schema.tables
        where table_schema = 'public' and table_name = 'trend_predictions'
    ) then
        execute 'alter table public.trend_predictions enable row level security';
        execute 'drop policy if exists "Service role has full access to trend_predictions" on public.trend_predictions';
        execute $sql$
            create policy "Service role has full access to trend_predictions"
                on public.trend_predictions
                for all
                using (auth.role() = 'service_role')
                with check (auth.role() = 'service_role')
        $sql$;
    end if;
end
$$;
