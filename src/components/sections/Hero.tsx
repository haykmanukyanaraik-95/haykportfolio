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
  const [mounted, setMounted] = useState(false);
  // На мобилке/планшете (< xl=1280) все элементы появляются синхронно (delay=0).
  // На десктопе сохраняется каскад. Lazy init из window — корректное значение с первого
  // клиентского рендера (анимации запускаются в useEffect AnimatedContent на mount).
  const [isMobile] = useState(() =>
    typeof window !== "undefined" && window.matchMedia("(max-width: 1279px)").matches
  );

  // Тема для фото — слушаем data-theme на <html>. При смене темы свопаем картинку.
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const updateTheme = () => {
      const t = (document.documentElement.getAttribute("data-theme") as "dark" | "light") || "dark";
      setTheme(t);
    };
    updateTheme();

    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);

  const photoSrc = theme === "light"
    ? "/images/hayk-photo 1light new.png"
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
        {/* Фото — сверху на мобилке/планшете/маленьком десктопе (< 1280).
            На мобилке оборачиваем в AnimatedContent, чтобы синхронно появлялось с заголовком/кнопками */}
        <AnimatedContent distance={40} duration={0.8} delay={0} className="xl:hidden mb-10 flex justify-center">
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
              <div className="bg-[rgba(0,0,0,0.15)] backdrop-blur-2xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-sm font-medium text-text-on-brand whitespace-nowrap">Available for freelance</span>
              </div>
            </div>
          </Card>
        </AnimatedContent>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 xl:gap-16 items-center">

          {/* Левая колонка — текст, кнопки, статистика (центр до xl, слева на xl+) */}
          <div className="text-center xl:text-left">
            {/* Заголовок */}
            <AnimatedContent distance={40} duration={0.8} delay={0}>
              <h1 className="text-2xl sm:text-3xl xl:text-5xl font-bold leading-[1.1] text-text-primary select-none cursor-default">
                <span className="block">Hello I&apos;m A Designer With</span>
                <span className="block whitespace-nowrap">
                  Passion To{" "}
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
              </h1>
            </AnimatedContent>

            {/* CTA кнопки */}
            <AnimatedContent distance={40} duration={0.8} delay={isMobile ? 0 : 0.2}>
              <div className="flex flex-row justify-center xl:justify-start gap-3 sm:gap-6 mt-8 xl:mt-10">
                <Button variant="primary" href="#work" icon="briefcase" centered>
                  View Work
                </Button>
                <Button
                  variant="secondary"
                  href="/Hayk_Manukyan_CV.pdf"
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  icon="download"
                  centered
                >
                  Download CV
                </Button>
              </div>
            </AnimatedContent>

            {/* Статистика */}
            <AnimatedContent distance={40} duration={0.8} delay={isMobile ? 0 : 0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 xl:mt-20">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center xl:text-left">
                    <span className="text-base font-semibold text-text-secondary">
                      <CountUp to={stat.value} duration={1.5} />
                      {stat.suffix}
                    </span>
                    <p className="text-xs text-text-muted mt-1 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedContent>
          </div>

          {/* Правая колонка — фото (только настоящий десктоп xl+, поэтому delay 0.3 не виден на мобилке) */}
          <AnimatedContent distance={60} duration={0.8} delay={0.3}>
            <div className="relative hidden xl:flex justify-end items-start">
              <Card className="relative p-3">
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

                {/* Бейдж "Available for freelance" — поверх фото */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                  <div className="bg-[rgba(0,0,0,0.15)] backdrop-blur-2xl border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
                    </span>
                    <span className="text-sm font-medium text-text-on-brand whitespace-nowrap">
                      Available for freelance
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
