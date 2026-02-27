'use client';

import { Activity } from 'lucide-react';
import CircularGauge from '@/components/CircularGauge';
import Link from 'next/link';

export default function LiveMarketPulseWidget() {
    // Simulated live data to mimic the dashboard Analytics tab
    const saturationPercentage = 72;

    return (
        <div className="sticky top-28 bg-[#141414] p-8 rounded-[2rem] border border-white/10 shadow-lg">
            <div className="flex items-center gap-3 mb-6 pb-6 border-b border-white/10">
                <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center">
                    <Activity className="w-4 h-4 text-accent" />
                </div>
                <div>
                    <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.2em] leading-tight flex items-center gap-2">
                        Live Market Pulse
                        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                    </h4>
                    <p className="text-[9px] text-white/40 uppercase tracking-widest mt-1">Real-time Category Data</p>
                </div>
            </div>

            <div className="mb-8 flex flex-col items-center">
                <CircularGauge
                    value={saturationPercentage}
                    label="Current Saturation"
                    sublabel="Category Density Index"
                />
            </div>

            <div className="space-y-4">
                <p className="text-sm font-light text-white/60 leading-relaxed text-center">
                    Unlock full tactical access to monitor real-time saturation curves across your entire category.
                </p>
                <Link
                    href="/dashboard"
                    className="flex w-full items-center justify-center py-3 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-[#FBF7EF] uppercase tracking-[0.15em] transition-all hover:bg-white hover:text-[#141414] shadow-sm"
                >
                    Upgrade to Pro ($199/m)
                </Link>
            </div>
        </div>
    );
}
