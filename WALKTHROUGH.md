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

## File Structure

- `src/app/api/ingest/route.ts` - Main ingestion endpoint.
- `src/app/dashboard/page.tsx` - Research feed and filter interface.
- `src/lib/vision.ts` - Vision model wrapper.
- `src/types/digest.ts` - Controlled vocabulary and JSON schema.

## Next Steps

1. Populate `.env.local` with your API keys.
2. Run `npm run dev` and navigate to `/dashboard`.
3. Submit a public image URL to see the decompiler in action.
