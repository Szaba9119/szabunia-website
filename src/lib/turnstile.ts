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
    // Decyzja (audyt 2026-07-06): świadomie fail-open, żeby nie gubić leadów,
    // ale log ma być nie do przeoczenia w Vercel Logs — brak klucza w produkcji
    // (np. literówka w env) oznacza formularze BEZ ochrony antybotowej.
    console.error(
      "[ALERT] Turnstile WYŁĄCZONY: brak TURNSTILE_SECRET_KEY — formularze działają bez CAPTCHA. Sprawdź Environment Variables w Vercel."
    );
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
