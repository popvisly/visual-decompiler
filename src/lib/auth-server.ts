import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function getServerSession(req?: Request) {
    let tokenStr = '';

    if (req) {
        const authHeader = req.headers.get('authorization');
        if (authHeader?.startsWith('Bearer ')) {
             tokenStr = authHeader.split(' ')[1];
        }
    }

    if (!tokenStr) {
        const cookieStore = await cookies();
        tokenStr = cookieStore.get('sb-access-token')?.value || '';
    }

    if (!tokenStr) {
        return { userId: null, orgId: null };
    }

    // Initialize a temporary client to verify the JWT
    // This is a lightweight verification. In a heavy prod environment,
    // we might use a cached session or the service role to verify the UID.
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { user }, error } = await supabase.auth.getUser(tokenStr);

    if (error || !user) {
        console.error('[Auth Server] Failed to verify token:', error);
        return { userId: null, orgId: null };
    }

    // Map Supabase user ID to userId for legacy compatibility
    // Map user.id to orgId for now to maintain single-tenant logic
    return {
        userId: user.id,
        orgId: user.id,
        email: user.email
    };
}
