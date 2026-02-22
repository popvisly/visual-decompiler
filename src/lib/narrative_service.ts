export type WhitePaperSection = {
    title: string;
    content: string; // Markdown
    type: 'analysis' | 'evidence' | 'hypothesis';
};

export type StrategicWhitePaper = {
    title: string;
    description: string;
    sections: WhitePaperSection[];
    generatedAt: string;
};

export class NarrativeService {
    /**
     * Generates a long-form strategic white paper from board intelligence.
     */
    static async generate(params: {
        boardId: string;
        boardName: string;
        strategicAnswer: string;
        sentiment: any;
        forecasting: any;
        visualDna: string;
    }): Promise<StrategicWhitePaper> {
        const res = await fetch('/api/narrative', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        if (!res.ok) throw new Error("Narrative synthesis failed");

        return await res.json();
    }
}
