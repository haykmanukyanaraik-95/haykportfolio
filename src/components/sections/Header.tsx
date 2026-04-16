// Header — десктоп: sticky навбар / мобилка: sticky навбар + BubbleMenu overlay
"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import ShinyText from "@/components/shared/ShinyText";
import GlareHover from "@/components/shared/GlareHover";
import BubbleMenu from "@/components/shared/BubbleMenu";

// Ссылки навигации
const navLinks = [
  { label: "Home", href: "#home" },
  { label: "My Work", href: "#work" },
  { label: "About Me", href: "#about" },
  { label: "Contact Me", href: "#contact" },
];

// BubbleMenu items
const bubbleItems = [
  { label: "Home", href: "#home", hoverStyles: { bgColor: "#F23F3B", textColor: "#ffffff" } },
  { label: "My Work", href: "#work", hoverStyles: { bgColor: "#F23F3B", textColor: "#ffffff" } },
  { label: "About Me", href: "#about", hoverStyles: { bgColor: "#F23F3B", textColor: "#ffffff" } },
  { label: "Contact Me", href: "#contact", hoverStyles: { bgColor: "#F23F3B", textColor: "#ffffff" } },
  { label: "Let's talk", href: "#contact", hoverStyles: { bgColor: "#F23F3B", textColor: "#ffffff" } },
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
        className={`md:hidden sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 transition-transform duration-300 ${
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
              className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-[4px]" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-opacity duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-white transition-transform duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-[4px]" : ""
              }`}
            />
          </button>
        </div>
      </header>

      {/* BubbleMenu overlay — только содержимое меню */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          <BubbleMenu
            logo={
              <Image
                src="/images/logo.svg"
                alt="Hayk Manukyan logo"
                width={24}
                height={22}
                priority
              />
            }
            items={bubbleItems}
            menuBg="#181818"
            menuContentColor="#ffffff"
            overlayBg="rgba(10, 10, 10, 0.97)"
            onNavigate={() => setMobileMenuOpen(false)}
          />
        </div>
      )}

      {/* Десктоп header — sticky */}
      <header
        className={`hidden md:block sticky top-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 transition-transform duration-300 ${
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
              <span className="text-white">Hayk</span>{" "}
              <span className="text-text-muted">Manukyan</span>
            </span>
          </a>

          {/* Навигация */}
          <nav className="flex items-center gap-11">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-[#b3b3b3] hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA */}
          <GlareHover
            width="auto"
            height="auto"
            background="#F23F3B"
            borderRadius="8px"
            borderColor="transparent"
            glareColor="#ffa8a8"
            glareOpacity={0.3}
            glareAngle={-30}
            glareSize={275}
            transitionDuration={800}
          >
            <a
              href="#contact"
              className="group/btn inline-flex items-center text-white text-base font-medium px-5 py-3"
            >
              <i className="fi fi-rr-comment text-sm leading-[1] flex items-center overflow-hidden opacity-0 max-w-0 mr-0 group-hover/btn:opacity-100 group-hover/btn:max-w-[18px] group-hover/btn:mr-2 transition-all duration-300 ease-out" aria-hidden="true" />
              <ShinyText text="Let's talk" speed={3.5} delay={3} color="#ffffff" shineColor="#ffffff80" className="leading-[1]" pauseOnHover />
            </a>
          </GlareHover>
        </div>
      </header>
    </>
  );
}
