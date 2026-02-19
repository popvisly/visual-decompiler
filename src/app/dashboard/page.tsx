import { Suspense } from 'react';
import AdList from '@/components/AdList';
import Filters from '@/components/Filters';
import Header from '@/components/Header';

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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-72 bg-[#FBF7EF] rounded-2xl border border-[#E7DED1] animate-pulse" />
                        ))}
                    </div>
                }>
                    <AdList filters={params} />
                </Suspense>
            </section>
        </div>
    );
}
