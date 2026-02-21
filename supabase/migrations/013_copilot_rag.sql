-- 013_copilot_rag.sql

-- Update match_ads to support org_id and board_id filters
create or replace function match_ads (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  user_id_filter uuid default null,
  org_id_filter text default null,
  board_id_filter uuid default null
)
returns table (
  id uuid,
  media_url text,
  brand_guess text,
  digest jsonb,
  similarity float
)
language plpgsql
as $$
begin
  return query
  select
    ad.id,
    ad.media_url,
    ad.brand_guess,
    ad.digest,
    1 - (ad.embedding <=> query_embedding) as similarity
  from ad_digests ad
  -- Optional board filter via board_items junction
  left join board_items bi on bi.ad_id = ad.id and bi.board_id = board_id_filter
  where 1 - (ad.embedding <=> query_embedding) > match_threshold
    and (
      -- Global filter: must belong to user OR their organization
      (user_id_filter is null or ad.user_id = user_id_filter)
      or (org_id_filter is not null and ad.org_id = org_id_filter)
    )
    and (board_id_filter is null or bi.board_id is not null)
  order by similarity desc
  limit match_count;
end;
$$;
