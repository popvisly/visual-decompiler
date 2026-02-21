import { notFound } from 'next/navigation';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';
import { ArrowLeft, Share2, Loader2, Play } from 'lucide-react';
import AdList from '@/components/AdList';
import ShareBoard from '@/components/ShareBoard';
import CopilotPanel from '@/components/CopilotPanel';
import BenchmarkMap from '@/components/BenchmarkMap';
import BriefGenerator from '@/components/BriefGenerator';
import { AdDigest } from '@/types/digest';

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
        <div className="space-y-12 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/5">
                <div>
                    <nav className="flex items-center gap-2 mb-6">
                        <Link href="/dashboard/boards" className="text-[10px] font-bold text-txt-on-dark-muted uppercase tracking-widest hover:text-accent flex items-center gap-1 transition-colors">
                            <ArrowLeft className="w-3 h-3" /> All Boards
                        </Link>
                    </nav>
                    <h2 className="text-5xl font-light text-txt-on-dark tracking-tighter uppercase leading-[0.9]">{board.name}</h2>
                    <p className="text-sm text-txt-on-dark-muted mt-4 max-w-2xl leading-relaxed">{board.description || 'Manage and deconstruct this strategic collection.'}</p>
                </div>

                <div className="flex gap-4 no-print">
                    <ShareBoard token={board.sharing_token} boardName={board.name} />
                    <button className="flex items-center gap-2 px-6 py-2.5 bg-accent text-[#141414] rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-accent/90 transition-all shadow-lg shadow-accent/10">
                        <Play className="w-4 h-4" /> Presentation Mode
                    </button>
                </div>
            </div>

            {boardAds.length > 0 && (
                <section>
                    <BenchmarkMap
                        category={primaryCategory}
                        userStats={userStats}
                        categoryAverages={categoryAverages}
                    />
                </section>
            )}

            <section>
                <BriefGenerator boardId={id} boardName={board.name} />
            </section>

            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h3 className="text-[12px] font-bold text-txt-on-dark uppercase tracking-[0.15em]">Deconstructed Assets</h3>
                    <p className="text-[10px] text-txt-on-dark-muted font-bold uppercase tracking-[0.2em] opacity-40">Collection contents</p>
                </div>

                {/* We need a variant of AdList that filters for boardItems */}
                {/* For now, we'll use regular AdList and pass the boardId as a filter */}
                <AdList filters={{ board_id: id }} />
            </div>

            <CopilotPanel boardId={id} />
        </div>
    );
}
