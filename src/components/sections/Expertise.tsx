// Секция 4: Areas of Expertise — 3x2 grid с 6 карточками.
//
// Анимация иконок:
//   - Десктоп (grid-layout, sm+): сиквенция 1→2→3→4→5→6→loop. Одна играет, остальные
//     на паузе. Порядок чтения (top-left → bottom-right) совпадает с порядком в массиве,
//     CSS grid заполняет по строкам.
//   - Мобильная карусель (< sm): иконки СТАТИЧНЫ (staticFrame=true). По запросу
//     пользователя: в горизонтальной карусели анимация иконок не играет.
//   - IntersectionObserver: при выходе секции из viewport сиквенция приостанавливается
//     (экономия CPU). Возобновляется когда секция снова видна.
//
// Карточки — статичные (без hover/click states), по запросу пользователя.
"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import AnimatedContent from "@/components/shared/AnimatedContent";
import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Card from "@/components/primitives/Card";
import LottieIcon from "@/components/shared/LottieIcon";
import { useCarouselAutoScroll } from "@/lib/useCarouselAutoScroll";
import "@/components/shared/HorizontalCarousel.css";

// Данные областей экспертизы. iconSrc указывает на Lottie JSON в public/images/expertise/.
const areas = [
  {
    iconSrc: "/images/expertise/Design and Prototyping Tools Mastery.json",
    title: "Design and Prototyping Tools Mastery",
    description:
      "Fluent across Figma, Framer, and the Adobe suite. Deep tool knowledge lets me focus on the problem, not the software.",
  },
  {
    iconSrc: "/images/expertise/User Research and Usability Testing.json",
    title: "User Research and Usability Testing",
    description:
      "Every interface decision is grounded in real user behavior — interviews, surveys, and structured testing. Qualitative insight meets quantitative evidence.",
  },
  {
    iconSrc: "/images/expertise/AI Driven Practice.json",
    title: "AI Driven Practice",
    description:
      "Integrating Claude, Gemini, and modern AI tools into daily design workflow. AI is a collaborator for faster iteration, not a shortcut.",
  },
  {
    iconSrc: "/images/expertise/Data Driven Design and Analytics.json",
    title: "Data Driven Design and Analytics",
    description:
      "Heatmaps, funnels, and behavioral analytics shape every interface choice. No guesswork — decisions backed by evidence.",
  },
  {
    iconSrc: "/images/expertise/Design Phase Management and Scalability.json",
    title: "DP Management and Scalability",
    description:
      "From discovery to handoff, each phase runs on scalable systems and clear documentation. Products grow without chaos.",
  },
  {
    iconSrc: "/images/expertise/Cross Functional Collaboration and Communication.json",
    title: "CF Collaboration & Communication",
    description:
      "Bridging design, engineering, and product through shared language and documentation. Great design dies in bad communication — I make sure it doesn't.",
  },
];

export default function Expertise() {
  const mobileScrollRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Авто-скролл 32 px/s + ручной свайп + пауза 5 сек.
  useCarouselAutoScroll(mobileScrollRef, { pixelsPerSecond: 32 });

  // Сиквенция: индекс активной иконки. Старт с 0 (top-left).
  const [activeIndex, setActiveIndex] = useState(0);

  // Пауза сиквенции когда секция вне viewport (через IntersectionObserver).
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Когда иконка заканчивает анимацию — продвигаем сиквенцию на следующую.
  // useCallback стабилизирует ссылку — иначе LottieIcon будет пересоздавать listener каждый рендер.
  const advance = useCallback(() => {
    setActiveIndex((i) => (i + 1) % areas.length);
  }, []);

  return (
    <Section id="expertise" variant="standard" ref={sectionRef}>
      {/* Заголовок секции — статический, без анимации.
          mb-4 sm:mb-6 lg:mb-8 — компактный отступ до карточек (как в Skills-блоке). */}
      <SectionHeading className="mb-4 sm:mb-6 lg:mb-8">Areas of Expertise</SectionHeading>

      {/* Мобилка (< sm): горизонтальный JS-скролл + ручной свайп + edge-fade.
          В карусели иконки СТАТИЧНЫ (staticFrame=true) — по запросу пользователя. */}
      <div className="sm:hidden -mx-6 h-carousel-fade">
        <div
          ref={mobileScrollRef}
          className="overflow-x-auto scrollbar-none pt-2 pb-6"
          style={{ touchAction: "pan-x", WebkitOverflowScrolling: "touch" }}
        >
          <div className="flex w-max">
            {[...areas, ...areas].map((area, i) => (
              <div key={`${area.title}-${i}`} className="w-[260px] shrink-0 mr-4">
                <Card className="h-full p-4 flex flex-col items-start text-left">
                  <LottieIcon src={area.iconSrc} isActive={false} staticFrame size={48} />
                  <h3 className="text-sm font-semibold text-text-primary mt-2 mb-2">
                    {area.title}
                  </h3>
                  <p className="text-xs text-text-secondary leading-relaxed">
                    {area.description}
                  </p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Десктоп: сетка 3×2 с активной сиквенцией.
          isActive={isInView && activeIndex === i} — играет только текущая иконка,
          и только когда секция в viewport. */}
      <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {areas.map((area, i) => (
          <AnimatedContent
            key={area.title}
            distance={40}
            duration={0.7}
            delay={0}
            revealOverlay
          >
            <Card className="h-full p-4 flex flex-col items-start text-left">
              <LottieIcon
                src={area.iconSrc}
                isActive={isInView && activeIndex === i}
                onAnimationEnd={advance}
                size={60}
              />

              {/* Заголовок (mb-2 = 8px, как в мобильной карточке) */}
              <h3 className="text-base font-semibold text-text-primary mt-2 mb-2">
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
