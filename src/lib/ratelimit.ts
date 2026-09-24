import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

// Rate-limit per IP dla /api/contact i /api/lead — chroni przed spamem i wyczerpaniem
// limitu Resend. Fail-open gdy UPSTASH_REDIS_REST_URL/TOKEN nie są ustawione (np. lokalnie
// bez .env.local) — formularz ma wtedy tylko honeypot + Turnstile, ale wciąż działa.
//
// Oddzielne liczniki per formularz (nie jeden wspólny) — realny użytkownik może np. pobrać
// poradnik i osobno wysłać zapytanie kontaktowe bez wzajemnego blokowania się. Limit dla
// /api/contact jest wyższy (8/h), bo uzasadnione ponowienia (poprawka po błędzie walidacji,
// biuro za jednym IP) są tam bardziej prawdopodobne niż przy jednorazowym pobraniu PDF.
const redis =
  process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
    ? new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL,
        token: process.env.UPSTASH_REDIS_REST_TOKEN,
      })
    : null;

const contactRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(8, "1 h"),
      prefix: "szabunia-contact",
    })
  : null;

const leadRatelimit = redis
  ? new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(5, "1 h"),
      prefix: "szabunia-lead",
    })
  : null;

/** IP klienta z nagłówków Vercel/proxy (Request App Routera nie ma req.ip). */
export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

// ⛔ FAIL-OPEN TAKŻE PRZY BŁĘDZIE UPSTASH (24.09.2026, awaria na produkcji).
// Wcześniej fail-open działał tylko przy braku zmiennych. Gdy zmienne były ustawione,
// a Upstash nie odpowiadał albo zwracał błąd (baza uśpiona/usunięta, zły token),
// `limit()` rzucał wyjątek, a trasy /api/contact i /api/lead odpowiadały 503
// „Formularz jest chwilowo niedostępny”, czyli OBA formularze na stronie nie działały
// (log: `[ALERT] contact: rate-limit unavailable`, 24.09 m.in. próby Marcina).
// Limit prób to ochrona drugiego rzędu: zostają sprawdzenie originu, honeypot,
// walidacja pól i Turnstile weryfikowany po stronie serwera (fail-closed).
// Utrata leada kosztuje więcej niż kilka dodatkowych prób bota, więc przy awarii
// Upstash formularz przechodzi, a log `[ALERT]` mówi, że limit jest wyłączony.
// Limit czasu 1,5 s: zawieszone połączenie nie może wstrzymywać wysyłki zapytania.
const LIMIT_TIMEOUT_MS = 1500;

async function checkLimit(limiter: Ratelimit | null, ip: string, label: string): Promise<boolean> {
  if (!limiter) {
    console.error("[ALERT] Rate-limit pominięty: UPSTASH_REDIS_REST_URL/TOKEN nie są ustawione.");
    return false;
  }
  try {
    const result = await Promise.race([
      limiter.limit(ip),
      new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error(`timeout ${LIMIT_TIMEOUT_MS} ms`)), LIMIT_TIMEOUT_MS),
      ),
    ]);
    return !result.success;
  } catch (err) {
    console.error(
      `[ALERT] ${label}: rate-limit niedostępny, żądanie przepuszczone (fail-open):`,
      err instanceof Error ? err.message : String(err),
    );
    return false;
  }
}

/** true = przekroczono limit (8 żądań/h/IP). Fail-open (false) bez Redis albo przy jego błędzie. */
export async function isRateLimited(ip: string): Promise<boolean> {
  return checkLimit(contactRatelimit, ip, "contact");
}

/** true = przekroczono limit (5 żądań/h/IP). Fail-open (false) bez Redis albo przy jego błędzie. */
export async function isLeadRateLimited(ip: string): Promise<boolean> {
  return checkLimit(leadRatelimit, ip, "lead");
}

