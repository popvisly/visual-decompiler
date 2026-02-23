# Guardrails (Stability First)

This project moves fast. These rules keep us from accidentally breaking the UI, overwriting good work, or letting “helpful” automation create regressions.

## 1) Git workflow (non-negotiable)
- Keep `main` green.
- **Work on a branch** for any non-trivial change:
  - `stability/...` → guardrails, refactors, safety
  - `feature/...` → new product work
  - `antigravity/...` → experiments / prompt iterations
- Each logical change = one commit. Prefer small commits.

## 2) No “big bang” refactors
If a suggestion touches many files, **split it**:
1) Add types/schema changes (no behavior change)
2) Add behavior behind a flag / optional field
3) Update UI to read new field(s)
4) Cleanup

## 3) Version the data contract
- `digest.meta.schema_version` must be present on newly generated digests.
- When prompts/fields change, bump the version and keep old UI paths tolerant.

## 4) Validate before persist
- Always validate LLM output with `AdDigestSchema`.
- If validation fails: mark job `needs_review` and still persist the raw digest for inspection.

## 5) Safe collaboration with “advisor” agents (e.g. Antigravity)
Antigravity is allowed to:
- propose prompt changes
- propose schema additions
- suggest UI improvements
- research + write implementation plans

Antigravity is *not* allowed to:
- run sweeping edits without review
- remove working UI/logic without explicit approval

Practical rule:
- Ask for **surgical diffs** (files + exact change + reason).
- Land them on an `antigravity/...` branch.

## 6) Pre-merge checklist
- Typecheck: `npx tsc -p tsconfig.json --noEmit`
- Build: `npm run build` (or at least `npm run lint` if build is too slow)
- Smoke test:
  - `/dashboard/[id]` loads
  - `/report/[id]` loads
  - decompile flow queues + worker can process 1 job
