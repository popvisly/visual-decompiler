import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  console.log('Applying migration...');
  const { data, error } = await supabase.rpc('exec_sql', { sql: 'ALTER TABLE public.extractions ADD COLUMN IF NOT EXISTS full_dossier JSONB;' });
  if (error) {
    console.error('RPC failed, trying raw query or finding another way...');
    console.error(error);
  } else {
    console.log('Migration successful!');
  }
}

run();
