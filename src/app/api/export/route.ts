import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// ---------------------------------------------------------------------------
// Export contract — single source of truth for both CSV and JSON
// ---------------------------------------------------------------------------
type ExportRow = {
    id: string;
    created_at: string;
    media_url: string;
    media_kind: string;
    status: string;
    model: string;
    prompt_version: string;
    brand_guess: string | null;
    product_category_guess: string | null;
    language_guess: string | null;
    trigger_mechanic: string | null;
    secondary_trigger_mechanic: string | null;
    claim_type: string | null;
    offer_type: string | null;
    narrative_framework: string | null;
    gaze_priority: string | null;
    cognitive_load: string | null;
    cta_strength: string | null;
    primary_headline: string | null;
    positioning_claim: string | null;
    confidence_overall: number | null;
    confidence_trigger: number | null;
    confidence_copy: number | null;
    evidence_anchors: string | null;
};

function flattenDigest(job: any): ExportRow {
    const d = job.digest || {};
    const meta = d.meta || {};
    const cls = d.classification || {};
    const ext = d.extraction || {};
    const copy = ext.on_screen_copy || {};
    const strat = d.strategy || {};
    const diag = d.diagnostics || {};
    const conf = diag.confidence || {};
    const anchors: string[] = diag.evidence_anchors || [];

    return {
        id: job.id,
        created_at: job.created_at,
        media_url: job.media_url,
        media_kind: job.media_kind,
        status: job.status,
        model: job.model,
        prompt_version: job.prompt_version,
        brand_guess: meta.brand_guess ?? null,
        product_category_guess: meta.product_category_guess ?? null,
        language_guess: meta.language_guess ?? null,
        trigger_mechanic: cls.trigger_mechanic ?? null,
        secondary_trigger_mechanic: cls.secondary_trigger_mechanic ?? null,
        claim_type: cls.claim_type ?? null,
        offer_type: cls.offer_type ?? null,
        narrative_framework: cls.narrative_framework ?? null,
        gaze_priority: cls.gaze_priority ?? null,
        cognitive_load: cls.cognitive_load ?? null,
        cta_strength: cls.cta_strength ?? null,
        primary_headline: copy.primary_headline ?? null,
        positioning_claim: strat.positioning_claim ?? null,
        confidence_overall: conf.overall ?? null,
        confidence_trigger: conf.trigger_mechanic ?? null,
        confidence_copy: conf.copy_transcription ?? null,
        evidence_anchors: anchors.length ? anchors.join(' | ') : null,
    };
}

// ---------------------------------------------------------------------------
// CSV helpers
// ---------------------------------------------------------------------------
function csvEscape(val: unknown): string {
    if (val === null || val === undefined) return '';
    return `"${String(val).replace(/"/g, '""')}"`;
}

function rowToCsv(row: ExportRow): string {
    return (Object.values(row) as unknown[]).map(csvEscape).join(',');
}

const CSV_HEADER = Object.keys({
    id: 0, created_at: 0, media_url: 0, media_kind: 0, status: 0, model: 0, prompt_version: 0,
    brand_guess: 0, product_category_guess: 0, language_guess: 0,
    trigger_mechanic: 0, secondary_trigger_mechanic: 0, claim_type: 0, offer_type: 0,
    narrative_framework: 0, gaze_priority: 0, cognitive_load: 0, cta_strength: 0,
    primary_headline: 0, positioning_claim: 0,
    confidence_overall: 0, confidence_trigger: 0, confidence_copy: 0,
    evidence_anchors: 0,
} satisfies Record<keyof ExportRow, 0>).join(',');

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export async function GET(req: Request) {
    // Auth: check httpOnly cookie set by /api/export/unlock
    // If EXPORT_TOKEN is not set in env or set to 'OPEN', the route is open
    // [cache-bust: v3 — force reload env vars]
    const exportToken = (process.env.EXPORT_TOKEN || '').trim();
    if (exportToken && exportToken !== 'OPEN' && exportToken !== '') {
        const cookieHeader = req.headers.get('cookie') || '';
        const hasExportCookie = cookieHeader.split(';').some(c => c.trim() === 'export_ok=1');
        if (!hasExportCookie) {
            return new Response('Unauthorized. Visit /api/export/unlock?key=<token> first.', { status: 401 });
        }
    }

    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'csv';

    const { data: jobs, error } = await supabaseAdmin
        .from('ad_digests')
        .select('id, created_at, media_url, media_kind, status, model, prompt_version, digest')
        .eq('status', 'processed')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const rows = (jobs || []).map(flattenDigest);

    if (format === 'json') {
        return NextResponse.json(rows, {
            headers: {
                'Content-Disposition': 'attachment; filename="intelligence-export.json"',
            },
        });
    }

    const csv = [CSV_HEADER, ...rows.map(rowToCsv)].join('\n');

    return new Response(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="intelligence-export.csv"',
        },
    });
}
