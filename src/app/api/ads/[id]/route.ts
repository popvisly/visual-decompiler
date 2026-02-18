import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const body = await req.json();

    // Only allow updating the brand tag for now
    const { brand } = body;
    if (typeof brand !== 'string') {
        return NextResponse.json({ error: 'brand must be a string' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
        .from('ad_digests')
        .update({ brand: brand.trim() || null })
        .eq('id', id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, id, brand: brand.trim() || null });
}
