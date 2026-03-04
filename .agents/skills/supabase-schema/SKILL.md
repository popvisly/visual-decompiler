---
name: supabase-schema
description: Supabase database schema, table relationships, and migration conventions for the Visual Decompiler. Use this before any DB query, migration, or schema change.
---

# Supabase Schema — Visual Decompiler

## Client

Always use the admin client from `src/lib/supabase.ts`:

```ts
import { supabaseAdmin } from '@/lib/supabase';
// or lazy singleton:
import { getSupabaseAdmin } from '@/lib/supabase';
```

- Uses `SUPABASE_SERVICE_ROLE_KEY` — bypasses RLS (safe in server-only routes)
- Returns a mock client during `next build` if env vars are missing — don't panic

## Migration Rules

- Migrations live in `supabase/migrations/` — **33 files** currently (001–033)
- **Never edit existing migrations** — always create a new numbered file
- Name format: `034_description_of_change.sql`
- Apply: `npx supabase db push`

## Core Tables (from migrations)

### `ads` — Central ad record

Created in `001_ad_digests.sql`. Key columns:

- `id` UUID PK
- `user_id` UUID → users
- `status` TEXT: `'pending'` | `'processing'` | `'processed'` | `'error'`
- `media_type` TEXT: `'image'` | `'video'`
- `media_hash` TEXT (dedup key, from `007_media_hash.sql`)
- `digest` JSONB — full AI analysis output (schema v2.2)
- `created_at`, `updated_at` TIMESTAMPTZ

**Status flow:** `pending → processing → processed | error`
> Never show "ANALYSIS COMPLETE" unless `status = 'processed'` AND `digest` is non-null

### `digests` — Normalised digest mirror

High-query fields extracted from `digest` JSONB for fast filtering:

- `trigger_mechanic` TEXT
- `narrative_framework` TEXT
- `adoption_tier` TEXT
- `brand_guess` TEXT

### `users` / limits — from `010_users_and_limits.sql`

- Tracks per-user decompile counts
- Plan tier enforcement lives here

### `benchmarks` — from `008_analytics.sql`

- Aggregate performance data for competitive benchmarking

### `boards` / `board_intelligence` — from `012_collaborative_boards.sql`, `033_add_board_intelligence_columns.sql`

- Collaborative analysis boards
- `board_intelligence` columns added in 033 — check both tables exist before querying

### `relay_messages` — from `005_relay_messages.sql`

- Async messaging between pipeline stages

### `neural_deconstructions` — from `026_neural_deconstruction.sql`

- Deep audit results separate from main digest

### `live_signals` — from `028_live_signals.sql`

- Real-time competitive signal feed

### `predictions` — from `030_predictions.sql`

### `simulations` — from `029_simulations.sql`

### `shared_portals` — from `021_shared_portals.sql`

- Public share links for reports

### `agency_team` / `notifications` — from `022_agency_team.sql`, `024_agency_notifications.sql`

### `stripe_*` — from `031_stripe_integration.sql`

- Subscription and payment records

## Query Patterns

```ts
// Fetch a processed ad with its digest
const { data, error } = await supabaseAdmin
  .from('ads')
  .select('*')
  .eq('id', adId)
  .eq('status', 'processed')
  .single();

// Update status
await supabaseAdmin
  .from('ads')
  .update({ status: 'processed', digest: resultJson })
  .eq('id', adId);

// Insert new ad
const { data } = await supabaseAdmin
  .from('ads')
  .insert({ user_id, status: 'pending', media_type })
  .select()
  .single();
```

## Storage

Supabase Storage bucket for ad media:

```ts
const { data } = await supabaseAdmin.storage
  .from('ads')
  .upload(filePath, file);
const { data: { publicUrl } } = supabaseAdmin.storage
  .from('ads')
  .getPublicUrl(filePath);
```

## Common Gotchas

- `digest` is JSONB — always `JSON.parse()` if returning from RPC, not from `.select()`
- `media_hash` dedup: check for existing hash before inserting a new ad
- The mock client during build returns empty arrays — don't interpret as "no data"
- `board_intelligence` columns added late (migration 033) — may not exist in older local DBs; run `npx supabase db push` if missing
