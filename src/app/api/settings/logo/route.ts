import { NextResponse } from 'next/server';
import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    const { userId } = await getServerSession(req);
    if (!userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const formData = await req.formData();
        const file = formData.get('file');

        if (!(file instanceof File)) {
            return NextResponse.json({ error: 'No file uploaded.' }, { status: 400 });
        }

        if (!file.type.startsWith('image/')) {
            return NextResponse.json({ error: 'Only image files are supported.' }, { status: 400 });
        }

        const fileExt = file.name.split('.').pop() || 'png';
        const filePath = `agency-logos/${userId}-${Date.now()}.${fileExt}`;

        const { error: uploadError } = await supabaseAdmin.storage
            .from('ad-media')
            .upload(filePath, file, {
                cacheControl: '3600',
                upsert: true,
                contentType: file.type,
            });

        if (uploadError) {
            throw uploadError;
        }

        const { data: publicUrlData } = supabaseAdmin.storage
            .from('ad-media')
            .getPublicUrl(filePath);

        return NextResponse.json({ publicUrl: publicUrlData.publicUrl });
    } catch (err) {
        const message = err instanceof Error ? err.message : 'Logo upload failed.';
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
