import { Suspense } from 'react';
import AdList from '@/components/AdList';
import Filters from '@/components/Filters';
import Header from '@/components/Header';
import CopilotPanel from '@/components/CopilotPanel';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const params = await searchParams;

    return (
        <div className="space-y-16 py-12">
            {/* Page title - Massive Editorial Typography */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-[#E7DED1]">
                <div>
                    <h2 className="text-7xl font-light text-[#141414] tracking-tightest uppercase leading-[0.85] select-none">
                        Tactical<br />
                        <span className="text-[#6B6B6B]/30">Library</span>
                    </h2>
                    <p className="text-[12px] text-[#6B6B6B] mt-6 font-bold tracking-[0.3em] uppercase">Private Archive / Competitive intelligence</p>
                </div>
            </div>

            <section className="flex-1">
                <Suspense fallback={
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                            <div key={i} className="aspect-[3/4] bg-white rounded-[2rem] border border-[#E7DED1] animate-pulse" />
                        ))}
                    </div>
                }>
                    <AdList filters={params} />
                </Suspense>
            </section>

            <CopilotPanel />
        </div>
    );
}
