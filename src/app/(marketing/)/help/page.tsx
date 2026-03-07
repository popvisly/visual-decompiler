"use client";

import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';
import { Shield, Layout, Database, Palette, ChevronRight } from 'lucide-react';

const SECTIONS = [
    {
        title: "Authentication & Security",
        icon: Shield,
        description: "Your agency's competitive intelligence is a high-stakes asset. We use Supabase-powered authentication and database-level security to ensure your vault remains sovereign.",
        bullets: [
            "End-to-end encryption for storage paths.",
            "Session-based access control via secure cookies.",
            "Private staging environments for draft deconstructions."
        ]
    },
    {
        title: "The Forensic Interface",
        icon: Layout,
        description: "Navigate the three core views of any ad deconstruction to extract maximum strategic value.",
        bullets: [
            "Extraction: The raw semiotic breakdown and OCR results.",
            "Pacing & Blueprint: Visualizing the strategic arc and intent.",
            "Neural Verdict: The final algorithmic confidence score on the ad's effectiveness."
        ]
    },
    {
        title: "Asset Management & Deduplication",
        icon: Database,
        description: "The OS is designed for operational efficiency. We utilize SHA-256 semantic hashing to identify duplicate assets.",
        bullets: [
            "Deduplication: Never pay for the same analysis twice.",
            "Auto-Tagging: AI-driven brand and category identification.",
            "Folderless Workspace: Search-first retrieval for total speed."
        ]
    },
    {
        title: "Sovereign White-Labeling",
        icon: Palette,
        description: "Own the output. Agency Sovereignty users can lock in their brand identity across every forensic dossier.",
        bullets: [
            "Custom Hex: Set your legacy #141414 or agency primary color.",
            "Custom Logo: Replace our branding with your agency mark.",
            "Zero Watermarks: Pure, white-label exports for high-tier accounts."
        ]
    }
];

export default function HelpPage() {
    return (
        <main className="bg-[#F6F1E7] min-h-screen">
            <UnifiedSovereignHeader />

            <div className="pt-32 pb-20 px-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-20">
                        <span className="text-[10px] font-bold tracking-[0.4em] uppercase text-[#C1A67B] block mb-4">
                            Operational Manual
                        </span>
                        <h1 className="text-5xl md:text-8xl font-semibold text-[#141414] tracking-tight uppercase leading-[0.9]">
                            Sovereign<br />
                            <span className="text-[#C1A67B]">Intelligence.</span>
                        </h1>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                        {SECTIONS.map((s, i) => (
                            <div key={i} className="bg-white rounded-[32px] border border-[#E7DED1] p-8 md:p-12 shadow-[0_4px_24px_rgba(20,20,20,0.02)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.04)] transition-all group">
                                <div className="w-12 h-12 rounded-2xl bg-[#C1A67B]/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                                    <s.icon className="w-6 h-6 text-[#C1A67B]" />
                                </div>
                                <h3 className="text-2xl font-semibold text-[#141414] uppercase tracking-tight mb-4">{s.title}</h3>
                                <p className="text-base text-[#6B6B6B] leading-relaxed mb-8 font-medium">
                                    {s.description}
                                </p>
                                <ul className="space-y-4">
                                    {s.bullets.map((b, bi) => (
                                        <li key={bi} className="flex items-start gap-3 text-sm text-[#141414] font-medium leading-tight">
                                            <ChevronRight className="w-4 h-4 text-[#C1A67B] shrink-0 mt-0.5" />
                                            {b}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <FooterStartNow />
        </main>
    );
}
