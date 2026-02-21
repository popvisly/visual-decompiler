'use client';

import { useState, useEffect } from 'react';
import { Globe, TrendingUp, Zap, Search, Loader2, Sparkles, Activity } from 'lucide-react';

interface StrategicPattern {
    category: string;
    trigger_mechanic: string;
    narrative_framework: string;
    claim_type: string;
    occurrence_count: number;
    avg_confidence: number;
}

export default function DiscoveryPage() {
    const [patterns, setPatterns] = useState<StrategicPattern[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState('');

    useEffect(() => {
        const fetchDiscovery = async () => {
            try {
                const res = await fetch('/api/discovery');
                const data = await res.json();
                setPatterns(data.patterns || []);
            } catch (err) {
                console.error('Discovery failed:', err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchDiscovery();
    }, []);

    const filteredPatterns = patterns.filter(p =>
        p.category?.toLowerCase().includes(filter.toLowerCase()) ||
        p.trigger_mechanic?.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-12 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E7DED1]">
                <div>
                    <h2 className="text-5xl font-light text-[#141414] tracking-tighter uppercase leading-[0.9]">Global Discovery</h2>
                    <p className="text-[10px] text-[#6B6B6B] mt-3 font-bold tracking-[0.2em] uppercase">Pan-Industry Strategic Intelligence</p>
                </div>
                <div className="flex bg-white border border-[#E7DED1] rounded-2xl items-center px-4 py-2 group focus-within:border-accent transition-all shadow-sm">
                    <Search className="w-4 h-4 text-[#6B6B6B]" />
                    <input
                        type="text"
                        placeholder="Search categories or triggers..."
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                        className="bg-transparent border-none text-[10px] font-bold uppercase tracking-widest px-3 focus:ring-0 placeholder:text-[#6B6B6B]/40"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-40 space-y-4">
                    <Loader2 className="w-10 h-10 text-accent animate-spin" />
                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest animate-pulse">Aggregating global patterns...</p>
                </div>
            ) : filteredPatterns.length > 0 ? (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Live Heatmap Feed */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filteredPatterns.slice(0, 8).map((p, i) => (
                                <div key={i} className="bg-white p-8 rounded-[2rem] border border-[#E7DED1] shadow-[0_10px_40px_rgba(20,20,20,0.03)] hover:border-accent transition-all group">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="p-2 bg-[#FBF7EF] rounded-xl border border-[#E7DED1]">
                                            <Zap className="w-4 h-4 text-accent" />
                                        </div>
                                        <span className="text-[8px] font-mono text-[#6B6B6B] bg-[#FBF7EF] px-2 py-1 rounded-full uppercase">
                                            n={p.occurrence_count}
                                        </span>
                                    </div>
                                    <p className="text-[8px] font-bold text-accent uppercase tracking-[0.2em] mb-1">{p.category || 'Mixed Vertical'}</p>
                                    <h4 className="text-lg font-light text-[#141414] uppercase tracking-tight mb-4 leading-tight group-hover:text-accent transition-colors">
                                        {p.trigger_mechanic?.replace('_', ' ')} x {p.narrative_framework?.replace('_', ' ')}
                                    </h4>
                                    <div className="flex items-center gap-4 pt-4 border-t border-[#E7DED1]">
                                        <div>
                                            <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-0.5">Confidence</p>
                                            <p className="text-xs font-bold text-[#141414]">{Math.round(p.avg_confidence * 100)}%</p>
                                        </div>
                                        <div>
                                            <p className="text-[8px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-0.5">Claim Style</p>
                                            <p className="text-xs font-bold text-[#141414]">{p.claim_type || 'N/A'}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Discovery Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-[#141414] p-8 rounded-[2rem] text-white">
                            <Globe className="w-8 h-8 text-blue-400 mb-6" />
                            <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Observation Pool</p>
                            <h4 className="text-4xl font-light uppercase tracking-tighter">Anonymized</h4>
                            <p className="text-xs text-white/50 mt-2leading-relaxed">
                                This feed aggregates strategic signals across the entire platform while strictly enforcing brand anonymity.
                            </p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-[#E7DED1]">
                            <div className="flex items-center gap-3 mb-6">
                                <Sparkles className="w-5 h-5 text-accent" />
                                <h4 className="text-[10px] font-bold text-[#141414] uppercase tracking-widest">Macro Trends</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-[#FBF7EF] rounded-xl border border-[#E7DED1]">
                                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-tight mb-1">Global Velocity</p>
                                    <p className="text-xs font-medium text-[#141414]">72 New patterns detected today</p>
                                </div>
                                <div className="p-4 bg-[#FBF7EF] rounded-xl border border-[#E7DED1]">
                                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-tight mb-1">Rising Tactical Framework</p>
                                    <p className="text-xs font-medium text-[#141414]">Absurdist Pattern Interrupt</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-40 bg-white/50 rounded-3xl border border-dashed border-[#E7DED1]">
                    <Globe className="w-12 h-12 text-[#6B6B6B] mx-auto mb-4 opacity-20" />
                    <p className="text-[#6B6B6B] font-medium">No global strategic patterns found yet.</p>
                </div>
            )}
        </div>
    );
}
