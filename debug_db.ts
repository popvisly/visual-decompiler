import { getSupabaseAdmin } from './src/lib/supabase';

async function debug() {
    console.log('--- SCHEMA CHECK START ---');
    try {
        const supabase = getSupabaseAdmin();
        if (!supabase) return;
        
        const { data: schema, error } = await supabase.rpc('get_table_info', { table_name: 'extractions' });
        // RPC might not exist, so let's try a direct query on pg_catalog if we had permissions, 
        // but since we are using supabase-js, let's just try to insert a duplicate and see what happens?
        // No, let's just try to select some metadata.
        
        console.log('--- TRYING TO INFER CONSTRAINTS ---');
        // If we can't get schema directly, we can check if asset_id is unique by looking at existing data
        const { data: countData } = await supabase.from('extractions').select('asset_id');
        const ids = countData?.map((d: any) => d.asset_id) || [];
        const uniqueIds = new Set(ids);
        console.log(`Total count: ${ids.length}, Unique count: ${uniqueIds.size}`);
        
        if (ids.length === uniqueIds.size) {
            console.log('asset_id appears to be unique or no data yet.');
        }

    } catch (e) {
        console.error('Catch Error:', e);
    }
}

debug();
