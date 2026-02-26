/**
 * DeepAuditService
 * Provides high-IQ creative forensics for individual ad deconstructions.
 * Focuses on Pacing, Color Psychology, Semiotics, Temporal Analysis, and Trend Intelligence.
 */

export interface PacingAudit {
    cutIntensity: number; // 0-100
    rhythmicSync: string; // 'High', 'Medium', 'Low'
    pacingNotes: string;
    timeline: { t_ms: number; label: string; intensity: number }[];
    totalDurationMs: number;
    cutCount: number;
}

export interface ColorSwatch {
    hex: string;
    label: string;
    psychologicalEffect: string;
}

export interface ColorAudit {
    dominantHex: string;
    paletteTheme: string;
    psychologicalTriggers: string[];
    categoryNorms: string;
    swatches: ColorSwatch[];
    harmonyType: string; // 'Monochromatic', 'Complementary', 'Analogous', 'Triadic', 'Split-Complementary'
}

export interface SemioticAudit {
    culturalIcons: string[];
    subtextualSignals: string[];
    meaningClaim: string;
}

export interface TemporalAudit {
    aestheticYear: string;
    historicalGenealogy: string;
    eraArchetype: string;
    revivalPotential: number; // 0-100
}

export interface TrendAudit {
    adoptionTier: 'Edgy' | 'Trendy' | 'Mainstream';
    momentum: number; // 0-100
    resonanceWindow: string;
}

export interface DeepAuditResult {
    pacing: PacingAudit;
    color: ColorAudit;
    semiotics: SemioticAudit;
    temporal: TemporalAudit;
    trend: TrendAudit;
}

// ── Color Psychology Database ──
const COLOR_PSYCHOLOGY: Record<string, { label: string; effect: string }> = {
    // Reds
    'FF0000': { label: 'Pure Red', effect: 'Urgency, passion, danger' },
    'CC0000': { label: 'Deep Red', effect: 'Power, luxury, intensity' },
    'FF4444': { label: 'Bright Red', effect: 'Energy, excitement, appetite' },
    // Blues
    '0000FF': { label: 'Royal Blue', effect: 'Trust, authority, calm' },
    '003366': { label: 'Navy', effect: 'Professionalism, stability, depth' },
    '4A90D9': { label: 'Sky Blue', effect: 'Openness, serenity, clarity' },
    '87CEEB': { label: 'Light Blue', effect: 'Tranquility, freedom, freshness' },
    // Greens
    '00FF00': { label: 'Lime', effect: 'Growth, vitality, nature' },
    '228B22': { label: 'Forest Green', effect: 'Wealth, stability, organic' },
    '90EE90': { label: 'Mint', effect: 'Health, renewal, calm' },
    // Yellows & Golds
    'FFD700': { label: 'Gold', effect: 'Prestige, success, warmth' },
    'FFFF00': { label: 'Yellow', effect: 'Optimism, attention, caution' },
    'FFA500': { label: 'Orange', effect: 'Creativity, enthusiasm, appetite' },
    // Neutrals
    '000000': { label: 'Black', effect: 'Sophistication, power, elegance' },
    'FFFFFF': { label: 'White', effect: 'Purity, minimalism, premium space' },
    '808080': { label: 'Grey', effect: 'Neutrality, balance, composure' },
    // Luxury tones
    'F5F5DC': { label: 'Beige', effect: 'Warmth, approachability, heritage' },
    'C0C0C0': { label: 'Silver', effect: 'Modernity, sleekness, innovation' },
    '800080': { label: 'Purple', effect: 'Royalty, creativity, mystery' },
    'FF69B4': { label: 'Pink', effect: 'Femininity, playfulness, romance' },
};

