// Секция 7: Testimonials — 3 вертикальные карусели (лево↓, центр↑, право↓)
// Карточки = glass-style, аватар-инициалы + имя/роль + текст отзыва
"use client";

import AnimatedContent from "@/components/shared/AnimatedContent";
import Section from "@/components/primitives/Section";
import SectionHeading from "@/components/primitives/SectionHeading";
import "@/components/shared/VerticalCarousel.css";
import "@/components/shared/HorizontalCarousel.css";

// Данные testimonials — сгенерированы на основе опыта Hayk (временные, пользователь заменит)
interface Testimonial {
  name: string;
  role: string;
  text: string;
  initials: string;
}

const column1: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Product Manager, Devteam.Space",
    text: "Hayk transformed our product's UX from good to exceptional. His research-driven approach uncovered insights we'd been missing for months.",
    initials: "SC",
},
  {
    name: "Dmitry Volkov",
    role: "Senior Developer",
    text: "One of the few designers who truly understands both user psychology and technical constraints. Hayk bridges the gap effortlessly.",
    initials: "DV",
},
  {
    name: "Lisa Nguyen",
    role: "UX Researcher",
    text: "Hayk doesn't just design screens — he designs experiences. Every interaction feels intentional and polished.",
    initials: "LN",
},
  {
    name: "Thomas Müller",
    role: "Product Owner",
    text: "Hayk's ability to translate business requirements into intuitive user flows is remarkable. A true product thinker.",
    initials: "TM",
},
];

const column2: Testimonial[] = [
  {
    name: "Marcus Webb",
    role: "CTO, Animoca Brands",
    text: "Working with Hayk on our blockchain platform was a turning point. He made complex Web3 interactions feel intuitive and accessible to everyday users.",
    initials: "MW",
},
  {
    name: "Anna Kim",
    role: "CEO, StartupFlow",
    text: "Hayk brought clarity to our chaotic product roadmap. His wireframes and prototypes communicated ideas better than any document could.",
    initials: "AK",
},
  {
    name: "Robert Andersson",
    role: "VP of Engineering",
    text: "Exceptional at stakeholder communication. Hayk presents design decisions with data and empathy, making buy-in effortless.",
    initials: "RA",
},
  {
    name: "Kevin Park",
    role: "Accessibility Consultant",
    text: "His attention to accessibility and inclusive design sets him apart. Hayk ensures no user is left behind.",
    initials: "KP",
},
];

const column3: Testimonial[] = [
  {
    name: "Elena Vasquez",
    role: "Engineering Lead, AllyNow",
    text: "Hayk's design systems saved our team countless hours. Everything he builds is consistent, scalable, and beautifully documented.",
    initials: "EV",
},
  {
    name: "James Porter",
    role: "Head of Product",
    text: "His usability testing methodology is rigorous yet practical. We saw a 40% improvement in task completion rates after his redesign.",
    initials: "JP",
},
  {
    name: "Maria Santos",
    role: "Product Director, Postoplan",
    text: "Hayk redesigned our content management workflow and reduced onboarding time by half. Users loved the new interface.",
    initials: "MS",
},
  {
    name: "Natasha Petrova",
    role: "Design Director",
    text: "Fast, thoughtful, and incredibly detail-oriented. Hayk delivered a complete design system in half the time we expected.",
    initials: "NP",
},
];

// Карточка отзыва — glass-style
function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <div className="bg-surface-glass-strong backdrop-blur-[20px] border border-border-subtle rounded-lg p-4 card-shadow">
      {/* Аватар-инициалы + имя + роль */}
      <div className="flex items-center gap-3 mb-3">
        <div
          className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-text-on-brand shrink-0 bg-brand"
        >
          {t.initials}
        </div>
        <div>
          <p className="text-sm font-medium text-text-primary leading-tight">{t.name}</p>
          <p className="text-xs text-text-muted leading-tight">{t.role}</p>
        </div>
      </div>
      {/* Текст отзыва */}
      <p className="text-sm text-text-secondary leading-relaxed">{t.text}</p>
    </div>
  );
}

// Одна вертикальная карусель — контент дублируется для бесшовной петли
function VerticalColumn({
  items,
  direction,
  speed,
}: {
  items: Testimonial[];
  direction: "up" | "down";
  speed: number;
}) {
  return (
    <div className="vertical-carousel h-full">
      <div
        className={`vertical-carousel__track vertical-carousel__track--${direction}`}
        style={{ "--speed": `${speed}s`, "--gap": "28px" } as React.CSSProperties}
      >
        {/* Оригинал + дубликат = бесшовный loop */}
        {[...items, ...items].map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} t={t} />
        ))}
      </div>
    </div>
  );
}

export default function Testimonials() {
  return (
    <Section id="testimonials" variant="standard" bare className="relative" style={{ contain: "layout style" }}>
      {/* Раньше тут был сплошной фон, перекрывавший PixelBlast — убран,
          теперь PixelBlast виден сквозь секцию. Карточки сверху сами по себе непрозрачные. */}

      <div className="relative mx-auto max-w-[1280px] px-6">

        {/* Заголовок секции */}
        <SectionHeading>What People Saying</SectionHeading>

        {/* Мобилка: 2 горизонтальные карусели с анимацией + затемнение */}
        <div className="lg:hidden space-y-4">
          {/* Ряд 1 — влево */}
          <div className="h-carousel">
            <div
              className="h-carousel__track"
              style={{ "--speed": "8s", "--gap": "16px" } as React.CSSProperties}
            >
              {[...column1, ...column2, ...column1, ...column2].map((t, i) => (
                <div key={`row1-${i}`} className="w-[280px] shrink-0">
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>
          {/* Ряд 2 — вправо (противоположное направление) */}
          <div className="h-carousel">
            <div
              className="h-carousel__track h-carousel__track--reverse"
              style={{ "--speed": "10s", "--gap": "16px" } as React.CSSProperties}
            >
              {[...column3, ...column1, ...column3, ...column1].map((t, i) => (
                <div key={`row2-${i}`} className="w-[280px] shrink-0">
                  <TestimonialCard t={t} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Десктоп: 3 вертикальные карусели с анимацией */}
        <AnimatedContent distance={40} duration={0.8} delay={0} revealOverlay>
          <div className="relative h-[600px] overflow-hidden hidden lg:block">

            <div className="grid grid-cols-3 gap-8 h-full">
              <VerticalColumn items={column1} direction="down" speed={28} />
              <VerticalColumn items={column2} direction="up" speed={24} />
              <VerticalColumn items={column3} direction="down" speed={28} />
            </div>

            {/* Gradient fade */}
            <div className="absolute top-0 left-0 right-0 h-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to bottom, var(--surface-page), transparent)" }} />
            <div className="absolute bottom-0 left-0 right-0 h-24 z-10 pointer-events-none" style={{ background: "linear-gradient(to top, var(--surface-page), transparent)" }} />
          </div>
        </AnimatedContent>

      </div>
    </Section>
  );
}
