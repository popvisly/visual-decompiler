'use client';

import { useState, useEffect } from 'react';
import { Target, Zap, Shield, Brain, Activity, Info, ChevronRight, Sparkles } from 'lucide-react';
import { BenchmarkData } from '@/lib/benchmark_service';

type Props = {
    boardId: string;
};

export default function CategoryBenchmark({ boardId }: Props) {
    const [data, setData] = useState<BenchmarkData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchBenchmark() {
            setLoading(true);
            try {
                const res = await fetch(`/api/benchmark?boardId=${boardId}`);
                if (!res.ok) {
                    const text = await res.text();
                    throw new Error(`Failed to load benchmark data: ${res.status} ${text.substring(0, 50)}`);
                }
                const json = await res.json();
                setData(json);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchBenchmark();
    }, [boardId]);

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em]">Synthesizing Categorical Ideal...</p>
        </div>
    );

    if (error || !data) return (
        <div className="p-8 text-center bg-red-50 rounded-3xl border border-red-100">
            <p className="text-red-500 font-bold text-[10px] uppercase tracking-widest">{error || "Failed to load"}</p>
        </div>
    );

    const labels = [
        { key: 'emotionalResonance', icon: <Activity className="w-3 h-3" />, label: 'Emotional Resonance' },
        { key: 'intellectualComplexity', icon: <Brain className="w-3 h-3" />, label: 'Intellectual Complexity' },
        { key: 'productionVelocity', icon: <Zap className="w-3 h-3" />, label: 'Production Velocity' },
        { key: 'strategicAggression', icon: <Target className="w-3 h-3" />, label: 'Strategic Aggression' },
        { key: 'brandConsistency', icon: <Shield className="w-3 h-3" />, label: 'Brand Consistency' },
    ];

    // SVG Radar Calculation
    const size = 300;
    const center = size / 2;
    const radius = size * 0.4;

    const getPoints = (metrics: any) => {
        return labels.map((l, i) => {
            const angle = (i / labels.length) * 2 * Math.PI - Math.PI / 2;
            const value = metrics[l.key] || 0.5;
            const x = center + radius * value * Math.cos(angle);
            const y = center + radius * value * Math.sin(angle);
            return `${x},${y}`;
        }).join(' ');
    };

    const boardPoints = getPoints(data.board);
    const averagePoints = getPoints(data.average);

    return (
        <div className="space-y-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            {/* Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <div className="flex items-center gap-3 mb-4">
                        <span className="bg-accent text-[#FBF7EF] text-[9px] font-bold px-3 py-1 rounded uppercase tracking-[0.2em]">Strategic Benchmark</span>
                        <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em]">{data.category}</span>
                    </div>
                    <h2 className="text-5xl font-light text-[#141414] tracking-tightest uppercase leading-none">
                        The Platonic<br />
                        <span className="text-[#6B6B6B]/30 whitespace-nowrap">Ideal Matrix</span>
                    </h2>
                </div>

                <div className="flex gap-12 border-l border-[#E7DED1] pl-12 py-2">
                    <div className="space-y-1">
                        <p className="text-[14px] font-light text-[#141414]">{data.gaps.filter(g => g.opportunity === 'high').length}</p>
                        <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest">High Opportunity Gaps</p>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[14px] font-light text-[#141414]">{(Object.values(data.board).reduce((a, b) => a + b, 0) / 5 * 100).toFixed(0)}</p>
                        <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest">Efficiency Index</p>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                {/* Radar Chart Interaction */}
                <div className="relative flex items-center justify-center p-8 bg-white border border-[#E7DED1] rounded-[3rem] shadow-[0_40px_120px_rgba(20,20,20,0.03)] overflow-hidden group">
                    {/* Background Grid Lines */}
                    <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#141414_1px,transparent_1px),linear-gradient(90deg,#141414_1px,transparent_1px)] [background-size:24px_24px]" />

                    <svg width={size} height={size} className="relative z-10 overflow-visible">
                        {/* 5 Neutral Web Lines */}
                        {[0.2, 0.4, 0.6, 0.8, 1].map((r) => (
                            <polygon
                                key={r}
                                points={labels.map((_, i) => {
                                    const angle = (i / labels.length) * 2 * Math.PI - Math.PI / 2;
                                    const x = center + radius * r * Math.cos(angle);
                                    const y = center + radius * r * Math.sin(angle);
                                    return `${x},${y}`;
                                }).join(' ')}
                                fill="none"
                                stroke="#E7DED1"
                                strokeWidth="1"
                            />
                        ))}

                        {/* Axes */}
                        {labels.map((_, i) => {
                            const angle = (i / labels.length) * 2 * Math.PI - Math.PI / 2;
                            return (
                                <line
                                    key={i}
                                    x1={center}
                                    y1={center}
                                    x2={center + radius * Math.cos(angle)}
                                    y2={center + radius * Math.sin(angle)}
                                    stroke="#E7DED1"
                                    strokeWidth="1"
                                />
                            );
                        })}

                        {/* Category Average (Faint) */}
                        <polygon
                            points={averagePoints}
                            fill="#6B6B6B"
                            fillOpacity="0.05"
                            stroke="#6B6B6B"
                            strokeWidth="1"
                            strokeDasharray="4 2"
                            className="transition-all duration-1000"
                        />

                        {/* Board Performance (Emphasis) */}
                        <polygon
                            points={boardPoints}
                            fill="var(--accent)"
                            fillOpacity="0.15"
                            stroke="var(--accent)"
                            strokeWidth="2.5"
                            className="transition-all duration-1000 group-hover:fill-opacity-25"
                        />

                        {/* Labels with small icons */}
                        {labels.map((l, i) => {
                            const angle = (i / labels.length) * 2 * Math.PI - Math.PI / 2;
                            const x = center + (radius + 35) * Math.cos(angle);
                            const y = center + (radius + 20) * Math.sin(angle);
                            return (
                                <foreignObject key={i} x={x - 40} y={y - 15} width="80" height="30">
                                    <div className="flex flex-col items-center">
                                        <div className="text-[#141414]/40 mb-1">{l.icon}</div>
                                        <span className="text-[7px] font-bold text-[#141414] uppercase tracking-widest text-center leading-tight">
                                            {l.label.split(' ').join('\n')}
                                        </span>
                                    </div>
                                </foreignObject>
                            );
                        })}
                    </svg>

                    <div className="absolute bottom-8 right-8 flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 bg-accent rounded-sm" />
                            <span className="text-[8px] font-bold text-[#141414] uppercase tracking-widest">Board DNA</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2.5 h-2.5 border border-[#6B6B6B] border-dashed rounded-sm" />
                            <span className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest">Category Avg</span>
                        </div>
                    </div>
                </div>

                {/* Gaps / Analysis */}
                <div className="space-y-10">
                    <div className="space-y-4">
                        <h3 className="text-[11px] font-bold text-[#141414] uppercase tracking-[0.3em] flex items-center gap-3">
                            Strategic Whitespace <ArrowRightIcon className="w-3 h-3 text-accent" />
                        </h3>
                        <div className="grid grid-cols-1 gap-3">
                            {data.gaps.filter(g => g.opportunity === 'high').map((gap, i) => (
                                <div key={i} className="bg-[#FBF7EF] border border-accent/20 p-5 rounded-2xl flex items-start gap-5 group hover:border-accent transition-colors">
                                    <div className="w-10 h-10 bg-white rounded-xl border border-[#E7DED1] flex items-center justify-center shrink-0">
                                        <Sparkles className="w-4 h-4 text-accent" />
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="text-[11px] font-bold text-[#141414] uppercase tracking-widest">{labels.find(l => l.key === gap.dimension)?.label}</h4>
                                        <p className="text-[12px] text-[#6B6B6B] leading-relaxed uppercase tracking-tight">{gap.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="pt-8 border-t border-[#E7DED1] space-y-6">
                        <div className="flex items-center gap-3">
                            <Info className="w-4 h-4 text-accent" />
                            <span className="text-[10px] font-bold text-[#141414] uppercase tracking-widest">Intelligence Synthesis</span>
                        </div>
                        <div className="p-8 bg-[#141414] rounded-3xl space-y-4 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-10">
                                <Activity className="w-24 h-24 text-[#FBF7EF]" />
                            </div>
                            <h4 className="text-[#BB9E7B] text-[10px] font-bold uppercase tracking-[0.3em]">{data.ideal.title}</h4>
                            <p className="text-[#FBF7EF]/70 text-[14px] font-light leading-relaxed">
                                {data.ideal.strategy}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ArrowRightIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className={className}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
    );
}
