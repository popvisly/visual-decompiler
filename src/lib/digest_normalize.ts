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

    // Palette: coerce to array of 6-char hex strings (no #). Keep up to 6.
    d.extraction.palette_hex = arr(d.extraction.palette_hex)
        .map((c: any) => asStr(c).trim().replace(/^#/, '').toUpperCase())
        .filter((c: string) => /^[0-9A-F]{6}$/.test(c))
        .slice(0, 6);

    // If we have a dominant color, ensure it appears first in the palette.
    if (d.extraction.dominant_color_hex) {
        const dom = asStr(d.extraction.dominant_color_hex).trim().replace(/^#/, '').toUpperCase();
        if (/^[0-9A-F]{6}$/.test(dom)) {
            d.extraction.dominant_color_hex = dom;
            const rest = (d.extraction.palette_hex || []).filter((c: string) => c !== dom);
            d.extraction.palette_hex = [dom, ...rest].slice(0, 6);
        } else {
            // If dominant isn't a valid hex, drop it to avoid UI issues.
            d.extraction.dominant_color_hex = null;
        }
    }

    // If we have a dominant color but no palette, seed palette with dominant.
    if (d.extraction.dominant_color_hex && (!Array.isArray(d.extraction.palette_hex) || d.extraction.palette_hex.length === 0)) {
        const dom = asStr(d.extraction.dominant_color_hex).trim().replace(/^#/, '').toUpperCase();
        if (/^[0-9A-F]{6}$/.test(dom)) d.extraction.palette_hex = [dom];
    }

    // Clamp known UI-bounded arrays
    d.classification.proof_type = arr(d.classification.proof_type).slice(0, 2);
    d.classification.visual_style = arr(d.classification.visual_style).slice(0, 2);
    d.classification.emotion_tone = arr(d.classification.emotion_tone).slice(0, 2);

    // --- Enum-ish mapping (keep contract consistent) ---
    // offer_type is an enum; models sometimes output free-text.
    // Prefer OCR/text grounding over vibes.
    const ocrAll = [
        ...arr(d.extraction?.on_screen_copy?.ocr_text),
        d.extraction?.on_screen_copy?.primary_headline,
        d.extraction?.on_screen_copy?.cta_text,
    ].map(lc).join(' | ');

    // Hard override: if OCR indicates pre-owned / used inventory, map to OneTime_Purchase.
    if (ocrAll.includes('used') || ocrAll.includes('pre-owned') || ocrAll.includes('preowned') || ocrAll.includes('premium selection')) {
        d.classification.offer_type = 'OneTime_Purchase';
    } else {
        const offerRaw = lc(d.classification.offer_type);
        if (offerRaw) {
            // Generic promotional language should map to a known enum.
            if (offerRaw.includes('promo') || offerRaw.includes('promotion') || offerRaw.includes('promotional')) {
                d.classification.offer_type = 'Limited_Time_Discount';
            }
            // If it looks like a hard discount, map to discount.
            if (offerRaw.includes('%') || offerRaw.includes('off') || offerRaw.includes('sale') || offerRaw.includes('discount')) {
                d.classification.offer_type = 'Limited_Time_Discount';
            }
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

    // --- Forensic Evidence Layer Normalization ---
    // If we have legacy anchors but no evidence_receipts, migrate them.
    if ((d.extraction?.anchors || d.extraction?.evidence_anchors) && (!d.extraction?.evidence_receipts || d.extraction.evidence_receipts.length === 0)) {
        const legacy = arr(d.extraction?.anchors || d.extraction?.evidence_anchors);
        d.extraction.evidence_receipts = legacy.map((a: any, idx: number) => ({
            id: a.id || `receipt-${idx}`,
            type: a.type || 'Visual',
            label: a.label || 'Evidence',
            reason: a.reason || a.description || 'Strategic cue detected.',
            area: a.area || a.coordinates || null,
            content: a.content || a.text || null
        }));
    }

    // Ensure all evidence_receipts have areas formatted correctly for the UI
    if (d.extraction?.evidence_receipts) {
        d.extraction.evidence_receipts = arr(d.extraction.evidence_receipts).map((r: any, idx: number) => {
            const area = r.area || r.coordinates;
            return {
                ...r,
                id: r.id || `rec-${idx}`,
                area: area && typeof area === 'object' ? {
                    x: Number(area.x || 0),
                    y: Number(area.y || 0),
                    w: Number(area.w || 0),
                    h: Number(area.h || 0)
                } : null
            };
        });
    }

    // Also migrate likely_scan_path coordinates
    if (d.extraction?.likely_scan_path) {
        d.extraction.likely_scan_path = arr(d.extraction.likely_scan_path).map((s: any) => {
            const area = s.area || s.coordinates;
            return {
                ...s,
                area: area && typeof area === 'object' ? {
                    x: Number(area.x || 0),
                    y: Number(area.y || 0),
                    w: Number(area.w || 0),
                    h: Number(area.h || 0)
                } : null
            };
        });
    }

    return d;
}
