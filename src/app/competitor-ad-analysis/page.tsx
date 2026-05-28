import type { Metadata } from 'next';
import PersonaLandingPage from '@/components/marketing/PersonaLandingPage';
import SoftwareApplicationJsonLd from '@/components/seo/SoftwareApplicationJsonLd';
import { COMPETITOR_AD_ANALYSIS_PAGE } from '@/lib/persona-pages';

export const metadata: Metadata = {
    title: 'Competitor Ad Analysis',
    description:
        'Analyze competitor ads with structured creative intelligence, persuasive-signal breakdowns, and decision-ready rationale for teams and agencies.',
};

export default function CompetitorAdAnalysisPage() {
    return (
        <>
            <SoftwareApplicationJsonLd
                pageUrl="https://www.visualdecompiler.com/competitor-ad-analysis"
                pageName="Competitor Ad Analysis"
                pageDescription="Analyze competitor ads with structured creative intelligence, persuasive-signal breakdowns, and decision-ready rationale for teams and agencies."
                pageKeywords={['competitor ad analysis', 'competitor creative analysis', 'ad competitor intelligence']}
            />
            <PersonaLandingPage page={COMPETITOR_AD_ANALYSIS_PAGE} />
        </>
    );
}
