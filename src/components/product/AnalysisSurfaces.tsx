'use client';

import { motion } from 'framer-motion';
import { ShieldCheck, Brain, Layers, Eye, MapPin, Code2, FlaskConical, TrendingUp, ClipboardCheck } from 'lucide-react';

const SURFACES = [
    {
        id: 'quality-gate',
        label: 'Quality Gate',
        icon: ShieldCheck,
        title: 'First filter. Does this creative even warrant analysis?',
        detail: 'Before any deep read, the system checks whether the asset carries enough persuasive signal to justify further exploration. Not every ad deserves the full pipeline.',
        preview: [
            { label: 'Decision', value: 'Proceed' },
            { label: 'Signal Threshold', value: 'Met' },
            { label: 'Surface Quality', value: 'High' },
        ],
    },
    {
        id: 'intelligence',
        label: 'Intelligence',
        icon: Brain,
        title: 'Neural thesis and strategic verdict.',
        detail: 'The core read. What persuasion mechanic is driving this work, what subtext is being encoded, and where does it sit relative to the category landscape.',
        preview: [
            { label: 'Primary Mechanic', value: 'Aspirational Transfer' },
            { label: 'Semiotic Layer', value: 'Heritage Activation' },
            { label: 'Strategic Move', value: 'Contemporary Relevance' },
        ],
    },
    {
        id: 'mechanics',
        label: 'Mechanics',
        icon: Layers,
        title: 'The engine. What visual mechanics is this ad running on?',
        detail: 'Trigger mechanics, evidence anchoring, compositional hierarchy, color logic, and gaze routing — every structural element decoded and ranked by influence.',
        preview: [
            { label: 'Trigger', value: 'Celebrity Aspirational Transfer' },
            { label: 'Palette', value: 'Heritage Gold & Neutral' },
            { label: 'Gaze', value: 'Product-Centered' },
        ],
    },
    {
        id: 'psychology',
        label: 'Psychology',
        icon: Eye,
        title: 'What happens in the viewer\'s mind?',
        detail: 'Emotional drivers, cognitive load, persuasion density, and the psychological mechanics that move a viewer from passive seeing to active desire.',
        preview: [
            { label: 'Emotional Driver', value: 'Status Aspiration' },
            { label: 'Cognitive Load', value: 'Low' },
            { label: 'Persuasion Density', value: '91%' },
        ],
    },
    {
        id: 'constraint-map',
        label: 'Constraint Map',
        icon: MapPin,
        title: 'Where are the friction points? Where does the creative break?',
        detail: 'Every ad carries tension between what it wants to say and what the market will accept. The constraint map identifies where the work is fighting itself.',
        preview: [
            { label: 'Risk', value: 'Over-Explanation' },
            { label: 'Friction', value: 'Direct Gaze' },
            { label: 'Boundary', value: 'Monumental Scale' },
        ],
    },
    {
        id: 'blueprint',
        label: 'Blueprint Trace',
        icon: Code2,
        title: 'Reconstruction code. How was this assembly built?',
        detail: 'DNA-level readout of the creative assembly: which elements carry strategic weight, what was the designer thinking at each layer, and what can be rebuilt.',
        preview: [
            { label: 'Assembly', value: 'Product-First Hierarchy' },
            { label: 'Chromatic', value: 'Warm Authority' },
            { label: 'Narrative', value: 'Heritage Thread' },
        ],
    },
    {
        id: 'stress-lab',
        label: 'Stress Lab',
        icon: FlaskConical,
        title: 'Pressure-test the route before it reaches review.',
        detail: 'Push the creative against audience objections, category pressure, and competitive displacement to see what holds and what collapses.',
        preview: [
            { label: 'Category Pressure', value: 'Moderate' },
            { label: 'Audience Tension', value: 'Resolved' },
            { label: 'Competitive Delta', value: 'Clear' },
        ],
    },
    {
        id: 'market-pulse',
        label: 'Market Pulse',
        icon: TrendingUp,
        title: 'How does this creative sit in the category ocean?',
        detail: 'Chromatic saturation analysis, dominant mechanics in the category, and where this asset lands relative to the competitive persuasion benchmark.',
        preview: [
            { label: 'Top Mechanic', value: 'Aspirational Transfer' },
            { label: 'Chromatic', value: 'Gold Saturation Leader' },
            { label: 'Benchmark', value: 'Above Category Avg' },
        ],
    },
    {
        id: 'decision-log',
        label: 'Decision Log',
        icon: ClipboardCheck,
        title: 'Final verdict. Keep, Refine, or Kill — with fix priorities.',
        detail: 'Boardroom-ready output: verdict, confidence score, fix priorities ranked by impact, and the confidence note that tells you whether to trust the read.',
        preview: [
            { label: 'Verdict', value: 'Keep' },
            { label: 'Confidence', value: '99/100' },
            { label: 'Fix Priority P1', value: 'Sharpen Eyeflow' },
        ],
    },
];

