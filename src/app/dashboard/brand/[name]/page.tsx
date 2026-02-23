import { Suspense } from 'react';
import AdList from '@/components/AdList';
import { getBrandStats } from '@/lib/brands';
import { Loader2 } from 'lucide-react';
import { auth } from '@clerk/nextjs/server';
import Sidebar from '@/components/Sidebar';

export default async function BrandProfilePage({
    params,
}: {
    params: Promise<{ name: string }>;
}) {
    const { name: encodedName } = await params;
    const name = decodeURIComponent(encodedName);
    const { userId, orgId } = await auth();
    if (!userId) return null;

    const stats = await getBrandStats(name, userId, orgId);

    if (stats.totalAds === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#E7DED1] shadow-[0_10px_40px_rgba(20,20,20,0.02)]">
                <p className="text-[#6B6B6B] font-medium text-sm">No data found for brand: {name}</p>
            </div>
        );
    }

    const dimensions = [
        { key: 'trigger_mechanic', label: 'Trigger Mechanics' },
        { key: 'claim_type', label: 'Claim Types' },
        { key: 'offer_type', label: 'Offer Types' },
    ];

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 w-full relative z-20">
            <Sidebar searchParams={{ brand: name }} />
            <div className="flex-1 space-y-12">
                {/* Brand Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-[#E7DED1]">
                    <div>
                        <h2 className="text-5xl font-light text-[#141414] tracking-tighter uppercase leading-[0.9]">{name}</h2>
                        <p className="text-[10px] text-[#6B6B6B] mt-3 font-bold tracking-[0.2em] uppercase">Competitor Intelligence Profile</p>
                    </div>
                    <div className="flex gap-4">
                        <div className="bg-white p-5 rounded-2xl border border-[#E7DED1] min-w-[120px] shadow-[0_4px_12px_rgba(20,20,20,0.02)]">
                            <p className="text-[#6B6B6B] text-[9px] font-bold uppercase tracking-[0.15em] mb-1">Scale</p>
                            <p className="text-2xl font-light text-[#141414]">{stats.totalAds} <span className="text-[10px] text-[#6B6B6B] font-bold tracking-widest">ADS</span></p>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border border-[#E7DED1] min-w-[120px] shadow-[0_4px_12px_rgba(20,20,20,0.02)]">
                            <p className="text-[#6B6B6B] text-[9px] font-bold uppercase tracking-[0.15em] mb-1">Avg Confidence</p>
                            <p className="text-2xl font-light text-[#141414]">{(stats.avgConfidence || 0).toLocaleString(undefined, { style: 'percent' })}</p>
                        </div>
                    </div>
                </div>

                {/* Strategic Insights */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {dimensions.map(dim => {
                        const items = stats.dimensions[dim.key] || [];
                        const maxCount = items.length > 0 ? items[0].count : 0;

                        return (
                            <div key={dim.key} className="bg-white p-6 rounded-2xl border border-[#E7DED1] shadow-[0_8px_30px_rgba(20,20,20,0.03)]">
                                <h3 className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-5 flex items-center justify-between">
                                    {dim.label}
                                    <span className="text-[8px] opacity-40">{items.length} variants</span>
                                </h3>
                                <div className="space-y-4">
                                    {items.slice(0, 5).map((item: any) => (
                                        <div key={item.label}>
                                            <div className="flex justify-between text-[11px] font-medium text-[#6B6B6B] mb-1.5 px-0.5">
                                                <span className="capitalize">{item.label.replace(/_/g, ' ')}</span>
                                                <span className="text-[#141414] font-semibold">{item.count}</span>
                                            </div>
                                            <div className="h-1 w-full bg-[#141414]/5 rounded-full overflow-hidden">
                                                <div
                                                    className="h-full bg-[#141414] rounded-full"
                                                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Ad Gallery */}
                <div>
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="text-[12px] font-bold text-[#141414] uppercase tracking-[0.15em]">Creative Library</h3>
                        <p className="text-[10px] text-[#6B6B6B] font-bold uppercase tracking-[0.15em] opacity-40">Latest {name} Campaigns</p>
                    </div>
                    <Suspense fallback={
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="w-8 h-8 text-accent animate-spin" />
                        </div>
                    }>
                        <AdList filters={{ brand: name }} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
}
