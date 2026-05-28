'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function ProductFooter() {
    return (
        <footer className="bg-[#FBFBF6] text-[#141414] border-t border-black/5">
            <section className="pt-24 pb-20 lg:pt-28 lg:pb-24">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[860px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#8B6A3D]/80">The Decision</p>
                        <h2 className="mt-6 text-[12vw] font-semibold uppercase leading-[0.9] tracking-tight text-[#141414] sm:text-[9vw] lg:text-[68px]">
                            Don&apos;t just show the work.
                            <br />
                            Prove what it&apos;s doing.
                        </h2>
                        <p className="mt-6 text-[18px] leading-[1.75] text-[#6B6B6B]">
                            Bring evidence into the room before the room turns subjective.
                        </p>
                        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                            <Link
                                href="/ingest"
                                className="inline-flex items-center justify-center rounded-full bg-[#141414] px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#FBF7EF] transition hover:bg-black"
                            >
                                Start Free
                            </Link>
                            <Link
                                href={SAMPLE_DOSSIER_HREF}
                                className="inline-flex items-center justify-center rounded-full border border-black/10 bg-white px-7 py-3.5 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#141414] transition hover:bg-[#FBFBF6]"
                            >
                                View Sample Dossier
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-8 px-6 py-10 lg:flex-row lg:items-center lg:px-12">
                <Logo sublabel="BUILT FOR CREATIVES" className="origin-left scale-90" />
                <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                    {[
                        { label: 'Home', href: '/' },
                        { label: 'Pricing', href: '/pricing' },
                        { label: 'Insights', href: '/intelligence' },
                        { label: 'Vault', href: '/vault' },
                        { label: 'About', href: '/about' },
                    ].map((link) => (
                        <Link
                            key={link.label}
                            href={link.href}
                            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[#6B6B6B] transition hover:text-[#141414]"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
