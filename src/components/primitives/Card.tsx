// Card — стеклянная карточка дизайн-системы.
// База: bg-surface-glass + backdrop-blur + border-border-subtle + rounded-lg.
//
// Опции:
//   spotlight  — оборачивает в SpotlightCard (brand-tint radial-эффект при наведении)
//   borderGlow — прокидывается в SpotlightCard для свечения границы
//   hover      — добавляет hover:border-border-strong (light-up рамки при наведении)
//
// Padding/layout/scale/cursor-pointer и др. — передаются через className.

import { cn } from "@/lib/utils";
import SpotlightCard from "@/components/shared/SpotlightCard";

const baseGlass =
  "bg-surface-glass backdrop-blur-[20px] border border-border-subtle rounded-lg";

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
  const classes = cn(baseGlass, hover && "hover:border-border-strong", className);

  if (spotlight) {
    return (
      <SpotlightCard
        spotlightColor="var(--brand-tint)"
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
