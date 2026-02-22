export type LiveSignal = {
    id: string;
    source: 'social' | 'news' | 'cultural_shift';
    content: string;
    impact: number; // -1 to 1
    dimension: 'emotional' | 'intellectual' | 'production' | 'aggression';
    timestamp: string;
};

export type BoardLiveStatus = {
    volatility: number;
    currentResonance: number;
    activeSignals: LiveSignal[];
    marketPulseLabel: string;
};

export class LiveSignalService {
    /**
     * Generates a set of simulated live signals for a specific category.
     */
    static getLiveSignals(category: string): LiveSignal[] {
        const timestamp = new Date().toISOString();
        const templates = [
            { source: 'social', content: `Surge in "de-influencing" content affecting ${category} category leaders.`, impact: -0.4, dimension: 'production' },
            { source: 'news', content: `New regulatory focus on transparency in ${category} advertising claims.`, impact: 0.2, dimension: 'intellectual' },
            { source: 'cultural_shift', content: `Aesthetic pivot towards "Raw Authenticity" trending in high-fashion circles.`, impact: 0.6, dimension: 'production' },
            { source: 'social', content: `Viral debate regarding the "Aggressive Neutrality" of recent ${category} campaigns.`, impact: -0.2, dimension: 'aggression' },
            { source: 'news', content: `${category} consumers showing higher sensitivity to emotional exploitation.`, impact: -0.5, dimension: 'emotional' },
        ];

        return templates.map((t, i) => ({
            id: `sig-${i}-${Date.now()}`,
            ...t,
            timestamp
        } as LiveSignal));
    }

    /**
     * Computes the live status of a board based on simulated signals.
     */
    static calculateLiveStatus(boardMetrics: any, signals: LiveSignal[]): BoardLiveStatus {
        const volatility = Math.random() * 0.4 + 0.1; // Simulated base volatility

        // Simple resonance: how well the board's metrics align with the direction of the signals
        let totalResonance = 0.5;
        signals.forEach(s => {
            // If the board over-indexes on a dimension where the signal is positive, resonance increases
            const dir = s.impact > 0 ? 1 : -1;
            totalResonance += (dir * 0.05);
        });

        const clampedResonance = Math.max(0, Math.min(1, totalResonance));

        let label = 'Steady';
        if (volatility > 0.4) label = 'High Turbulence';
        else if (clampedResonance > 0.7) label = 'Optimal Resonance';
        else if (clampedResonance < 0.3) label = 'Strategic Dissonance';

        return {
            volatility,
            currentResonance: clampedResonance,
            activeSignals: signals,
            marketPulseLabel: label
        };
    }
}
