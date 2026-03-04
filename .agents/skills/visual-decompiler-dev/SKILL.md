---
name: visual-decompiler-dev
description: How to develop, debug, and extend the Visual Decompiler (popvisly/visual-decompiler) codebase. Use this whenever working on this project.
---

# Visual Decompiler Development Skill

## Project Identity

- **Repo:** `/Volumes/850EVO/visual-decompiler`
- **Framework:** Next.js 15 (App Router), TypeScript
- **Styling:** Vanilla CSS (`src/app/globals.css`) — do NOT introduce Tailwind
- **Database:** Supabase (Postgres) — client at `src/lib/supabase.ts`
- **AI:** Anthropic Claude via `src/lib/anthropic.ts`
- **Deployment:** Vercel (production at visualdecompiler.com)
- **Auth:** Supabase Auth via middleware (`src/middleware.ts`)
- **Payments:** Stripe via `src/lib/stripe.ts`

## Key Directory Map

```
src/
  app/
    api/           — All API routes (Next.js Route Handlers)
      ads/         — Core ad ingestion & management
      worker/      — Background processing pipeline
    dashboard/     — Main authenticated UI
    docs/          — MDX intelligence briefings
    report/        — Public shareable report view
  components/      — React components (~50+ files)
  lib/             — Service layer (36 files, all business logic lives here)
  types/           — Shared TypeScript types
content/
  briefings/       — MDX files for the Intelligence section
supabase/
  migrations/      — SQL migration files
```

## Service Layer (src/lib/) — Key Files

| File | Purpose |
|------|---------|
| `neural_deconstruction_service.ts` | Core AI ad analysis (largest: 17.7KB) |
| `prompts.ts` | All Anthropic prompt templates (34KB — source of truth for AI output) |
| `deep_audit.ts` | Deep forensic audit logic (16.3KB) |
| `digest_normalize.ts` | Normalises raw AI responses into typed digests |
| `vision.ts` | Image/video vision processing |
| `supabase.ts` | DB client + typed query helpers |
| `sovereignty_engine.ts` | Competitive intelligence aggregation |
| `analytics.ts` | Event tracking |
| `ratelimit.ts` | Rate limiting for API routes |

## Database Patterns

- Always use the typed Supabase client from `src/lib/supabase.ts`
- Migrations live in `supabase/migrations/` — create new `.sql` files, never edit existing ones
- Key tables: `ads`, `digests`, `benchmarks`, `users`, `reports`
- Status flow for ads: `pending` → `processing` → `processed` | `error`

## API Route Conventions

- All routes are in `src/app/api/`
- Use `NextRequest` / `NextResponse` from `next/server`
- Rate limit with `src/lib/ratelimit.ts` on user-facing routes
- Background work goes through `src/app/api/worker/route.ts`

## AI / Prompt Conventions

- All prompts in `src/lib/prompts.ts` — add new ones there, never inline
- Claude model: use whatever is set in `src/lib/anthropic.ts`
- Always normalize AI responses through `digest_normalize.ts` before storing
- Vision analysis via `src/lib/vision.ts`

## Component Conventions

- Components in `src/components/`
- Marketing components in `src/components/marketing/`
- Use `"use client"` only when state/effects are required
- Server Components are the default

## MDX / Intelligence Briefings

- MDX files live in `content/briefings/`
- Frontmatter schema: `title`, `description`, `publishedAt`, `image`, `category`
- Rendered via `src/lib/mdx.ts`

## Dev Workflow

```bash
# Start dev server
npm run dev   # runs on http://localhost:3000

# Run type check
npx tsc --noEmit

# Supabase local
npx supabase start
npx supabase db push
```

## Key Working Patterns

1. **Fix bugs in the service layer first** — most rendering bugs trace back to `digest_normalize.ts` or the worker pipeline
2. **Check ad status** — `'processed'` means AI is done; never wait for polling if status is already `processed`
3. **Rate limits** — always wrap new public API routes with `ratelimit.ts`
4. **The worker route** (`/api/worker`) is the single entry point for all background AI processing
5. **Never touch migrations** — only add new ones

## Environment Variables (in .env.local)

Key vars (never log or expose):

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `ANTHROPIC_API_KEY`
- `STRIPE_SECRET_KEY`
