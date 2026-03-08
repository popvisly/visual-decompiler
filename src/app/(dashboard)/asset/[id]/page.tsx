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
        let parsedDigest = digestRow.digest || {};
        try {
            if (typeof parsedDigest === 'string') {
                parsedDigest = JSON.parse(parsedDigest);
            }
        } catch (e) {
            parsedDigest = {};
        }

        asset = {
            id: digestRow.id,
            type: digestRow.media_kind?.toUpperCase() || 'STATIC',
            file_url: digestRow.media_url,
            brand: { 
                name: digestRow.brand || parsedDigest?.meta?.brand_guess || 'Unknown', 
                market_sector: parsedDigest?.meta?.product_category_guess || 'Uncategorized' 
            },
            extraction: Object.keys(parsedDigest).length > 0 ? [{
                primary_mechanic: parsedDigest.classification?.trigger_mechanic || 'Unknown',
                visual_style: Array.isArray(parsedDigest.classification?.visual_style) 
                    ? parsedDigest.classification.visual_style[0] 
                    : (parsedDigest.classification?.visual_style || 'Unknown'),
                confidence_score: parsedDigest.diagnostics?.confidence?.overall || 0,
                color_palette: parsedDigest.extraction?.palette_hex?.map((hex: string) => hex.startsWith('#') ? hex : `#${hex}`) || [],
                evidence_anchors: parsedDigest.strategy?.evidence_anchors || [],
                dna_prompt: parsedDigest.strategy?.reconstruction_prompt || parsedDigest.meta?.brand_guess || 'DNA sequence unavailable.'
            }] : []
        };
    }

    // Standardize gating logic & Branding
    const { data: agency } = await supabaseAdmin.from('agencies').select('name, whitelabel_logo, primary_hex, tier').limit(1).single();
    const rawTier = agency?.tier || '';
    const isSovereign = rawTier === 'Agency Sovereignty' || rawTier === 'pro';

    console.log("MAPPED WORKSPACE ASSET:", JSON.stringify(asset, null, 2));

    // Pass down to the interactive forensic console
    return <AssetWorkspace initialAsset={asset} isSovereign={isSovereign} agency={agency} />;
}
