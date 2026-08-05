"use client";

import { useEffect } from "react";

// Ostatnia deska ratunku: błąd w samym root layoucie. Ten komponent ZASTĘPUJE
// root layout, więc nie ma tu ani globals.css, ani fontów, ani motywu — stąd
// style inline. Bez tego pliku użytkownik widział surowy ekran „Application
// error" bez jednej drogi kontaktu (audyt PELNY2608-30).
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[ALERT] Błąd globalny:", error.digest ?? error.message);
  }, [error]);

  return (
    <html lang="pl">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#F9FAFB",
          color: "#334155",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        <div style={{ maxWidth: "420px", textAlign: "center" }}>
          <h1 style={{ fontSize: "24px", fontWeight: 800, color: "#0F172A", margin: "0 0 12px" }}>
            Coś się zacięło po mojej stronie
          </h1>
          <p style={{ fontSize: "15px", lineHeight: 1.6, margin: "0 0 28px" }}>
            Strona nie chciała się wczytać. Spróbuj jeszcze raz, a jeśli to nie pomoże,
            napisz albo zadzwoń: odpowiadam w 24h.
          </p>
          <button
            onClick={reset}
            style={{
              background: "#2563EB",
              color: "#fff",
              border: 0,
              borderRadius: "12px",
              padding: "14px 28px",
              fontSize: "15px",
              fontWeight: 700,
              cursor: "pointer",
            }}
          >
            Spróbuj ponownie
          </button>
          <p style={{ fontSize: "14px", margin: "28px 0 0" }}>
            <a href="tel:+48514900688" style={{ color: "#2563EB", fontWeight: 600 }}>
              514 900 688
            </a>
            {"  ·  "}
            <a href="mailto:marcin@szabunia.pl" style={{ color: "#2563EB", fontWeight: 600 }}>
              marcin@szabunia.pl
            </a>
          </p>
        </div>
      </body>
    </html>
  );
}
