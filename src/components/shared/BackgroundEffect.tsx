// Фоновый эффект PixelBlast — фиксированный на ВСЮ страницу (без паузы).
// Ripples (интерактив мышью) отключены → меньше нагрузка на GPU, нет глича
// на тестимониалс/футере.
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PixelBlast = dynamic(() => import("@/components/shared/PixelBlast"), {
  ssr: false,
});

const DEFAULT_PATTERN_COLOR = "#1c1315";

export default function BackgroundEffect() {
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

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{
        // Радиальная маска: центр прозрачный → к краям проявляется паттерн.
        // По запросу пользователя — пиксели "по бокам", не в центре.
        maskImage:
          "radial-gradient(ellipse 60% 50% at center, transparent 0%, transparent 25%, black 75%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 60% 50% at center, transparent 0%, transparent 25%, black 75%)",
      }}
    >
      <PixelBlast
        variant="square"
        pixelSize={8}
        color={patternColor}
        patternScale={4.5}
        patternDensity={1}
        enableRipples={false}
        speed={1}
        transparent
        edgeFade={0.2}
        className=""
        style={undefined}
      />
    </div>
  );
}
