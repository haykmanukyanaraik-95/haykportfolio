// Секция 1: Hero — приветствие, анимированный заголовок, кнопки, статистика, фото
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AnimatedContent from "@/components/shared/AnimatedContent";
import TiltedCard from "@/components/shared/TiltedCard";
import CountUp from "@/components/shared/CountUp";
import Section from "@/components/primitives/Section";
import Card from "@/components/primitives/Card";
import Button from "@/components/primitives/Button";
import { useTheme, useMounted } from "@/lib/useTheme";

// DecryptedText — только клиент (Math.random = hydration mismatch)
const DecryptedText = dynamic(() => import("@/components/shared/DecryptedText"), {
  ssr: false,
  loading: () => null,
});

// Данные для статистики: value = число, suffix = строка после числа (например "+")
const stats = [
  { value: 7, suffix: "", label: "Years of Experience" },
  { value: 125, suffix: "+", label: "Projects Completed" },
  { value: 72, suffix: "", label: "Happy Clients" },
  { value: 8, suffix: "", label: "Award Wins" },
];

// Слова для анимации
const rotatingWords = ["Research", "Design", "Create", "Innovate", "Orchestrating", "Automating", "Optimising", "Leading", "Coordinating"];

export default function Hero() {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const mounted = useMounted();
  // На мобилке/планшете (< xl=1280) все элементы появляются синхронно (delay=0).
  // На десктопе сохраняется каскад. Lazy init из window — корректное значение с первого
  // клиентского рендера (анимации запускаются в useEffect AnimatedContent на mount).
  // На мобилке (< md=768) элементы появляются синхронно (delay=0).
  // На планшете/десктопе сохраняется каскад.
  const [isMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches
  );

  // Тема для фото — useTheme подписывается на data-theme через useSyncExternalStore.
  const theme = useTheme();

  const photoSrc = theme === "light"
    ? "/images/hayk-photo-light.png"
    : "/images/hayk-photo.png";

  // Цикл смены слов: первое через 3 сек, далее каждые 2.5 сек
  useEffect(() => {
    if (!mounted) return;
    const startDelay = setTimeout(() => {
      const interval = setInterval(() => {
        setCurrentWordIndex((prev) => (prev + 1) % rotatingWords.length);
      }, 3000);
      return () => clearInterval(interval);
    }, 3000);
    return () => clearTimeout(startDelay);
  }, [mounted]);

  return (
    <Section id="home" variant="hero">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8 lg:gap-12 xl:gap-16 items-center">

          {/* Левая колонка — на мобилке центрируем все элементы, на md+ слева. */}
          <div className="text-center md:text-left">
            {/* Заголовок 24px на мобилке, 2 строки ("Hello I'm A Designer" / "With Passion To [word]") */}
            <AnimatedContent distance={40} duration={0.8} delay={0}>
              <h1 className="text-2xl md:text-3xl xl:text-4xl font-bold leading-[1.15] sm:leading-[1.1] text-text-primary select-none cursor-default">
                {/* "With" живёт в первой строке на sm и lg+ (где места хватает),
                    и во второй строке на mobile и md-range 768-1023 (где text column узкий ~320px). */}
                <span className="block">
                  Hello I&apos;m A Designer<span className="hidden sm:inline md:hidden lg:inline"> With</span>
                </span>
                <span className="block whitespace-nowrap">
                  <span className="sm:hidden md:inline lg:hidden">With </span>Passion To{" "}
                  {/* На md range DecryptedText на отдельной (3-й) строке через display:block.
                      На lg+ — снова inline в одной строке с "Passion To". */}
                  <span className="md:block lg:inline">
                    {mounted ? (
                      <DecryptedText
                        key={`word-${currentWordIndex}`}
                        text={rotatingWords[currentWordIndex]}
                        animateOn="view"
                        sequential
                        speed={80}
                        revealDirection="start"
                        characters="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
                        className="text-brand"
                        encryptedClassName="text-brand/40"
                      />
                    ) : (
                      <span className="text-brand">{rotatingWords[0]}</span>
                    )}
                  </span>
                </span>
              </h1>
            </AnimatedContent>

            {/* Фото — между заголовком и кнопками только на мобилке (< md). Центрировано на мобилке. */}
            <AnimatedContent distance={40} duration={0.8} delay={0} className="md:hidden mt-10 flex justify-center">
              <Card className="relative p-3">
                <TiltedCard
                  imageSrc={photoSrc}
                  altText="Hayk Manukyan — UX / Product Designer"
                  captionText=""
                  showTooltip={false}
                  containerHeight="340px"
                  containerWidth="260px"
                  imageHeight="340px"
                  imageWidth="260px"
                  rotateAmplitude={4}
                  scaleOnHover={1.03}
                  showMobileWarning={false}
                />
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
                  <div className="availability-badge bg-[rgba(0,0,0,0.20)] backdrop-blur-2xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                    </span>
                    <span className="text-sm font-semibold text-text-on-brand whitespace-nowrap">Ready for Cooperation</span>
                  </div>
                </div>
              </Card>
            </AnimatedContent>

            {/* CTA кнопки — ВСЕГДА в одной линии (никаких стэков).
                Mobile (< sm = 640): ряд w-[284px] mx-auto центрирует под фото (260+24 padding);
                  primary во flex-1 заполняет, secondary натуральной ширины "CV".
                ≥ sm (640+): natural width, gap-3 (компактно — чтобы на md 768 две
                  кнопки с иконками (~340px) влезли в узкую колонку ~320px).
                На sm 640-767: центр (text-center заголовка); с md+ слева. */}
            <AnimatedContent distance={40} duration={0.8} delay={isMobile ? 0 : 0.2}>
              <div className="flex flex-row gap-3 lg:gap-6 mt-8 xl:mt-10 w-[284px] mx-auto sm:w-auto sm:justify-center md:justify-start">
                <div className="flex-1 sm:flex-initial">
                  <Button variant="primary" href="#work" icon="briefcase" centered fullWidth>
                    View Work
                  </Button>
                </div>
                <Button
                  variant="secondary"
                  href="/Hayk_Manukyan_CV.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  icon="file-download"
                  centered
                  mobileLabel="CV"
                >
                  Download CV
                </Button>
              </div>
            </AnimatedContent>

            {/* Статистика — центр на мобилке, слева на md+.
                Колонки:
                  < 520px → 2 (узко, длинные лейблы не влезают в одну строку при 4-col)
                  ≥ 520px → 4 (всегда одной строкой; на md фото справа сжимает левую
                              колонку, но 4 узких слота с переносом лейблов влезают). */}
            <AnimatedContent distance={40} duration={0.8} delay={isMobile ? 0 : 0.4}>
              <div className="grid grid-cols-2 min-[520px]:grid-cols-4 gap-4 mt-14 xl:mt-20">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center md:text-left">
                    <span className="text-base font-semibold text-text-secondary">
                      <CountUp to={stat.value} duration={1.2} />
                      {stat.suffix}
                    </span>
                    <p className="text-xs font-medium text-text-muted mt-1 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedContent>
          </div>

          {/* Правая колонка — фото (md+).
              На md-lg показывается компактное фото 260×340, на xl+ — крупное 340×440.
              Делается через two-photo swap (display block/hidden) — реагирует на resize. */}
          <AnimatedContent distance={60} duration={0.8} delay={0.3}>
            <div className="relative hidden md:flex justify-end items-start">
              <Card className="relative p-3">
                {/* md-lg: 260×340 */}
                <div className="block xl:hidden">
                  <TiltedCard
                    imageSrc={photoSrc}
                    altText="Hayk Manukyan — UX / Product Designer"
                    captionText=""
                    showTooltip={false}
                    containerHeight="340px"
                    containerWidth="260px"
                    imageHeight="340px"
                    imageWidth="260px"
                    rotateAmplitude={4}
                    scaleOnHover={1.03}
                    showMobileWarning={false}
                  />
                </div>

                {/* xl+: 340×440 */}
                <div className="hidden xl:block">
                  <TiltedCard
                    imageSrc={photoSrc}
                    altText="Hayk Manukyan — UX / Product Designer"
                    captionText=""
                    showTooltip={false}
                    containerHeight="440px"
                    containerWidth="340px"
                    imageHeight="440px"
                    imageWidth="340px"
                    rotateAmplitude={4}
                    scaleOnHover={1.03}
                    showMobileWarning={false}
                  />
                </div>

                {/* Бейдж — общий, position-respond к размеру фото через xl-варианты */}
                <div className="absolute bottom-6 xl:bottom-8 left-1/2 -translate-x-1/2 z-10">
                  <div className="availability-badge bg-[rgba(0,0,0,0.20)] backdrop-blur-2xl border border-white/10 rounded-full px-4 xl:px-5 py-2 xl:py-2.5 flex items-center gap-2 xl:gap-2.5">
                    <span className="relative flex h-2 xl:h-2.5 w-2 xl:w-2.5">
                      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 xl:h-2.5 w-2 xl:w-2.5 bg-green-400" />
                    </span>
                    <span className="text-sm font-semibold text-text-on-brand whitespace-nowrap">
                      Ready for Cooperation
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </AnimatedContent>

        </div>
    </Section>
  );
}
