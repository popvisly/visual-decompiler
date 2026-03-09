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

export async function sendDeconstructionEmail(email: string, adId: string, adTitle: string) {
    const mailClient = getResend();
    if (!mailClient) return null;

    const reportUrl = `${process.env.NEXT_PUBLIC_APP_URL}/asset/${adId}`;

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
