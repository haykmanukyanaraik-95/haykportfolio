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
  { label: "Let's talk", href: "#contact", hoverStyles: { bgColor: "var(--brand)", textColor: "var(--text-on-brand)" } },
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
        className={`md:hidden sticky top-0 z-50 bg-surface-page/80 backdrop-blur-xl border-b border-border-subtle transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="px-6 h-14 flex items-center justify-between">
          {/* Логотип — без контейнера/карточки */}
          <a href="#home" className="flex-shrink-0">
            <Image
              src="/images/logo.svg"
              alt="Hayk Manukyan logo"
              width={28}
              height={26}
              priority
            />
          </a>

          {/* Кнопка меню — hamburger / X */}
          <button
            className="flex flex-col justify-center items-center w-9 h-9 gap-1.5"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-text-primary transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-text-primary transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-text-primary transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* BubbleMenu overlay — controlled режим, только overlay (нав-бар уже выше у Header) */}
      <div className="md:hidden">
        <BubbleMenu
          items={bubbleItems}
          menuBg="var(--surface-elevated-1)"
          menuContentColor="var(--text-primary)"
          overlayBg="color-mix(in srgb, var(--surface-page) 97%, transparent)"
          open={mobileMenuOpen}
          onNavigate={() => setMobileMenuOpen(false)}
        />
      </div>

      {/* Десктоп header — sticky */}
      <header
        className={`hidden md:block sticky top-0 z-50 bg-surface-page/80 backdrop-blur-xl border-b border-border-subtle transition-transform duration-300 ${
          visible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="mx-auto max-w-[1280px] px-6 h-16 flex items-center justify-between">
          {/* Логотип + имя */}
          <a href="#home" className="flex-shrink-0 flex items-center gap-3">
            <Image
              src="/images/logo.svg"
              alt="Hayk Manukyan logo"
              width={32}
              height={30}
              priority
            />
            <span className="text-lg font-medium">
              <span className="text-text-primary">Hayk</span>{" "}
              <span className="text-text-muted">Manukyan</span>
            </span>
          </a>

          {/* Навигация */}
          <nav className="flex items-center gap-11">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <Button variant="primary" href="#contact" icon="comment">
            Let&apos;s talk
          </Button>
        </div>
      </header>
    </>
  );
}
