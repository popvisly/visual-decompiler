---
name: vd-prompt-engineering
description: How prompts are structured, versioned, and used in the Visual Decompiler AI pipeline. Use this before modifying or adding any AI prompts.
---

# Visual Decompiler — Prompt Engineering

## Source of Truth

All prompts live in **`src/lib/prompts.ts`** (34KB, ~813 lines).

> ⚠️ The file header says: `// AUTO-GENERATED from artifacts/*.md. Do not hand-edit. Regenerate: node scripts/generate-prompts.cjs`
> In practice, prompts are edited directly. Just be aware the generator exists if artifacts/ MDX files are ever used.

## Prompt Versions

| Export | Version | Purpose |
|--------|---------|---------|
| `BLACK_BOX_PROMPT_V1` | V1 | One-shot vision analysis — full JSON digest (schema v2.2) |
| `BLACK_BOX_PROMPT_V2` | V2 | Advanced premium strategic digest |
| `BLACK_BOX_PROMPT_V3` | V3 | Narrative arc + strategic timeline (video-focused) |
| `BLACK_BOX_PROMPT_V4` | V4 | Multimodal (STT/OCR) — most comprehensive |

All prompts are arrays of strings joined with `\n` — this is intentional for readability and diffing.

## JSON Output Schema (v2.2)

All prompts return the same top-level structure:

```json
{
  "meta": { "media_type", "brand_guess", "schema_version": "2.2", "adoption_tier", ... },
  "classification": { "trigger_mechanic", "narrative_framework", "persuasion_stack", ... },
  "audience_strategy": { "target_audience_segment", "first3s_hook_type", ... },
  "premium_intelligence": { "premium_principles", "premium_index_score", ... },
  "semiotic_intelligence": { "semiotic_layers", "semiotic_tensions", ... },
  "extraction": { "on_screen_copy", "evidence_receipts", "likely_scan_path", ... },
  "strategy": { "test_plan", "variant_matrix", "competitive_intelligence", ... },
  "diagnostics": { "confidence", "friction_analysis", "platform_fitness", "risk_analysis", ... }
}
```

## Controlled Vocabularies (MUST use exactly)

These are enum fields — any value not in the list will break downstream rendering:

**`trigger_mechanic`** (choose exactly ONE):
`Status_Prestige`, `FOMO_Scarcity`, `Security_Trust`, `Rebellion_Disruption`, `Nostalgia_Comfort`, `Tribal_Belonging`, `Sex_Desire`, `Convenience_Time`, `Savings_Value`, `Self_Improvement_Mastery`, `Relief_Pain_Avoidance`

**`narrative_framework`** (choose exactly ONE):
`Problem_Agitation_Solution`, `Before_After_Transformation`, `Micro_Heros_Journey`, `Aspirational_DayInLife`, `Absurdist_PatternInterrupt`, `Educational_Breakdown`, `Testimonial_SocialProof`, `ProductAsHero_NoStory`, `Challenge_Proof_Result`

**`adoption_tier`**: `Edgy` | `Trendy` | `Mainstream`

**`gaze_priority`**: `Human_Face_EyeContact`, `Human_Body_Action`, `Product_Packaging`, `Typography_Headline`, `Logo_BrandMark`, `Price_Discount_Badge`, `Color_Block_Abstract`, `Scene_Context_Environment`

**`cognitive_load`**: `Minimal_HighContrast`, `Cinematic_SlowBurn`, `Fast_Tense`, `Dense_InfoHeavy`, `Chaotic_Cluttered`

## Adding a New Prompt

1. Add a new export to `prompts.ts` as a string array joined with `\n`
2. Match the v2.2 JSON schema structure — don't add top-level keys
3. Set `"schema_version": "2.2"` and `"prompt_version": "V5"` (or next)
4. Register it in `src/lib/neural_deconstruction_service.ts` or whichever service calls it
5. Normalize output through `src/lib/digest_normalize.ts` before storing

## Hard Rules (from all prompts)

1. **Anti-hallucination**: Every claim must cite a visual/textual evidence anchor
2. **Strict JSON output**: No markdown, no commentary, no extra keys
3. **Low-signal handling**: If frames are black/low-info → set `"Insufficient signal"`, cap confidence ≤ 0.4
4. **Evidence receipts**: Every `evidence_receipts` entry MUST have `area: { x, y, w, h }` in 0-1000 coordinates
5. **Reinforcing cues**: Don't assert semiotic claims without ≥2 independent reinforcing cues

## Where Prompts Are Called

- `src/lib/neural_deconstruction_service.ts` — primary deconstruction
- `src/lib/vision.ts` — image/video vision processing
- `src/lib/deep_audit.ts` — deep forensic audit (uses extended prompts)
- Results flow through `src/lib/digest_normalize.ts` → stored as `digest` JSONB in `ads` table
