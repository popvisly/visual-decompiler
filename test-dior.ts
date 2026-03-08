import { supabaseAdmin } from './src/lib/supabase';
async function test() {
   const res = await supabaseAdmin.from('extractions').select('*').order('created_at', { ascending: false }).limit(2);
   console.log(JSON.stringify(res.data, null, 2));
}
test();
