// Секция About Me (id="about") — текст + папка слева, карточка Skills справа
// Два блока выровнены по вертикальному центру
"use client";

import AnimatedContent from "@/components/shared/AnimatedContent";
import Folder from "@/components/shared/Folder";
import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import Card from "@/components/primitives/Card";

const hardSkills = [
  "User Research", "Usability Testing", "Interaction Design",
  "Wireframing & Prototyping", "Information Architecture", "Design Systems",
  "User Flows & Journey Mapping", "Accessibility (WCAG)", "Data-Driven Design",
  "Design Thinking", "AI-Augmented Workflows", "Product Strategy",
];

const softSkills = [
  "Critical Thinking", "Empathy", "Communication",
  "Collaboration", "Problem Solving", "Adaptability",
  "Attention to Detail", "Leadership", "Curiosity",
  "Storytelling", "Active Listening", "Mentorship",
];

// iconClass — индивидуальный размер иконки (Behance имеет внутренний padding в SVG, поэтому увеличен)
const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/hayk-manukyanofficial/", icon: "/images/social-icons/linkedin.svg", iconClass: "w-10 h-10" },
  { name: "Instagram", url: "https://www.instagram.com/_______hayk_________/", icon: "/images/social-icons/instagram.svg", iconClass: "w-10 h-10" },
  { name: "Behance", url: "https://www.behance.net/haykmanukyanofficial", icon: "/images/social-icons/behance.svg", iconClass: "w-12 h-12" },
];

function SkillChip({ label }: { label: string }) {
  return (
    <li className="skill-chip inline-flex items-center gap-2 bg-surface-input border border-border-subtle rounded-full px-3 py-1.5">
      <i className="fi fi-sr-star text-[10px] text-brand leading-none flex items-center" aria-hidden="true" />
      <span className="text-xs text-text-secondary whitespace-nowrap">{label}</span>
    </li>
  );
}

export default function AboutMe() {
  const folderItems = socialLinks.map((link) => (
    <a
      key={link.name}
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      title={link.name}
      onClick={(e) => e.stopPropagation()}
      className="flex items-center justify-center w-full h-full"
    >
      {/* SVG-иконки — Next.js Image-оптимизация не применима (vector), используем нативный img */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={link.icon} alt={link.name} className={`${link.iconClass} object-contain`} />
    </a>
  ));

  return (
    <Section id="about" variant="standard">
        <AnimatedContent distance={40} duration={0.8} delay={0} revealOverlay>

          {/* xl:gap-16 (64px) — фиксированный отступ между блоками.
              xl:items-center — оба блока выровнены по центру вертикально.
              Side-by-side только на xl+ (1280+). На lg (1024-1279) layout ставится вертикально,
              иначе 488 + 64 + 680 = 1232 не влезает в контейнер 976 */}
          <div className="flex flex-col xl:flex-row gap-10 xl:gap-16 xl:items-center">

            {/* ЛЕВАЯ: заголовок + описание + текст про соцсети + папка */}
            <div className="flex flex-col items-start xl:w-[488px] shrink-0">
              <SectionHeading className="mb-2 lg:mb-2">About Me</SectionHeading>

              <p className="text-sm text-text-secondary leading-relaxed">
                Accomplished Product Designer with 6+ years of experience delivering innovative digital solutions. Skilled in user research, wireframing, prototyping, and information architecture — with hands-on expertise in Figma, Framer, and AI-augmented design workflows.
              </p>

              <p className="text-base text-text-muted leading-relaxed mt-3">
                Want to see my social media? Feel free to explore the red folder below.
              </p>

              <div className="mt-10">
                <Folder color="var(--color-brand)" size={0.8} items={folderItems} className="origin-top-left" />
              </div>
            </div>

            {/* ПРАВАЯ: Skills карточка — высота определяется контентом (короче левого блока).
                space-y-8 — фиксированный отступ 32px между Hard и Soft Skills */}
            <Card spotlight hover className="p-4 xl:w-[680px] xl:shrink-0 space-y-8">
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-2">Hard Skills</h3>
                <ul className="flex flex-wrap gap-x-2.5 gap-y-3">
                  {hardSkills.map((s) => <SkillChip key={s} label={s} />)}
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold text-text-primary mb-2">Soft Skills</h3>
                <ul className="flex flex-wrap gap-x-2.5 gap-y-3">
                  {softSkills.map((s) => <SkillChip key={s} label={s} />)}
                </ul>
              </div>
            </Card>

          </div>

        </AnimatedContent>
    </Section>
  );
}
