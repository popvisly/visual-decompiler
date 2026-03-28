import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';
import CreateBoardModal from '@/components/CreateBoardModal';
import BoardCard from '@/components/BoardCard';
import { BOARD_TEMPLATES } from '@/lib/board-templates';

export const dynamic = 'force-dynamic';

export default async function BoardsPage() {
    const { userId, orgId } = await getServerSession();

    if (!userId) {
        return (
            <div className="relative flex min-h-screen items-center justify-center bg-[#FBFBF6] text-[#1A1A1A] font-mono text-xs uppercase tracking-widest">
                <div className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:48px_48px]" />
                <div className="relative z-10">Unauthorized access to Sovereign Boards.</div>
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
        .is('archived_at', null)
        .order('created_at', { ascending: false })
        .limit(20);

    const { count: vaultAssetCount } = await supabaseAdmin
        .from('assets')
        .select('id', { count: 'exact', head: true });

    const hasVaultShortlist = (vaultAssetCount || 0) > 0;

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
        <div className="relative min-h-screen bg-[#FBFBF6] p-8 text-[#1A1A1A] md:p-12">
            <div className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:48px_48px]" />
            <div className="relative z-10">
            <header className="mb-16 flex flex-col gap-6 border-b border-[#D4A574]/18 pb-8 md:flex-row md:items-end md:justify-between">
                <div>
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Sovereign Boards</p>
                    <h1 className="mt-4 text-4xl font-light uppercase tracking-tight text-[#1A1A1A] md:text-6xl">
                        Board Collections
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#6B6B6B]">
                        Curate grouped intelligence, pitch-ready collections, and client-facing strategic clusters from assets already secured in the vault.
                    </p>
                </div>
                <CreateBoardModal />
            </header>

            {safeBoards.length === 0 ? (
                <div className="w-full rounded-[2.5rem] border border-[#D4A574]/15 bg-white px-6 py-12 md:px-10 md:py-14">
                    <div className="mx-auto max-w-4xl text-center">
                        <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#C1A67B]">Boards</p>
                        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#1A1A1A] md:text-5xl">
                            No boards yet
                        </h2>
                        <p className="mx-auto mt-5 max-w-2xl text-[15px] leading-7 text-[#5E5A53] md:text-base">
                            Start your first curated intelligence collection to group vault assets by client, campaign, or competitor landscape.
                        </p>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8A7B64]">
                            Boards turn one-off analyses into reusable strategic memory.
                        </p>

                        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:flex-wrap">
                            <CreateBoardModal triggerLabel="Create Board" />
                            {hasVaultShortlist ? (
                                <a
                                    href="/vault"
                                    className="inline-flex items-center justify-center rounded-full border border-[#D8CCB5] px-6 py-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#7D6748] transition-colors hover:border-[#C8B08D] hover:text-[#141414]"
                                >
                                    Create from Vault Shortlist
                                </a>
                            ) : (
                                <CreateBoardModal
                                    triggerLabel="Create from Vault Shortlist"
                                    variant="secondary"
                                    disabled={true}
                                    disabledReason="Build a shortlist in Vault first."
                                />
                            )}
                        </div>

                        <div className="mt-10 grid gap-3 md:grid-cols-3">
                            {BOARD_TEMPLATES.map((template) => (
                                <CreateBoardModal
                                    key={template.key}
                                    triggerLabel={template.triggerLabel}
                                    preset={template}
                                    variant="template"
                                />
                            ))}
                        </div>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {safeBoards.map((board: any) => (
                        <BoardCard key={board.id} board={board} />
                    ))}
                </div>
            )}
            </div>
        </div>
    );
}
