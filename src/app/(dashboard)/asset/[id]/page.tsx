import { supabaseAdmin } from '@/lib/supabase';
import { getServerSession } from '@/lib/auth-server';
import AssetWorkspace from './client-workspace';

export const dynamic = 'force-dynamic';

export default async function AssetPage({ params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession();
    if (!session.userId) {
        return (
            <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center font-sans tracking-widest text-xs uppercase text-[#8B4513]/50">
                Unauthorized.
            </div>
        );
    }

    const { id } = await params;

    // 1. Try fetching from Phase 2 assets with ownership scope.
    let assetQuery = supabaseAdmin
        .from('assets')
        .select(`
      *,
      brands ( name, market_sector ),
      extractions ( * )
    `)
        .eq('id', id);

    if (session.orgId && session.orgId !== session.userId) {
        assetQuery = assetQuery.or(`user_id.eq.${session.userId},org_id.eq.${session.orgId}`);
    } else {
        assetQuery = assetQuery.eq('user_id', session.userId);
    }

    let { data: rawAsset, error } = await assetQuery.single();
        
    let asset: any = rawAsset;

    // 2. Map V2 or Fallback to V1 ad_digests if asset not found
    if (!error && rawAsset) {
        // V2 Native Shape Alignment
        asset = {
            id: rawAsset.id,
            type: rawAsset.type,
            file_url: rawAsset.file_url,
            tags: Array.isArray(rawAsset.tags) ? rawAsset.tags : [],
            brand: rawAsset.brands ? { name: rawAsset.brands.name, market_sector: rawAsset.brands.market_sector } : undefined,
            extraction: rawAsset.extractions ? rawAsset.extractions : undefined
        };
    } else {
        let digestQuery = supabaseAdmin
            .from('ad_digests')
            .select('*')
            .eq('id', id);

        if (session.orgId && session.orgId !== session.userId) {
            digestQuery = digestQuery.or(`user_id.eq.${session.userId},org_id.eq.${session.orgId}`);
        } else {
            digestQuery = digestQuery.eq('user_id', session.userId);
        }

        const { data: digestRow, error: digestError } = await digestQuery.single();

        if (digestError || !digestRow) {
            return (
                <div className="min-h-screen bg-[#F5F5DC] flex items-center justify-center font-sans tracking-widest text-xs uppercase text-[#8B4513]/50">
                    Asset not found in the Intelligence Vault.
                </div>
            );
        }

        // Map V1 digest schema to Phase 2 Sovereign Workspace format
        let parsedDigest = digestRow.digest || {};
        try {
            while (typeof parsedDigest === 'string') {
                parsedDigest = JSON.parse(parsedDigest);
            }
        } catch (e) {
            parsedDigest = {};
        }

        // Check if the V1 AI Worker encountered a critical failure
        if (parsedDigest?.error) {
            asset = {
                id: digestRow.id,
                type: digestRow.media_kind?.toUpperCase() || 'STATIC',
                file_url: digestRow.media_url,
                tags: [],
                brand: { name: 'V1 PIPELINE FAILURE', market_sector: 'SYSTEM ERROR' },
                extraction: [{
                    primary_mechanic: 'Analysis Aborted',
                    visual_style: parsedDigest.error,
                    confidence_score: 0,
                    color_palette: [],
                    evidence_anchors: [],
                    dna_prompt: 'Critical API failure during V1 worker execution.'
                }]
            };
        } else {
            asset = {
                id: digestRow.id,
                type: digestRow.media_kind?.toUpperCase() || 'STATIC',
                file_url: digestRow.media_url,
                tags: [],
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
    }

    // Standardize gating logic & Branding
    const { data: agency } = await supabaseAdmin.from('agencies').select('name, whitelabel_logo, primary_hex, tier').limit(1).single();
    const rawTier = agency?.tier || '';
    const isSovereign = rawTier === 'Agency Sovereignty' || rawTier === 'pro';

    // Pass down to the interactive forensic console
    return <AssetWorkspace initialAsset={asset} isSovereign={isSovereign} agency={agency} />;
}
