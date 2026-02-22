export type EmotionalMetric = {
    label: string;
    score: number; // 0 to 100
    resonance: 'High' | 'Medium' | 'Low';
    description: string;
};

export type SentimentMirrorData = {
    metrics: EmotionalMetric[];
    psychologicalFootprint: string;
    alignmentScore: number;
};

export class SentimentAnalysisService {
    /**
     * Maps creative mechanics and market pulse to emotional and psychological resonance.
     */
    static async analyze(params: {
        boardId: string;
        ads: any[];
        pulseText: string | null;
    }): Promise<SentimentMirrorData> {
        // Implementation will call /api/sentiment
        const res = await fetch('/api/sentiment', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        if (!res.ok) throw new Error("Failed to analyze sentiment");

        return await res.json();
    }
}
