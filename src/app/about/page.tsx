import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-[#FBFBF6]">
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Analysis', href: '/ingest' }} />

            <section className="px-6 pb-16 pt-32 md:pt-40">
                <div className="mx-auto max-w-5xl">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#C1A67B]">About Visual Decompiler</p>
                    <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.22em] text-[#8A7B64]">Forensic Advertising Intelligence OS</p>
                    <h1 className="mt-4 text-[38px] font-semibold leading-[0.95] tracking-tight text-[#141414] md:text-[64px]">
                        Advertising intelligence for agencies that need defensible decisions.
                    </h1>

                    <div className="mt-8 space-y-6 text-[17px] leading-relaxed text-[#5E5A53] md:text-[19px]">
                        <p>
                            Visual Decompiler was built for teams who need more than generic AI outputs and more than subjective creative opinion.
                            It is designed to be more convenient than manual analysis, while going significantly deeper than using ChatGPT alone.
                        </p>
                        <p>
                            By combining visual signal detection, strategic structure, and market context, Visual Decompiler turns creative assets
                            into strategic readouts teams can trust, reuse, and hand to clients with confidence.
                        </p>
                        <p>
                            What began as a forensic prototype has evolved into a full agency intelligence platform. Teams can ingest and compare assets,
                            generate structured dossiers, build persistent vault memory, collaborate through boards, and move from diagnosis to execution
                            without losing context.
                        </p>
                        <p>
                            With white-label controls, agencies and consultants can deliver this intelligence as their own premium client-facing system —
                            turning analysis into branded strategic authority.
                        </p>
                    </div>
                </div>
            </section>
        </main>
    );
}
