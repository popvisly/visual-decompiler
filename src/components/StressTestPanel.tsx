'use client';

import { useState, useEffect } from 'react';
import { ShieldAlert, Zap, TrendingDown, RefreshCcw, AlertTriangle, ShieldCheck, ChevronRight, BarChart3 } from 'lucide-react';
import { SimulationService, SHOCK_TEMPLATES, ProjectionResult } from '@/lib/simulation_service';

type Props = {
    boardId: string;
};

export default function StressTestPanel({ boardId }: Props) {
    const [boardMetrics, setBoardMetrics] = useState<any>(null);
    const [selectedShock, setSelectedShock] = useState(SHOCK_TEMPLATES[0].id);
    const [isSimulating, setIsSimulating] = useState(false);
    const [result, setResult] = useState<ProjectionResult | null>(null);

    useEffect(() => {
        async function fetchMetrics() {
            try {
                const res = await fetch(`/api/benchmark?boardId=${boardId}`);
                if (!res.ok) {
                    console.warn("Benchmark API returned non-OK status:", res.status);
                    return;
                }
                const data = await res.json();
                setBoardMetrics(data.board);
            } catch (err) {
                console.error("Failed to fetch board metrics for simulation", err);
            }
        }
        fetchMetrics();
    }, [boardId]);

    const handleRunSimulation = async () => {
        setIsSimulating(true);
        const res = await SimulationService.runSimulation(boardMetrics, selectedShock);
        setResult(res);
        setIsSimulating(false);
    };

    return (
        <div className="space-y-16 animate-in fade-in duration-1000">
            {/* Control Room Header */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-8">
                <div>
                    <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2 flex items-center gap-2">
                        <ShieldAlert className="w-3.5 h-3.5" /> Simulation Control Room
                    </h3>
                    <h2 className="text-4xl font-light text-[#141414] tracking-tightest uppercase">Strategic Stress Test</h2>
                </div>

                <div className="flex items-center gap-4">
                    <select
                        value={selectedShock}
                        onChange={(e) => setSelectedShock(e.target.value)}
                        className="bg-white border border-[#E7DED1] px-6 py-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-[#141414] transition-colors appearance-none pr-12 relative cursor-pointer"
                    >
                        {SHOCK_TEMPLATES.map(t => (
                            <option key={t.id} value={t.id}>{t.alias}</option>
                        ))}
                    </select>
                    <button
                        onClick={handleRunSimulation}
                        disabled={isSimulating}
                        className="bg-[#141414] text-[#FBF7EF] px-10 py-5 rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all flex items-center gap-3 disabled:opacity-50"
                    >
                        {isSimulating ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
                        {isSimulating ? 'Projecting...' : 'Initiate Shock'}
                    </button>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Visual Projection Area */}
                <div className="bg-[#141414] rounded-[3rem] p-16 relative overflow-hidden flex flex-col items-center justify-center min-h-[500px]">
                    <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(#FBF7EF_1px,transparent_1px),linear-gradient(90deg,#FBF7EF_1px,transparent_1px)] [background-size:48px_48px]" />

                    {!result && !isSimulating ? (
                        <div className="relative z-10 text-center space-y-6">
                            <div className="w-20 h-20 border border-[#FBF7EF]/20 rounded-full flex items-center justify-center mx-auto mb-8">
                                <BarChart3 className="w-8 h-8 text-[#FBF7EF]/20" />
                            </div>
                            <p className="text-[12px] font-bold text-[#FBF7EF]/40 uppercase tracking-[0.3em]">System Standby</p>
                            <p className="text-[14px] text-[#FBF7EF]/60 font-light max-w-xs mx-auto">Select a market shock event to project strategic degradation.</p>
                        </div>
                    ) : isSimulating ? (
                        <div className="relative z-10 flex flex-col items-center gap-8">
                            <div className="w-32 h-32 border-2 border-accent/20 border-t-accent rounded-full animate-spin" />
                            <p className="text-[12px] font-bold text-accent uppercase tracking-[0.4em] animate-pulse">Running Neural Simulation...</p>
                        </div>
                    ) : (
                        <div className="relative z-10 w-full space-y-12 animate-in zoom-in-95 duration-700">
                            {/* Shift Visualization */}
                            <div className="space-y-4">
                                {Object.entries(result!.shiftedMetrics).map(([key, value]: [string, any]) => {
                                    const original = boardMetrics[key] || 0.5;
                                    const diff = (value - original) * 100;
                                    return (
                                        <div key={key} className="space-y-2">
                                            <div className="flex justify-between items-end">
                                                <span className="text-[10px] font-bold text-[#FBF7EF] uppercase tracking-widest">{key}</span>
                                                <span className={`text-[10px] font-mono ${diff > 0 ? 'text-green-400' : 'text-red-400'}`}>
                                                    {diff > 0 ? '+' : ''}{diff.toFixed(1)}% Velocity
                                                </span>
                                            </div>
                                            <div className="h-1.5 w-full bg-[#FBF7EF]/10 rounded-full overflow-hidden flex">
                                                <div
                                                    className="h-full bg-accent/20"
                                                    style={{ width: `${original * 100}%` }}
                                                />
                                                <div
                                                    className={`h-full ${diff > 0 ? 'bg-green-500/50' : 'bg-red-500/50'}`}
                                                    style={{ width: `${Math.abs(diff)}%` }}
                                                />
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>

                            <div className="pt-8 border-t border-[#FBF7EF]/10 flex items-center justify-between">
                                <div>
                                    <p className="text-[8px] font-bold text-[#FBF7EF]/40 uppercase tracking-widest mb-1">Durability Index</p>
                                    <p className="text-5xl font-light text-[#FBF7EF] tracking-tightest">{result?.durabilityScore}%</p>
                                </div>
                                <div className="text-right">
                                    {result!.durabilityScore > 70 ? (
                                        <div className="flex items-center gap-3 text-green-400">
                                            <span className="text-[10px] font-bold uppercase tracking-widest">Resilient</span>
                                            <ShieldCheck className="w-5 h-5" />
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 text-red-500">
                                            <span className="text-[10px] font-bold uppercase tracking-widest">High Vulnerability</span>
                                            <AlertTriangle className="w-5 h-5" />
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Analytical Impact Area */}
                <div className="space-y-12">
                    <div className="space-y-6">
                        <h4 className="text-[11px] font-bold text-[#141414] uppercase tracking-[0.3em] flex items-center gap-3">
                            Strategic Forecast <ChevronRight className="w-3.5 h-3.5 text-[#6B6B6B]/40" />
                        </h4>

                        {result ? (
                            <div className="p-10 bg-[#FBF7EF] border border-[#E7DED1] rounded-[2.5rem] space-y-8 animate-in fade-in slide-in-from-right-4 duration-700">
                                <div className="space-y-4">
                                    <p className="text-2xl font-light text-[#141414] leading-tight tracking-tight italic">
                                        "{result.impactReport}"
                                    </p>
                                </div>

                                <div className="space-y-6 pt-8 border-t border-[#E7DED1]">
                                    <h5 className="text-[9px] font-bold text-[#141414] uppercase tracking-widest flex items-center gap-2">
                                        <TrendingDown className="w-3.5 h-3.5 text-red-500" /> Vulnerable Assets
                                    </h5>
                                    <div className="grid grid-cols-2 gap-4">
                                        {[1, 2].map(i => (
                                            <div key={i} className="p-4 bg-white border border-[#E7DED1] rounded-2xl space-y-2">
                                                <div className="aspect-square bg-[#FBF7EF] rounded-lg animate-pulse" />
                                                <div className="h-1 w-full bg-red-100 rounded-full" />
                                                <p className="text-[8px] font-bold text-red-400 uppercase tracking-widest text-center">90% Degradation</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="p-20 text-center border-2 border-dashed border-[#E7DED1] rounded-[3rem] opacity-40">
                                <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">Awaiting Simulation Results</p>
                            </div>
                        )}
                    </div>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-accent bg-accent/5 p-4 rounded-xl border border-accent/10">
                            <Zap className="w-4 h-4" />
                            <p className="text-[10px] font-bold uppercase tracking-widest">Proactive Pivot Recommendation Engine Enabled</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
