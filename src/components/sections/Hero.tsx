// Секция 1: Hero — приветствие, анимированный заголовок, кнопки, статистика, фото
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import AnimatedContent from "@/components/shared/AnimatedContent";
import ShinyText from "@/components/shared/ShinyText";
import GlareHover from "@/components/shared/GlareHover";
import StarBorder from "@/components/shared/StarBorder";
import TiltedCard from "@/components/shared/TiltedCard";
import CountUp from "@/components/shared/CountUp";

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

  useEffect(() => { setMounted(true); }, []);

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
    <section id="home" className="pt-[82px] pb-[49px] lg:pt-[141px] lg:pb-[86px]">
      <div className="mx-auto max-w-[1280px] px-6">
        {/* Фото — сверху ТОЛЬКО на мобилке (вне grid) */}
        <div className="lg:hidden mb-10 flex justify-center">
          <div className="relative bg-white/[0.015] backdrop-blur-[20px] border border-white/10 rounded-lg p-3">
            <TiltedCard
              imageSrc="/images/hayk-photo.png"
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
              <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full px-4 py-2 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-success" />
                </span>
                <span className="text-[11px] font-medium text-white whitespace-nowrap">Available for freelance</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Левая колонка — текст, кнопки, статистика (центр на мобилке) */}
          <div className="text-center lg:text-left">
            {/* Заголовок */}
            <AnimatedContent distance={40} duration={0.8} delay={0}>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold leading-tight text-white select-none cursor-default">
                <span className="block">Hello I&apos;m A Designer With</span>
                <span className="block mt-1 sm:mt-2 whitespace-nowrap">
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
            <AnimatedContent distance={40} duration={0.8} delay={0.2}>
              <div className="flex flex-row justify-center lg:justify-start gap-3 sm:gap-6 mt-10 lg:mt-12">
                {/* Primary */}
                <GlareHover
                  width="auto"
                  height="auto"
                  background="#F23F3B"
                  borderRadius="8px"
                  borderColor="transparent"
                  glareColor="#ffa8a8"
                  glareOpacity={0.3}
                  glareAngle={-30}
                  glareSize={275}
                  transitionDuration={800}
                >
                  <a
                    href="#work"
                    className="group/btn inline-flex items-center justify-center text-white text-base font-medium px-5 py-3"
                  >
                    <i className="fi fi-rr-briefcase text-sm leading-[1] flex items-center overflow-hidden opacity-0 max-w-0 mr-0 group-hover/btn:opacity-100 group-hover/btn:max-w-[18px] group-hover/btn:mr-2 transition-all duration-300 ease-out" aria-hidden="true" />
                    <ShinyText text="View Work" speed={3.5} delay={3} color="#ffffff" shineColor="#ffffff80" className="leading-[1]" pauseOnHover />
                  </a>
                </GlareHover>

                {/* Secondary — StarBorder эффект */}
                <StarBorder color="#F23F3B" speed="8s">
                  <a
                    href="/Hayk_Manukyan_CV.pdf"
                    download
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/btn inline-flex items-center justify-center text-white text-base font-medium px-5 py-3"
                  >
                    <i className="fi fi-rr-download text-sm leading-[1] flex items-center overflow-hidden opacity-0 max-w-0 mr-0 group-hover/btn:opacity-100 group-hover/btn:max-w-[18px] group-hover/btn:mr-2 transition-all duration-300 ease-out" aria-hidden="true" />
                    <ShinyText text="Download CV" speed={3.5} delay={3} color="#b3b3b3" shineColor="#ffffff" className="leading-[1]" pauseOnHover />
                  </a>
                </StarBorder>
              </div>
            </AnimatedContent>

            {/* Статистика */}
            <AnimatedContent distance={40} duration={0.8} delay={0.4}>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-14 lg:mt-20">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center lg:text-left">
                    <span className="text-base font-semibold text-text-secondary">
                      <CountUp to={stat.value} duration={1.5} />
                      {stat.suffix}
                    </span>
                    <p className="text-[11px] text-text-muted mt-0.5 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </AnimatedContent>
          </div>

          {/* Правая колонка — фото (только десктоп) */}
          <AnimatedContent distance={60} duration={0.8} delay={0.3}>
            <div className="relative hidden lg:flex justify-end items-start">
              <div className="relative bg-white/[0.015] backdrop-blur-[20px] border border-white/10 rounded-lg p-3">
                <TiltedCard
                  imageSrc="/images/hayk-photo.png"
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
                  <div className="bg-black/20 backdrop-blur-2xl border border-white/10 rounded-full px-5 py-2.5 flex items-center gap-2.5">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-success" />
                    </span>
                    <span className="text-xs font-medium text-white whitespace-nowrap">
                      Available for freelance
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContent>

        </div>
      </div>
    </section>
  );
}
