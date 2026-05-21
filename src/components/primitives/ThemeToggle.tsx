// Плавающий переключатель темы (тёмная / светлая)
// — фиксированный нижний правый угол, виден на всех секциях
// — крупный квадратный "пилл" с иконкой
// — читает текущую тему из data-theme на <html> через useSyncExternalStore
// — toggle меняет data-theme + сохраняет в localStorage
// — иконка показывает ТЕКУЩУЮ тему (луна в тёмной, солнце в светлой)
"use client";

import { useTheme, useMounted } from "@/lib/useTheme";

export default function ThemeToggle() {
  const theme = useTheme();
  const mounted = useMounted();

  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // приватный режим / отключённое хранилище — игнорируем
    }
    // useTheme подхватит изменение через MutationObserver автоматически
  };

  // До hydration скрываем — чтобы не было flash с дефолтной иконкой
  if (!mounted) return null;

  return (
    <button
      onClick={toggle}
      aria-label={
        theme === "dark" ? "Switch to light theme" : "Switch to dark theme"
      }
      className="theme-toggle-btn hidden md:inline-flex fixed z-50 bottom-8 right-8
                 w-12 h-12 items-center justify-center rounded-lg
                 bg-surface-elevated-1 border border-border-subtle
                 text-text-muted opacity-60 hover:text-brand hover:opacity-100 transition-all
                 shadow-[0_4px_12px_rgba(0,0,0,0.10)]"
    >
      {/* Flaticon-глифы: dark→moon, light→sun (показывает текущее состояние).
          translate-y-[1px] — компенсация оптического центра шрифт-иконки
          (у глифов больше пустого пространства под baseline, без сдвига выглядит вверху). */}
      <i
        className={`fi ${theme === "dark" ? "fi-rr-moon" : "fi-rr-sun"} text-xl leading-none block translate-y-[1px]`}
        aria-hidden="true"
      />
    </button>
  );
}
