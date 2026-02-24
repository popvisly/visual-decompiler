'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { TrendingUp, Sparkles, Activity, ArrowLeft, Play, CheckCircle2, X } from 'lucide-react';
import BrandTag from '@/components/BrandTag';
import ResultsView from '@/components/ResultsView';
import ResultsCard from '@/components/ResultsCard';
import PDFReport from '@/components/PDFReport';
import VideoPins from '@/components/VideoPins';
import AdShareButton from '@/components/AdShareButton';
import DeepAuditView from '@/components/DeepAuditView';
import { AdDigest } from '@/types/digest';
import { ForecastingService } from '@/lib/forecasting';

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
    const [currentTimeMs, setCurrentTimeMs] = useState(0);
    const searchParams = useSearchParams();
    const isNew = searchParams.get('new') === 'true';
    const [showBanner, setShowBanner] = useState(isNew);
    const [roiPredict, setRoiPredict] = useState<any>(null);

    type TabKey = 'report' | 'forensics' | 'pins';
    const [tab, setTab] = useState<TabKey>('report');
    const videoRef = useRef<HTMLVideoElement>(null);

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            setCurrentTimeMs(videoRef.current.currentTime * 1000);
        }
    };

    const handleSeek = (ms: number) => {
        if (videoRef.current) {
            videoRef.current.currentTime = ms / 1000;
            videoRef.current.play();
        }
    };

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
                    </div>

                    {!isShared && (
                        <div className="flex items-center gap-4">
                            <PDFReport />
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
                                        onTimeUpdate={handleTimeUpdate}
                                    />
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
                                <div className="flex flex-wrap gap-2 rounded-full bg-white border border-[#E7DED1] p-1.5 shadow-sm">
                                    {([
                                        { key: 'report', label: 'Report' },
                                        { key: 'forensics', label: 'Forensics' },
                                        { key: 'pins', label: 'Pins' },
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

                        {tab === 'pins' && !isShared && (
                            <div className="bg-white p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)]">
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-[#141414] mb-6">Strategic Pins</h3>
                                {ad.media_kind === 'video' ? (
                                    <VideoPins
                                        adId={ad.id}
                                        currentTimeMs={currentTimeMs}
                                        onSeek={handleSeek}
                                    />
                                ) : (
                                    <p className="text-[12px] text-[#6B6B6B]">Pins are available for video ads.</p>
                                )}
                            </div>
                        )}

                        {tab === 'forensics' && (
                            <div className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <ResultsCard title="Saturation Risk" variant="gauge">
                                        <div className="flex items-end gap-3 mb-4">
                                            <span className="text-5xl font-light text-[#141414] leading-none">{forecasting.saturationLevel}%</span>
                                            <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${forecasting.saturationLevel > 60 ? 'text-red-500' : 'text-green-600'}`}>
                                                {forecasting.saturationLevel > 60 ? 'High Risk' : 'Healthy Space'}
                                            </span>
                                        </div>
                                        <div className="h-1.5 w-full bg-[#FBF7EF] border border-[#E7DED1] rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ${forecasting.saturationLevel > 60 ? 'bg-red-500' : 'bg-accent'}`}
                                                style={{ width: `${forecasting.saturationLevel}%` }}
                                            />
                                        </div>
                                    </ResultsCard>

                                    <ResultsCard title="Predicted Lifespan" variant="gauge">
                                        <div className="flex items-end gap-3 mb-4">
                                            <span className="text-5xl font-light text-[#141414] leading-none">{forecasting.estimatedLifespanDays}</span>
                                            <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1">Days Remaining</span>
                                        </div>
                                        <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                                            Expected performance decline after {forecasting.estimatedLifespanDays} days based on category momentum.
                                        </p>
                                    </ResultsCard>
                                </div>

                                <DeepAuditView digest={digest} />
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div >
    );
}
