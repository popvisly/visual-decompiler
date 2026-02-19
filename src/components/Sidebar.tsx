import Link from 'next/link';
import { getAllBrands } from '@/lib/brands';
import Filters from './Filters';

export default async function Sidebar({ searchParams }: { searchParams: any }) {
    const brands = await getAllBrands();
    const topBrands = brands.slice(0, 10);

    return (
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-10">
            {/* Context Header (Mobile only or hidden) */}
            <div className="md:hidden mb-4">
                <p className="spec-label">Navigation</p>
            </div>

            {/* Strategic Filters Section */}
            <div>
                <p className="spec-label mb-5 text-accent/80">Strategic Filters</p>
                <div className="bg-surface/50 backdrop-blur-sm rounded-2xl p-5 border border-white/5 shadow-2xl">
                    <Filters currentFilters={searchParams} />
                </div>
            </div>

            {/* Market Pulse / Brands Section */}
            <div>
                <p className="spec-label mb-5 text-txt-on-dark-muted">Market Pulse <span className="text-[8px] opacity-40 ml-2 font-mono">/ TOP COMPETITORS</span></p>
                <div className="space-y-1">
                    {topBrands.length > 0 ? topBrands.map((brand) => (
                        <Link
                            key={brand.name}
                            href={`/dashboard/brand/${encodeURIComponent(brand.name)}`}
                            className="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-white/5 group transition-all"
                        >
                            <span className="text-[11px] font-medium text-txt-on-dark-muted group-hover:text-accent transition-colors truncate max-w-[140px]">
                                {brand.name}
                            </span>
                            <span className="text-[9px] font-mono text-txt-on-dark-muted/40 group-hover:text-accent/60">
                                {String(brand.count).padStart(2, '0')}
                            </span>
                        </Link>
                    )) : (
                        <p className="text-[10px] text-txt-on-dark-muted/40 italic px-3">Initializing market index...</p>
                    )}
                </div>
            </div>

            {/* Quick Links */}
            <div className="pt-4 border-t border-white/5">
                <Link
                    href="/dashboard/analytics"
                    className="flex items-center gap-2 px-3 py-2 text-[10px] font-bold text-txt-on-dark-muted hover:text-accent uppercase tracking-widest transition-all"
                >
                    <div className="w-1 h-1 rounded-full bg-accent animate-pulse" />
                    Global Intelligence
                </Link>
            </div>
        </aside>
    );
}
