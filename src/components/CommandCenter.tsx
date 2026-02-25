'use client';

import { useState, useEffect } from 'react';
import { Shield, Zap, Target, BarChart3, TrendingUp, AlertTriangle, ChevronRight, Activity, Terminal, ExternalLink } from 'lucide-react';
import { AgencyMetrics, ExecutiveBriefing } from '@/lib/sovereignty_engine';

export default function CommandCenter() {
    const [data, setData] = useState<{ metrics: AgencyMetrics, briefing: ExecutiveBriefing, score: number } | null>(null);
    const [loading, setLoading] = useState(true);
    const [syncing, setSyncing] = useState(false);

    const handleSync = async () => {
        setSyncing(true);
        try {
            await fetch('/api/worker', {
                method: 'POST',
                headers: { 'Authorization': 'Bearer OPEN' }
            });
            // Refresh data after sync
            const res = await fetch('/api/briefing');
            const json = await res.json();
            setData(json);
        } catch (err) {
            console.error('Sync failed:', err);
        } finally {
            setSyncing(false);
        }
    };

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
        <div className="p-8 md:p-16 bg-[#F6F1E7] text-[#1A1A18] relative overflow-hidden border-t border-[#E7DED1]">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#1A1A18_1px,transparent_1px),linear-gradient(90deg,#1A1A18_1px,transparent_1px)] [background-size:40px_40px]" />
            <div className="absolute inset-0 bg-gradient-to-br from-[#BB9E7B]/5 via-transparent to-transparent" />

            <div className="relative z-10 space-y-16">
                {/* 1. Header & Sovereignty Score */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-12 border-b border-[#E7DED1] pb-16">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-[#BB9E7B]" />
                            <h2 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#BB9E7B]">Executive Strategic Command</h2>
                        </div>
                        <h1 className="text-5xl md:text-8xl font-semibold text-[#1A1A18] tracking-tightest uppercase leading-none mb-6">
                            Agency<br />
                            <span className="text-[#BB9E7B]">Sovereignty</span>
                        </h1>
                        <p className="text-[13px] md:text-[15px] text-[#6B6B6B] font-medium max-w-sm leading-relaxed border-l border-[#BB9E7B] pl-6 py-1">
                            VisualDecompiler.com is the sovereign infrastructure for elite agencies. We bridge the gap between creative execution and forensic strategic intelligence.
                        </p>
                    </div>

                    <div className="relative flex items-center justify-center group">
                        <div className="absolute inset-0 bg-[#BB9E7B]/10 blur-[100px] rounded-full group-hover:bg-[#BB9E7B]/20 transition-all duration-1000" />
                        <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border border-[#E7DED1] flex flex-col items-center justify-center bg-white/40 backdrop-blur-xl shadow-[0_40px_80px_rgba(20,20,20,0.08)]">
                            <span className="text-7xl md:text-9xl font-semibold text-[#1A1A18] leading-none tracking-tighter">{data.score}</span>
                            <p className="text-[10px] font-bold uppercase tracking-[0.3em] opacity-40 mt-2 text-[#6B6B6B]">Sovereignty Index</p>

                            <div className="absolute top-0 left-0 w-full h-full border-[1.5px] border-[#BB9E7B]/15 rounded-full animate-[spin_20s_linear_infinite]" />
                            <div className="absolute top-2 left-2 w-[calc(100%-16px)] h-[calc(100%-16px)] border border-dashed border-[#E7DED1] rounded-full animate-[spin_15s_linear_infinite_reverse]" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-20">
                    {/* 2. Executive Briefing / Orders */}
                    <div className="lg:col-span-7 space-y-12">
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Activity className="w-5 h-5 text-[#BB9E7B]" />
                                    <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#6B6B6B]">Macro-Narrative Briefing</h3>
                                </div>
                                <div className={`flex items-center gap-2 px-4 py-2 bg-[#FBF7EF] border border-[#E7DED1] rounded-full ${riskColor}`}>
                                    <AlertTriangle className="w-3 h-3" />
                                    <span className="text-[10px] font-bold uppercase tracking-widest px-1">Risk: {data.briefing.criticalRiskLevel}</span>
                                </div>
                            </div>

                            <p className="text-2xl md:text-4xl font-semibold leading-snug tracking-tight text-[#1A1A18] border-l-4 border-[#BB9E7B] pl-10 py-2">
                                {data.briefing.macroNarrative}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="p-10 bg-[#FBF7EF] rounded-[2.5rem] border border-[#E7DED1] shadow-sm space-y-8">
                                <h4 className="text-[10px] font-bold text-[#BB9E7B] uppercase tracking-[0.4em]">Command Directives</h4>
                                <ul className="space-y-6">
                                    {data.briefing.commandDirectives.map((order, i) => (
                                        <li key={i} className="flex gap-4 group cursor-pointer">
                                            < ChevronRight className="w-4 h-4 text-[#BB9E7B] group-hover:translate-x-1 transition-transform" />
                                            <span className="text-[13px] font-medium text-[#6B6B6B] leading-relaxed group-hover:text-[#1A1A18] transition-colors">{order}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="p-10 bg-white rounded-[2.5rem] border border-[#E7DED1] shadow-xl shadow-black/[0.02] flex flex-col justify-between space-y-10 group overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#BB9E7B]/5 blur-3xl rounded-full" />
                                <div className="relative z-10">
                                    <h4 className="text-[10px] font-bold text-[#BB9E7B] uppercase tracking-[0.4em] mb-6">Strategic Moat</h4>
                                    <p className="text-lg font-medium italic leading-relaxed text-[#1A1A18]/80">
                                        "{data.briefing.strategicMoat}"
                                    </p>
                                </div>
                                <div className="relative z-10 flex items-center justify-between pt-8 border-t border-[#E7DED1]">
                                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">Projection Accuracy</p>
                                    <span className="text-2xl font-semibold text-[#BB9E7B]">{(data.metrics.predictionAccuracy * 100).toFixed(0)}%</span>
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
                                <div key={i} className="p-8 bg-white border border-[#E7DED1] rounded-[2rem] hover:shadow-lg hover:shadow-black/[0.03] transition-all cursor-default group relative overflow-hidden">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-[#BB9E7B] opacity-0 group-hover:opacity-100 transition-opacity" />
                                    <stat.icon className="w-4 h-4 text-[#BB9E7B]/40 mb-4 group-hover:text-[#BB9E7B] group-hover:scale-110 transition-all" />
                                    <p className="text-3xl font-semibold text-[#1A1A18] leading-none mb-2">{stat.value}</p>
                                    <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.2em]">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        <div className="p-10 bg-[#FBF7EF] border border-[#E7DED1] rounded-[3rem] space-y-10 group relative overflow-hidden shadow-sm">
                            <div className="absolute inset-0 opacity-[0.03] [background-image:linear-gradient(#1A1A18_1px,transparent_1px),linear-gradient(90deg,#1A1A18_1px,transparent_1px)] [background-size:20px_20px]" />

                            <div className="relative z-10 flex items-center justify-between">
                                <h4 className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em]">Market Adoption Curve</h4>
                                <div className="flex gap-2">
                                    <div className="px-3 py-1 bg-white border border-[#E7DED1] rounded-full">
                                        <span className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest">{data.metrics.trendLongevity} CYCLE</span>
                                    </div>
                                    <div className="px-3 py-1 bg-[#BB9E7B]/10 border border-[#BB9E7B]/30 rounded-full">
                                        <span className="text-[8px] font-bold text-[#BB9E7B] uppercase tracking-widest">Forecasting Active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="relative h-32 flex items-end justify-between px-10 pb-4 border-b border-[#E7DED1]">
                                <div className="flex flex-col items-center gap-3">
                                    <div className={`w-10 h-16 rounded-t-lg transition-all duration-700 bg-[#E7DED1] group-hover:h-20`} />
                                    <span className="text-[9px] font-bold opacity-40 tracking-widest">EDGY</span>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <div className={`w-10 h-24 rounded-t-lg transition-all duration-700 bg-[#BB9E7B] group-hover:h-28 shadow-[0_0_40px_rgba(187,158,123,0.2)]`} />
                                    <span className="text-[9px] font-bold text-[#BB9E7B] tracking-widest">TRENDY</span>
                                </div>
                                <div className="flex flex-col items-center gap-3">
                                    <div className={`w-10 h-12 rounded-t-lg transition-all duration-700 bg-[#E7DED1]/50 group-hover:h-14`} />
                                    <span className="text-[9px] font-bold opacity-40 tracking-widest">MAINSTREAM</span>
                                </div>

                                <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20 px-8" viewBox="0 0 200 100" preserveAspectRatio="none">
                                    <path
                                        d="M20,80 C50,20 100,20 180,80"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="1.5"
                                        strokeDasharray="4 4"
                                        className="text-[#BB9E7B]"
                                    />
                                </svg>
                            </div>

                            <div className="grid grid-cols-2 gap-6 pt-2">
                                <div className="space-y-2">
                                    <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest">Velocity</p>
                                    <p className="text-xl font-semibold text-[#BB9E7B] italic">Accelerating</p>
                                </div>
                                <div className="space-y-2 text-right">
                                    <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest">Resonance</p>
                                    <p className="text-xl font-semibold text-[#1A1A18] leading-none">High</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-[#FBF7EF] border border-[#E7DED1] rounded-[3rem] space-y-8 shadow-sm">
                            <div className="flex items-center justify-between">
                                <h4 className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">Operational Readiness</h4>
                                <div className="flex gap-1.5">
                                    {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= 5 ? 'bg-[#BB9E7B]' : 'bg-[#E7DED1]'}`} />)}
                                </div>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B]">
                                        <span>Data Confidence</span>
                                        <span className="text-[#1A1A18]">{(data.metrics.avgConfidence * 100).toFixed(0)}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-[#E7DED1]/30 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#BB9E7B]" style={{ width: `${data.metrics.avgConfidence * 100}%` }} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B]">
                                        <span>Model Calibration</span>
                                        <span className="text-[#1A1A18]">94%</span>
                                    </div>
                                    <div className="h-1 w-full bg-[#E7DED1]/30 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#BB9E7B]" style={{ width: '94%' }} />
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={handleSync}
                                    disabled={syncing}
                                    className="w-full py-5 bg-white hover:bg-[#BB9E7B] hover:text-white border border-[#BB9E7B]/30 rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] text-[#BB9E7B] transition-all flex items-center justify-center gap-3 group shadow-sm active:scale-[0.98]"
                                >
                                    {syncing ? (
                                        <>
                                            <Zap className="w-3 h-3 animate-pulse" />
                                            Synchronizing Strategic Matrix...
                                        </>
                                    ) : (
                                        <>
                                            <Zap className="w-3 h-3 group-hover:scale-110 transition-transform" />
                                            Force Intelligence Sync
                                        </>
                                    )}
                                </button>

                                <button className="w-full py-5 bg-[#1A1A18] hover:bg-black rounded-2xl text-[10px] font-bold uppercase tracking-[0.4em] text-white transition-all flex items-center justify-center gap-3 group">
                                    System Health Overview
                                    <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
