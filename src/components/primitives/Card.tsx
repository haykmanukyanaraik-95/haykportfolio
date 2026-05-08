// Card — стеклянная карточка дизайн-системы.
// База: bg-white/[0.015] + backdrop-blur + border + rounded-lg.
//
// Опции:
//   spotlight  — оборачивает в SpotlightCard (красный radial-эффект при наведении)
//   borderGlow — прокидывается в SpotlightCard для свечения границы
//   hover      — добавляет hover:border-white/15 (light-up рамки при наведении)
//
// Padding/layout/scale/cursor-pointer и др. — передаются через className.

import { cn } from "@/lib/utils";
import SpotlightCard from "@/components/shared/SpotlightCard";

const baseGlass =
  "bg-white/[0.015] backdrop-blur-[20px] border border-white/10 rounded-lg";

interface CardProps {
  spotlight?: boolean;
  borderGlow?: boolean;
  hover?: boolean;
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

export default function Card({
  spotlight = false,
  borderGlow = false,
  hover = false,
  className,
  style,
  children,
}: CardProps) {
  const classes = cn(baseGlass, hover && "hover:border-white/15", className);

  if (spotlight) {
    return (
      <SpotlightCard
        spotlightColor="rgba(242, 63, 59, 0.15)"
        borderGlow={borderGlow}
        className={classes}
      >
        {children}
      </SpotlightCard>
    );
  }

  return (
    <div className={classes} style={style}>
      {children}
    </div>
  );
}
