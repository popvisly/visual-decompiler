import { Suspense } from 'react';
import AdList from '@/components/AdList';
import Filters from '@/components/Filters';
import Header from '@/components/Header';
import CopilotPanel from '@/components/CopilotPanel';
import AnomalyRouter from '@/components/AnomalyRouter';
import GlobalMesh from '@/components/GlobalMesh';
import TrendForecaster from '@/components/TrendForecaster';
import DevProcessQueueButton from '@/components/DevProcessQueueButton';
import CommandCenter from '@/components/CommandCenter';
import { Shield, LayoutGrid } from 'lucide-react';
import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function DashboardPage({
    searchParams,
}: {
    searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
    const params = await searchParams;

    return (
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-10 w-full relative z-20">
            <Sidebar searchParams={params} />
            <div className="flex-1 space-y-16 py-12">
                {/* Page title - Massive Editorial Typography */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-[#E7DED1]">
                    <div>
                        <h2 className="text-7xl font-light text-[#141414] tracking-tightest uppercase leading-[0.85] select-none">
                            Tactical<br />
                            <span className="text-[#6B6B6B]/30">Library</span>
                        </h2>
                        <p className="text-[12px] text-[#6B6B6B] mt-6 font-bold tracking-[0.3em] uppercase">Private Archive / Competitive intelligence</p>
                    </div>

                    <div className="md:pb-2 flex items-center gap-4">
                        <Link
                            href={params.v === 'executive' ? '/dashboard' : '/dashboard?v=executive'}
                            className={`flex items-center gap-3 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all border ${params.v === 'executive'
                                ? 'bg-accent text-[#141414] border-accent'
                                : 'bg-white text-[#6B6B6B] border-[#E7DED1] hover:border-accent'
                                }`}
                        >
                            {params.v === 'executive' ? (
                                <>
                                    <LayoutGrid className="w-4 h-4" />
                                    Operational View
                                </>
                            ) : (
                                <>
                                    <Shield className="w-4 h-4" />
                                    Executive Command
                                </>
                            )}
                        </Link>
                        <DevProcessQueueButton />
                    </div>
                </div>

                {params.v === 'executive' ? (
                    <section className="bg-[#141414] rounded-[4rem] border border-white/5 overflow-hidden shadow-2xl">
                        <CommandCenter />
                    </section>
                ) : (
                    <>
                        {/* Library-first: show the grid immediately */}
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

                        {/* Advanced / Ops modules moved below the library */}
                        <section className="pt-8 md:pt-12">
                            <div className="flex items-center justify-between gap-6 mb-6">
                                <h3 className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.4em]">Advanced / Ops</h3>
                                <div className="h-px flex-1 bg-[#E7DED1]" />
                            </div>

                            <div className="space-y-20">
                                <section>
                                    <TrendForecaster />
                                </section>

                                <section className="bg-[#141414] rounded-[4rem] border border-white/5 relative overflow-hidden">
                                    <GlobalMesh />
                                </section>

                                <section className="bg-white p-16 rounded-[4rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)]">
                                    <AnomalyRouter />
                                </section>
                            </div>
                        </section>
                    </>
                )}

                <CopilotPanel />
            </div>
        </div>
    );
}
