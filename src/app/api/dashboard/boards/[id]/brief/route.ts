import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { userId, orgId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { id } = await params;
        const { briefText } = await req.json();

        const { error } = await supabaseAdmin
            .from('boards')
            .update({ client_brief_text: briefText })
            .eq('id', id)
            .or(`user_id.eq.${userId}${orgId ? `,org_id.eq.${orgId}` : ''}`);

        if (error) throw error;

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
