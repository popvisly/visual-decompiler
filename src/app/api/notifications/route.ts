import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
    const { orgId } = await getServerSession();
    if (!orgId) return NextResponse.json({ error: 'Org context required' }, { status: 400 });

    try {
        const { data, error } = await supabaseAdmin
            .from('notifications')
            .select('*')
            .eq('org_id', orgId)
            .order('created_at', { ascending: false })
            .limit(20);

        if (error) throw error;
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    const { orgId } = await getServerSession();
    if (!orgId) return NextResponse.json({ error: 'Org context required' }, { status: 400 });

    try {
        const { id } = await req.json();

        // Mark specific notification as read, or all if no id provided
        const query = supabaseAdmin
            .from('notifications')
            .update({ read: true })
            .eq('org_id', orgId);

        if (id) {
            query.eq('id', id);
        } else {
            query.eq('read', false);
        }

        const { error } = await query;
        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
