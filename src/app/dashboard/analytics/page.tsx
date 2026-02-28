import { Suspense } from 'react';
import Link from 'next/link';
import { ArrowLeft, BarChart3, TrendingUp } from 'lucide-react';
import { getAnalyticsData } from '@/lib/analytics';
import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

function DimensionCard({ title, items }: { title: string, items: { label: string, count: number }[] }) {
    if (!items || items.length === 0) return null;
    
    const maxCount = Math.max(...items.map(i => i.count), 1);
    
    return (
        <div className="bg-white rounded-[2rem] border border-[#E7DED1] shadow-sm overflow-hidden flex flex-col">
            <div className="p-6 border-b border-[#E7DED1] bg-[#FBF7EF]">
                <h3 className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em]">{title}</h3>
            </div>
            <div className="p-6 flex-1 space-y-4">
                {items.slice(0, 10).map((item, idx) => {
                    const pct = (item.count / maxCount) * 100;
                    return (
                        <div key={idx} className="relative group">
                            <div className="flex justify-between items-end mb-1">
                                <span className="text-xs font-medium text-[#141414] truncate pr-4">{item.label}</span>
                                <span className="text-xs font-mono text-[#6B6B6B] bg-[#FBF7EF] px-1.5 py-0.5 rounded">{item.count}</span>
                            </div>
                            <div className="h-2 bg-[#FBF7EF] rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-[#141414] rounded-full transition-all group-hover:bg-accent"
                                    style={{ width: `${pct}%` }}
                                />
                            </div>
                        </div>
                    );
                })}
                {items.length === 0 && (
                    <div className="text-xs text-[#6B6B6B] italic">No data available</div>
                )}
            </div>
        </div>
    );
}

export default async function AnalyticsPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const { userId, orgId } = await auth();
    if (!userId) {
        redirect('/');
    }

    const params = await searchParams;
    const brand = params.brand;
    
    const data = await getAnalyticsData(userId, orgId, brand);
    
    return (
        <div className="max-w-7xl mx-auto px-6 py-10 w-full relative z-20">
            <div className="mb-12">
                <Link 
                    href="/dashboard"
                    className="inline-flex items-center gap-2 text-[10px] font-bold text-[#6B6B6B] uppercase tracking-widest hover:text-[#141414] transition-colors mb-8"
                >
                    <ArrowLeft className="w-3 h-3" />
                    Back to Library
                </Link>
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-12 border-b border-[#E7DED1]">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <BarChart3 className="w-6 h-6 text-accent" />
                            <h2 className="text-5xl font-light text-[#141414] tracking-tight leading-[0.9]">
                                Tagging<br />
                                <span className="text-[#6B6B6B]/40">Analytics</span>
                            </h2>
                        </div>
                        <p className="text-[12px] text-[#6B6B6B] mt-4 font-bold tracking-[0.3em] uppercase max-w-xl">
                            {brand ? `Filtered by Brand: ${brand}` : 'Aggregate intelligence across your entire tactical library'}
                        </p>
                    </div>

                    <div className="flex items-center gap-8 bg-white p-6 rounded-[2rem] border border-[#E7DED1] shadow-sm">
                        <div>
                            <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1">Total Processed</p>
                            <p className="text-3xl font-light text-[#141414]">{data.summary.total}</p>
                        </div>
                        <div className="w-px h-10 bg-[#E7DED1]" />
                        <div>
                            <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1">Peak Confidence</p>
                            <p className="text-3xl font-light text-[#141414]">
                                {data.summary.avg_confidence ? Math.round(data.summary.avg_confidence) + '%' : 'N/A'}
                            </p>
                        </div>
                        {data.summary.top_brand && !brand && (
                            <>
                                <div className="w-px h-10 bg-[#E7DED1]" />
                                <div>
                                    <p className="text-[9px] font-bold text-[#6B6B6B] uppercase tracking-widest mb-1">Top Brand</p>
                                    <p className="text-xl font-medium text-[#141414] mt-1 truncate max-w-[120px]">
                                        {data.summary.top_brand}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* If filtered by brand, show trend warning/highlight if available */}
            {brand && data.highlights.length > 0 && (
                <div className="mb-12 bg-accent/5 border border-accent/20 rounded-3xl p-6 lg:p-8 flex items-start gap-4">
                    <TrendingUp className="w-5 h-5 text-accent mt-0.5 shrink-0" />
                    <div>
                        <h3 className="text-[10px] font-bold text-accent uppercase tracking-[0.3em] mb-2">Deep Intelligence Highlights</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
                            {data.highlights.slice(0, 3).map((h, i) => (
                                <div key={i} className="bg-white/50 backdrop-blur-sm p-4 rounded-[1.5rem] border border-accent/10">
                                    <p className="text-xs font-medium text-[#141414] italic mb-3">"{h.subtext}"</p>
                                    {h.objection && (
                                        <p className="text-[10px] text-[#6B6B6B] uppercase tracking-wide">
                                            <span className="font-bold">Overcomes:</span> {h.objection}
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <DimensionCard title="Trigger Mechanics" items={data.dimensions['trigger_mechanic']} />
                <DimensionCard title="Narrative Frameworks" items={data.dimensions['narrative_framework']} />
                <DimensionCard title="Offer Types" items={data.dimensions['offer_type']} />
                <DimensionCard title="Claim Types" items={data.dimensions['claim_type']} />
                <DimensionCard title="Cognitive Load" items={data.dimensions['cognitive_load']} />
                <DimensionCard title="CTA Strength" items={data.dimensions['cta_strength']} />
            </div>
            
            {/* Top Brands Table */}
            {!brand && data.summary.brands.length > 0 && (
                <div className="mt-12 bg-white rounded-[2rem] border border-[#E7DED1] shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-[#E7DED1] bg-[#FBF7EF]">
                        <h3 className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em]">Library Composition by Brand</h3>
                    </div>
                    <div className="p-6">
                        <div className="flex flex-wrap gap-2">
                            {data.summary.brands.slice(0, 20).map((b, idx) => (
                                <Link 
                                    key={idx}
                                    href={`/dashboard/analytics?brand=${encodeURIComponent(b.label)}`}
                                    className="px-4 py-2 bg-[#FBF7EF] border border-[#E7DED1] rounded-full text-xs font-medium text-[#141414] hover:border-[#141414] hover:bg-white transition-all shadow-sm flex items-center gap-2"
                                >
                                    {b.label}
                                    <span className="text-[10px] font-mono text-[#6B6B6B] bg-white px-1.5 py-0.5 rounded-sm border border-[#E7DED1]">{b.count}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
