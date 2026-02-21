'use client';

import { TrendingUp, Calendar } from 'lucide-react';

interface TrendPoint {
    date: string;
    [key: string]: any;
}

interface TrendMapProps {
    data: TrendPoint[];
    category: string;
}

export default function TrendMap({ data, category }: TrendMapProps) {
    if (!data || data.length < 2) return null;

    // Get all unique triggers in the data
    const triggers = Array.from(new Set(
        data.flatMap(d => Object.keys(d).filter(k => k !== 'date'))
    )).slice(0, 4); // Show top 4 for clarity

    const width = 800;
    const height = 200;
    const padding = 20;

    const maxVal = Math.max(...data.flatMap(d => triggers.map(t => d[t] || 0))) || 1;

    const getX = (i: number) => (i / (data.length - 1)) * (width - padding * 2) + padding;
    const getY = (val: number) => height - ((val / maxVal) * (height - padding * 2) + padding);

    const colors = ['#BB9E7B', '#141414', '#6B6B6B', '#D8CCBC'];

    return (
        <div className="bg-white p-8 rounded-[2.5rem] border border-[#E7DED1] shadow-[0_20px_50px_rgba(20,20,20,0.03)]">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h3 className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Market Forecast</h3>
                    <h4 className="text-xl font-light text-[#141414] uppercase tracking-tight">Strategic Pulse Heatmap</h4>
                </div>
                <div className="flex items-center gap-6">
                    {triggers.map((t, i) => (
                        <div key={t} className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i] }} />
                            <span className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-wider">{t.replace('_', ' ')}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="relative">
                <svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`} className="overflow-visible">
                    {/* Grid */}
                    {[0, 0.5, 1].map(p => (
                        <line
                            key={p}
                            x1={padding} y1={getY(p * maxVal)} x2={width - padding} y2={getY(p * maxVal)}
                            className="stroke-[#E7DED1] stroke-[0.5]"
                            strokeDasharray="4 4"
                        />
                    ))}

                    {/* Paths */}
                    {triggers.map((t, i) => {
                        const points = data.map((d, idx) => `${getX(idx)},${getY(d[t] || 0)}`).join(' ');
                        return (
                            <polyline
                                key={t}
                                points={points}
                                fill="none"
                                stroke={colors[i]}
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="transition-all duration-700"
                            />
                        );
                    })}
                </svg>

                {/* X Axis Labels */}
                <div className="flex justify-between mt-4 px-2">
                    {data.filter((_, i) => i % 5 === 0).map((d) => (
                        <span key={d.date} className="text-[8px] font-bold text-[#6B6B6B] uppercase font-mono">
                            {d.date.split('-').slice(1).join('/')}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E7DED1] flex items-center gap-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-accent" />
                </div>
                <p className="text-[11px] text-[#6B6B6B] leading-relaxed">
                    Detected a <span className="text-[#141414] font-bold">+12% surge</span> in <span className="underline decoration-accent underline-offset-4">FOMO_Scarcity</span> tactics across the {category} category in the last 7 days.
                </p>
            </div>
        </div>
    );
}
