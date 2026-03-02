import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 10 requests per 1 minute
// Gracefully handle missing credentials (disabled in development or if not configured)
const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

// Only initialize if we have valid HTTPS URLs (not placeholders like "disabled" or "placeholder")
const isValidUpstashConfig = upstashUrl && upstashToken && upstashUrl.startsWith('https://');

export const ratelimit = isValidUpstashConfig
    ? new Ratelimit({
        redis: new Redis({
            url: upstashUrl,
            token: upstashToken,
        }),
        limiter: Ratelimit.slidingWindow(10, "1m"),
        analytics: true,
    })
    : null;
