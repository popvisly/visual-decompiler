
const { createClient } = require('@supabase/supabase-js');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.resolve(__dirname, '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Supabase env vars missing');
    process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkJobs() {
    const { data, error } = await supabase
        .from('ad_digests')
        .select('id, status, media_url, created_at, digest')
        .order('created_at', { ascending: false })
        .limit(5);

    if (error) {
        console.error('Error fetching jobs:', error);
    } else {
        console.log('Recent Jobs:');
        const displayData = data.map(job => ({
            id: job.id,
            status: job.status,
            created_at: job.created_at,
            error: job.status === 'needs_review' ? (job.digest?.error || 'No error field in digest') : 'N/A'
        }));
        console.table(displayData);

        if (data.length > 0) {
            console.log('\nFull Digest for most recent job:');
            console.log(JSON.stringify(data[0].digest, null, 2));
        }
    }
}

checkJobs();
