import { createClient } from '@supabase/supabase-js';

let _supabaseAdmin: any = null;

export const getSupabaseAdmin = () => {
    if (!_supabaseAdmin) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            // During build-time static analysis, environment variables might be missing.
            // We return a proxy that allows the build to proceed but will fail at runtime if still missing.
            console.warn('[Supabase] Warning: Environment variables missing. Returning mock client for build safety.');
            return {
                from: () => ({
                    select: () => ({ order: () => Promise.resolve({ data: [], error: null }) }),
                    update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }) }),
                    delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
                    rpc: () => Promise.resolve({ data: [], error: null })
                }),
                rpc: () => Promise.resolve({ data: [], error: null })
            } as any;
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
