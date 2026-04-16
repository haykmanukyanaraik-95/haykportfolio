// Секция 2: Latest Projects — сетка 3x2 с карточками проектов
"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedContent from "@/components/shared/AnimatedContent";
import SpotlightCard from "@/components/shared/SpotlightCard";
import StarBorder from "@/components/shared/StarBorder";
import ShinyText from "@/components/shared/ShinyText";
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
    <section id="work" className="py-[102px] lg:py-[176px]">
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
      <div className="mx-auto max-w-[1280px] px-6">

        {/* Заголовок секции — рендерится с opacity:0 (invisible), анимация в useEffect выше */}
        <h2
          ref={headingRef}
          className="invisible text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-10 lg:mb-12"
        >
          Latest Projects
        </h2>


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
                <SpotlightCard
                  spotlightColor="rgba(242, 63, 59, 0.15)"
                  className="group bg-white/[0.015] backdrop-blur-[20px] border border-white/10 active:border-white/15 rounded-lg cursor-pointer"
                >
                  <div className="p-3 pb-0">
                    <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden">
                      <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    </div>
                  </div>
                  <div className="p-3 flex items-center justify-between gap-2">
                    <h3 className="text-sm font-semibold text-white whitespace-nowrap">{project.title}</h3>
                    <div className="flex items-center gap-1 shrink-0">
                      <span className="text-[9px] font-medium text-white uppercase tracking-wider">{project.tags[0]}</span>
                      <i className={`${project.tags[1] === "Mobile App" ? "fi fi-sr-mobile-notch" : "fi fi-sr-browser"} text-[10px] text-brand leading-none flex items-center`} aria-hidden="true" />
                      <span className="text-[9px] font-medium text-brand uppercase tracking-wider whitespace-nowrap">{project.tags[1]}</span>
                    </div>
                  </div>
                </SpotlightCard>
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
              <SpotlightCard
                spotlightColor="rgba(242, 63, 59, 0.15)"
                className="group bg-white/[0.015] backdrop-blur-[20px] border border-white/10 hover:border-white/15 rounded-lg cursor-pointer transition-transform duration-200 hover:scale-[1.02]"
              >
                <div className="p-3 pb-0">
                  <div className="relative aspect-[16/10] w-full rounded-md overflow-hidden">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                    <div className="project-tooltip-wrap absolute inset-0 flex items-center justify-center">
                      <span className="bg-black/80 border border-white/10 text-white/80 text-xs font-medium px-4 py-2 rounded-lg">
                        View Page — Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-white">{project.title}</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] font-medium text-white uppercase tracking-wider">{project.tags[0]}</span>
                    <i className={`${project.tags[1] === "Mobile App" ? "fi fi-sr-mobile-notch" : "fi fi-sr-browser"} text-[11px] text-brand leading-none flex items-center ml-1`} aria-hidden="true" />
                    <span className="text-[10px] font-medium text-brand uppercase tracking-wider">{project.tags[1]}</span>
                  </div>
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>

        {/* Кнопка "View All Works" — StarBorder как secondary в Hero */}
        <div className="flex justify-center mt-12">
          <AnimatedContent distance={30} duration={0.7} delay={0.6}>
            <StarBorder color="#F23F3B" speed="8s">
              <a
                href="#"
                className="group/btn inline-flex items-center text-white text-base font-medium px-5 py-3"
              >
                <i className="fi fi-rr-eye text-sm leading-[1] flex items-center overflow-hidden opacity-0 max-w-0 mr-0 group-hover/btn:opacity-100 group-hover/btn:max-w-[18px] group-hover/btn:mr-2 transition-all duration-300 ease-out" aria-hidden="true" />
                <ShinyText text="View All Works" speed={3.5} delay={3} color="#b3b3b3" shineColor="#ffffff" className="leading-[1]" pauseOnHover />
              </a>
            </StarBorder>
          </AnimatedContent>
        </div>

      </div>
    </section>
  );
}
