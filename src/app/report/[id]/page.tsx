import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase';
import { AdDigest } from '@/types/digest';
import ResultsView from '@/components/ResultsView';

export const dynamic = 'force-dynamic';

export default async function SharedReportPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;

    const { data: ad, error } = await supabaseAdmin
        .from('ad_digests')
        .select('*')
        .eq('id', id)
        .single();

    if (error || !ad) notFound();

    const digest = ad.digest as AdDigest;

    return (
        <div className="relative min-h-screen bg-[#F6F1E7] text-[#141414] font-sans pb-20">
            {/* Bone Grid Background */}
            <div className="pointer-events-none fixed inset-0 opacity-[0.55] [background-image:linear-gradient(rgba(20,20,20,0.028)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.028)_1px,transparent_1px)] [background-size:48px_48px] z-0" />

            <div className="relative z-10 w-full max-w-6xl mx-auto pt-8">
                {/* Header Strip */}
                <header className="px-6 mb-8 mt-2">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full border border-[#E7DED1] bg-[#F2EBDD] flex items-center justify-center font-bold text-[#141414] text-xs shadow-sm">
                            D
                        </div>
                        <div className="leading-none text-left">
                            <div className="text-[12px] font-semibold tracking-[0.14em] uppercase text-[#141414]">
                                Decompiler
                            </div>
                            <div className="mt-0.5 text-[10px] tracking-[0.18em] uppercase text-[#6B6B6B]">
                                Shared Intelligence Report
                            </div>
                        </div>
                    </div>
                </header>

                <main className="px-6">
                    <ResultsView
                        id={ad.id}
                        mediaUrl={ad.media_url}
                        mediaKind={ad.media_kind}
                        digest={digest}
                        brand={ad.brand}
                        accessLevel="full"
                        isSharedView={true}
                    />
                </main>
            </div>

            <div className="mt-20 text-center relative z-10">
                <a href="/" className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#FBF7EF]/80 border border-[#E7DED1] backdrop-blur-sm hover:bg-white hover:border-[#D8CCBC] hover:shadow-[0_10px_30px_rgba(20,20,20,0.05)] transition-all">
                    <span className="text-[12px] font-medium text-[#141414]/70 group-hover:text-[#141414]">Powered by Decompiler</span>
                    <span className="text-[#141414]/30 group-hover:text-[#141414]/60">→</span>
                </a>
            </div>
        </div>
    );
}
