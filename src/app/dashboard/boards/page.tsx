import { Suspense } from 'react';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';
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

    if (error) return <div className="text-red-500 font-bold uppercase tracking-widest text-[10px]">Error loading boards: {error.message}</div>;

    if (!boards || boards.length === 0) {
        return (
            <div className="text-center py-32 bg-white rounded-[3rem] border border-[#E7DED1] shadow-[0_40px_100px_rgba(20,20,20,0.03)] border-dashed">
                <div className="w-20 h-20 bg-[#FBF7EF] rounded-[2rem] flex items-center justify-center mx-auto mb-8 border border-[#E7DED1]">
                    <LayoutGrid className="w-10 h-10 text-[#6B6B6B]/20" />
                </div>
                <h3 className="text-2xl font-light text-[#141414] uppercase tracking-tight mb-4">No Strategic Collections</h3>
                <p className="text-[#6B6B6B] text-[11px] font-bold uppercase tracking-widest max-w-sm mx-auto mb-10 opacity-60">
                    Organize deconstructions into custom agency boards and client-ready portfolios.
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {boards.map((board: any) => (
                <Link
                    key={board.id}
                    href={`/dashboard/boards/${board.id}`}
                    className="group bg-white p-10 rounded-[3rem] border border-[#E7DED1] hover:border-[#BB9E7B] transition-all flex flex-col h-full shadow-[0_20px_60px_rgba(20,20,20,0.02)] hover:shadow-[0_40px_100px_rgba(187,158,123,0.1)] hover:-translate-y-1"
                >
                    <div className="flex justify-between items-start mb-10">
                        <div className="w-16 h-16 bg-[#FBF7EF] rounded-[2rem] flex items-center justify-center group-hover:bg-[#141414] transition-all duration-500 shadow-inner">
                            <Folder className="w-8 h-8 text-[#BB9E7B] group-hover:text-accent transition-colors" />
                        </div>
                        <span className="text-[10px] font-bold text-[#6B6B6B] uppercase tracking-[0.3em] bg-[#FBF7EF] px-4 py-2 rounded-full border border-[#E7DED1]">
                            {board.board_items?.[0]?.count || 0} Assets
                        </span>
                    </div>

                    <h3 className="text-2xl font-light text-[#141414] uppercase tracking-tight mb-4 group-hover:text-[#BB9E7B] transition-colors leading-[0.9]">
                        {board.name}
                    </h3>
                    <p className="text-[11px] text-[#6B6B6B] font-medium leading-relaxed line-clamp-2 mb-10 flex-1 uppercase tracking-tight opacity-70">
                        {board.description || 'Deconstructing a strategic pattern collection.'}
                    </p>

                    <div className="flex items-center gap-3 text-[10px] font-bold text-[#141414] uppercase tracking-[0.3em] mt-auto opacity-0 group-hover:opacity-100 transition-all translate-x-[-10px] group-hover:translate-x-0">
                        Open Strategy <ArrowRight className="w-4 h-4 text-[#BB9E7B]" />
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default function BoardsPage() {
    return (
        <div className="space-y-16 py-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-16 border-b border-[#E7DED1]">
                <div>
                    <h2 className="text-7xl font-light text-[#141414] tracking-tightest uppercase leading-[0.85] select-none">
                        Strategic<br />
                        <span className="text-[#6B6B6B]/30">Boards</span>
                    </h2>
                    <p className="text-[12px] text-[#6B6B6B] mt-6 font-bold tracking-[0.3em] uppercase">Private & Team Collections / Knowledge Bases</p>
                </div>
            </div>

            <Suspense fallback={
                <div className="flex flex-col items-center justify-center py-40 space-y-8">
                    <div className="flex gap-1.5">
                        {[0, 1, 2].map(i => (
                            <div key={i} className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: `${i * 0.2}s` }} />
                        ))}
                    </div>
                </div>
            }>
                <BoardsList />
            </Suspense>
        </div>
    );
}
