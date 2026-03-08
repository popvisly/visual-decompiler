import { supabaseAdmin } from '@/lib/supabase';
import AssetWorkspace from './client-workspace';

export const dynamic = 'force-dynamic';

export default async function AssetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // 1. Try fetching from Phase 2 assets
    let { data: asset, error } = await supabaseAdmin
        .from('assets')
        .select(`
      *,
      brand:brands ( name, market_sector ),
      extraction:extractions ( * )
    `)
        .eq('id', id)
        .single();

    // 2. Fallback to V1 ad_digests if asset not found
    if (error || !asset) {
        const { data: digestRow, error: digestError } = await supabaseAdmin
            .from('ad_digests')
            .select('*')
            .eq('id', id)
            .single();

        if (digestError || !digestRow) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center font-sans tracking-widest text-xs uppercase text-neutral-500">
                    Asset not found in the Intelligence Vault.
                </div>
            );
        }

        // Map V1 digest schema to Phase 2 Sovereign Workspace format
        asset = {
            id: digestRow.id,
            type: digestRow.media_kind?.toUpperCase() || 'STATIC',
            file_url: digestRow.media_url,
            brand: { name: digestRow.brand || 'Unknown', market_sector: 'Uncategorized' },
            extraction: digestRow.digest && Object.keys(digestRow.digest).length > 0 ? [digestRow.digest] : []
        };
    }

    // Standardize gating logic & Branding
    const { data: agency } = await supabaseAdmin.from('agencies').select('name, whitelabel_logo, primary_hex, tier').limit(1).single();
    const rawTier = agency?.tier || '';
    const isSovereign = rawTier === 'Agency Sovereignty' || rawTier === 'pro';

    // Pass down to the interactive forensic console
    return <AssetWorkspace initialAsset={asset} isSovereign={isSovereign} agency={agency} />;
}
