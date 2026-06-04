"use client";

import { useState } from "react";

const PDF_URL = "/poradnik-przygotowanie-do-sesji.pdf";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function PoradnikForm() {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [gotcha, setGotcha] = useState("");
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [touched, setTouched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailErr =
    touched && !EMAIL_RE.test(email.trim()) ? "Podaj poprawny adres e-mail" : null;

  function triggerDownload() {
    const a = document.createElement("a");
    a.href = PDF_URL;
    a.download = "Poradnik-przygotowanie-do-sesji-Marcin-Szabunia.pdf";
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setTouched(true);
    if (!EMAIL_RE.test(email.trim()) || !consent) return;

    setSending(true);
    setError(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email: email.trim(), _gotcha: gotcha }),
      });
      if (res.ok) {
        setSubmitted(true);
        triggerDownload();
      } else {
        setError(
          "Coś poszło nie tak. Spróbuj ponownie lub napisz na marcin@szabunia.pl"
        );
      }
    } catch {
      setError(
        "Coś poszło nie tak. Spróbuj ponownie lub napisz na marcin@szabunia.pl"
      );
    } finally {
      setSending(false);
    }
  }

  if (submitted) {
    return (
      <div className="glass-dark rounded-2xl p-6 text-center" role="status" aria-live="polite">
        <div className="w-16 h-16 rounded-full bg-blue/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-blue" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-white font-barlow font-bold text-lg mb-1">
          Gotowe — pobieranie ruszyło!
        </p>
        <p className="text-steel text-sm mb-5">
          Kopię linku wysłałem też na <span className="text-white">{email.trim()}</span> (sprawdź też spam).
        </p>
        <a
          href={PDF_URL}
          download="Poradnik-przygotowanie-do-sesji-Marcin-Szabunia.pdf"
          className="inline-block bg-gradient-to-br from-blue to-blue-light text-white px-5 py-2.5 rounded-xl font-barlow font-bold text-sm btn-glow hover:scale-[1.01] transition-transform"
        >
          Pobierz ponownie
        </a>
      </div>
    );
  }

  return (
    <div className="glass-dark rounded-2xl p-6">
      <p className="text-white font-barlow font-bold text-lg mb-1">
        Pobierz poradnik za darmo
      </p>
      <p className="text-steel text-[13px] mb-5">
        Zostaw e-mail, a wyślę Ci plik PDF i od razu uruchomię pobieranie.
      </p>
      <form onSubmit={handleSubmit} noValidate>
        {/* Honeypot — ukryte pole dla botów */}
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

        <label htmlFor="lead-email" className="block text-[11px] text-steel font-barlow font-semibold uppercase tracking-wide mb-1.5">
          Twój e-mail
        </label>
        <input
          id="lead-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={!!emailErr}
          aria-describedby={emailErr ? "lead-email-error" : undefined}
          placeholder="jan@firma.pl"
          className={`w-full bg-white/[0.08] border rounded-xl px-3.5 py-3 text-[13px] text-white placeholder-steel font-inter transition-colors ${emailErr ? "border-red-400 focus:border-red-400" : "border-navy-light focus:border-blue"}`}
        />
        {emailErr && (
          <p id="lead-email-error" role="alert" className="text-red-400 text-[11px] mt-1">
            {emailErr}
          </p>
        )}

        <label className="flex items-start gap-2.5 mt-4 mb-4 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-0.5 w-4 h-4 rounded border-navy-light accent-blue flex-shrink-0"
          />
          <span className="text-[11px] text-steel leading-relaxed">
            Wyrażam zgodę na otrzymanie poradnika i przetwarzanie mojego adresu e-mail zgodnie z{" "}
            <a href="/polityka-prywatnosci" target="_blank" className="text-blue hover:text-white underline transition-colors">
              polityką prywatności
            </a>.
          </span>
        </label>

        {error && (
          <p role="alert" className="text-red-400 text-[12px] mb-3 text-center">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={sending || !consent}
          className={`w-full bg-gradient-to-br from-blue to-blue-light text-white py-3.5 rounded-xl font-barlow font-bold text-sm btn-glow hover:scale-[1.01] transition-transform disabled:opacity-70 ${sending ? "disabled:cursor-wait" : "disabled:cursor-not-allowed"}`}
        >
          {sending ? (
            <span className="inline-flex items-center gap-2">
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              Wysyłanie...
            </span>
          ) : "Wyślij i pobierz poradnik"}
        </button>
        <p className="text-center text-[11px] text-steel mt-2.5">
          Bez spamu. Sam plik i ewentualnie pojedyncze wskazówki.
        </p>
      </form>
    </div>
  );
}
