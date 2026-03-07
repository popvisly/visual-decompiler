import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
    const { orgId } = await getServerSession();
    if (!orgId) return NextResponse.json({ error: 'Org context required' }, { status: 400 });

    try {
        const { data, error } = await supabaseAdmin
            .from('profiles')
            .select('*')
            .eq('org_id', orgId)
            .order('name', { ascending: true });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { orgId, userId: currentUserId } = await getServerSession();
    if (!orgId || !currentUserId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        const { user_id, email, name, role, avatar_url } = body;

        // In a real app, you'd check if the currentUserId is an admin of the org

        const { data, error } = await supabaseAdmin
            .from('profiles')
            .upsert({
                user_id,
                org_id: orgId,
                email,
                name,
                role: role || 'member',
                avatar_url,
                updated_at: new Date().toISOString()
            })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
