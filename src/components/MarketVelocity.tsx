'use client';

import { Activity, Zap, TrendingUp, Clock3 } from 'lucide-react';
import { VelocityMetrics } from '@/lib/forecasting';

interface MarketVelocityProps {
    metrics: VelocityMetrics;
}

export default function MarketVelocity({ metrics }: MarketVelocityProps) {
    const getStatusColor = (level: number) => {
        if (level < 30) return 'text-green-600';
        if (level < 70) return 'text-accent';
        return 'text-red-500';
    };

    const getBarColor = (level: number) => {
        if (level < 30) return 'bg-green-500';
        if (level < 70) return 'bg-accent';
        return 'bg-red-500';
    };

    return (
        <div className="bg-white rounded-[2rem] border border-[#E7DED1] overflow-hidden shadow-sm">
            <div className="p-8 border-b border-[#E7DED1] bg-[#FBF7EF]/30 flex items-center justify-between">
                <div>
                    <h3 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1 font-mono">Forecasting Engine</h3>
                    <h4 className="text-xl font-light text-[#141414] uppercase tracking-tight">Market Velocity & Saturation</h4>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-[#E7DED1] text-[10px] font-bold uppercase tracking-widest shadow-sm">
                    <Activity className={`w-3.5 h-3.5 ${getStatusColor(metrics.saturationLevel)}`} />
                    {metrics.trendPhase}
                </div>
            </div>

            <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-12">
                {/* Saturation Gauge */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">Trend Saturation</span>
                        <span className={`text-[10px] font-bold uppercase ${getStatusColor(metrics.saturationLevel)}`}>
                            {metrics.saturationLevel}%
                        </span>
                    </div>
                    <div className="h-1.5 w-full bg-[#F6F1E7] rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-1000 ease-out ${getBarColor(metrics.saturationLevel)}`}
                            style={{ width: `${metrics.saturationLevel}%` }}
                        />
                    </div>
                    <p className="text-[11px] text-[#6B6B6B] leading-relaxed italic">
                        {metrics.saturationLevel > 70
                            ? "This strategy is entering high-saturation. Expect diminishing returns."
                            : "Significant white space detected. High potential for breakthrough."}
                    </p>
                </div>

                {/* Opportunity Score */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">Opportunity Score</span>
                        <Zap className="w-3.5 h-3.5 text-accent" />
                    </div>
                    <div className="text-3xl font-light tracking-tighter text-[#141414]">
                        {metrics.opportunityScore}<span className="text-sm text-[#6B6B6B] ml-1">/100</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-3.5 h-3.5 text-green-600" />
                        <span className="text-[10px] font-bold text-green-600 uppercase tracking-widest">{metrics.marketVelocity} momentum</span>
                    </div>
                </div>

                {/* Creative Lifespan */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">Predicted Lifespan</span>
                        <Clock3 className="w-3.5 h-3.5 text-[#6B6B6B]" />
                    </div>
                    <div className="text-3xl font-light tracking-tighter text-[#141414]">
                        ~{metrics.estimatedLifespanDays}<span className="text-lg text-[#6B6B6B] ml-1 uppercase">days</span>
                    </div>
                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">Until pattern pivot required</p>
                </div>
            </div>
        </div>
    );
}
