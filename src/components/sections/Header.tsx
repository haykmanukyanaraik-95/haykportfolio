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
  // Активная nav-ссылка — всегда "home". Текущая страница и есть домашняя,
  // остальные пункты (My Work, About Me, Contact Me) в будущем станут отдельными
  // роутами и подсветка переедет на router. Scroll-spy убран по запросу пользователя.
  const activeId = "home";
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      if (currentY < lastScrollY.current || currentY < 50) {
        setVisible(true);
      } else {
        setVisible(false);
      }
      lastScrollY.current = currentY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // При закрытии меню сбрасываем lastScrollY на текущую позицию —
  // иначе после закрытия следующий малейший скролл сравнится с устаревшим
  // значением и может неожиданно скрыть/показать header.
  useEffect(() => {
    if (!mobileMenuOpen) {
      lastScrollY.current = window.scrollY;
    }
  }, [mobileMenuOpen]);

  // Логотип + имя для overlay BubbleMenu (живёт ВНУТРИ overlay, не в sticky-хедере)
  const mobileLogo = (
    <div className="flex items-center gap-2.5">
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
  );

  // Scroll-spy: наблюдаем за всеми секциями из navLinks, активную выставляем
  // ту, что попала в среднюю 20% вертикальной полосы viewport'а.
  // rootMargin -40%/-40% сужает зону пересечения → только одна секция в зоне
  // в каждый момент времени.
  return (
    <>
      {/* Мобильный навбар — sticky, show/hide on scroll.
          При открытом меню НЕ рендерится: лого и кнопка закрытия (X) живут
          ВНУТРИ BubbleMenu overlay, чтобы избежать z-index/transform/blur
          конфликтов между sticky-хедером и overlay'ем. */}
      {!mobileMenuOpen && (
        <header
          className={`md:hidden sticky top-0 z-[100] site-header-glass border-b border-border-subtle transition-transform duration-300 ${
            visible ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="px-6 h-14 flex items-center justify-between">
            {/* Логотип + имя на мобилке (помещается даже на 320px).
                По запросу пользователя логотип НЕ кликабельный — обычный div. */}
            {mobileLogo}

            {/* Morph-кнопка: CSS-бургер (3 линии). Клик открывает меню. */}
            <MorphMenuButton
              open={false}
              onClick={() => setMobileMenuOpen(true)}
              className="inline-flex items-center justify-center w-9 h-9"
              width={24}
              height={28}
            />
          </div>
        </header>
      )}

      {/* BubbleMenu overlay — controlled режим. Top-bar (лого + X) живёт
          ВНУТРИ overlay'а: больше никаких sticky-хедер-поверх-overlay через z-index. */}
      <div className="md:hidden">
        <BubbleMenu
          items={bubbleItems}
          logo={mobileLogo}
          menuBg="var(--surface-elevated-1)"
          menuContentColor="var(--text-primary)"
          overlayBg="color-mix(in srgb, var(--surface-page) 82%, transparent)"
          open={mobileMenuOpen}
          onNavigate={(href) => {
            setMobileMenuOpen(false);
            // При клике на Home — принудительно показываем Header
            // (даже если до этого он был спрятан auto-hide логикой).
            if (href === "#home") setVisible(true);
          }}
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
                  onClick={(e) => {
                    if (link.href === "#home") {
                      // При клике на Home принудительно показываем Header.
                      setVisible(true);
                    } else {
                      // Остальные пункты — заглушка до отдельных роутов.
                      e.preventDefault();
                    }
                  }}
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
