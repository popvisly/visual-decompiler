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
                <h2 className="text-3xl font-light text-txt-on-dark tracking-tight uppercase">Library</h2>
                <p className="text-[10px] text-txt-on-dark-muted mt-1 font-medium tracking-widest uppercase">Decompiled Archive</p>
            </div>

            <section className="flex-1">
                <Suspense fallback={
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="h-72 bg-surface/50 rounded-2xl border border-white/5 animate-pulse" />
                        ))}
                    </div>
                }>
                    <AdList filters={params} />
                </Suspense>
            </section>
        </div>
    );
}
