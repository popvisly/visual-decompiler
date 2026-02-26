'use client';

import { Target } from 'lucide-react';
import ResultsCard from '@/components/ResultsCard';

interface Props {
    percentile: number;
    category?: string;
    resonanceScore?: number;
}

export default function SovereignBenchmark({ percentile, category, resonanceScore }: Props) {
    const isTop5 = percentile >= 95;
    const isTop10 = percentile >= 90;
    const isTop25 = percentile >= 75;

    return (
        <ResultsCard title="Sovereign Benchmark" variant="gauge">
            <div className="space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-[#E7DED1]">
                    <div className="space-y-1">
                        <p className="text-[9px] font-bold text-[#C1A67B] uppercase tracking-widest">Category Percentile</p>
                        <p className="text-[11px] text-[#6B6B6B] uppercase tracking-tight">
                            {category || 'Cross-category'} benchmark
                        </p>
                    </div>
                    <div className="text-right">
                        <span className="text-5xl font-bold text-[#141414] leading-none tracking-tight">{percentile}</span>
                        <span className="text-lg font-light text-[#6B6B6B] ml-0.5">th</span>
                    </div>
                </div>

                {/* Percentile bar */}
                <div className="relative">
                    {/* Track */}
                    <div className="h-5 bg-gradient-to-r from-[#E7DED1] via-[#C1A67B]/30 to-[#C1A67B] rounded-full relative overflow-hidden">
                        {/* Fill */}
                        <div
                            className="absolute inset-y-0 left-0 bg-[#141414] rounded-full transition-all duration-1000"
                            style={{ width: `${percentile}%` }}
                        />
                    </div>

                    {/* Position marker */}
                    <div
                        className="absolute -top-1 transition-all duration-1000"
                        style={{ left: `${percentile}%`, transform: 'translateX(-50%)' }}
                    >
                        <div className="w-7 h-7 rounded-full bg-[#141414] border-[3px] border-white shadow-lg flex items-center justify-center">
                            <Target className="w-3 h-3 text-white" />
                        </div>
                    </div>

                    {/* Top 5% threshold line */}
                    <div className="absolute -top-3 bottom-0" style={{ left: '95%' }}>
                        <div className="w-[1.5px] h-full bg-accent/40" />
                        <span className="absolute -top-5 -translate-x-1/2 text-[8px] font-bold text-accent uppercase tracking-widest whitespace-nowrap">Top 5%</span>
                    </div>

                    {/* Scale labels */}
                    <div className="flex justify-between mt-3 text-[8px] font-bold text-[#6B6B6B]/50 uppercase tracking-widest px-1">
                        <span>0</span>
                        <span>25th</span>
                        <span>50th</span>
                        <span>75th</span>
                        <span>100th</span>
                    </div>
                </div>

                {/* Verdict */}
                <div className="p-6 bg-[#FBF7EF] rounded-2xl border border-[#E7DED1] relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-4 opacity-5">
                        <Target className="w-10 h-10 text-[#141414]" />
                    </div>
                    <p className="text-[9px] font-bold text-[#141414] uppercase tracking-[0.3em] mb-3">Benchmark Verdict</p>
                    <p className="text-sm font-light text-[#141414] leading-relaxed italic">
                        {isTop5
                            ? `This ad operates in the top 5% of ${category || 'cross-category'} engagement patterns. Elite-tier creative that sets the benchmark for competitors.`
                            : isTop10
                                ? `Positioned in the top 10% — strong creative that outperforms the majority of ${category || 'category'} competitors. Minor optimizations could push into elite territory.`
                                : isTop25
                                    ? `Above-average performance at the ${percentile}th percentile. Solid creative with room for strategic refinement to reach the top tier.`
                                    : `Currently at the ${percentile}th percentile. Significant opportunity exists to improve engagement through creative optimization and stronger trigger mechanics.`
                        }
                    </p>
                    {resonanceScore !== undefined && (
                        <div className="mt-4 flex items-center gap-3">
                            <span className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest">Market Resonance:</span>
                            <span className="text-[13px] font-bold text-[#141414]">{resonanceScore}%</span>
                        </div>
                    )}
                </div>
            </div>
        </ResultsCard>
    );
}
