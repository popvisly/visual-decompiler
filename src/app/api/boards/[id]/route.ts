import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function DELETE(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { userId, orgId } = await auth();
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
