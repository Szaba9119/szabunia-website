"use client";

import { useSyncExternalStore } from "react";

let scrollY = 0;
const listeners: Set<() => void> = new Set();
let subscribed = false;

function handleScroll() {
  scrollY = window.scrollY;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!subscribed) {
    window.addEventListener("scroll", handleScroll, { passive: true });
    subscribed = true;
    scrollY = window.scrollY;
  }
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener("scroll", handleScroll);
      subscribed = false;
    }
  };
}

function getSnapshot() {
  return scrollY;
}

function getServerSnapshot() {
  return 0;
}

export function useScrollPosition() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
