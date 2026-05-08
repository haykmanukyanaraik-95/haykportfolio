// Секция 3: Skill Carousel — бесконечная горизонтальная прокрутка иконок+названий
"use client";

import { useState, useEffect } from "react";
import LogoLoop, { type LogoImageItem } from "@/components/shared/LogoLoop";
import Section from "@/components/primitives/Section";

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
  { src: "/images/skills/UX Tweak.svg", title: "UX Tweak" },
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

// Кастомный рендер ячейки
const renderSkillItem = (item: LogoImageItem) => {
  const isJitter = item.title === "Jitter";
  const isMaze = item.title === "Maze";
  return (
    <div className="logoloop__node gap-3">
      <img
        src={item.src}
        alt={item.title ?? ""}
        className={`h-10 w-auto grayscale ${isMaze ? "opacity-50" : ""}`}
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

export default function SkillCarousel() {
  // Мобилка: 40px/s (медленно), десктоп: 80px/s
  const [speed, setSpeed] = useState(80);

  useEffect(() => {
    const update = () => setSpeed(window.innerWidth < 768 ? 40 : 80);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Section id="skills-carousel" variant="compact" bare>
      <LogoLoop
        logos={skills}
        speed={speed}
        gap={75}
        hoverSpeed={30}
        logoHeight={40}
        direction="left"
        fadeOut
        fadeOutColor="#0a0a0a"
        scaleOnHover
        renderItem={(item) => renderSkillItem(item as LogoImageItem)}
        ariaLabel="Skills carousel"
      />
    </Section>
  );
}
