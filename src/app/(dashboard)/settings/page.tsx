import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';
import SettingsClient from './client-settings';

export const dynamic = 'force-dynamic';

function normalizeAgencyTier(rawTier?: string | null) {
    const tier = (rawTier || '').toLowerCase().trim();
    if (tier === 'agency' || tier === 'agency sovereignty' || tier === 'enterprise') return 'Agency Sovereignty';
    if (tier === 'professional') return 'Professional';
    if (tier === 'pro' || tier === 'strategic') return 'Strategic';
    return 'Observer';
}

export default async function SettingsPage() {
    const session = await getServerSession();

    if (!session.userId) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-sans tracking-widest text-xs uppercase text-neutral-500">
                Unauthorized.
            </div>
        );
    }

    const normalizedEmail = (session.email || `${session.userId}@local.visualdecompiler`).toLowerCase();

    const { error: userErr } = await supabaseAdmin
        .from('users')
        .upsert({ id: session.userId, email: normalizedEmail }, { onConflict: 'id' });

    if (userErr) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-sans tracking-widest text-xs uppercase text-neutral-500">
                Failed to verify account status.
            </div>
        );
    }

    const { data: currentUser } = await supabaseAdmin
        .from('users')
        .select('tier')
        .eq('id', session.userId)
        .maybeSingle();

    const { data: membershipByUser } = await supabaseAdmin
        .from('agency_members')
        .select('agency_id')
        .eq('user_id', session.userId)
        .eq('status', 'active')
        .order('created_at', { ascending: true })
        .limit(1)
        .maybeSingle();

    const membership = membershipByUser
        ? membershipByUser
        : await (async () => {
              const { data: membershipByEmail } = await supabaseAdmin
                  .from('agency_members')
                  .select('agency_id')
                  .ilike('email', normalizedEmail)
                  .eq('status', 'active')
                  .order('created_at', { ascending: true })
                  .limit(1)
                  .maybeSingle();
              return membershipByEmail;
          })();

    let workspaceAgencyId = membership?.agency_id || null;

    if (!workspaceAgencyId) {
        const { data: newAgency, error: newAgencyError } = await supabaseAdmin
            .from('agencies')
            .insert({
                name: `${normalizedEmail.split('@')[0] || 'visual decompiler'} studio`,
                tier: normalizeAgencyTier(currentUser?.tier),
            })
            .select('id')
            .single();

        if (newAgencyError || !newAgency) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center font-sans tracking-widest text-xs uppercase text-neutral-500">
                    Failed to initialize workspace.
                </div>
            );
        }

        workspaceAgencyId = newAgency.id;

        await supabaseAdmin.from('agency_members').upsert(
            {
                agency_id: workspaceAgencyId,
                user_id: session.userId,
                email: normalizedEmail,
                role: 'owner',
                status: 'active',
                joined_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
            },
            { onConflict: 'agency_id,email' },
        );
    }

    const { data: agency, error } = await supabaseAdmin
        .from('agencies')
        .select('*')
        .eq('id', workspaceAgencyId)
        .maybeSingle();

    if (error || !agency) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-sans tracking-widest text-xs uppercase text-neutral-500">
                Fatal: Workspace Agency Record Not Found.
            </div>
        );
    }

    const currentTier = currentUser?.tier || null;

    return <SettingsClient initialAgency={agency} currentTier={currentTier} />;
}
