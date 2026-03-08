import { Suspense } from 'react';
import Link from 'next/link';
import { supabaseAdmin } from '@/lib/supabase';

// Use Edge caching or dynamic rendering since Vault data changes on ingest.
export const dynamic = 'force-dynamic';

interface VaultAsset {
    id: string;
    type: string;
    file_url: string;
    created_at: string;
    brand?: { name: string; market_sector: string };
    extraction?: { 
        primary_mechanic: string; 
        visual_style: string; 
        confidence_score: number;
        full_dossier: any;
    }[];
}

export default async function IntelligenceVaultPage() {
    // 1. Fetch Assets with their parent Brand and primary Extraction.
    const { data: assets, error } = await supabaseAdmin
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
        <div className="p-8 md:p-12 lg:p-16 text-[#1A1A1A] min-h-screen bg-[#FBFBF6] relative">
            <div className="relative z-10 w-full">
                {/* Header */}
                <header className="mb-12 border-b border-[#E5E5E1] pb-8">
                    <h1 className="text-4xl md:text-5xl font-light tracking-tightest uppercase mb-4 text-[#8B4513]">
                        The Intelligence Vault
                    </h1>
                    <div className="flex items-center gap-3">
                        <p className="text-[#4A4A4A]/60 font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                            {assets?.length || 0} Forensic Extractions Secured
                        </p>
                        <div className="h-px w-8 bg-[#D4A574]" />
                    </div>
                </header>

                {/* Grid */}
                <Suspense fallback={<VaultSkeleton />}>
                    {assets && assets.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 select-none">
                            {assets.map((asset: VaultAsset) => (
                                <VaultCard key={asset.id} asset={asset} />
                            ))}
                        </div>
                    ) : (
                        <div className="h-64 flex flex-col items-center justify-center border border-[#E5E5E1] border-dashed rounded-3xl bg-white shadow-sm">
                            <span className="text-[#1A1A1A] font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-bold text-center">
                                THE VAULT IS EMPTY.
                            </span>
                            <span className="text-[#4A4A4A]/40 text-[10px] font-mono tracking-widest uppercase text-center">
                                DROP AN ASSET TO INITIATE EXTRACTION.
                            </span>
                        </div>
                    )}
                </Suspense>
            </div>
        </div>
    );
}

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

function VaultCard({ asset }: { asset: VaultAsset }) {
    const brandName = asset.brand?.name || 'Unknown Entity';
    const sector = asset.brand?.market_sector || 'Unclassified';
    
    const extraction = asset.extraction?.[0];
    const isAnalyzed = !!extraction?.full_dossier;
    const mechanic = isAnalyzed ? extraction?.primary_mechanic : 'Awaiting Forensic Deep-Dive';

    return (
        <Link href={`/asset/${asset.id}`} className="group block focus:outline-none">
            <div className="bg-white border border-[#E5E5E1] transition-all duration-500 hover:border-[#D4A574] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] flex flex-col h-full rounded-3xl overflow-hidden">

                {/* Brutalist Image Top - STRICT RECTANGLULAR INSIDE */}
                <div className="aspect-[4/5] w-full overflow-hidden bg-neutral-100 border-b border-[#E5E5E1] relative">
                    <img
                        src={asset.file_url}
                        alt={brandName}
                        className="w-full h-full object-cover transition-all duration-700 ease-out scale-100 group-hover:scale-110 rounded-none"
                    />

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm border border-[#E5E5E1] px-3 py-1 rounded-full">
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#1A1A1A]">
                            {asset.type}
                        </span>
                    </div>

                    {isAnalyzed && (
                        <div className="absolute bottom-4 right-4 bg-[#8B4513] px-3 py-1 rounded-full">
                            <span className="text-[8px] font-bold tracking-[0.1em] uppercase text-white">
                                Forensic Secured
                            </span>
                        </div>
                    )}
                </div>

                {/* Stark Data Block underneath */}
                <div className="p-8 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-xl font-light tracking-tight text-[#1A1A1A] mb-1 uppercase group-hover:text-[#8B4513] transition-colors">
                            {brandName}
                        </h3>
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#D4A574] mb-8 border-l border-[#E5E5E1] pl-3">
                            {sector}
                        </p>
                    </div>

                    <div className="pt-6 border-t border-[#E5E5E1]">
                        <p className="text-[9px] font-bold tracking-[0.15em] uppercase text-[#4A4A4A]/40 mb-2">
                            Structural Logic
                        </p>
                        <p className={`text-sm font-medium leading-snug ${isAnalyzed ? 'text-[#1A1A1A]' : 'text-[#4A4A4A]/40 italic'}`}>
                            {mechanic}
                        </p>
                    </div>
                </div>

            </div>
        </Link>
    );
}

function VaultSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-white border border-[#E5E5E1] h-[450px] rounded-3xl" />
            ))}
        </div>
    );
}
