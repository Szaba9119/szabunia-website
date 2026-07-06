"use client";

import { useState, useRef, useEffect } from "react";
import AnimatedSection from "./AnimatedSection";
import Parallax from "./Parallax";
import { PARALLAX } from "@/lib/motion";
import { gtagEvent } from "@/lib/gtag";
import { getUtmParams } from "@/lib/utm";
import TurnstileWidget, { type TurnstileWidgetHandle } from "./TurnstileWidget";

const TURNSTILE_ENABLED = !!process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

interface FieldErrors {
  name?: string;
  email?: string;
  consent?: string;
}

function validateField(name: string, value: string): string | undefined {
  if (name === "name" && !value.trim()) return "Podaj imię i nazwisko lub nazwę firmy";
  if (name === "email") {
    if (!value.trim()) return "Podaj adres e-mail";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Podaj poprawny adres e-mail";
  }
  return undefined;
}

export default function CTA() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [consent, setConsent] = useState(false);
  const [gotcha, setGotcha] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [turnstileToken, setTurnstileToken] = useState("");
  const [turnstileBlocked, setTurnstileBlocked] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const turnstileRef = useRef<TurnstileWidgetHandle>(null);
  const formStartedRef = useRef(false);

  const GENERIC_ERROR = "Coś poszło nie tak. Spróbuj ponownie lub napisz bezpośrednio na marcin@szabunia.pl";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all required fields
    const nameErr = validateField("name", formData.name);
    const emailErr = validateField("email", formData.email);
    const errors: FieldErrors = {};
    if (nameErr) errors.name = nameErr;
    if (emailErr) errors.email = emailErr;
    if (!consent) errors.consent = "Zaznacz zgodę powyżej, aby wysłać";
    setFieldErrors(errors);
    setTouched({ name: true, email: true });

    if (Object.keys(errors).length > 0) return;

    setSending(true);
    setError(null);

    try {
      const res = await fetch(`/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service: formData.service,
          message: formData.message,
          _gotcha: gotcha,
          turnstileToken,
          ...getUtmParams(),
        }),
      });

      if (res.ok) {
        setSubmitted(true);
        gtagEvent("contact_submit", { service: formData.service || "(brak)" });
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
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    if (!formStartedRef.current) {
      formStartedRef.current = true;
      gtagEvent("contact_form_started", { field: name });
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change if field was touched
    if (touched[name]) {
      const err = validateField(name, value);
      setFieldErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setFieldErrors((prev) => ({ ...prev, [name]: err }));
  };

  // Listen for calculator → form bridge event
  useEffect(() => {
    const handler = (e: Event) => {
      const { service, message } = (e as CustomEvent).detail;
      const serviceMap: Record<string, string> = {
        "wizerunek-portrety": "wizerunek",
        "sesje-zespolowe": "zespol",
        "fotografia-produktowa": "produkt",
        "eventy-reportaze": "event",
        "wideo-marketing": "wideo",
        "pakiety-foto-wideo": "pakiet",
        "zdjecia-wideo-z-drona": "dron",
      };
      setFormData((prev) => ({
        ...prev,
        service: serviceMap[service] ?? "",
        message: message ?? "",
      }));
    };
    window.addEventListener("calc-to-form", handler);
    return () => window.removeEventListener("calc-to-form", handler);
  }, []);

  return (
    <section id="kontakt" className="py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <AnimatedSection>
          <div className="relative rounded-[20px] overflow-hidden bg-white border border-border dark:bg-dark-card dark:border-dark-border px-6 py-12 md:px-10 md:py-16">
            {/* Background glow */}
            <div className="absolute inset-0 -z-0">
              {/* Radial-gradient zamiast filter:blur — wydajność na mobile */}
              <Parallax distance={PARALLAX.strong} direction="up" className="absolute top-[30%] left-[20%] w-[400px] h-[400px] bg-[radial-gradient(circle,rgba(37,99,235,0.14)_0%,transparent_70%)]" />
              <Parallax distance={PARALLAX.base} direction="down" className="absolute top-[50%] right-[10%] w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(37,99,235,0.08)_0%,transparent_70%)]" />
            </div>

            <div className="relative z-10 grid md:grid-cols-2 gap-10 items-start">
              {/* Left: Info */}
              <div>
                <h2 className="font-barlow font-black text-3xl md:text-[36px] leading-[1.1] tracking-tight text-navy dark:text-white mb-3">
                  Zacznijmy budować
                  <br />
                  Twój wizerunek
                </h2>
                <p className="text-steel dark:text-dark-text-muted text-[15px] leading-relaxed mb-4">
                  Odpowiadam w ciągu 24h ze spersonalizowaną ofertą dopasowaną
                  do Twojego budżetu.
                </p>

                {/* Zbijanie ryzyka */}
                <ul className="flex flex-wrap gap-x-4 gap-y-1.5 mb-8">
                  {["Faktura VAT", "Poprawki: 2 tury foto / 3 wideo", "Licencja komercyjna bez limitu", "Wolne terminy zwykle w 1-3 tyg."].map((t) => (
                    <li key={t} className="flex items-center gap-1.5 text-[13px] text-steel dark:text-dark-text-muted">
                      <svg className="w-4 h-4 text-blue dark:text-blue-light flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                      </svg>
                      {t}
                    </li>
                  ))}
                </ul>

                {/* Contact info */}
                <div className="space-y-4 mb-8">
                  <a
                    href="mailto:marcin@szabunia.pl"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl border border-border dark:border-dark-border flex items-center justify-center group-hover:border-blue transition-colors">
                      <svg
                        className="w-4 h-4 text-blue"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-steel dark:text-dark-text-muted mb-0.5 font-barlow font-semibold">
                        Email
                      </p>
                      <p className="text-navy dark:text-white text-sm group-hover:text-blue transition-colors">
                        marcin@szabunia.pl
                      </p>
                    </div>
                  </a>

                  <a
                    href="https://instagram.com/szabunia.biz"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl border border-border dark:border-dark-border flex items-center justify-center group-hover:border-blue transition-colors">
                      <svg
                        className="w-4 h-4 text-blue"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-steel dark:text-dark-text-muted mb-0.5 font-barlow font-semibold">
                        Instagram
                      </p>
                      <p className="text-navy dark:text-white text-sm group-hover:text-blue transition-colors">
                        @szabunia.biz
                      </p>
                    </div>
                  </a>

                  <a
                    href="tel:+48514900688"
                    className="flex items-center gap-3 group"
                  >
                    <div className="w-10 h-10 rounded-xl border border-border dark:border-dark-border flex items-center justify-center group-hover:border-blue transition-colors">
                      <svg
                        className="w-4 h-4 text-blue"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-steel dark:text-dark-text-muted mb-0.5 font-barlow font-semibold">
                        Telefon
                      </p>
                      <p className="text-navy dark:text-white text-sm group-hover:text-blue transition-colors">
                        +48 514 900 688
                      </p>
                    </div>
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl border border-border dark:border-dark-border flex items-center justify-center">
                      <svg
                        className="w-4 h-4 text-blue"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={1.5}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-widest text-steel dark:text-dark-text-muted mb-0.5 font-barlow font-semibold">
                        Lokalizacja
                      </p>
                      <p className="text-navy dark:text-white text-sm">Poznań, Polska</p>
                    </div>
                  </div>
                </div>

                {/* Social proof */}
                <div className="flex items-center gap-3">
                  <p className="text-xs text-steel dark:text-dark-text-muted">
                    100+ zadowolonych firm B2B
                  </p>
                </div>
              </div>

              {/* Right: Form */}
              <div className="rounded-2xl p-6 bg-gray-bg border border-border dark:bg-white/[0.04] dark:border-white/10">
                {submitted ? (
                  <div className="text-center py-8" role="status" aria-live="polite">
                    <div className="w-16 h-16 rounded-full bg-blue/20 flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-blue"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-navy dark:text-white font-barlow font-bold text-lg mb-1">
                      Wiadomość wysłana!
                    </p>
                    <p className="text-steel dark:text-dark-text-muted text-sm mb-6">
                      Dziękuję za kontakt. Odpowiem najszybciej jak to możliwe
                      (zazwyczaj w ciągu 24h).
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFieldErrors({});
                        setTouched({});
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          service: "",
                          message: "",
                        });
                      }}
                      className="text-xs uppercase tracking-widest text-blue hover:text-navy dark:hover:text-white transition-colors font-barlow font-semibold"
                    >
                      Wyślij kolejną wiadomość
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate>
                    {/* Honeypot — ukryte pole dla botów (jak w PoradnikForm);
                        wcześniej _gotcha szło na sztywno puste, więc nie filtrowało niczego. */}
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
                    <div className="mb-3">
                      <label htmlFor="contact-name" className="block text-[11px] text-steel dark:text-dark-text-muted font-barlow font-semibold uppercase tracking-wide mb-1.5">
                        Imię i nazwisko / Firma
                      </label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        value={formData.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        aria-invalid={!!fieldErrors.name}
                        aria-describedby={fieldErrors.name ? "name-error" : undefined}
                        placeholder="Jan Kowalski / Firma Sp. z o.o."
                        className={`w-full bg-white dark:bg-white/[0.08] border rounded-xl px-3.5 py-3 text-[13px] text-navy dark:text-white placeholder-steel font-inter transition-colors ${fieldErrors.name ? "border-red-400 focus:border-red-400" : "border-border dark:border-navy-light focus:border-blue"}`}
                      />
                      {fieldErrors.name && (
                        <p id="name-error" role="alert" className="text-red-600 dark:text-red-400 text-[11px] mt-1">{fieldErrors.name}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      <div>
                        <label htmlFor="contact-email" className="block text-[11px] text-steel dark:text-dark-text-muted font-barlow font-semibold uppercase tracking-wide mb-1.5">
                          E-mail
                        </label>
                        <input
                          id="contact-email"
                          type="email"
                          name="email"
                          required
                          autoComplete="email"
                          value={formData.email}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-invalid={!!fieldErrors.email}
                          aria-describedby={fieldErrors.email ? "email-error" : undefined}
                          placeholder="jan@firma.pl"
                          className={`w-full bg-white dark:bg-white/[0.08] border rounded-xl px-3.5 py-3 text-[13px] text-navy dark:text-white placeholder-steel font-inter transition-colors ${fieldErrors.email ? "border-red-400 focus:border-red-400" : "border-border dark:border-navy-light focus:border-blue"}`}
                        />
                        {fieldErrors.email && (
                          <p id="email-error" role="alert" className="text-red-600 dark:text-red-400 text-[11px] mt-1">{fieldErrors.email}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="contact-phone" className="block text-[11px] text-steel dark:text-dark-text-muted font-barlow font-semibold uppercase tracking-wide mb-1.5">
                          Telefon (opcjonalnie)
                        </label>
                        <input
                          id="contact-phone"
                          type="tel"
                          name="phone"
                          autoComplete="tel"
                          inputMode="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+48 xxx xxx xxx"
                          className="w-full bg-white dark:bg-white/[0.08] border border-border dark:border-navy-light rounded-xl px-3.5 py-3 text-[13px] text-navy dark:text-white placeholder-steel font-inter focus:border-blue transition-colors"
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="contact-service" className="block text-[11px] text-steel dark:text-dark-text-muted font-barlow font-semibold uppercase tracking-wide mb-1.5">
                        Rodzaj usługi
                      </label>
                      <div className="relative">
                        <select
                          id="contact-service"
                          name="service"
                          value={formData.service}
                          onChange={handleChange}
                          className="w-full bg-white dark:bg-white/[0.08] border border-border dark:border-navy-light rounded-xl px-3.5 py-3 text-[13px] text-navy dark:text-white font-inter focus:border-blue transition-colors appearance-none pr-10"
                        >
                          <option value="" className="bg-white dark:bg-navy text-steel">
                            Wybierz usługę...
                          </option>
                          <option value="wizerunek" className="bg-white dark:bg-navy">
                            Portrety biznesowe / Headshoty
                          </option>
                          <option value="zespol" className="bg-white dark:bg-navy">
                            Sesje zespołowe
                          </option>
                          <option value="produkt" className="bg-white dark:bg-navy">
                            Fotografia produktowa / przemysłowa
                          </option>
                          <option value="event" className="bg-white dark:bg-navy">
                            Reportaż z eventu
                          </option>
                          <option value="wideo" className="bg-white dark:bg-navy">
                            Wideo marketing
                          </option>
                          <option value="pakiet" className="bg-white dark:bg-navy">
                            Pakiet foto + wideo
                          </option>
                          <option value="dron" className="bg-white dark:bg-navy">
                            Zdjęcia i wideo z drona
                          </option>
                          <option value="inne" className="bg-white dark:bg-navy">
                            Inne zapytanie
                          </option>
                        </select>
                        <svg
                          className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-steel pointer-events-none"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>

                    <div className="mb-4">
                      <label htmlFor="contact-message" className="block text-[11px] text-steel dark:text-dark-text-muted font-barlow font-semibold uppercase tracking-wide mb-1.5">
                        Wiadomość
                      </label>
                      <textarea
                        id="contact-message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Opowiedz krótko o swoim projekcie..."
                        rows={3}
                        className="w-full bg-white dark:bg-white/[0.08] border border-border dark:border-navy-light rounded-xl px-3.5 py-3 text-[13px] text-navy dark:text-white placeholder-steel font-inter resize-none focus:border-blue transition-colors"
                      />
                    </div>

                    <label className="flex items-start gap-2.5 mb-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={consent}
                        onChange={(e) => {
                          setConsent(e.target.checked);
                          if (e.target.checked) setFieldErrors((prev) => ({ ...prev, consent: undefined }));
                        }}
                        aria-invalid={!!fieldErrors.consent}
                        aria-describedby={fieldErrors.consent ? "consent-error" : undefined}
                        className="mt-0.5 w-4 h-4 rounded border-border dark:border-navy-light accent-blue flex-shrink-0"
                      />
                      <span className="text-[11px] text-steel dark:text-dark-text-muted leading-relaxed">
                        Wyrażam zgodę na przetwarzanie moich danych osobowych w celu odpowiedzi na zapytanie, zgodnie z{" "}
                        <a href="/polityka-prywatnosci" target="_blank" rel="noopener noreferrer" className="text-blue hover:text-navy dark:hover:text-white underline transition-colors">
                          polityką prywatności
                        </a>.
                      </span>
                    </label>
                    {fieldErrors.consent && (
                      <p id="consent-error" role="alert" className="text-red-600 dark:text-red-400 text-[11px] mb-3">
                        {fieldErrors.consent}
                      </p>
                    )}
                    {!fieldErrors.consent && <div className="mb-4" />}

                    <TurnstileWidget
                      ref={turnstileRef}
                      onVerify={setTurnstileToken}
                      onBlocked={() => setTurnstileBlocked(true)}
                    />

                    {error && (
                      <p role="alert" className="text-red-600 dark:text-red-400 text-[12px] mb-3 text-center">
                        {error}
                      </p>
                    )}

                    {TURNSTILE_ENABLED && !turnstileToken && !sending && (
                      turnstileBlocked ? (
                        <p role="alert" className="text-center text-[12px] text-red-600 dark:text-red-400 mb-3">
                          Zabezpieczenie antybotowe nie załadowało się (możliwa blokada przez AdBlock lub rozszerzenie przeglądarki). Napisz bezpośrednio:{" "}
                          <a href="mailto:marcin@szabunia.pl" className="underline">marcin@szabunia.pl</a>
                        </p>
                      ) : (
                        <p className="text-center text-[11px] text-steel dark:text-dark-text-muted mb-3">
                          Ładowanie zabezpieczenia antybotowego...
                        </p>
                      )
                    )}

                    <button
                      type="submit"
                      disabled={sending || (TURNSTILE_ENABLED && !turnstileToken)}
                      className={`w-full bg-gradient-to-br from-blue to-blue-light text-white py-3.5 rounded-xl font-barlow font-bold text-sm btn-glow transition-all duration-200 hover:scale-[1.02] hover:shadow-lg hover:shadow-blue/40 hover:brightness-110 active:scale-[0.98] disabled:opacity-80 disabled:hover:scale-100 disabled:hover:shadow-none disabled:hover:brightness-100 ${sending ? "disabled:cursor-wait" : "disabled:cursor-not-allowed"}`}
                    >
                      {sending ? (
                        <span className="inline-flex items-center gap-2">
                          <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Wysyłanie...
                        </span>
                      ) : "Wyślij zapytanie, odezwę się w 24h"}
                    </button>
                    <p className="text-center text-[11px] text-steel dark:text-dark-text-muted mt-2.5">
                      Odpowiadam osobiście.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
