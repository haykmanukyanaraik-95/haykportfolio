// Авто-горизонтальный скролл с возможностью РУЧНОГО СВАЙПА.
//
// Логика:
// — requestAnimationFrame инкрементирует scrollLeft контейнера каждый кадр →
//   плавная авто-анимация
// — Когда пользователь касается (pointerdown / touchmove / wheel) → пауза на 5 секунд
// — Через 5 секунд тишины анимация продолжается С ТЕКУЩЕЙ позиции (где user остановился)
// — Контент должен быть продублирован 2× — при scrollLeft >= scrollWidth/2 откатываем
//   обратно, чтобы получился бесшовный loop
//
// КЛЮЧЕВОЕ ОТЛИЧИЕ от CSS-анимации: контейнер имеет overflow-x: auto, поэтому
// пользователь может физически свайпать карточки пальцем (натуральный browser scroll).

"use client";

import { useEffect, RefObject } from "react";

interface Options {
  pixelsPerSecond: number;
  pauseDurationMs?: number;
}

export function useCarouselAutoScroll(
  ref: RefObject<HTMLElement | null>,
  { pixelsPerSecond, pauseDurationMs = 5000 }: Options
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let lastTime = performance.now();
    let pausedUntil = 0;

    const pause = () => {
      pausedUntil = performance.now() + pauseDurationMs;
    };

    const tick = (now: number) => {
      const dt = now - lastTime;
      lastTime = now;

      const halfWidth = el.scrollWidth / 2;

      // Анимируем только если не на паузе И layout уже посчитал scrollWidth
      if (now >= pausedUntil && halfWidth > 0) {
        // Нормализация при возобновлении: user мог свайпнуть за halfWidth во время паузы
        if (el.scrollLeft >= halfWidth) el.scrollLeft -= halfWidth;
        else if (el.scrollLeft < 0) el.scrollLeft += halfWidth;

        el.scrollLeft += (pixelsPerSecond * dt) / 1000;

        if (el.scrollLeft >= halfWidth) el.scrollLeft -= halfWidth;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);

    // События, которые ставят анимацию на 5-секундную паузу:
    // — pointerdown: касание пальцем / клик мыши
    // — touchmove: продолжение свайпа (продлевает паузу пока пользователь свайпает)
    // — wheel: прокрутка колесом мыши
    el.addEventListener("pointerdown", pause);
    el.addEventListener("touchmove", pause, { passive: true });
    el.addEventListener("wheel", pause, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointerdown", pause);
      el.removeEventListener("touchmove", pause);
      el.removeEventListener("wheel", pause);
    };
  }, [ref, pixelsPerSecond, pauseDurationMs]);
}
