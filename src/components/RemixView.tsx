'use client';

import { useState } from 'react';
import { Loader2, Sparkles, Wand2, RefreshCw } from 'lucide-react';
import { AdDigest } from '@/types/digest';

interface Remix {
    angleName: string;
    headline: string;
    strategicLogic: string;
    visualSceneDescription: string;
}

export default function RemixView({ digest, adId }: { digest: AdDigest; adId: string }) {
    const [isRemixing, setIsRemixing] = useState(false);
    const [remixes, setRemixes] = useState<Remix[]>([]);
    const [error, setError] = useState<string | null>(null);

    const handleRemix = async () => {
        setIsRemixing(true);
        setError(null);
        try {
            const res = await fetch('/api/remix', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ digest, adId }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || 'Remix failed');

            // Handle different JSON structures from LLM
            const list = Array.isArray(data.remixes) ? data.remixes : data.remixes?.remixes || [];
            setRemixes(list);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsRemixing(false);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-[#E7DED1] pb-6">
                <div>
                    <h3 className="text-xl font-light text-[#141414] tracking-tight uppercase">Strategy Remix Engine</h3>
                    <p className="text-[10px] text-[#6B6B6B] font-bold tracking-widest uppercase mt-1">AI Creative Director • 3 Variants</p>
                </div>
                <button
                    onClick={handleRemix}
                    disabled={isRemixing}
                    className="flex items-center gap-2 bg-[#141414] text-[#FBF7EF] px-6 py-2.5 rounded-xl text-xs font-bold shadow-[0_12px_24px_rgba(20,20,20,0.15)] hover:-translate-y-0.5 transition-all disabled:opacity-50"
                >
                    {isRemixing ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                    {remixes.length > 0 ? 'Regenerate' : 'Remix Strategy'}
                </button>
            </div>

            {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-100 italic">
                    {error}
                </div>
            )}

            {isRemixing && (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in zoom-in duration-500">
                    <div className="relative">
                        <div className="w-12 h-12 border-2 border-[#141414]/10 border-t-[#141414] rounded-full animate-spin" />
                        <Wand2 className="w-4 h-4 text-[#141414] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-[#141414]">Consulting Creative Director...</p>
                        <p className="text-[10px] text-[#6B6B6B] font-bold uppercase tracking-widest mt-1">Remixing strategic anchors</p>
                    </div>
                </div>
            )}

            {remixes.length > 0 && !isRemixing && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-700">
                    {remixes.map((remix, i) => (
                        <div key={i} className="bg-white p-6 rounded-2xl border border-[#E7DED1] shadow-[0_8px_30px_rgba(20,20,20,0.03)] flex flex-col gap-4 group hover:border-[#141414]/20 transition-all">
                            <div className="flex items-center justify-between">
                                <span className="bg-[#141414] text-[#FBF7EF] text-[8px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Variant {i + 1}</span>
                                <TrendingUp className="w-3.5 h-3.5 text-[#141414]/20 group-hover:text-[#141414]/100 transition-colors" />
                            </div>

                            <div>
                                <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-[0.15em] mb-1">{remix.angleName || 'New Angle'}</p>
                                <h4 className="text-[15px] font-medium text-[#141414] leading-tight line-clamp-2">{remix.headline}</h4>
                            </div>

                            <div className="space-y-3 pt-3 border-t border-[#E7DED1]">
                                <div>
                                    <p className="text-[8px] font-bold text-[#141414]/40 uppercase tracking-widest mb-1.5">Strategic Logic</p>
                                    <p className="text-[11px] text-[#6B6B6B] leading-relaxed">{remix.strategicLogic}</p>
                                </div>
                                <div>
                                    <p className="text-[8px] font-bold text-[#141414]/40 uppercase tracking-widest mb-1.5">Visual Scene</p>
                                    <p className="text-[11px] text-[#141414] leading-relaxed italic">"{remix.visualSceneDescription}"</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function TrendingUp(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
            <polyline points="16 7 22 7 22 13" />
        </svg>
    )
}
