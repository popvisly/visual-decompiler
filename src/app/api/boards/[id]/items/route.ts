import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: boardId } = await params;
    const { userId, orgId } = await getServerSession();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { adId, assetId } = await req.json();

        if (!adId && !assetId) {
            return NextResponse.json({ error: 'Missing adId or assetId' }, { status: 400 });
        }

        // 1. Verify board accessibility
        const { data: board, error: boardErr } = await supabaseAdmin
            .from('boards')
            .select('id')
            .eq('id', boardId)
            .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
            .single();

        if (boardErr || !board) {
            return NextResponse.json({ error: 'Board not found or inaccessible' }, { status: 404 });
        }

        // 2. Add item
        const { error: itemErr } = await supabaseAdmin
            .from('board_items')
            .upsert(
                {
                    board_id: boardId,
                    ad_id: adId || null,
                    asset_id: assetId || null,
                },
                {
                    onConflict: assetId ? 'board_id,asset_id' : 'board_id,ad_id',
                }
            );

        if (itemErr) return NextResponse.json({ error: itemErr.message }, { status: 500 });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: boardId } = await params;
    const { userId, orgId } = await getServerSession();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { adId, assetId } = await req.json();

        const { data: board, error: boardErr } = await supabaseAdmin
            .from('boards')
            .select('id')
            .eq('id', boardId)
            .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
            .single();

        if (boardErr || !board) {
            return NextResponse.json({ error: 'Board not found or inaccessible' }, { status: 404 });
        }

        let query = supabaseAdmin
            .from('board_items')
            .delete()
            .eq('board_id', boardId);

        if (assetId) {
            query = query.eq('asset_id', assetId);
        } else if (adId) {
            query = query.eq('ad_id', adId);
        } else {
            return NextResponse.json({ error: 'Missing adId or assetId' }, { status: 400 });
        }

        const { error } = await query;

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
