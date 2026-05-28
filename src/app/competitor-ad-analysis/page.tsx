import type { Metadata } from 'next';
import PersonaLandingPage from '@/components/marketing/PersonaLandingPage';
import { COMPETITOR_AD_ANALYSIS_PAGE } from '@/lib/persona-pages';

export const metadata: Metadata = {
    title: 'Competitor Ad Analysis',
    description:
        'Analyze competitor ads with structured creative intelligence, persuasive-signal breakdowns, and decision-ready rationale for teams and agencies.',
};

export default function CompetitorAdAnalysisPage() {
    return <PersonaLandingPage page={COMPETITOR_AD_ANALYSIS_PAGE} />;
}
