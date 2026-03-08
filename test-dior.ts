import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
async function main() {
    const { data: a } = await supabaseAdmin.from('assets').select('*, brand:brands(name, market_sector), extraction:extractions(*)').order('created_at', { ascending: false }).limit(2);
    console.log("V2 ASSETS:");
    console.log(JSON.stringify(a, null, 2));

    const { data: b } = await supabaseAdmin.from('ad_digests').select('id, status, brand, created_at, digest').order('created_at', { ascending: false }).limit(2);
    console.log("\nV1 AD_DIGESTS:");
    console.log(JSON.stringify(b, null, 2));
}
main();
