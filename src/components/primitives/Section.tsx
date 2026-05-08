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

import { cn } from "@/lib/utils";

type Variant = "hero" | "standard" | "compact" | "footer";

const paddingMap: Record<Variant, string> = {
  hero: "py-16 lg:pt-36 lg:pb-24",
  standard: "py-24 lg:py-44",
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

export default function Section({
  id,
  variant = "standard",
  as = "section",
  bare = false,
  className,
  children,
  style,
}: SectionProps) {
  const Tag = as;
  const padding = paddingMap[variant];

  return (
    <Tag id={id} className={cn(padding, className)} style={style}>
      {bare ? children : (
        <div className="mx-auto max-w-[1280px] px-6">{children}</div>
      )}
    </Tag>
  );
}
