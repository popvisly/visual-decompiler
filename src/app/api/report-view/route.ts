import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { reportId } = await req.json();

        if (!reportId) {
            return NextResponse.json({ error: 'Missing reportId' }, { status: 400 });
        }

        // De-dupe check using cookies (24 hours)
        const cookieStore = await cookies();
        const cookieKey = `viewed_${reportId}`;

        if (cookieStore.has(cookieKey)) {
            return NextResponse.json({ status: 'already_viewed' }, { status: 200 });
        }

        // Increment count in DB
        const { error } = await supabaseAdmin.rpc('increment_view_count', { row_id: reportId });

        if (error) {
            console.error('Failed to increment view count:', error);
            // Non-fatal, just swallow so client isn't affected
        }

        // Set cookie response
        const response = NextResponse.json({ status: 'view_recorded' }, { status: 200 });
        response.cookies.set({
            name: cookieKey,
            value: '1',
            maxAge: 60 * 60 * 24, // 24 hours
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: `/report/${reportId}` // Limit scope to this report
        });

        return response;

    } catch (e) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
