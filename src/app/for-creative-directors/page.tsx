import type { Metadata } from 'next';
import PersonaLandingPage from '@/components/marketing/PersonaLandingPage';
import { CREATIVE_DIRECTOR_PERSONA_PAGE } from '@/lib/persona-pages';

export const metadata: Metadata = {
    title: 'Visual Decompiler for Creative Directors',
    description:
        'Turn any brief into a direction your team can execute with structural logic, clone routes, and faster creative rationale.',
};

export default function CreativeDirectorsPage() {
    return <PersonaLandingPage page={CREATIVE_DIRECTOR_PERSONA_PAGE} />;
}
