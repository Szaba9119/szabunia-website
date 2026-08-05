"use client";

import { createContext, useContext, useEffect, useState, useMemo } from "react";

type Theme = "light" | "dark";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
}>({
  theme: "light",
  toggle: () => {},
});

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Always start "light" to match server HTML; the inline <script> in layout.tsx
  // already applies the correct .dark class before paint, so there's no flash.
  const [theme, setTheme] = useState<Theme>("light");

  // Sync real theme from localStorage / system preference after hydration
  useEffect(() => {
    // `try/catch`: przy zablokowanym zapisie danych witryny (Chrome „Blokuj
    // wszystkie pliki cookie", polityka firmowa, część rozszerzeń) dostęp do
    // localStorage rzuca SecurityError. Ten komponent owija {children} całej
    // aplikacji, więc poniżej nie ma granicy, która by go złapała, i użytkownik
    // z tego segmentu nie zobaczyłby strony w ogóle (audyt PELNY2608-16).
    // Wzorzec z src/lib/utm.ts:33. Fallback: motyw jasny, czyli stan bezpieczny.
    let saved: Theme | null = null;
    try {
      saved = localStorage.getItem("theme") as Theme | null;
    } catch {
      saved = null;
    }
    // Domyślnie jasny motyw przy pierwszej wizycie; tylko jawny wybór "dark" go włącza.
    const resolved: Theme = saved === "dark" ? "dark" : "light";
    // eslint-disable-next-line react-hooks/set-state-in-effect -- post-hydration sync: localStorage/matchMedia unavailable during SSR render
    setTheme(resolved);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    document.documentElement.style.colorScheme = theme;
  }, [theme]);

  const toggle = () => {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("theme", next);
      } catch {
        // Zapis niedostępny — motyw działa do końca sesji, po prostu się nie zapamięta.
      }
      return next;
    });
  };

  const value = useMemo(() => ({ theme, toggle }), [theme]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
