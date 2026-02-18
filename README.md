# visual-decompiler

A small, isolated “black box” that decompiles advertising media (image/video) into a strict, searchable JSON digest.

## What this repo is

- **Ingest**: a media URL or upload
- **Digest**: call a Vision model with a strict system prompt
- **Store**: write the resulting JSON to Supabase (`digest` as `jsonb`), with generated columns + indexes for fast querying

## Core artifacts

- `artifacts/BLACK_BOX_PROMPT_V1.md` — the system prompt + schema (source of truth)
- `supabase/migrations/001_ad_digests.sql` — Postgres table + generated columns + indexes

## Status

V1 foundation: prompt + database schema.
