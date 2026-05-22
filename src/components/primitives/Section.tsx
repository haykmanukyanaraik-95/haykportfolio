// Section — обёртка для секции страницы.
// Объединяет: <section> тег + единые отступы (variant) + контейнер (max-w-1280, px-6).
//
// variant — паттерн вертикальных отступов из дизайн-системы:
//   "hero"     — Hero (асимметричный: больше сверху)
//   "standard" — основные секции (Projects/Expertise/About/Contact/Testimonials)
//   "compact"  — короткие секции (SkillCarousel)
//   "footer"   — Footer
//
// bare — отключает встроенный контейнер. Используется когда секции нужна особая разметка
// (Testimonials с absolute-фоном, SkillCarousel с full-width LogoLoop).
//
// forwardRef — для случаев когда нужно подписаться на secition элемент
// (IntersectionObserver в Expertise для паузы Lottie-сиквенции).

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

type Variant = "hero" | "standard" | "compact" | "footer";

const paddingMap: Record<Variant, string> = {
  // Hero — асимметричный padding активируется только на xl+ (1280+),
  // т.к. на lg (1024-1279) Hero рендерится в стекированном виде
  hero: "py-16 xl:pt-36 xl:pb-24",
  standard: "py-24 lg:py-36",
  compact: "py-16 lg:py-24",
  footer: "py-10",
};

interface SectionProps {
  id?: string;
  variant?: Variant;
  as?: "section" | "footer";
  bare?: boolean;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
}

const Section = forwardRef<HTMLElement, SectionProps>(function Section(
  {
    id,
    variant = "standard",
    as = "section",
    bare = false,
    className,
    children,
    style,
  },
  ref
) {
  const Tag = as;
  const padding = paddingMap[variant];

  return (
    <Tag ref={ref} id={id} className={cn(padding, className)} style={style}>
      {bare ? children : (
        <div className="mx-auto max-w-[1280px] px-6 md:px-12">{children}</div>
      )}
    </Tag>
  );
});

export default Section;
