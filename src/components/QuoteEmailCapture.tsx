"use client";

import { useRef, useState } from "react";
import { gtagEvent } from "@/lib/gtag";
import { getUtmParams } from "@/lib/utm";
import TurnstileWidget, { type TurnstileWidgetHandle } from "./TurnstileWidget";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TURNSTILE_ENABLED = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const GENERIC_ERROR = "Coś poszło nie tak. Spróbuj ponownie lub napisz na marcin@szabunia.pl";

/**
 * Lekka alternatywa dla pełnego formularza kontaktowego na kroku 3 kalkulatora —
 * kto nie jest gotów wysłać briefu, może zostawić tylko e-mail i dostać policzoną
 * wycenę na maila (ta sama ochrona co reszta formularzy: honeypot + Turnstile + rate-limit).
 */
export default function QuoteEmailCapture({
  service,
  priceLabel,
}: {
  service: string;
  priceLabel: string;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [gotcha, setGotcha] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const [consentTouched, setConsentTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileBlocked, setTurnstileBlocked] = useState(false);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);

  const emailErr = touched && !EMAIL_RE.test(email.trim()) ? "Podaj poprawny adres e-mail" : null;
  const consentErr = consentTouched && !consent ? "Zaznacz zgodę powyżej, aby wysłać" : null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    setConsentTouched(true);
    if (!EMAIL_RE.test(email.trim()) || !consent) return;

    setSending(true);
    setError(null);
    try {
      const items: string[] = [];
      const summaryEl = document.querySelector("[data-config-summary]");
      if (summaryEl) {
        summaryEl.querySelectorAll("li").forEach((li) => {
          items.push(li.textContent?.replace("✓", "").trim() ?? "");
        });
      }
      const configSummary = `Konfiguracja: ${items.filter(Boolean).join(", ")}`;

      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          service,
          configSummary,
          priceLabel,
          _gotcha: gotcha,
          turnstileToken,
          ...getUtmParams(),
        }),
      });
      if (res.ok) {
        setSubmitted(true);
        gtagEvent("generate_lead", { source: "calculator-quote" });
      } else {
        const body: { error?: string } | null = await res.json().catch(() => null);
        setError(body?.error || GENERIC_ERROR);
        turnstileRef.current?.reset();
      }
    } catch {
      setError(GENERIC_ERROR);
      turnstileRef.current?.reset();
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <p className="text-[13px] text-blue dark:text-blue-light font-barlow font-semibold" role="status" aria-live="polite">
        Wycena poszła na {email.trim()} — sprawdź skrzynkę (też spam).
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="text-left">
      <input
        type="text"
        name="_gotcha"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={gotcha}
        onChange={(e) => setGotcha(e.target.value)}
        className="hidden"
      />
      <div className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={!!emailErr}
          aria-label="Adres e-mail do wysyłki wyceny"
          aria-describedby={emailErr ? "quote-email-error" : undefined}
          placeholder="twoj@email.pl"
          className={`flex-1 bg-white dark:bg-white/[0.08] border rounded-xl px-3.5 py-2.5 text-[13px] text-navy dark:text-white placeholder-steel font-inter transition-colors ${emailErr ? "border-red-400 focus:border-red-400" : "border-border dark:border-navy-light focus:border-blue"}`}
        />
        <button
          type="submit"
          disabled={sending || (TURNSTILE_ENABLED && !turnstileToken)}
          className="bg-white dark:bg-transparent border border-blue text-blue px-4 py-2.5 rounded-xl font-barlow font-semibold text-[13px] hover:bg-blue hover:text-white transition-colors disabled:opacity-60 disabled:cursor-not-allowed whitespace-nowrap"
        >
          {sending ? "Wysyłanie..." : "Wyślij wycenę na maila"}
        </button>
      </div>
      {emailErr && <p id="quote-email-error" role="alert" className="text-red-600 dark:text-red-400 text-[11px] mt-1">{emailErr}</p>}

      <label className="flex items-start gap-2 mt-2 cursor-pointer">
        <input
          type="checkbox"
          checked={consent}
          onChange={(e) => {
            setConsent(e.target.checked);
            if (e.target.checked) setConsentTouched(false);
          }}
          onBlur={() => setConsentTouched(true)}
          className="mt-0.5 w-3.5 h-3.5 rounded border-border dark:border-navy-light accent-blue flex-shrink-0"
        />
        <span className="text-[11px] text-steel dark:text-dark-text-muted leading-relaxed">
          Zgadzam się na przetwarzanie adresu e-mail w celu przesłania wyceny, zgodnie z{" "}
          <a href="/polityka-prywatnosci" target="_blank" rel="noopener noreferrer" className="text-blue underline">
            polityką prywatności
          </a>.
        </span>
      </label>
      {consentErr && <p role="alert" className="text-red-600 dark:text-red-400 text-[11px] mt-1">{consentErr}</p>}

      <TurnstileWidget ref={turnstileRef} onVerify={setTurnstileToken} onBlocked={() => setTurnstileBlocked(true)} />

      {error && <p role="alert" className="text-red-600 dark:text-red-400 text-[12px] mt-2">{error}</p>}

      {TURNSTILE_ENABLED && !turnstileToken && !sending && (
        turnstileBlocked ? (
          <p role="alert" className="text-[11px] text-red-600 dark:text-red-400 mt-2">
            Zabezpieczenie nie załadowało się. Napisz na:{" "}
            <a href="mailto:marcin@szabunia.pl" className="underline">marcin@szabunia.pl</a>
          </p>
        ) : (
          <p className="text-[11px] text-steel dark:text-dark-text-muted mt-2">Ładowanie zabezpieczenia...</p>
        )
      )}
    </form>
  );
}
