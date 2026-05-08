// Фоновый эффект PixelBlast — фиксированный на всю страницу
// Пауза WebGL когда Testimonials/Footer в зоне видимости (там сплошной #0a0a0a поверх)
"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const PixelBlast = dynamic(() => import("@/components/shared/PixelBlast"), {
  ssr: false,
});

export default function BackgroundEffect() {
  const [paused, setPaused] = useState(false);

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
        color="#1c1315"
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
