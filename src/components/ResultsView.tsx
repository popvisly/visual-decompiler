'use client';

import { AdDigest } from '@/types/digest';
import ResultsCard, {
    ClassificationPill,
    PullQuote,
    BulletList,
    ConfidenceGauge,
    TagRow,
    StrategyField,
} from './ResultsCard';
import { RotateCcw, Download } from 'lucide-react';

type Props = {
    mediaUrl: string;
    mediaKind: string;
    digest: AdDigest;
    brand?: string | null;
    onReset: () => void;
};

export default function ResultsView({ mediaUrl, mediaKind, digest, brand, onReset }: Props) {
    const d = digest;
    const cls = d.classification;
    const ext = d.extraction;
    const strat = d.strategy;
    const diag = d.diagnostics;
    const copy = ext.on_screen_copy;

    const displayBrand = brand || d.meta?.brand_guess;

    return (
        <div className="w-full max-w-6xl mx-auto page-enter">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="font-editorial text-3xl font-medium text-txt-on-dark tracking-tight">
                        Analysis Complete
                    </h2>
                    {displayBrand && (
                        <p className="text-sm text-txt-on-dark-muted mt-1">
                            Brand: <span className="text-accent font-semibold">{displayBrand}</span>
                            {d.meta?.product_category_guess && (
                                <span className="text-txt-on-dark-muted"> · {d.meta.product_category_guess}</span>
                            )}
                        </p>
                    )}
                </div>
                <button
                    onClick={onReset}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold text-txt-on-dark-muted border border-white/10 hover:border-accent/30 hover:text-accent transition-all"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Analyze Another
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Left — Media */}
                <div className="lg:col-span-2">
                    <div className="sticky top-8 space-y-4">
                        <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden">
                            {mediaKind === 'video' ? (
                                <video
                                    src={mediaUrl}
                                    className="w-full aspect-[4/5] object-cover"
                                    controls muted playsInline preload="metadata"
                                />
                            ) : (
                                <img
                                    src={mediaUrl}
                                    alt={displayBrand || 'Ad'}
                                    className="w-full aspect-[4/5] object-cover"
                                />
                            )}
                        </div>

                        {/* Headline */}
                        {copy?.primary_headline && (
                            <div className="px-1">
                                <p className="spec-label-dark mb-1">Primary Headline</p>
                                <p className="text-lg font-light text-txt-on-dark leading-tight tracking-tight">
                                    {copy.primary_headline}
                                </p>
                            </div>
                        )}

                        {/* CTA */}
                        {copy?.cta_text && (
                            <div className="inline-block px-4 py-2 bg-accent text-surface rounded-xl text-xs font-bold">
                                CTA: {copy.cta_text}
                            </div>
                        )}

                        {/* Dominant color */}
                        {ext?.dominant_color_hex && (
                            <div className="flex items-center gap-3 px-1">
                                <div
                                    className="w-6 h-6 rounded-lg border border-white/10"
                                    style={{ backgroundColor: ext.dominant_color_hex }}
                                />
                                <span className="text-xs font-mono font-bold text-txt-on-dark-muted">
                                    {ext.dominant_color_hex}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right — Analysis cards */}
                <div className="lg:col-span-3 space-y-4">
                    {/* ── Invisible Machinery (the hero card) ── */}
                    <ResultsCard title="Invisible Machinery" variant="pullquote" accentBorder>
                        <div className="space-y-5">
                            <div>
                                <p className="spec-label-dark mb-1.5 text-accent/70">
                                    Semiotic Subtext — The Unspoken Promise
                                </p>
                                <PullQuote text={strat?.semiotic_subtext || 'Scanning for hidden meanings…'} />
                            </div>
                            <div className="pt-4 border-t border-white/5">
                                <p className="spec-label-dark mb-1.5">Objection Dismantling</p>
                                <p className="text-sm text-txt-on-dark-muted leading-relaxed">
                                    {strat?.objection_tackle || 'Analyzing persuasion intent…'}
                                </p>
                            </div>
                        </div>
                    </ResultsCard>

                    {/* ── Classification ── */}
                    <ResultsCard title="Classification" variant="classification">
                        <div className="grid grid-cols-2 gap-3 mb-4">
                            {[
                                { label: 'Trigger Mechanic', value: cls?.trigger_mechanic },
                                { label: 'Secondary Trigger', value: cls?.secondary_trigger_mechanic },
                                { label: 'Narrative Framework', value: cls?.narrative_framework },
                                { label: 'Claim Type', value: cls?.claim_type },
                                { label: 'Offer Type', value: cls?.offer_type },
                                { label: 'CTA Strength', value: cls?.cta_strength },
                                { label: 'Cognitive Load', value: cls?.cognitive_load },
                                { label: 'Gaze Priority', value: cls?.gaze_priority },
                            ].filter(i => i.value).map(item => (
                                <ClassificationPill key={item.label} label={item.label} value={item.value!} />
                            ))}
                        </div>
                        {cls?.visual_style && cls.visual_style.length > 0 && (
                            <div className="mb-3">
                                <p className="spec-label-dark mb-2">Visual Style</p>
                                <TagRow items={cls.visual_style} />
                            </div>
                        )}
                        {cls?.emotion_tone && cls.emotion_tone.length > 0 && (
                            <div>
                                <p className="spec-label-dark mb-2">Emotion / Tone</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {cls.emotion_tone.map((e: string) => (
                                        <span key={e} className="px-2.5 py-1 rounded-lg bg-white/5 text-txt-on-dark-muted text-[10px] font-bold border border-white/5">
                                            {e.replace(/_/g, ' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </ResultsCard>

                    {/* ── Strategic Intelligence ── */}
                    <ResultsCard title="Strategic Intelligence" variant="strategy">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                            {strat?.target_job_to_be_done && (
                                <StrategyField label="Job-to-be-Done" value={strat.target_job_to_be_done} />
                            )}
                            {strat?.positioning_claim && (
                                <StrategyField label="Positioning Claim" value={strat.positioning_claim} />
                            )}
                            {strat?.differentiator_angle && (
                                <StrategyField label="Differentiator Angle" value={strat.differentiator_angle} />
                            )}
                            {strat?.behavioral_nudge && (
                                <StrategyField label="Behavioral Nudge" value={strat.behavioral_nudge} />
                            )}
                            {strat?.misdirection_or_friction_removed && (
                                <StrategyField label="Friction Removed" value={strat.misdirection_or_friction_removed} />
                            )}
                        </div>
                    </ResultsCard>

                    {/* ── Evidence Anchors ── */}
                    {((strat?.evidence_anchors?.length || 0) > 0 || (diag?.evidence_anchors?.length || 0) > 0) && (
                        <ResultsCard title="Evidence Anchors" variant="bullets">
                            <BulletList
                                items={strat?.evidence_anchors || diag?.evidence_anchors || []}
                            />
                        </ResultsCard>
                    )}

                    {/* ── Visual Extraction ── */}
                    <ResultsCard title="Visual Extraction" variant="tags">
                        {ext?.composition_notes && (
                            <p className="text-xs text-txt-on-dark-muted leading-relaxed mb-4">
                                {ext.composition_notes}
                            </p>
                        )}
                        {(ext?.notable_visual_elements?.length || 0) > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {ext.notable_visual_elements.map((el: string, i: number) => (
                                    <span key={i} className="px-2.5 py-1 rounded-lg bg-white/5 text-txt-on-dark-muted text-[10px] font-bold border border-white/5">
                                        {el}
                                    </span>
                                ))}
                            </div>
                        )}
                    </ResultsCard>

                    {/* ── Confidence / Diagnostics ── */}
                    <ResultsCard title="Confidence Scores" variant="gauge">
                        <div className="space-y-3">
                            {diag?.confidence && Object.entries(diag.confidence)
                                .filter(([_, val]) => typeof val === 'number')
                                .map(([key, val]) => (
                                    <ConfidenceGauge key={key} label={key} value={val as number} />
                                ))
                            }
                        </div>
                    </ResultsCard>

                    {/* ── Failure Modes ── */}
                    {(diag?.failure_modes?.length || 0) > 0 && (
                        <ResultsCard title="Failure Modes" variant="bullets">
                            <BulletList items={diag.failure_modes} color="red" />
                        </ResultsCard>
                    )}
                </div>
            </div>
        </div>
    );
}
