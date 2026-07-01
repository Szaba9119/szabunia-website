"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: HTMLElement,
        options: { sitekey: string; callback: (token: string) => void; "expired-callback"?: () => void }
      ) => string;
      reset: (widgetId?: string) => void;
    };
  }
}

/**
 * Widget Cloudflare Turnstile (CAPTCHA) — chroni /api/contact i /api/lead przed botami.
 * Jeśli NEXT_PUBLIC_TURNSTILE_SITE_KEY nie jest ustawiony (np. lokalnie bez .env.local),
 * komponent nic nie renderuje — formularz działa dalej, tylko bez tej warstwy ochrony
 * (rate-limit i honeypot zostają aktywne niezależnie).
 */
export default function TurnstileWidget({ onVerify }: { onVerify: (token: string) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const onVerifyRef = useRef(onVerify);
  useEffect(() => {
    onVerifyRef.current = onVerify;
  }, [onVerify]);

  if (!SITE_KEY) return null;

  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js"
        strategy="lazyOnload"
        onReady={() => {
          if (!containerRef.current || !window.turnstile) return;
          containerRef.current.innerHTML = "";
          window.turnstile.render(containerRef.current, {
            sitekey: SITE_KEY,
            callback: (token) => onVerifyRef.current(token),
            "expired-callback": () => onVerifyRef.current(""),
          });
        }}
      />
      <div ref={containerRef} className="mt-3" />
    </>
  );
}
