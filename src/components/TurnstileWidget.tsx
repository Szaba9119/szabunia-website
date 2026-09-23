"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef, useState } from "react";
import Script from "next/script";
import { useTheme } from "./ThemeProvider";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const LOAD_TIMEOUT_MS = 8000;

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: {
          sitekey: string;
          theme?: "light" | "dark" | "auto";
          callback: (token: string) => void;
          "expired-callback"?: () => void;
          "timeout-callback"?: () => void;
          "error-callback"?: (code?: string) => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}

export interface TurnstileWidgetHandle {
  reset: () => void;
}

/**
 * Widget Cloudflare Turnstile (CAPTCHA) — chroni /api/contact i /api/lead przed botami.
 * Jeśli NEXT_PUBLIC_TURNSTILE_SITE_KEY nie jest ustawiony (np. lokalnie bez .env.local),
 * komponent nic nie renderuje — formularz działa dalej, tylko bez tej warstwy ochrony
 * (rate-limit i honeypot zostają aktywne niezależnie).
 *
 * `onBlocked(blocked)` sygnalizuje rodzicowi, CZY da się uzyskać token. `true`, gdy
 * skrypt nie załadował się (AdBlock, rozszerzenie prywatności, firewall firmowy) ani
 * przez zdarzenie onError, ani w ciągu LOAD_TIMEOUT_MS, albo gdy samo wyzwanie zwróciło
 * błąd lub wygasło bez wyniku. Rodzic pokazuje wtedy alternatywę (link mailto), bo serwer
 * i tak odrzuci zgłoszenie bez tokenu (fail-closed po stronie API).
 *
 * ⚠ SYGNAŁ MUSI BYĆ DWUSTRONNY. Wcześniej leciało wyłącznie „zablokowane", więc stan
 * błędu był lepki: komunikat znikał tylko dlatego, że rodzic ma warunek `!turnstileToken`,
 * a po wygaśnięciu tokenu (300 s) wracał nieaktualny komunikat o blokadzie, choć widget
 * działał i sam się ponawiał.
 */
const TurnstileWidget = forwardRef<
  TurnstileWidgetHandle,
  { onVerify: (token: string) => void; onBlocked?: (blocked: boolean) => void }
