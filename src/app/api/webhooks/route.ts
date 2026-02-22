import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
    const { userId, orgId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        // In a true multi-tenant system, we'd filter by orgId if present
        // or just by userId if we add that column. 
        // For now, mirroring the boards/settings logic or project context.
        const { data, error } = await supabaseAdmin
            .from('webhooks')
            .select('*')
            .eq('org_id', orgId || userId);

        if (error) throw error;
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { userId, orgId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { url, event_types, secret_token } = await req.json();
        if (!url) throw new Error('URL is required');

        const { data, error } = await supabaseAdmin
            .from('webhooks')
            .insert({
                org_id: orgId || userId,
                url,
                event_types: event_types || ['analysis_complete', 'strategic_anomaly'],
                secret_token: secret_token || Math.random().toString(36).substring(2, 15),
                is_active: true
            })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    const { userId, orgId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

    try {
        const { error } = await supabaseAdmin
            .from('webhooks')
            .delete()
            .eq('id', id)
            .eq('org_id', orgId || userId);

        if (error) throw error;
        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
