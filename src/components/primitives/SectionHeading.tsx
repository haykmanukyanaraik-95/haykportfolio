// SectionHeading — единый стиль для h2-заголовков секций.
// Размер 30px на всех экранах + bold + белый + стандартный отступ снизу.
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
        className={cn("text-3xl font-bold text-white mb-10 lg:mb-12", className)}
      >
        {children}
      </h2>
    );
  }
);

export default SectionHeading;
