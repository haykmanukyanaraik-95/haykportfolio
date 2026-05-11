// Фоновый эффект PixelBlast — фиксированный на всю страницу
// Пауза WebGL когда Testimonials/Footer в зоне видимости (там сплошной surface-page поверх)
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PixelBlast = dynamic(() => import("@/components/shared/PixelBlast"), {
  ssr: false,
});

const DEFAULT_PATTERN_COLOR = "#1c1315";

export default function BackgroundEffect() {
  const [paused, setPaused] = useState(false);
  // Three.js не понимает CSS переменные — резолвим var(--bg-pattern) в hex после монтирования
  const [patternColor, setPatternColor] = useState(DEFAULT_PATTERN_COLOR);

  // Читаем --bg-pattern из CSS-переменных и подписываемся на смену темы.
  // При переключении data-theme на <html> — перечитываем цвет (CSS меняет
  // переменную, но Three.js про CSS-переменные не знает — нужно вручную).
  useEffect(() => {
    const readPattern = () => {
      const value = getComputedStyle(document.documentElement)
        .getPropertyValue("--bg-pattern")
        .trim();
      if (value) setPatternColor(value);
    };

    readPattern();

    const observer = new MutationObserver(readPattern);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Ищем секции, которые полностью перекрывают PixelBlast сплошным цветом
    const targets = ["#testimonials", "footer"]
      .map((sel) => document.querySelector(sel))
      .filter((el): el is Element => Boolean(el));

    if (targets.length === 0) return;

    const visibleSet = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visibleSet.add(entry.target);
          else visibleSet.delete(entry.target);
        });
        setPaused(visibleSet.size > 0);
      },
      { threshold: 0.05 }
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none h-full">
      <PixelBlast
        variant="square"
        pixelSize={8}
        color={patternColor}
        patternScale={4.5}
        patternDensity={1}
        enableRipples
        rippleSpeed={0.3}
        rippleThickness={0.23}
        rippleIntensityScale={1}
        speed={1}
        transparent
        edgeFade={0.2}
        paused={paused}
        className=""
        style={undefined}
      />
    </div>
  );
}
