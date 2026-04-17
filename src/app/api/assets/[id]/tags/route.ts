import { NextResponse } from 'next/server';

import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

const normalizeTag = (value: unknown) =>
    (typeof value === 'string' ? value : '')
        .trim()
        .replace(/\s+/g, ' ')
        .slice(0, 32);

const sanitizeTags = (value: unknown) => {
    if (!Array.isArray(value)) {
        return [];
    }

    const seen = new Set<string>();

    return value
        .map((tag: unknown) => normalizeTag(tag))
        .filter((tag) => {
            if (!tag) return false;
            const key = tag.toLowerCase();
            if (seen.has(key)) return false;
            seen.add(key);
            return true;
        })
        .slice(0, 12);
};

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession();
    if (!session.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;

    const { data: asset, error } = await supabaseAdmin
        .from('assets')
        .select('id, tags')
        .eq('id', id)
        .eq('user_id', session.userId)
        .single();

    if (error || !asset) {
        return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    const { data: tagRows, error: tagsError } = await supabaseAdmin
        .from('assets')
        .select('tags')
        .eq('user_id', session.userId)
        .not('tags', 'eq', '{}');

    if (tagsError) {
        return NextResponse.json({ error: 'Failed to load tag suggestions' }, { status: 500 });
    }

    const suggestionSet = new Set<string>(
        (tagRows || [])
            .flatMap((row: { tags: unknown[] | null }) => (Array.isArray(row.tags) ? row.tags : []))
            .map((tag: unknown) => normalizeTag(tag))
            .filter(Boolean)
    );

    const suggestions = Array.from(suggestionSet)
        .sort((a, b) => a.localeCompare(b))
        .slice(0, 24);

    return NextResponse.json({
        tags: sanitizeTags(asset.tags),
        suggestions,
    });
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
    const session = await getServerSession(req);
    if (!session.userId) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const tags = sanitizeTags(body?.tags);

    const { data: updatedAsset, error } = await supabaseAdmin
        .from('assets')
        .update({
            tags,
            updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .eq('user_id', session.userId)
        .select('id, tags')
        .single();

    if (error || !updatedAsset) {
        return NextResponse.json({ error: 'Failed to update tags' }, { status: 500 });
    }

    return NextResponse.json({
        tags: sanitizeTags(updatedAsset.tags),
    });
}
