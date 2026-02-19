import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { AdDigest } from '@/types/digest';
import BrandTag from '@/components/BrandTag';

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

    if (error || !ad) notFound();

    const digest = ad.digest as AdDigest;

    return (
        <div className="py-10">
            <div className="max-w-5xl mx-auto px-6">
                {/* Breadcrumb */}
                <nav className="spec-label mb-8 flex items-center gap-2">
                    <Link href="/dashboard" className="hover:text-accent transition-colors">Library</Link>
                    <span className="text-txt-muted">/</span>
                    <span className="text-txt-secondary">{ad.brand || digest?.meta?.brand_guess || 'Ad Detail'}</span>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    {/* Left Column: Media */}
                    <div className="lg:col-span-2">
                        <div className="sticky top-20 space-y-4">
                            <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
                                {ad.media_kind === 'video' ? (
                                    <video
                                        src={ad.media_url}
                                        className="w-full aspect-[4/5] object-cover"
                                        controls muted playsInline preload="metadata"
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
                                <span className="spec-label">
                                    {new Date(ad.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Full Digest */}
                    <div className="lg:col-span-3 space-y-6">
                        {/* Headline */}
                        <div>
                            <h1 className="text-2xl font-light text-txt-primary leading-tight mb-2 tracking-tight">
                                {digest?.extraction?.on_screen_copy?.primary_headline || 'Headline Unavailable'}
                            </h1>
                            {(digest?.extraction?.on_screen_copy?.supporting_copy?.length || 0) > 0 && (
                                <p className="text-sm text-txt-secondary leading-relaxed">
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
                                    <p className="spec-label-dark mb-2">Visual Style</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {digest.classification.visual_style.map((s: string) => (
                                            <span key={s} className="px-2.5 py-1 rounded-lg bg-accent-muted text-accent text-[10px] font-bold border border-accent/10">{s.replace(/_/g, ' ')}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {digest?.classification?.emotion_tone && (
                                <div className="mt-4">
                                    <p className="spec-label-dark mb-2">Emotion / Tone</p>
                                    <div className="flex flex-wrap gap-1.5">
                                        {digest.classification.emotion_tone.map((e: string) => (
                                            <span key={e} className="px-2.5 py-1 rounded-lg bg-white/5 text-txt-on-dark-muted text-[10px] font-bold border border-white/5">{e.replace(/_/g, ' ')}</span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </Section>

                        {/* Strategy */}
                        <Section title="Strategic Intelligence">
                            <div className="space-y-8">
                                {/* The "Invisible Machinery" Highlight */}
                                <div className="p-5 rounded-2xl bg-accent/5 border border-accent/20 space-y-5">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                                        <p className="text-[10px] font-bold text-accent uppercase tracking-[0.2em]">Invisible Machinery</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <p className="spec-label-dark mb-1.5 text-accent/70">Semiotic Subtext (The Unspoken Promise)</p>
                                            <p className="text-base font-medium text-txt-on-dark leading-relaxed italic">
                                                "{digest?.strategy?.semiotic_subtext || 'Scanning for hidden meanings...'}"
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-white/5">
                                            <p className="spec-label-dark mb-1.5">Objection Dismantling</p>
                                            <p className="text-sm text-txt-on-dark-muted leading-relaxed">
                                                {digest?.strategy?.objection_tackle || 'Analyzing persuasion intent...'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Standard Strategy Rows */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 px-1">
                                    <StrategyRow label="Job-to-be-Done" value={digest?.strategy?.target_job_to_be_done} />
                                    <StrategyRow label="Positioning Claim" value={digest?.strategy?.positioning_claim} />
                                    <StrategyRow label="Differentiator Angle" value={digest?.strategy?.differentiator_angle} />
                                    <StrategyRow label="Behavioral Nudge" value={digest?.strategy?.behavioral_nudge} />
                                    {digest?.strategy?.misdirection_or_friction_removed && (
                                        <StrategyRow label="Friction Removed" value={digest.strategy.misdirection_or_friction_removed} />
                                    )}
                                </div>
                            </div>
                        </Section>

                        {/* Extraction */}
                        <Section title="Visual Extraction">
                            {digest?.extraction?.dominant_color_hex && (
                                <div className="flex items-center gap-3 mb-4">
                                    <div
                                        className="w-8 h-8 rounded-lg border border-white/10 shadow-inner"
                                        style={{ backgroundColor: digest.extraction.dominant_color_hex }}
                                    />
                                    <span className="text-xs font-mono font-bold text-txt-on-dark-muted">{digest.extraction.dominant_color_hex}</span>
                                </div>
                            )}
                            {digest?.extraction?.composition_notes && (
                                <p className="text-xs text-txt-on-dark-muted leading-relaxed mb-4">{digest.extraction.composition_notes}</p>
                            )}
                            {(digest?.extraction?.notable_visual_elements?.length || 0) > 0 && (
                                <div className="flex flex-wrap gap-1.5">
                                    {digest.extraction.notable_visual_elements.map((el: string, i: number) => (
                                        <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-txt-on-dark-muted text-[10px] font-bold border border-white/5">{el}</span>
                                    ))}
                                </div>
                            )}
                            {digest?.extraction?.on_screen_copy?.cta_text && (
                                <div className="mt-4 inline-block px-4 py-2 bg-accent text-surface rounded-xl text-xs font-bold">
                                    CTA: {digest.extraction.on_screen_copy.cta_text}
                                </div>
                            )}
                        </Section>

                        {/* Diagnostics */}
                        <Section title="Diagnostics">
                            {digest?.diagnostics?.confidence && (
                                <div className="grid grid-cols-2 gap-3 mb-4">
                                    {Object.entries(digest.diagnostics.confidence).map(([key, val]) => (
                                        <div key={key} className="flex items-center justify-between bg-white/5 rounded-xl px-3 py-2 border border-white/5">
                                            <span className="spec-label-dark">{key.replace(/_/g, ' ')}</span>
                                            <span className={`text-xs font-bold ${(val as number) >= 0.8 ? 'text-green-400' : (val as number) >= 0.5 ? 'text-yellow-400' : 'text-red-400'}`}>
                                                {((val as number) * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            )}
                            {(digest?.diagnostics?.evidence_anchors?.length || 0) > 0 && (
                                <div className="mb-4">
                                    <p className="spec-label-dark mb-2">Evidence Anchors</p>
                                    <ul className="space-y-1">
                                        {digest.diagnostics.evidence_anchors!.map((a: string, i: number) => (
                                            <li key={i} className="text-xs text-txt-on-dark-muted pl-3 border-l-2 border-accent/30">{a}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {(digest?.diagnostics?.failure_modes?.length || 0) > 0 && (
                                <div>
                                    <p className="spec-label-dark mb-2">Failure Modes</p>
                                    <ul className="space-y-1">
                                        {digest.diagnostics.failure_modes.map((f: string, i: number) => (
                                            <li key={i} className="text-xs text-red-400 pl-3 border-l-2 border-red-500/30">{f}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </Section>
                    </div>
                </div>
            </div>
        </div>
    );
}

/* ── Helper Components ── */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="bg-surface rounded-2xl border border-white/5 p-6">
            <h2 className="text-xs font-bold text-txt-on-dark uppercase tracking-tight mb-5">{title}</h2>
            {children}
        </div>
    );
}

function TagGrid({ items }: { items: { label: string; value?: string | null }[] }) {
    return (
        <div className="grid grid-cols-2 gap-3">
            {items.filter(i => i.value).map(item => (
                <div key={item.label} className="bg-white/5 rounded-xl px-3 py-2.5 border border-white/5">
                    <p className="spec-label-dark mb-0.5">{item.label}</p>
                    <p className="text-xs font-semibold text-txt-on-dark">{item.value!.replace(/_/g, ' ')}</p>
                </div>
            ))}
        </div>
    );
}

function StrategyRow({ label, value }: { label: string; value?: string | null }) {
    if (!value) return null;
    return (
        <div>
            <p className="spec-label-dark mb-1">{label}</p>
            <p className="text-sm text-txt-on-dark-muted leading-relaxed">{value}</p>
        </div>
    );
}
