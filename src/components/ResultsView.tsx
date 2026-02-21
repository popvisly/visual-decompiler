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
import { RotateCcw, Share, Check } from 'lucide-react';
import { useState, useRef } from 'react';

type Props = {
    id: string;
    mediaUrl: string;
    mediaKind: string;
    digest: AdDigest;
    status: string;
    brand?: string | null;
    accessLevel?: 'full' | 'limited';
    isSharedView?: boolean;
    onReset?: () => void;
};

function BlurGate({ locked, children }: { locked: boolean; children: React.ReactNode }) {
    if (!locked) return <>{children}</>;
    return (
        <div className="blur-locked rounded-2xl">
            <div className="blur-content">{children}</div>
            <div className="blur-overlay rounded-2xl">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mb-2 text-[#6B6B6B]">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#6B6B6B] mb-1">
                    Pro Analysis
                </span>
                <span className="text-[10px] text-[#6B6B6B]">
                    Upgrade to see full breakdown
                </span>
            </div>
        </div>
    );
}

export default function ResultsView({ id, mediaUrl, mediaKind, digest, status, brand, accessLevel = 'full', isSharedView = false, onReset }: Props) {
    const isLimited = accessLevel === 'limited';
    const d = digest;
    const cls = d?.classification;
    const ext = d?.extraction;
    const strat = d?.strategy;
    const diag = d?.diagnostics;
    const copy = ext?.on_screen_copy;

    const displayBrand = brand || d?.meta?.brand_guess;

    const [copied, setCopied] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleShare = () => {
        if (!id) return;
        const shareUrl = `${window.location.origin}/report/${id}`;
        navigator.clipboard.writeText(shareUrl).then(() => {
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        });
    };

    const handleSeek = (ms: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = ms / 1000;
            videoRef.current.play().catch(() => { }); // Play if possible
        }
    };

    return (
        <div className="w-full max-w-6xl mx-auto page-enter">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-8 mt-4">
                <div>
                    <h2 className="font-sans text-3xl font-medium text-[#141414] tracking-[-0.02em]">
                        Analysis Complete
                    </h2>
                    {displayBrand && (
                        <p className="text-[14px] text-[#6B6B6B] mt-1">
                            Brand: <span className="text-[#141414] font-semibold">{displayBrand}</span>
                            {d.meta?.product_category_guess && (
                                <span className="text-[#6B6B6B]"> · {d.meta.product_category_guess}</span>
                            )}
                        </p>
                    )}
                </div>
                <div className="flex items-center gap-3">
                    {!isSharedView && (
                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-[#FBF7EF] bg-[#141414] border border-[#141414] hover:bg-[#2A2A2A] hover:border-[#2A2A2A] transition-all hover:-translate-y-[1px] shadow-sm hover:shadow-[0_10px_30px_rgba(20,20,20,0.15)]"
                        >
                            {copied ? (
                                <>
                                    <Check className="w-3.5 h-3.5" />
                                    Copied Link
                                </>
                            ) : (
                                <>
                                    <Share className="w-3.5 h-3.5" />
                                    Share Report
                                </>
                            )}
                        </button>
                    )}

                    {isSharedView ? (
                        <a
                            href="/"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-[#141414]/70 border border-[#E7DED1] bg-[#FBF7EF]/50 hover:bg-[#FBF7EF] hover:border-[#D8CCBC] hover:text-[#141414] transition-all hover:-translate-y-[1px] shadow-sm hover:shadow-[0_10px_30px_rgba(20,20,20,0.05)]"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Analyze Your Own Ad
                        </a>
                    ) : (
                        <button
                            onClick={onReset}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-full text-[13px] font-medium text-[#141414]/70 border border-[#E7DED1] bg-[#FBF7EF]/50 hover:bg-[#FBF7EF] hover:border-[#D8CCBC] hover:text-[#141414] transition-all hover:-translate-y-[1px] shadow-sm hover:shadow-[0_10px_30px_rgba(20,20,20,0.05)]"
                        >
                            <RotateCcw className="w-3.5 h-3.5" />
                            Analyze Another
                        </button>
                    )}
                </div>
            </div>

            <div className="relative grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Processing Overlay */}
                {status !== 'success' && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#F6F1E7]/80 backdrop-blur-sm rounded-3xl">
                        <div className="text-center p-12 bg-white/50 border border-[#E7DED1] rounded-3xl shadow-xl max-w-sm mx-auto">
                            <div className="w-12 h-12 border-4 border-[#141414] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
                            <h3 className="text-xl font-medium text-[#141414] mb-2 uppercase tracking-wide">
                                {status === 'queued' ? 'Queued' : 'Analyzing Ad...'}
                            </h3>
                            <p className="text-[#6B6B6B] text-sm">
                                {status === 'queued'
                                    ? "This ad is in line for deconstruction. We'll start extracting intelligence in a moment."
                                    : "Our agents are currently deconstructing this ad's semiotic layers and strategic machinery."}
                            </p>
                        </div>
                    </div>
                )}
                {/* Left — Media */}
                <div className="lg:col-span-2">
                    <div className="sticky top-24 space-y-4">
                        <div className="bg-[#FBF7EF] rounded-2xl border border-[#E7DED1] shadow-sm overflow-hidden">
                            {mediaKind === 'video' ? (
                                <video
                                    ref={videoRef}
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

                        {/* Visual Timeline — Milestone 2 */}
                        {mediaKind === 'video' && ext?.keyframes && ext.keyframes.length > 0 && (
                            <div className="pt-2 px-1">
                                <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-4">Visual Timeline</p>
                                <div className="flex items-center gap-4">
                                    {ext.keyframes.map((kf: any, idx: number) => (
                                        <div
                                            key={idx}
                                            className="flex-1 group cursor-pointer"
                                            onClick={() => handleSeek(kf.t_ms)}
                                        >
                                            <div className="relative aspect-video rounded-xl bg-[#F2EBDD] border border-[#E7DED1] overflow-hidden shadow-sm group-hover:border-[#D8CCBC] transition-all">
                                                {/* Fallback to video timestamp if image_url is missing */}
                                                {kf.image_url ? (
                                                    <img src={kf.image_url} alt={kf.label} className="w-full h-full object-cover" />
                                                ) : (
                                                    <div className="w-full h-full flex items-center justify-center bg-[#FBF7EF]">
                                                        <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-tighter opacity-40">
                                                            {kf.label}
                                                        </span>
                                                    </div>
                                                )}
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                                <div className="absolute bottom-1 right-1.5 text-[9px] font-mono font-bold text-white opacity-80 group-hover:opacity-100 transition-opacity">
                                                    {(kf.t_ms / 1000).toFixed(1)}s
                                                </div>
                                            </div>
                                            <div className="mt-2 text-center">
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#141414]/60 group-hover:text-[#141414] transition-colors">
                                                    {kf.label}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Headline */}
                        {copy?.primary_headline && (
                            <div className="px-1">
                                <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-1">Primary Headline</p>
                                <p className="text-[17px] font-medium text-[#141414] leading-[1.3] tracking-[-0.01em]">
                                    {copy.primary_headline}
                                </p>
                            </div>
                        )}

                        {/* CTA */}
                        {copy?.cta_text && (
                            <div className="inline-block px-4 py-2 bg-[#141414] text-[#FBF7EF] rounded-xl text-xs font-semibold">
                                CTA: {copy.cta_text}
                            </div>
                        )}

                        {/* Dominant color */}
                        {ext?.dominant_color_hex && (
                            <div className="flex items-center gap-3 px-1 mt-2">
                                <div
                                    className="w-6 h-6 rounded-full border border-[#E7DED1] shadow-sm"
                                    style={{ backgroundColor: ext.dominant_color_hex }}
                                />
                                <span className="text-[12px] font-mono font-medium text-[#6B6B6B]">
                                    {ext.dominant_color_hex}
                                </span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right — Analysis cards */}
                <div className="lg:col-span-3 space-y-4">
                    {/* ── Invisible Machinery (the hero card) — BLUR on limited ── */}
                    <BlurGate locked={isLimited}>
                        <ResultsCard title="Invisible Machinery" variant="pullquote" accentBorder>
                            <div className="space-y-5">
                                <div>
                                    <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5 text-[#141414]/70">
                                        Semiotic Subtext — The Unspoken Promise
                                    </p>
                                    <PullQuote text={strat?.semiotic_subtext || 'Scanning for hidden meanings…'} />
                                </div>
                                <div className="pt-4 border-t border-[#E7DED1]">
                                    <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5">Objection Dismantling</p>
                                    <p className="text-sm text-[#6B6B6B] leading-[1.5]">
                                        {strat?.objection_tackle || 'Analyzing persuasion intent…'}
                                    </p>
                                </div>
                            </div>
                        </ResultsCard>
                    </BlurGate>

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
                                <p className="text-txt-muted text-[10px] font-bold uppercase tracking-[0.15em] mb-2">Visual Style</p>
                                <TagRow items={cls.visual_style} />
                            </div>
                        )}
                        {cls?.emotion_tone && cls.emotion_tone.length > 0 && (
                            <div>
                                <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-2">Emotion / Tone</p>
                                <div className="flex flex-wrap gap-1.5">
                                    {cls.emotion_tone.map((e: string) => (
                                        <span key={e} className="px-2.5 py-1 rounded-lg bg-[#FBF7EF] text-[#6B6B6B] text-[10px] font-bold border border-[#E7DED1]">
                                            {e.replace(/_/g, ' ')}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </ResultsCard>

                    {/* ── Strategic Intelligence — BLUR on limited ── */}
                    <BlurGate locked={isLimited}>
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
                    </BlurGate>

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
                            <p className="text-sm text-[#6B6B6B] leading-[1.5] mb-4">
                                {ext.composition_notes}
                            </p>
                        )}
                        {(ext?.notable_visual_elements?.length || 0) > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                                {ext.notable_visual_elements.map((el: string, i: number) => (
                                    <span key={i} className="px-2.5 py-1 rounded-lg bg-[#FBF7EF] text-[#6B6B6B] text-[10px] font-bold border border-[#E7DED1]">
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
                            <BulletList items={diag.failure_modes || []} color="red" />
                        </ResultsCard>
                    )}
                </div>
            </div>
        </div>
    );
}
