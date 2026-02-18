import { createClient } from '@supabase/supabase-js';

let _supabaseAdmin: any = null;

export const getSupabaseAdmin = () => {
    if (!_supabaseAdmin) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            // During build, we might not have these. If we try to use them at runtime without them,
            // we'll fail anyway, but this prevents the build from crashing during static analysis.
            throw new Error('Supabase environment variables are missing.');
        }

        _supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
    }
    return _supabaseAdmin;
};

// For backward compatibility and ease of use in existing code
export const supabaseAdmin = new Proxy({} as any, {
    get: (target, prop) => {
        return (getSupabaseAdmin() as any)[prop];
    }
});
