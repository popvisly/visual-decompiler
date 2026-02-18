# Walkthrough - Visual Decompiler Milestone 1

This repository contains the foundation for a B2B SaaS Advertising Intelligence Engine that decompiles ads into psychological and visual digests.

## Key Accomplishments

### 1. Next.js 15 Foundation

- Modern App Router architecture.
- Tailwind CSS styling for a clean, strategic B2B aesthetic.

### 2. The "Black Box" Ingestion API

- **Strict Prompting**: Uses `artifacts/BLACK_BOX_PROMPT_V1.md` as a system prompt for `gpt-4o`.
- **Validation**: Strict Zod schema (`src/types/digest.ts`) ensures data integrity.
- **Supabase Integration**: Stores full digests in `ad_digests` table with automated status tracking.

### 3. Strategy Dashboard

- **Ingest**: Direct URL submission for on-the-fly deconstruction.
- **Search & Filter**: Real-time filtering based on generated columns (Trigger Mechanics, Claim Types, Offer Types).

### 4. Video Ingest (MVP) — Milestone 2

- **Keyframe Extraction**: Automates the selection of high-signal frames (Start, Mid, End) using `ffmpeg` from direct MP4/MOV URLs.
- **Contextual Vision**: The Vision API now evaluates 3-5 images in a single strategic request, mapping temporal flow into a unified digest.
- **Hard Deduplication**: Enforced `UNIQUE` constraint on `(media_url, prompt_version)` to prevent cross-team data clutter and optimize API costs.

### 5. Production Hardening — Milestone 3

- **Async Ingestion**: Ingestion now immediately returns a `job_id`, preventing timeouts on complex video assets by moving deconstruction to a background worker.
- **Review Dashboard**: A dedicated interface at `/dashboard/review` for Art Directors to triage "Needs Review" data and refine JSON digests via a live editor.
- **Circuit Breaker**: Implemented IP-based rate limiting on the ingestion API to prevent accidental cost overruns.
- **Resilient Extraction**: Enhanced `ffmpeg` diagnostics and "best effort" frame logic to handle diverse remote MP4 delivery methods.

## File Structure (Updated)

- `src/app/api/ingest/route.ts` - Media-aware ingestion (detects Image vs. Video).
- `src/lib/video.ts` - Server-side keyframe extraction engine.
- `supabase/migrations/002_video_ingest.sql` - Atomic schema evolution for nested keyframe data.
- `src/app/dashboard/review/page.tsx` - Triage dashboard for flagged deconstructions.
- `src/components/JSONEditor.tsx` - High-fidelity data refinement component.
- `src/app/api/digests/[id]/route.ts` - RESTful endpoint for manual data updates.
- `scripts/verify-video-ingest.ts` - CLI tool for verified frame-to-vision logic testing.

## Next Steps

1. Populate `.env.local` with your API keys.
2. Run `npm run dev` and navigate to `/dashboard`.
3. Submit a public image URL to see the decompiler in action.
