import { Suspense } from 'react';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';
import Header from '@/components/Header';
import { LayoutGrid, Folder, Plus, ArrowRight, Loader2 } from 'lucide-react';

export const dynamic = 'force-dynamic';

async function BoardsList() {
    const { userId, orgId } = await auth();
    if (!userId) return null;

    const { data: boards, error } = await supabaseAdmin
        .from('boards')
        .select(`
            *,
            board_items(count)
        `)
        .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
        .order('created_at', { ascending: false });

    if (error) return <div className="text-red-400">Error loading boards: {error.message}</div>;

    if (!boards || boards.length === 0) {
        return (
            <div className="text-center py-20 bg-surface rounded-3xl border border-white/5 shadow-2xl">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <LayoutGrid className="w-8 h-8 text-txt-on-dark-muted" />
                </div>
                <h3 className="text-xl font-light text-txt-on-dark uppercase tracking-tight mb-2">No Strategic Boards yet</h3>
                <p className="text-txt-on-dark-muted text-sm max-w-xs mx-auto mb-8">
                    Organize your competitive intelligence into custom collections and presentation-ready boards.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {boards.map((board: any) => (
                <Link
                    key={board.id}
                    href={`/dashboard/boards/${board.id}`}
                    className="group bg-surface p-6 rounded-3xl border border-white/5 hover:border-accent/40 transition-all flex flex-col h-full shadow-lg"
                >
                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center group-hover:bg-accent/10 transition-colors">
                            <Folder className="w-6 h-6 text-txt-on-dark-muted group-hover:text-accent transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold text-txt-on-dark-muted uppercase tracking-[0.2em] bg-white/5 px-3 py-1 rounded-full">
                            {board.board_items?.[0]?.count || 0} ITEMS
                        </span>
                    </div>

                    <h3 className="text-xl font-light text-txt-on-dark uppercase tracking-tight mb-2 group-hover:text-accent transition-colors">
                        {board.name}
                    </h3>
                    <p className="text-sm text-txt-on-dark-muted leading-relaxed line-clamp-2 mb-8 flex-1">
                        {board.description || 'No description provided.'}
                    </p>

                    <div className="flex items-center gap-2 text-[10px] font-bold text-accent uppercase tracking-widest mt-auto opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                        Explore Strategy <ArrowRight className="w-3 h-3" />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default function BoardsPage() {
    return (
        <div className="space-y-12 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/5">
                <div>
                    <h2 className="text-5xl font-light text-txt-on-dark tracking-tighter uppercase leading-[0.9]">Strategic Boards</h2>
                    <p className="text-[10px] text-txt-on-dark-muted mt-3 font-bold tracking-[0.2em] uppercase">Private & Team Collections</p>
                </div>
            </div>

            <Suspense fallback={
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 text-accent animate-spin" />
                </div>
            }>
                <BoardsList />
            </Suspense>
        </div>
    );
}
