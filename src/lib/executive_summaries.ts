export type Slide = {
    title: string;
    subtitle?: string;
    content?: string;
    type: 'title' | 'stat' | 'insight' | 'conclusion';
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
    }): Promise<ExecutiveSummary> {
        // This is the client-side stub / local logic. 
        // Real synthesis happens via the /api/summarize route which uses GPT-4o.

        const slides: Slide[] = [
            {
                title: params.boardName,
                subtitle: "Strategic Executive Summary",
                type: 'title'
            }
        ];

        // Add some basic stats slides based on input
        if (params.stats.length > 0) {
            slides.push({
                title: "Market Landscape",
                subtitle: "Dominant Creative Mechanics",
                type: 'stat',
                metrics: params.stats.slice(0, 3).map(s => ({
                    label: s.key.replace('_', ' ').toUpperCase(),
                    value: `${Math.round(s.percentage)}%`
                }))
            });
        }

        return {
            slides,
            generatedAt: new Date().toISOString()
        };
    }
}