export default function AnalysisSurfaces() {
    return (
        <section className="relative bg-[#F6F1E7] text-[#141414]" data-presence-tone="light">
            {/* Section header */}
            <div className="mx-auto max-w-[1200px] px-6 lg:px-12 pt-32 lg:pt-48 pb-20">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-100px' }}
                    transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                >
                    <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C1A674] mb-6">
                        9 analysis surfaces
                    </p>
                    <h2 className="text-[10vw] lg:text-[80px] font-black leading-[0.85] tracking-[-0.04em] uppercase text-[#141414] max-w-[12ch] mb-10">
                        What's under <span className="text-[#C1A674]">every ad.</span>
                    </h2>
                    <p className="text-[18px] leading-[1.7] text-[#6B6B6B] max-w-[560px]">
                        Each surface extracts a different dimension of the creative. Together they form a complete forensic read — the kind of analysis you'd expect from a senior team in a three-hour review. Done in minutes.
                    </p>
                </motion.div>
            </div>

            {/* Two-column surfaces grid */}
            <div className="relative pb-20 lg:pb-28">
                <motion.div
                    className="mx-auto max-w-[1200px] px-6 lg:px-12"
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
                        {SURFACES.map((surface, index) => (
                            <motion.div
                                key={surface.id}
                                className="min-w-0 group/surface"
                                initial={{ opacity: 0, y: 18 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-40px' }}
                                transition={{ duration: 0.45, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                                whileHover={{ y: -3 }}
                            >
                                <div className="relative rounded-[1.25rem] border border-[#E7DED1] bg-[#FBF7EF] p-6 h-full flex flex-col shadow-[0_1px_0_rgba(20,20,20,0.02)] transition-shadow duration-300 group-hover/surface:shadow-[0_14px_28px_rgba(20,20,20,0.10)]">
                                    {/* Header */}
                                    <div className="flex items-center gap-3 mb-5">
                                        <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-[#1A1A1A]/88 text-[#C1A674]/75">
                                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-[#C1A674]/0 transition-all duration-300 group-hover/surface:ring-[#C1A674]/20" />
                                            <div className="pointer-events-none absolute inset-0 rounded-xl opacity-0 group-hover/surface:opacity-100 group-hover/surface:animate-ping bg-[#C1A674]/6" />
                                            <surface.icon size={17} strokeWidth={1.4} />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-[#C1A674]">
                                                {surface.label}
                                            </p>
                                            <h3 className="text-[18px] lg:text-[20px] font-black leading-[1.15] tracking-[-0.02em] text-[#141414] mt-1">
                                                {surface.title}
                                            </h3>
                                            <div className="mt-2 h-[2px] w-0 bg-[#C1A674]/80 transition-all duration-300 group-hover/surface:w-10" />
                                        </div>
                                    </div>

                                    {/* Detail */}
                                    <p className="text-[14px] leading-[1.65] text-[#6B6B6B] mb-6">
                                        {surface.detail}
                                    </p>

                                    {/* Preview */}
                                    <div className="mt-auto grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                                        {surface.preview.map((item) => (
                                            <div
                                                key={item.label}
                                                className="relative overflow-hidden rounded-xl border border-[#E7DED1] bg-white px-3.5 py-2.5"
                                            >
                                                <div className="pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent via-[#C1A674]/16 to-transparent translate-x-[-180%] transition-transform duration-900 ease-out group-hover/surface:translate-x-[520%]" />
                                                <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-[#9a9a94] mb-1">
                                                    {item.label}
                                                </p>
                                                <p className="text-[12px] font-semibold text-[#141414]">
                                                    {item.value}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
