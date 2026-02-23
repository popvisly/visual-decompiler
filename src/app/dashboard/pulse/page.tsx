'use client';

import { useState, useEffect } from 'react';
import { Activity, Zap, TrendingUp, Search, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import TrendMap from '@/components/TrendMap';
import TrendRadar from '@/components/TrendRadar';

export default function PulsePage() {
    const [pulse, setPulse] = useState<any>(null);
    const [trends, setTrends] = useState<any>(null);
    const [categories, setCategories] = useState<string[]>([]);
    const [selectedCategory, setSelectedCategory] = useState<string>('E-commerce');
    const [isLoading, setIsLoading] = useState(true);
    const [isTrendsLoading, setIsTrendsLoading] = useState(false);

    const fetchCategories = async () => {
        try {
            const res = await fetch('/api/categories');
            const data = await res.json();
            if (data.categories) {
                setCategories(data.categories);
                if (data.categories.length > 0 && !data.categories.includes(selectedCategory)) {
                    setSelectedCategory(data.categories[0]);
                }
            }
        } catch (err) {
            console.error('Failed to fetch categories:', err);
        }
    };

    const fetchTrends = async (cat: string) => {
        setIsTrendsLoading(true);
        try {
            const trendRes = await fetch(`/api/analytics/trends?category=${encodeURIComponent(cat)}&days=30`);
            const trendData = await trendRes.json();
            if (trendData.trends) setTrends(trendData.trends);
            if (trendData.surge) setPulse((prev: any) => ({ ...prev, currentSurge: trendData.surge }));
        } catch (err) {
            console.error('Trends failed:', err);
        } finally {
            setIsTrendsLoading(false);
        }
    };

    const fetchPulse = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/cron/pulse');
            const data = await res.json();
            setPulse(data);
            await fetchCategories();
        } catch (err) {
            console.error('Pulse failed:', err);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPulse();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            fetchTrends(selectedCategory);
        }
    }, [selectedCategory, isLoading]);

    return (
        <div className="space-y-16 py-12">
            {/* Header - Editorial Style */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-[#E7DED1]">
                <div>
                    <h2 className="text-7xl font-light text-[#141414] tracking-tightest uppercase leading-[0.85] select-none">
                        Strategic<br />
                        <span className="text-[#6B6B6B]/30">Pulse</span>
                    </h2>
                    <p className="text-[12px] text-[#6B6B6B] mt-6 font-bold tracking-[0.3em] uppercase">Weekly Competitive Synthesis / Market Forecast</p>
                </div>
                <button
                    onClick={fetchPulse}
                    disabled={isLoading}
                    className="
                        flex items-center gap-3 px-8 py-4 
                        bg-[#141414] text-[#FBF7EF] 
                        rounded-full text-[11px] font-bold uppercase tracking-widest 
                        hover:bg-black transition-all shadow-2xl shadow-black/10 
                        disabled:opacity-50 active:scale-95
                    "
                >
                    <RefreshCw className={`w-4 h-4 text-accent ${isLoading ? 'animate-spin' : ''}`} />
                    {isLoading ? 'Synthesizing...' : 'Run Live Pulse'}
                </button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-40 space-y-8">
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                    </div>
                    <p className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] animate-pulse">Deconstructing the strategy forest...</p>
                </div>
            ) : pulse?.report ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
                    {/* Main Report */}
                    <div className="lg:col-span-3 space-y-16">
                        <div className="bg-white p-12 md:p-16 rounded-[3rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)] relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1.5 h-full bg-accent opacity-20 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-3 mb-12">
                                <Sparkles className="w-5 h-5 text-accent" />
                                <span className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">Macro Intelligence Synthesis</span>
                            </div>
                            <div className="prose prose-lg max-w-none text-[#141414]/70 prose-headings:text-[#141414] prose-headings:font-light prose-headings:uppercase prose-headings:tracking-tight prose-strong:text-[#141414] prose-strong:font-bold prose-code:text-accent prose-li:marker:text-accent">
                                <ReactMarkdown>{pulse.report}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Trend Section */}
                        <div className="space-y-10">
                            <div className="flex items-center justify-between px-4">
                                <p className="text-[12px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">Industry Pivot Analysis</p>
                                <select
                                    className="bg-white border border-[#E7DED1] rounded-2xl px-6 py-3 text-[11px] font-bold uppercase tracking-widest focus:outline-none focus:border-accent transition-all shadow-sm hover:border-[#BB9E7B]"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            {isTrendsLoading ? (
                                <div className="h-[400px] flex items-center justify-center bg-white rounded-[3rem] border border-[#E7DED1] border-dashed">
                                    <Loader2 className="w-6 h-6 animate-spin text-accent/40" />
                                </div>
                            ) : trends ? (
                                <TrendMap data={trends} category={selectedCategory} surge={pulse.currentSurge} />
                            ) : (
                                <div className="h-[400px] flex items-center justify-center bg-white/50 rounded-[3rem] border border-[#E7DED1] border-dashed">
                                    <p className="text-[11px] text-[#6B6B6B] font-bold uppercase tracking-widest">No trend data for {selectedCategory}</p>
                                </div>
                            )}

                            <TrendRadar category={selectedCategory} days={30} />
                        </div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="space-y-8">
                        <div className="bg-[#141414] p-10 rounded-[3rem] text-white shadow-2xl shadow-black/20">
                            <TrendingUp className="w-10 h-10 text-accent mb-8" />
                            <p className="text-[11px] font-bold text-accent uppercase tracking-[0.3em] mb-2 opacity-80">Volume</p>
                            <h4 className="text-6xl font-light uppercase tracking-tightest leading-none">{pulse.adCount}</h4>
                            <p className="text-sm text-white/40 mt-4 leading-relaxed">Strategic inputs ingested and deconstructed this period.</p>
                        </div>

                        <div className="bg-white p-10 rounded-[3rem] border border-[#E7DED1] shadow-xl shadow-black/[0.02]">
                            <div className="flex items-center gap-4 mb-8">
                                <Zap className="w-5 h-5 text-accent" />
                                <h4 className="text-[12px] font-bold text-[#141414] uppercase tracking-[0.2em]">Contextual Logic</h4>
                            </div>
                            <div className="space-y-6">
                                <div className="p-6 bg-[#FBF7EF] rounded-2xl border border-[#E7DED1]">
                                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-2">Synthesis Window</p>
                                    <p className="text-md font-medium text-[#141414]">Past 7 Days</p>
                                </div>
                                <div className="p-6 bg-[#FBF7EF] rounded-2xl border border-[#E7DED1]">
                                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-2">Detected Anomalies</p>
                                    <p className="text-md font-medium text-[#141414]">{pulse.anomaliesDetected || 0} Strategic Pivots</p>
                                </div>
                                {pulse.surges && pulse.surges.length > 0 && (
                                    <div className="p-6 bg-accent/5 rounded-2xl border border-accent/20">
                                        <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-3">Macro Surges</p>
                                        <div className="space-y-3">
                                            {pulse.surges.map((s: any, i: number) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <span className="text-[11px] font-bold text-[#141414] uppercase">{s.name}</span>
                                                    <span className="text-[11px] font-mono font-bold text-accent">+{s.increase}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-48 bg-white/50 rounded-[3rem] border border-dashed border-[#E7DED1]">
                    <Search className="w-16 h-16 text-[#6B6B6B] mx-auto mb-8 opacity-10" />
                    <p className="text-[#6B6B6B] font-bold uppercase tracking-[0.2em] text-[12px]">No strategic data available</p>
                </div>
            )}
        </div>
    );
}
