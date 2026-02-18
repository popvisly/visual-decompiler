-- Add atomic queue claiming function
create or replace function claim_queued_jobs(batch_size int)
returns setof ad_digests
language plpgsql
as $$
begin
  return query
  with selected_jobs as (
    select id
    from ad_digests
    where status = 'queued'
    order by created_at asc
    limit batch_size
    for update skip locked
  )
  update ad_digests
  set status = 'processing'
  from selected_jobs
  where ad_digests.id = selected_jobs.id
  returning ad_digests.*;
end;
$$;
