import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
    const { orgId } = await getServerSession();
    if (!orgId) return NextResponse.json({ error: 'Org context required' }, { status: 400 });

    try {
        const { data, error } = await supabaseAdmin
            .from('org_settings')
            .select('*')
            .eq('org_id', orgId)
            .single();

        return NextResponse.json(data || { org_id: orgId });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    const { orgId, userId } = await getServerSession();
    if (!orgId || !userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const body = await req.json();
        const { logo_url, primary_color, white_label_enabled, custom_domain, agency_name } = body;

        const { data, error } = await supabaseAdmin
            .from('org_settings')
            .upsert({
                org_id: orgId,
                logo_url,
                primary_color,
                white_label_enabled,
                custom_domain,
                agency_name,
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
