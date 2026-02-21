-- 011_vector_search.sql
-- Enable pgvector extension
create extension if not exists vector;

-- Add embedding column to ad_digests
-- text-embedding-3-small generates 1536 dimensions
alter table public.ad_digests 
add column if not exists embedding vector(1536);

-- Create an index for fast similarity search
-- HNSW is generally faster and more scalable than IVFFlat for vector search
create index if not exists idx_ad_digests_embedding on public.ad_digests 
using hnsw (embedding vector_cosine_ops);

-- Create a function for semantic search
create or replace function match_ads (
  query_embedding vector(1536),
  match_threshold float,
  match_count int,
  user_id_filter uuid default null
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
  where 1 - (ad.embedding <=> query_embedding) > match_threshold
    and (user_id_filter is null or ad.user_id = user_id_filter)
  order by similarity desc
  limit match_count;
end;
$$;
