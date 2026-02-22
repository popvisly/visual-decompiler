/**
 * DeepAuditService
 * Provides high-IQ creative forensics for individual ad deconstructions.
 * Focuses on Pacing, Color Psychology, and Semiotics.
 */

export interface PacingAudit {
    cutIntensity: number; // 0-100
    rhythmicSync: string; // 'High', 'Medium', 'Low'
    pacingNotes: string;
    timeline: { t_ms: number; label: string; intensity: number }[];
}

export interface ColorAudit {
    dominantHex: string;
    paletteTheme: string;
    psychologicalTriggers: string[];
    categoryNorms: string; // How this fits or defies industry norms
}

export interface SemioticAudit {
    culturalIcons: string[];
    subtextualSignals: string[];
    meaningClaim: string;
}

export interface DeepAuditResult {
    pacing: PacingAudit;
    color: ColorAudit;
    semiotics: SemioticAudit;
}

export class DeepAuditService {
    /**
     * Analyzes the narrative arc and pacing segments.
     */
    static analyzePacing(digest: any): PacingAudit {
        const segments = digest.extraction?.narrative_arc?.arc_segments || [];
        const totalDuration = segments.length > 0 ? segments[segments.length - 1].t_ms : 0;

        // Calculate cut intensity (cuts per 10 seconds)
        const cutCount = segments.length;
        const cutsPer10s = totalDuration > 0 ? (cutCount / (totalDuration / 1000)) * 10 : 0;
        const intensity = Math.min(Math.round((cutsPer10s / 15) * 100), 100); // Normalized to 15 cuts/10s being 100%

        const timeline = segments.map((s: any, i: number) => ({
            t_ms: s.t_ms,
            label: s.label,
            intensity: i % 2 === 0 ? 80 : 40 // Alternating intensity for visualization
        }));

        return {
            cutIntensity: intensity,
            rhythmicSync: intensity > 70 ? 'High' : intensity > 40 ? 'Medium' : 'Low',
            pacingNotes: digest.extraction?.narrative_arc?.retention_mechanics || 'Strategic pacing logic inactive.',
            timeline
        };
    }

    /**
     * Maps hex codes to psychological and category intelligence.
     */
    static analyzeColor(digest: any): ColorAudit {
        const hex = digest.extraction?.dominant_color_hex || '141414';

        // Simulating a High-IQ lookup table for color psychology
        const hexLower = hex.toLowerCase().replace('#', '');

        let theme = 'Neutral / Corporate';
        let triggers = ['Professionalism', 'Stability'];

        if (hexLower.startsWith('f') || hexLower.startsWith('e')) {
            theme = 'Cream / High-Fashion';
            triggers = ['Luxury', 'Sophistication', 'Calm'];
        } else if (hexLower.includes('ff') && hexLower.length === 6) {
            theme = 'Vibrant / Disruptive';
            triggers = ['Energy', 'Urgency', 'Attention'];
        }

        return {
            dominantHex: hex,
            paletteTheme: theme,
            psychologicalTriggers: triggers,
            categoryNorms: `This palette ${theme.includes('Luxury') ? 'aligns with' : 'pivots from'} traditional category standards for high-performance creative.`
        };
    }

    /**
     * Extracts semiotic meanings from visual and narrative cues.
     */
    static analyzeSemiotics(digest: any): SemioticAudit {
        const visualElements = digest.extraction?.notable_visual_elements || [];
        const subtext = digest.strategy?.semiotic_subtext || '';

        return {
            culturalIcons: visualElements.slice(0, 3),
            subtextualSignals: [subtext.split('.')[0]],
            meaningClaim: subtext
        };
    }

    /**
     * Orchestrates the total Deep Audit.
     */
    static perform(digest: any): DeepAuditResult {
        return {
            pacing: this.analyzePacing(digest),
            color: this.analyzeColor(digest),
            semiotics: this.analyzeSemiotics(digest)
        };
    }
}
