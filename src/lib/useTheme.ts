// useTheme — подписка на data-theme атрибут на <html>.
// Использует useSyncExternalStore — официальный React-паттерн для внешних источников
// (DOM, localStorage и т.п.). Не вызывает setState в эффекте → не триггерит lint
// react-hooks/set-state-in-effect.
//
// Источник истины: <html data-theme="dark|light">. Меняется через ThemeToggle.
// Возвращает текущую тему. SSR-safe (на сервере возвращает 'light' — дефолт).
"use client";

import { useSyncExternalStore } from "react";

export type Theme = "dark" | "light";

function subscribe(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => observer.disconnect();
}

function getSnapshot(): Theme {
  if (typeof window === "undefined") return "light";
  return (document.documentElement.getAttribute("data-theme") as Theme) || "light";
}

function getServerSnapshot(): Theme {
  return "light";
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

// useMounted — true ТОЛЬКО после client hydration. SSR возвращает false.
// Используется чтобы избежать hydration mismatch для эффектов, доступных только в браузере.
export function useMounted(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );
}
