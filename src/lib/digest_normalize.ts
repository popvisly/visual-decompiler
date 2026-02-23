import { AdDigest } from '@/types/digest';

/**
 * Normalize/defensively coerce LLM output into a shape that's more likely to
 * validate against AdDigestSchema and behave consistently in the UI.
 *
 * This should be conservative: do not invent meaning, just sanitize.
 */
export function normalizeDigest(input: any): any {
    const d: any = (input && typeof input === 'object') ? input : {};

    // Ensure objects exist
    d.meta = d.meta && typeof d.meta === 'object' ? d.meta : {};
    d.classification = d.classification && typeof d.classification === 'object' ? d.classification : {};
    d.extraction = d.extraction && typeof d.extraction === 'object' ? d.extraction : {};
    d.extraction.on_screen_copy = d.extraction.on_screen_copy && typeof d.extraction.on_screen_copy === 'object'
        ? d.extraction.on_screen_copy
        : {};
    d.strategy = d.strategy && typeof d.strategy === 'object' ? d.strategy : {};
    d.diagnostics = d.diagnostics && typeof d.diagnostics === 'object' ? d.diagnostics : {};
    d.diagnostics.confidence = d.diagnostics.confidence && typeof d.diagnostics.confidence === 'object'
        ? d.diagnostics.confidence
        : {};

    // Coerce common “empty” values to null where appropriate
    const nullIfEmpty = (v: any) => (typeof v === 'string' && v.trim() === '' ? null : v);
    d.meta.brand_guess = nullIfEmpty(d.meta.brand_guess);
    d.meta.historical_genealogy = nullIfEmpty(d.meta.historical_genealogy);
    d.meta.adoption_tier = nullIfEmpty(d.meta.adoption_tier);
    d.meta.predicted_resonance_window = nullIfEmpty(d.meta.predicted_resonance_window);

    // momentum must be a number
    if (typeof d.meta.trend_momentum === 'string') {
        const n = Number(d.meta.trend_momentum);
        if (!Number.isNaN(n)) d.meta.trend_momentum = n;
    }
    d.meta.product_category_guess = nullIfEmpty(d.meta.product_category_guess);
    d.meta.language_guess = nullIfEmpty(d.meta.language_guess);

    d.extraction.on_screen_copy.primary_headline = nullIfEmpty(d.extraction.on_screen_copy.primary_headline);
    d.extraction.on_screen_copy.cta_text = nullIfEmpty(d.extraction.on_screen_copy.cta_text);
    d.extraction.dominant_color_hex = nullIfEmpty(d.extraction.dominant_color_hex);

    // Arrays that must be arrays (prevent single string values)
    const arr = (v: any) => (Array.isArray(v) ? v : (v == null ? [] : [v]));

    // Clamp known UI-bounded arrays
    d.classification.proof_type = arr(d.classification.proof_type).slice(0, 2);
    d.classification.visual_style = arr(d.classification.visual_style).slice(0, 2);
    d.classification.emotion_tone = arr(d.classification.emotion_tone).slice(0, 2);

    // Optional extraction arrays
    d.extraction.on_screen_copy.supporting_copy = arr(d.extraction.on_screen_copy.supporting_copy);
    d.extraction.on_screen_copy.disclaimers = arr(d.extraction.on_screen_copy.disclaimers);
    d.extraction.on_screen_copy.ocr_text = arr(d.extraction.on_screen_copy.ocr_text);
    d.extraction.notable_visual_elements = arr(d.extraction.notable_visual_elements);

    // Strategy evidence anchors (optional)
    if (d.strategy && 'evidence_anchors' in d.strategy) {
        d.strategy.evidence_anchors = arr(d.strategy.evidence_anchors);
    }
    if (d.diagnostics && 'evidence_anchors' in d.diagnostics) {
        d.diagnostics.evidence_anchors = arr(d.diagnostics.evidence_anchors);
    }

    // Confidence overall should be a number when present
    if (typeof d.diagnostics.confidence.overall === 'string') {
        const n = Number(d.diagnostics.confidence.overall);
        if (!Number.isNaN(n)) d.diagnostics.confidence.overall = n;
    }

    return d;
}
