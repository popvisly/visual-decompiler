import { NextResponse } from 'next/server';

import { getServerSession } from '@/lib/auth-server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(req: Request) {
    try {
        const session = await getServerSession(req);
        if (!session.userId || !session.email) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const body = await req.json();
        const token = typeof body?.token === 'string' ? body.token.trim() : '';

        if (!token) {
            return NextResponse.json({ error: 'Invitation token is required' }, { status: 400 });
        }

        const { data: invitation, error: invitationError } = await supabaseAdmin
            .from('team_invitations')
            .select('*')
            .eq('invite_token', token)
            .is('revoked_at', null)
            .limit(1)
            .maybeSingle();

        if (invitationError || !invitation) {
            return NextResponse.json({ error: 'Invitation not found' }, { status: 404 });
        }

        if (invitation.accepted_at) {
            return NextResponse.json({ error: 'Invitation already accepted' }, { status: 409 });
        }

        if (new Date(invitation.expires_at).getTime() < Date.now()) {
            return NextResponse.json({ error: 'Invitation has expired' }, { status: 410 });
        }

        if (session.email.toLowerCase() !== invitation.email.toLowerCase()) {
            return NextResponse.json({ error: 'This invitation belongs to a different email address' }, { status: 403 });
        }

        const acceptedAt = new Date().toISOString();

        const { error: memberError } = await supabaseAdmin
            .from('agency_members')
            .upsert({
                agency_id: invitation.agency_id,
                user_id: session.userId,
                email: session.email,
                role: invitation.role,
                status: 'active',
                invited_by: invitation.invited_by,
                joined_at: acceptedAt,
                updated_at: acceptedAt,
            }, { onConflict: 'agency_id,email' });

        if (memberError) {
            throw memberError;
        }

        const { error: invitationUpdateError } = await supabaseAdmin
            .from('team_invitations')
            .update({
                accepted_at: acceptedAt,
                updated_at: acceptedAt,
            })
            .eq('id', invitation.id);

        if (invitationUpdateError) {
            throw invitationUpdateError;
        }

        return NextResponse.json({
            success: true,
            invitationId: invitation.id,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to accept invitation' },
            { status: 500 }
        );
    }
}
