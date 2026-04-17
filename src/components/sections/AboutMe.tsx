// Секция About Me (id="about") — текст + папка слева, карточка Skills справа
// Два блока выровнены по вертикальному центру
"use client";

import AnimatedContent from "@/components/shared/AnimatedContent";
import SpotlightCard from "@/components/shared/SpotlightCard";
import Folder from "@/components/shared/Folder";

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

const socialLinks = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/hayk-manukyanofficial/", icon: "/images/Social Link Icons/linkedin.svg" },
  { name: "Instagram", url: "https://www.instagram.com/_______hayk_________/", icon: "/images/Social Link Icons/Instagram.svg" },
  { name: "Behance", url: "https://www.behance.net/haykmanukyanofficial", icon: "/images/Social Link Icons/Behance.svg" },
];

function SkillChip({ label }: { label: string }) {
  return (
    <li className="inline-flex items-center gap-1.5 border border-white/10 rounded-full px-3 py-1.5">
      <i className="fi fi-sr-star text-[8px] text-brand leading-none flex items-center" aria-hidden="true" />
      <span className="text-xs text-text-secondary whitespace-nowrap">{label}</span>
    </li>
  );
}

const cardClass = "bg-white/[0.015] backdrop-blur-[20px] border border-white/10 rounded-lg";

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
      <img src={link.icon} alt={link.name} className="w-10 h-10 object-contain" />
    </a>
  ));

  return (
    <section id="about" className="py-[102px] lg:py-[176px]">
      <div className="mx-auto max-w-[1280px] px-6">
        <AnimatedContent distance={40} duration={0.8} delay={0} revealOverlay>

          <div className="flex flex-col lg:flex-row gap-10 lg:gap-5 lg:items-center">

            {/* ЛЕВАЯ: заголовок + описание + текст про соцсети + папка */}
            <div className="flex flex-col items-start lg:w-[403px] shrink-0">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">About Me</h2>

              <p className="text-sm text-text-secondary leading-relaxed">
                UX / Product Designer, 6+ years. Leading UX at Devteam.Space, pursuing a Master&apos;s in Interaction Design in Lisbon.
              </p>

              <p className="text-sm text-text-muted leading-relaxed mt-3">
                Want to see my social media? Feel free to explore the red folder below.
              </p>

              <div className="mt-10">
                <Folder color="#F23F3B" size={1.2} items={folderItems} className="origin-top-left" />
              </div>
            </div>

            {/* ПРАВАЯ: Skills карточка — обнимает контент */}
            <SpotlightCard
              spotlightColor="rgba(242, 63, 59, 0.15)"
              borderGlow
              className={`${cardClass} p-4`}
            >
              <div className="mb-4">
                <h3 className="text-base font-semibold text-white mb-2">Hard Skills</h3>
                <ul className="flex flex-wrap gap-[7px]">
                  {hardSkills.map((s) => <SkillChip key={s} label={s} />)}
                </ul>
              </div>
              <div>
                <h3 className="text-base font-semibold text-white mb-2">Soft Skills</h3>
                <ul className="flex flex-wrap gap-[7px]">
                  {softSkills.map((s) => <SkillChip key={s} label={s} />)}
                </ul>
              </div>
            </SpotlightCard>

          </div>

        </AnimatedContent>
      </div>
    </section>
  );
}
