// Секция 2: Latest Projects — сетка 3x2 с карточками проектов
"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedContent from "@/components/shared/AnimatedContent";
import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Card from "@/components/primitives/Card";
import Button from "@/components/primitives/Button";
import "@/components/shared/HorizontalCarousel.css";

gsap.registerPlugin(ScrollTrigger);

// Данные проектов (фото будут добавлены позже)
const projects = [
  {
    title: "Housed",
    tags: ["Real Estate", "Mobile App"],
    image: "/images/projects/housed.png",
  },
  {
    title: "FinTrack Pro",
    tags: ["FinTech", "Web App"],
    image: "/images/projects/fintrack-pro.png",
  },
  {
    title: "MediCare UX",
    tags: ["Healthcare", "Mobile App"],
    image: "/images/projects/medicare-ux.png",
  },
  {
    title: "ShopFlow",
    tags: ["E-Commerce", "Web App"],
    image: "/images/projects/shopflow.png",
  },
  {
    title: "EduPath",
    tags: ["EdTech", "Mobile App"],
    image: "/images/projects/edupath.png",
  },
  {
    title: "TravelMind",
    tags: ["Travel", "Web App"],
    image: "/images/projects/travelmind.png",
  },
];

export default function Projects() {
  const headingRef = useRef<HTMLHeadingElement>(null);

  // Анимация появления заголовка:
  // — Если элемент уже в viewport при загрузке страницы → анимируем сразу (синхронно с Hero)
  // — Если ниже fold → используем ScrollTrigger (анимация при скролле до заголовка)
  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const inViewOnLoad = rect.top < window.innerHeight;

    // Стартовая позиция (скрыт + смещён)
    gsap.set(el, { opacity: 0, y: 40, visibility: "visible" });

    if (inViewOnLoad) {
      // Сразу анимируем — без ScrollTrigger
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      });
    } else {
      // ScrollTrigger — появление при прокрутке
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 90%",
          once: true,
        },
      });
    }
  }, []);

  return (
    <Section id="work" variant="standard">
      <style>{`
        .project-tooltip-wrap {
          opacity: 0;
          transition: opacity 0.3s ease;
          transition-delay: 0s;
        }
        .group:hover .project-tooltip-wrap {
          opacity: 1;
          transition-delay: 0.5s;
        }
      `}</style>

      {/* Заголовок секции — рендерится с opacity:0 (invisible), анимация в useEffect выше */}
      <SectionHeading ref={headingRef} className="invisible">
        Latest Projects
      </SectionHeading>


        {/* Мобилка: горизонтальный скролл / Десктоп: сетка 3x2 */}
        {/* Мобилка: горизонтальная карусель с анимацией + затемнение по краям */}
        <div className="sm:hidden h-carousel">
          <div
            className="h-carousel__track"
            style={{ "--speed": "6s", "--gap": "16px" } as React.CSSProperties}
          >
            {/* Дублируем для бесшовной петли */}
            {[...projects, ...projects].map((project, i) => (
              <div key={`${project.title}-${i}`} className="w-[260px] shrink-0">
                <Card spotlight className="group active:border-border-strong cursor-pointer">
                  <div className="p-3 pb-0">
                    <div className="relative aspect-[16/10] w-full rounded overflow-hidden">
                      <Image src={project.image} alt={project.title} fill sizes="260px" className="object-cover" />
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-2">
                    <div>
                      <h3 className="text-sm font-semibold text-text-primary">{project.title}</h3>
                      <p className="text-[10px] font-medium text-brand uppercase tracking-wider mt-1">{project.tags[0]}</p>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <i className={`${project.tags[1] === "Mobile App" ? "fi fi-sr-mobile-notch" : "fi fi-sr-browser"} text-[10px] text-text-secondary leading-none flex items-center`} aria-hidden="true" />
                      <span className="text-[10px] font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">{project.tags[1]}</span>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Десктоп: сетка 3x2 */}
        <div className="hidden sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project) => (
            <AnimatedContent
              key={project.title}
              distance={40}
              duration={0.7}
              delay={0}
              revealOverlay
            >
              <Card spotlight hover className="group cursor-pointer transition-transform duration-200 hover:scale-[1.02]">
                <div className="p-3 pb-0">
                  <div className="relative aspect-[16/10] w-full rounded overflow-hidden">
                    <Image src={project.image} alt={project.title} fill sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" className="object-cover" />
                    <div className="project-tooltip-wrap absolute inset-0 flex items-center justify-center">
                      <span className="bg-surface-overlay-strong border border-white/10 text-text-on-brand text-xs font-medium px-4 py-2 rounded-lg">
                        View Page — Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base font-semibold text-text-primary">{project.title}</h3>
                    <p className="text-[10px] font-medium text-brand uppercase tracking-wider mt-1">{project.tags[0]}</p>
                  </div>
                  <div className="flex items-center gap-1 shrink-0">
                    <i className={`${project.tags[1] === "Mobile App" ? "fi fi-sr-mobile-notch" : "fi fi-sr-browser"} text-[10px] text-text-secondary leading-none flex items-center`} aria-hidden="true" />
                    <span className="text-[10px] font-medium text-text-secondary uppercase tracking-wider whitespace-nowrap">{project.tags[1]}</span>
                  </div>
                </div>
              </Card>
            </AnimatedContent>
          ))}
        </div>

        {/* Кнопка "View All Works" — secondary */}
        <div className="flex justify-center mt-12">
          <AnimatedContent distance={30} duration={0.7} delay={0}>
            <Button variant="secondary" href="#" icon="eye">
              View All Works
            </Button>
          </AnimatedContent>
        </div>

    </Section>
  );
}
