import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth-server';
import { getUsageStatusForUser } from '@/lib/usage';

export async function GET() {
    const session = await getServerSession();

    if (!session.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const usage = await getUsageStatusForUser(session.userId, session.email);
        return NextResponse.json(usage);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Failed to load usage status';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
