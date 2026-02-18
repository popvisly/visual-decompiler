import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Escape a value for CSV: wrap in quotes, escape internal quotes
function csvEscape(val: unknown): string {
    if (val === null || val === undefined) return '';
    const str = Array.isArray(val) ? val.join('; ') : String(val);
    return `"${str.replace(/"/g, '""')}"`;
}

const CSV_HEADERS = [
    'id',
    'media_url',
    'media_kind',
    'created_at',
    'brand_guess',
    'product_category_guess',
    'language_guess',
    'trigger_mechanic',
    'secondary_trigger_mechanic',
    'narrative_framework',
    'gaze_priority',
    'cognitive_load',
    'offer_type',
    'claim_type',
    'proof_type',
    'visual_style',
    'emotion_tone',
    'cta_strength',
    'primary_headline',
    'supporting_copy',
    'cta_text',
    'dominant_color_hex',
    'notable_visual_elements',
    'composition_notes',
    'target_job_to_be_done',
    'positioning_claim',
    'differentiator_angle',
    'objection_tackle',
    'behavioral_nudge',
    'confidence_overall',
    'confidence_trigger_mechanic',
];

function digestToRow(job: any): string {
    const d = job.digest || {};
    const meta = d.meta || {};
    const cls = d.classification || {};
    const ext = d.extraction || {};
    const copy = ext.on_screen_copy || {};
    const strat = d.strategy || {};
    const diag = d.diagnostics || {};
    const conf = diag.confidence || {};

    const values = [
        job.id,
        job.media_url,
        job.media_kind,
        job.created_at,
        meta.brand_guess,
        meta.product_category_guess,
        meta.language_guess,
        cls.trigger_mechanic,
        cls.secondary_trigger_mechanic,
        cls.narrative_framework,
        cls.gaze_priority,
        cls.cognitive_load,
        cls.offer_type,
        cls.claim_type,
        cls.proof_type,
        cls.visual_style,
        cls.emotion_tone,
        cls.cta_strength,
        copy.primary_headline,
        copy.supporting_copy,
        copy.cta_text,
        ext.dominant_color_hex,
        ext.notable_visual_elements,
        ext.composition_notes,
        strat.target_job_to_be_done,
        strat.positioning_claim,
        strat.differentiator_angle,
        strat.objection_tackle,
        strat.behavioral_nudge,
        conf.overall,
        conf.trigger_mechanic,
    ];

    return values.map(csvEscape).join(',');
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const format = searchParams.get('format') || 'csv';

    const { data: jobs, error } = await supabaseAdmin
        .from('ad_digests')
        .select('id, media_url, media_kind, created_at, digest')
        .eq('status', 'processed')
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    if (format === 'json') {
        return NextResponse.json(jobs, {
            headers: {
                'Content-Disposition': 'attachment; filename="intelligence-export.json"',
            },
        });
    }

    // CSV
    const rows = [
        CSV_HEADERS.join(','),
        ...(jobs || []).map(digestToRow),
    ];
    const csv = rows.join('\n');

    return new Response(csv, {
        headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="intelligence-export.csv"',
        },
    });
}
