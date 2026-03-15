import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';
import CreateBoardModal from '@/components/CreateBoardModal';
import BoardCard from '@/components/BoardCard';

export const dynamic = 'force-dynamic';

export default async function BoardsPage() {
    const { userId, orgId } = await getServerSession();

    if (!userId) {
        return (
            <div className="min-h-screen bg-[#FBFBF6] text-[#1A1A1A] flex items-center justify-center font-mono text-xs uppercase tracking-widest">
                Unauthorized access to Sovereign Boards.
            </div>
        );
    }

    const { data: boards } = await supabaseAdmin
        .from('boards')
        .select(`
            *,
            board_items (
                asset_id,
                ad_id,
                assets ( id, file_url ),
                ad_digests ( id, media_url )
            )
        `)
        .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
        .order('created_at', { ascending: false })
        .limit(20);

    const safeBoards = (boards || []).map((board: any) => {
        const previewAssets = (board.board_items || [])
            .map((item: any) => {
                if (item.assets?.file_url) {
                    return {
                        id: item.assets.id,
                        imageUrl: item.assets.file_url,
                    };
                }

                if (item.ad_digests?.media_url) {
                    return {
                        id: item.ad_digests.id,
                        imageUrl: item.ad_digests.media_url,
                    };
                }

                return null;
            })
            .filter(Boolean);

        return {
            ...board,
            previewAssets,
            itemCount: board.board_items?.length || 0,
        };
    });

    return (
        <div className="min-h-screen bg-[#FBFBF6] text-[#1A1A1A] p-8 md:p-12">
            <header className="mb-16 flex flex-col gap-6 border-b border-[#D4A574]/15 pb-10 md:flex-row md:items-end md:justify-between">
                <div>
                    <h1 className="text-3xl lg:text-5xl font-sans tracking-tighter uppercase whitespace-nowrap overflow-hidden text-ellipsis">
                        Sovereign Boards
                    </h1>
                    <p className="mt-4 text-[#6B6B6B] font-mono text-xs tracking-widest uppercase">
                        Curated client intelligence & forensic collections
                    </p>
                </div>
                <CreateBoardModal />
            </header>

            {safeBoards.length === 0 ? (
                <div className="w-full aspect-video border border-dashed border-[#D4A574]/20 flex flex-col items-center justify-center gap-6 rounded-[2.5rem] bg-white">
                    <span className="text-[#6B6B6B] font-mono text-sm tracking-widest uppercase text-center max-w-md px-4 leading-relaxed">
                        No boards found.
                        <br /><br />
                        Create your first curated intelligence collection to organise vault assets around a client, campaign, or competitor landscape.
                    </span>
                    <CreateBoardModal />
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {safeBoards.map((board: any) => (
                        <BoardCard key={board.id} board={board} />
                    ))}
                </div>
            )}
        </div>
    );
}
