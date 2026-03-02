import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Create a new ratelimiter, that allows 10 requests per 1 minute
export const ratelimit = new Ratelimit({
    redis: new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
    }),
    limiter: Ratelimit.slidingWindow(10, "1m"),
    analytics: true,
});
