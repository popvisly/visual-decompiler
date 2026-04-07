'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight, GitCompare, Database, FileText, Code } from 'lucide-react';
import { SAMPLE_DOSSIER_HREF } from '@/lib/sample-dossier';

const ACTIONS = [
    {
        icon: GitCompare,
        label: 'Run Differential Diagnosis',
        detail: 'Put this result beside another route and surface the strategic delta fast. Compare against another asset to find what\'s actually working.',
        cta: 'Compare against another asset',
    },
    {
        icon: Database,
        label: 'Save to Vault / Board',
        detail: 'This dossier is already stored in Vault. Create a board to keep it active in the next review or client thread.',
        cta: 'Create Board',
    },
    {
        icon: FileText,
        label: 'Export Summary',
        detail: 'Turn the readout into a shareable summary before you lose the room. Clean, presentable, and branded to your agency.',
        cta: 'Export Summary',
    },
    {
        icon: Code,
        label: 'Open Clone Engine',
        detail: 'Paste this iFrame into a client portal, strategy deck, Notion page, or internal dashboard. A self-contained forensic intelligence panel.',
        cta: 'Copy Embed Widget',
    },
];

export default function WhatsNext() {
    return (
        <section className="relative bg-[#F6F1E7] text-[#141414] py-32 lg:py-48 overflow-hidden" data-presence-tone="light">
            <div className="relative z-10 mx-auto max-w-[1200px] px-6 lg:px-12">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                    className="mb-20 lg:mb-32"
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
                        Workflow
                    </p>
                    <h2 className="text-[10vw] lg:text-[80px] font-black leading-[0.85] tracking-[-0.04em] uppercase text-[#141414] max-w-[14ch] mb-10">
                        What you <span className="text-[#C1A674]">do</span> with the read.
                    </h2>
                    <p className="text-[18px] leading-[1.7] text-[#6B6B6B] max-w-[560px]">
                        A dossier is only the start. Visual Decompiler gives you the actions that turn analysis into decisions — compare, save, export, embed.
                    </p>
                </motion.div>

                {/* Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-6">
                    {ACTIONS.map((action, idx) => (
                        <motion.div
                            key={action.label}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: '-50px' }}
                            transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                        >
                            <div className="rounded-[1.4rem] border border-[#E7DED1] bg-[#FBF7EF] p-8 lg:p-10 h-full">
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center justify-center w-10 h-10 rounded-xl border border-[#E7DED1] bg-white text-[#C1A674]">
                                        <action.icon size={18} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-[18px] font-black leading-[1.1] tracking-[-0.01em] text-[#141414]">
                                        {action.label}
                                    </h3>
                                </div>
                                <p className="text-[15px] leading-[1.7] text-[#6B6B6B] mb-6">
                                    {action.detail}
                                </p>
                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#C1A674]">
                                    {action.cta}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
