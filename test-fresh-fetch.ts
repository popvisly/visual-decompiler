import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });
const supabaseAdmin = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
async function main() {
    let { data: asset, error } = await supabaseAdmin
        .from('assets')
        .select(`
      *,
      brand:brands ( name, market_sector ),
      extraction:extractions ( * )
    `)
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
    
    console.log("Error:", error);
    console.log("Asset:", JSON.stringify(asset, null, 2));
}
main();
