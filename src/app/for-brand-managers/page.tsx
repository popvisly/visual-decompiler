import type { Metadata } from 'next';
import PersonaLandingPage from '@/components/marketing/PersonaLandingPage';
import { BRAND_MANAGER_PERSONA_PAGE } from '@/lib/persona-pages';

export const metadata: Metadata = {
    title: 'Visual Decompiler for Brand Managers',
    description:
        'Evaluate agency work with precision, not opinion, using structured creative analysis, category context, and readable strategic output.',
};

export default function BrandManagersPage() {
    return <PersonaLandingPage page={BRAND_MANAGER_PERSONA_PAGE} />;
}
