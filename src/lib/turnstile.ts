const VERIFY_ENDPOINT = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/**
 * Weryfikuje token Cloudflare Turnstile po stronie serwera.
 * Fail-open (true) gdy TURNSTILE_SECRET_KEY nie jest ustawiony albo Cloudflare API
 * nie odpowiada — nie chcemy tracić realnych zapytań przez awarię strony trzeciej.
 * Fail-closed (false) tylko gdy klucz JEST skonfigurowany, a token jest pusty/nieprawidłowy.
 */
export async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("Turnstile pominięty: TURNSTILE_SECRET_KEY nie jest ustawiony.");
    return true;
  }
  if (!token) return false;

  try {
    const res = await fetch(VERIFY_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      signal: AbortSignal.timeout(5000),
    });
    const data = (await res.json()) as { success?: boolean };
    return data.success === true;
  } catch (err) {
    console.error("Turnstile verify error:", err);
    return true;
  }
}
