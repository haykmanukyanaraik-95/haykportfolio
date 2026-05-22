// SectionHeading — единый стиль для h2-заголовков секций.
// Размер: 20px на мобилке (< sm), 24px на sm+. На один размер меньше Hero h1
// (24/30/48) — иерархия визуально сохраняется.
// Margin-bottom: 20px (mobile) → 40px (sm+). На lg+ остаётся 40px (cap по запросу).
// Если нужны другие классы (например ref для анимации) — передаются через className.

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

interface SectionHeadingProps {
  children: React.ReactNode;
  className?: string;
}

const SectionHeading = forwardRef<HTMLHeadingElement, SectionHeadingProps>(
  function SectionHeading({ children, className }, ref) {
    return (
      <h2
        ref={ref}
        className={cn("text-xl sm:text-2xl font-bold text-text-primary mb-5 sm:mb-10", className)}
      >
        {children}
      </h2>
    );
  }
);

export default SectionHeading;
