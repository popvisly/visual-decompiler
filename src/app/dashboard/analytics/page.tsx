import { Suspense } from 'react';
import Filters from '@/components/Filters';
import Header from '@/components/Header';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function AnalyticsContent({ brand }: { brand?: string }) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/analytics${brand ? `?brand=${brand}` : ''}`, { cache: 'no-store' });

    if (!res.ok) {
        return <div className="text-red-400 font-bold p-8 bg-red-500/10 rounded-2xl border border-red-500/20">Error loading analytics data</div>;
    }

    const data = await res.json();

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
                    <p className="spec-label-dark mb-2">Total Processed</p>
                    <p className="text-3xl font-light text-txt-on-dark">{data.summary.total}</p>
                </div>
                <div className="bg-surface p-6 rounded-2xl border border-white/5">
                    <p className="spec-label-dark mb-2">Top Brand</p>
                    <p className="text-lg font-semibold text-txt-on-dark truncate">{data.summary.top_brand || 'N/A'}</p>
                </div>
                <div className="bg-surface p-6 rounded-2xl border border-white/5">
                    <p className="spec-label-dark mb-2">Avg Confidence</p>
                    <p className="text-3xl font-light text-accent">{data.summary.avg_confidence ? `${(data.summary.avg_confidence * 100).toFixed(0)}%` : 'N/A'}</p>
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
        <main className="min-h-screen bg-canvas dot-grid">
            <Header activeTab="analytics" />

            <div className="max-w-7xl mx-auto px-6 py-10">
                <div className="mb-10">
                    <h2 className="text-3xl font-light text-txt-primary tracking-tight">Analytics</h2>
                    <p className="text-xs text-txt-muted mt-1 font-medium">Strategic pattern distribution across your library</p>
                </div>

                <div className="flex flex-col md:flex-row gap-10">
                    <aside className="w-full md:w-56 shrink-0">
                        <p className="spec-label mb-5">Focus Filter</p>
                        <div className="bg-surface rounded-2xl p-4 border border-white/5">
                            <Filters currentFilters={params} />
                        </div>
                    </aside>

                    <section className="flex-1">
                        <Suspense fallback={
                            <div className="space-y-12 animate-pulse">
                                <div className="grid grid-cols-3 gap-5">
                                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-surface rounded-2xl border border-white/5" />)}
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="h-56 bg-surface rounded-2xl border border-white/5" />)}
                                </div>
                            </div>
                        }>
                            <AnalyticsContent brand={params.brand} />
                        </Suspense>
                    </section>
                </div>
            </div>
        </main>
    );
}
