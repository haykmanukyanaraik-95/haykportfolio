// Секция 3: Skill Carousel — бесконечная горизонтальная прокрутка иконок+названий
"use client";

import LogoLoop, { type LogoImageItem } from "@/components/shared/LogoLoop";
import Section from "@/components/primitives/Section";
import { useTheme } from "@/lib/useTheme";

// Список скиллов: порядок — дизайн → AI → research → код → communication
const skills: LogoImageItem[] = [
  { src: "/images/skills/Figma.svg", title: "Figma" },
  { src: "/images/skills/Illustrator.svg", title: "Illustrator" },
  { src: "/images/skills/Photoshop.svg", title: "Photoshop" },
  { src: "/images/skills/Adobe.svg", title: "Adobe" },
  { src: "/images/skills/Zeplin.svg", title: "Zeplin" },
  { src: "/images/skills/Framer.svg", title: "Framer" },
  { src: "/images/skills/Jitter.svg", title: "Jitter" },
  { src: "/images/skills/Claude.svg", title: "Claude" },
  { src: "/images/skills/Gemini.svg", title: "Gemini" },
  { src: "/images/skills/Perplexity.svg", title: "Perplexity" },
  { src: "/images/skills/Maze.svg", title: "Maze" },
  { src: "/images/skills/UX-Tweak.svg", title: "UX Tweak" },
  { src: "/images/skills/Useberry.svg", title: "Useberry" },
  { src: "/images/skills/HTML.svg", title: "HTML" },
  { src: "/images/skills/CSS.svg", title: "CSS" },
  { src: "/images/skills/React.svg", title: "React" },
  { src: "/images/skills/Next-js.svg", title: "Next.js" },
  { src: "/images/skills/Slack.svg", title: "Slack" },
  { src: "/images/skills/Jira.svg", title: "Jira" },
  { src: "/images/skills/ClickUp.svg", title: "ClickUp" },
  { src: "/images/skills/Microsoft_365.svg", title: "Microsoft 365" },
];

export default function SkillCarousel() {
  // 50 px/s — синхронно с Projects/Expertise/Testimonials каруселями
  const speed = 50;
  const theme = useTheme();

  // Кастомный рендер ячейки. Maze: в светлой теме грузим Maze-light.svg (#191919),
  // в тёмной — оригинальный Maze.svg (#ffffff).
  const renderSkillItem = (item: LogoImageItem) => {
    const isJitter = item.title === "Jitter";
    const isMaze = item.title === "Maze";
    const src =
      isMaze && theme === "light" ? "/images/skills/Maze-light.svg" : item.src;
    return (
      <div className="logoloop__node gap-3">
        {/* SVG-иконки скиллов — vector, оптимизация Next.js Image не нужна */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={item.title ?? ""}
          className={`h-10 w-auto ${isMaze ? "opacity-50" : ""}`}
          loading="lazy"
          draggable={false}
        />
        {!isJitter && (
          <span className="text-text-muted text-lg font-medium whitespace-nowrap">
            {item.title}
          </span>
        )}
      </div>
    );
  };

  return (
    <Section id="skills-carousel" variant="compact" bare>
      <LogoLoop
        logos={skills}
        speed={speed}
        gap={56}
        hoverSpeed={30}
        logoHeight={40}
        direction="left"
        fadeOut
        fadeOutColor="var(--surface-page)"
        scaleOnHover
        renderItem={(item) => renderSkillItem(item as LogoImageItem)}
        ariaLabel="Skills carousel"
      />
    </Section>
  );
}
