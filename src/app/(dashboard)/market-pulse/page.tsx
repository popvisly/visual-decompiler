import MechanicIntelligenceClient from './pulse-client';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export default async function MarketPulseDashboardPage() {
    const { data: agency } = await supabaseAdmin.from('agencies').select('tier').limit(1).single();
    const rawTier = (agency?.tier || '').toLowerCase().trim();
    const hasAccess = rawTier === 'agency sovereignty' || rawTier === 'agency' || rawTier === 'enterprise' || rawTier === 'pro';

    return <MechanicIntelligenceClient hasAccess={hasAccess} tierLabel={agency?.tier || 'Observer'} />;
}
