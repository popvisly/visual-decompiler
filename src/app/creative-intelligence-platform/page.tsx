import type { Metadata } from 'next';
import PersonaLandingPage from '@/components/marketing/PersonaLandingPage';
import SoftwareApplicationJsonLd from '@/components/seo/SoftwareApplicationJsonLd';
import { CREATIVE_INTELLIGENCE_PLATFORM_PAGE } from '@/lib/persona-pages';

export const metadata: Metadata = {
    title: 'Creative Intelligence Platform',
    description:
        'Visual Decompiler is a creative intelligence platform that turns ad creative into structured analysis, strategic proof, and decision-ready rationale for teams and agencies.',
};

export default function CreativeIntelligencePlatformPage() {
    return (
        <>
            <SoftwareApplicationJsonLd
                pageUrl="https://www.visualdecompiler.com/creative-intelligence-platform"
                pageName="Creative Intelligence Platform"
                pageDescription="Visual Decompiler is a creative intelligence platform that turns ad creative into structured analysis, strategic proof, and decision-ready rationale for teams and agencies."
                pageKeywords={['creative intelligence platform', 'creative intelligence software', 'creative decision platform']}
            />
            <PersonaLandingPage page={CREATIVE_INTELLIGENCE_PLATFORM_PAGE} />
        </>
    );
}
