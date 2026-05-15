import Link from 'next/link';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const SAMPLE_VAULT_ITEMS = [
    {
        brand: 'NIKE',
        sector: 'OTHER',
        imageUrl: '/images/examples/Nike.jpg',
        mechanic: 'Aspirational identity projection — the viewer is invited to adopt the posture through motion + status cues.',
    },
    {
        brand: 'ULYSSE NARDIN',
        sector: 'LUXURY WATCHES & JEWELLERY',
        imageUrl: '/images/examples/Ulyses.jpg',
        mechanic: 'Surrealist spectacle — category disruption through impossible scale and cinematic staging.',
    },
    {
        brand: 'CROCS',
        sector: 'OTHER',
        imageUrl: '/images/examples/Crocs.jpg',
        mechanic: 'Feature legitimization via technical annotation — the product is reframed as engineered, not novelty.',
    },
    {
        brand: 'RAY-BAN META',
        sector: 'PREMIUM TECH',
        imageUrl: '/images/examples/ray-ban-meta-ai-glasses-2025-10-14-06-25-55.webp',
        mechanic: 'Aspirational identity transfer via fashion-tech hybridization — cultural cool borrowed from style codes.',
    },
] as const;

export default function SampleVaultPage() {
    return (
        <main className="min-h-screen bg-[#FBFBF6] text-[#141414] selection:bg-[#C1A674] selection:text-white">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Free', href: '/ingest' }} />

            <div className="pointer-events-none fixed inset-0 z-0 opacity-[0.02] [background-image:linear-gradient(rgba(26,26,26,1)_1px,transparent_1px),linear-gradient(90deg,rgba(26,26,26,1)_1px,transparent_1px)] [background-size:48px_48px]" />

            <section className="relative z-10 px-6 pt-32 pb-16 lg:px-12 lg:pt-44">
                <div className="mx-auto max-w-[1500px]">
                    <div className="mb-10 flex flex-col gap-4 lg:mb-14">
                        <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#8B6A3D]">Forensic Archive</p>
                        <h1 className="text-[44px] font-black uppercase leading-[0.9] tracking-[-0.04em] text-[#141414] md:text-[72px]">
                            Intelligence <br /> Vault
                        </h1>
                        <p className="max-w-2xl text-[15px] leading-relaxed text-[#6B6B6B] md:text-[16px]">
                            A sample assortment so you can feel the Vault and dossier workflow before you spend a credit.
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
                        {SAMPLE_VAULT_ITEMS.map((item) => (
                            <Link
                                key={item.brand}
                                href={SAMPLE_DOSSIER_HREF}
                                className="group relative block transition-transform duration-500 will-change-transform hover:-translate-y-1"
                            >
                                <div className="relative aspect-[4/5] overflow-hidden rounded-[1.4rem] border border-[#E7DED1] bg-[#1A1A1A] transition-all duration-700 group-hover:border-[#C1A674]/35 group-hover:shadow-[0_28px_70px_rgba(20,20,20,0.14)]">
                                    <img
                                        src={item.imageUrl}
                                        alt={item.brand}
                                        className="h-full w-full object-cover transition-all duration-1000 ease-out group-hover:scale-110"
                                    />
                                </div>

                                <div className="mt-8 space-y-4">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <h3 className="text-3xl font-semibold uppercase tracking-tight leading-none mb-2 text-[#141414] group-hover:text-[#C1A674] transition-colors">
                                                {item.brand}
                                            </h3>
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9a9a94]">{item.sector}</p>
                                        </div>
                                        <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#141414]/20 group-hover:text-[#C1A674] transition-colors">
                                            →
                                        </span>
                                    </div>

                                    <div className="pt-6 border-t border-[#E7DED1]">
                                        <p className="text-[8px] font-semibold uppercase tracking-[0.4em] text-[#C1A674] mb-3">Core Mechanic</p>
                                        <p className="text-[14px] text-[#6B6B6B] leading-relaxed font-medium line-clamp-2 uppercase">
                                            {item.mechanic}
                                        </p>
                                    </div>
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
