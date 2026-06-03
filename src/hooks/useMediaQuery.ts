"use client";

import { useCallback, useSyncExternalStore } from "react";

// SSR-safe matchMedia. Na serwerze zwraca false (parallax startuje dopiero
// po hydracji na desktopie — brak skoku layoutu).
export function useMediaQuery(query: string): boolean {
  const subscribe = useCallback(
    (callback: () => void) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", callback);
      return () => mql.removeEventListener("change", callback);
    },
    [query]
  );

  const getSnapshot = useCallback(() => window.matchMedia(query).matches, [query]);
  const getServerSnapshot = () => false;

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
