import Link from 'next/link';
import { notFound } from 'next/navigation';

import { supabaseAdmin } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

function formatDate(value: string) {
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) {
        return 'soon';
    }

    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
}

export default async function JoinTeamPage({ params }: { params: Promise<{ token: string }> }) {
    const { token } = await params;

    const { data: invitation, error: invitationError } = await supabaseAdmin
        .from('team_invitations')
        .select('*')
        .eq('invite_token', token)
        .is('revoked_at', null)
        .limit(1)
        .maybeSingle();

    if (invitationError || !invitation) {
        notFound();
    }

    if (new Date(invitation.expires_at).getTime() < Date.now()) {
        notFound();
    }

    const { data: agency } = await supabaseAdmin
        .from('agencies')
        .select('name, descriptor')
        .eq('id', invitation.agency_id)
        .limit(1)
        .maybeSingle();

    return (
        <div className="min-h-screen bg-[#FBFBF6] px-6 py-12 md:px-8">
            <div className="mx-auto max-w-3xl rounded-[2.5rem] border border-[#D4A574]/18 bg-white p-8 shadow-[0_24px_70px_rgba(20,20,20,0.08)] md:p-12">
                <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Team Invitation</p>
                <h1 className="mt-5 text-4xl font-light uppercase tracking-tight text-[#1A1A1A] md:text-5xl">
                    Join {agency?.name || 'Agency'} in Visual Decompiler
                </h1>
                <p className="mt-5 text-sm leading-relaxed text-[#6B6B6B]">
                    You’ve been invited as an <span className="font-semibold uppercase text-[#1A1A1A]">{invitation.role}</span>. This access link stays active until {formatDate(invitation.expires_at)}.
                </p>
                {agency?.descriptor && (
                    <p className="mt-4 text-sm leading-relaxed text-[#6B6B6B]">
                        {agency.descriptor}
                    </p>
                )}
                {invitation.message && (
                    <div className="mt-8 rounded-[1.5rem] border border-[#D4A574]/15 bg-[#FBFBF6] p-5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#8B4513]">Invite Note</p>
                        <p className="mt-3 text-sm leading-relaxed text-[#4A4A4A]">{invitation.message}</p>
                    </div>
                )}

                <div className="mt-10 flex flex-col gap-4 md:flex-row">
                    <Link
                        href={`/login?invite=${token}&email=${encodeURIComponent(invitation.email)}`}
                        className="rounded-full bg-[#141414] px-6 py-3 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-[#FBF7EF] transition-colors hover:bg-black"
                    >
                        Sign In To Accept
                    </Link>
                    <Link
                        href={`/login?invite=${token}&email=${encodeURIComponent(invitation.email)}&mode=signup`}
                        className="rounded-full border border-[#D4A574]/20 px-6 py-3 text-center text-[10px] font-bold uppercase tracking-[0.24em] text-[#8B4513] transition-colors hover:bg-[#FBFBF6]"
                    >
                        Create Account To Accept
                    </Link>
                </div>
            </div>
        </div>
    );
}
