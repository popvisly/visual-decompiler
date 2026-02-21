import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET() {
    try {
        const { data, error } = await supabaseAdmin
            .from('global_strategic_patterns')
            .select('*')
            .limit(100);

        if (error) throw error;

        return NextResponse.json({ patterns: data });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
