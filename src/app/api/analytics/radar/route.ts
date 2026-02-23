import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

type RadarField = {
    key: string;
    label: string;
    kind: 'scalar' | 'array';
    path: (d: any) => any;
};

const FIELDS: RadarField[] = [
    {
        key: 'trigger_mechanic',
        label: 'Trigger Mechanic',
        kind: 'scalar',
        path: (d) => d?.classification?.trigger_mechanic,
    },
    {
        key: 'narrative_framework',
        label: 'Narrative Framework',
        kind: 'scalar',
        path: (d) => d?.classification?.narrative_framework,
    },
    {
        key: 'offer_type',
        label: 'Offer Type',
        kind: 'scalar',
        path: (d) => d?.classification?.offer_type,
    },
    {
        key: 'claim_type',
        label: 'Claim Type',
        kind: 'scalar',
        path: (d) => d?.classification?.claim_type,
    },
    {
        key: 'visual_style',
        label: 'Visual Style',
        kind: 'array',
        path: (d) => d?.classification?.visual_style,
    },
    {
        key: 'emotion_tone',
        label: 'Emotion / Tone',
        kind: 'array',
        path: (d) => d?.classification?.emotion_tone,
    },
];

function safeArr(v: any): string[] {
    if (!v) return [];
    if (Array.isArray(v)) return v.filter(Boolean).map(String);
    return [String(v)];
}

function dayKey(dt: Date) {
    return dt.toISOString().slice(0, 10);
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const days = Math.min(180, Math.max(7, parseInt(searchParams.get('days') || '30')));
    const category = searchParams.get('category');
    const topN = Math.min(10, Math.max(3, parseInt(searchParams.get('top') || '6')));

    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const midPoint = new Date();
    midPoint.setDate(midPoint.getDate() - Math.floor(days / 2));

    try {
        let q = supabaseAdmin
            .from('ad_digests')
            .select('id, created_at, media_url, digest')
            .eq('status', 'processed')
            .gte('created_at', startDate.toISOString());

        if (category) {
            q = q.filter('digest->meta->>product_category_guess', 'eq', category);
        }

        const { data: ads, error } = await q;
        if (error) throw error;

        const totals = {
            total: ads?.length || 0,
            recent: 0,
            baseline: 0,
        };

        // counts[fieldKey][value] = { recent, baseline, exemplarsRecent: [], exemplarsBaseline: [] }
        const counts: Record<string, Record<string, any>> = {};
        FIELDS.forEach(f => (counts[f.key] = {}));

        for (const ad of ads || []) {
            const createdAt = new Date(ad.created_at);
            const bucket = createdAt >= midPoint ? 'recent' : 'baseline';
            (totals as any)[bucket]++;

            for (const field of FIELDS) {
                const v = field.path(ad.digest);
                const values = field.kind === 'array' ? safeArr(v) : (v ? [String(v)] : []);
                for (const value of values) {
                    if (!value) continue;
                    if (!counts[field.key][value]) {
                        counts[field.key][value] = { recent: 0, baseline: 0, exemplarsRecent: [], exemplarsBaseline: [] };
                    }
                    counts[field.key][value][bucket]++;
                    const exKey = bucket === 'recent' ? 'exemplarsRecent' : 'exemplarsBaseline';
                    // cap exemplars to keep payload small
                    if (counts[field.key][value][exKey].length < 5) {
                        counts[field.key][value][exKey].push({
                            id: ad.id,
                            media_url: ad.media_url,
                            created_at: ad.created_at,
                        });
                    }
                }
            }
        }

        const radar = FIELDS.map(field => {
            const entries = Object.entries(counts[field.key] || {}).map(([value, c]: any) => {
                const recent = c.recent || 0;
                const baseline = c.baseline || 0;

                // % shift vs baseline; if baseline is 0 but recent exists, treat as strong emergence.
                const shift = baseline === 0 ? (recent > 0 ? 999 : 0) : ((recent - baseline) / baseline) * 100;

                return {
                    field: field.key,
                    label: field.label,
                    value,
                    recent,
                    baseline,
                    shift: Math.round(shift),
                    exemplarsRecent: c.exemplarsRecent || [],
                    exemplarsBaseline: c.exemplarsBaseline || [],
                };
            });

            const rising = entries
                .filter(e => e.recent >= 2)
                .sort((a, b) => b.shift - a.shift)
                .slice(0, topN);

            const falling = entries
                .filter(e => e.baseline >= 2)
                .sort((a, b) => a.shift - b.shift)
                .slice(0, topN);

            return {
                field: field.key,
                label: field.label,
                rising,
                falling,
            };
        });

        return NextResponse.json({
            days,
            category: category || null,
            sampleSize: totals.total,
            window: {
                start: startDate.toISOString(),
                mid: midPoint.toISOString(),
            },
            totals,
            radar,
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
