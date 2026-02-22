/**
 * VisualDNAService
 * Extracts "Aesthetic Logic" and production-level patterns from ad deconstructions.
 * Focuses on Framing, Lighting, and Motion patterns.
 */

export interface VisualDNA {
    framingLogic: string; // 'Close-up heavy', 'Wide/Environmental', 'POV/Immersive'
    lightingArchetype: string; // 'Chiaroscuro/Moody', 'High-Key/Commercial', 'Natural/Organic'
    motionPattern: string; // 'Dynamic/Handheld', 'Static/Clinical', 'Fluid/Cinematic'
    productionDirectives: string[];
}

export class VisualDNAService {
    /**
     * Extracts Visual DNA from a digest.
     */
    static extract(digest: any): VisualDNA {
        const visualElements = digest.extraction?.notable_visual_elements || [];
        const composition = digest.extraction?.composition_notes?.toLowerCase() || '';
        const narrativeSegments = digest.extraction?.narrative_arc?.arc_segments || [];

        // 1. Framing Logic
        let framing = 'Mixed Strategic Frames';
        if (composition.includes('close-up') || composition.includes('macro')) {
            framing = 'Close-up / Intimate Focus';
        } else if (composition.includes('wide') || composition.includes('establishing')) {
            framing = 'Wide / Environmental Context';
        } else if (composition.includes('pov') || composition.includes('first-person')) {
            framing = 'POV / Immersive Presence';
        }

        // 2. Lighting Archetype
        let lighting = 'Standard Commercial Balance';
        if (composition.includes('moody') || composition.includes('shadow') || composition.includes('dark')) {
            lighting = 'Chiaroscuro / Moody Sophistication';
        } else if (composition.includes('bright') || composition.includes('clean') || composition.includes('soft')) {
            lighting = 'High-Key / Premium Commercial';
        } else if (composition.includes('sun') || composition.includes('natural')) {
            lighting = 'Natural / Organic Sunlight';
        }

        // 3. Motion Pattern
        let motion = 'Static / Controlled';
        const hasRapidSegments = narrativeSegments.some((s: any) => s.strategy_note?.toLowerCase().includes('fast') || s.strategy_note?.toLowerCase().includes('cut'));
        if (composition.includes('handheld') || composition.includes('shake') || hasRapidSegments) {
            motion = 'Dynamic / Organic Handheld';
        } else if (composition.includes('smooth') || composition.includes('gimbal') || composition.includes('tracking')) {
            motion = 'Fluid / Cinematic Movement';
        }

        // 4. Production Directives (The "How-to")
        const directives = [];
        if (framing.includes('Close-up')) directives.push('Use 85mm+ lenses for shallow depth-of-field intimate deconstructions.');
        if (lighting.includes('Moody')) directives.push('Leverage 2:1 lighting ratios with negative fill to maintain high-IQ shadows.');
        if (motion.includes('Handheld')) directives.push('Utilize organic camera shake (12-24fps) to simulate authentic UGC proximity.');
        if (directives.length === 0) directives.push('Maintain clean, center-weighted compositions for maximum cognitive ease.');

        return {
            framingLogic: framing,
            lightingArchetype: lighting,
            motionPattern: motion,
            productionDirectives: directives
        };
    }

    /**
     * Aggregates DNA across multiple ads (for board synthesis).
     */
    static aggregate(digests: any[]): string {
        const dnas = digests.map(d => this.extract(d));
        const framingCounts: Record<string, number> = {};
        const lightingCounts: Record<string, number> = {};
        const motionCounts: Record<string, number> = {};

        dnas.forEach(dna => {
            framingCounts[dna.framingLogic] = (framingCounts[dna.framingLogic] || 0) + 1;
            lightingCounts[dna.lightingArchetype] = (lightingCounts[dna.lightingArchetype] || 0) + 1;
            motionCounts[dna.motionPattern] = (motionCounts[dna.motionPattern] || 0) + 1;
        });

        const topFraming = Object.entries(framingCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
        const topLighting = Object.entries(lightingCounts).sort((a, b) => b[1] - a[1])[0]?.[0];
        const topMotion = Object.entries(motionCounts).sort((a, b) => b[1] - a[1])[0]?.[0];

        return `The competitive collection heavily utilizes ${topFraming} with ${topLighting} and ${topMotion} motion patterns.`.trim();
    }
}
