import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function getSemioticOverture(extraction: any) {
    const overture = extraction?.full_dossier?.semiotic_subtext?.overture;
    if (typeof overture === 'string' && overture.trim()) {
        return overture.trim();
    }

    if (typeof extraction?.full_dossier?.semiotic_subtext === 'string') {
        const parts = extraction.full_dossier.semiotic_subtext.split(/\n\n|CHANNEL 1:/i);
        return parts[0]?.replace('[OVERTURE]', '').trim() || null;
    }

    return null;
}

export default async function EmbedPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    const { data: asset, error } = await supabaseAdmin
        .from('assets')
        .select(`
            *,
            brand:brands ( name, market_sector ),
            extraction:extractions ( * )
        `)
        .eq('id', id)
        .single();

    if (error || !asset) {
        return (
            <div className="min-h-screen bg-[#0B0B0A] flex items-center justify-center px-6 text-center text-xs uppercase tracking-[0.28em] text-neutral-500">
                Asset not found in the Intelligence Vault.
            </div>
        );
    }

    const { data: agency } = await supabaseAdmin
        .from('agencies')
        .select('name, whitelabel_logo, primary_hex, tier')
        .limit(1)
        .single();

    const rawTier = agency?.tier || '';
    const isSovereign = rawTier === 'Agency Sovereignty' || rawTier === 'pro';
    const extraction = asset.extraction?.[0] || null;
    const accent = isSovereign && agency?.primary_hex ? agency.primary_hex : '#D4A574';
    const embedLabel = isSovereign && agency?.name ? agency.name : 'Visual Decompiler';
    const overture = getSemioticOverture(extraction);

    return (
        <div className="min-h-screen bg-[#0B0B0A] px-4 py-6 text-white md:px-6 md:py-8">
            <style dangerouslySetInnerHTML={{
                __html: `
                    body {
                        background: #0B0B0A;
                        margin: 0;
                    }
                    ::-webkit-scrollbar {
                        width: 8px;
                        height: 8px;
                    }
                    ::-webkit-scrollbar-track {
                        background: #111110;
                    }
                    ::-webkit-scrollbar-thumb {
                        background: #2E2E2A;
                        border-radius: 999px;
                    }
                `,
            }} />

            <div className="mx-auto max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#111110] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <div className="flex flex-col gap-4 border-b border-white/10 px-6 py-6 md:flex-row md:items-center md:justify-between md:px-8">
                    <div className="flex items-center gap-4">
                        {isSovereign && agency?.whitelabel_logo ? (
                            <img src={agency.whitelabel_logo} alt={agency.name} className="h-10 w-auto object-contain" />
                        ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-bold text-black">V</div>
                        )}
                        <div>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em]" style={{ color: accent }}>
                                {embedLabel}
                            </p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.22em] text-white/40">Forensic Intelligence</p>
                        </div>
                    </div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                        Embedded intelligence card
                    </div>
                </div>

                {extraction ? (
                    <div className="grid gap-8 px-6 py-6 md:grid-cols-[minmax(260px,380px)_1fr] md:px-8 md:py-8">
                        <div className="space-y-5">
                            <div className="relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/10 bg-black">
                                <img src={asset.file_url} alt={asset.brand?.name || 'Embedded asset'} className="h-full w-full object-contain" />
                            </div>

                            {Array.isArray(extraction.color_palette) && extraction.color_palette.length > 0 && (
                                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-4">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-white/45">Chromatic Base</p>
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {extraction.color_palette.slice(0, 8).map((hex: string, index: number) => (
                                            <div key={`${hex}-${index}`} className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-2">
                                                <div className="h-3.5 w-3.5 rounded-full border border-white/10" style={{ backgroundColor: hex }} />
                                                <span className="text-[10px] font-mono tracking-[0.14em] text-white/65">{hex}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-5">
                            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 md:p-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em]" style={{ color: accent }}>Primary Mechanic</p>
                                <h1 className="mt-3 text-3xl font-light uppercase tracking-tight text-white md:text-4xl">
                                    {extraction.primary_mechanic}
                                </h1>
                                <div className="mt-5 flex flex-wrap items-center gap-3 text-[10px] uppercase tracking-[0.2em] text-white/45">
                                    <span>{asset.brand?.name || 'Unknown Brand'}</span>
                                    <span className="text-white/20">•</span>
                                    <span>{asset.brand?.market_sector || 'Uncategorized'}</span>
                                </div>
                            </div>

                            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 md:p-6">
                                <div className="flex items-end justify-between gap-4">
                                    <div>
                                        <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">Confidence</p>
                                        <div className="mt-3 text-5xl font-light tracking-tight" style={{ color: accent }}>
                                            {extraction.confidence_score}
                                            <span className="text-2xl text-white/30">%</span>
                                        </div>
                                    </div>
                                    <p className="max-w-[220px] text-right text-[11px] uppercase tracking-[0.18em] text-white/35">
                                        Evidence density and structural alignment
                                    </p>
                                </div>
                                <div className="mt-5 overflow-hidden rounded-full bg-white/10">
                                    <div className="h-2 rounded-full" style={{ width: `${Math.min(extraction.confidence_score, 100)}%`, backgroundColor: accent }} />
                                </div>
                            </div>

                            {overture && (
                                <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 md:p-6">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">Semiotic Overture</p>
                                    <p className="mt-4 text-sm leading-relaxed text-white/72 md:text-[15px]">
                                        {overture}
                                    </p>
                                </div>
                            )}

                            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5 md:p-6">
                                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/45">DNA Prompt</p>
                                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-white/72 md:text-[15px]">
                                    {extraction.dna_prompt || 'DNA prompt unavailable.'}
                                </p>
                            </div>

                            <div className="rounded-[1.5rem] border border-white/10 bg-black/20 p-5">
                                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/35">
                                    Asset ID: {asset.id.split('-')[0]}
                                </p>
                                {!isSovereign && (
                                    <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-white/45">
                                        Powered by Visual Decompiler
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="px-6 py-16 text-center text-xs uppercase tracking-[0.24em] text-white/35 md:px-8">
                        No forensic extraction data available.
                    </div>
                )}
            </div>
        </div>
    );
}
