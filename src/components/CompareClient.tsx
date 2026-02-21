'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ComparisonData } from '@/lib/analytics';
import { ArrowRight, Search, BarChart3, TrendingUp } from 'lucide-react';

export default function CompareClient({ data, allBrands }: { data: ComparisonData | null, allBrands: { name: string; count: number }[] }) {
    const router = useRouter();
    const [brandA, setBrandA] = useState(data?.brandA.name || '');
    const [brandB, setBrandB] = useState(data?.brandB.name || '');

    const handleCompare = () => {
        if (brandA && brandB) {
            router.push(`/dashboard/compare?brandA=${encodeURIComponent(brandA)}&brandB=${encodeURIComponent(brandB)}`);
        }
    };

    return (
        <div className="space-y-12">
            {/* Selection Bar */}
            <div className="bg-white p-6 rounded-3xl border border-[#E7DED1] shadow-[0_10px_40px_rgba(20,20,20,0.02)]">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex-1 w-full space-y-1.5">
                        <label className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.15em] ml-2">Primary Brand</label>
                        <select
                            value={brandA}
                            onChange={(e) => setBrandA(e.target.value)}
                            className="w-full px-4 py-3 bg-[#FBF7EF] border border-[#E7DED1] rounded-2xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#141414] transition-all"
                        >
                            <option value="">Select Brand A...</option>
                            {allBrands.map(b => <option key={b.name} value={b.name}>{b.name} ({b.count})</option>)}
                        </select>
                    </div>

                    <div className="shrink-0 text-[#E7DED1]">
                        <ArrowRight className="w-5 h-5" />
                    </div>

                    <div className="flex-1 w-full space-y-1.5">
                        <label className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.15em] ml-2">Competitor</label>
                        <select
                            value={brandB}
                            onChange={(e) => setBrandB(e.target.value)}
                            className="w-full px-4 py-3 bg-[#FBF7EF] border border-[#E7DED1] rounded-2xl text-sm font-medium focus:outline-none focus:ring-1 focus:ring-[#141414] transition-all"
                        >
                            <option value="">Select Brand B...</option>
                            {allBrands.map(b => <option key={b.name} value={b.name}>{b.name} ({b.count})</option>)}
                        </select>
                    </div>

                    <button
                        onClick={handleCompare}
                        disabled={!brandA || !brandB || brandA === brandB}
                        className="h-[52px] px-8 bg-[#141414] text-[#FBF7EF] rounded-2xl text-sm font-bold shadow-[0_12px_24px_rgba(20,20,20,0.15)] hover:-translate-y-0.5 transition-all disabled:opacity-30 self-end"
                    >
                        Analyze Gap
                    </button>
                </div>
            </div>

            {data ? (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                    {/* Brand A Column */}
                    <div className="space-y-8">
                        <div className="pb-6 border-b border-[#E7DED1]">
                            <h2 className="text-4xl font-light text-[#141414] tracking-tighter uppercase mb-2">{data.brandA.name}</h2>
                            <p className="text-[10px] text-[#6B6B6B] font-bold tracking-[0.2em] uppercase">Primary Index · {data.brandA.total} Ads</p>
                        </div>

                        <div className="space-y-6">
                            {data.dimensions.map(dim => (
                                <DimensionCard key={dim} label={dim} items={data.brandA.stats[dim]} total={data.brandA.total} />
                            ))}
                        </div>
                    </div>

                    {/* Brand B Column */}
                    <div className="space-y-8">
                        <div className="pb-6 border-b border-[#E7DED1]">
                            <h2 className="text-4xl font-light text-[#141414] tracking-tighter uppercase mb-2">{data.brandB.name}</h2>
                            <p className="text-[10px] text-[#6B6B6B] font-bold tracking-[0.2em] uppercase">Competitor Index · {data.brandB.total} Ads</p>
                        </div>

                        <div className="space-y-6">
                            {data.dimensions.map(dim => (
                                <DimensionCard key={dim} label={dim} items={data.brandB.stats[dim]} total={data.brandB.total} />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="py-32 flex flex-col items-center justify-center text-center opacity-30">
                    <BarChart3 className="w-12 h-12 mb-4" />
                    <p className="text-sm font-medium">Select two competing brands to visualize strategic convergence.</p>
                </div>
            )}
        </div>
    );
}

function DimensionCard({ label, items, total }: { label: string, items: { label: string, count: number }[], total: number }) {
    const maxCount = items.length > 0 ? items[0].count : 0;
    return (
        <div className="bg-white p-6 rounded-2xl border border-[#E7DED1] shadow-[0_4px_12px_rgba(20,20,20,0.01)]">
            <h3 className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-5">{label.replace(/_/g, ' ')}</h3>
            <div className="space-y-4">
                {items.slice(0, 3).map(item => (
                    <div key={item.label}>
                        <div className="flex justify-between text-[11px] font-medium text-[#6B6B6B] mb-1.5">
                            <span className="capitalize">{item.label.replace(/_/g, ' ')}</span>
                            <span className="text-[#141414] font-semibold">{Math.round((item.count / total) * 100)}%</span>
                        </div>
                        <div className="h-1 w-full bg-[#141414]/5 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-[#141414] rounded-full"
                                style={{ width: `${(item.count / total) * 100}%` }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
