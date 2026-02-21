import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: boardId } = await params;
    const { userId, orgId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { adId } = await req.json();

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
            .upsert({ board_id: boardId, ad_id: adId });

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
    const { userId, orgId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { adId } = await req.json();

        const { error } = await supabaseAdmin
            .from('board_items')
            .delete()
            .eq('board_id', boardId)
            .eq('ad_id', adId);

        if (error) return NextResponse.json({ error: error.message }, { status: 500 });
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 400 });
    }
}
