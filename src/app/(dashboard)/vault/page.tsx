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
    extraction?: { primary_mechanic: string; visual_style: string; confidence_score: number }[];
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
      extraction:extractions ( primary_mechanic, visual_style, confidence_score )
    `)
        .order('created_at', { ascending: false });

    return (
        <div className="p-8 md:p-12 lg:p-16 text-white min-h-screen bg-black">
            {/* Header */}
            <header className="mb-12 border-b border-neutral-800 pb-8">
                <h1 className="text-4xl md:text-5xl font-light tracking-tightest uppercase mb-4 text-white">
                    The Intelligence Vault
                </h1>
                <p className="text-neutral-500 font-sans text-[11px] font-bold tracking-[0.2em] uppercase">
                    {assets?.length || 0} Forensic Extractions Secured
                </p>
            </header>

            {/* Grid */}
            <Suspense fallback={<VaultSkeleton />}>
                {assets && assets.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 select-none">
                        {assets.map((asset: VaultAsset) => (
                            <VaultCard key={asset.id} asset={asset} />
                        ))}
                    </div>
                ) : (
                    <div className="h-64 flex flex-col items-center justify-center border border-neutral-800 border-dashed rounded-none">
                        <span className="text-white font-sans text-xs md:text-sm tracking-[0.3em] uppercase mb-4 font-bold text-center">
                            THE VAULT IS EMPTY.
                        </span>
                        <span className="text-neutral-500 text-[10px] font-mono tracking-widest uppercase text-center">
                            DROP AN ASSET TO INITIATE EXTRACTION.
                        </span>
                    </div>
                )}
            </Suspense>
        </div>
    );
}

// ----------------------------------------------------------------------
// Sub-components
// ----------------------------------------------------------------------

function VaultCard({ asset }: { asset: VaultAsset }) {
    const brandName = asset.brand?.name || 'Unknown Entity';
    const sector = asset.brand?.market_sector || 'Unclassified';
    const mechanic = asset.extraction?.[0]?.primary_mechanic || 'Pending Analysis';

    return (
        <Link href={`/asset/${asset.id}`} className="group block focus:outline-none">
            <div className="bg-neutral-950 border border-neutral-800 transition-all duration-300 hover:border-neutral-600 hover:bg-neutral-900 flex flex-col h-full rounded-none">

                {/* Brutalist Image Top */}
                <div className="aspect-[4/5] w-full overflow-hidden bg-black border-b border-neutral-800 relative">
                    <img
                        src={asset.file_url}
                        alt={brandName}
                        className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700 ease-out scale-100 group-hover:scale-105"
                    />

                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-sm border border-neutral-800 px-3 py-1">
                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-white">
                            {asset.type}
                        </span>
                    </div>
                </div>

                {/* Stark Data Block underneath */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-light tracking-tight text-white mb-1 uppercase">
                            {brandName}
                        </h3>
                        <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-neutral-500 mb-6">
                            Sector: {sector}
                        </p>
                    </div>

                    <div className="pt-4 border-t border-neutral-800/50">
                        <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-neutral-400">
                            Primary Mechanic
                        </p>
                        <p className="text-sm font-medium text-white mt-1">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse bg-neutral-950 border border-neutral-800 h-[400px]" />
            ))}
        </div>
    );
}
