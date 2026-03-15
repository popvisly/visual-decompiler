"use client";

import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import { Shield, Layout, Database, Palette, ChevronRight, Compass, Activity, Wrench, FolderKanban, Mail } from 'lucide-react';

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
        title: "Forensic Navigation",
        icon: Layout,
        description: "Navigate the five intelligence layers of every forensic extraction to extract maximum strategic value.",
        bullets: [
            "Intelligence: Primary mechanic, confidence score, visual style, colour palette, narrative framework, and DNA prompt.",
            "Signals: Technical Autopsy, Macro-Diagnostic Map, Semiotic Subtext, Visual Grammar, and Cultural Semiotics.",
            "Psychology: Trigger Distribution, Strategic Posture, Persuasion Density, Cognitive Friction, Predictive Longevity, Behavioral Deconstruction.",
            "Blueprint: Production execution constraints synthesised from the extraction. Generate once per asset.",
            "Market Pulse: Cross-asset statistical aggregation and category saturation mapping. Paid agency tiers and above."
        ]
    },
    {
        title: "Privacy & De-Duplication",
        icon: Database,
        description: "The OS is designed for operational efficiency. We utilize SHA-256 semantic hashing to identify duplicate assets.",
        bullets: [
            "SHA-256 Hashing: Total privacy and fingerprinting for every asset.",
            "Deduplication: Never pay twice for the same unique analysis.",
            "Folderless Workspace: Search-first retrieval for total speed."
        ]
    },
    {
        title: "White-Labeling (Sovereignty Tier)",
        icon: Palette,
        description: "Own the output. Agency Sovereignty users can deploy their brand identity across exported dossiers in four steps:",
        bullets: [
            "1. Navigate to Agency Settings and enter your Agency Identity String.",
            "2. Add your Absolute Primary Hex for dossier accent elements.",
            "3. Paste your Agency Logo URL into the Agency Logo URL field.",
            "4. Toggle Sovereign Whitelabel Mode on and save. SVG or PNG logos are recommended."
        ]
    },
    {
        title: "Getting Started",
        icon: Compass,
        description: "New to Visual Decompiler? Here is the operating sequence that gets you from upload to client-ready intelligence fastest.",
        bullets: [
            "1. Analyse Ad Asset: Upload your first JPG, PNG, or WEBP file. Analysis typically takes 2-4 minutes.",
            "2. Intelligence Vault: Every completed extraction is stored automatically and becomes searchable instantly.",
            "3. Asset Tabs: Move through Intelligence, Signals, Psychology, Blueprint, and Market Pulse in order.",
            "4. Intelligence Pulse: Compare two ads head-to-head with a differential diagnostic.",
            "5. Sovereign Boards: Curate extractions into client or competitor collections."
        ]
    },
    {
        title: "Intelligence Pulse",
        icon: Activity,
        description: "The differential diagnostic engine compares any two ads in your vault head-to-head and surfaces the strategic gap.",
        bullets: [
            "Select CONTROL (Asset A): your benchmark or incumbent creative.",
            "Select PROPOSED (Asset B): the challenger, variant, or competitor.",
            "Initiate Differential Diagnostic: analysis takes 3-5 minutes.",
            "The system cross-references both full dossiers and surfaces trigger, posture, and execution deltas.",
            "Results are stored against both assets and can be re-run at any time."
        ]
    },
    {
        title: "Analysis Timing & Troubleshooting",
        icon: Wrench,
        description: "What to expect and what to do if something appears delayed or interrupted.",
        bullets: [
            "Standard Analysis: 2-4 minutes. Differential Diagnostic: 3-5 minutes.",
            "Do not close the browser tab during analysis. Processing runs server-side but progress is tracked client-side.",
            "If analysis appears stuck, wait the full 5 minutes and then check the Intelligence Vault first.",
            "If no new entry appears after 6 minutes, contact support@visualdecompiler.com with your asset ID.",
            "Supported files: JPG, PNG, WEBP. Static images only. Max 25MB."
        ]
    },
    {
        title: "Sovereign Boards",
        icon: FolderKanban,
        description: "Curated intelligence collections for client delivery, campaign grouping, and competitor-set organisation.",
        bullets: [
            "Create a board and give it a client name, campaign reference, or strategic brief.",
            "Add assets from your Intelligence Vault into the board collection.",
            "Use boards to organise competitive sets, seasonal campaigns, or delivery-ready client packs.",
            "Boards remain private to your agency account unless exported through a client-facing deliverable flow."
        ]
    }
];

