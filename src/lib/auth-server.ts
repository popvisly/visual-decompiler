import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';

export async function getServerSession() {
    const cookieStore = await cookies();
    const token = cookieStore.get('sb-access-token')?.value;

    if (!token) {
        return { userId: null, orgId: null };
    }

    // Initialize a temporary client to verify the JWT
    // This is a lightweight verification. In a heavy prod environment,
    // we might use a cached session or the service role to verify the UID.
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
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
