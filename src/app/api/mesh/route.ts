import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { MeshService } from '@/lib/mesh_service';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { userId, orgId } = await auth();
        if (!userId || !orgId) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const data = await MeshService.getGlobalMesh(orgId);
        return NextResponse.json(data);
    } catch (error) {
        console.error('[Mesh API Error]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
