// Плавающий переключатель темы (тёмная / светлая)
// — фиксированный нижний правый угол, виден на всех секциях
// — крупный круглый "пилл" с иконкой (солнце / луна)
// — читает текущую тему из data-theme на <html> (выставлено init-скриптом в layout.tsx)
// — сохраняет выбор в localStorage
// — иконка показывает целевую тему: солнце = переключить на светлую, луна = на тёмную
"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  // На монтировании читаем актуальную тему (её уже выставил init-скрипт до hydration)
  useEffect(() => {
    const current =
      (document.documentElement.getAttribute("data-theme") as Theme) || "dark";
    setTheme(current);
    setMounted(true);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // приватный режим / отключённое хранилище — игнорируем
    }
    setTheme(next);
  };

  // До монтирования скрываем — чтобы не было flash с дефолтной иконкой
  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className="fixed z-50 bottom-6 right-6 sm:bottom-8 sm:right-8
                 w-12 h-12 flex items-center justify-center rounded-full
                 bg-surface-elevated-1 border border-border-subtle
                 text-text-primary
                 shadow-[0_8px_24px_rgba(0,0,0,0.35)]
                 hover:scale-110 active:scale-95
                 transition-transform duration-200"
    >
      <i
        className={`fi ${theme === "dark" ? "fi-rr-sun" : "fi-rr-moon"} text-xl leading-none`}
      />
    </button>
  );
}
