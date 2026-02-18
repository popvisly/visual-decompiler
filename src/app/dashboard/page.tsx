import { Suspense } from 'react';
import Link from 'next/link';
import AdList from '@/components/AdList';
import IngestForm from '@/components/IngestForm';
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
        <main className="min-h-screen bg-slate-50">
            <Header activeTab="dashboard" />

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    <aside className="w-full md:w-64 shrink-0">
                        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Strategic Filters</h2>
                        <Filters currentFilters={params} />
                    </aside>

                    <section className="flex-1">
                        <Suspense fallback={<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
                            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 bg-slate-100 rounded-2xl border border-slate-200" />)}
                        </div>}>
                            <AdList filters={params} />
                        </Suspense>
                    </section>
                </div>
            </div>
        </main>
    );
}
