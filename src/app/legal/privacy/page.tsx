import type { Metadata } from 'next';
import UnifiedSovereignHeader from '@/components/UnifiedSovereignHeader';
import FooterStartNow from '@/components/marketing/FooterStartNow';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Privacy policy for Visual Decompiler.',
};

export default function PrivacyPolicyPage() {
    return (
        <main>
            <UnifiedSovereignHeader primaryCta={{ label: 'Start Free', href: '/ingest' }} />

            <section className="bg-[#FBFBF6] px-6 pt-[140px] pb-20 md:px-10">
                <div className="mx-auto max-w-[900px]">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#8A8A84]">Legal</p>
                    <h1 className="mt-4 text-[34px] md:text-[44px] font-black uppercase leading-[0.95] tracking-[-0.02em] text-[#141414]">
                        Privacy Policy
                    </h1>
                    <p className="mt-4 text-[14px] leading-relaxed text-[#6B6B6B]">
                        Last updated: May 15, 2026
                    </p>

                    <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[#2A2A2A]">
                        <div className="space-y-3">
                            <h2 className="text-[12px] font-black uppercase tracking-[0.22em] text-[#141414]">Summary</h2>
                            <p>
                                Visual Decompiler is built to help you review creative work. We only use information needed to operate the
                                site, provide the product, and improve reliability.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-[12px] font-black uppercase tracking-[0.22em] text-[#141414]">Analytics</h2>
                            <p>
                                We may collect basic usage analytics (e.g. page views and navigation) to understand site performance and
                                improve the experience.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-[12px] font-black uppercase tracking-[0.22em] text-[#141414]">Uploads & Processing</h2>
                            <p>
                                If you upload assets inside the app, we process them to generate your analysis and related outputs. Do not
                                upload anything you do not have rights to use.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-[12px] font-black uppercase tracking-[0.22em] text-[#141414]">Third-Party Services</h2>
                            <p>
                                We may use third-party providers for hosting, analytics, and error monitoring. These services may process
                                limited technical data (like IP address, user agent, and request metadata) to provide their functionality.
                            </p>
                        </div>

                        <div className="space-y-3">
                            <h2 className="text-[12px] font-black uppercase tracking-[0.22em] text-[#141414]">Contact</h2>
                            <p>
                                Questions about this policy: <a className="underline underline-offset-4" href="mailto:hello@visualdecompiler.com">hello@visualdecompiler.com</a>
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

