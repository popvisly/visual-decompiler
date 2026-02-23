'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Target, BarChart3, TrendingUp, AlertTriangle, ChevronRight, Activity, Terminal, ExternalLink } from 'lucide-react';
import { AgencyMetrics, ExecutiveBriefing } from '@/lib/sovereignty_engine';

export default function CommandCenter() {
    const [data, setData] = useState<{ metrics: AgencyMetrics, briefing: ExecutiveBriefing, score: number } | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCommandData() {
            try {
                const res = await fetch('/api/briefing');
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error('Command Center launch failure:', err);
            } finally {
                setLoading(false);
            }
        }
        fetchCommandData();
    }, []);

    if (loading) {
        return (
            <div className="p-20 flex flex-col items-center justify-center space-y-6">
                <Terminal className="w-8 h-8 text-accent animate-pulse" />
                <p className="text-[10px] font-bold text-accent uppercase tracking-[0.5em] animate-pulse">Initializing Executive Command...</p>
            </div>
        );
    }

    if (!data) return null;

    const riskColor = data.briefing.criticalRiskLevel === 'HIGH' ? 'text-red-500' : data.briefing.criticalRiskLevel === 'MEDIUM' ? 'text-orange-500' : 'text-green-500';

    return (
        <div className="p-8 md:p-16 bg-[#141414] text-[#FBF7EF] relative overflow-hidden">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-5 [background-image:linear-gradient(#FBF7EF_1px,transparent_1px),linear-gradient(90deg,#FBF7EF_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-transparent" />

            <div className="relative z-10 space-y-16">
                {/* 1. Header & Sovereignty Score */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 border-b border-white/10 pb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-accent" />
                            <h2 className="text-xs font-bold uppercase tracking-[0.4em]">Executive Strategic Command</h2>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-light text-[#FBF7EF] tracking-tightest uppercase leading-none">
                            Agency<br />
                            <span className="text-accent italic">Sovereignty</span>
                        </h1>
                    </div>

                    <div className="relative flex items-center justify-center group">
                        <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full group-hover:bg-accent/30 transition-all duration-1000" />
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-[1px] border-white/10 flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl shadow-2xl">
                            <span className="text-7xl md:text-9xl font-light text-accent leading-none tracking-tighter">{data.score}</span>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mt-2">Sovereignty Index</p>

                            <div className="absolute top-0 left-0 w-full h-full border-[1px] border-accent/20 rounded-full animate-[spin_20s_linear_infinite]" />
                            <div className="absolute top-1 left-1 w-[calc(100%-8px)] h-[calc(100%-8px)] border-[1px] border-dashed border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
                    {/* 2. Executive Briefing / Orders */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-5 h-5 text-accent" />
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] opacity-60">Macro-Narrative Briefing</h3>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full ${riskColor}`}>
                                    <AlertTriangle className="w-3 h-3" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest">Risk: {data.briefing.criticalRiskLevel}</span>
                                </div>
                            </div>

                            <p className="text-2xl md:text-4xl font-light leading-snug tracking-tight text-[#FBF7EF]/90 border-l-4 border-accent pl-10 py-2">
                                {data.briefing.macroNarrative}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 bg-white/5 rounded-[3rem] border border-white/10 space-y-8">
                                <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em]">Command Directives</h4>
                                <ul className="space-y-6">
                                    {data.briefing.commandDirectives.map((order, i) => (
                                        <li key={i} className="flex gap-4 group cursor-pointer">
                                            < ChevronRight className="w-4 h-4 text-accent group-hover:translate-x-1 transition-transform" />
                                            <span className="text-[13px] font-light text-[#FBF7EF]/70 leading-relaxed group-hover:text-[#FBF7EF] transition-colors">{order}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-10 bg-accent/10 rounded-[3rem] border border-accent/20 flex flex-col justify-between space-y-10 group">
                                <div>
                                    <h4 className="text-[10px] font-bold text-accent uppercase tracking-[0.4em] mb-6">Strategic Moat</h4>
                                    <p className="text-lg font-light italic leading-relaxed text-accent">
                                        "{data.briefing.strategicMoat}"
                                    </p>
                                </div>
                                <div className="flex items-center justify-between pt-8 border-t border-accent/20">
                                    <p className="text-[10px] font-bold text-accent uppercase tracking-[0.3em]">Projection Accuracy</p>
                                    <span className="text-2xl font-light text-accent">{(data.metrics.predictionAccuracy * 100).toFixed(0)}%</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 3. Global High-Density Metrics */}
                    <div className="lg:col-span-5 space-y-8">
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { label: 'Total Boards', value: data.metrics.totalBoards, icon: BarChart3 },
                                { label: 'Intelligence Depth', value: `${data.metrics.totalAds}`, icon: TrendingUp },
                                { label: 'Active Anomalies', value: data.metrics.anomalyCount, icon: AlertTriangle },
                                { label: 'Market Velocity', value: `${(data.metrics.marketVelocity * 100).toFixed(0)}%`, icon: Zap },
                                { label: 'Strategic Rarity', value: `${(data.metrics.strategicRarity * 100).toFixed(0)}%`, icon: Target },
                                { label: 'Intent Mapping', value: `${(data.metrics.intentMappingScore * 100).toFixed(0)}%`, icon: Activity }
                            ].map((stat, i) => (
                                <div key={i} className="p-8 bg-white/5 border border-white/10 rounded-[2.5rem] hover:bg-white/[0.08] transition-all cursor-default group relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <stat.icon className="w-4 h-4 text-accent/40 mb-4 group-hover:text-accent group-hover:scale-110 transition-all" />
                                    <p className="text-3xl font-light text-[#FBF7EF] leading-none mb-2">{stat.value}</p>
                                    <p className="text-[9px] font-bold text-[#FBF7EF]/40 uppercase tracking-[0.2em]">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-10 bg-black/40 border border-white/5 rounded-[3rem] space-y-10 group relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5 [background-image:linear-gradient(#FBF7EF_1px,transparent_1px),linear-gradient(90deg,#FBF7EF_1px,transparent_1px)] [background-size:20px_20px]" />

                            <div className="relative z-10 flex items-center justify-between">
                                <h4 className="text-[10px] font-bold text-[#FBF7EF]/40 uppercase tracking-[0.4em]">Market Adoption Curve</h4>
                                <div className="flex gap-2">
                                    <div className="px-3 py-1 bg-white/10 border border-white/20 rounded-full">
                                        <span className="text-[8px] font-bold text-[#FBF7EF]/60 uppercase tracking-widest">{data.metrics.trendLongevity} CYCLE</span>
                                    </div>
                                    <div className="px-3 py-1 bg-accent/20 border border-accent/40 rounded-full">
                                        <span className="text-[8px] font-bold text-accent uppercase tracking-widest">Forecasting Active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-32 flex items-end justify-between px-10 pb-4 border-b border-white/10">
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 bg-accent/40 h-16 rounded-t-xl group-hover:h-20 transition-all duration-700" />
                                    <span className="text-[9px] font-bold opacity-40 tracking-widest">EDGY</span>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 bg-accent h-24 rounded-t-xl group-hover:h-28 transition-all duration-700 shadow-[0_0_30px_rgba(251,188,5,0.3)]" />
                                    <span className="text-[9px] font-bold text-accent tracking-widest">TRENDY</span>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <div className="w-12 bg-white/20 h-12 rounded-t-xl group-hover:h-14 transition-all duration-700" />
                                    <span className="text-[9px] font-bold opacity-40 tracking-widest">MAINSTREAM</span>
                                </div>

                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 px-8" viewBox="0 0 200 100" preserveAspectRatio="none">
                                    <path
                                        d="M20,80 C50,20 100,20 180,80"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                        className="text-accent"
                                    />
                                </svg>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-2">
                                <div className="space-y-2">
                                    <p className="text-[9px] font-bold text-[#FBF7EF]/40 uppercase tracking-widest">Velocity</p>
                                    <p className="text-xl font-light text-accent italic">Accelerating</p>
                                </div>
                                <div className="space-y-2 text-right">
                                    <p className="text-[9px] font-bold text-[#FBF7EF]/40 uppercase tracking-widest">Resonance</p>
                                    <p className="text-xl font-light text-[#FBF7EF] leading-none">High</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-black/40 border border-white/5 rounded-[3rem] space-y-8">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-bold text-[#FBF7EF]/40 uppercase tracking-[0.3em]">Operational Readiness</h4>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= 5 ? 'bg-accent' : 'bg-white/10'}`} />)}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-[#FBF7EF]/60">
                                        <span>Data Confidence</span>
                                        <span>{(data.metrics.avgConfidence * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-accent" style={{ width: `${data.metrics.avgConfidence * 100}%` }} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-[#FBF7EF]/60">
                                        <span>Model Calibration</span>
                                        <span>94%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-accent" style={{ width: '94%' }} />
                                    </div>
                                </div>
                            </div>

                            <button className="w-full py-5 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-[10px] font-bold uppercase tracking-[0.4em] text-[#FBF7EF]/60 hover:text-[#FBF7EF] transition-all flex items-center justify-center gap-3 group">
                                System Health Overview
                                <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
