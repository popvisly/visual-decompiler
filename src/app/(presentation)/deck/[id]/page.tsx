import { supabaseAdmin } from '@/lib/supabase';
import DeckClient from './client-deck';

export const dynamic = 'force-dynamic';

export default async function DeckPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;

    // Fetch asset with relation to brand, extraction, and agency
    const { data: asset, error } = await supabaseAdmin
        .from('assets')
        .select(`
      *,
      brand:brands ( 
        name, 
        market_sector,
        agency:agencies (
          name,
          whitelabel_logo,
          primary_hex
        )
      ),
      extraction:extractions ( * )
    `)
        .eq('id', id)
        .single();

    if (error || !asset || !asset.extraction || asset.extraction.length === 0) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center font-sans tracking-widest text-xs uppercase text-neutral-500">
                Asset not found or no Forensic Extraction available for this deck.
            </div>
        );
    }

    // Pass down to the immersive client component
    return <DeckClient asset={asset} extraction={asset.extraction[0]} agency={asset.brand?.agency || null} />;
}