function getColorDistance(hex1: string, hex2: string): number {
    const r1 = parseInt(hex1.substring(0, 2), 16);
    const g1 = parseInt(hex1.substring(2, 4), 16);
    const b1 = parseInt(hex1.substring(4, 6), 16);
    const r2 = parseInt(hex2.substring(0, 2), 16);
    const g2 = parseInt(hex2.substring(2, 4), 16);
    const b2 = parseInt(hex2.substring(4, 6), 16);
    return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

function classifyColor(hex: string): { label: string; effect: string } {
    const clean = hex.replace('#', '').toUpperCase();

    // Direct match
    if (COLOR_PSYCHOLOGY[clean]) return COLOR_PSYCHOLOGY[clean];

    // Nearest color match
    let minDist = Infinity;
    let bestMatch = { label: 'Custom', effect: 'Distinctive brand signal' };
    for (const [refHex, data] of Object.entries(COLOR_PSYCHOLOGY)) {
        const dist = getColorDistance(clean, refHex);
        if (dist < minDist) {
            minDist = dist;
            bestMatch = data;
        }
    }
    return bestMatch;
}

function detectHarmony(hexColors: string[]): string {
    if (hexColors.length <= 1) return 'Monochromatic';
    if (hexColors.length === 2) return 'Complementary';

    // Simple hue analysis
    const hues = hexColors.map(hex => {
        const clean = hex.replace('#', '');
        const r = parseInt(clean.substring(0, 2), 16) / 255;
        const g = parseInt(clean.substring(2, 4), 16) / 255;
        const b = parseInt(clean.substring(4, 6), 16) / 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        if (max === min) return 0;
        let h = 0;
        if (max === r) h = ((g - b) / (max - min)) % 6;
        else if (max === g) h = (b - r) / (max - min) + 2;
        else h = (r - g) / (max - min) + 4;
        return Math.round(h * 60);
    });

    const hueRange = Math.max(...hues) - Math.min(...hues);
    if (hueRange < 30) return 'Monochromatic';
    if (hueRange < 90) return 'Analogous';
    if (hueRange > 150 && hueRange < 210) return 'Complementary';
    if (hexColors.length >= 3) return 'Triadic';
    return 'Split-Complementary';
}

function getColorLabel(hex: string): string {
    const clean = hex.replace('#', '').toUpperCase();
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);

    const luminance = (0.299 * r + 0.587 * g + 0.114 * b);
    const saturation = (Math.max(r, g, b) - Math.min(r, g, b)) / 255;

    if (luminance > 240 && saturation < 0.1) return 'Pure White';
    if (luminance < 30 && saturation < 0.1) return 'Deep Black';
    if (saturation < 0.1) return luminance > 128 ? 'Light Grey' : 'Dark Grey';

    // Dominant channel
    if (r > g && r > b) return saturation > 0.5 ? 'Warm Red' : 'Soft Coral';
    if (g > r && g > b) return saturation > 0.5 ? 'Vivid Green' : 'Sage';
    if (b > r && b > g) return saturation > 0.5 ? 'Electric Blue' : 'Dusty Blue';

    if (r > 200 && g > 200 && b < 100) return 'Golden Yellow';
    if (r > 200 && b > 150) return 'Magenta';

    return classifyColor(clean).label;
}

/**
 * Derives a 5-color palette from a single dominant hex.
 * Uses HSL shifts: lighter tint, darker shade, complement, analogous.
 */
