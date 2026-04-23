import { randomBytes } from 'crypto';
import { NextResponse } from 'next/server';

import { getServerSession } from '@/lib/auth-server';
import { sendTeamInvitationEmail } from '@/lib/mail';
import { supabaseAdmin } from '@/lib/supabase';

const VALID_ROLES = new Set(['owner', 'admin', 'analyst']);

async function getSessionAgency(userId: string, email?: string | null) {
    let membershipQuery = supabaseAdmin
        .from('agency_members')
        .select('agency_id')
        .eq('status', 'active')
        .limit(1);

    if (email) {
        membershipQuery = membershipQuery.or(`user_id.eq.${userId},email.ilike.${email}`);
    } else {
        membershipQuery = membershipQuery.eq('user_id', userId);
    }

    const { data: membership, error: membershipError } = await membershipQuery.maybeSingle();
    if (membershipError) {
        throw membershipError;
    }

    if (!membership?.agency_id) {
        return null;
    }

    const { data: agency, error: agencyError } = await supabaseAdmin
        .from('agencies')
        .select('id, name, tier')
        .eq('id', membership.agency_id)
        .maybeSingle();

    if (agencyError) {
        throw agencyError;
    }

    return agency || null;
}

export async function GET(req: Request) {
    try {
        const session = await getServerSession(req);
        if (!session.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const agency = await getSessionAgency(session.userId, session.email);

        const { data: currentUser, error: userError } = await supabaseAdmin
            .from('users')
            .select('tier')
            .eq('id', session.userId)
            .maybeSingle();

        if (userError) throw userError;

        if (!agency) {
            return NextResponse.json({
                agency: null,
                currentTier: currentUser?.tier || null,
                members: [],
                invitations: [],
            });
        }

        const [{ data: members, error: membersError }, { data: invitations, error: invitationsError }] = await Promise.all([
            supabaseAdmin
                .from('agency_members')
                .select('*')
                .eq('agency_id', agency.id)
                .order('created_at', { ascending: true }),
            supabaseAdmin
                .from('team_invitations')
                .select('*')
                .eq('agency_id', agency.id)
                .is('revoked_at', null)
                .order('created_at', { ascending: false }),
        ]);

        if (membersError) throw membersError;
        if (invitationsError) throw invitationsError;

        return NextResponse.json({
            agency,
            currentTier: currentUser?.tier || null,
            members: members || [],
            invitations: invitations || [],
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to load team' },
            { status: 500 }
        );
    }
}

export async function POST(req: Request) {
    try {
        const session = await getServerSession(req);
        if (!session.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const agency = await getSessionAgency(session.userId, session.email);
        if (!agency) {
            return NextResponse.json({ error: 'Team workspace unavailable for this account' }, { status: 403 });
        }

        const body = await req.json();
        const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
        const role = typeof body?.role === 'string' ? body.role : 'analyst';
        const message = typeof body?.message === 'string' ? body.message.trim().slice(0, 280) : '';

        if (!email) {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        if (!VALID_ROLES.has(role)) {
            return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
        }

        const { data: existingMember } = await supabaseAdmin
            .from('agency_members')
            .select('id, status')
            .eq('agency_id', agency.id)
            .ilike('email', email)
            .limit(1)
            .maybeSingle();

        if (existingMember?.status === 'active') {
            return NextResponse.json({ error: 'That teammate already has a seat' }, { status: 409 });
        }

        const token = randomBytes(18).toString('hex');
        const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString();

        const { data: invitation, error: inviteError } = await supabaseAdmin
            .from('team_invitations')
            .insert({
                agency_id: agency.id,
                email,
                role,
                invite_token: token,
                invited_by: session.userId,
                message: message || null,
                expires_at: expiresAt,
            })
            .select('*')
            .single();

        if (inviteError || !invitation) {
            throw inviteError || new Error('Failed to create invitation');
        }

        if (existingMember) {
            await supabaseAdmin
                .from('agency_members')
                .update({
                    role,
                    status: 'invited',
                    invited_by: session.userId,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', existingMember.id);
        } else {
            await supabaseAdmin
                .from('agency_members')
                .insert({
                    agency_id: agency.id,
                    email,
                    role,
                    status: 'invited',
                    invited_by: session.userId,
                });
        }

        const inviteUrl = `/join/${token}`;
        const emailResult = await sendTeamInvitationEmail({
            email,
            inviteUrl,
            agencyName: agency.name || 'Your Agency',
            role,
            inviterEmail: session.email,
            expiresAt,
            message: message || null,
        });

        return NextResponse.json({
            invitation,
            inviteUrl,
            emailSent: !!emailResult,
        });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to invite teammate' },
            { status: 500 }
        );
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await getServerSession(req);
        if (!session.userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const agency = await getSessionAgency(session.userId, session.email);
        if (!agency) {
            return NextResponse.json({ error: 'Team workspace unavailable for this account' }, { status: 403 });
        }
        const body = await req.json();
        const mode = body?.mode;

        if (mode === 'member-role') {
            const memberId = typeof body?.memberId === 'string' ? body.memberId : '';
            const role = typeof body?.role === 'string' ? body.role : '';

            if (!memberId || !VALID_ROLES.has(role)) {
                return NextResponse.json({ error: 'Invalid member role update' }, { status: 400 });
            }

            const { data: member, error } = await supabaseAdmin
                .from('agency_members')
                .update({
                    role,
                    updated_at: new Date().toISOString(),
                })
                .eq('id', memberId)
                .eq('agency_id', agency.id)
                .select('*')
                .single();

            if (error || !member) {
                throw error || new Error('Failed to update member');
            }

            return NextResponse.json({ member });
        }

        if (mode === 'revoke-invite') {
            const invitationId = typeof body?.invitationId === 'string' ? body.invitationId : '';
            const email = typeof body?.email === 'string' ? body.email : '';

            if (!invitationId) {
                return NextResponse.json({ error: 'Invitation id is required' }, { status: 400 });
            }

            const { data: invitation, error } = await supabaseAdmin
                .from('team_invitations')
                .update({
                    revoked_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                })
                .eq('id', invitationId)
                .eq('agency_id', agency.id)
                .select('*')
                .single();

            if (error || !invitation) {
                throw error || new Error('Failed to revoke invitation');
            }

            if (email) {
                await supabaseAdmin
                    .from('agency_members')
                    .update({
                        status: 'revoked',
                        updated_at: new Date().toISOString(),
                    })
                    .eq('agency_id', agency.id)
                    .ilike('email', email);
            }

            return NextResponse.json({ invitation });
        }

        return NextResponse.json({ error: 'Unsupported team update' }, { status: 400 });
    } catch (error) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Failed to update team' },
            { status: 500 }
        );
    }
}
