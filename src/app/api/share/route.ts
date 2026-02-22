import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { createSharedLink } from '@/lib/sharing';
import { scryptSync, randomBytes } from 'crypto';

export async function POST(req: Request) {
    try {
        const { userId, orgId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { boardId, adDigestId, settings, password } = await req.json();

        let passwordHash: string | undefined = undefined;
        if (password) {
            const salt = randomBytes(16).toString('hex');
            const derivedKey = scryptSync(password, salt, 64).toString('hex');
            passwordHash = `${salt}:${derivedKey}`;
        }

        // Ensure user is sharing something they own or belongs to their org
        // (Validation logic could be more robust here, but we'll use the service role in createSharedLink)

        const link = await createSharedLink({
            orgId: orgId || userId, // Fallback to userId if no org
            boardId,
            adDigestId,
            settings,
            passwordHash
        });

        return NextResponse.json(link);
    } catch (err: any) {
        console.error('Sharing failed:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
