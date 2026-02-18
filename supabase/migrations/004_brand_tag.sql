-- 004_brand_tag.sql
-- Add a user-editable brand tag column, separate from the AI-generated brand_guess.
-- brand_guess is a generated column from the digest JSONB (read-only).
-- brand is manually set by the user to confirm or correct the AI's guess.

alter table public.ad_digests
  add column if not exists brand text;

-- Fast filtering index
create index if not exists idx_ad_digests_brand on public.ad_digests(brand);

-- Comment for clarity
comment on column public.ad_digests.brand is 'User-confirmed brand tag. Takes precedence over brand_guess for filtering.';
