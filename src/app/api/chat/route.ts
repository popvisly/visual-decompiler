import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { queryCopilot } from '@/lib/copilot';

export async function POST(req: Request) {
    const { userId, orgId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    try {
        const { prompt, boardId } = await req.json();

        if (!prompt) {
            return NextResponse.json({ error: 'Prompt is required' }, { status: 400 });
        }

        const result = await queryCopilot(prompt, {
            userId,
            orgId,
            boardId
        });

        return NextResponse.json(result);
    } catch (err: any) {
        console.error('[API/Chat] Error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
