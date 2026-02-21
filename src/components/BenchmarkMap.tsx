'use client';

import { TrendingUp, AlertCircle, Info } from 'lucide-react';

interface BenchmarkData {
    key: string;
    percentage: number;
}

interface BenchmarkMapProps {
    category: string;
    userStats: BenchmarkData[];
    categoryAverages: BenchmarkData[];
}

export default function BenchmarkMap({ category, userStats, categoryAverages }: BenchmarkMapProps) {
    // We'll normalize the keys to ensure we're comparing the same triggers
    const allKeys = Array.from(new Set([
        ...userStats.map(s => s.key),
        ...categoryAverages.map(s => s.key)
    ])).slice(0, 6); // Top 6 for the radar

    const points = allKeys.length;
    const radius = 100;
    const center = 120;
    const size = 240;

    const getCoordinate = (index: number, value: number) => {
        const angle = (Math.PI * 2 * index) / points - Math.PI / 2;
        const r = (value / 100) * radius;
        return {
            x: center + r * Math.cos(angle),
            y: center + r * Math.sin(angle)
        };
    };

    const userPath = allKeys.map((key, i) => {
        const stat = userStats.find(s => s.key === key)?.percentage || 0;
        const { x, y } = getCoordinate(i, stat);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ') + ' Z';

    const averagePath = allKeys.map((key, i) => {
        const stat = categoryAverages.find(s => s.key === key)?.percentage || 0;
        const { x, y } = getCoordinate(i, stat);
        return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ') + ' Z';

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.03)]">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h3 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Strategic Posture</h3>
                    <h4 className="text-xl font-light text-[#141414] uppercase tracking-tight">{category} Benchmark</h4>
                </div>
                <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-accent rounded-sm" />
                        <span className="text-[9px] font-bold text-[#141414] uppercase">Your Profile</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 bg-[#E7DED1] rounded-sm" />
                        <span className="text-[9px] font-bold text-[#6B6B6B] uppercase">Category Avg</span>
                    </div>
                </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-12">
                {/* Radar Chart */}
                <div className="relative">
                    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
                        {/* Grid Lines */}
                        {[0.2, 0.4, 0.6, 0.8, 1].map(scale => (
                            <polygon
                                key={scale}
                                points={allKeys.map((_, i) => {
                                    const { x, y } = getCoordinate(i, scale * 100);
                                    return `${x},${y}`;
                                }).join(' ')}
                                className="fill-none stroke-[#E7DED1] stroke-[0.5]"
                            />
                        ))}

                        {/* Axis Labels */}
                        {allKeys.map((key, i) => {
                            const { x, y } = getCoordinate(i, 115);
                            return (
                                <text
                                    key={key}
                                    x={x}
                                    y={y}
                                    textAnchor="middle"
                                    className="text-[8px] font-bold fill-[#6B6B6B] uppercase tracking-tighter"
                                >
                                    {key.replace('_', ' ')}
                                </text>
                            );
                        })}

                        {/* Paths */}
                        <path d={averagePath} className="fill-[#141414]/5 stroke-[#D8CCBC] stroke-1" />
                        <path d={userPath} className="fill-accent/10 stroke-accent stroke-2 transition-all duration-700" />
                    </svg>
                </div>

                {/* Insight Panel */}
                <div className="flex-1 space-y-6">
                    <div className="p-5 bg-[#FBF7EF] rounded-2xl border border-[#E7DED1]">
                        <div className="flex items-center gap-2 mb-3">
                            <TrendingUp className="w-4 h-4 text-accent" />
                            <p className="text-[10px] font-bold text-[#141414] uppercase tracking-widest">Key Differentiation</p>
                        </div>
                        <p className="text-[13px] text-[#6B6B6B] leading-relaxed">
                            Your creative is <span className="text-[#141414] font-bold">significantly more aggressive</span> on trigger mechanics that leverage <span className="underline decoration-accent underline-offset-4 font-bold text-[#141414]">FOMO & Scarcity</span> compared to the {category} average.
                        </p>
                    </div>

                    <div className="flex items-start gap-4">
                        <div className="p-2 bg-accent/10 rounded-lg">
                            <Info className="w-4 h-4 text-accent" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-[#141414] uppercase tracking-widest mb-1">Strategic Gap</p>
                            <p className="text-[12px] text-[#6B6B6B]">The category is currently underserved in "High Trust" messaging—representing an opportunity to break from the crowd.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
