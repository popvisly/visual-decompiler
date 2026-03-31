"use client";

import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Loader2, MailPlus, Shield, Users, X } from 'lucide-react';

type TeamMember = {
    id: string;
    email: string;
    name?: string | null;
    role: 'owner' | 'admin' | 'analyst';
    status: 'active' | 'invited' | 'revoked';
    joined_at?: string | null;
};

type TeamInvitation = {
    id: string;
    email: string;
    role: 'owner' | 'admin' | 'analyst';
    invite_token: string;
    expires_at: string;
    created_at: string;
};

type TeamPayload = {
    agency?: { id: string; name?: string; tier?: string | null };
    members: TeamMember[];
    invitations: TeamInvitation[];
};

const ROLE_OPTIONS: Array<TeamMember['role']> = ['owner', 'admin', 'analyst'];

function getTierLabel(rawTier?: string | null) {
    const tier = (rawTier || '').toLowerCase().trim();
    if (tier === 'agency' || tier === 'agency sovereignty' || tier === 'enterprise') return 'Agency Sovereignty';
    if (tier === 'professional') return 'Professional';
    if (tier === 'pro' || tier === 'strategic' || tier === 'strategic unit') return 'Strategic';
    return 'Observer';
}

function getSeatSummary(rawTier?: string | null) {
    const tier = (rawTier || '').toLowerCase().trim();
    if (tier === 'professional') return 'Professional includes collaborative team workflows and shared operating surfaces.';
    if (tier === 'agency' || tier === 'agency sovereignty' || tier === 'enterprise') return 'Agency Sovereignty supports larger team operations, white-label delivery, and onboarding support.';
    if (tier === 'pro' || tier === 'strategic' || tier === 'strategic unit') return 'Strategic is optimized for a single operator running unlimited forensic reads.';
    return 'Observer is designed for individual evaluation before upgrading into shared team access.';
}

