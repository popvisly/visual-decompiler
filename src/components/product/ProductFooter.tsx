'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Logo from '@/components/Logo';

export default function ProductFooter() {
    return (
        <footer className="bg-[#F6F1E7] text-[#141414] border-t border-[#E7DED1]">
            <div className="mx-auto max-w-[1200px] px-6 py-20 sm:px-8 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
                        Ready to analyse your work
                    </p>
                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.85] tracking-[-0.04em] uppercase text-[#141414] max-w-[14ch] mb-10">
                        Bring in the <span className="text-[#C1A674]">frame.</span><br />
                        Get the read.
                    </h2>

                    <Link
                        href="/ingest"
                        className="inline-flex items-center gap-3 bg-[#141414] px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition hover:bg-[#C1A674] hover:text-[#141414]"
                    >
                        Start Decompiling Free
                        <ArrowUpRight size={16} />
                    </Link>
                </motion.div>
            </div>

            <div className="mx-auto max-w-[1200px] px-6 py-8 sm:px-8 lg:px-10 border-t border-[#E7DED1]">
                <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
                    <Logo sublabel="VISUAL JUDGMENT FOR WORKING CREATIVES" forceDark={false} className="scale-[0.85] origin-left" />
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                        {[
                            { label: 'Home', href: '/' },
                            { label: 'About', href: '/about' },
                            { label: 'Pricing', href: '/pricing' },
                            { label: 'Help', href: '/docs/user-guide' },
                            { label: 'Login', href: '/login' },
                        ].map((link) => (
                            <a
                                key={link.label}
                                href={link.href}
                                className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#141414]/30 transition hover:text-[#141414]"
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>
                    <div className="flex items-center gap-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#141414]/15">
                        <span>© 2026</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
