import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { auth } from '@clerk/nextjs/server';

export async function GET(req: Request, { params }: { params: any }) {
    const { id } = await params;
    try {
        const { data, error } = await supabaseAdmin
            .from('video_annotations')
            .select('*')
            .eq('ad_id', id)
            .order('t_ms', { ascending: true });

        if (error) throw error;
        return NextResponse.json({ pins: data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request, { params }: { params: any }) {
    const { id } = await params;
    const { userId, orgId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { t_ms, note } = await req.json();
        const { data, error } = await supabaseAdmin
            .from('video_annotations')
            .insert({
                ad_id: id,
                user_id: userId,
                org_id: orgId,
                t_ms,
                note
            })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json({ pin: data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
