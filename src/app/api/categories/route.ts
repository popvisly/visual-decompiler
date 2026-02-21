import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('ad_digests')
            .select('digest')
            .eq('status', 'processed');

        if (error) throw error;

        const categories = Array.from(new Set(
            data?.map((ad: any) => ad.digest?.meta?.product_category_guess).filter(Boolean)
        )).sort();

        return NextResponse.json({ categories });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
