import { Suspense } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from '@/lib/auth-server';
import VaultClient from './client-vault';

export const dynamic = 'force-dynamic';

export default async function IntelligenceVaultPage() {
    const session = await getServerSession();

    if (!session.userId) {
        return (
            <Suspense fallback={<VaultSkeleton />}>
                <VaultClient initialAssets={[]} />
            </Suspense>
        );
    }

    let query = supabaseAdmin
        .from('assets')
        .select(`
      id,
      type,
      file_url,
      tags,
      created_at,
      brand:brands ( name, market_sector ),
      extraction:extractions ( primary_mechanic, visual_style, confidence_score, full_dossier )
    `)
        .order('created_at', { ascending: false })
        .eq('user_id', session.userId);

    // Preserve org-level visibility only when org context is explicit and not just user fallback.
    if (session.orgId && session.orgId !== session.userId) {
        query = query.or(`user_id.eq.${session.userId},org_id.eq.${session.orgId}`);
    }

    const { data: assets } = await query;

    return (
        <Suspense fallback={<VaultSkeleton />}>
            <VaultClient initialAssets={(assets as any[]) || []} />
        </Suspense>
    );
}

function VaultSkeleton() {
    return (
        <div className="min-h-screen bg-[#F6F1E7] p-8 md:p-12 lg:p-16">
            <div className="mb-12 h-12 w-64 animate-pulse rounded-lg bg-[#E7DED1]" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-[450px] animate-pulse rounded-[1.4rem] border border-[#E7DED1] bg-[#FBF7EF]" />
                ))}
            </div>
        </div>
    );
}
