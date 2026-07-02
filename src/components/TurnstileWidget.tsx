"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
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
        }
      ) => string;
      reset: (widgetId?: string) => void;
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
 * `onBlocked` sygnalizuje rodzicowi, że skrypt Turnstile nie załadował się (AdBlock,
 * rozszerzenie prywatności, firewall firmowy) ani przez zdarzenie onError, ani w ciągu
 * LOAD_TIMEOUT_MS — rodzic pokazuje wtedy alternatywę (link mailto), bo serwer i tak
 * odrzuci zgłoszenie bez tokenu (fail-closed po stronie API), więc samo odblokowanie
 * przycisku nic by nie dało.
 */
const TurnstileWidget = forwardRef<
  TurnstileWidgetHandle,
  { onVerify: (token: string) => void; onBlocked?: () => void }
>(function TurnstileWidget({ onVerify, onBlocked }, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | undefined>(undefined);
  const onVerifyRef = useRef(onVerify);
  const onBlockedRef = useRef(onBlocked);
  const renderedRef = useRef(false);
  const blockedFiredRef = useRef(false);
  const { theme } = useTheme();

  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);
  useEffect(() => {
    onBlockedRef.current = onBlocked;
  }, [onBlocked]);

  const reportBlocked = () => {
    if (blockedFiredRef.current) return;
    blockedFiredRef.current = true;
    onBlockedRef.current?.();
  };

  useImperativeHandle(ref, () => ({
    reset: () => {
      if (widgetIdRef.current) window.turnstile?.reset(widgetIdRef.current);
      onVerifyRef.current("");
    },
  }));

  const renderWidget = () => {
    if (!containerRef.current || !window.turnstile || !SITE_KEY) return;
    renderedRef.current = true;
    containerRef.current.innerHTML = "";
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      theme,
      callback: (token) => onVerifyRef.current(token),
      "expired-callback": () => onVerifyRef.current(""),
    });
  };

  // Widget renderuje się raz przez Script.onReady; przy zmianie motywu (toggle
  // dark/light) trzeba go przerenderować, bo Turnstile nie zmienia theme "na żywo".
  useEffect(() => {
    if (window.turnstile) renderWidget();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  useEffect(() => {
    if (!SITE_KEY) return;
    const timer = setTimeout(() => {
      if (!renderedRef.current) reportBlocked();
    }, LOAD_TIMEOUT_MS);
    return () => clearTimeout(timer);
  }, []);

  if (!SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onReady={renderWidget}
        onError={reportBlocked}
      />
      <div ref={containerRef} className="mt-3" />
    </>
  );
});

export default TurnstileWidget;
