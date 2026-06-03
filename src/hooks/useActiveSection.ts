"use client";

import { useEffect, useState } from "react";

// Linia aktywacji: sekcja staje się aktywna, gdy jej górna krawędź wjedzie
// w górną część viewportu (ok. 30% wysokości — tuż pod przyklejoną nawigacją).
const ACTIVATION_RATIO = 0.3;

/**
 * Scroll-spy oparty na IntersectionObserver. Obserwator jest tylko
 * wyzwalaczem — właściwy wybór liczymy z getBoundingClientRect w callbacku
 * (poza renderem), więc nie czytamy DOM w trakcie renderu ani nie
 * re-renderujemy na każdy piksel scrolla (setState bailuje przy tej samej wartości).
 *
 * Aktywna jest ostatnia (w kolejności DOM) sekcja, której górna krawędź
 * minęła linię aktywacji. Powyżej pierwszej sekcji (hero) — brak aktywnej.
 * Poniżej ostatniej — trzymamy ostatnią.
 */
export function useActiveSection(ids: readonly string[], enabled = true): string {
  const [active, setActive] = useState("");

  useEffect(() => {
    if (!enabled || typeof window === "undefined" || ids.length === 0) return;

    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const update = () => {
      const line = window.innerHeight * ACTIVATION_RATIO;
      let current = "";
      // Sekcje są ułożone pionowo w kolejności DOM, więc top rośnie monotonicznie.
      for (const el of elements) {
        if (el.getBoundingClientRect().top <= line) current = el.id;
        else break;
      }
      setActive(current);
    };

    // Strefa detekcji to górny pasek viewportu [0, linia aktywacji]. Sekcja
    // „przecina" go, gdy jej górna krawędź jest powyżej linii — więc każde
    // przekroczenie linii (też pierwszej sekcji i skoki Home/End/scrollTo)
    // przełącza przecięcie i wyzwala przeliczenie. IntersectionObserver odpala
    // tylko przy zmianie przecięcia, dlatego pasek musi być zakotwiczony u góry.
    const observer = new IntersectionObserver(update, {
      rootMargin: `0px 0px -${(1 - ACTIVATION_RATIO) * 100}% 0px`,
      threshold: 0,
    });

    elements.forEach((el) => observer.observe(el));

    // Domknięcie krawędzi: natychmiastowy skok między dwoma położeniami, w
    // których górny pasek detekcji jest pusty (np. teleport z dołu strony na
    // sam dół hero klawiszem Home), nie zmienia przecięcia — więc IO nie
    // odpala i podświetlenie zostałoby nieaktualne. „scrollend" przelicza raz
    // po zakończeniu każdego scrolla (też natychmiastowego), bez pracy na
    // każdej klatce. Brak wsparcia w przeglądarce = łagodny powrót do
    // zachowania IO (stan i tak naprawi się przy kolejnym przewinięciu).
    window.addEventListener("scrollend", update);

    update(); // stan początkowy (np. wejście na stronę w połowie scrolla)
    return () => {
      observer.disconnect();
      window.removeEventListener("scrollend", update);
    };
  }, [ids, enabled]);

  return active;
}
