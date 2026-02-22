import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft, Share2, Loader2, Play, Sparkles } from 'lucide-react';
import AdList from '@/components/AdList';
import ShareBoard from '@/components/ShareBoard';
import CopilotPanel from '@/components/CopilotPanel';
import BenchmarkMap from '@/components/BenchmarkMap';
import BriefGenerator from '@/components/BriefGenerator';
import BriefIngest from '@/components/BriefIngest';
import BoardPresentationTrigger from '@/components/BoardPresentationTrigger';
import { AdDigest } from '@/types/digest';
import CategoryBenchmark from '@/components/CategoryBenchmark';
import StressTestPanel from '@/components/StressTestPanel';

export const dynamic = 'force-dynamic';

export default async function BoardDetailPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const { userId, orgId } = await auth();
    if (!userId) notFound();

    const { data: board, error: boardError } = await supabaseAdmin
        .from('boards')
        .select('*')
        .eq('id', id)
        .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
        .single();

    if (boardError || !board) notFound();

    // -- Benchmark Aggregation --
    const { data: boardItems } = await supabaseAdmin
        .from('board_items')
        .select(`ad_digests(digest)`)
        .eq('board_id', id);

    const boardAds = boardItems?.map((i: any) => i.ad_digests.digest as AdDigest) || [];

    // 1. Get Board Stats
    const boardTriggers: Record<string, number> = {};
    boardAds.forEach((d: AdDigest) => {
        const t = d.classification?.trigger_mechanic;
        if (t) boardTriggers[t] = (boardTriggers[t] || 0) + 1;
    });
    const userStats = Object.entries(boardTriggers).map(([key, val]) => ({
        key,
        percentage: (val / boardAds.length) * 100
    }));

    const primaryCategory = boardAds[0]?.meta?.product_category_guess || 'All';
    const { data: catAds } = await supabaseAdmin
        .from('ad_digests')
        .select('digest')
        .eq('status', 'processed')
        .filter('digest->meta->>product_category_guess', 'eq', primaryCategory);

    const catTriggers: Record<string, number> = {};
    (catAds || []).forEach((ad: any) => {
        const t = ad.digest?.classification?.trigger_mechanic;
        if (t) catTriggers[t] = (catTriggers[t] || 0) + 1;
    });
    const categoryAverages = Object.entries(catTriggers).map(([key, val]) => ({
        key,
        percentage: (val / (catAds?.length || 1)) * 100
    }));

    return (
        <div className="space-y-20 py-12">
            {/* Header - Editorial Style */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 pb-16 border-b border-[#E7DED1]">
                <div>
                    <nav className="flex items-center gap-2 mb-10">
                        <Link href="/dashboard/boards" className="text-[11px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] hover:text-[#141414] flex items-center gap-2 transition-all group">
                            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                            Back to Collection
                        </Link>
                    </nav>
                    <h2 className="text-7xl font-light text-[#141414] tracking-tightest uppercase leading-[0.85] select-none">
                        {board.name.split(' ').slice(0, -1).join(' ')}<br />
                        <span className="text-[#6B6B6B]/30">{board.name.split(' ').pop()}</span>
                    </h2>
                    <p className="text-[12px] text-[#6B6B6B] mt-10 max-w-2xl font-bold tracking-[0.2em] uppercase leading-relaxed">
                        {board.description || 'Deconstructing a strategic pattern collection.'}
                    </p>
                </div>

                <div className="flex gap-4 no-print">
                    <ShareBoard boardId={id} boardName={board.name} />
                    <BoardPresentationTrigger
                        boardName={board.name}
                        strategicAnswer={board.strategic_answer?.content || null}
                        stats={userStats}
                        sentiment={board.strategic_answer?.sentiment || null}
                    />
                </div>
            </div>


            {boardAds.length > 0 && (
                <>
                    <section className="bg-white p-16 rounded-[4rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)]">
                        <CategoryBenchmark boardId={id} />
                    </section>

                    <section className="bg-white p-16 rounded-[4rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)]">
                        <StressTestPanel boardId={id} />
                    </section>
                </>
            )}

            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                <BriefIngest
                    boardId={id}
                    initialBrief={board.client_brief_text}
                />
                <BriefGenerator
                    boardId={id}
                    boardName={board.name}
                    initialBrief={board.strategic_answer || board.last_brief}
                    initialWhitePaper={board.white_paper}
                    sampleAd={boardItems?.[0]?.ad_digests}
                />
            </section>

            <div className="space-y-12">
                <div className="flex items-center justify-between px-4">
                    <h3 className="text-[13px] font-bold text-[#141414] uppercase tracking-[0.3em]">Tactical Inventory</h3>
                    <p className="text-[10px] text-[#6B6B6B] font-bold uppercase tracking-[0.4em] opacity-40">Deconstructed assets</p>
                </div>

                <AdList filters={{ board_id: id }} />
            </div>

            <CopilotPanel boardId={id} />
        </div>
    );
}
