"use client";

import { useState, useEffect, useRef } from "react";
import { updateAnalyticsConsent } from "@/lib/gtag";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  // Fokus przenosimy TYLKO przy świadomym otwarciu z linku w stopce, nigdy przy
  // automatycznym pokazaniu banera. Zabranie fokusu bez akcji użytkownika jest
  // samo w sobie błędem dostępności (WCAG 3.2.1 On Focus).
  const focusOnOpen = useRef(false);

  useEffect(() => {
    // `try/catch` jak w ThemeProvider (PELNY2608-16). Fallback przy zablokowanym
    // magazynie: baner ukryty, czyli stan bezpieczny — zgoda zostaje na `denied`.
    let consent: string | null = null;
    try {
      consent = localStorage.getItem("cookie-consent");
    } catch {
      return;
    }
    if (!consent) {
      // Small delay so it doesn't flash on page load
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  // Ponowne otwarcie banera z linku „Ustawienia cookies" w stopce — pozwala
  // w każdej chwili zmienić/wycofać zgodę (równie łatwo jak ją wyrazić).
  useEffect(() => {
    const reopen = () => {
      focusOnOpen.current = true;
      setVisible(true);
    };
    window.addEventListener("open-cookie-settings", reopen);
    return () => window.removeEventListener("open-cookie-settings", reopen);
  }, []);

  // Baner renderuje się na końcu `layout.tsx`, a link „Ustawienia cookies" stoi
  // w stopce. Bez tego przeniesienia fokusu kliknięcie linku z klawiatury nie
  // dawało żadnego efektu do wyśledzenia: baner pojawiał się poza kolejnością
  // czytania (finding PELNY2608-66).
  useEffect(() => {
    if (!visible || !focusOnOpen.current) return;
    focusOnOpen.current = false;
    ref.current?.focus();
  }, [visible]);

  // Zgłaszaj wysokość banera, żeby mobilny pasek akcji (MobileFAB) uniósł się nad niego.
  useEffect(() => {
    const emit = () => {
      const height = visible && ref.current ? ref.current.offsetHeight : 0;
      window.dispatchEvent(new CustomEvent("cookie-banner-change", { detail: { height } }));
    };
    emit();
    if (!visible) return;
    window.addEventListener("resize", emit);
    return () => window.removeEventListener("resize", emit);
  }, [visible]);

  const remember = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem("cookie-consent", value);
    } catch {
      // Zapis niedostępny — decyzja obowiązuje do końca sesji, baner wróci przy kolejnej.
    }
  };

  const accept = () => {
    remember("accepted");
    updateAnalyticsConsent(true);
    setVisible(false);
  };

  const decline = () => {
    remember("declined");
    updateAnalyticsConsent(false);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      ref={ref}
      // ⚠ `role="region"`, NIE `role="dialog"` (zmiana 10.08.2026, finding
      // PELNY2608-66). Baner jest świadomie NIEMODALNY: wrapper ma
      // `pointer-events-none`, nie ma nakładki, strona pod nim działa dalej
      // i da się z niej korzystać bez podjęcia decyzji. `role="dialog"`
      // obiecywał czytnikowi modal, którego nie ma — brakowało `aria-modal`,
      // pułapki fokusu i Escape. Wybrana jedna, spójna semantyka: niemodalny
      // region z etykietą. Escape celowo NIE zamyka banera — musiałby wybrać
      // za użytkownika „akceptuję" albo „odrzuć", a to decyzja o zgodzie.
      role="region"
      aria-label="Informacja o plikach cookie"
      tabIndex={-1}
      // `pointer-events-none` na wrapperze: przezroczysty pas o pełnej szerokości
      // przechwytywał kliknięcia w całym dolnym pasie (na 1920 px po ~576 px z każdej
      // strony) i blokował BackToTopButton na /blog/[slug] (audyt PELNY2608-21).
      className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto max-w-3xl mx-auto bg-white dark:bg-dark-card rounded-2xl border border-border dark:border-dark-border shadow-xl shadow-navy/10 dark:shadow-black/30 p-5 md:p-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
        <div className="flex-1 min-w-0">
          <p className="text-[13px] text-text-body dark:text-dark-text leading-relaxed">
            Ta strona korzysta z plików cookie w celu zapewnienia prawidłowego
            działania, analizy ruchu i pomiaru skuteczności reklam.{" "}
            <a
              href="/polityka-prywatnosci"
              className="text-blue dark:text-blue-light underline hover:no-underline"
            >
              Polityka prywatności
            </a>
          </p>
        </div>
        {/* Mobile: przyciski na pełną szerokość karty, po połowie. Wcześniej trzymały się
              lewej krawędzi z pustym miejscem po prawej, co odstawało od reszty strony
              (zgłoszone przez Marcina 31.07). Od sm w górę bez zmian. */}
        <div className="flex gap-2 w-full sm:w-auto shrink-0">
          {/* Odrzuć równorzędny z Akceptuję: 2026-07-31 zrównana także waga wizualna (oba wypełnione)
              i szerokość (min-w), oraz wysokość do 44 px. Wcześniej Odrzuć był 80x38 px w wariancie
              wtórnym, a Akceptuję 96x38 px z gradientem — finding UX2607-06. */}
          <button
            onClick={decline}
            className="flex-1 sm:flex-none min-w-[112px] px-4 py-3 text-[13px] font-barlow font-semibold text-white bg-navy dark:bg-dark-card-hover border border-navy dark:border-white/30 rounded-xl hover:scale-[1.02] transition-transform"
          >
            Odrzuć
          </button>
          <button
            onClick={accept}
            className="flex-1 sm:flex-none min-w-[112px] px-4 py-3 text-[13px] font-barlow font-semibold text-white bg-blue rounded-xl hover:scale-[1.02] transition-transform"
          >
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
