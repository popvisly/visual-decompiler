# AGENT CONTEXT: Current System State & Guardrails

**Last Updated**: 2026-03-02
**Context**: Re-integrated observability (Sentry/PostHog) and stabilized AI ingestion pipeline.

## 🚨 CRITICAL GUARDRAILS (DO NOT MODIFY WITHOUT CAUTION)

1. **AI Ingestion Pipeline (`src/types/digest.ts`)**:
   - **State**: The `AdDigestSchema` has been intentionally relaxed (many sections are `.optional()`).
   - **Why**: Models (Claude/OpenAI) often omit fields, causing Zod validation to fail and ads to get stuck in "Processing..." loops.
   - **Constraint**: DO NOT make these strict again unless you have verified the model's output perfectly matches the schema requirements.

2. **Bulk Content Actions (`src/app/api/ads/actions`)**:
   - **State**: Bulk actions have been moved to a privileged sub-route: `/api/ads/actions/bulk-delete`.
   - **Why**: The old `/api/ads/bulk` was being shadowed by the dynamic `[id]` route in Next.js, causing `405 Method Not Allowed` errors.
   - **Constraint**: Keep high-impact bulk actions in the `/actions` namespace to avoid routing interference.

3. **Observability**:
   - **Sentry**: Active and configured in `sentry.*.config.ts`. DSN is in `.env.local`.
   - **PostHog**: Active in `src/components/providers.tsx`.

## PERSISTENT BUGS / DEBT

- **Job Cleanup**: The worker handles "zombie" jobs (stuck in processing) automatically every run (10-minute threshold).
- **Public Routes**: `/api/worker` and `/api/ads/actions` are excluded from Clerk's `auth.protect()` in the middleware to allow background/manual triggers.

## NEXT STEPS FOR AGENTS

- Monitor Sentry for `AdDigest` validation errors.
- If analysis quality drops, adjust `src/lib/prompts.ts` before tightening the schema.
