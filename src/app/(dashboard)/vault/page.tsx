import { Suspense } from 'react';
import { supabaseAdmin } from '@/lib/supabase';
import VaultClient from './client-vault';

export const dynamic = 'force-dynamic';

export default async function IntelligenceVaultPage() {
    const { data: assets } = await supabaseAdmin
        .from('assets')
        .select(`
      id,
      type,
      file_url,
      created_at,
      brand:brands ( name, market_sector ),
      extraction:extractions ( primary_mechanic, visual_style, confidence_score, full_dossier )
    `)
        .order('created_at', { ascending: false });

    return (
        <Suspense fallback={<VaultSkeleton />}>
            <VaultClient initialAssets={(assets as any[]) || []} />
        </Suspense>
    );
}

function VaultSkeleton() {
    return (
        <div className="p-8 md:p-12 lg:p-16 min-h-screen bg-[#FBFBF6]">
            <div className="animate-pulse h-12 w-64 bg-[#E5E5E1] mb-12 rounded-lg" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="animate-pulse bg-white border border-[#E5E5E1] h-[450px] rounded-3xl" />
                ))}
            </div>
        </div>
    );
}
