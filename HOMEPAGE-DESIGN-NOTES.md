# HOMEPAGE-DESIGN-NOTES

## Purpose
This file documents the homepage design direction, decisions, and guardrails used in the latest premium redesign pass.

---

## Core Design Thesis
The homepage must feel like **Editorial Luxury + Forensic Intelligence**.

Not a generic SaaS template.
Not a dark-only UI block stack.

The winning blend is:
- **Light editorial space** (breathing room, typography confidence)
- **Dark instrument surfaces** (analysis credibility, app-native authority)
- **Clear narrative flow** (Visual input → Diagnosis → Discovery → Operating layer)

---

## What Was Changed (High Level)

### 1) Hero + First Fold
- Shifted headline/copy to premium strategic framing.
- Unified CTA language to **Start Analysis**.
- Removed weak/templated CTA styling and moved to consistent premium pills.
- Improved typography rhythm for desktop, mobile, and iPad.

### 2) Analysis Surfaces
- Removed repetitive “Live platform signal” labels.
- Improved hierarchy: one dominant leading tile + supporting tiles.
- Clarified reading order with concise intro copy and directional micro-CTA.

### 3) Live Deconstruction
- Replaced single-ad dependence with a **multi-ad deck/rolodex** concept.
- Added “visual inputs in → strategic output out” storytelling.
- Shifted explanatory copy toward art-director/creative language.
- Upgraded right side to premium diagnostic panel styling.

### 4) Deck Motion
- Sequential ad card reveal (not all-at-once fade).
- Tuned reveal speed and stagger for readability.
- Added subtle idle movement to imply living system (without gimmick overload).

### 5) Miro-Style Discovery Flow
- Added connected node section to suggest progressive insight assembly.
- Implemented active-step behavior that advances with scroll.
- Added connector pulse for information flow cue.

### 6) Inside Platform (Steps 1–5)
- Compressed vertical spacing to reduce scroll fatigue.
- Added punch-line summary per step.
- Improved visual rhythm with alternating section treatment.
- Removed step pills after usability feedback.

### 7) Mobile/iPad Polish
- Improved CTA sizing and touch behavior.
- Tuned header and menu for premium mobile feel.
- Improved section breakpoint behavior (especially iPad landscape/portrait).

---

## UX / Conversion Principles Used
1. **One primary action** repeated consistently: `Start Analysis`.
2. **Hierarchy before decoration**: users should know what matters in <5 seconds.
3. **Narrative sequencing**: each section should naturally handoff to the next.
4. **Micro-CTAs** guide scroll direction and reduce dead-end sections.
5. **Motion supports comprehension**, not spectacle.

---

## Anti-Template Guardrails
Avoid these patterns:
- Generic gradient hero + feature-card grid defaults.
- Equal-weight cards with no dominant reading path.
- Inconsistent CTA verbs.
- Oversized all-caps everywhere.
- Long text blocks with no step logic.
- Animations that appear simultaneously without sequencing intent.

---

## Visual Rules (Current)
- Border weight: mostly 1px hairline, premium low-contrast separators.
- Radius: soft, consistent rounded system.
- Accent (copper/gold): sparse signal, never flood-fill.
- Light/Dark ratio: editorial light base with intentional dark diagnostic islands.
- Easing profile: restrained, smooth (`[0.22, 1, 0.36, 1]` family).

---

## Operational Notes
- During iteration, use `npm run dev` for hot updates.
- For stable QA snapshots, use `npm run build && npm run start`.
- Next.js dev cache bug may appear (`__webpack_modules__[moduleId] is not a function`); clear with:
  - `pkill -f "next dev"`
  - `rm -rf .next node_modules/.cache`
  - restart dev server.

---

## Definition of Done (Homepage v1)
Homepage is “v1 locked” when:
- It feels premium and intentional (not template-like).
- Story arc is clear:
  1) Why it matters
  2) What goes in
  3) What comes out
  4) How insight compounds
  5) How teams operationalize it
- Every major section has clear hierarchy + next-step cue.
- Mobile + iPad experience remains elegant and usable.
