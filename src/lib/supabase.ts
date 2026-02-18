import { createClient } from '@supabase/supabase-js';

let _supabaseAdmin: any = null;

export const getSupabaseAdmin = () => {
    if (!_supabaseAdmin) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

        if (!supabaseUrl || !supabaseServiceKey) {
            // In production, missing env should hard-fail (better than silently acting broken).
            if (process.env.NODE_ENV === 'production') {
                throw new Error('Supabase env vars missing: set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY');
            }

            // During build-time / local type-checking, env vars might be missing.
            // Return a lightweight mock so `next build` can succeed.
            console.warn('[Supabase] Warning: Environment variables missing. Returning mock client for build safety.');

            const empty = Promise.resolve({ data: [], error: null });
            return {
                from: () => ({
                    select: () => ({
                        eq: () => ({ order: () => empty }),
                        order: () => empty,
                    }),
                    insert: () => ({ select: () => ({ single: () => Promise.resolve({ data: { id: null }, error: null }) }) }),
                    update: () => ({ eq: () => ({ select: () => ({ single: () => Promise.resolve({ data: null, error: null }) }) }) }),
                    delete: () => ({ eq: () => Promise.resolve({ error: null }) }),
                }),
                rpc: () => Promise.resolve({ data: [], error: null }),
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
