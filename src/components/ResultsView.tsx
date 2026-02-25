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
import { RotateCcw, Share, Check, Download, Activity, TrendingUp, Sparkles } from 'lucide-react';
import { useState, useRef } from 'react';
import BrandTag from './BrandTag';

type Props = {
    id: string;
    mediaUrl: string;
    mediaKind: string;
    digest: AdDigest;
    status: string;
    brand?: string | null;
    accessLevel?: 'full' | 'limited';
    isSharedView?: boolean;
    /** When false, ResultsView will not render its own media preview column (useful when the parent already shows the ad media). */
    showMedia?: boolean;
    onReset?: () => void;
    roiPredict?: any;
    forecasting?: any;
    isAnomaly?: boolean;
    anomalyReason?: string | null;
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

export default function ResultsView({
    id,
    mediaUrl,
    mediaKind,
    digest,
    status,
    brand,
    accessLevel = 'full',
    isSharedView = false,
    showMedia = true,
    onReset,
    roiPredict,
    forecasting,
    isAnomaly,
    anomalyReason
}: Props) {
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

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="w-full max-w-6xl mx-auto page-enter">
            {/* Print-only CSS */}
            <style jsx global>{`
                @media print {
                    .no-print, .spinner, .overlay { display: none !important; }
                    body { background: white !important; }
                    .page-enter { animation: none !important; }
                    .bg-[#FBF7EF] { background: white !important; border: 1px solid #E7DED1 !important; }
                    
                    /* Force sane page breaks */
                    h2 { break-after: avoid; }
                    .print-break-inside-avoid { break-inside: avoid; }
                    .print-break-before { break-before: always; }
                }
            `}</style>

            {/* Top bar */}
            <div className="flex items-center justify-between mb-8 mt-4">
                <div>
                    <h2 className="font-sans text-3xl font-medium text-[#141414] tracking-[-0.02em]">
                        Analysis Complete
                    </h2>
                    {displayBrand && (
                        <div className="flex items-center gap-2 mt-1">
                            <span className="text-[14px] text-[#6B6B6B]">Brand:</span>
                            <div className="mt-1">
                                <BrandTag
                                    adId={id}
                                    brand={brand ?? null}
                                    brandGuess={d?.meta?.brand_guess ?? null}
                                />
                            </div>
                            {d.meta?.product_category_guess && (
                                <span className="text-[14px] text-[#6B6B6B]"> · {d.meta.product_category_guess}</span>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-3 no-print">
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

                </div>
            </div>

            <div className={`relative grid grid-cols-1 gap-8 ${showMedia ? 'lg:grid-cols-5' : ''}`}>
                {/* Processing Overlay — only show if BOTH status is not processed AND digest is empty */}
                {!(status === 'processed' || status === 'success') && !d?.classification?.trigger_mechanic && (
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
                {showMedia && (
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

                            {/* Color palette */}
                            {((ext as any)?.palette_hex?.length || ext?.dominant_color_hex) && (
                                <div className="px-1 mt-2">
                                    <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-2">Palette</p>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        {(((ext as any)?.palette_hex?.length ? (ext as any).palette_hex : [ext?.dominant_color_hex]) as any[])
                                            .filter(Boolean)
                                            .slice(0, 6)
                                            .map((hex: string) => {
                                                const clean = String(hex).replace(/^#/, '');
                                                return (
                                                    <div key={clean} className="flex items-center gap-2">
                                                        <div
                                                            className="w-6 h-6 rounded-full border border-[#E7DED1] shadow-sm"
                                                            style={{ backgroundColor: `#${clean}` }}
                                                            title={`#${clean}`}
                                                        />
                                                        <span className="text-[11px] font-mono font-medium text-[#6B6B6B]">#{clean}</span>
                                                    </div>
                                                );
                                            })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {/* Right — Analysis cards */}
                <div className={`${showMedia ? 'lg:col-span-3' : ''} space-y-4`}>
                    {/* Neural Thesis — The Primary Executive Summary */}
                    <div className="p-8 md:p-12 bg-[#141414] rounded-[2.5rem] md:rounded-[4rem] border border-white/10 shadow-2xl relative overflow-hidden group">
                        {/* Background Aura */}
                        <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full -translate-y-48 translate-x-48 blur-[120px] pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/3 rounded-full translate-y-32 -translate-x-32 blur-[80px] pointer-events-none" />

                        <div className="relative z-10 space-y-10">
                            {/* Top Tier: Thesis Quote */}
                            <div className="space-y-6">
                                <div className="flex items-center gap-3 text-accent/60">
                                    <Sparkles className="w-4 h-4" />
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em]">Neural Thesis</h3>
                                </div>
                                <div className="relative">
                                    <span className="absolute -left-6 -top-4 text-6xl text-accent/10 font-serif leading-none italic select-none">"</span>
                                    <p className="text-2xl md:text-3xl font-light text-[#FBF7EF] leading-[1.3] italic tracking-tight pr-6">
                                        {strat?.semiotic_subtext || 'Calculating semiotic alignment...'}
                                    </p>
                                </div>
                            </div>

                            {/* Middle Tier: Metrics Row */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-10 border-t border-white/10">
                                {/* Resonance */}
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Market Resonance</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-light text-[#FBF7EF]">{(roiPredict?.score || 70)}%</span>
                                        <span className={`text-[10px] font-bold uppercase ${(roiPredict?.score || 70) > 60 ? 'text-accent/60' : 'text-red-400/60'}`}>
                                            {(roiPredict?.score || 70) > 60 ? 'High' : 'Moderate'}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-white/40 leading-tight pr-2">{roiPredict?.rationale || 'Calculating resonance score...'}</p>
                                </div>

                                {/* Saturation */}
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Category Density</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-light text-[#FBF7EF]">{forecasting?.saturationLevel || 0}%</span>
                                        <span className={`text-[10px] font-bold uppercase ${(forecasting?.saturationLevel || 0) > 60 ? 'text-red-400' : 'text-green-400/60'}`}>
                                            {(forecasting?.saturationLevel || 0) > 60 ? 'Saturated' : 'Innovative'}
                                        </span>
                                    </div>
                                    <p className="text-[11px] text-white/40 leading-tight">
                                        {(forecasting?.saturationLevel || 0) > 60
                                            ? 'Highly competitive tactical space.'
                                            : 'Strategic blue ocean identified.'}
                                    </p>
                                </div>

                                {/* Window */}
                                <div className="space-y-1">
                                    <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest">Tactical Window</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-3xl font-light text-[#FBF7EF]">{forecasting?.estimatedLifespanDays || 0}</span>
                                        <span className="text-[10px] font-bold text-white/30 uppercase">Days</span>
                                    </div>
                                    <p className="text-[11px] text-white/40 leading-tight">Estimated effectiveness period for this pattern.</p>
                                </div>
                            </div>

                            {/* Bottom Tier: Alerts if any */}
                            {isAnomaly && (
                                <div className="pt-8 border-t border-white/10">
                                    <div className="bg-accent/10 border border-accent/20 rounded-2xl p-5 flex items-start gap-4 animate-pulse">
                                        <TrendingUp className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                                        <div>
                                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Strategic Pivot Warning</p>
                                            <p className="text-[13px] text-white/80 font-medium leading-relaxed italic">{anomalyReason}</p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* ── Invisible Machinery — (Reduced to secondary info) ── */}
                    <BlurGate locked={isLimited}>
                        <ResultsCard title="Invisible Machinery" variant="pullquote">
                            <div className="space-y-5">
                                <div>
                                    <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-1.5 text-[#141414]/70">
                                        Objection Dismantling Logic
                                    </p>
                                    <p className="text-base font-light text-[#141414] leading-relaxed italic">
                                        "{strat?.objection_tackle || 'Analyzing persuasion intent…'}"
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
                        <div className="space-y-6">
                            {/* Highlight Overall Score */}
                            {diag?.confidence?.overall !== undefined && (
                                <div className="pb-4 border-b border-[#E7DED1]">
                                    <ConfidenceGauge
                                        label="System Confidence (Overall)"
                                        value={diag.confidence.overall}
                                        description="Aggregate probability across all semiotic and strategic layers."
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-1 gap-4">
                                {diag?.confidence && Object.entries(diag.confidence)
                                    .filter(([key, val]) => typeof val === 'number' && key !== 'overall')
                                    .map(([key, val]) => {
                                        const descriptions: Record<string, string> = {
                                            trigger_mechanic: "Detection of underlying psychological triggers.",
                                            secondary_trigger_mechanic: "Secondary motivational drivers.",
                                            narrative_framework: "Structural semiotic pattern alignment.",
                                            copy_transcription: "OCR and manual copy accuracy.",
                                            color_extraction: "Spectrum and palette precision.",
                                            subtext: "Inferred semiotic and cultural subtext accuracy.",
                                            objection: "Persuasion-logic dismantling confidence."
                                        };
                                        return (
                                            <ConfidenceGauge
                                                key={key}
                                                label={key}
                                                value={val as number}
                                                description={descriptions[key] || "Component-level signal strength."}
                                            />
                                        );
                                    })
                                }
                            </div>
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
