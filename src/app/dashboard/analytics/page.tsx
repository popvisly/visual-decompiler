import { Suspense } from 'react';
import Filters from '@/components/Filters';
import Header from '@/components/Header';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getAnalyticsData } from '@/lib/analytics';

async function AnalyticsContent({ brand }: { brand?: string }) {
    const data = await getAnalyticsData(brand);

    if (data.summary.total === 0) {
        return (
            <div className="text-center py-20 bg-surface rounded-3xl border border-white/5">
                <p className="text-txt-on-dark-muted font-medium text-sm">No data found for the selected filters.</p>
            </div>
        );
    }

    const dimensions = [
        { key: 'trigger_mechanic', label: 'Trigger Mechanics' },
        { key: 'claim_type', label: 'Claim Types' },
        { key: 'offer_type', label: 'Offer Types' },
        { key: 'narrative_framework', label: 'Narrative Frameworks' },
        { key: 'cognitive_load', label: 'Cognitive Load' },
        { key: 'cta_strength', label: 'CTA Strength' },
    ];

    return (
        <div className="space-y-12">
            {/* Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-surface p-6 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                        <p className="spec-label-dark">Processed</p>
                        <div className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                    </div>
                    <p className="text-3xl font-light text-txt-on-dark">{data.summary.total}</p>
                </div>
                <div className="bg-surface p-6 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                        <p className="spec-label-dark">In Queue</p>
                        <div className={`w-2 h-2 rounded-full ${data.summary.queued > 0 ? 'bg-accent animate-pulse' : 'bg-white/10'}`} />
                    </div>
                    <p className="text-3xl font-light text-txt-on-dark">{data.summary.queued}</p>
                </div>
                <div className="bg-surface p-6 rounded-2xl border border-white/5">
                    <div className="flex justify-between items-start mb-2">
                        <p className="spec-label-dark">Processing</p>
                        <div className={`w-2 h-2 rounded-full ${data.summary.processing > 0 ? 'bg-yellow-500 animate-spin' : 'bg-white/10'}`} />
                    </div>
                    <p className="text-3xl font-light text-txt-on-dark">{data.summary.processing}</p>
                </div>
            </div>

            {/* Dimension Grids */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {dimensions.map(dim => {
                    const items = data.dimensions[dim.key] || [];
                    const maxCount = items.length > 0 ? items[0].count : 0;

                    return (
                        <div key={dim.key} className="bg-surface p-6 rounded-2xl border border-white/5">
                            <h3 className="text-xs font-bold text-txt-on-dark uppercase tracking-tight mb-5 flex items-center justify-between">
                                {dim.label}
                                <span className="spec-label-dark">{items.length} variants</span>
                            </h3>
                            <div className="space-y-3">
                                {items.map((item: any) => (
                                    <div key={item.label} className="group">
                                        <div className="flex justify-between text-[11px] font-medium text-txt-on-dark-muted mb-1 px-0.5">
                                            <span className="group-hover:text-txt-on-dark transition-colors capitalize">{item.label.replace(/_/g, ' ')}</span>
                                            <span>{item.count}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-accent rounded-full transition-all duration-1000 ease-out"
                                                style={{ width: `${(item.count / maxCount) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {items.length === 0 && (
                                    <p className="text-xs text-txt-on-dark-muted italic">No data recorded.</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Invisible Machinery: Lateral Inspiration Wall */}
            <div className="space-y-6 pt-6 border-t border-white/5">
                <div>
                    <h3 className="text-xs font-bold text-accent uppercase tracking-widest mb-1">Invisible Machinery</h3>
                    <p className="text-[10px] text-txt-on-dark-muted font-medium uppercase tracking-tight">Lateral Strategy Inspiration</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {data.highlights.map(item => (
                        <div key={item.id} className="bg-surface p-5 rounded-2xl border border-white/5 flex flex-col gap-4 group hover:border-accent/40 transition-all cursor-default">
                            <div className="flex items-center justify-between">
                                <span className="spec-label-dark font-bold text-[9px] truncate max-w-[120px]">{item.brand}</span>
                                <div className="w-1.5 h-1.5 rounded-full bg-accent/40 group-hover:bg-accent animate-pulse" />
                            </div>

                            <div className="space-y-3">
                                <div>
                                    <p className="text-[8px] font-bold text-accent/60 uppercase tracking-tighter mb-1">Semiotic Subtext</p>
                                    <p className="text-[11px] text-txt-on-dark-muted leading-relaxed line-clamp-3 italic">"{item.subtext}"</p>
                                </div>
                                <div className="pt-3 border-t border-white/5">
                                    <p className="text-[8px] font-bold text-txt-on-dark-muted/60 uppercase tracking-tighter mb-1">Objection Dismantling</p>
                                    <p className="text-[11px] text-txt-on-dark leading-snug">{item.objection}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default async function AnalyticsPage({
    searchParams,
}: {
    searchParams: Promise<{ brand?: string }>;
}) {
    const params = await searchParams;

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-3xl font-light text-txt-on-dark tracking-tight uppercase">Global Intelligence</h2>
                <p className="text-[10px] text-txt-on-dark-muted mt-1 font-medium tracking-widest uppercase">Strategic pattern distribution</p>
            </div>

            <section className="flex-1">
                <Suspense fallback={
                    <div className="space-y-12 animate-pulse">
                        <div className="grid grid-cols-3 gap-5">
                            {[1, 2, 3].map(i => <div key={i} className="h-24 bg-surface/50 rounded-2xl border border-white/5" />)}
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map(i => <div key={i} className="h-56 bg-surface/50 rounded-2xl border border-white/5" />)}
                        </div>
                    </div>
                }>
                    <AnalyticsContent brand={params.brand} />
                </Suspense>
            </section>
        </div>
    );
}
