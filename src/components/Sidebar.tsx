import Link from 'next/link';
import { getAllBrands } from '@/lib/brands';
import Filters from './Filters';
import { auth } from '@clerk/nextjs/server';
import { Settings, Globe, Activity, Zap, Compass, Share2 } from 'lucide-react';
import NotificationBell from './NotificationBell';

export default async function Sidebar({ searchParams }: { searchParams: any }) {
    const { userId } = await auth();
    if (!userId) return null;

    const brands = await getAllBrands(userId);
    const topBrands = brands.slice(0, 10);

    return (
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-12 sticky top-[104px] self-start max-h-[calc(100vh-120px)] overflow-y-auto hidden-scrollbar pt-10 pb-10 pr-2">
            {/* Context Header (Mobile only) */}
            <div className="md:hidden mb-6">
                <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.3em]">Strategic Menu</p>
            </div>

            {/* Strategic Filters Section */}
            <div>
                <p className="text-[#141414] text-[11px] font-bold uppercase tracking-[0.3em] mb-6 pl-1 border-l-2 border-accent">Filtering Logic</p>
                <div className="bg-white rounded-[2rem] p-6 border border-[#E7DED1] shadow-[0_10px_40px_rgba(20,20,20,0.02)]">
                    <Filters currentFilters={searchParams} />
                </div>
            </div>

            {/* Market Pulse / Brands Section */}
            <div>
                <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center justify-between">
                    Market Pulse
                    <span className="text-[8px] opacity-30 font-mono tracking-[0.2em]">/ TOP 10</span>
                </p>
                <div className="space-y-1">
                    {topBrands.length > 0 ? topBrands.map((brand) => (
                        <Link
                            key={brand.name}
                            href={`/dashboard/brand/${encodeURIComponent(brand.name)}`}
                            className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-white border border-transparent hover:border-[#E7DED1] group transition-all duration-300 hover:shadow-lg hover:shadow-black/[0.01]"
                        >
                            <span className="text-[12px] font-bold text-[#6B6B6B] group-hover:text-[#141414] transition-colors truncate max-w-[140px] uppercase tracking-tight">
                                {brand.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#6B6B6B]/40 group-hover:text-accent font-bold">
                                {String(brand.count).padStart(2, '0')}
                            </span>
                        </Link>
                    )) : (
                        <p className="text-[10px] text-[#6B6B6B]/60 italic px-4 uppercase tracking-widest">Hydrating index...</p>
                    )}
                </div>
            </div>

            {/* Quick Links */}
            <div className="pt-8 border-t border-[#E7DED1] space-y-2">
                <div className="flex items-center justify-between px-1 mb-4">
                    <p className="text-[#6B6B6B] text-[10px] font-bold uppercase tracking-[0.3em] italic">Intelligence</p>
                    <NotificationBell />
                </div>
                <Link
                    href="/dashboard/pulse"
                    className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-[#6B6B6B] hover:text-[#141414] hover:bg-white rounded-2xl border border-transparent hover:border-[#E7DED1] uppercase tracking-[0.3em] transition-all group"
                >
                    <Activity className="w-4 h-4 text-accent transition-transform group-hover:rotate-12" />
                    Strategic Pulse
                </Link>
                <Link
                    href="/dashboard/discovery"
                    className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-[#6B6B6B] hover:text-[#141414] hover:bg-white rounded-2xl border border-transparent hover:border-[#E7DED1] uppercase tracking-[0.3em] transition-all group"
                >
                    <Compass className="w-4 h-4 text-[#6B6B6B]/40 group-hover:text-[#141414] transition-colors" />
                    Discovery
                </Link>
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-[#6B6B6B] hover:text-[#141414] hover:bg-white rounded-2xl border border-transparent hover:border-[#E7DED1] uppercase tracking-[0.3em] transition-all group"
                >
                    <Settings className="w-4 h-4 text-[#6B6B6B]/40 group-hover:text-[#141414] transition-colors" />
                    Settings
                </Link>
            </div>
        </aside>
    );
}
