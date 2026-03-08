'use client';

import { useEffect, useState } from 'react';
import { Download, Activity, Clock, Zap, Loader2 } from 'lucide-react';
import CircularGauge from '@/components/CircularGauge';
import RadarChart from '@/components/RadarChart';
import OpportunityVoids from '@/components/OpportunityVoids';

export default function AdAnalyticsTab({ brand }: { brand?: string | null }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            setLoading(true);
            try {
                const url = new URL('/api/analytics', window.location.origin);
                if (brand) {
                    url.searchParams.set('brand', brand);
                }
                const res = await fetch(url.toString());
                if (res.ok) {
                    const json = await res.json();
                    setData(json);
                }
            } catch (err) {
                console.error("Failed to fetch analytics", err);
            } finally {
                setLoading(false);
            }
        };

        fetchAnalytics();
    }, [brand]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-6">
                <Loader2 className="w-8 h-8 text-[#D4A574] animate-spin" />
                <p className="text-[10px] font-bold text-[#8B4513] uppercase tracking-[0.3em]">
                    Aggregating Market Context...
                </p>
            </div>
        );
    }

    if (!data || data.summary.total === 0) {
        return (
            <div className="text-center py-20 bg-[#1A1A1A] rounded-3xl border border-[#D4A574]/20 shadow-sm mt-8">
                <div className="flex flex-col items-center justify-center space-y-4">
                    <Activity className="w-8 h-8 text-[#D4A574]/50" />
                    <p className="text-[#FFFFFF] font-medium text-sm tracking-tight">Insufficient data for statistical significance.</p>
                    <p className="text-[#D4A574]/70 font-bold text-[10px] max-w-md uppercase tracking-[0.2em] leading-relaxed px-8">
                        Market Analytics require a broader competitive set. 
                        Ingest more assets for {brand ? <span className="text-[#D4A574]">{brand}</span> : <span className="text-[#D4A574]">this category</span>} to unlock saturation metrics.
                    </p>
                </div>
            </div>
        );
    }

    const triggerMechanics = data.dimensions['trigger_mechanic'] || [];
    const dominantTrigger = triggerMechanics.length > 0 ? triggerMechanics[0] : null;
    const emotionalFrameworks = data.dimensions['narrative_framework'] || [];

    // Heuristics for dashboard display
    const saturationPercentage = Math.min(Math.round((data.summary.total / 500) * 100), 100) || 5;

    // Sort frameworks by count to show top 4 blocks
    const topEmotions = [...emotionalFrameworks].sort((a: any, b: any) => b.count - a.count).slice(0, 4);
    const maxEmotionCount = topEmotions.length > 0 ? topEmotions[0].count : 1;

    return (
        <div className="space-y-12">
            <div className="flex items-center justify-between pb-4 border-b border-[#D4A574]/20">
                <div>
                    <h2 className="text-2xl font-light text-[#1A1A1A] tracking-tight uppercase leading-[0.85] select-none">
                        Market Pulse
                    </h2>
                    <p className="text-[10px] text-[#8B4513] mt-2 font-bold tracking-[0.3em] uppercase">Sovereign Intelligence Dashboard</p>
                </div>
            </div>

            {/* 1. The Sovereign Market Pulse (Top Row) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Saturation Gauge */}
                <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#D4A574]/20 shadow-sm flex flex-col justify-between h-[260px]">
                    <div>
                        <div className="mb-4 flex justify-between items-start w-full">
                            <Activity className="w-4 h-4 text-[#D4A574]" />
                            <div className="w-1.5 h-1.5 rounded-full bg-[#D4A574]/40 animate-pulse mt-1" />
                        </div>
                        <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-1">Market Saturation</h3>
                        <p className="text-[9px] text-[#FFFFFF]/40 font-bold uppercase tracking-tight">Category Density Index</p>
                    </div>
                    <div className="mt-4 flex flex-col items-center">
                        <CircularGauge value={saturationPercentage} label="Market Saturation" sublabel="Category Density Index" />
                    </div>
                </div>

                {/* Dominant Schema */}
                <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#D4A574]/20 shadow-sm flex flex-col justify-between h-[260px]">
                    <div>
                        <div className="mb-4">
                            <Zap className="w-4 h-4 text-[#D4A574]" />
                        </div>
                        <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-1">Dominant Schema</h3>
                        <p className="text-[9px] text-[#FFFFFF]/40 font-bold uppercase tracking-tight">Top Trigger Mechanic</p>
                    </div>
                    <div className="mt-4 flex flex-col gap-1">
                        <span className="text-xl font-light text-[#FFFFFF] capitalize tracking-tight">
                            {dominantTrigger ? dominantTrigger.label.replace(/_/g, ' ') : 'N/A'}
                        </span>
                        {dominantTrigger && (
                            <span className="text-[10px] font-bold text-[#D4A574] tracking-wide">
                                +{dominantTrigger.count} Deployments
                            </span>
                        )}
                    </div>
                </div>

                {/* Tactical Window */}
                <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#D4A574]/20 shadow-sm flex flex-col justify-between relative overflow-hidden h-[260px]">
                    {/* decorative background graph line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-10 pointer-events-none">
                        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-[#D4A574]">
                            <path d="M0,50 L20,30 L40,40 L60,10 L80,20 L100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div>
                        <div className="mb-4 relative z-10">
                            <Clock className="w-4 h-4 text-[#D4A574]" />
                        </div>
                        <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-1 relative z-10">Predictive Window</h3>
                        <p className="text-[9px] text-[#FFFFFF]/40 font-bold uppercase tracking-tight relative z-10">Creative Longevity</p>
                    </div>
                    <div className="mt-4 relative z-10">
                        <span className="text-xl font-light text-[#FFFFFF] tracking-tight">
                            Fatigue at Day 32
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. Forensic Trend Mapping (Middle Row) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trigger Radar */}
                <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#D4A574]/20 shadow-sm flex flex-col items-center">
                    <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-6 self-start w-full border-b border-[#D4A574]/10 pb-4">
                        Trigger Distribution Map
                    </h3>
                    <div className="w-full max-w-[300px]">
                        <RadarChart data={triggerMechanics.map((t: any) => ({ label: t.label, value: t.count }))} />
                    </div>
                </div>

                {/* Emotional Heatmap (Blocks) */}
                <div className="bg-[#1A1A1A] p-5 rounded-3xl border border-[#D4A574]/20 shadow-sm flex flex-col">
                    <h3 className="text-[12px] font-bold text-[#D4A574] uppercase tracking-widest mb-6 border-b border-[#D4A574]/10 pb-4">
                        Emotional DNA Heatmap
                    </h3>
                    <div className="flex-1 grid grid-cols-2 gap-3">
                        {topEmotions.map((emo: any, idx) => {
                            // Calculate opacity based on relative count to max
                            const ratio = emo.count / maxEmotionCount;
                            // Ensure minimum visibility
                            const opacity = Math.max(0.2, ratio);

                            return (
                                <div key={idx} className="relative rounded-xl border border-[#D4A574]/10 overflow-hidden flex flex-col justify-end p-4 group">
                                    {/* Heatmap background block */}
                                    <div
                                        className="absolute inset-0 bg-[#D4A574]"
                                        style={{ opacity: opacity * 0.4 }}
                                    />
                                    {/* Content */}
                                    <div className="relative z-10">
                                        <p className="text-[10px] text-[#FFFFFF]/70 font-bold uppercase tracking-widest mb-1">
                                            Usage: {emo.count}
                                        </p>
                                        <p className="text-[13px] font-medium text-[#FFFFFF] capitalize leading-tight">
                                            {emo.label.replace(/_/g, ' ')}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        {topEmotions.length === 0 && (
                            <p className="text-xs text-[#FFFFFF]/50 italic col-span-2">No emotional data recorded.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. Competitor Vulnerability Feed (Bottom Row) */}
            <OpportunityVoids
                triggerMechanics={data.dimensions['trigger_mechanic'] || []}
                claimTypes={data.dimensions['claim_type'] || []}
            />
        </div>
    );
}
