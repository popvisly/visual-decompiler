import type { Metadata } from 'next';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Terms of service for Visual Decompiler.',
};

export default function TermsPage() {
    return (
        <main>
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Free', href: '/ingest' }} />

            <section className="bg-[#FBFBF6] px-6 pt-[140px] pb-20 md:px-10">
                <div className="mx-auto max-w-[900px]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8A8A84]">Legal</p>
                    <h1 className="mt-4 text-[34px] md:text-[44px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#141414]">
                        Terms of Service
                    </h1>
                    <p className="mt-4 text-[14px] leading-relaxed text-[#6B6B6B]">
                        Last updated: May 15, 2026
                    </p>

                    <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[#2A2A2A]">
                        <div className="space-y-3">
                            <h2 className="text-[12px] font-black uppercase tracking-[0.22em] text-[#141414]">Use of Service</h2>
                            <p>
                                By using Visual Decompiler, you agree to use the product responsibly and only upload or analyze content you
                                have the rights to use.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-[12px] font-black uppercase tracking-[0.22em] text-[#141414]">No Professional Advice</h2>
                            <p>
                                Outputs are for informational purposes only and are not legal, financial, or professional advice. You remain
                                responsible for decisions made using the service.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-[12px] font-black uppercase tracking-[0.22em] text-[#141414]">Availability</h2>
                            <p>
                                We may modify, suspend, or discontinue parts of the service at any time. We do not guarantee uninterrupted
                                access.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-[12px] font-black uppercase tracking-[0.22em] text-[#141414]">Contact</h2>
                            <p>
                                Questions about these terms: <a className="underline underline-offset-4" href="mailto:hello@visualdecompiler.com">hello@visualdecompiler.com</a>
                            </p>
                        </div>

                        <p className="text-[12px] leading-relaxed text-[#6B6B6B]">
                            This page is provided for general information and does not constitute legal advice.
                        </p>
                    </div>
                </div>
            </section>

            <FooterStartNow />
        </main>
    );
}

