import Link from 'next/link';
import { getAllBrands } from '@/lib/brands';
import Filters from './Filters';
import { auth } from '@clerk/nextjs/server';
import { Settings, Globe, Activity, Zap } from 'lucide-react';

export default async function Sidebar({ searchParams }: { searchParams: any }) {
    const { userId } = await auth();
    if (!userId) return null;

    const brands = await getAllBrands(userId);
    const topBrands = brands.slice(0, 10);

    return (
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-10 sticky top-[104px] self-start max-h-[calc(100vh-120px)] overflow-y-auto hidden-scrollbar pb-10">
            {/* Context Header (Mobile only or hidden) */}
            <div className="md:hidden mb-4">
                <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em]">Navigation</p>
            </div>

            {/* Strategic Filters Section */}
            <div>
                <p className="text-[#141414] text-[10px] font-bold uppercase tracking-[0.15em] mb-4">Strategic Filters</p>
                <div className="bg-white rounded-2xl p-5 border border-[#E7DED1] shadow-[0_10px_40px_rgba(20,20,20,0.04)]">
                    <Filters currentFilters={searchParams} />
                </div>
            </div>

            {/* Market Pulse / Brands Section */}
            <div>
                <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.15em] mb-4">Market Pulse <span className="text-[8px] opacity-40 ml-2 font-mono tracking-widest">/ TOP COMPETITORS</span></p>
                <div className="space-y-1">
                    {topBrands.length > 0 ? topBrands.map((brand) => (
                        <Link
                            key={brand.name}
                            href={`/dashboard/brand/${encodeURIComponent(brand.name)}`}
                            className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-[#FBF7EF] border border-transparent hover:border-[#E7DED1] group transition-all"
                        >
                            <span className="text-[12px] font-medium text-[#6B6B6B] group-hover:text-[#141414] transition-colors truncate max-w-[140px]">
                                {brand.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#6B6B6B]/40 group-hover:text-[#141414]/60">
                                {String(brand.count).padStart(2, '0')}
                            </span>
                        </Link>
                    )) : (
                        <p className="text-[10px] text-[#6B6B6B]/60 italic px-3">Initializing market index...</p>
                    )}
                </div>
            </div>

            {/* Quick Links */}
            <div className="pt-4 border-t border-[#E7DED1] space-y-1">
                <Link
                    href="/dashboard/analytics"
                    className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-[#6B6B6B] hover:text-[#141414] uppercase tracking-[0.15em] transition-all"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#141414] animate-pulse" />
                    Global Intelligence
                </Link>
                <Link
                    href="/dashboard/pulse"
                    className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-[#6B6B6B] hover:text-[#141414] uppercase tracking-[0.15em] transition-all"
                >
                    <Activity className="w-3.5 h-3.5 text-accent" />
                    Market Pulse
                </Link>
                <Link
                    href="/dashboard/discovery"
                    className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-[#6B6B6B] hover:text-[#141414] uppercase tracking-[0.15em] transition-all"
                >
                    <Globe className="w-3.5 h-3.5 text-blue-500" />
                    Global Discovery
                </Link>
                <Link
                    href="/dashboard/compare"
                    className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-[#6B6B6B] hover:text-[#141414] uppercase tracking-[0.15em] transition-all"
                >
                    <div className="w-1.5 h-1.5 rounded-full bg-accent/40" />
                    Strategy Comparison
                </Link>
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-[#6B6B6B] hover:text-[#141414] uppercase tracking-[0.15em] transition-all"
                >
                    <Settings className="w-3.5 h-3.5" />
                    Branding Settings
                </Link>
            </div>
        </aside>
    );
}
