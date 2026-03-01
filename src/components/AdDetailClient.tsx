'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Sparkles, Activity, ArrowLeft, Play, CheckCircle2, X, Dna, Users, Zap, Lock } from 'lucide-react';
import BrandTag from '@/components/BrandTag';
import ResultsView from '@/components/ResultsView';
import ResultsCard from '@/components/ResultsCard';
import StrategicDossier from '@/components/StrategicDossier';
import AdShareButton from '@/components/AdShareButton';
import AddToBoard from '@/components/AddToBoard';
import DeepAuditView from '@/components/DeepAuditView';
import PromptView from '@/components/PromptView';
import CognitiveLoadMap from '@/components/CognitiveLoadMap';
import SchemaAutopsy from '@/components/SchemaAutopsy';
import MediaBuyProjections from '@/components/MediaBuyProjections';
import SovereignBenchmark from '@/components/SovereignBenchmark';
import NeuralSentiment from '@/components/NeuralSentiment';
import { AdDigest } from '@/types/digest';
import { ForecastingService } from '@/lib/forecasting';
import { NeuralDeconstructionService } from '@/lib/neural_deconstruction_service';
import AdAnalyticsTab from '@/components/AdAnalyticsTab';
import ForensicOverlay from '@/components/ForensicOverlay';
import PersuasionStack from '@/components/PersuasionStack';
import ScanPath from '@/components/ScanPath';

