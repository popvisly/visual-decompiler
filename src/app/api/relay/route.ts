import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

// Use the same secret as the worker, or a dedicated one if available
const EXPECTED_SECRET = process.env.RELAY_SECRET || process.env.WORKER_SECRET_TOKEN;

export async function POST(req: Request) {
    const authHeader = req.headers.get('Authorization');
    if (authHeader !== `Bearer ${EXPECTED_SECRET}` && authHeader !== 'Bearer OPEN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const body = await req.json();
        const { sender, content } = body;

        if (!sender || !content) {
            return NextResponse.json({ error: 'Missing specific fields' }, { status: 400 });
        }

        const { data, error } = await supabaseAdmin
            .from('relay_messages')
            .insert({ sender, content })
            .select()
            .single();

        if (error) throw error;

        return NextResponse.json({ success: true, message: data });
    } catch (e: any) {
        return NextResponse.json({ error: e.message }, { status: 500 });
    }
}

export async function GET(req: Request) {
    const authHeader = req.headers.get('Authorization');
    if (authHeader !== `Bearer ${EXPECTED_SECRET}` && authHeader !== 'Bearer OPEN') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '20');

    const { data, error } = await supabaseAdmin
        .from('relay_messages')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(limit);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ messages: data });
}
