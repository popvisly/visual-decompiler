'use client';

import { useState, useRef } from 'react';
import Link from 'next/link';
import { TrendingUp, Sparkles, Activity } from 'lucide-react';
import BrandTag from '@/components/BrandTag';
import RemixView from '@/components/RemixView';
import PDFReport from '@/components/PDFReport';
import VideoPins from '@/components/VideoPins';
import { AdDigest } from '@/types/digest';

export default function AdDetailClient({ ad, digest, relatedAds }: { ad: any, digest: AdDigest, relatedAds: any[] }) {
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
        <div className="py-10">
            <div className="max-w-5xl mx-auto px-6">
                <nav className="spec-label mb-8 flex items-center gap-2">
                    <Link href="/dashboard" className="hover:text-accent transition-colors">Library</Link>
                    <span className="text-txt-muted">/</span>
                    <span className="text-txt-secondary">{ad.brand || digest?.meta?.brand_guess || 'Ad Detail'}</span>
                </nav>

                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-light text-[#141414] tracking-tight uppercase leading-tight">
                            {digest?.extraction?.on_screen_copy?.primary_headline || 'Intelligence Pending…'}
                        </h1>
                        <p className="text-[10px] text-[#6B6B6B] font-bold tracking-[0.2em] uppercase mt-1">Strategic Deep-Dive</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <button
                            onClick={predictROI}
                            className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E7DED1] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:border-accent transition-all shadow-sm"
                        >
                            <Sparkles className="w-4 h-4 text-accent" />
                            ROI Predictor
                        </button>
                        <PDFReport />
                    </div>
                </div>

                {roiPredict && (
                    <div className="mb-8 p-6 bg-accent/5 rounded-3xl border border-accent/20 animate-in fade-in slide-in-from-top-4 duration-500">
                        <div className="flex items-center gap-3 text-accent mb-2">
                            <Activity className="w-5 h-5" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Strategic ROI Estimate</h3>
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-[#141414] leading-relaxed italic pr-10">
                                {roiPredict.rationale}
                            </p>
                            <div className="shrink-0 text-center">
                                <p className="text-3xl font-light text-accent">{roiPredict.score}%</p>
                                <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest">Efficiency</p>
                            </div>
                        </div>
                    </div>
                )}

                {ad.is_anomaly && (
                    <div className="mb-8 p-6 bg-[#141414] rounded-3xl border border-accent/30 shadow-2xl shadow-accent/5">
                        <div className="flex items-center gap-3 text-accent mb-2">
                            <TrendingUp className="w-5 h-5" />
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em]">Strategic Pivot Detected</h3>
                        </div>
                        <p className="text-sm text-white/80 leading-relaxed italic">
                            {ad.anomaly_reason}
                        </p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="sticky top-20 space-y-6">
                            <div className="bg-surface rounded-2xl border border-white/5 overflow-hidden shadow-2xl">
                                {ad.media_kind === 'video' ? (
                                    <video
                                        ref={videoRef}
                                        src={ad.media_url}
                                        className="w-full aspect-[4/5] object-cover"
                                        controls muted playsInline preload="metadata"
                                        onTimeUpdate={handleTimeUpdate}
                                    />
                                ) : (
                                    <img
                                        src={ad.media_url}
                                        alt="Ad"
                                        className="w-full aspect-[4/5] object-cover"
                                    />
                                )}
                            </div>

                            <VideoPins
                                adId={ad.id}
                                currentTimeMs={currentTimeMs}
                                onSeek={handleSeek}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-3 space-y-6">
                        {/* Summary Section */}
                        <div className="bg-white p-8 rounded-[2rem] border border-[#E7DED1] shadow-sm">
                            <h3 className="text-xs font-bold text-[#141414] uppercase tracking-widest mb-6">Deconstructed Logic</h3>

                            {digest.extraction?.narrative_arc?.transcription && (
                                <div className="mb-8 p-6 bg-[#FBF7EF] rounded-2xl border border-[#E7DED1]">
                                    <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-3">Narrative Voice (Transcription)</p>
                                    <p className="text-sm text-[#141414] leading-relaxed italic">
                                        "{digest.extraction.narrative_arc.transcription}"
                                    </p>
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-[#FBF7EF] rounded-xl border border-[#E7DED1]">
                                    <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1">Trigger</p>
                                    <p className="text-xs font-bold text-[#141414]">{digest.classification.trigger_mechanic.replace('_', ' ')}</p>
                                </div>
                                <div className="p-4 bg-[#FBF7EF] rounded-xl border border-[#E7DED1]">
                                    <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1">Framework</p>
                                    <p className="text-xs font-bold text-[#141414]">{digest.classification.narrative_framework.replace('_', ' ')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Remix Engine Integration */}
                        <div className="pt-6">
                            <RemixView digest={digest} adId={ad.id} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
