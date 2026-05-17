import Stripe from 'stripe';

const secretKey = process.env.STRIPE_SECRET_KEY;

// Avoid noisy local builds (e.g. `next build` without .env.local). Only warn when running on Vercel.
if (!secretKey && process.env.VERCEL) {
    console.warn('⚠️ STRIPE_SECRET_KEY is missing. Billing features will be disabled at runtime.');
}

export const stripe = secretKey
    ? new Stripe(secretKey, {
        apiVersion: '2023-10-16' as any,
        typescript: true,
    })
    : null as unknown as Stripe;
