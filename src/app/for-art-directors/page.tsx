import type { Metadata } from 'next';
import PersonaLandingPage from '@/components/marketing/PersonaLandingPage';
import { ART_DIRECTOR_PERSONA_PAGE } from '@/lib/persona-pages';

export const metadata: Metadata = {
    title: 'Visual Decompiler for Art Directors',
    description:
        'Upload your work-in-progress ad and get a precise read on what is working, what is not, and what to change before you present it.',
};

export default function ArtDirectorsPage() {
    return <PersonaLandingPage page={ART_DIRECTOR_PERSONA_PAGE} />;
}
