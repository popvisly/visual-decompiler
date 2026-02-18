import { Suspense } from 'react';
import Link from 'next/link';
import AdList from '@/components/AdList';
import IngestForm from '@/components/IngestForm';
import Filters from '@/components/Filters';

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
            <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div>
                        <h1 className="text-xl font-bold text-slate-900">Visual Decompiler</h1>
                        <p className="text-xs text-slate-500 font-medium">Advertising Intelligence Dashboard</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Link
                            href="/dashboard/analytics"
                            className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
                        >
                            Analytics
                        </Link>
                        <a
                            href="/api/export"
                            className="text-xs font-semibold text-slate-500 hover:text-slate-900 border border-slate-200 hover:border-slate-400 rounded-lg px-3 py-2 transition-colors"
                            download
                        >
                            Export CSV
                        </a>
                        <IngestForm />
                    </div>
                </div>
            </header>

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
