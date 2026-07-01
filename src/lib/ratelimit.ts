import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate-limit per IP dla /api/contact i /api/lead — chroni przed spamem i wyczerpaniem
// limitu Resend. Fail-open gdy UPSTASH_REDIS_REST_URL/TOKEN nie są ustawione (np. lokalnie
// bez .env.local) — formularz ma wtedy tylko honeypot + Turnstile, ale wciąż działa.
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const ratelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "szabunia-form",
    })
  : null;

/** IP klienta z nagłówków Vercel/proxy (Request App Routera nie ma req.ip). */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

/** true = przekroczono limit (5 żądań/h/IP). Fail-open (false) gdy Redis nie jest skonfigurowany. */
export async function isRateLimited(ip: string): Promise<boolean> {
  if (!ratelimit) {
    console.error("Rate-limit pominięty: UPSTASH_REDIS_REST_URL/TOKEN nie są ustawione.");
    return false;
  }
  const { success } = await ratelimit.limit(ip);
  return !success;
}
