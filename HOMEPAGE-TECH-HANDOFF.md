# HOMEPAGE-TECH-HANDOFF

## Scope
Technical handoff for homepage redesign continuity (Codex).

## Primary Files Touched

### 1) `src/app/page.tsx`
- Updated homepage copy props + CTA labels passed into Hero/Header.
- Primary CTA standardized to `Start Analysis`.
- Secondary CTA aligned to intelligence/vault language.

### 2) `src/components/marketing/Hero.tsx`
- Refined hero typography hierarchy and spacing.
- Updated eyebrow language to `Intelligence Platform`.
- Upgraded CTA styles (pill system, hover polish, consistency).
- Removed `Signal Flow` connector element after UX feedback.
- Mobile/iPad spacing and CTA density adjustments.

### 3) `src/components/marketing/NeuralParticleHero.tsx`
- Adjusted panel sizing/radius/min-heights for better mobile + tablet fold behavior.
- Minor proportion refinements for visual balance.

### 4) `src/components/marketing/ProductProofSequence.tsx`
Major changes concentrated here:
- Reworked **Analysis Surfaces** hierarchy and readability.
- Built **Live Deconstruction** as multi-ad deck/rolodex (not single ad).
- Added deck motion sequencing and timing refinements.
- Added art-director-oriented explanatory copy under ad stack.
- Upgraded diagnosis panel visual style + card content structure.
- Added **MiroFlowSection** (connected insight nodes).
- Added scroll-progressive active node behavior in Miro flow (`useScroll`, `useMotionValueEvent`).
- Compressed and restructured funnel/step sections for reduced scroll fatigue.
- Added punch-line layer per funnel step.
- Added/adjusted micro directional CTAs across key sections.
- Removed step pills after feedback.

### 5) `src/components/marketing/FooterStartNow.tsx`
- CTA label normalization (`Start Analysis`).
- FAQ card treatment improved (subtle interaction + signal lines).
- Mobile CTA width/ergonomics improved.

### 6) `src/components/UnifiedSovereignHeader.tsx`
- Header/nav/button visual system moved away from bracketed/template style.
- Mobile menu restyled to match premium light-surface system.
- CTA consistency and breakpoint behavior refined.

### 7) `src/lib/supabase-client.ts`
- Added safe client initialization fallback to prevent local crash when env vars are missing.

### 8) `src/app/error.tsx`
- Removed invalid `<html>/<body>` wrappers (App Router hydration/runtime fix).

## Docs Added
- `HOMEPAGE-DESIGN-NOTES.md` — design strategy, guardrails, and rationale.
- `HOMEPAGE-TECH-HANDOFF.md` (this file) — implementation continuity notes.

## Implementation Notes / Known Runtime Behavior
- Next.js dev cache may intermittently throw:
  - `__webpack_modules__[moduleId] is not a function`
- Standard local recovery:
  1. `pkill -f "next dev"`
  2. `rm -rf .next node_modules/.cache`
  3. `npm run dev`

## Current UX Guardrails (Do Not Regress)
1. Keep primary CTA as `Start Analysis`.
2. Avoid generic SaaS gradient + feature-grid defaults.
3. Preserve visual narrative:
   - Visual input → diagnosis output → discovery flow → operating layer.
4. Motion should be sequential and explanatory (not simultaneous noise).
5. Keep premium light/dark contrast choreography (editorial light + dark diagnostic islands).

## Recommended Next Engineering Tasks
1. Refactor long `ProductProofSequence.tsx` into subcomponents:
   - `AnalysisSurfaces.tsx`
   - `LiveDeconstruction.tsx`
   - `MiroFlowSection.tsx`
   - `PlatformFunnel.tsx`
2. Externalize static copy/constants into dedicated config objects/files.
3. Add Storybook or visual snapshots for regression checks on key sections.
4. Add simple scroll/motion QA checklist for desktop + iPad + mobile.
