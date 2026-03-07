import { supabaseAdmin } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function EmbedPage({ params }: { params: Promise<{ id: string }> }) {
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

    const extraction = asset.extraction?.[0] || null;

    return (
        <div className="min-h-screen bg-black text-white p-8">
            <style dangerouslySetInnerHTML={{
                __html: `
                body {
                    background: #000;
                    margin: 0;
                }
                ::-webkit-scrollbar {
                    width: 8px;
                    height: 8px;
                }
                ::-webkit-scrollbar-track {
                    background: #000;
                }
                ::-webkit-scrollbar-thumb {
                    background: #333;
                    border-radius: 4px;
                }
                ::-webkit-scrollbar-thumb:hover {
                    background: #555;
                }
            `}} />
            
            {/* Header / Branding */}
            <div className="flex flex-col items-center justify-center w-full pb-8 border-b border-neutral-800 mb-8" style={{ borderBottomColor: isSovereign && agency?.primary_hex ? agency.primary_hex : '#262626' }}>
                {isSovereign && agency?.whitelabel_logo ? (
                    <img src={agency.whitelabel_logo} alt={agency.name} className="h-10 mb-4 object-contain" />
                ) : (
                    <div className="w-8 h-8 bg-white rounded-sm mb-4 flex items-center justify-center text-black font-bold text-sm">V</div>
                )}
                <h1 className="text-xl font-light tracking-[0.2em] uppercase text-white" style={{ color: isSovereign && agency?.primary_hex ? agency.primary_hex : '#fff' }}>
                    {isSovereign && agency?.name ? agency.name : 'STRATEGIC DOSSIER'}
                </h1>
                <div className="mt-2 text-[9px] font-mono tracking-[0.3em] uppercase text-neutral-500">Embedded Forensic Intelligence</div>
            </div>

            {/* Asset Info */}
            <div className="mb-12 text-center">
                 <h2 className="text-2xl font-light tracking-tightest text-white uppercase">{asset.brand?.name}</h2>
                 <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-neutral-500">{asset.brand?.market_sector}</span>
            </div>

            {/* Extraction Data */}
            {extraction ? (
                <div className="space-y-12 max-w-4xl mx-auto">
                    {/* Primary Mechanic & Confidence */}
                    <div className="grid grid-cols-2 border-b border-neutral-800 pb-12 gap-8">
                        <div>
                            <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-2">Primary Mechanic</span>
                            <h3 className="text-2xl font-light leading-tight text-white">{extraction.primary_mechanic}</h3>
                        </div>
                        <div className="pl-8 border-neutral-800 flex flex-col justify-center border-l">
                            <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-2">System Confidence</span>
                            <div className="text-3xl font-mono text-white tracking-tighter" style={{ color: isSovereign && agency?.primary_hex ? agency.primary_hex : '#fff' }}>
                                {extraction.confidence_score}<span className="text-neutral-600">%</span>
                            </div>
                        </div>
                    </div>

                    {/* Visual Style */}
                    <div>
                        <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-2">Synthesized Visual Style</span>
                        <p className="text-base text-neutral-300">{extraction.visual_style}</p>
                    </div>

                    {/* Color Palette Grid */}
                    <div>
                        <span className="block text-[9px] uppercase tracking-widest text-neutral-500 mb-6">Dominant Chromatic Base</span>
                        {extraction.color_palette && extraction.color_palette.length > 0 ? (
                            <div className="flex flex-wrap gap-3">
                                {extraction.color_palette.map((hex: string, i: number) => (
                                    <div key={i} className="group border border-neutral-800 p-2 bg-neutral-950 flex items-center gap-3 min-w-[120px]">
                                        <div className="w-6 h-6 flex-shrink-0 border border-neutral-800" style={{ backgroundColor: hex }} />
                                        <span className="text-[9px] font-mono tracking-widest text-neutral-400">{hex}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-[10px] font-mono text-neutral-600">NO PALETTE DETECTED.</div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="text-center text-neutral-500 text-xs tracking-widest uppercase mt-12">
                    No forensic extraction data available.
                </div>
            )}
            
            {/* Footer */}
            <div className="mt-16 pt-8 border-t border-neutral-800 flex justify-between items-end max-w-4xl mx-auto">
                 <div className="space-y-1">
                    <p className="text-[8px] font-bold tracking-widest uppercase text-neutral-500">Classification: Confidential / Forensic</p>
                    <p className="text-[8px] font-mono text-neutral-600 uppercase">Asset ID: {asset.id.split('-')[0]}</p>
                </div>
                <div className="text-right">
                    {!isSovereign && (
                        <p className="text-[8px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-2">Powered By Visual Decompiler</p>
                    )}
                </div>
            </div>
        </div>
    );
}
