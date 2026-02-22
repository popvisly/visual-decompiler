import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { scryptSync } from 'crypto';
import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const { slug, password } = await req.json();

        if (!slug || !password) {
            return NextResponse.json({ error: 'Missing credentials' }, { status: 400 });
        }

        const { data: link, error } = await supabaseAdmin
            .from('shared_links')
            .select('password_hash')
            .eq('slug', slug)
            .single();

        if (error || !link || !link.password_hash) {
            return NextResponse.json({ error: 'Link not found or not protected' }, { status: 404 });
        }

        const [salt, hash] = link.password_hash.split(':');
        const derivedKey = scryptSync(password, salt, 64).toString('hex');

        if (derivedKey !== hash) {
            return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
        }

        // Set verification cookie
        const cookieStore = await cookies();
        cookieStore.set(`portal_auth_${slug}`, 'true', {
            httpOnly: true,
            secure: true,
            sameSite: 'strict',
            maxAge: 60 * 60 * 24 // 24 hours
        });

        return NextResponse.json({ success: true });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
