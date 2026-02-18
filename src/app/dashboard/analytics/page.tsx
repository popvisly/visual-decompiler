import { Suspense } from 'react';
import Link from 'next/link';
import Filters from '@/components/Filters';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

async function AnalyticsContent({ brand }: { brand?: string }) {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/analytics${brand ? `?brand=${brand}` : ''}`, { cache: 'no-store' });

    if (!res.ok) {
        return <div className="text-red-500 font-bold p-8 bg-red-50 rounded-2xl border border-red-100">Error loading analytics data</div>;
    }

    const data = await res.json();

    if (data.summary.total === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <p className="text-slate-400 font-medium">No data found for the selected filters.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Processed</p>
                    <p className="text-3xl font-black text-slate-900">{data.summary.total}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Top Brand</p>
                    <p className="text-xl font-bold text-slate-900 truncate">{data.summary.top_brand || 'N/A'}</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Avg Confidence</p>
                    <p className="text-3xl font-black text-indigo-600">{data.summary.avg_confidence ? `${(data.summary.avg_confidence * 100).toFixed(0)}%` : 'N/A'}</p>
                </div>
            </div>

            {/* Dimension Grids */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {dimensions.map(dim => {
                    const items = data.dimensions[dim.key] || [];
                    const maxCount = items.length > 0 ? items[0].count : 0;

                    return (
                        <div key={dim.key} className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                            <h3 className="text-sm font-black text-slate-900 mb-6 uppercase tracking-tight flex items-center justify-between">
                                {dim.label}
                                <span className="text-[10px] text-slate-400 font-bold">{items.length} variants</span>
                            </h3>
                            <div className="space-y-4">
                                {items.map((item: any) => (
                                    <div key={item.label} className="group">
                                        <div className="flex justify-between text-[11px] font-bold text-slate-600 mb-1.5 px-0.5">
                                            <span className="group-hover:text-slate-900 transition-colors capitalize">{item.label.replace(/_/g, ' ')}</span>
                                            <span className="text-slate-400">{item.count}</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden border border-slate-100">
                                            <div
                                                className="h-full bg-slate-900 rounded-full transition-all duration-1000 ease-out group-hover:bg-indigo-600"
                                                style={{ width: `${(item.count / maxCount) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                                {items.length === 0 && (
                                    <p className="text-xs text-slate-300 italic">No data recorded.</p>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

import Header from '@/components/Header';

export default async function AnalyticsPage({
    searchParams,
}: {
    searchParams: Promise<{ brand?: string }>;
}) {
    const params = await searchParams;

    return (
        <main className="min-h-screen bg-slate-50">
            <Header activeTab="analytics" />

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-64 shrink-0">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Focus Filter</h2>
                        <Filters currentFilters={params} />
                    </aside>

                    <section className="flex-1">
                        <Suspense fallback={
                            <div className="space-y-12 animate-pulse">
                                <div className="grid grid-cols-3 gap-6">
                                    {[1, 2, 3].map(i => <div key={i} className="h-24 bg-white rounded-2xl border border-slate-200" />)}
                                </div>
                                <div className="grid grid-cols-2 gap-8">
                                    {[1, 2, 3, 4].map(i => <div key={i} className="h-64 bg-white rounded-3xl border border-slate-200" />)}
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
