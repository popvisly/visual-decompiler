import { Resend } from 'resend';

// Lazy initialize to avoid build-time errors when API key is missing
let resend: Resend | null = null;

function getResend() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        if (process.env.NODE_ENV === 'production') {
            console.error('RESEND_API_KEY is missing in production');
        }
        return null;
    }
    if (!resend) {
        resend = new Resend(apiKey);
    }
    return resend;
}

function getAppUrl() {
    return process.env.NEXT_PUBLIC_APP_URL || 'https://visualdecompiler.com';
}

export async function sendDeconstructionEmail(email: string, adId: string, adTitle: string) {
    const mailClient = getResend();
    if (!mailClient) return null;

    const reportUrl = `${getAppUrl()}/asset/${adId}`;

    try {
        const data = await mailClient.emails.send({
            from: 'Visual Decompiler <intelligence@visualdecompiler.com>',
            to: email,
            subject: `Strategic Analysis Ready: ${adTitle}`,
            html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="font-size: 24px; font-weight: 300; text-transform: uppercase; letter-spacing: 0.1em;">Analysis Complete</h1>
          <p style="color: #666; font-size: 16px; line-height: 1.6;">
            Our neural processors have finished deconstructing the semiotic layers and persuasion mechanics of your latest creative.
          </p>
          <div style="margin: 30px 0;">
            <a href="${reportUrl}" style="background: #141414; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; text-transform: uppercase; font-size: 12px; letter-spacing: 0.2em;">
              View Strategic Dossier
            </a>
          </div>
          <p style="color: #999; font-size: 12px;">
            Dossier ID: ${adId}
          </p>
        </div>
      `,
        });
        return data;
    } catch (error) {
        console.error('Failed to send email:', error);
        return null;
    }
}

export async function sendTeamInvitationEmail(input: {
    email: string;
    inviteUrl: string;
    agencyName: string;
    agencyDescriptor?: string | null;
    role: string;
    inviterEmail?: string | null;
    expiresAt: string;
    message?: string | null;
}) {
    const mailClient = getResend();
    if (!mailClient) return null;

    const absoluteInviteUrl = input.inviteUrl.startsWith('http')
        ? input.inviteUrl
        : `${getAppUrl()}${input.inviteUrl.startsWith('/') ? '' : '/'}${input.inviteUrl}`;

    try {
        const data = await mailClient.emails.send({
            from: 'Visual Decompiler <intelligence@visualdecompiler.com>',
            to: input.email,
            subject: `Join ${input.agencyName} on Visual Decompiler`,
            html: `
        <div style="font-family: sans-serif; max-width: 640px; margin: 0 auto; color: #1A1A1A;">
          <p style="font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.28em; color: #B9874F;">Team Invitation</p>
          <h1 style="margin-top: 20px; font-size: 28px; font-weight: 300; text-transform: uppercase; letter-spacing: 0.03em;">
            Join ${input.agencyName} in Visual Decompiler
          </h1>
          <p style="margin-top: 18px; color: #5F5F5F; font-size: 16px; line-height: 1.7;">
            You’ve been invited as an <strong style="text-transform: uppercase; color: #1A1A1A;">${input.role}</strong>${input.inviterEmail ? ` by ${input.inviterEmail}` : ''}.
          </p>
          ${input.agencyDescriptor ? `
            <p style="margin-top: 14px; color: #5F5F5F; font-size: 15px; line-height: 1.7;">
              ${input.agencyDescriptor}
            </p>
          ` : ''}
          ${input.message ? `
            <div style="margin-top: 24px; padding: 18px 20px; border: 1px solid rgba(185, 135, 79, 0.18); background: #FBFBF6; border-radius: 18px;">
              <p style="margin: 0; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.22em; color: #8B4513;">Invite Note</p>
              <p style="margin: 12px 0 0; color: #4A4A4A; font-size: 14px; line-height: 1.7;">${input.message}</p>
            </div>
          ` : ''}
          <div style="margin: 32px 0;">
            <a href="${absoluteInviteUrl}" style="display: inline-block; background: #141414; color: #fff; padding: 15px 30px; text-decoration: none; border-radius: 999px; font-weight: 700; text-transform: uppercase; font-size: 12px; letter-spacing: 0.2em;">
              Accept Invitation
            </a>
          </div>
          <p style="color: #8A8A8A; font-size: 12px; line-height: 1.7;">
            This invitation stays active until ${new Date(input.expiresAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}.
          </p>
          <p style="color: #8A8A8A; font-size: 12px; line-height: 1.7;">
            If the button above doesn’t work, open this link directly:<br />
            <a href="${absoluteInviteUrl}" style="color: #8B4513;">${absoluteInviteUrl}</a>
          </p>
        </div>
      `,
        });
        return data;
    } catch (error) {
        console.error('Failed to send team invitation email:', error);
        return null;
    }
}