function formatDate(value?: string | null) {
    if (!value) return 'Pending';
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return 'Pending';
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function TeamSettingsClient() {
    const [payload, setPayload] = useState<TeamPayload>({ members: [], invitations: [] });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [email, setEmail] = useState('');
    const [role, setRole] = useState<TeamMember['role']>('analyst');
    const [message, setMessage] = useState('');
    const [statusMessage, setStatusMessage] = useState<string | null>(null);
    const [copiedInviteId, setCopiedInviteId] = useState<string | null>(null);

    const activeSeats = useMemo(
        () => payload.members.filter((member) => member.status === 'active').length,
        [payload.members]
    );

    const pendingInvites = payload.invitations.length;
    const tierLabel = useMemo(() => getTierLabel(payload.agency?.tier), [payload.agency?.tier]);
    const seatSummary = useMemo(() => getSeatSummary(payload.agency?.tier), [payload.agency?.tier]);

    const loadTeam = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/team');
            const data = await response.json();

            if (!response.ok) {
                throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to load team');
            }

            setPayload({
                agency: data.agency,
                members: Array.isArray(data.members) ? data.members : [],
                invitations: Array.isArray(data.invitations) ? data.invitations : [],
            });
        } catch (error) {
            setStatusMessage(error instanceof Error ? error.message : 'Failed to load team');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        void loadTeam();
    }, []);

    const handleInvite = async () => {
        setSaving(true);
        setStatusMessage(null);

        try {
            const response = await fetch('/api/team', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, role, message }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to create invitation');
            }

            setEmail('');
            setRole('analyst');
            setMessage('');
            setStatusMessage(`Invite created for ${data.invitation.email}`);
            await loadTeam();
        } catch (error) {
            setStatusMessage(error instanceof Error ? error.message : 'Failed to create invitation');
        } finally {
            setSaving(false);
        }
    };

    const handleRoleUpdate = async (memberId: string, nextRole: TeamMember['role']) => {
        try {
            const response = await fetch('/api/team', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mode: 'member-role',
                    memberId,
                    role: nextRole,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to update role');
            }

            setPayload((current) => ({
                ...current,
                members: current.members.map((member) =>
                    member.id === memberId ? { ...member, role: data.member.role } : member
                ),
            }));
        } catch (error) {
            setStatusMessage(error instanceof Error ? error.message : 'Failed to update role');
        }
    };

    const handleRevokeInvite = async (invitation: TeamInvitation) => {
        try {
            const response = await fetch('/api/team', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    mode: 'revoke-invite',
                    invitationId: invitation.id,
                    email: invitation.email,
                }),
            });
            const data = await response.json();

            if (!response.ok) {
                throw new Error(typeof data?.error === 'string' ? data.error : 'Failed to revoke invitation');
            }

            setPayload((current) => ({
                ...current,
                invitations: current.invitations.filter((item) => item.id !== invitation.id),
                members: current.members.map((member) =>
                    member.email.toLowerCase() === invitation.email.toLowerCase()
                        ? { ...member, status: 'revoked' }
                        : member
                ),
            }));
        } catch (error) {
            setStatusMessage(error instanceof Error ? error.message : 'Failed to revoke invitation');
        }
    };

    const handleCopyInviteLink = async (invitation: TeamInvitation) => {
        const url = `${window.location.origin}/join/${invitation.invite_token}`;
        await navigator.clipboard.writeText(url);
        setCopiedInviteId(invitation.id);
        window.setTimeout(() => setCopiedInviteId(null), 1800);
    };

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#FBFBF6]">
                <Loader2 className="h-8 w-8 animate-spin text-[#C1A67B]" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#FBFBF6] relative">
            <div className="pointer-events-none absolute inset-0 opacity-[0.02] [background-image:linear-gradient(#1A1A1A_1.5px,transparent_1.5px),linear-gradient(90deg,#1A1A1A_1.5px,transparent_1.5px)] [background-size:48px_48px]" />

            <div className="relative z-10 mx-auto max-w-7xl px-8 py-10 md:px-12 md:py-14">
                <div className="mb-12 border-b border-[#D4A574]/20 pb-8">
                    <p className="text-[10px] font-bold uppercase tracking-[0.34em] text-[#D4A574]">Team &amp; Seats</p>
                    <h1 className="mt-4 text-4xl font-light uppercase tracking-tight text-[#1A1A1A] md:text-6xl">
                        Agency Operating Team
                    </h1>
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-[#6B6B6B]">
                        Invite strategists, control seat roles, and manage who can operate inside the Intelligence Vault as owner, admin, or analyst.
                    </p>
                    <div className="mt-6 inline-flex flex-col gap-3 rounded-[1.5rem] border border-[#D4A574]/16 bg-white/80 px-6 py-4 shadow-sm backdrop-blur-sm">
                        <div className="flex items-center gap-3">
                            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[#8B7B62]">Current Plan</p>
                            <span className={`rounded-full border px-3 py-1 text-[9px] font-bold uppercase tracking-[0.24em] ${
                                tierLabel === 'Observer'
                                    ? 'border-[#D4A574]/18 bg-[#FBFBF6] text-[#8A7B64]'
                                    : 'border-[#D4A574]/28 bg-[#D4A574]/10 text-[#8B4513]'
                            }`}>
                                {tierLabel}
                            </span>
                        </div>
                        <p className="max-w-xl text-[12px] leading-relaxed text-[#6B6B6B]">
                            {seatSummary}
                        </p>
                    </div>
                </div>

                <div className="grid gap-8 xl:grid-cols-[minmax(0,1.1fr)_380px]">
                    <div className="space-y-8">
                        <section className="rounded-[2rem] border border-[#D4A574]/20 bg-white p-8 shadow-sm">
                            <div className="flex flex-col gap-4 border-b border-[#D4A574]/12 pb-6 md:flex-row md:items-end md:justify-between">
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B4513]">Seat Directory</p>
                                    <h2 className="mt-3 text-2xl font-light uppercase tracking-tight text-[#1A1A1A]">Current team roster</h2>
                                </div>
                                <p className="text-[10px] uppercase tracking-[0.2em] text-[#6B6B6B]">
                                    {activeSeats} active seats · {pendingInvites} pending invites
                                </p>
                            </div>

                            <div className="mt-6 space-y-4">
                                {payload.members.map((member) => (
                                    <div key={member.id} className="grid gap-4 rounded-[1.5rem] border border-[#D4A574]/12 bg-[#FBFBF6] p-5 md:grid-cols-[1.3fr_auto_auto] md:items-center">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]">
                                                {member.name || member.email}
                                            </p>
                                            <p className="mt-1 text-[11px] uppercase tracking-[0.16em] text-[#6B6B6B]">
                                                {member.email}
                                            </p>
                                        </div>
                                        <div className="text-[10px] uppercase tracking-[0.2em] text-[#8B4513]">
                                            {member.status} · {formatDate(member.joined_at)}
                                        </div>
                                        <label className="relative min-w-[140px]">
                                            <select
                                                value={member.role}
                                                onChange={(event) => void handleRoleUpdate(member.id, event.target.value as TeamMember['role'])}
                                                className="w-full appearance-none rounded-full border border-[#D4A574]/18 bg-white px-4 py-2.5 pr-9 text-[10px] font-bold uppercase tracking-[0.18em] text-[#1A1A1A] outline-none"
                                            >
                                                {ROLE_OPTIONS.map((roleOption) => (
                                                    <option key={roleOption} value={roleOption}>
                                                        {roleOption}
                                                    </option>
                                                ))}
                                            </select>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </section>

                        <section className="rounded-[2rem] border border-[#D4A574]/20 bg-white p-8 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Shield className="h-5 w-5 text-[#C1A67B]" />
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B4513]">Invitation Queue</p>
                                    <h2 className="mt-2 text-2xl font-light uppercase tracking-tight text-[#1A1A1A]">Pending access links</h2>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                {payload.invitations.length > 0 ? payload.invitations.map((invitation) => (
                                    <div key={invitation.id} className="rounded-[1.5rem] border border-[#D4A574]/12 bg-[#FBFBF6] p-5">
                                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                                            <div>
                                                <p className="text-sm font-semibold uppercase tracking-[0.08em] text-[#1A1A1A]">{invitation.email}</p>
                                                <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-[#8B4513]">
                                                    {invitation.role} · expires {formatDate(invitation.expires_at)}
                                                </p>
                                            </div>
                                            <div className="flex flex-wrap gap-3">
                                                <button
                                                    type="button"
                                                    onClick={() => void handleCopyInviteLink(invitation)}
                                                    className="rounded-full border border-[#D4A574]/18 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] transition-colors hover:bg-white"
                                                >
                                                    <span className="inline-flex items-center gap-2">
                                                        {copiedInviteId === invitation.id ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                                                        {copiedInviteId === invitation.id ? 'Copied' : 'Copy Invite Link'}
                                                    </span>
                                                </button>
                                                <button
                                                    type="button"
                                                    onClick={() => void handleRevokeInvite(invitation)}
                                                    className="rounded-full border border-[#D4A574]/18 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8B4513] transition-colors hover:bg-white"
                                                >
                                                    <span className="inline-flex items-center gap-2">
                                                        <X className="h-4 w-4" />
                                                        Revoke
                                                    </span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )) : (
                                    <div className="rounded-[1.5rem] border border-dashed border-[#D4A574]/18 bg-[#FBFBF6] p-6 text-[11px] uppercase tracking-[0.18em] text-[#6B6B6B]">
                                        No pending invitations.
                                    </div>
                                )}
                            </div>
                        </section>
                    </div>

                    <aside className="space-y-8">
                        <section className="rounded-[2rem] border border-[#D4A574]/20 bg-[#141414] p-8 text-white shadow-2xl">
                            <div className="flex items-center gap-3">
                                <MailPlus className="h-5 w-5 text-[#D4A574]" />
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#D4A574]">Invite Teammate</p>
                                    <h2 className="mt-2 text-2xl font-light uppercase tracking-tight">Issue a seat</h2>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4">
                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A574]/80">Email</label>
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(event) => setEmail(event.target.value)}
                                        placeholder="strategist@agency.com"
                                        className="mt-3 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-sm text-white outline-none placeholder:text-white/25"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A574]/80">Role</label>
                                    <select
                                        value={role}
                                        onChange={(event) => setRole(event.target.value as TeamMember['role'])}
                                        className="mt-3 w-full rounded-full border border-white/10 bg-white/5 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.18em] text-white outline-none"
                                    >
                                        {ROLE_OPTIONS.map((roleOption) => (
                                            <option key={roleOption} value={roleOption} className="text-black">
                                                {roleOption}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[10px] font-bold uppercase tracking-[0.22em] text-[#D4A574]/80">Invite Note</label>
                                    <textarea
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                        rows={4}
                                        placeholder="Optional context for the person joining the agency workspace"
                                        className="mt-3 w-full resize-none rounded-[1.5rem] border border-white/10 bg-white/5 px-5 py-4 text-sm text-white outline-none placeholder:text-white/25"
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => void handleInvite()}
                                    disabled={saving || !email.trim()}
                                    className="w-full rounded-full bg-[#D4A574] px-5 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-[#141414] transition-colors hover:bg-[#c8955b] disabled:opacity-50"
                                >
                                    <span className="inline-flex items-center gap-2">
                                        {saving && <Loader2 className="h-4 w-4 animate-spin" />}
                                        {saving ? 'Issuing seat...' : 'Create Invite Link'}
                                    </span>
                                </button>
                            </div>
                        </section>

                        <section className="rounded-[2rem] border border-[#D4A574]/20 bg-white p-8 shadow-sm">
                            <div className="flex items-center gap-3">
                                <Users className="h-5 w-5 text-[#C1A67B]" />
                                <div>
                                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#8B4513]">Role Permissions</p>
                                    <h2 className="mt-2 text-2xl font-light uppercase tracking-tight text-[#1A1A1A]">Access structure</h2>
                                </div>
                            </div>

                            <div className="mt-6 space-y-4 text-sm leading-relaxed text-[#4A4A4A]">
                                <p><strong className="text-[#1A1A1A]">Owner:</strong> full control of billing, white-label settings, seats, and exports.</p>
                                <p><strong className="text-[#1A1A1A]">Admin:</strong> manages boards, invites, and shared strategic workflows.</p>
                                <p><strong className="text-[#1A1A1A]">Analyst:</strong> runs extractions, works in the vault, and contributes to board intelligence.</p>
                            </div>
                        </section>

                        {statusMessage && (
                            <section className="rounded-[1.5rem] border border-[#D4A574]/20 bg-white px-5 py-4 text-[11px] uppercase tracking-[0.16em] text-[#8B4513] shadow-sm">
                                {statusMessage}
                            </section>
                        )}
                    </aside>
                </div>
            </div>
        </div>
    );
}
