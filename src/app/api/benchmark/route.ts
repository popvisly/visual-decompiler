import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth-server';
import { BenchmarkService, type BenchmarkData } from '@/lib/benchmark_service';
import { getOpenAI } from '@/lib/vision';

const BENCHMARK_STYLE_CONTRACT = [
    'STYLE CONTRACT (MANDATORY): Use clean strategy language that is calm, direct, and boardroom-ready.',
    '- Write short, decisive sentences.',
    '- Prefer plain strategic wording over abstract jargon.',
    '- Avoid repetition, filler, and phrase stacking.',
    '- Keep findings specific, comparative, and decision-oriented.',
    '- Keep prose in sentence case (no random ALL CAPS blocks in narrative copy).',
    '- Never output truncated fragments, dangling clauses, or half-finished quotes.',
].join('\n');

function cleanStrategyLine(value: string): string {
    const compact = value
        .replace(/\s+/g, ' ')
        .replace(/\s*([,:;.!?])\s*/g, '$1 ')
        .replace(/\s{2,}/g, ' ')
        .replace(/\bam i\b/gi, 'am I')
        .replace(/\bi'm\b/gi, "I'm")
        .trim();

    if (!compact) return compact;

    const noDangling = compact.replace(/[\u2014\-:;,]+$/g, '').trim();
    if (!noDangling) return compact;

    return noDangling.charAt(0).toUpperCase() + noDangling.slice(1);
}

function normalizeStrategyLanguage(input: unknown): unknown {
    if (typeof input === 'string') return cleanStrategyLine(input);
    if (Array.isArray(input)) return input.map((item) => normalizeStrategyLanguage(item));
    if (input && typeof input === 'object') {
        return Object.fromEntries(
            Object.entries(input as Record<string, unknown>).map(([key, value]) => [key, normalizeStrategyLanguage(value)]),
        );
    }
    return input;
}

export async function GET(
    req: Request
) {
    try {
        const { userId } = await getServerSession();
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

                    ${BENCHMARK_STYLE_CONTRACT}

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

        const rawIdeal = JSON.parse(response.choices[0].message.content || '{}');
        const ideal = normalizeStrategyLanguage(rawIdeal) as BenchmarkData['ideal'];
        benchmark.ideal = ideal;

        return NextResponse.json(benchmark);

    } catch (err: any) {
        console.error("[Benchmark API] Error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
