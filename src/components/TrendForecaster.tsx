'use client';

import { useState, useEffect } from 'react';
import { Eye, TrendingUp, Clock, Target, ArrowRight, Zap, Sparkles, Activity } from 'lucide-react';
import { TrendPrediction } from '@/lib/prediction_service';

export default function TrendForecaster() {
    const [predictions, setPredictions] = useState<TrendPrediction[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPredictions() {
            try {
                const res = await fetch('/api/predictions');
                const json = await res.json();
                setPredictions(json);
            } catch (err) {
                console.error("Failed to load trend predictions", err);
            } finally {
                setLoading(false);
            }
        }
        fetchPredictions();
    }, []);

    if (loading) return (
        <div className="h-[300px] flex flex-col items-center justify-center space-y-4 bg-white rounded-[3rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.02)]">
            <div className="w-10 h-10 border-2 border-accent border-t-transparent rounded-full animate-spin" />
            <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em] animate-pulse">Calculating Aesthetic Trajectories...</p>
        </div>
    );

    if (!Array.isArray(predictions) || predictions.length === 0) return null;

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-8 border-b border-[#E7DED1]">
                <div>
                    <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                        <Eye className="w-3.5 h-3.5" /> Predictive Oracle v1.0
                    </h3>
                    <h2 className="text-5xl font-light text-[#141414] tracking-tightest uppercase leading-none">
                        Autonomous<br />
                        <span className="text-[#6B6B6B]/30 whitespace-nowrap">Trend Forecasting</span>
                    </h2>
                </div>
                <div className="hidden md:block text-right">
                    <p className="text-[10px] font-bold text-[#141414] uppercase tracking-widest mb-1">Intelligence Confidence</p>
                    <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map(i => (
                            <div key={i} className={`h-1 w-6 rounded-full ${i <= 4 ? 'bg-accent' : 'bg-[#E7DED1]'}`} />
                        ))}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {predictions.map((p, idx) => (
                    <div key={idx} className="group relative">
                        {/* Projection Card */}
                        <div className="bg-white border border-[#E7DED1] rounded-[3rem] p-12 transition-all hover:shadow-[0_40px_120px_rgba(20,20,20,0.05)] space-y-10 overflow-hidden">
                            {/* Accent Glow */}
                            <div className="absolute top-0 right-0 p-12 opacity-0 group-hover:opacity-5 transition-opacity">
                                <Sparkles className="w-48 h-48 text-accent" />
                            </div>

                            <div className="relative z-10 flex items-start justify-between">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-3">
                                        <TrendingUp className="w-4 h-4 text-accent" />
                                        <span className="text-[10px] font-bold text-accent uppercase tracking-widest">Emerging Pivot</span>
                                    </div>
                                    <h3 className="text-3xl font-light text-[#141414] tracking-tightest uppercase">{p.title}</h3>
                                </div>
                                <div className="text-right">
                                    <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1">Est. Exhaustion</p>
                                    <div className="flex items-center gap-2 text-[#141414]">
                                        <Clock className="w-3.5 h-3.5 opacity-40" />
                                        <span className="text-[12px] font-mono font-bold tracking-tight">
                                            {Math.ceil((new Date(p.exhaustionDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} Days
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="relative z-10 text-[16px] text-[#141414] font-light leading-relaxed">
                                {p.description}
                            </p>

                            <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-8 pt-8 border-t border-[#E7DED1]">
                                <div className="space-y-4">
                                    <h4 className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest flex items-center gap-2">
                                        <Target className="w-3 h-3" /> Predicted DNA Shift
                                    </h4>
                                    <div className="space-y-2">
                                        {Object.entries(p.projectedDNA).slice(0, 3).map(([key, val]: [string, any]) => (
                                            <div key={key} className="space-y-1">
                                                <div className="flex justify-between text-[8px] font-bold uppercase tracking-widest">
                                                    <span>{key}</span>
                                                    <span>{Math.round(val * 100)}%</span>
                                                </div>
                                                <div className="h-1 w-full bg-[#FBF7EF] rounded-full overflow-hidden">
                                                    <div className="h-full bg-accent/40" style={{ width: `${val * 100}%` }} />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-[#141414] text-[#FBF7EF] p-6 rounded-2xl space-y-3">
                                    <p className="text-[8px] font-bold uppercase tracking-[0.2em] opacity-40">Counter-Trend Direction</p>
                                    <h5 className="text-[14px] font-bold uppercase tracking-widest text-accent leading-tight">{p.counterTrend}</h5>
                                    <div className="flex items-center gap-2 pt-2">
                                        <Activity className="w-3 h-3 text-accent" />
                                        <span className="text-[9px] font-bold uppercase tracking-widest opacity-60">High-Velocity Pivot</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Interactive Trigger (Absolute positioned) */}
                        <div className="absolute -bottom-4 right-12">
                            <button className="bg-[#141414] text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-accent hover:scale-110 transition-all shadow-xl group/btn">
                                <ArrowRight className="w-6 h-6 group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                ))}

                {/* System Insight Sidebar */}
                <div className="space-y-8">
                    <div className="p-10 bg-[#FBF7EF] border border-[#E7DED1] rounded-[3rem] space-y-8">
                        <header className="flex items-center justify-between">
                            <h4 className="text-[10px] font-bold text-[#141414] uppercase tracking-[0.3em]">Forecasting Health</h4>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                                <span className="text-[8px] font-bold uppercase tracking-widest text-green-600">Active</span>
                            </div>
                        </header>

                        <div className="space-y-6">
                            <p className="text-[13px] text-[#141414] font-light leading-relaxed">
                                Our autonomous engine is currently mapping <span className="font-bold underline decoration-accent/30 decoration-2">12,400+ competitive data points</span> across the Global Mesh.
                            </p>
                            <div className="flex items-center gap-4 p-4 bg-white border border-[#E7DED1] rounded-xl">
                                <Zap className="w-4 h-4 text-accent" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#141414]">New Aesthetic Pivot detected in 'Luxury' cluster.</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-10 bg-accent rounded-[3rem] text-[#FBF7EF] relative overflow-hidden group">
                        <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-110 transition-transform">
                            <Sparkles className="w-32 h-32" />
                        </div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] mb-4 opacity-60">Strategic Tip</p>
                        <p className="text-[18px] font-light italic leading-tight">
                            "The most resilient brands are those that begin their counter-trend pivot 60 days before categorical exhaustion."
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
