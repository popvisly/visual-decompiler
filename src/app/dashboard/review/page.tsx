import { supabaseAdmin } from '@/lib/supabase';
import JSONEditor from '@/components/JSONEditor';
import { AdDigest } from '@/types/digest';
import Link from 'next/link';
import { ChevronLeft, AlertCircle } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default async function ReviewPage() {
    // Fetch all items needing review
    const { data: ads, error } = await supabaseAdmin
        .from('ad_digests')
        .select('*')
        .eq('status', 'needs_review')
        .order('created_at', { ascending: false });

    if (error) return <div className="p-20 text-red-500">Error: {error.message}</div>;

    return (
        <main className="min-h-screen bg-slate-950 text-slate-100">
            <header className="border-b border-slate-900 bg-slate-950/50 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/dashboard" className="p-2 hover:bg-slate-900 rounded-lg transition-colors">
                            <ChevronLeft className="w-4 h-4 text-slate-400" />
                        </Link>
                        <div>
                            <h1 className="text-sm font-bold tracking-tight">Intelligence Review</h1>
                            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-widest">Data correction & deconstruction refinement</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                            <AlertCircle className="w-3 h-3 text-amber-500" />
                            <span className="text-[10px] font-bold text-amber-500 uppercase">{ads?.length || 0} Pending Review</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-12">
                {!ads || ads.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-32 bg-slate-900/20 border border-dashed border-slate-800 rounded-3xl">
                        <p className="text-slate-500 font-medium">Clear of alerts. All intelligence is validated.</p>
                    </div>
                ) : (
                    <div className="space-y-24">
                        {ads.map((ad: any) => (
                            <div key={ad.id} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <div className="aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl border border-slate-800 relative">
                                        {ad.media_kind === 'video' ? (
                                            <video src={ad.media_url} controls className="w-full h-full object-contain" />
                                        ) : (
                                            <img src={ad.media_url} className="w-full h-full object-contain" />
                                        )}
                                        <div className="absolute top-4 right-4">
                                            <span className="px-3 py-1 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-bold text-slate-300 border border-slate-700 uppercase tracking-widest">
                                                {ad.media_kind}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-3xl">
                                        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Diagnostics / Evidence</h3>
                                        <div className="space-y-3">
                                            {(ad.digest as any).diagnostics?.failure_modes?.map((mode: string, i: number) => (
                                                <div key={i} className="flex items-center gap-3 text-rose-300 bg-rose-500/5 px-4 py-2 rounded-xl border border-rose-500/10">
                                                    <div className="w-1 h-1 rounded-full bg-rose-500" />
                                                    <span className="text-[10px] font-medium leading-none">{mode}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex flex-col">
                                    <JSONEditor id={ad.id} initialValue={ad.digest} />
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
