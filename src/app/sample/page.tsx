import Link from 'next/link';
import { notFound } from 'next/navigation';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import { SAMPLE_DOSSIER_ASSET_ID, SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';
import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

const parseFileUrls = (value: string): string[] => {
    if (!value) return [];
    try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) return parsed.filter((entry): entry is string => typeof entry === 'string' && entry.length > 0);
    } catch { }
    return [value];
};

export default async function SampleVaultPage() {
    const { data: rawAsset, error } = await supabaseAdmin
        .from('assets')
        .select(`
            id,
            type,
            file_url,
            tags,
            created_at,
            brands ( name, market_sector ),
            extractions ( primary_mechanic, confidence_score )
        `)
        .eq('id', SAMPLE_DOSSIER_ASSET_ID)
        .single();

    if (error || !rawAsset) notFound();

    const fileUrls = parseFileUrls(rawAsset.file_url).slice(0, 4);

    return (
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414] selection:bg-[#C1A674] selection:text-white">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Free', href: '/ingest' }} />

            <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] [background-image:linear-gradient(rgba(26,26,26,1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,1)_1px,transparent_1px)] [background-size:48px_48px]" />

            <section className="relative z-10 px-6 pt-32 pb-16 lg:px-12 lg:pt-44">
                <div className="mx-auto max-w-[1500px]">
                    <div className="mb-10 flex flex-col gap-4 lg:mb-14">
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#8A8A84]">Sample Access</p>
                        <h1 className="text-[40px] font-black uppercase leading-[0.92] tracking-[-0.03em] text-[#141414] md:text-[64px]">
                            Sample Vault
                        </h1>
                        <p className="max-w-2xl text-[15px] leading-relaxed text-[#6B6B6B] md:text-[16px]">
                            A precomputed vault view so you can feel the product before you spend a credit.
                        </p>
                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="inline-flex items-center justify-center rounded-full bg-[#141414] px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#FBF7EF] transition hover:bg-black"
                            >
                                Open Sample Dossier
                            </Link>
                            <Link
                                href="/ingest"
                                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#141414] transition hover:bg-[#FBFBF6]"
                            >
                                Start Free
                            </Link>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                        {fileUrls.map((url, index) => (
                            <Link
                                key={`${rawAsset.id}-${index}`}
                                href={SAMPLE_DOSSIER_HREF}
                                className="group relative overflow-hidden rounded-[1.8rem] border border-black/5 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                            >
                                <div className="aspect-[3/4] w-full overflow-hidden bg-[#FBFBF6]">
                                    <img
                                        src={url}
                                        alt={`Sample asset frame ${index + 1}`}
                                        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                                    />
                                </div>
                                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent px-6 pb-6 pt-20">
                                    <p className="text-[9px] font-bold uppercase tracking-[0.24em] text-[#D4A574]">
                                        {rawAsset.brands?.name || 'Sample'}
                                    </p>
                                    <p className="mt-2 text-[14px] font-black uppercase leading-tight text-white">
                                        {index === 0 ? 'Primary route' : `Variant frame ${index + 1}`}
                                    </p>
                                    <p className="mt-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/50">
                                        Open dossier
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            <FooterStartNow />
        </main>
    );
}

