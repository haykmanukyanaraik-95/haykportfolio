// Header — десктоп: sticky навбар / мобилка: sticky навбар + BubbleMenu overlay
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import BubbleMenu from "@/components/shared/BubbleMenu";
import Button from "@/components/primitives/Button";
import MorphMenuButton from "@/components/shared/MorphMenuButton";

// Ссылки навигации
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "My Work", href: "#work" },
  { label: "About Me", href: "#about" },
  { label: "Contact Me", href: "#contact" },
];

// BubbleMenu items
const bubbleItems = [
  { label: "Home", href: "#home", hoverStyles: { bgColor: "var(--brand)", textColor: "var(--text-on-brand)" } },
  { label: "My Work", href: "#work", hoverStyles: { bgColor: "var(--brand)", textColor: "var(--text-on-brand)" } },
  { label: "About Me", href: "#about", hoverStyles: { bgColor: "var(--brand)", textColor: "var(--text-on-brand)" } },
  { label: "Contact Me", href: "#contact", hoverStyles: { bgColor: "var(--brand)", textColor: "var(--text-on-brand)" } },
  // Тогглер темы как отдельная карточка — вместо стрелки иконка солнце/луна
  { label: "Switch Theme", href: "#", isThemeToggle: true, hoverStyles: { bgColor: "var(--brand)", textColor: "var(--text-on-brand)" } },
];

export default function Header() {
  const [visible, setVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // Активная секция (для подсветки nav-ссылки). Дефолт "home" — при загрузке
  // страница в самом верху → Home должен быть активным сразу.
  const [activeId, setActiveId] = useState<string>("home");
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current || currentY < 50) {
        setVisible(true);
      } else {
        setVisible(false);
        setMobileMenuOpen(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll-spy: наблюдаем за всеми секциями из navLinks, активную выставляем
  // ту, что попала в среднюю 20% вертикальной полосы viewport'а.
  // rootMargin -40%/-40% сужает зону пересечения → только одна секция в зоне
  // в каждый момент времени.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Мобильный навбар — sticky, show/hide on scroll.
          z-[100] выше чем у BubbleMenu overlay (z-98) — sticky-хедер всегда сверху,
          MorphMenuButton остаётся кликабельной даже при открытом меню. */}
      <header
        className={`md:hidden sticky top-0 z-[100] site-header-glass border-b border-border-subtle transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-6 h-14 flex items-center justify-between">
          {/* Логотип + имя на мобилке (помещается даже на 320px).
              По запросу пользователя логотип НЕ кликабельный — обычный div. */}
          <div className="flex-shrink-0 flex items-center gap-2.5">
            <Image
              src="/images/logo.svg"
              alt="Hayk Manukyan logo"
              width={26}
              height={24}
              priority
            />
            <span className="text-base font-medium leading-none">
              <span className="text-text-primary">Hayk</span>{" "}
              <span className="text-text-muted">Manukyan</span>
            </span>
          </div>

          {/* Morph-кнопка: Lottie-анимация бургер ⇄ X.
              Видна всегда. Клик переключает открытие меню; компонент сам
              запускает анимацию в нужную сторону по prop `open`. */}
          <MorphMenuButton
            open={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="inline-flex items-center justify-center w-9 h-9"
            size={28}
          />
        </div>
      </header>

      {/* BubbleMenu overlay — controlled режим, только overlay (sticky-хедер выше
          и перекрывает верхнюю часть overlay'а через z-index).
          Логотип и кнопка morph живут в sticky-хедере, в overlay не дублируются. */}
      <div className="md:hidden">
        <BubbleMenu
          items={bubbleItems}
          menuBg="var(--surface-elevated-1)"
          menuContentColor="var(--text-primary)"
          overlayBg="color-mix(in srgb, var(--surface-page) 82%, transparent)"
          open={mobileMenuOpen}
          onNavigate={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Десктоп header (≥ md = 768) — sticky */}
      <header
        className={`hidden md:block sticky top-0 z-50 site-header-glass border-b border-border-subtle transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* grid 3-col: логотип / навигация / кнопка.
            Колонки [auto 1fr auto] — логотип и CTA по натуральной ширине,
            средняя 1fr заполняет остаток. Нав центрируется в средней колонке через
            justify-self-center → равные отступы от логотипа и от CTA (визуальный баланс),
            независимо от того что лого шире чем CTA. */}
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 h-14 grid grid-cols-[auto_1fr_auto] items-center">
          {/* Логотип + имя.
              По запросу пользователя НЕ кликабельный — обычный div вместо <a>. */}
          <div className="flex-shrink-0 flex items-center gap-3 justify-self-start">
            <Image
              src="/images/logo.svg"
              alt="Hayk Manukyan logo"
              width={32}
              height={30}
              priority
            />
            <span className="text-lg font-medium whitespace-nowrap">
              <span className="text-text-primary">Hayk</span>{" "}
              <span className="text-text-muted">Manukyan</span>
            </span>
          </div>

          {/* Навигация — по центру средней колонки. На md (768-1023) gap уменьшен
              чтобы все 4 ссылки + лого + CTA вместились в 768px без переносов. */}
          <nav className="flex items-center gap-6 lg:gap-[58px] justify-self-center">
            {navLinks.map((link) => {
              // Активная ссылка (соответствует видимой секции) — обычный text-secondary;
              // неактивные — text-muted (более тусклые, но различимы).
              const isActive = activeId === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium hover:text-brand whitespace-nowrap transition-colors ${
                    isActive ? "text-text-secondary" : "text-text-muted"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          {/* CTA — прижата вправо в своей колонке */}
          <div className="justify-self-end">
            {/* py-2 override (вместо дефолтного py-3) — высота кнопки 34px,
                чуть больше логотипа (30px), но не "обрубленная". */}
            <Button variant="primary" href="#contact" icon="bubble-discussion" className="py-2">
              Let&apos;s talk
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
