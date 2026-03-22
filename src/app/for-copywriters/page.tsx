import type { Metadata } from 'next';
import PersonaLandingPage from '@/components/marketing/PersonaLandingPage';
import { COPYWRITER_PERSONA_PAGE } from '@/lib/persona-pages';

export const metadata: Metadata = {
    title: 'Visual Decompiler for Copywriters',
    description:
        'Understand the emotional logic behind any visual so your words land in the same register, with psychology and audience intelligence in under 60 seconds.',
};

export default function CopywritersPage() {
    return <PersonaLandingPage page={COPYWRITER_PERSONA_PAGE} />;
}
