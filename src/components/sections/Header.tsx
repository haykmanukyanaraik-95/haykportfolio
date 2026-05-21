// Header — десктоп: sticky навбар / мобилка: sticky навбар + BubbleMenu overlay
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import BubbleMenu from "@/components/shared/BubbleMenu";
import Button from "@/components/primitives/Button";

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

  return (
    <>
      {/* Мобильный навбар — sticky, show/hide on scroll */}
      <header
        className={`md:hidden sticky top-0 z-50 site-header-glass backdrop-blur-md border-b border-border-subtle transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-6 h-14 flex items-center justify-between">
          {/* Логотип + имя на мобилке (помещается даже на 320px) */}
          <a href="#home" className="flex-shrink-0 flex items-center gap-2.5">
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
          </a>

          {/* Кнопка меню — hamburger (статичная, без анимации в X).
              Скрыта когда меню открыто → крестик в overlay появляется в той же позиции. */}
          {!mobileMenuOpen && (
            <button
              className="flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
              <span className="block w-5 h-0.5 bg-text-primary" />
              <span className="block w-5 h-0.5 bg-text-primary" />
              <span className="block w-5 h-0.5 bg-text-primary" />
            </button>
          )}
        </div>
      </header>

      {/* BubbleMenu overlay — controlled режим, только overlay (нав-бар уже выше у Header).
          logo передаём чтобы он отрисовался в верхней панели открытого меню (слева, рядом с крестиком). */}
      <div className="md:hidden">
        <BubbleMenu
          logo={
            <span className="flex items-center gap-2.5">
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
            </span>
          }
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
        className={`hidden md:block sticky top-0 z-50 site-header-glass backdrop-blur-md border-b border-border-subtle transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* grid 3-col: логотип / навигация / кнопка.
            Колонки [auto 1fr auto] — логотип и CTA по натуральной ширине,
            средняя 1fr заполняет остаток. Нав центрируется в средней колонке через
            justify-self-center → равные отступы от логотипа и от CTA (визуальный баланс),
            независимо от того что лого шире чем CTA. */}
        <div className="mx-auto max-w-[1280px] px-6 md:px-12 h-16 grid grid-cols-[auto_1fr_auto] items-center">
          {/* Логотип + имя */}
          <a href="#home" className="flex-shrink-0 flex items-center gap-3 justify-self-start">
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
          </a>

          {/* Навигация — по центру средней колонки. На md (768-1023) gap уменьшен
              чтобы все 4 ссылки + лого + CTA вместились в 768px без переносов. */}
          <nav className="flex items-center gap-6 lg:gap-11 justify-self-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-brand whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA — прижата вправо в своей колонке */}
          <div className="justify-self-end">
            <Button variant="primary" href="#contact" icon="comment">
              Let&apos;s talk
            </Button>
          </div>
        </div>
      </header>
    </>
  );
}