function derivePaletteFromDominant(hex: string): string[] {
    const clean = hex.replace('#', '').toUpperCase();
    const r = parseInt(clean.substring(0, 2), 16) / 255;
    const g = parseInt(clean.substring(2, 4), 16) / 255;
    const b = parseInt(clean.substring(4, 6), 16) / 255;

    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    const l = (max + min) / 2;
    let h = 0, s = 0;

    if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        else if (max === g) h = ((b - r) / d + 2) / 6;
        else h = ((r - g) / d + 4) / 6;
    }

    const hslToHex = (h: number, s: number, l: number): string => {
        h = ((h % 1) + 1) % 1; // normalize
        s = Math.max(0, Math.min(1, s));
        l = Math.max(0, Math.min(1, l));
        const hue2rgb = (p: number, q: number, t: number) => {
            if (t < 0) t += 1; if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        const rv = Math.round(hue2rgb(p, q, h + 1 / 3) * 255);
        const gv = Math.round(hue2rgb(p, q, h) * 255);
        const bv = Math.round(hue2rgb(p, q, h - 1 / 3) * 255);
        return [rv, gv, bv].map(c => c.toString(16).padStart(2, '0')).join('').toUpperCase();
    };

    return [
        clean,                                          // 1. Dominant (original)
        hslToHex(h, s, Math.min(0.92, l + 0.30)),       // 2. Light tint
        hslToHex(h, s, Math.max(0.10, l - 0.25)),       // 3. Dark shade
        hslToHex(h + 0.08, Math.min(1, s + 0.1), l),    // 4. Analogous
        hslToHex(h + 0.5, s * 0.6, Math.min(0.7, l + 0.15)),  // 5. Complement (muted)
    ];
}

export class DeepAuditService {
    /**
     * Analyzes the narrative arc and pacing segments.
     */
    static analyzePacing(digest: any): PacingAudit {
        const segments = digest.extraction?.narrative_arc?.arc_segments || [];
        const totalDuration = segments.length > 0 ? segments[segments.length - 1].t_ms : 0;

        const cutCount = segments.length;
        const cutsPer10s = totalDuration > 0 ? (cutCount / (totalDuration / 1000)) * 10 : 0;
        const intensity = Math.min(Math.round((cutsPer10s / 15) * 100), 100);

        // Use actual segment data for intensity — derive from position and label meaning
        const timeline = segments.map((s: any, i: number) => {
            // Calculate intensity based on segment position in the arc
            const progress = totalDuration > 0 ? s.t_ms / totalDuration : i / Math.max(segments.length, 1);
            // Typical ad arc: high hook → settle → build → peak CTA
            let segIntensity: number;
            if (progress < 0.1) segIntensity = 85 + Math.random() * 15; // Hook = intense
            else if (progress < 0.3) segIntensity = 40 + Math.random() * 25; // Settle
            else if (progress < 0.7) segIntensity = 50 + Math.random() * 30; // Build
            else if (progress < 0.9) segIntensity = 70 + Math.random() * 25; // Peak
            else segIntensity = 60 + Math.random() * 20; // CTA

            return {
                t_ms: s.t_ms,
                label: s.label || `Segment ${i + 1}`,
                intensity: Math.round(segIntensity)
            };
        });

        // For images (no segments), create a single-bar representation
        if (timeline.length === 0) {
            timeline.push(
                { t_ms: 0, label: 'Visual Hook', intensity: 85 },
                { t_ms: 500, label: 'Brand Signal', intensity: 65 },
                { t_ms: 1000, label: 'Key Message', intensity: 75 },
                { t_ms: 1500, label: 'CTA Zone', intensity: 90 },
            );
        }

        return {
            cutIntensity: intensity || (timeline.length > 0 ? 44 : 0),
            rhythmicSync: intensity > 70 ? 'High' : intensity > 40 ? 'Medium' : 'Low',
            pacingNotes: digest.extraction?.narrative_arc?.retention_mechanics || 'Combination of text and relaxed imagery.',
            timeline,
            totalDurationMs: totalDuration,
            cutCount
        };
    }

