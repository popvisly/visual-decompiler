'use client';

import Link from 'next/link';
import Logo from '@/components/Logo';

export default function ProductFooter() {
    return (
        <footer className="bg-[#0B0B0B] text-[#F6F1E7]" data-presence-tone="dark">
            <section className="pt-40 pb-28 lg:pt-52 lg:pb-40">
                <div className="mx-auto max-w-[1120px] px-6 lg:px-12">
                    <div className="max-w-[760px]">
                        <p className="text-[10px] font-semibold uppercase tracking-[0.38em] text-[#C1A674]">Final</p>
                        <h2 className="mt-6 text-[12vw] font-bold uppercase leading-[0.9] tracking-[-0.04em] text-[#F6F1E7] sm:text-[9vw] lg:text-[72px]">
                            Don&apos;t just present the work.
                            <br />
                            Explain it.
                        </h2>
                        <p className="mt-6 text-[18px] leading-[1.75] text-[#F6F1E7]/72">
                            Decompile your next ad before anyone else does.
                        </p>
                        <Link
                            href="/ingest"
                            className="mt-12 inline-flex items-center justify-center border border-white/12 bg-white px-6 py-3 text-[10px] font-semibold uppercase tracking-[0.24em] text-[#0B0B0B] transition hover:bg-[#F6F1E7]"
                        >
                            Decompile Your Ad
                        </Link>
                    </div>
                </div>
            </section>

            <div className="mx-auto flex max-w-[1120px] flex-col items-start justify-between gap-8 px-6 py-10 lg:flex-row lg:items-center lg:px-12">
                <Logo sublabel="BUILT FOR CREATIVES" forceDark className="origin-left scale-90" />
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
                            className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45 transition hover:text-white"
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>
            </div>
        </footer>
    );
}
