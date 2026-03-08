import Link from 'next/link';
import { getAllBrands } from '@/lib/brands';
import Filters from './Filters';
import { Settings, Globe, Activity, Zap, Compass, Share2 } from 'lucide-react';
import NotificationBell from './NotificationBell';

export default async function Sidebar({ searchParams }: { searchParams: any }) {
    // Phase 2: Sidebar is purely navigatonal, security is handled at the page/route level.
    const params = await searchParams;

    // Temporarily disable brand loading for debugging
    // TODO: Re-enable after fixing the underlying database issue
    const brands: any[] = [];
    const topBrands = brands.slice(0, 10);

    // Original code (disabled):
    // let brands: Awaited<ReturnType<typeof getAllBrands>> = [];
    // try {
    //     brands = await getAllBrands(userId);
    // } catch (error) {
    //     console.error('[Sidebar] Failed to load brands:', error);
    // }
    // const topBrands = brands.slice(0, 10);

    return (
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-12 sticky top-[104px] self-start max-h-[calc(100vh-120px)] overflow-y-auto hidden-scrollbar pt-10 pb-10 pr-2 bg-[#F5F5DC]">
            {/* Context Header (Mobile only) */}
            <div className="md:hidden mb-6">
                <p className="text-[#8B4513]/60 text-[10px] font-bold uppercase tracking-[0.3em]">Strategic Menu</p>
            </div>

            {/* Strategic Filters Section - TEMPORARILY DISABLED */}
            {/* <div>
                <p className="text-[#8B4513] text-[11px] font-bold uppercase tracking-[0.3em] mb-6 pl-1 border-l-2 border-[#D4A574]">Filtering Logic</p>
                <div className="bg-[#F5F5DC] rounded-[2rem] p-6 border border-[#D4A574] shadow-[0_10px_40px_rgba(139,69,19,0.02)]">
                    <Filters currentFilters={searchParams} />
                </div>
            </div> */}

            {/* Market Pulse / Brands Section */}
            <div>
                <p className="text-[#8B4513]/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-6 flex items-center justify-between">
                    Market Pulse
                    <span className="text-[8px] opacity-30 font-mono tracking-[0.2em]">/ TOP 10</span>
                </p>
                <div className="space-y-1">
                    {topBrands.length > 0 ? topBrands.map((brand) => (
                        <Link
                            key={brand.name}
                            href={`/dashboard/brand/${encodeURIComponent(brand.name)}`}
                            className="flex items-center justify-between px-4 py-3 rounded-2xl hover:bg-[#8B4513]/5 border border-transparent hover:border-[#D4A574] group transition-all duration-300"
                        >
                            <span className="text-[12px] font-bold text-[#8B4513]/60 group-hover:text-[#8B4513] transition-colors truncate max-w-[140px] uppercase tracking-tight">
                                {brand.name}
                            </span>
                            <span className="text-[10px] font-mono text-[#8B4513]/40 group-hover:text-[#8B4513] font-bold">
                                {String(brand.count).padStart(2, '0')}
                            </span>
                        </Link>
                    )) : (
                        <p className="text-[10px] text-[#8B4513]/60 italic px-4 uppercase tracking-widest">Hydrating index...</p>
                    )}
                </div>
            </div>

            {/* Quick Links */}
            <div className="pt-8 border-t border-[#D4A574] space-y-2">
                <div className="flex items-center justify-between px-1 mb-4">
                    <p className="text-[#8B4513]/60 text-[10px] font-bold uppercase tracking-[0.3em] italic">Intelligence</p>
                    {/* <NotificationBell /> */}
                </div>
                <Link
                    href="/dashboard/pulse"
                    className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-[#8B4513]/60 hover:text-[#8B4513] hover:bg-[#8B4513]/5 rounded-2xl border border-transparent hover:border-[#D4A574] uppercase tracking-[0.3em] transition-all group"
                >
                    <Activity className="w-4 h-4 text-[#8B4513] transition-transform group-hover:rotate-12" />
                    Strategic Pulse
                </Link>
                <Link
                    href="/dashboard/discovery"
                    className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-[#8B4513]/60 hover:text-[#8B4513] hover:bg-[#8B4513]/5 rounded-2xl border border-transparent hover:border-[#D4A574] uppercase tracking-[0.3em] transition-all group"
                >
                    <Compass className="w-4 h-4 text-[#8B4513]/40 group-hover:text-[#8B4513] transition-colors" />
                    Discovery
                </Link>
                <Link
                    href="/dashboard/settings"
                    className="flex items-center gap-3 px-4 py-3 text-[10px] font-bold text-[#8B4513]/60 hover:text-[#8B4513] hover:bg-[#8B4513]/5 rounded-2xl border border-transparent hover:border-[#D4A574] uppercase tracking-[0.3em] transition-all group"
                >
                    <Settings className="w-4 h-4 text-[#8B4513]/40 group-hover:text-[#8B4513] transition-colors" />
                    Agency Settings
                </Link>
            </div>
        </aside>
    );
}
