import Link from 'next/link';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type CountRow = { value: string; count: number };

interface AnalyticsData {
    total: number;
    brand_filter: string | null;
    avg_confidence: number | null;
    top_brands: CountRow[];
    trigger_mechanic: CountRow[];
    claim_type: CountRow[];
    offer_type: CountRow[];
    narrative_framework: CountRow[];
    cognitive_load: CountRow[];
    cta_strength: CountRow[];
}

async function getAnalytics(brand?: string): Promise<AnalyticsData> {
    const url = new URL('/api/analytics', process.env.NEXT_PUBLIC_SITE_URL || 'https://visual-decompiler.vercel.app');
    if (brand) url.searchParams.set('brand', brand);
    const res = await fetch(url.toString(), { cache: 'no-store' });
    return res.json();
}

function RankedList({ title, rows }: { title: string; rows: CountRow[] }) {
    if (!rows || rows.length === 0) return null;
    const max = rows[0].count;
    return (
        <div>
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">{title}</h3>
            <div className="space-y-2">
                {rows.map((row, i) => (
                    <div key={row.value} className="flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-300 w-4 text-right shrink-0">{i + 1}</span>
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-0.5">
                                <span className="text-xs font-semibold text-slate-700 truncate">
                                    {row.value.replace(/_/g, ' ')}
                                </span>
                                <span className="text-[10px] font-bold text-slate-400 ml-2 shrink-0">{row.count}</span>
                            </div>
                            <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                    className="h-full bg-slate-800 rounded-full transition-all"
                                    style={{ width: `${(row.count / max) * 100}%` }}
                                />
                            </div>
                        </div>
                    </div>
                ))}
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
    const data = await getAnalytics(params.brand);

    return (
        <main className="min-h-screen bg-slate-50">
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Visual Decompiler</h1>
                        <p className="text-xs text-slate-500 font-medium">Advertising Intelligence Dashboard</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link href="/dashboard" className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors">
                            Library
                        </Link>
                        <Link href="/dashboard/analytics" className="text-xs font-semibold text-slate-900 border-b border-slate-900 pb-0.5">
                            Analytics
                        </Link>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Summary bar */}
                <div className="flex items-center gap-6 mb-8 p-5 bg-white rounded-2xl border border-slate-200">
                    <div>
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ads Analysed</p>
                        <p className="text-2xl font-bold text-slate-900">{data.total}</p>
                    </div>
                    {data.avg_confidence !== null && (
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Avg Confidence</p>
                            <p className="text-2xl font-bold text-slate-900">{(data.avg_confidence * 100).toFixed(0)}%</p>
                        </div>
                    )}
                    {data.brand_filter && (
                        <div className="ml-auto">
                            <span className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-bold">
                                Filtered: {data.brand_filter}
                            </span>
                            <Link href="/dashboard/analytics" className="ml-2 text-xs text-slate-400 hover:text-slate-700">
                                Clear
                            </Link>
                        </div>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Top Brands */}
                    {data.top_brands.length > 0 && (
                        <div className="bg-white rounded-2xl border border-slate-200 p-6">
                            <RankedList title="Top Brands" rows={data.top_brands} />
                        </div>
                    )}

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <RankedList title="Trigger Mechanic" rows={data.trigger_mechanic} />
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <RankedList title="Claim Type" rows={data.claim_type} />
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <RankedList title="Offer Type" rows={data.offer_type} />
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <RankedList title="Narrative Framework" rows={data.narrative_framework} />
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <RankedList title="Cognitive Load" rows={data.cognitive_load} />
                    </div>

                    <div className="bg-white rounded-2xl border border-slate-200 p-6">
                        <RankedList title="CTA Strength" rows={data.cta_strength} />
                    </div>
                </div>
            </div>
        </main>
    );
}
