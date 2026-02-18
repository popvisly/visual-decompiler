
import { supabaseAdmin } from './src/lib/supabase.ts';

async function checkSchema() {
    const { data, error } = await supabaseAdmin
        .from('ad_digests')
        .select('*')
        .limit(1);

    if (error) {
        console.error('Error fetching data:', error.message);
        return;
    }

    if (data && data.length > 0) {
        const hasBrand = 'brand' in data[0];
        console.log(`Column 'brand' exists: ${hasBrand}`);
        if (hasBrand) {
            console.log('Sample data:', data[0]);
        }
    } else {
        console.log('No data in ad_digests table to check columns.');
        // Try to get column names via RPC or information_schema if possible, 
        // but Supabase usually doesn't allow direct information_schema access via client.
        // We'll just assume it's missing if we can't see it in a select *
    }
}

checkSchema();
