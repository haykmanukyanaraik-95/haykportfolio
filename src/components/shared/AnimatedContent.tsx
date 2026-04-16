// Анимация появления контента — ReactBits (GSAP + ScrollTrigger)
"use client";

import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface AnimatedContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  container?: Element | string | null;
  distance?: number;
  direction?: 'vertical' | 'horizontal';
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  onComplete?: () => void;
  /**
   * Reveal-эффект через оверлей: карточка рендерится сразу на финальном месте,
   * поверх неё лежит плашка цвета фона, которая плавно исчезает.
   * Используется для элементов с `backdrop-filter` — чтобы blur работал
   * с первого кадра (opacity-анимация родителя ломает backdrop-filter в браузерах).
   */
  revealOverlay?: boolean;
  /** Цвет reveal-оверлея — должен совпадать с цветом фона страницы */
  revealColor?: string;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  container,
  distance = 100,
  direction = 'vertical',
  reverse = false,
  duration = 0.8,
  ease = 'power3.out',
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete,
  revealOverlay = false,
  revealColor = '#0a0a0a',
  className = '',
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // При revealOverlay — обёртка НЕ анимирует opacity (её делает оверлей).
  // Иначе backdrop-filter у детей ломается.
  const shouldAnimateOpacity = revealOverlay ? false : animateOpacity;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === 'horizontal' ? 'x' : 'y';
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    gsap.set(el, {
      [axis]: offset,
      scale,
      opacity: shouldAnimateOpacity ? initialOpacity : 1,
      visibility: 'visible'
    });

    // Если используется оверлей — начинаем с полной непрозрачности
    const overlay = overlayRef.current;
    if (overlay) {
      gsap.set(overlay, { opacity: 1, display: 'block' });
    }

    const tl = gsap.timeline({
      paused: true,
      delay,
      onComplete: () => {
        // Чистим inline-стили (transform/opacity/scale/willChange) после окончания
        // анимации — убирает остаточный композитный слой, backdrop-filter у детей
        // начинает работать корректно.
        // ВАЖНО: visibility НЕ чистим — иначе Tailwind-класс .invisible
        // (на обёртке ref-div) снова скроет элемент.
        gsap.set(el, { clearProps: "transform,opacity,scale,willChange" });
        // Оверлей полностью скрываем (display: none) чтобы не блокировал клики/hover
        if (overlay) {
          gsap.set(overlay, { display: 'none' });
        }
        onComplete?.();
      }
    });

    // Слайд + (опционально) opacity для самого элемента
    tl.to(el, {
      [axis]: 0,
      scale: 1,
      opacity: 1,
      duration,
      ease
    }, 0);

    // Параллельно — плавный fade-out оверлея (если включён)
    if (overlay) {
      tl.to(overlay, {
        opacity: 0,
        duration,
        ease
      }, 0);
    }

    const st = ScrollTrigger.create({
      trigger: el,
      start: `top ${startPct}%`,
      once: true,
      onEnter: () => tl.play()
    });

    return () => {
      st.kill();
      tl.kill();
    };
  }, [container, distance, direction, reverse, duration, ease, initialOpacity, shouldAnimateOpacity, scale, threshold, delay, onComplete]);

  return (
    <div
      ref={ref}
      className={`invisible ${className}`}
      {...props}
      style={{ position: 'relative', ...props.style }}
    >
      {children}
      {revealOverlay && (
        <div
          ref={overlayRef}
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: revealColor,
            pointerEvents: 'none',
            zIndex: 10,
            borderRadius: 'inherit',
          }}
        />
      )}
    </div>
  );
};

export default AnimatedContent;
