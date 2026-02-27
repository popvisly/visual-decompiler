import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function DELETE(req: Request) {
    try {
        const { userId, orgId } = await auth();

        if (!userId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const body = await req.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return new NextResponse('Bad Request: Missing or invalid ids array', { status: 400 });
        }

        // We only delete from the `ad_digests` table representing the ad. Let Supabase cascade handle related table cleanup if any, though ad_digests is currently the main hub.
        const { error } = await supabaseAdmin
            .from('ad_digests')
            .delete()
            .in('id', ids);

        if (error) {
            console.error('Error deleting ads:', error);
            return new NextResponse(error.message, { status: 500 });
        }

        return NextResponse.json({ success: true, deletedCount: ids.length });
    } catch (error) {
        console.error('Error in bulk delete endpoint:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