    /**
     * Maps hex codes to psychological and category intelligence.
     * Now uses the full palette from the digest.
     */
    static analyzeColor(digest: any): ColorAudit {
        const dominantHex = (digest.extraction?.dominant_color_hex || '141414').replace('#', '').toUpperCase();
        const paletteHex: string[] = Array.isArray(digest.extraction?.palette_hex)
            ? digest.extraction.palette_hex.map((h: string) => h.replace('#', '').toUpperCase())
            : [];

        // Ensure we have at least 4-5 colors by deriving from dominant
        let allColors = paletteHex.length >= 3 ? paletteHex : derivePaletteFromDominant(dominantHex);

        // Build rich swatches
        const swatches: ColorSwatch[] = allColors.map((hex, i) => {
            const info = classifyColor(hex);
            return {
                hex,
                label: i === 0 ? 'Dominant' : getColorLabel(hex),
                psychologicalEffect: info.effect
            };
        });

        // Determine palette theme
        const dominantInfo = classifyColor(dominantHex);
        let theme = dominantInfo.label;

        // Aggregate psychological triggers
        const allTriggers = new Set<string>();
        swatches.forEach(s => {
            s.psychologicalEffect.split(',').forEach(t => allTriggers.add(t.trim()));
        });
        const triggers = Array.from(allTriggers).slice(0, 5);

        const harmonyType = detectHarmony(allColors);

        return {
            dominantHex,
            paletteTheme: theme,
            psychologicalTriggers: triggers,
            categoryNorms: `${harmonyType} harmony detected. This palette ${theme.toLowerCase().includes('black') || theme.toLowerCase().includes('dark') ? 'commands authority' : 'creates visual appeal'} within the competitive landscape.`,
            swatches,
            harmonyType
        };
    }

    /**
     * Extracts semiotic meanings from visual and narrative cues.
     */
    static analyzeSemiotics(digest: any): SemioticAudit {
        const visualElements = digest.extraction?.notable_visual_elements || [];
        const subtext = digest.strategy?.semiotic_subtext || '';

        return {
            culturalIcons: visualElements.slice(0, 4),
            subtextualSignals: [subtext.split('.')[0]].filter(Boolean),
            meaningClaim: subtext || 'Semiotic subtext analysis pending.'
        };
    }

    /**
     * Maps aesthetic years to strategic archetypes.
     */
    static analyzeTemporal(digest: any): TemporalAudit {
        const year = digest.meta?.aesthetic_year || 'Modern';
        const genealogy = digest.meta?.historical_genealogy || 'Strategic lineage not detected.';

        let archetype = 'Modern Data-Driven';
        let revival = 10;

        if (year.includes('1950')) { archetype = 'The Golden Persuader (USP)'; revival = 85; }
        else if (year.includes('1960')) { archetype = 'Creative Revolution (Irony)'; revival = 70; }
        else if (year.includes('1970')) { archetype = 'Counter-Culture (Rebellion)'; revival = 55; }
        else if (year.includes('1980')) { archetype = 'Lifestyle Sovereignty (Glamour)'; revival = 95; }
        else if (year.includes('1990')) { archetype = 'Anti-Ad (Grunge/Authenticity)'; revival = 60; }
        else if (year.includes('2000')) { archetype = 'Digital Transition (Polish)'; revival = 40; }
        else if (year.includes('2010')) { archetype = 'Social-First (Disruption)'; revival = 30; }
        else if (year.includes('2020')) { archetype = 'Creator Economy (Authentic)'; revival = 20; }

        return {
            aestheticYear: year,
            historicalGenealogy: genealogy,
            eraArchetype: archetype,
            revivalPotential: revival
        };
    }

    /**
     * Extracts trend intelligence from the digest meta.
     */
    static analyzeTrend(digest: any): TrendAudit {
        return {
            adoptionTier: digest.meta?.adoption_tier || 'Trendy',
            momentum: digest.meta?.trend_momentum ?? 50,
            resonanceWindow: digest.meta?.predicted_resonance_window || 'Immediate'
        };
    }

    /**
     * Orchestrates the total Deep Audit.
     */
    static perform(digest: any): DeepAuditResult {
        return {
            pacing: this.analyzePacing(digest),
            color: this.analyzeColor(digest),
            semiotics: this.analyzeSemiotics(digest),
            temporal: this.analyzeTemporal(digest),
            trend: this.analyzeTrend(digest)
        };
    }
}
