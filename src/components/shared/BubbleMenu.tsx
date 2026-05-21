// BubbleMenu — мобильное меню с bubble-pill анимацией (GSAP)
"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { useTheme } from "@/lib/useTheme";
import "./BubbleMenu.css";

interface MenuItem {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: { bgColor: string; textColor: string };
  /** Если true — карточка работает как тогглер темы (вместо стрелки — иконка солнца/луны) */
  isThemeToggle?: boolean;
}

interface BubbleMenuProps {
  logo?: ReactNode;
  items: MenuItem[];
  onNavigate?: () => void;
  menuBg?: string;
  menuContentColor?: string;
  overlayBg?: string;
  /** Controlled mode: если передан — BubbleMenu не рендерит свой навбар, а только overlay управляется снаружи */
  open?: boolean;
}

export default function BubbleMenu({
  logo,
  items,
  onNavigate,
  menuBg = "#181818",
  menuContentColor = "#ffffff",
  overlayBg = "rgba(10, 10, 10, 0.97)",
  open: controlledOpen,
}: BubbleMenuProps) {
  const isControlled = controlledOpen !== undefined;
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = isControlled ? controlledOpen : internalOpen;
  const [showOverlay, setShowOverlay] = useState(isControlled ? controlledOpen : false);
  const theme = useTheme();

  const overlayRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleToggle = () => {
    const next = !isOpen;
    if (next) setShowOverlay(true);
    if (!isControlled) setInternalOpen(next);
  };

  const handleLinkClick = () => {
    if (!isControlled) setInternalOpen(false);
    onNavigate?.();
  };

  // Тогглер темы — не закрывает меню (пользователь может переключаться и видеть превью)
  const handleThemeToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    const current = document.documentElement.getAttribute("data-theme") || "light";
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // приватный режим — игнорируем
    }
  };

  // В controlled-режиме показ overlay синхронизируется с пропом open.
  // setState в useEffect здесь намеренный: реагируем на смену controlled-props
  // (это легитимный pattern для controlled/uncontrolled API). Рефакторинг в derived state
  // сломал бы анимацию плавного закрытия (showOverlay держится во время fade-out).
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (isControlled && controlledOpen) setShowOverlay(true);
  }, [isControlled, controlledOpen]);

  useEffect(() => {
    const overlay = overlayRef.current;
    const bg = bgRef.current;
    const bubbles = bubblesRef.current.filter(Boolean) as HTMLAnchorElement[];
    const labels = labelsRef.current.filter(Boolean) as HTMLSpanElement[];

    if (!overlay || !bg || !bubbles.length) return;

    if (isOpen) {
      // Блокируем скролл
      document.body.style.overflow = "hidden";
      gsap.set(overlay, { display: "flex" });
      gsap.killTweensOf([bg, ...bubbles, ...labels]);
      gsap.set(bg, { opacity: 0 });
      gsap.set(bubbles, { scale: 0, transformOrigin: "50% 50%" });
      gsap.set(labels, { y: 24, autoAlpha: 0 });

      // Фон появляется
      gsap.to(bg, { opacity: 1, duration: 0.3, ease: "power2.out" });

      // Пилы появляются
      bubbles.forEach((bubble, i) => {
        const delay = i * 0.1;
        const tl = gsap.timeline({ delay });
        tl.to(bubble, { scale: 1, duration: 0.5, ease: "back.out(1.5)" });
        if (labels[i]) {
          tl.to(labels[i], { y: 0, autoAlpha: 1, duration: 0.4, ease: "power3.out" }, "-=0.4");
        }
      });
    } else if (showOverlay) {
      gsap.killTweensOf([bg, ...bubbles, ...labels]);
      gsap.to(labels, { y: 24, autoAlpha: 0, duration: 0.2, ease: "power3.in" });
      gsap.to(bubbles, { scale: 0, duration: 0.2, ease: "power3.in" });
      gsap.to(bg, {
        opacity: 0,
        duration: 0.25,
        delay: 0.1,
        ease: "power2.in",
        onComplete: () => {
          gsap.set(overlay, { display: "none" });
          setShowOverlay(false);
          document.body.style.overflow = "";
        },
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen, showOverlay]);

  return (
    <>
      {/* Навбар с логотипом и кнопкой — рендерится только если НЕ controlled
          (в controlled-режиме навбар управляется снаружи, например Header'ом) */}
      {!isControlled && (
        <nav className="bubble-menu fixed" aria-label="Main navigation">
          <div className="bubble logo-bubble" style={{ background: menuBg }}>
            <span className="logo-content">{logo}</span>
          </div>

          <button
            type="button"
            className={`bubble toggle-bubble menu-btn ${isOpen ? "open" : ""}`}
            onClick={handleToggle}
            aria-label="Toggle menu"
            aria-pressed={isOpen}
            style={{ background: menuBg }}
          >
            <span className="menu-line" style={{ background: menuContentColor }} />
            <span className="menu-line" style={{ background: menuContentColor }} />
          </button>
        </nav>
      )}

      {/* Overlay с пилами */}
      {showOverlay && (
        <div ref={overlayRef} className="bubble-menu-overlay" style={{ display: "none" }}>
          {/* Фон — перекрывает всю страницу */}
          <div
            ref={bgRef}
            className="absolute inset-0"
            style={{ background: overlayBg, backdropFilter: "blur(8px)" }}
          />

          {/* Верхняя панель меню: логотип слева (px-6), крестик справа (px-6) — точно
              в позиции где находится бургер в sticky-навбаре. Без анимации
              переключения, чтобы не было визуальных артефактов. */}
          <div className="bubble-menu-overlay__topbar relative z-20 h-14 px-6 flex items-center justify-between pointer-events-auto">
            {logo && (
              <a href="#home" onClick={handleLinkClick} className="flex-shrink-0">
                {logo}
              </a>
            )}
            <button
              type="button"
              onClick={handleLinkClick}
              aria-label="Close menu"
              className="w-9 h-9 inline-flex items-center justify-center text-text-primary"
            >
              <i className="fi fi-rr-cross-small text-2xl leading-none translate-y-[1px]" aria-hidden="true" />
            </button>
          </div>
          <ul className="pill-list relative z-10" role="menu">
            {items.map((item, idx) => {
              // Для тогглера темы — иконка солнца/луны (текущая тема), клик переключает
              // Для остальных — стрелка вправо (навигация)
              // Theme toggle: показываем CELEVUЮ тему (на что переключим)
              // — в тёмной теме иконка brightness (солнце) + "Switch to light"
              // — в светлой теме иконка moon + "Switch to dark"
              const iconClass = item.isThemeToggle
                ? `fi ${theme === "dark" ? "fi-rr-brightness" : "fi-rr-moon"}`
                : "fi fi-rr-angle-small-right";
              const labelText = item.isThemeToggle
                ? theme === "dark" ? "Switch to light" : "Switch to dark"
                : item.label;
              const onClick = item.isThemeToggle ? handleThemeToggle : handleLinkClick;

              return (
                <li key={idx} role="none" className="pill-col">
                  <a
                    role="menuitem"
                    href={item.href}
                    aria-label={item.ariaLabel || item.label}
                    className="pill-link"
                    style={{
                      "--pill-bg": menuBg,
                      "--pill-color": menuContentColor,
                      "--hover-bg": item.hoverStyles?.bgColor || "var(--color-brand)",
                      "--hover-color": item.hoverStyles?.textColor || "#ffffff",
                    } as React.CSSProperties}
                    ref={(el) => { bubblesRef.current[idx] = el; }}
                    onClick={onClick}
                  >
                    <span
                      className="pill-label"
                      ref={(el) => { labelsRef.current[idx] = el; }}
                    >
                      {labelText}
                    </span>
                    <i className={`pill-icon ${iconClass}`} aria-hidden="true" />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </>
  );
}
