import { supabaseAdmin } from '@/lib/supabase';
import AssetWorkspace from './client-workspace';

export const dynamic = 'force-dynamic';

export default async function AssetPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch asset with relation to brand and extraction
    const { data: asset, error } = await supabaseAdmin
        .from('assets')
        .select(`
      *,
      brand:brands ( name, market_sector ),
      extraction:extractions ( * )
    `)
        .eq('id', id)
        .single();

    if (error || !asset) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-sans tracking-widest text-xs uppercase text-neutral-500">
                Asset not found in the Intelligence Vault.
            </div>
        );
    }

    // Standardize gating logic & Branding
    const { data: agency } = await supabaseAdmin.from('agencies').select('name, whitelabel_logo, primary_hex, tier').limit(1).single();
    const rawTier = agency?.tier || '';
    const isSovereign = rawTier === 'Agency Sovereignty' || rawTier === 'pro';

    // Pass down to the interactive forensic console
    return <AssetWorkspace initialAsset={asset} isSovereign={isSovereign} agency={agency} />;
}