export default function AdDetailClient({
    ad,
    digest,
    relatedAds,
    isShared = false,
    pulseText
}: {
    ad: any,
    digest: AdDigest,
    relatedAds: any[],
    isShared?: boolean,
    pulseText?: string
}) {
    const forecasting = useMemo(() => ForecastingService.analyzeAd(digest, pulseText || ''), [digest, pulseText]);
    const searchParams = useSearchParams();
    const isNew = searchParams.get('new') === 'true';
    const [showBanner, setShowBanner] = useState(isNew);
    const [roiPredict, setRoiPredict] = useState<any>(null);
    const [orgSettings, setOrgSettings] = useState<{ agency_name?: string; logo_url?: string }>({});

    type TabKey = 'report' | 'forensics' | 'analytics' | 'prompt' | 'intelligence' | 'audience' | 'remix';
    const [tab, setTab] = useState<TabKey>('report');
    const neuralData = useMemo(() => NeuralDeconstructionService.resolve(digest, forecasting), [digest, forecasting]);
    const videoRef = useRef<HTMLVideoElement>(null);

    const predictROI = async () => {
        try {
            const res = await fetch('/api/discovery/predict', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    adId: ad.id,
                    trigger_mechanic: digest?.classification?.trigger_mechanic || ad.trigger_mechanic,
                    narrative_framework: digest?.classification?.narrative_framework || ad.narrative_framework
                })
            });
            const data = await res.json();
            setRoiPredict(data);
        } catch (err) {
            console.error('ROI Prediction failed:', err);
        }
    };

    // Auto-predict ROI on mount
    useEffect(() => {
        if (!roiPredict) {
            predictROI();
        }
        // Fetch org settings for dossier white-labeling
        fetch('/api/org/settings').then(r => r.json()).then(d => {
            if (d && !d.error) setOrgSettings({ agency_name: d.agency_name, logo_url: d.logo_url });
        }).catch(() => { });
    }, [ad.id]);

    return (
        <div className={`py-12 space-y-16 ${isShared ? 'pt-0' : ''}`}>
            {showBanner && (
                <div className="max-w-6xl mx-auto px-6 pt-8 animate-in fade-in slide-in-from-top-4 duration-1000">
                    <div className="bg-[#141414] rounded-3xl p-6 md:p-8 flex items-center justify-between shadow-2xl shadow-black/20 border border-white/5 relative overflow-hidden group">
                        {/* Progress Glow */}
                        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-accent to-transparent" />

                        <div className="flex items-center gap-6 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-accent/20 flex items-center justify-center text-accent shadow-inner">
                                <CheckCircle2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-1">Analysis Complete</h3>
                                <p className="text-white/50 text-[11px] font-medium tracking-wide">Deconstruction successfully merged into agency library.</p>
                            </div>
                        </div>

                        <button
                            onClick={() => setShowBanner(false)}
                            className="p-2 text-white/30 hover:text-white transition-colors relative z-10"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <div className="absolute -right-20 -top-20 w-64 h-64 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />
                    </div>
                </div>
            )}

            <div className="max-w-6xl mx-auto px-6">
                {/* Header - Editorial Style */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-10 pb-8 md:pb-16 border-b border-[#E7DED1] mb-12 md:mb-16">
                    <div>
                        {!isShared && (
                            <nav className="flex items-center gap-2 mb-8 md:mb-10 no-print">
                                <Link href="/dashboard" className="text-[10px] md:text-[11px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] hover:text-[#141414] flex items-center gap-2 transition-all group">
                                    <ArrowLeft className="w-3 h-3 md:w-3.5 md:h-3.5 group-hover:-translate-x-1 transition-transform" />
                                    Library
                                </Link>
                            </nav>
                        )}
                        <h2 className="text-4xl md:text-7xl font-light text-[#141414] tracking-tightest uppercase leading-[0.9] md:leading-[0.85]">
                            {ad.brand || digest?.meta?.brand_guess || 'Competitive'}<br />
                            <span className="text-[#6B6B6B]/30 mb-4 md:mb-8 block">Deconstruction</span>
                        </h2>
                        <h1 className="text-xl md:text-2xl font-light text-[#141414] tracking-tight mt-6 md:mt-8 border-l-[2px] md:border-l-[3px] border-accent pl-4 md:pl-6 py-2 max-w-3xl leading-snug lg:text-3xl">
                            {digest?.extraction?.on_screen_copy?.primary_headline || 'Untitled'}
                        </h1>
                        {digest?.meta?.campaign_category && (
                            <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em] mt-4 ml-4 md:ml-6">
                                Format: {digest.meta.campaign_category.replace('_', ' ')}
                            </p>
                        )}
                    </div>

                    {!isShared && (
                        <div className="flex items-center gap-4">
                            <AddToBoard adId={ad.id} />
                            <StrategicDossier
                                digest={digest}
                                neuralData={neuralData}
                                brandName={ad.brand || digest?.meta?.brand_guess || 'Unknown Brand'}
                                agencyName={orgSettings.agency_name || ''}
                                agencyLogo={orgSettings.logo_url || undefined}
                                resonanceScore={roiPredict?.score}
                                saturationLevel={forecasting?.saturationLevel}
                                tacticalWindow={forecasting?.estimatedLifespanDays}
                            />
                        </div>
                    )}
                </div>


                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
                    {/* Left: media always visible */}
                    <div className="lg:col-span-5 space-y-8 md:space-y-12">
                        <div className="sticky top-12 space-y-6 md:space-y-8">
                            <div className="bg-white p-3 md:p-4 rounded-[2rem] md:rounded-[3.5rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)] overflow-hidden relative group">
                                {ad.media_kind === 'video' ? (
                                    <video
                                        ref={videoRef}
                                        src={ad.media_url}
                                        className="w-full aspect-[4/5] object-cover rounded-[1.5rem] md:rounded-[2.5rem]"
                                        controls muted playsInline preload="metadata"
                                    />
                                ) : ((digest?.extraction as any)?.evidence_receipts?.length > 0 || (digest?.extraction as any)?.anchors?.length > 0) ? (
                                    <div className="rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden">
                                        <ForensicOverlay
                                            imageUrl={ad.media_url}
                                            anchors={(digest?.extraction as any).evidence_receipts || (digest?.extraction as any).anchors}
                                        />
                                    </div>
                                ) : (
                                    <img
                                        src={ad.media_url}
                                        alt="Ad"
                                        className="w-full aspect-[4/5] object-cover rounded-[1.5rem] md:rounded-[2.5rem]"
                                    />
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right: tabbed workspace */}
                    <div className="lg:col-span-7 space-y-6 md:space-y-8">
                        {!isShared && (
                            <div className="no-print">
                                <div className="flex flex-wrap gap-2 rounded-[2rem] bg-white border border-[#E7DED1] p-1.5 shadow-sm">
                                    {([
                                        { key: 'report', label: 'Report' },
                                        { key: 'intelligence', label: 'Intelligence' },
                                        { key: 'forensics', label: 'Forensics' },
                                        { key: 'analytics', label: 'Analytics' },
                                        { key: 'prompt', label: 'Prompt' },
                                        { key: 'audience', label: 'Audience' },
                                        { key: 'remix', label: 'Remix' },
                                    ] as const).map(t => (
                                        <button
                                            key={t.key}
                                            type="button"
                                            onClick={() => setTab(t.key)}
                                            className={`px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.18em] transition-all ${tab === t.key
                                                ? 'bg-[#141414] text-[#FBF7EF]'
                                                : 'text-[#6B6B6B] hover:text-[#141414]'
                                                }`}
                                        >
                                            {t.label}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {tab === 'report' && (
                            <ResultsView
                                id={ad.id}
                                mediaUrl={ad.media_url}
                                mediaKind={ad.media_kind}
                                digest={digest}
                                status={ad.status}
                                brand={ad.brand}
                                accessLevel={ad.access_level || 'full'}
                                isSharedView={false}
                                showMedia={false}
                                roiPredict={roiPredict}
                                forecasting={forecasting}
                                isAnomaly={ad.is_anomaly}
                                anomalyReason={ad.anomaly_reason}
                            />
                        )}

                        {tab === 'prompt' && (
                            <PromptView digest={digest} />
                        )}

                        {tab === 'analytics' && (
                            <AdAnalyticsTab brand={ad.brand || digest?.meta?.brand_guess} />
                        )}

                        {tab === 'forensics' && (
                            <div className="space-y-8">
                                {/* ═══ SATURATION RISK ═══ */}
                                <ResultsCard title="Saturation Risk" variant="gauge">
                                    <div className="flex items-end gap-4 mb-6">
                                        <div>
                                            <span className="text-5xl font-bold text-[#141414] leading-none tracking-tight">{forecasting.saturationLevel}%</span>
                                        </div>
                                        <div className="inline-flex items-center gap-2 px-4 py-2 mb-1 rounded-full" style={{ backgroundColor: forecasting.saturationLevel > 60 ? '#FEE2E2' : '#DCFCE7' }}>
                                            <span className={`w-2 h-2 rounded-full ${forecasting.saturationLevel > 60 ? 'bg-red-500 animate-pulse' : 'bg-green-500'}`} />
                                            <span className={`text-[10px] font-bold uppercase tracking-[0.15em] ${forecasting.saturationLevel > 60 ? 'text-red-700' : 'text-green-700'}`}>
                                                {forecasting.saturationLevel > 80 ? 'Critical Saturation' : forecasting.saturationLevel > 60 ? 'High Competition' : forecasting.saturationLevel > 35 ? 'Moderate Space' : 'Blue Ocean'}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Segmented gauge bar — full width */}
                                    <div className="mb-6">
                                        <div className="flex gap-1.5 mb-2">
                                            {[20, 40, 60, 80, 100].map((threshold, i) => (
                                                <div key={i} className="flex-1 h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E7DED1' }}>
                                                    <div
                                                        className="h-full rounded-full transition-all duration-1000"
                                                        style={{
                                                            width: forecasting.saturationLevel >= threshold ? '100%' : forecasting.saturationLevel > threshold - 20 ? `${((forecasting.saturationLevel - (threshold - 20)) / 20) * 100}%` : '0%',
                                                            backgroundColor: threshold <= 40 ? '#22C55E' : threshold <= 60 ? '#F59E0B' : '#EF4444',
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex justify-between text-[8px] font-bold text-[#6B6B6B]/50 uppercase tracking-widest px-1">
                                            <span>Open</span>
                                            <span>Moderate</span>
                                            <span>Crowded</span>
                                        </div>
                                    </div>

                                    {/* Insight */}
                                    <p className="text-sm font-light text-[#141414] leading-relaxed italic border-l-[3px] border-[#141414] pl-6">
                                        {forecasting.saturationLevel > 60
                                            ? 'High pattern density in this category. Differentiation through creative innovation is critical to cut through competitive noise.'
                                            : 'Low competitive density detected. First-mover advantage is available — scaling this creative pattern now could establish category ownership.'}
                                    </p>
                                </ResultsCard>

                                {/* ═══ PREDICTED LIFESPAN ═══ */}
                                <ResultsCard title="Predicted Lifespan" variant="gauge">
                                    <div className="flex items-end gap-4 mb-6">
                                        <div>
                                            <span className="text-5xl font-bold text-[#141414] leading-none tracking-tight">{forecasting.estimatedLifespanDays}</span>
                                        </div>
                                        <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1.5">Days</span>
                                    </div>

                                    {/* Decay Phase Timeline — full width */}
                                    <div className="mb-6">
                                        <div className="flex gap-0.5 mb-2">
                                            {[
                                                { label: 'Peak', pct: 30, color: '#141414' },
                                                { label: 'Steady', pct: 40, color: '#6B6B6B' },
                                                { label: 'Decline', pct: 20, color: '#B5A99A' },
                                                { label: 'Fatigue', pct: 10, color: '#E7DED1' },
                                            ].map((phase, i) => (
                                                <div key={i} className="group relative cursor-help" style={{ flex: phase.pct }}>
                                                    <div className="h-4 rounded-sm" style={{ backgroundColor: phase.color }} />
                                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-[#141414] text-white text-[9px] py-1.5 px-3 rounded-lg whitespace-nowrap z-50 shadow-lg">
                                                        {phase.label}: ~{Math.round(forecasting.estimatedLifespanDays * phase.pct / 100)} days
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <div className="flex text-[8px] font-bold text-[#6B6B6B]/50 uppercase tracking-widest px-1">
                                            <span style={{ width: '30%' }}>Peak</span>
                                            <span style={{ width: '40%' }}>Steady</span>
                                            <span style={{ width: '20%' }}>Decline</span>
                                            <span style={{ width: '10%', textAlign: 'right' }}>Fatigue</span>
                                        </div>
                                    </div>

                                    {/* Insight */}
                                    <p className="text-sm font-light text-[#141414] leading-relaxed italic border-l-[3px] border-[#141414] pl-6">
                                        {forecasting.estimatedLifespanDays > 60
                                            ? `Extended runway of ${forecasting.estimatedLifespanDays} days indicates strong creative durability. Low fatigue risk in the current category cycle.`
                                            : `Short ${forecasting.estimatedLifespanDays}-day window suggests high trend velocity. Deploy rapidly and test variants within the first ${Math.round(forecasting.estimatedLifespanDays * 0.3)} days.`}
                                    </p>
                                </ResultsCard>

                                <DeepAuditView digest={digest} />

                                {digest.classification?.persuasion_stack && (
                                    <ResultsCard title="Persuasion Stack" variant="strategy">
                                        <PersuasionStack stack={digest.classification.persuasion_stack} />
                                    </ResultsCard>
                                )}

                                {digest.extraction?.likely_scan_path && (
                                    <ResultsCard title="Attention Flow (Scan Path)" variant="gauge">
                                        <ScanPath path={digest.extraction.likely_scan_path} />
                                    </ResultsCard>
                                )}
                            </div>
                        )}

                        {tab === 'intelligence' && (
                            <div className="space-y-8">
                                <CognitiveLoadMap
                                    score={neuralData.cognitive_load_score}
                                    zones={neuralData.cognitive_load_zones}
                                />
                                <SchemaAutopsy segments={neuralData.schema_segments} />
                                <MediaBuyProjections platforms={neuralData.platform_affinity} />
                                <SovereignBenchmark
                                    percentile={neuralData.percentile_estimate}
                                    category={digest.meta?.product_category_guess || undefined}
                                    resonanceScore={roiPredict?.score}
                                />
                                <NeuralSentiment
                                    drivers={neuralData.emotional_drivers}
                                    verdict={neuralData.strategic_verdict}
                                />
                            </div>
                        )}

                        {tab === 'audience' && (
                            <div className="space-y-8">
                                <ResultsCard title="Target Persona" variant="strategy">
                                    <div className="space-y-8">
                                        {/* Primary Persona */}
                                        <div>
                                            <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em] mb-4">Inferred Target Segment</p>
                                            <h2 className="text-3xl font-light text-[#141414] leading-tight tracking-tight border-l-[3px] border-[#141414] pl-6">
                                                {digest.audience_strategy?.target_audience_segment || 'Broad Consumer Segment'}
                                            </h2>
                                        </div>

                                        <div className="h-px bg-[#E7DED1] w-full my-6" />

                                        {/* Psychographics Grid */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                            <div className="space-y-6">
                                                <div>
                                                    <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em] mb-3">Target Job-to-be-Done</p>
                                                    <div className="p-5 bg-[#FBF7EF] border border-[#E7DED1] rounded-2xl relative overflow-hidden">
                                                        <Sparkles className="absolute -bottom-2 -right-2 w-16 h-16 text-[#E7DED1]/50" />
                                                        <p className="text-sm font-medium text-[#141414] leading-relaxed relative z-10">
                                                            "{digest.strategy?.target_job_to_be_done || 'Enhance quality of life and social status'}"
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em] mb-3">Unmet Need Signals</p>
                                                    <div className="flex flex-wrap gap-2">
                                                        {(digest.audience_strategy?.unmet_need_tags || ['Convenience', 'Status', 'Reliability']).map((tag: string, i: number) => (
                                                            <span key={i} className="text-[10px] font-bold uppercase tracking-widest text-[#6B6B6B] bg-[#141414]/5 px-3 py-1.5 rounded-lg border border-[#141414]/10">
                                                                {tag}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <div>
                                                    <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em] mb-3">Conversion Friction Tackled</p>
                                                    <div className="p-5 bg-[#141414] rounded-2xl flex items-start gap-3">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-[#FBF7EF] mt-1.5 shrink-0" />
                                                        <p className="text-sm font-light text-[#FBF7EF]/90 leading-relaxed italic">
                                                            {digest.strategy?.objection_tackle || 'Overcoming price sensitivity through premium framing'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div>
                                                    <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em] mb-3">Behavioral Nudge</p>
                                                    <p className="text-sm font-light text-[#6B6B6B] leading-relaxed pl-4 border-l-2 border-[#E7DED1]">
                                                        {digest.strategy?.behavioral_nudge || digest.audience_strategy?.transfer_mechanism || 'Utilizing social proof and scarcity modifiers.'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ResultsCard>
                            </div>
                        )}

                        {tab === 'remix' && (
                            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)]">
                                <div className="flex flex-col items-center justify-center py-16 text-center">
                                    <div className="w-16 h-16 rounded-2xl bg-[#141414] flex items-center justify-center mb-6">
                                        <Zap className="w-7 h-7 text-[#FBF7EF]" />
                                    </div>
                                    <h3 className="text-xl font-bold text-[#141414] tracking-tight mb-2">Remix Engine</h3>
                                    <p className="text-[12px] text-[#6B6B6B] max-w-sm leading-relaxed mb-6">
                                        AI-generated counter-briefs — &ldquo;How would a competitor respond?&rdquo; Auto-generates strategic counter-angles with copy suggestions.
                                    </p>
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#FBF7EF] border border-[#E7DED1] rounded-full">
                                        <Lock className="w-3 h-3 text-[#6B6B6B]" />
                                        <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.15em]">Coming Soon</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
