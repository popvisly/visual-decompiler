import type { Metadata } from 'next';
import PersonaLandingPage from '@/components/marketing/PersonaLandingPage';
import { NEW_BUSINESS_PERSONA_PAGE } from '@/lib/persona-pages';

export const metadata: Metadata = {
    title: 'Visual Decompiler for New Business',
    description:
        'Walk into any pitch knowing the category better than the room with competitive intelligence, whitespace analysis, and white-label dossier output.',
};

export default function NewBusinessPage() {
    return <PersonaLandingPage page={NEW_BUSINESS_PERSONA_PAGE} />;
}
