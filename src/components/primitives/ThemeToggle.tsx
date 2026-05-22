// Плавающий переключатель темы (тёмная / светлая)
// — фиксированный нижний правый угол, виден на всех секциях
// — крупный квадратный "пилл" с иконкой
// — читает текущую тему из data-theme на <html> через useSyncExternalStore
// — toggle меняет data-theme + сохраняет в localStorage
// — иконка показывает ЦЕЛЕВУЮ тему (на что переключим): в тёмной — солнце (light),
//   в светлой — луна (dark). Эту же логику использует BubbleMenu на мобилке.
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
      className="theme-toggle-btn hidden md:inline-flex fixed z-50 bottom-8
                 right-[max(48px,calc((100vw-1184px)/2))] lg:right-8
                 w-12 h-12 items-center justify-center rounded-lg
                 bg-surface-elevated-1 border border-border-subtle
                 text-text-muted hover:text-brand transition-all
                 shadow-[0_4px_12px_rgba(0,0,0,0.10)]"
    >
      {/* Flaticon-глифы: dark→sun (переключим в light), light→moon (переключим в dark).
          translate-y-[1px] — компенсация оптического центра шрифт-иконки
          (у глифов больше пустого пространства под baseline, без сдвига выглядит вверху). */}
      <i
        className={`fi ${theme === "dark" ? "fi-rr-sun" : "fi-rr-moon"} text-xl leading-none block translate-y-[1px]`}
        aria-hidden="true"
      />
    </button>
  );
}
