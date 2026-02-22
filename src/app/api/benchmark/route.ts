import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { BenchmarkService } from '@/lib/benchmark_service';
import { getOpenAI } from '@/lib/vision';

export async function GET(
    req: Request
) {
    try {
        const { userId } = await auth();
        if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const searchParams = new URL(req.url).searchParams;
        const boardId = searchParams.get('boardId');

        if (!boardId) return NextResponse.json({ error: "boardId is required" }, { status: 400 });

        const benchmark = await BenchmarkService.getBenchmark(boardId);

        // Optional: Enhance the "Ideal" strategy with GPT-4o for real dynamic insights
        const openai = getOpenAI();
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [
                {
                    role: 'system',
                    content: `You are a Category Intel Lead. Compare these Board Metrics against the Category Average. 
                    Identify a high-value "Strategic Whitespace" move. 
                    
                    Return JSON:
                    {
                        "title": string,
                        "description": string,
                        "strategy": string
                    }`
                },
                {
                    role: 'user',
                    content: `Category: ${benchmark.category}\nBoard Metrics: ${JSON.stringify(benchmark.board)}\nCategory Average: ${JSON.stringify(benchmark.average)}`
                }
            ],
            response_format: { type: "json_object" }
        });

        const ideal = JSON.parse(response.choices[0].message.content || '{}');
        benchmark.ideal = ideal;

        return NextResponse.json(benchmark);

    } catch (err: any) {
        console.error("[Benchmark API] Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
