import type { Metadata } from 'next';
import PersonaLandingPage from '@/components/marketing/PersonaLandingPage';
import { STRATEGY_DIRECTOR_PERSONA_PAGE } from '@/lib/persona-pages';

export const metadata: Metadata = {
    title: 'Visual Decompiler for Strategy Directors',
    description:
        'Back every creative recommendation with structured intelligence, market pulse analysis, and white-label strategic output.',
};

export default function StrategyDirectorsPage() {
    return <PersonaLandingPage page={STRATEGY_DIRECTOR_PERSONA_PAGE} />;
}
