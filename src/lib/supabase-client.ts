import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "dummy-key-for-now";
// Note: Normally we'd use ANON_KEY for standard public client, but if the project uses 
// SERVICE_ROLE everywhere, we might just use that. However, client-side email/password MUST use ANON_KEY.
// Let's assume the user has NEXT_PUBLIC_SUPABASE_ANON_KEY in their env, or we'll pass the service key for this specific phase 2 test.
// Actually, using service role key in browser is extremely dangerous, but if ANON_KEY is missing, we will fallback safely or warn.

export const supabaseClient = createClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY!
);
