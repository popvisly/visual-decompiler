import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const slug = searchParams.get('slug');

    if (!slug) return NextResponse.json({ error: 'Slug required' }, { status: 400 });

    try {
        const { data, error } = await supabaseAdmin
            .from('client_feedback')
            .select('*')
            .eq('shared_link_slug', slug)
            .order('created_at', { ascending: false });

        if (error) throw error;
        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { slug, clientName, content, feedbackType } = body;

        if (!slug || !clientName || !content) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Save Feedback
        const { data, error } = await supabaseAdmin
            .from('client_feedback')
            .insert({
                shared_link_slug: slug,
                client_name: clientName,
                content: content,
                feedback_type: feedbackType || 'comment'
            })
            .select()
            .single();

        if (error) throw error;

        // 2. Trigger Agency Notification
        try {
            const { data: link } = await supabaseAdmin
                .from('shared_links')
                .select('org_id, board_id, ad_digest_id')
                .eq('slug', slug)
                .single();

            if (link) {
                const typeLabel = feedbackType === 'remix_request' ? 'REMIX REQUEST' : 'NEW DELIBERATION';
                await supabaseAdmin
                    .from('notifications')
                    .insert({
                        org_id: link.org_id,
                        title: `${typeLabel} from ${clientName}`,
                        message: content.substring(0, 100) + (content.length > 100 ? '...' : ''),
                        link: link.board_id ? `/dashboard/boards/${link.board_id}` : `/dashboard/discovery`
                    });
            }
        } catch (notifyErr) {
            console.error('Notification failed:', notifyErr);
        }

        return NextResponse.json(data);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