const FAQS = [
    {
        question: "Where do my completed analyses go?",
        answer: "All extractions are automatically stored in your Intelligence Vault. You can return there from the sidebar at any time."
    },
    {
        question: "Why is my analysis taking longer than 5 minutes?",
        answer: "Occasionally the AI processing queue experiences delays. Check your Vault first, because the result may already be there even if the progress bar looked frozen."
    },
    {
        question: "What file types are supported?",
        answer: "JPG, PNG, and WEBP. Static images only, up to 25MB. For best results, upload the highest-resolution version of the ad."
    },
    {
        question: "Can I analyse the same ad twice?",
        answer: "SHA-256 deduplication means uploading an identical file returns the existing extraction. Make a minor file change if you truly need a fresh analysis."
    },
    {
        question: "How do I set up white-labelling?",
        answer: "Go to Agency Settings, enter your agency name, primary hex, and logo URL, then toggle Sovereign Whitelabel Mode on and save. This requires Agency Sovereignty."
    },
    {
        question: "What is Intelligence Pulse?",
        answer: "A differential diagnostic engine that compares two ads from your vault and surfaces where their persuasion architectures diverge."
    },
    {
        question: "Can I export a dossier without white-labelling?",
        answer: "Yes. Asset dossiers and differential dossiers can still be exported without whitelabel enabled, and they will carry Visual Decompiler branding."
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
                            Help<br />
                            <span className="text-[#C1A67B]">Centre.</span>
                        </h1>
                        <p className="mt-8 max-w-2xl text-base leading-relaxed text-[#6B6B6B] font-medium">
                            Operational guidance for ingestion, dossier navigation, Intelligence Pulse, white-labelling, and agency delivery workflows.
                        </p>
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

                    <section className="mt-24">
                        <div className="mb-10">
                            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C1A67B] mb-3">Frequently Asked Questions</p>
                            <h2 className="text-3xl md:text-5xl font-semibold text-[#141414] tracking-tight uppercase leading-[0.92]">
                                Common<br />
                                <span className="text-[#C1A67B]">Operational Questions</span>
                            </h2>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {FAQS.map((faq) => (
                                <article key={faq.question} className="bg-white rounded-[28px] border border-[#E7DED1] p-8 shadow-[0_4px_24px_rgba(20,20,20,0.02)]">
                                    <h3 className="text-lg font-semibold text-[#141414] tracking-tight mb-4">{faq.question}</h3>
                                    <p className="text-sm leading-relaxed text-[#6B6B6B] font-medium">{faq.answer}</p>
                                </article>
                            ))}
                        </div>
                    </section>

                    <section className="mt-24 rounded-[32px] border border-[#E7DED1] bg-[#141414] p-8 md:p-12 text-[#FBF7EF] shadow-[0_24px_60px_rgba(20,20,20,0.08)]">
                        <div className="max-w-3xl">
                            <p className="text-[10px] font-bold tracking-[0.35em] uppercase text-[#C1A67B] mb-4">Need Further Assistance?</p>
                            <h2 className="text-3xl md:text-5xl font-semibold tracking-tight uppercase leading-[0.95] mb-5">
                                Support for technical, billing, and enterprise questions.
                            </h2>
                            <p className="text-base leading-relaxed text-[#FBF7EF]/65 font-medium">
                                If your question is not answered above, our team can help with analysis delays, billing, whitelabel setup, and enterprise deployment enquiries.
                            </p>
                            <div className="mt-8 flex flex-col md:flex-row md:items-center gap-4">
                                <a
                                    href="mailto:support@visualdecompiler.com"
                                    className="inline-flex items-center gap-3 rounded-full bg-[#C1A67B] px-6 py-4 text-[11px] font-bold uppercase tracking-[0.24em] text-[#141414] transition-colors hover:bg-[#D4B88A]"
                                >
                                    <Mail className="w-4 h-4" />
                                    Email Support
                                </a>
                                <span className="text-[11px] font-medium uppercase tracking-[0.16em] text-[#FBF7EF]/40">
                                    Typical response: within 24 hours
                                </span>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}
