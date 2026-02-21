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
        <div className="space-y-10">
            {/* Page title */}
            <div>
                <h2 className="text-4xl font-light text-[#141414] tracking-tight uppercase">Library</h2>
                <p className="text-[10px] text-[#6B6B6B] mt-1 font-bold tracking-[0.2em] uppercase">Decompiled Archive</p>
            </div>

            <section className="flex-1">
                <Suspense fallback={
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(i => (
                            <div key={i} className="aspect-square bg-[#FBF7EF] rounded-xl border border-[#E7DED1] animate-pulse" />
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
