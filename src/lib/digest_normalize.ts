import { AdDigest } from '@/types/digest';

/**
 * Normalize/defensively coerce LLM output into a shape that's more likely to
 * validate against AdDigestSchema and behave consistently in the UI.
 *
 * This should be conservative: do not invent meaning, just sanitize.
 */
export function normalizeDigest(input: any): any {
    const d: any = (input && typeof input === 'object') ? input : {};

    const asStr = (v: any) => (typeof v === 'string' ? v : (v == null ? '' : String(v)));
    const lc = (v: any) => asStr(v).toLowerCase();

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

    // --- Enum-ish mapping (keep contract consistent) ---
    // offer_type is an enum; models sometimes output free-text like "Used Cars".
    // We map common phrases to our controlled vocabulary.
    const offerRaw = lc(d.classification.offer_type);
    if (offerRaw) {
        if (offerRaw.includes('used') || offerRaw.includes('pre-owned') || offerRaw.includes('preowned') || offerRaw.includes('premium selection')) {
            d.classification.offer_type = 'OneTime_Purchase';
        }
        // If it looks like a hard discount, map to discount.
        if (offerRaw.includes('%') || offerRaw.includes('off') || offerRaw.includes('sale') || offerRaw.includes('discount')) {
            d.classification.offer_type = 'Limited_Time_Discount';
        }
    }

    // Emotion tone: collapse common synonyms to our enum values.
    const tone = arr(d.classification.emotion_tone).map((t: any) => lc(t));
    if (tone.some(t => t.includes('seduct') || t.includes('intimat') || t.includes('allure') || t.includes('sexy'))) {
        d.classification.emotion_tone = ['Desire'];
    } else if (tone.some(t => t.includes('funny') || t.includes('humor') || t.includes('irony') || t.includes('satire') || t.includes('cheeky'))) {
        d.classification.emotion_tone = ['Humor'];
    }

    // Visual style: map common free-text to our enums.
    const vs = arr(d.classification.visual_style).map((t: any) => lc(t));
    if (vs.some(t => t.includes('high contrast') || t.includes('high-contrast') || t.includes('glamour') || t.includes('glossy') || t.includes('fashion'))) {
        d.classification.visual_style = ['Editorial_Fashion'];
    }

    // Gaze priority: map free-text to known enum.
    const gaze = lc(d.classification.gaze_priority);
    if (gaze && (gaze.includes('face') || gaze.includes('gaze') || gaze.includes('expression') || gaze.includes('eye'))) {
        d.classification.gaze_priority = 'Human_Face_EyeContact';
    }

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
