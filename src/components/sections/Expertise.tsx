// Секция 4: Areas of Expertise — 3x2 grid с 6 карточками
// Карточка стилистически соответствует Projects (SpotlightCard + scale + border-hover)
// Контент карточки — выровнен по левому краю (общее правило дизайн-системы)
// Иконки — кастомные SVG из public/images/expertise/1.svg ... 6.svg
// Цвет иконки — brand red (через примитив IconBadge с mask-image)
"use client";

import { useRef } from "react";
import AnimatedContent from "@/components/shared/AnimatedContent";
import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Card from "@/components/primitives/Card";
import IconBadge from "@/components/primitives/IconBadge";
import { useCarouselAutoScroll } from "@/lib/useCarouselAutoScroll";
import "@/components/shared/HorizontalCarousel.css";

// Данные областей экспертизы — iconSrc указывает на SVG в public/images/expertise/
const areas = [
  {
    iconSrc: "/images/expertise/Design and Prototyping Tools Mastery.svg",
    title: "Design and Prototyping Tools Mastery",
    description:
      "Fluent across Figma, Framer, and the Adobe suite. Deep tool knowledge lets me focus on the problem, not the software.",
  },
  {
    iconSrc: "/images/expertise/User Research and Usability Testing.svg",
    title: "User Research and Usability Testing",
    description:
      "Every interface decision is grounded in real user behavior — interviews, surveys, and structured testing. Qualitative insight meets quantitative evidence.",
  },
  {
    iconSrc: "/images/expertise/AI Driven Practice.svg",
    title: "AI Driven Practice",
    description:
      "Integrating Claude, Gemini, and modern AI tools into daily design workflow. AI is a collaborator for faster iteration, not a shortcut.",
  },
  {
    iconSrc: "/images/expertise/Data Driven Design and Analytics.svg",
    title: "Data Driven Design and Analytics",
    description:
      "Heatmaps, funnels, and behavioral analytics shape every interface choice. No guesswork — decisions backed by evidence.",
  },
  {
    iconSrc: "/images/expertise/Design Phase Management and Scalability.svg",
    title: "DP Management and Scalability",
    description:
      "From discovery to handoff, each phase runs on scalable systems and clear documentation. Products grow without chaos.",
  },
  {
    iconSrc: "/images/expertise/Cross Functional Collaboration and Communication.svg",
    title: "CF Collaboration & Communication",
    description:
      "Bridging design, engineering, and product through shared language and documentation. Great design dies in bad communication — I make sure it doesn't.",
  },
];

export default function Expertise() {
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  // Авто-скролл 43 px/s (-15% от 50) + ручной свайп + пауза 5 сек на касание
  useCarouselAutoScroll(mobileScrollRef, { pixelsPerSecond: 43 });

  return (
    <Section id="expertise" variant="standard">
        {/* Заголовок секции — статический, без анимации */}
        <SectionHeading>Areas of Expertise</SectionHeading>

        {/* Мобилка (< sm): горизонтальный скролл с авто-анимацией + ручной свайп.
            Обёртка .h-carousel-fade → градиент по краям (15% ширины, theme-aware).
            Внутри overflow-x: auto → user может физически свайпать пальцем.
            requestAnimationFrame инкрементирует scrollLeft (см. useCarouselAutoScroll).
            Касание → пауза 5 сек, потом продолжает с текущей позиции.
            -mx-6 → edge-to-edge. */}
        <div className="sm:hidden -mx-6 h-carousel-fade">
          <div
            ref={mobileScrollRef}
            className="overflow-x-auto scrollbar-none pt-2 pb-6"
            style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch" }}
          >
            <div className="flex w-max">
              {[...areas, ...areas].map((area, i) => (
                <div key={`${area.title}-${i}`} className="w-[260px] shrink-0 mr-4">
                  <Card spotlight className="h-full p-4 flex flex-col items-start text-left">
                    <IconBadge src={area.iconSrc} className="mb-2" />
                    <h3 className="text-sm font-semibold text-text-primary mb-2">{area.title}</h3>
                    <p className="text-xs text-text-secondary leading-relaxed">{area.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Десктоп: сетка 3x2 */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {areas.map((area) => (
            <AnimatedContent
              key={area.title}
              distance={40}
              duration={0.7}
              delay={0}
              revealOverlay
            >
              <Card spotlight hover className="h-full p-4 flex flex-col items-start text-left transition-transform duration-200 hover:scale-[1.02]">
                <IconBadge src={area.iconSrc} className="mb-2" />

                {/* Заголовок */}
                <h3 className="text-base font-semibold text-text-primary mb-3">
                  {area.title}
                </h3>

                {/* Описание */}
                <p className="text-sm text-text-secondary leading-relaxed">
                  {area.description}
                </p>
              </Card>
            </AnimatedContent>
          ))}
        </div>
    </Section>
  );
}
