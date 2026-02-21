'use client';

import { useState, useEffect } from 'react';
import { Activity, Zap, TrendingUp, Search, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import TrendMap from '@/components/TrendMap';

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
        <div className="space-y-12 py-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E7DED1]">
                <div>
                    <h2 className="text-5xl font-light text-[#141414] tracking-tighter uppercase leading-[0.9]">Strategic Pulse</h2>
                    <p className="text-[10px] text-[#6B6B6B] mt-3 font-bold tracking-[0.2em] uppercase">Weekly Competitive Synthesis</p>
                </div>
                <button
                    onClick={fetchPulse}
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 py-2.5 bg-[#141414] text-accent rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-[#141414]/90 transition-all shadow-lg shadow-accent/5 disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
                    Run Live Pulse
                </button>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-40 space-y-4">
                    <Loader2 className="w-10 h-10 text-accent animate-spin" />
                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest animate-pulse">Deconstructing the strategy forest...</p>
                </div>
            ) : pulse?.report ? (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Main Report */}
                    <div className="lg:col-span-3 space-y-12">
                        <div className="bg-white p-12 rounded-[2rem] border border-[#E7DED1] shadow-[0_20px_60px_rgba(20,20,20,0.03)] relative overflow-hidden group">
                            <div className="absolute top-0 left-0 w-1 h-full bg-accent opacity-20 group-hover:opacity-100 transition-opacity" />
                            <div className="flex items-center gap-2 mb-10">
                                <Sparkles className="w-5 h-5 text-accent" />
                                <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">Macro Trends Analysis</span>
                            </div>
                            <div className="prose prose-sm max-w-none text-[#6B6B6B] prose-headings:text-[#141414] prose-headings:font-light prose-headings:uppercase prose-headings:tracking-tight prose-strong:text-[#141414] prose-strong:font-bold prose-code:text-accent">
                                <ReactMarkdown>{pulse.report}</ReactMarkdown>
                            </div>
                        </div>

                        {/* Trend Section */}
                        <div className="space-y-6">
                            <div className="flex items-center justify-between px-2">
                                <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">Industry Deep-Dive</p>
                                <select
                                    className="bg-white border border-[#E7DED1] rounded-xl px-4 py-2 text-[10px] font-bold uppercase tracking-widest focus:outline-none focus:border-accent"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    {categories.map(c => (
                                        <option key={c} value={c}>{c}</option>
                                    ))}
                                </select>
                            </div>

                            {isTrendsLoading ? (
                                <div className="h-[300px] flex items-center justify-center bg-white rounded-[2rem] border border-[#E7DED1] border-dashed">
                                    <Loader2 className="w-5 h-5 animate-spin text-accent" />
                                </div>
                            ) : trends ? (
                                <TrendMap data={trends} category={selectedCategory} />
                            ) : (
                                <div className="h-[300px] flex items-center justify-center bg-white/50 rounded-[2rem] border border-[#E7DED1] border-dashed">
                                    <p className="text-[10px] text-[#6B6B6B] font-bold uppercase">No trend data for {selectedCategory}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Stats Sidebar */}
                    <div className="space-y-6">
                        <div className="bg-[#141414] p-8 rounded-[2rem] text-white">
                            <TrendingUp className="w-8 h-8 text-accent mb-6" />
                            <p className="text-[10px] font-bold text-accent uppercase tracking-widest mb-1">Volume</p>
                            <h4 className="text-4xl font-light uppercase tracking-tighter">{pulse.adCount}</h4>
                            <p className="text-xs text-white/50 mt-2">New ads ingested this week</p>
                        </div>

                        <div className="bg-white p-8 rounded-[2rem] border border-[#E7DED1]">
                            <div className="flex items-center gap-3 mb-6">
                                <Zap className="w-5 h-5 text-accent" />
                                <h4 className="text-[10px] font-bold text-[#141414] uppercase tracking-widest">Quick Insights</h4>
                            </div>
                            <div className="space-y-4">
                                <div className="p-4 bg-[#FBF7EF] rounded-xl border border-[#E7DED1]">
                                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-tight mb-1">Analysis Window</p>
                                    <p className="text-sm font-medium text-[#141414]">Past 7 Days</p>
                                </div>
                                <div className="p-4 bg-[#FBF7EF] rounded-xl border border-[#E7DED1]">
                                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-tight mb-1">Status</p>
                                    <p className="text-sm font-medium text-[#141414]">Synthesis Complete</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-40 bg-white/50 rounded-3xl border border-dashed border-[#E7DED1]">
                    <Search className="w-12 h-12 text-[#6B6B6B] mx-auto mb-4 opacity-20" />
                    <p className="text-[#6B6B6B] font-medium">No strategic data available for pulse synthesis this week.</p>
                </div>
            )}
        </div>
    );
}
