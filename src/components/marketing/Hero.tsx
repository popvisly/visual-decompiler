'use client';

import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { LinkCta } from '@/types/homepage';
import AdRolodexScanner from '@/components/marketing/AdRolodexScanner';
import {
    HOMEPAGE_CTA_ICON,
    HOMEPAGE_PRIMARY_CTA,
    HOMEPAGE_SECONDARY_CTA,
} from '@/components/marketing/ctaStyles';

type Props = {
    eyebrow?: string;
    headline?: string;
    subhead?: string;
};

export default function Hero({
    eyebrow = 'Strategic Architecture',
}: Props) {
    return (
        <section className="relative z-20 -mt-12 overflow-hidden rounded-t-[40px] border-t border-black/5 bg-[#FBFBF6] pb-24 pt-24 text-[#141414] shadow-[0_-24px_50px_rgba(0,0,0,0.5)] md:-mt-20 md:rounded-t-[60px] md:pt-32 lg:-mt-24 lg:rounded-t-[80px]">
            <div className="pointer-events-none absolute inset-0 opacity-[0.45] [background-image:linear-gradient(rgba(20,20,20,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.025)_1px,transparent_1px)] [background-size:64px_64px]" />
            
            <div className="relative z-10 mx-auto max-w-[1280px] px-6 text-center">
                <div className="flex flex-col items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="mb-12 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#1A1A1A] p-5 shadow-2xl"
                    >
                        <img 
                            src="/images/logo/Visual_Decompiler_Logo_v2_400px.png" 
                            alt="Visual Decompiler Graphic" 
                            className="h-full w-full object-contain"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.65 }}
                        className="mb-6 flex items-center gap-4"
                    >
                        <span className="h-px w-8 bg-[#D4A574]" />
                        <p className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#B8A47E]">{eyebrow}</p>
                        <span className="h-px w-8 bg-[#D4A574]" />
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, delay: 0.1 }}
                        className="max-w-4xl text-[38px] font-bold leading-[1.05] tracking-tight text-[#141414] sm:text-[48px] md:text-[64px]"
                    >
                        Strategy beyond the
                        <br />
                        <span className="inline-block border-l-[4px] border-[#D4A574] pl-6 mt-2 italic text-[#1A1A1A]/80">creative surface.</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.75, delay: 0.2 }}
                        className="mt-8 max-w-2xl text-[17px] font-medium leading-[1.6] text-[#6A6257] md:text-[19px] lg:text-[21px]"
                    >
                        Visual Decompiler maps the hidden persuasion architecture that drives category movement — from high-concept prestige storytelling to utility-led performance.
                    </motion.p>
                </div>

                <div className="mt-20 grid gap-6 sm:grid-cols-3">
                    {[
                        { label: 'Signals', body: 'Trigger profile, friction cues, and narrative pressure.' },
                        { label: 'Mechanics', body: 'Primary persuasion system and blueprint logic.' },
                        { label: 'Archive', body: 'Compounds strategic memory with every analysis.' }
                    ].map((item, i) => (
                        <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
                            className="rounded-[2rem] border border-[#E6DDCF] bg-white p-8 text-left shadow-sm"
                        >
                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#D4A574] mb-3">{item.label}</p>
                            <p className="text-[15px] font-medium text-[#141414] leading-relaxed">{item.body}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
