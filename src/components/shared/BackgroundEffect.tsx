// Фоновый эффект PixelBlast — фиксированный на всю страницу
"use client";

import dynamic from "next/dynamic";

// Динамический импорт — PixelBlast использует WebGL (window/document)
const PixelBlast = dynamic(() => import("@/components/shared/PixelBlast"), {
  ssr: false,
});

export default function BackgroundEffect() {
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
        className=""
        style={undefined}
      />
    </div>
  );
}
