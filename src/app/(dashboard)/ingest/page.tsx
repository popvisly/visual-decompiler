import IngestClient from './client-ingest';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function IngestPage() {
    const { data: agency } = await supabaseAdmin.from('agencies').select('tier').limit(1).single();
    // Normalize tier string to ensure user can proceed if they bought it
    const rawTier = agency?.tier || '';
    const isSovereign = rawTier === 'Agency Sovereignty' || rawTier === 'pro';

    return <IngestClient isSovereign={isSovereign} />;
}
