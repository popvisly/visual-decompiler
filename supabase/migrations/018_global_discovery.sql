-- 018_global_discovery.sql

-- A view to aggregate anonymized tactical patterns across all ads
create or replace view public.global_strategic_patterns as
select
    digest->'meta'->>'product_category_guess' as category,
    digest->'classification'->>'trigger_mechanic' as trigger_mechanic,
    digest->'classification'->>'narrative_framework' as narrative_framework,
    digest->'classification'->>'claim_type' as claim_type,
    count(*) as occurrence_count,
    avg((digest->'diagnostics'->'confidence'->>'overall')::numeric) as avg_confidence
from
    public.ad_digests
where
    status = 'processed'
    and digest->'meta'->>'product_category_guess' is not null
group by
    1, 2, 3, 4
order by
    occurrence_count desc;

-- RLS: The view inherits permissions, but we can make it public readable for the Discovery Hub
grant select on public.global_strategic_patterns to authenticated;
grant select on public.global_strategic_patterns to anon;
