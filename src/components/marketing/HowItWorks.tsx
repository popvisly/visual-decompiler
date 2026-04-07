'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, ArrowDown } from 'lucide-react';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

export default function HowItWorks() {
    return (
        <section className="relative bg-[#F6F1E7] text-[#141414] py-32 lg:py-48 overflow-hidden" data-presence-tone="light">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
                        How it works
                    </p>
                    <h2 className="text-[10vw] lg:text-[72px] font-black leading-[0.88] tracking-[-0.04em] uppercase text-[#141414] max-w-[14ch] mb-10">
                        Drop an ad.<br />
                        <span className="text-[#C1A674]">Get the read.</span>
                    </h2>
                    <p className="text-[18px] leading-[1.7] text-[#6B6B6B] max-w-[520px]">
                        Upload a creative. Within minutes, receive a structured dossier with a clear verdict, fix priorities, and evidence you can defend in a client room.
                    </p>
                </motion.div>

                {/* Three simple steps */}
                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-12">
                    {[
                        { n: '1', title: 'Ingest', detail: 'JPG, PNG, WebP or URL. The asset is secured and fingerprinted.' },
                        { n: '2', title: 'Decompose', detail: '13 forensic surfaces extracted — mechanics, semiotics, gaze, friction.' },
                        { n: '3', title: 'Dossier', detail: 'Boardroom-ready verdict. Fix priorities. Confidence scores. One click.' },
                    ].map((step, idx) => (
                        <motion.div
                            key={step.n}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: idx * 0.15, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="flex items-start gap-5">
                                <span className="text-[48px] font-black leading-none text-[#141414]/[0.06]">{step.n}</span>
                                <div>
                                    <h3 className="text-[18px] font-black uppercase tracking-[-0.01em] text-[#141414] mb-2">{step.title}</h3>
                                    <p className="text-[15px] leading-[1.65] text-[#6B6B6B]">{step.detail}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="mt-20 flex flex-col sm:flex-row items-start sm:items-center gap-6"
                >
                    <Link
                        href="/ingest"
                        className="inline-flex items-center gap-3 bg-[#141414] px-8 py-4 text-[10px] font-black uppercase tracking-[0.25em] text-white transition hover:bg-[#C1A674] hover:text-[#141414]"
                    >
                        Start Decompiling Free
                        <ArrowUpRight size={16} />
                    </Link>
                    <Link
                        href={SAMPLE_DOSSIER_HREF}
                        className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#6B6B6B] transition hover:text-[#141414]"
                    >
                        <span className="w-6 h-px bg-[#141414]/20" />
                        See sample read
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