>(function TurnstileWidget({ onVerify, onBlocked }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const onVerifyRef = useRef(onVerify);
  const onBlockedRef = useRef(onBlocked);
  const renderedRef = useRef(false);
  const blockedRef = useRef(false);
  const { theme } = useTheme();
  // ŁADOWANIE DOPIERO PRZY FORMULARZU (23.09.2026). Wcześniej `<Script lazyOnload>` stał
  // w drzewie od pierwszego renderu, więc skrypt i wyzwanie Cloudflare startowały zaraz po
  // wczytaniu KAŻDEJ strony z formularzem, także strony głównej, gdzie formularz jest na
  // samym dole. Lighthouse mobile na produkcji 23.09: ok. 750 KB z 1 570 KB wagi strony
  // głównej to Turnstile (`challenges.cloudflare.com`), liczony w tle na procesorze
  // telefonu w tym samym czasie, co render hero. Teraz skrypt wchodzi, gdy kontener
  // widgetu jest ~800 px od ekranu: wyzwanie ma kilka sekund, zanim ktoś dojdzie do pól.
  // Kotwica `#kontakt` przeskakuje prosto do formularza, więc tam ładowanie rusza od razu.
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);
  useEffect(() => {
    onBlockedRef.current = onBlocked;
  }, [onBlocked]);

  const setBlocked = (blocked: boolean) => {
    if (blockedRef.current === blocked) return;
    blockedRef.current = blocked;
    onBlockedRef.current?.(blocked);
  };

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      onVerifyRef.current("");
    },
  }));

  // Turnstile prowadzi WŁASNY rejestr wyrenderowanych widgetów, niezależny od DOM.
  // Samo `container.innerHTML = ""` kasuje tylko iframe, a wpis w rejestrze zostaje:
  // Cloudflare wypisuje wtedy w konsoli ostrzeżenie o braku widgetu i zaleca
  // `turnstile.remove()`. Dlatego sprzątamy przez API — przed każdym ponownym
  // renderowaniem (zmiana motywu) i przy odmontowaniu komponentu (przejście na
  // inną stronę). `innerHTML` zostaje jako zabezpieczenie na wypadek, gdyby
  // `remove()` rzuciło wyjątkiem (np. skrypt zniknął szybciej niż komponent).
  const removeWidget = () => {
    const id = widgetIdRef.current;
    widgetIdRef.current = undefined;
    if (id) {
      try {
        window.turnstile?.remove(id);
      } catch {
        // Instancji już nie ma po stronie Turnstile — nie ma czego sprzątać.
      }
    }
    if (containerRef.current) containerRef.current.innerHTML = "";
  };

  const failChallenge = () => {
    onVerifyRef.current("");
    setBlocked(true);
  };

  const renderWidget = () => {
    if (!containerRef.current || !window.turnstile || !SITE_KEY) return;
    removeWidget();
    renderedRef.current = true;
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      theme,
      callback: (token) => {
        // Sukces zdejmuje stan blokady, także po wcześniejszym błędzie lub timeoucie.
        setBlocked(false);
        onVerifyRef.current(token);
      },
      "expired-callback": () => onVerifyRef.current(""),
      // Wyzwanie wystartowało, ale nie skończyło się tokenem — błędem albo
      // przeterminowaniem. Oba przypadki MUSZĄ zgłosić blokadę, nie tylko
      // zerować token: sam pusty token zostawia rodzica w stanie „nie zablokowane,
      // ale bez tokenu", czyli z komunikatem „Ładowanie zabezpieczenia
      // antybotowego..." w nieskończoność i z wyłączonym przyciskiem wysyłki.
      // To ten sam ślepy zaułek, który ta poprawka ma zamykać.
      "timeout-callback": () => failChallenge(),
      "error-callback": () => failChallenge(),
    });
  };

  // Widget renderuje się raz przez Script.onReady; przy zmianie motywu (toggle
  // dark/light) trzeba go przerenderować, bo Turnstile nie zmienia theme "na żywo".
  //
  // ⚠ NIE czyścimy tu tokenu. Token Turnstile żyje 300 s po stronie Cloudflare
  // i pozostaje ważny mimo podmiany widgetu, więc wyzerowanie go wyłączałoby
  // przycisk wysyłki każdemu, kto przełączy motyw z gotowym formularzem.
  useEffect(() => {
    if (window.turnstile) renderWidget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  // Sprzątanie przy odmontowaniu. `removeWidget` sięga wyłącznie do refów,
  // więc wersja domknięta przy pierwszym renderze działa poprawnie.
  useEffect(() => removeWidget, []);

  useEffect(() => {
    if (!SITE_KEY || shouldLoad) return;
    const el = containerRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setShouldLoad(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldLoad(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    // Drugi wyzwalacz: pierwsze wejście w dowolne pole formularza. Na telefonie formularz
    // ma ok. 900 px, a widget stoi na jego końcu, więc pierwsze pole może być dalej niż
    // margines obserwatora. Kto zaczyna pisać, dostaje wyzwanie od razu.
    const form = el.closest("form");
    const start = () => setShouldLoad(true);
    form?.addEventListener("focusin", start, { once: true });
    return () => {
      io.disconnect();
      form?.removeEventListener("focusin", start);
    };
  }, [shouldLoad]);

  // Limit czasu liczony od STARTU ładowania skryptu, nie od wejścia na stronę. Przy
  // ładowaniu przy formularzu licznik od pierwszego renderu zgłaszałby blokadę każdemu,
  // kto przewija stronę dłużej niż 8 s, choć skrypt nawet nie ruszył.
  useEffect(() => {
    if (!SITE_KEY || !shouldLoad) return;
    const timer = setTimeout(() => {
      if (!renderedRef.current) setBlocked(true);
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, [shouldLoad]);

  if (!SITE_KEY) return null;

  return (
    <>
      {shouldLoad && (
        <Script
          src="https://challenges.cloudflare.com/turnstile/v0/api.js"
          strategy="afterInteractive"
          onReady={renderWidget}
          onError={() => setBlocked(true)}
        />
      )}
      <div ref={containerRef} className="mt-3" />
    </>
  );
});

export default TurnstileWidget;
