export type Slide = {
    title: string;
    subtitle?: string;
    content?: string;
    type: 'title' | 'stat' | 'insight' | 'conclusion' | 'sentiment';
    metrics?: { label: string; value: string }[];
};

export type ExecutiveSummary = {
    slides: Slide[];
    generatedAt: string;
};

export class ExecutiveSummaryService {
    /**
     * Synthesizes a collection of slides from the strategic answer and board data.
     */
    static async generate(params: {
        boardName: string;
        strategicAnswer: string;
        stats: any[];
        sentiment?: any;
    }): Promise<ExecutiveSummary> {
        // Real synthesis happens via the /api/summarize route which uses GPT-4o.
        const res = await fetch('/api/summarize', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(params)
        });

        if (!res.ok) throw new Error("Failed to generate summary slides");

        return await res.json();
    }
}
