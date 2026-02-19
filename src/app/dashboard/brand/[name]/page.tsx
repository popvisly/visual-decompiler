import { Suspense } from 'react';
import AdList from '@/components/AdList';
import { getBrandStats } from '@/lib/brands';
import { Loader2 } from 'lucide-react';

export default async function BrandProfilePage({
    params,
}: {
    params: Promise<{ name: string }>;
}) {
    const { name: encodedName } = await params;
    const name = decodeURIComponent(encodedName);
    const stats = await getBrandStats(name);

    if (stats.totalAds === 0) {
        return (
            <div className="text-center py-20 bg-surface rounded-3xl border border-white/5">
                <p className="text-txt-on-dark-muted font-medium text-sm">No data found for brand: {name}</p>
            </div>
        );
    }

    const dimensions = [
        { key: 'trigger_mechanic', label: 'Trigger Mechanics' },
        { key: 'claim_type', label: 'Claim Types' },
        { key: 'offer_type', label: 'Offer Types' },
    ];

    return (
        <div className="space-y-12">
            {/* Brand Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/5">
                <div>
                    <h2 className="text-5xl font-light text-txt-on-dark tracking-tighter uppercase">{name}</h2>
                    <p className="text-xs text-txt-on-dark-muted mt-2 font-medium tracking-widest uppercase">Competitor Intelligence Profile</p>
                </div>
                <div className="flex gap-4">
                    <div className="bg-surface p-5 rounded-2xl border border-white/5 min-w-[120px]">
                        <p className="spec-label-dark mb-1">Scale</p>
                        <p className="text-2xl font-light text-txt-on-dark">{stats.totalAds} <span className="text-[10px] text-txt-on-dark-muted font-bold tracking-widest">ADS</span></p>
                    </div>
                    <div className="bg-surface p-5 rounded-2xl border border-white/5 min-w-[120px]">
                        <p className="spec-label-dark mb-1">Avg Confidence</p>
                        <p className="text-2xl font-light text-accent">{(stats.avgConfidence || 0).toLocaleString(undefined, { style: 'percent' })}</p>
                    </div>
                </div>
            </div>

            {/* Strategic Insights */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {dimensions.map(dim => {
                    const items = stats.dimensions[dim.key] || [];
                    const maxCount = items.length > 0 ? items[0].count : 0;

                    return (
                        <div key={dim.key} className="bg-surface p-6 rounded-2xl border border-white/5">
                            <h3 className="spec-label-dark mb-5 flex items-center justify-between">
                                {dim.label}
                                <span className="text-[8px] opacity-40">{items.length} variants</span>
                            </h3>
                            <div className="space-y-4">
                                {items.slice(0, 5).map((item: any) => (
                                    <div key={item.label}>
                                        <div className="flex justify-between text-[10px] font-medium text-txt-on-dark-muted mb-1.5 px-0.5">
                                            <span className="capitalize">{item.label.replace(/_/g, ' ')}</span>
                                            <span>{item.count}</span>
                                        </div>
                                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-accent rounded-full"
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
                    <h3 className="spec-label text-accent">Creative Library</h3>
                    <p className="text-[10px] text-txt-muted uppercase tracking-widest">Latest {name} Campaigns</p>
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
    );
}
