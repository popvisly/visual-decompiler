const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
    const twentyMinutesAgo = new Date(Date.now() - 20 * 60 * 1000).toISOString();
    const { data, error } = await supabase
        .from('ad_digests')
        .select('id, status, media_url, digest, created_at')
        .gte('created_at', twentyMinutesAgo)
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching:', error);
    } else {
        console.log(JSON.stringify(data, null, 2));
    }
}

run();
