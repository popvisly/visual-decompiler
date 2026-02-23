'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { TrendingUp, TrendingDown, Loader2 } from 'lucide-react';

export default function TrendRadar({ category, days = 30, top = 6 }: { category?: string; days?: number; top?: number }) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let cancelled = false;
        const run = async () => {
            setLoading(true);
            try {
                const url = `/api/analytics/radar?days=${days}&top=${top}${category ? `&category=${encodeURIComponent(category)}` : ''}`;
                const res = await fetch(url);
                const json = await res.json();
                if (!cancelled) setData(json);
            } catch (e) {
                console.error('TrendRadar failed', e);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        run();
        return () => {
            cancelled = true;
        };
    }, [category, days, top]);

    if (loading) {
        return (
            <div className="h-[260px] flex items-center justify-center bg-white rounded-[3rem] border border-[#E7DED1] border-dashed">
                <Loader2 className="w-6 h-6 animate-spin text-accent/40" />
            </div>
        );
    }

    if (!data?.radar || data.sampleSize === 0) {
        return (
            <div className="h-[260px] flex items-center justify-center bg-white/50 rounded-[3rem] border border-[#E7DED1] border-dashed">
                <p className="text-[11px] text-[#6B6B6B] font-bold uppercase tracking-widest">No radar data</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-10 md:p-12 rounded-[3rem] border border-[#E7DED1] shadow-xl shadow-black/[0.02] space-y-10">
            <div className="flex items-end justify-between gap-6">
                <div>
                    <p className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em]">Trend Radar</p>
                    <p className="text-[12px] text-[#6B6B6B] mt-2">Rising vs falling attribute signals (last {days} days)</p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest">Sample</p>
                    <p className="text-[22px] font-light text-[#141414] font-mono">{data.sampleSize}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {data.radar.map((block: any) => (
                    <div key={block.field} className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#141414]">{block.label}</h4>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-2xl border border-[#E7DED1] bg-[#FBF7EF]">
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingUp className="w-4 h-4 text-green-600" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B]">Rising</span>
                                </div>
                                <div className="space-y-2">
                                    {(block.rising || []).slice(0, 5).map((it: any) => (
                                        <div key={it.value} className="flex items-center justify-between gap-3">
                                            <span className="text-[11px] font-bold text-[#141414] truncate">{String(it.value).replace(/_/g, ' ')}</span>
                                            <span className="text-[10px] font-mono font-bold text-green-700">+{it.shift}%</span>
                                        </div>
                                    ))}
                                    {(!block.rising || block.rising.length === 0) && (
                                        <p className="text-[10px] text-[#6B6B6B]/70 italic">No rising signals</p>
                                    )}
                                </div>
                            </div>

                            <div className="p-5 rounded-2xl border border-[#E7DED1] bg-[#FBF7EF]">
                                <div className="flex items-center gap-2 mb-3">
                                    <TrendingDown className="w-4 h-4 text-red-600" />
                                    <span className="text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B]">Falling</span>
                                </div>
                                <div className="space-y-2">
                                    {(block.falling || []).slice(0, 5).map((it: any) => (
                                        <div key={it.value} className="flex items-center justify-between gap-3">
                                            <span className="text-[11px] font-bold text-[#141414] truncate">{String(it.value).replace(/_/g, ' ')}</span>
                                            <span className="text-[10px] font-mono font-bold text-red-700">{it.shift}%</span>
                                        </div>
                                    ))}
                                    {(!block.falling || block.falling.length === 0) && (
                                        <p className="text-[10px] text-[#6B6B6B]/70 italic">No falling signals</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Exemplars (rising only, top 1) */}
                        {block.rising && block.rising[0]?.exemplarsRecent?.length > 0 && (
                            <div className="pt-2">
                                <p className="text-[9px] font-bold uppercase tracking-widest text-[#6B6B6B] mb-2">Recent exemplars</p>
                                <div className="flex flex-wrap gap-3">
                                    {block.rising[0].exemplarsRecent.slice(0, 6).map((ex: any) => (
                                        <Link
                                            key={ex.id}
                                            href={`/dashboard/${ex.id}`}
                                            className="group flex items-center gap-2 rounded-2xl bg-white border border-[#E7DED1] hover:border-[#141414] transition-colors p-2"
                                            title="Open ad"
                                        >
                                            <div className="w-10 h-10 rounded-xl overflow-hidden bg-[#FBF7EF] border border-[#E7DED1] shrink-0">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img src={ex.media_url} alt="" className="w-full h-full object-cover" />
                                            </div>
                                            <div className="leading-none">
                                                <div className="text-[10px] font-bold text-[#6B6B6B] group-hover:text-[#141414] uppercase tracking-widest">View</div>
                                                <div className="text-[9px] font-mono text-[#6B6B6B]/50">{String(ex.id).slice(0, 6)}…</div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
