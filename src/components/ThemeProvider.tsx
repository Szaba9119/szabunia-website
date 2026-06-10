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
    const saved = localStorage.getItem("theme") as Theme | null;
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
      localStorage.setItem("theme", next);
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
