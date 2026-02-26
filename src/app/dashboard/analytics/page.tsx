import { Suspense } from 'react';
import Filters from '@/components/Filters';
import { auth } from '@clerk/nextjs/server';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';
import { Download, Activity, Clock, Zap } from 'lucide-react';
import CircularGauge from '@/components/CircularGauge';
import RadarChart from '@/components/RadarChart';
import OpportunityVoids from '@/components/OpportunityVoids';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getAnalyticsData } from '@/lib/analytics';

async function AnalyticsContent({ brand }: { brand?: string }) {
    const { userId, orgId } = await auth();
    if (!userId) return null;
    const data = await getAnalyticsData(userId, orgId, brand);

    if (data.summary.total === 0) {
        return (
            <div className="text-center py-20 bg-[#141414] rounded-[24px] border border-[#E7DED1]/10">
                <p className="text-[#6B6B6B] font-medium text-sm">No data found for the selected filters.</p>
            </div>
        );
    }

    const triggerMechanics = data.dimensions['trigger_mechanic'] || [];
    const dominantTrigger = triggerMechanics.length > 0 ? triggerMechanics[0] : null;

    const emotionalFrameworks = data.dimensions['narrative_framework'] || [];

    // Heuristics for dashboard display
    const saturationPercentage = Math.min(Math.round((data.summary.total / 500) * 100), 100) || 5;

    // Sort frameworks by count to show top 4 blocks
    const topEmotions = [...emotionalFrameworks].sort((a, b) => b.count - a.count).slice(0, 4);
    const maxEmotionCount = topEmotions.length > 0 ? topEmotions[0].count : 1;

    return (
        <div className="space-y-12">
            {/* 1. The Sovereign Market Pulse (Top Row) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Saturation Gauge */}
                <div className="bg-[#141414] p-8 rounded-[24px] border border-[#E7DED1]/5 shadow-sm">
                    <div className="mb-6 flex justify-between items-start">
                        <Activity className="w-5 h-5 text-[#BB9E7B]" />
                        <div className="w-2 h-2 rounded-full bg-accent/40 animate-pulse" />
                    </div>
                    <CircularGauge value={saturationPercentage} label="Market Saturation" sublabel="Category Density Index" />
                </div>

                {/* Dominant Schema */}
                <div className="bg-[#141414] p-8 rounded-[24px] border border-[#E7DED1]/5 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="mb-6">
                            <Zap className="w-5 h-5 text-[#BB9E7B]" />
                        </div>
                        <h3 className="text-xs font-bold text-[#BB9E7B] uppercase tracking-widest mb-1">Dominant Schema</h3>
                        <p className="text-[10px] text-txt-on-dark-muted font-medium uppercase tracking-tight">Top Trigger Mechanic</p>
                    </div>
                    <div className="mt-6 flex flex-col gap-1">
                        <span className="text-2xl font-light text-txt-on-dark capitalize tracking-tight">
                            {dominantTrigger ? dominantTrigger.label.replace(/_/g, ' ') : 'N/A'}
                        </span>
                        {dominantTrigger && (
                            <span className="text-[11px] font-bold text-[#BB9E7B] tracking-wide">
                                +{dominantTrigger.count} Deployments
                            </span>
                        )}
                    </div>
                </div>

                {/* Tactical Window */}
                <div className="bg-[#141414] p-8 rounded-[24px] border border-[#E7DED1]/5 shadow-sm flex flex-col justify-between relative overflow-hidden">
                    {/* decorative background graph line */}
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-10 pointer-events-none">
                        <svg viewBox="0 0 100 50" preserveAspectRatio="none" className="w-full h-full text-[#BB9E7B]">
                            <path d="M0,50 L20,30 L40,40 L60,10 L80,20 L100,5" fill="none" stroke="currentColor" strokeWidth="2" />
                        </svg>
                    </div>
                    <div>
                        <div className="mb-6 relative z-10">
                            <Clock className="w-5 h-5 text-[#BB9E7B]" />
                        </div>
                        <h3 className="text-xs font-bold text-[#BB9E7B] uppercase tracking-widest mb-1 relative z-10">Predictive Window</h3>
                        <p className="text-[10px] text-txt-on-dark-muted font-medium uppercase tracking-tight relative z-10">Creative Longevity</p>
                    </div>
                    <div className="mt-6 relative z-10">
                        <span className="text-2xl font-light text-txt-on-dark tracking-tight">
                            Fatigue at Day 32
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. Forensic Trend Mapping (Middle Row) */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Trigger Radar */}
                <div className="bg-[#141414] p-8 rounded-[24px] border border-[#E7DED1]/5 shadow-sm flex flex-col items-center">
                    <h3 className="text-[11px] font-bold text-txt-on-dark uppercase tracking-[0.2em] mb-8 self-start w-full border-b border-white/5 pb-4">
                        Trigger Distribution Map
                    </h3>
                    <div className="w-full max-w-[320px]">
                        <RadarChart data={triggerMechanics.map(t => ({ label: t.label, value: t.count }))} />
                    </div>
                </div>

                {/* Emotional Heatmap (Blocks) */}
                <div className="bg-[#141414] p-8 rounded-[24px] border border-[#E7DED1]/5 shadow-sm flex flex-col">
                    <h3 className="text-[11px] font-bold text-txt-on-dark uppercase tracking-[0.2em] mb-8 border-b border-white/5 pb-4">
                        Emotional DNA Heatmap
                    </h3>
                    <div className="flex-1 grid grid-cols-2 gap-3">
                        {topEmotions.map((emo, idx) => {
                            // Calculate opacity based on relative count to max
                            const ratio = emo.count / maxEmotionCount;
                            // Ensure minimum visibility
                            const opacity = Math.max(0.2, ratio);

                            return (
                                <div key={idx} className="relative rounded-xl border border-white/5 overflow-hidden flex flex-col justify-end p-4 group">
                                    {/* Heatmap background block */}
                                    <div
                                        className="absolute inset-0 bg-[#BB9E7B]"
                                        style={{ opacity: opacity * 0.4 }}
                                    />
                                    {/* Content */}
                                    <div className="relative z-10">
                                        <p className="text-[10px] text-txt-on-dark/70 font-bold uppercase tracking-widest mb-1">
                                            Usage: {emo.count}
                                        </p>
                                        <p className="text-[13px] font-medium text-txt-on-dark capitalize leading-tight">
                                            {emo.label.replace(/_/g, ' ')}
                                        </p>
                                    </div>
                                </div>
                            );
                        })}
                        {topEmotions.length === 0 && (
                            <p className="text-xs text-txt-on-dark-muted italic col-span-2">No emotional data recorded.</p>
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

export default async function AnalyticsPage({
    searchParams,
}: {
    searchParams: Promise<{ brand?: string }>;
}) {
    const params = await searchParams;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 w-full relative z-20">
            <Sidebar searchParams={params} />
            <div className="flex-1 space-y-12 py-12">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-10 border-b border-[#E7DED1]">
                    <div>
                        <h2 className="text-5xl font-light text-[#141414] tracking-tightest uppercase leading-[0.85] select-none">
                            Market<br />
                            <span className="text-[#6B6B6B]/30">Pulse</span>
                        </h2>
                        <p className="text-[12px] text-[#6B6B6B] mt-6 font-bold tracking-[0.3em] uppercase">Sovereign Intelligence Dashboard</p>
                    </div>

                    <div className="md:pb-2 flex items-center gap-4">
                        <Link
                            href="/dashboard?v=executive"
                            className="flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest bg-white border border-[#E7DED1] hover:border-accent hover:text-[#141414] transition-all shadow-sm"
                        >
                            <Download className="w-3.5 h-3.5" />
                            Export Category Audit
                        </Link>
                    </div>
                </div>

                <section className="flex-1">
                    <Suspense fallback={
                        <div className="space-y-12 animate-pulse">
                            <div className="grid grid-cols-3 gap-5">
                                {[1, 2, 3].map(i => <div key={i} className="h-24 bg-surface/50 rounded-2xl border border-white/5" />)}
                            </div>
                            <div className="grid grid-cols-2 gap-6">
                                {[1, 2, 3, 4].map(i => <div key={i} className="h-56 bg-surface/50 rounded-2xl border border-white/5" />)}
                            </div>
                        </div>
                    }>
                        <AnalyticsContent brand={params.brand} />
                    </Suspense>
                </section>
            </div>
        </div>
    );
}
