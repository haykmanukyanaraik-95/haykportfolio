// BubbleMenu — мобильное меню с bubble-pill анимацией (GSAP)
"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import "./BubbleMenu.css";

interface MenuItem {
  label: string;
  href: string;
  ariaLabel?: string;
  rotation?: number;
  hoverStyles?: { bgColor: string; textColor: string };
}

interface BubbleMenuProps {
  logo: ReactNode;
  items: MenuItem[];
  onNavigate?: () => void;
  menuBg?: string;
  menuContentColor?: string;
  overlayBg?: string;
}

export default function BubbleMenu({
  logo,
  items,
  onNavigate,
  menuBg = "#181818",
  menuContentColor = "#ffffff",
  overlayBg = "rgba(10, 10, 10, 0.97)",
}: BubbleMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);

  const overlayRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const bubblesRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const labelsRef = useRef<(HTMLSpanElement | null)[]>([]);

  const handleToggle = () => {
    const next = !isOpen;
    if (next) setShowOverlay(true);
    setIsOpen(next);
  };

  const handleLinkClick = () => {
    setIsOpen(false);
    onNavigate?.();
  };

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
      {/* Навбар с логотипом и кнопкой */}
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

      {/* Overlay с пилами */}
      {showOverlay && (
        <div ref={overlayRef} className="bubble-menu-overlay" style={{ display: "none" }}>
          {/* Фон — перекрывает всю страницу */}
          <div
            ref={bgRef}
            className="absolute inset-0"
            style={{ background: overlayBg, backdropFilter: "blur(20px)" }}
          />
          <ul className="pill-list relative z-10" role="menu">
            {items.map((item, idx) => (
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
                  onClick={handleLinkClick}
                >
                  <span
                    className="pill-label"
                    ref={(el) => { labelsRef.current[idx] = el; }}
                  >
                    {item.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
