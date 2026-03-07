import { supabaseAdmin } from '@/lib/supabase';
import SettingsClient from './client-settings';

export const dynamic = 'force-dynamic';

export default async function SettingsPage() {
    // Fetch the first agency since we don't have explicit user mappings in this schema
    // We'll treat the system as a single-tenant agency OS for Phase 2 demonstration
    const { data: agency, error } = await supabaseAdmin
        .from('agencies')
        .select('*')
        .limit(1)
        .single();

    if (error || !agency) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-sans tracking-widest text-xs uppercase text-neutral-500">
                Fatal: Root Agency Record Not Found.
            </div>
        );
    }

    return <SettingsClient initialAgency={agency} />;
}
