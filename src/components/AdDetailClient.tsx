'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { TrendingUp, Sparkles, Activity, ArrowLeft, Play, Layout } from 'lucide-react';
import BrandTag from '@/components/BrandTag';
import RemixView from '@/components/RemixView';
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
    const forecasting = ForecastingService.analyzeAd(digest, pulseText || '');
    const [currentTimeMs, setCurrentTimeMs] = useState(0);
    const [roiPredict, setRoiPredict] = useState<any>(null);
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
        const res = await fetch('/api/discovery/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                adId: ad.id,
                trigger_mechanic: digest.classification.trigger_mechanic,
                narrative_framework: digest.classification.narrative_framework
            })
        });
        const data = await res.json();
        setRoiPredict(data);
    };

    return (
        <div className={`py-12 space-y-16 ${isShared ? 'pt-0' : ''}`}>
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
                            {digest?.extraction?.on_screen_copy?.primary_headline || 'Intelligence Pending…'}
                        </h1>
                    </div>
                    {!isShared && (
                        <div className="flex items-center gap-4">
                            <button
                                onClick={predictROI}
                                className="flex items-center gap-3 px-8 py-4 bg-white border border-[#E7DED1] rounded-full text-[11px] font-bold uppercase tracking-widest hover:border-accent transition-all shadow-xl shadow-black/[0.02] active:scale-95 group"
                            >
                                <Sparkles className="w-4 h-4 text-accent group-hover:scale-110 transition-transform" />
                                ROI Predictor
                            </button>
                            <AdShareButton adId={ad.id} />
                            <PDFReport />
                        </div>
                    )}
                </div>

                {roiPredict && (
                    <div className="mb-16 p-12 bg-[#141414] rounded-[3.5rem] border border-accent/20 shadow-2xl shadow-black/20 animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full -translate-y-32 translate-x-32 blur-3xl" />
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
                            <div className="space-y-6 flex-1">
                                <div className="flex items-center gap-3 text-accent mb-4">
                                    <Activity className="w-6 h-6" />
                                    <h3 className="text-xs font-bold uppercase tracking-[0.3em]">Strategic ROI Projection</h3>
                                </div>
                                <p className="text-xl font-light text-white leading-relaxed italic pr-10 opacity-90">
                                    "{roiPredict.rationale}"
                                </p>
                            </div>
                            <div className="shrink-0 text-center bg-white/5 p-10 rounded-[2.5rem] border border-white/5 min-w-[200px]">
                                <p className="text-7xl font-light text-accent leading-none mb-4">{roiPredict.score}%</p>
                                <p className="text-[10px] font-bold text-[#FBF7EF] uppercase tracking-[0.3em] opacity-40">Predicted Efficiency</p>
                            </div>
                        </div>
                    </div>
                )}

                {ad.is_anomaly && (
                    <div className="mb-16 p-12 bg-accent rounded-[3.5rem] shadow-2xl shadow-accent/20">
                        <div className="flex items-center gap-3 text-[#141414] mb-4">
                            <TrendingUp className="w-6 h-6" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.4em]">Strategic Pivot Warning</h3>
                        </div>
                        <p className="text-2xl font-light text-[#141414] leading-relaxed italic pr-10">
                            {ad.anomaly_reason}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16">
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

                            <div className="no-print">
                                <VideoPins
                                    adId={ad.id}
                                    currentTimeMs={currentTimeMs}
                                    onSeek={handleSeek}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="lg:col-span-7 space-y-8 md:space-y-12">
                        {/* Summary Section */}
                        <div className="bg-white p-8 md:p-16 rounded-[2.5rem] md:rounded-[4rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)] relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent opacity-20 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-3 mb-8 md:mb-10 text-[#141414]">
                                <Layout className="w-5 h-5 text-accent" />
                                <h3 className="text-xs font-bold uppercase tracking-[0.3em]">Deconstructed Thesis</h3>
                            </div>

                            {digest.extraction?.narrative_arc?.transcription && (
                                <div className="mb-8 md:mb-12 p-6 md:p-10 bg-[#FBF7EF] rounded-[1.5rem] md:rounded-[2.5rem] border border-[#E7DED1]">
                                    <p className="text-[9px] md:text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] mb-3 md:mb-4 opacity-100">Narrative Extraction</p>
                                    <p className="text-lg md:text-xl font-light text-[#141414]/80 leading-relaxed italic border-l-2 border-accent/20 pl-6 md:pl-8">
                                        "{digest.extraction.narrative_arc.transcription}"
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                                <div className="p-6 md:p-8 bg-[#FBF7EF] rounded-[1.5rem] md:rounded-[2rem] border border-[#E7DED1] hover:border-[#BB9E7B]/50 transition-all">
                                    <p className="text-[8px] md:text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] mb-2">Psychological Trigger</p>
                                    <p className="text-sm md:text-md font-bold text-[#141414] uppercase tracking-tight">{digest.classification.trigger_mechanic.replace('_', ' ')}</p>
                                </div>
                                <div className="p-6 md:p-8 bg-[#FBF7EF] rounded-[1.5rem] md:rounded-[2rem] border border-[#E7DED1] hover:border-[#BB9E7B]/50 transition-all">
                                    <p className="text-[8px] md:text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] mb-2">Narrative Framework</p>
                                    <p className="text-sm md:text-md font-bold text-[#141414] uppercase tracking-tight">{digest.classification.narrative_framework.replace('_', ' ')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Remix Engine Integration */}
                        {!isShared && (
                            <div className="pt-8">
                                <RemixView digest={digest} adId={ad.id} />
                            </div>
                        )}
                    </div>
                </div>

                <div className="pt-16 md:pt-24 border-t border-[#E7DED1]">
                    <div className="flex items-center gap-3 mb-10 md:mb-16">
                        <Sparkles className="w-5 h-5 text-accent" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-[#141414]">Technical Creative Forensics</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                        <div className="p-8 bg-white border border-[#E7DED1] rounded-[2rem] shadow-sm">
                            <h4 className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-4">Saturation Risk</h4>
                            <div className="flex items-end gap-3 mb-4">
                                <span className="text-5xl font-light text-[#141414] leading-none">{forecasting.saturationLevel}%</span>
                                <span className={`text-[10px] font-bold uppercase tracking-widest mb-1 ${forecasting.saturationLevel > 60 ? 'text-red-500' : 'text-green-600'}`}>
                                    {forecasting.saturationLevel > 60 ? 'High Risk' : 'Healthy Space'}
                                </span>
                            </div>
                            <div className="h-1.5 w-full bg-[#F6F1E7] rounded-full overflow-hidden">
                                <div
                                    className={`h-full transition-all duration-1000 ${forecasting.saturationLevel > 60 ? 'bg-red-500' : 'bg-accent'}`}
                                    style={{ width: `${forecasting.saturationLevel}%` }}
                                />
                            </div>
                        </div>

                        <div className="p-8 bg-white border border-[#E7DED1] rounded-[2rem] shadow-sm">
                            <h4 className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-4">Predicted Lifespan</h4>
                            <div className="flex items-end gap-3 mb-4">
                                <span className="text-5xl font-light text-[#141414] leading-none">{forecasting.estimatedLifespanDays}</span>
                                <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1">Days Remaining</span>
                            </div>
                            <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                                Expected performance decline after {forecasting.estimatedLifespanDays} days based on category momentum.
                            </p>
                        </div>
                    </div>

                    <DeepAuditView digest={digest} />
                </div>
            </div>
        </div >
    );
}
