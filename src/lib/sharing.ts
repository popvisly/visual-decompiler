import { supabaseAdmin } from './supabase';
import { randomBytes } from 'crypto';

export async function createSharedLink(params: {
    orgId: string;
    boardId?: string;
    adDigestId?: string;
    settings?: any;
    passwordHash?: string;
}) {
    const slug = randomBytes(8).toString('hex'); // 16-char secure slug

    const { data, error } = await supabaseAdmin
        .from('shared_links')
        .insert({
            slug,
            org_id: params.orgId,
            board_id: params.boardId,
            ad_digest_id: params.adDigestId,
            settings: params.settings || {},
            password_hash: params.passwordHash
        })
        .select()
        .single();

    if (error) throw error;
    return data;
}

export async function getSharedLink(slug: string, isAuthorized: boolean = false) {
    const { data: link, error } = await supabaseAdmin
        .from('shared_links')
        .select(`
            *,
            org_settings:org_id (
                logo_url,
                primary_color,
                custom_domain
            )
        `)
        .eq('slug', slug)
        .single();

    if (error || !link) return null;

    // If protected and not authorized, return only metadata
    if (link.password_hash && !isAuthorized) {
        return {
            ...link,
            hasPassword: true,
            board: null,
            ad_digest: null
        };
    }

    // Boards
    if (link.board_id) {
        const { data: board } = await supabaseAdmin
            .from('boards')
            .select('*')
            .eq('id', link.board_id)
            .single();
        link.board = board;
    }

    // Ad Digests
    if (link.ad_digest_id) {
        const { data: ad } = await supabaseAdmin
            .from('ad_digests')
            .select('*')
            .eq('id', link.ad_digest_id)
            .single();
        link.ad_digest = ad;
    }

    return link;
}
