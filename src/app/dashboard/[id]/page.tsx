import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { AdDigest } from '@/types/digest';
import BrandTag from '@/components/BrandTag';
import Header from '@/components/Header';

export const dynamic = 'force-dynamic';

export default async function AdDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { data: ad, error } = await supabaseAdmin
        .from('ad_digests')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !ad) {
        notFound();
    }

    const digest = ad.digest as AdDigest;

    return (
        <main className="min-h-screen bg-slate-50">
            <Header />

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Breadcrumb */}
                <nav className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                    <Link href="/dashboard" className="hover:text-slate-600 transition-colors">Library</Link>
                    <span>/</span>
                    <span className="text-slate-600">{ad.brand || digest?.meta?.brand_guess || 'Ad Detail'}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left Column: Media */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-24 space-y-4">
                            <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm">
                                {ad.media_kind === 'video' ? (
                                    <video
                                        src={ad.media_url}
                                        className="w-full aspect-[4/5] object-cover"
                                        controls
                                        muted
                                        playsInline
                                        preload="metadata"
                                    />
                                ) : (
                                    <img
                                        src={ad.media_url}
                                        alt={ad.brand || digest?.meta?.brand_guess || 'Ad'}
                                        className="w-full aspect-[4/5] object-cover"
                                    />
                                )}
                            </div>
                            <div className="flex items-center justify-between px-1">
                                <BrandTag
                                    adId={ad.id}
                                    brand={ad.brand ?? null}
                                    brandGuess={digest?.meta?.brand_guess ?? null}
                                />
                                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                                    {new Date(ad.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Full Digest */}
                    <div className="lg:col-span-3 space-y-8">
                        {/* Headline */}
                        <div>
                            <h1 className="text-2xl font-black text-slate-900 leading-tight mb-2">
                                {digest?.extraction?.on_screen_copy?.primary_headline || 'Headline Unavailable'}
                            </h1>
                            {digest?.extraction?.on_screen_copy?.supporting_copy?.length > 0 && (
                                <p className="text-sm text-slate-500 leading-relaxed">
                                    {digest.extraction.on_screen_copy.supporting_copy.join(' · ')}
                                </p>
                            )}
                        </div>

                        {/* Classification */}
                        <Section title="Classification">
                            <TagGrid items={[
                                { label: 'Trigger Mechanic', value: digest?.classification?.trigger_mechanic },
                                { label: 'Secondary Trigger', value: digest?.classification?.secondary_trigger_mechanic },
                                { label: 'Narrative Framework', value: digest?.classification?.narrative_framework },
                                { label: 'Claim Type', value: digest?.classification?.claim_type },
                                { label: 'Offer Type', value: digest?.classification?.offer_type },
                                { label: 'CTA Strength', value: digest?.classification?.cta_strength },
                                { label: 'Cognitive Load', value: digest?.classification?.cognitive_load },
                                { label: 'Gaze Priority', value: digest?.classification?.gaze_priority },
                            ]} />
                            {digest?.classification?.visual_style && (
                                <div className="mt-4">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Visual Style</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {digest.classification.visual_style.map((s: string) => (
                                            <span key={s} className="px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 text-[10px] font-bold border border-violet-100">{s.replace(/_/g, ' ')}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {digest?.classification?.emotion_tone && (
                                <div className="mt-4">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Emotion / Tone</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {digest.classification.emotion_tone.map((e: string) => (
                                            <span key={e} className="px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-100">{e.replace(/_/g, ' ')}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Section>

                        {/* Strategy */}
                        <Section title="Strategic Intelligence">
                            <div className="space-y-4">
                                <StrategyRow label="Job-to-be-Done" value={digest?.strategy?.target_job_to_be_done} />
                                <StrategyRow label="Objection Tackle" value={digest?.strategy?.objection_tackle} />
                                <StrategyRow label="Positioning Claim" value={digest?.strategy?.positioning_claim} />
                                <StrategyRow label="Differentiator Angle" value={digest?.strategy?.differentiator_angle} />
                                <StrategyRow label="Semiotic Subtext" value={digest?.strategy?.semiotic_subtext} />
                                <StrategyRow label="Behavioral Nudge" value={digest?.strategy?.behavioral_nudge} />
                                {digest?.strategy?.misdirection_or_friction_removed && (
                                    <StrategyRow label="Friction Removed" value={digest.strategy.misdirection_or_friction_removed} />
                                )}
                            </div>
                        </Section>

                        {/* Extraction */}
                        <Section title="Visual Extraction">
                            {digest?.extraction?.dominant_color_hex && (
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-8 h-8 rounded-lg border border-slate-200 shadow-inner"
                                        style={{ backgroundColor: digest.extraction.dominant_color_hex }}
                                    />
                                    <span className="text-xs font-mono font-bold text-slate-500">{digest.extraction.dominant_color_hex}</span>
                                </div>
                            )}
                            {digest?.extraction?.composition_notes && (
                                <p className="text-xs text-slate-600 leading-relaxed mb-4">{digest.extraction.composition_notes}</p>
                            )}
                            {digest?.extraction?.notable_visual_elements?.length > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {digest.extraction.notable_visual_elements.map((el: string, i: number) => (
                                        <span key={i} className="px-2.5 py-1 rounded-lg bg-slate-50 text-slate-600 text-[10px] font-bold border border-slate-100">{el}</span>
                                    ))}
                                </div>
                            )}
                            {digest?.extraction?.on_screen_copy?.cta_text && (
                                <div className="mt-4 inline-block px-4 py-2 bg-slate-900 text-white rounded-xl text-xs font-bold">
                                    CTA: {digest.extraction.on_screen_copy.cta_text}
                                </div>
                            )}
                        </Section>

                        {/* Diagnostics */}
                        <Section title="Diagnostics">
                            {digest?.diagnostics?.confidence && (
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {Object.entries(digest.diagnostics.confidence).map(([key, val]) => (
                                        <div key={key} className="flex items-center justify-between bg-slate-50 rounded-xl px-3 py-2 border border-slate-100">
                                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">{key.replace(/_/g, ' ')}</span>
                                            <span className={`text-xs font-black ${(val as number) >= 0.8 ? 'text-emerald-600' : (val as number) >= 0.5 ? 'text-amber-600' : 'text-rose-600'}`}>
                                                {((val as number) * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {digest?.diagnostics?.evidence_anchors?.length > 0 && (
                                <div className="mb-4">
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Evidence Anchors</p>
                                    <ul className="space-y-1">
                                        {digest.diagnostics.evidence_anchors.map((a: string, i: number) => (
                                            <li key={i} className="text-xs text-slate-600 pl-3 border-l-2 border-slate-200">{a}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {digest?.diagnostics?.failure_modes?.length > 0 && (
                                <div>
                                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Failure Modes</p>
                                    <ul className="space-y-1">
                                        {digest.diagnostics.failure_modes.map((f: string, i: number) => (
                                            <li key={i} className="text-xs text-rose-500 pl-3 border-l-2 border-rose-200">{f}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Section>
                    </div>
                </div>
            </div>
        </main>
    );
}

/* ── Helper Components ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-white rounded-3xl border border-slate-200 p-8 shadow-sm">
            <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight mb-6">{title}</h2>
            {children}
        </div>
    );
}

function TagGrid({ items }: { items: { label: string; value?: string | null }[] }) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {items.filter(i => i.value).map(item => (
                <div key={item.label} className="bg-slate-50 rounded-xl px-3 py-2.5 border border-slate-100">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mb-0.5">{item.label}</p>
                    <p className="text-xs font-bold text-slate-800">{item.value!.replace(/_/g, ' ')}</p>
                </div>
            ))}
        </div>
    );
}

function StrategyRow({ label, value }: { label: string; value?: string | null }) {
    if (!value) return null;
    return (
        <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
            <p className="text-sm text-slate-700 leading-relaxed">{value}</p>
        </div>
    );
}
