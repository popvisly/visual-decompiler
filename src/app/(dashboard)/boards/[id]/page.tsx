import { notFound } from 'next/navigation';

import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

import BoardClientWorkspace from './board-client';

export const dynamic = 'force-dynamic';

export default async function BoardDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const { userId, orgId } = await getServerSession();

    if (!userId) {
        return notFound();
    }

    const { data: board } = await supabaseAdmin
        .from('boards')
        .select(`
            *,
            board_items (
                added_at,
                ad_id,
                asset_id,
                assets (
                    id,
                    file_url,
                    type,
                    brands ( name, market_sector ),
                    extractions ( primary_mechanic, confidence_score )
                ),
                ad_digests (
                    id,
                    media_url,
                    media_kind,
                    brand,
                    digest
                )
            )
        `)
        .eq('id', id)
        .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
        .single();

    if (!board) {
        return notFound();
    }

    const items = (board.board_items || []).map((item: any) => {
        if (item.assets) {
            const extraction = Array.isArray(item.assets.extractions) ? item.assets.extractions[0] : item.assets.extractions;
            return {
                id: item.assets.id,
                mediaUrl: item.assets.file_url,
                mediaKind: item.assets.type,
                brand: item.assets.brands?.name || 'Unknown',
                sector: item.assets.brands?.market_sector || 'Unclassified',
                primaryMechanic: extraction?.primary_mechanic || 'Awaiting Analysis',
                confidenceScore: extraction?.confidence_score || 0,
                href: `/asset/${item.assets.id}`,
                itemType: 'asset' as const,
            };
        }

        if (item.ad_digests) {
            return {
                id: item.ad_digests.id,
                mediaUrl: item.ad_digests.media_url,
                mediaKind: item.ad_digests.media_kind,
                brand: item.ad_digests.brand || 'Unknown',
                sector: 'Legacy Asset',
                primaryMechanic: item.ad_digests.digest?.classification?.trigger_mechanic || 'Legacy Extraction',
                confidenceScore: 0,
                href: `/report/${item.ad_digests.id}`,
                itemType: 'ad' as const,
            };
        }

        return null;
    }).filter(Boolean);

    return <BoardClientWorkspace board={board} items={items as any} />;
}
