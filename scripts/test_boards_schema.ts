import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
    console.error('Missing Supabase credentials');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function runTest() {
    console.log('Testing Board Creation...');

    // 1. Create a board with a text user_id
    const { data: board, error: boardErr } = await supabase
        .from('boards')
        .insert({
            name: 'Test Board Migration',
            description: 'Verifying user_id text constraint',
            user_id: 'user_2test123456789',
            is_public: false
        })
        .select()
        .single();

    if (boardErr) {
        console.error('❌ Board Creation Failed:', boardErr);
        process.exit(1);
    }

    console.log('✅ Board Created:', board.id);

    // 2. Fetch a dummy ad
    const { data: ad, error: adErr } = await supabase
        .from('ad_digests')
        .select('id')
        .limit(1)
        .single();

    if (adErr || !ad) {
        console.warn('⚠️ No ad found to test item insertion, skipping item test.');
    } else {
        console.log('Testing Item Insertion (Ad ID:', ad.id, ')...');

        // 3. Add to board_items
        const { error: itemErr } = await supabase
            .from('board_items')
            .upsert({ board_id: board.id, ad_id: ad.id });

        if (itemErr) {
            console.error('❌ Item Insertion Failed:', itemErr);
        } else {
            console.log('✅ Item Inserted successfully');
        }
    }

    // Cleanup
    console.log('Cleaning up test data...');
    await supabase.from('boards').delete().eq('id', board.id);
    console.log('✅ Cleanup complete.');
    process.exit(0);
}

runTest();
