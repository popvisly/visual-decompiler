import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { userId, orgId } = await getServerSession(req);
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    try {
        const { name, description, archive } = await req.json();

        const { data: board, error: checkError } = await supabaseAdmin
            .from('boards')
            .select('id')
            .eq('id', id)
            .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
            .single();

        if (checkError || !board) {
            return NextResponse.json({ error: 'Not found or permission denied' }, { status: 404 });
        }

        const payload: Record<string, unknown> = {};

        if (typeof name === 'string') {
            payload.name = name.trim().slice(0, 120) || 'Untitled Board';
        }

        if (typeof description === 'string') {
            payload.description = description.trim().slice(0, 500);
        }

        if (typeof archive === 'boolean') {
            payload.archived_at = archive ? new Date().toISOString() : null;
        }

        const { data: updatedBoard, error: updateError } = await supabaseAdmin
            .from('boards')
            .update(payload)
            .eq('id', id)
            .select('*')
            .single();

        if (updateError || !updatedBoard) {
            return NextResponse.json({ error: updateError?.message || 'Failed to update board' }, { status: 500 });
        }

        return NextResponse.json(updatedBoard);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { userId, orgId } = await getServerSession();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { id } = await params;

    try {
        // Ownership check
        const { data: board, error: checkError } = await supabaseAdmin
            .from('boards')
            .select('*')
            .eq('id', id)
            .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`)
            .single();

        if (checkError || !board) {
            return NextResponse.json({ error: 'Not found or permission denied' }, { status: 404 });
        }

        // Delete the board (cascade will handle board_items depending on schema, but safe to just delete board)
        const { error: deleteError } = await supabaseAdmin
            .from('boards')
            .delete()
            .eq('id', id);

        if (deleteError) throw deleteError;

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
