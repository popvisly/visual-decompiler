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
        <main className="min-h-screen bg-canvas dot-grid">
            <Header activeTab="dashboard" />

            <div className="max-w-7xl mx-auto px-6 py-10">
                {/* Page title */}
                <div className="mb-10">
                    <h2 className="text-3xl font-light text-txt-primary tracking-tight">Ad Library</h2>
                    <p className="text-xs text-txt-muted mt-1 font-medium">Decompiled advertising intelligence</p>
                </div>

                <div className="flex flex-col md:flex-row gap-10">
                    {/* Sidebar */}
                    <aside className="w-full md:w-56 shrink-0">
                        <p className="spec-label mb-5">Strategic Filters</p>
                        <div className="bg-surface rounded-2xl p-4 border border-white/5">
                            <Filters currentFilters={params} />
                        </div>
                    </aside>

                    {/* Card grid */}
                    <section className="flex-1">
                        <Suspense fallback={
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="h-72 bg-surface rounded-2xl border border-white/5 animate-pulse" />
                                ))}
                            </div>
                        }>
                            <AdList filters={params} />
                        </Suspense>
                    </section>
                </div>
            </div>
        </main>
    );
}
