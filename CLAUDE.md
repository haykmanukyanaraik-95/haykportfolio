# Portfolio — Hayk Manukyan

## About the User
**Hayk Manukyan** — UX / Product Designer working since 2018 (6+ years).
- Education: Bachelor's in Design (Culture University of Yerevan, 2012-2018)
- Currently: Master's in Interaction Design (The Lisbon School of Architecture, 2025-Present)
- Current role: Upper UX Designer at Devteam.Space (Dec 2023-Present)
- Previous: Animoca Brands, AllyNow, Postoplan
- Languages: Armenian (native), Russian (proficient), English (proficient), Chinese (intermediate)
- Social: LinkedIn, Behance (exact URLs to be added)
- Email: haykmanukyanraik@gmail.com (also for Formspree contact form)
- Zero programming knowledge — all explanations must be in simple, non-technical language.
- Communicates in Russian or English

## Project
Personal portfolio / landing page. Single-page site with smooth scroll navigation.
This is a serious project intended for social media promotion and client acquisition.

## Tech Stack
- **Framework:** Next.js (React)
- **UI Components:** shadcn/ui (customized with project theme)
- **Animations & Effects:** ReactBits (135+ animated React components), motion (framer-motion)
- **3D/WebGL:** Three.js + postprocessing (PixelBlast background effect)
- **Styling:** Tailwind CSS v4
- **Font:** Roboto (Google Fonts) — free substitute for proprietary fonts
- **Icons:** Flaticon CDN uicons-regular-rounded v2.6.0 (user provides specific icons)
- **Forms:** Formspree (or similar) for contact form email delivery
- **Hosting:** Vercel (free tier)
- **Version Control:** GitHub
- **MCP Servers:** shadcn (component install), reactbits (animated components)

## Design System
Visual style combines two references with custom branding:

### Theme Foundation (from Spotify DESIGN.md)
Dark immersive backgrounds with layered surfaces:
- Background Level 0: `#0a0a0a` (deepest)
- Background Level 1: `#181818` (cards, containers)
- Background Level 2: `#1f1f1f` (interactive surfaces)
- Background Level 3: `#252525` (elevated cards)

### Layout & Structure (from Uber DESIGN.md)
- Split hero: text/CTA left, visual right
- Max container width: ~1280px, centered
- 8px spacing grid
- Efficient, information-dense layout — not overly airy
- Section vertical spacing: 64-96px between major sections

### Custom Brand Colors
- **Primary Accent (Brand Red):** `#F23F3B` — CTAs, active states, highlights
- **Primary Hover:** `#D93531` — darker red for hover states
- **Text Primary:** `#ffffff` — headings and primary text
- **Text Secondary:** `#b3b3b3` — descriptions, muted labels
- **Text Muted:** `#6b6b6b` — tertiary text
- **Success Green:** `#22c55e` — "Available for freelance" badge
- **Border:** `#2a2a2a` — subtle borders on dark surfaces
- **Card Border:** `#333333` — card outlines when needed

### Button Style (актуальное — что реально в коде, финал 2026-04-15 вечер)
- Primary (View Work, Let's talk, Send Message): GlareHover (#F23F3B, glareColor=#ffa8a8, 800ms) + ShinyText (speed=3.5, delay=3, pauseOnHover) + rounded-lg (8px) + иконка fade-in on hover
- Secondary (Download CV, View All Works): StarBorder (color=#F23F3B, speed=8s) + ShinyText + rounded-lg
- У всех кнопок: px-5 py-3, text-base font-medium
- Иконка fade-in: `transition-all duration-300 ease-out` (было 150ms — стало плавнее)
- **Scale hover УБРАН с кнопок** — иконка достаточна
- Рамка secondary кнопок при hover: `hover:border-white/15`

### Typography (Roboto)
- Display/Hero: 48px (text-5xl), weight 700, line-height 1.2
- Section Heading: 36px, weight 700, line-height 1.2
- Card Title: 24px, weight 600, line-height 1.3
- Body: 16px, weight 400, line-height 1.5
- Button: 14-16px, weight 500
- Caption/Small: 12-14px, weight 400

### Shadows (for dark backgrounds — must be heavy to be visible)
- Card shadow: `rgba(0,0,0,0.3) 0px 8px 8px`
- Elevated: `rgba(0,0,0,0.5) 0px 8px 24px`
- Subtle lift: `rgba(0,0,0,0.2) 0px 4px 12px`

### Border Radius Scale
- Pill (buttons): 9999px
- Cards: 12px
- Inputs: 8px
- Badges: 9999px
- Circle (avatars, icons): 50%

## Page Structure (Home — single landing page)

### Header (sticky)
- Logo (left) — provided by user
- Nav links (center): Home, My Work, About Me, Contact Me — smooth scroll
- CTA button (right): "Contact" / "Связаться"
- Mobile: hamburger menu

### Section 1: Hero
- LEFT: Title "Hello I'm Hayk 👋 A Designer With Passion To [animated word]"
  - Word "Research" animates (horizontal switch to other words — user will provide word list)
- LEFT: Two buttons:
  - "View Work" (with icon) — scrolls to Latest Projects
  - "Download CV" (with icon) — downloads PDF
- LEFT: Stats row:
  - 7 Years of Experience
  - 125+ Projects Completed
  - 72 Happy Clients
  - 8 Award Wins
- RIGHT: User's photo + "Available for freelance" badge with pulsing green dot

### Section 2: Latest Projects
- 3x2 grid (6 cards)
- Each card: image + title + subtitle (+ icon)
- Content provided by user later

### Section 3: Skill Carousel
- Horizontal infinite scroll animation (left to right, continuous)
- Separator icon between each skill (to be decided)
- Skills from CV:
  - Figma, Illustrator, Photoshop, Zeplin, Miro, Framer, Midjourney, Relume
  - Open AI, Gemini, Maze
  - (User may adjust this list)

### Section 4: Areas of Expertise
- 3x2 grid (6 cards)
- Each card: large icon + title + description
- From CV (user selects 6 from this list):
  - Design & Prototyping Tools Mastery
  - User Research & Usability Testing
  - AI Driven Solutions
  - Problem Solving & Critical Thinking
  - IA & Content Strategy
  - Accessibility & Inclusive Design
  - Interaction In Blockchain
  - Data-Driven Design & Analytics
  - Design Phase Management & Scalability
  - Agile & Iterative Design Processes
  - Cross-Functional Collaboration & Communication
  - Emerging Technology & AI Integration

### Section 5: Let's Talk (Contact)
- Full-width background photo (edge to edge) — user will provide photo
- Contact form card floating on right side:
  - Title: "Get in Touch with Me!"
  - Subtitle: "Have a question, feedback, or just want to say hello? I'd love to hear from you! Your communication matters to me."
  - Inputs: Name, Email, Message
  - CTA: "Send Message"
- Form sends data to user's email via Formspree

### Section 6: Skills
- 3-column layout, each skill = chip card (icon + text)
- From CV (user will confirm final selection + provide icons):

**Technical Skills (Design & Tools):**
Figma, Illustrator, Photoshop, Zeplin, Miro, Framer, Midjourney, Nanobana, Relume

**Hard Skills (Research, Strategy & Collaboration):**
Open AI, Gemini, Maze, Qualitative Research, Quantitative Research, UCD, HCD,
Design Systems, Cross-Functional Communication, Leading, Product Management,
Accessibility, Data-Driven Design, Decentralized Design, Product Branding,
Color Theory, Responsive Design, WCAG Colors

**Soft Skills (Principles):**
Critical Thinking, Leadership, Problem Solving, Adaptability,
Attention to Details, Empathy Builder

### Section 7: Testimonials
- Title: "Kind Words From People I've Worked With"
- Review cards: icon (top) + review text + avatar + name + role
- Two-row horizontal carousel with opposite-direction animations
- Content provided by user later

### Section 8: Footer
- Copyright: © 2026 Hayk Manukyan. All rights reserved.
- Quote: Live Love Laugh
- Signature: SVG icon (provided by user)

## Key Animations (актуальное)
1. Hero rotating word — DecryptedText scramble (только красное слово, 9 слов в ротации, первое через 3с, далее каждые 3с, speed=80)
2. PixelBlast — WebGL фон на всю страницу (Three.js, scrollable, color=#141011, pixelSize=8, edgeFade=0.2, patternScale=4.5)
3. GlareHover — блик при наведении на primary-кнопки
4. StarBorder — анимированная бегущая обводка на secondary-кнопках (speed=8s, пауза ~3с)
5. SpotlightCard — радиальный красный spotlight при наведении на карточки проектов
6. TiltedCard — 3D-наклон фото в Hero (rotateAmplitude=4, scaleOnHover=1.03)
7. AnimatedContent (GSAP) — каскадное появление элементов при скролле/загрузке
8. LogoLoop — бесконечный горизонтальный скролл для SkillCarousel ✅
9. VerticalCarousel — 3 вертикальные карусели для Testimonials (CSS animation, left↓ center↑ right↓) ✅
10. Smooth scroll navigation — через `href="#anchor"` (браузерный)

## Work Rules
- ALWAYS ask before making decisions — even small ones
- Explain what you're about to do before doing it
- **CRITICAL: Update this CLAUDE.md at the end of EVERY work session** — save current status, what was done, what's next. This prevents context loss between sessions.
- All content from CV is a DRAFT — user will confirm/change everything during development. Do not treat CV data as final.
- All code comments in Russian
- User has zero coding knowledge — explain everything simply
- User provides icons via Flaticon CDN links
- User may provide React animation components from external resources
- Test responsiveness (mobile-first approach)
- Links (LinkedIn, Behance) will be provided later
- Section content (expertise cards, skills, testimonials, projects) will be finalized during development

## Reference Files
- `DESIGN-spotify.md` — Spotify design system (dark theme reference)
- `DESIGN-uber.md` — Uber design system (layout & structure reference)
- `awesome-design-md/` — additional design system references if needed

## Project File Structure
```
hayk-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          — корневой layout (Roboto, SEO meta, BackgroundEffect, uicons regular+solid CDN)
│   │   ├── page.tsx            — главная страница (собирает все секции)
│   │   ├── globals.css         — дизайн-система (цвета, переменные, @import tw-animate-css)
│   │   └── favicon.ico
│   ├── components/
│   │   ├── sections/
│   │   │   ├── Header.tsx          ✅ Десктоп sticky навбар + мобилка BubbleMenu overlay
│   │   │   ├── Hero.tsx            ✅ Мобилка: фото сверху, центрирован, кнопки в ряд
│   │   │   ├── Projects.tsx        ✅ Мобилка: горизонтальная карусель (h-carousel)
│   │   │   ├── SkillCarousel.tsx   ✅ Мобилка: speed=40, десктоп: speed=80
│   │   │   ├── Expertise.tsx       ✅ Мобилка: горизонтальная карусель (h-carousel)
│   │   │   ├── AboutMe.tsx         ✅ Текст+папка слева + Skills карточка справа
│   │   │   ├── Contact.tsx         ✅ Мобилка: лого 2x меньше, карточка p-4
│   │   │   ├── Testimonials.tsx    ✅ Мобилка: 2 горизонт. карусели / десктоп: 3 вертикальных
│   │   │   └── Footer.tsx          ✅ Мобилка: вертикальный layout / десктоп: горизонтальный
│   │   ├── shared/
│   │   │   ├── AnimatedContent.tsx     — GSAP появление (+ `revealOverlay`)
│   │   │   ├── BackgroundEffect.tsx    — обёртка PixelBlast (dynamic, ssr:false)
│   │   │   ├── BubbleMenu.tsx/.css     — мобильное меню с GSAP bubble-pill анимацией (NEW 2026-04-17)
│   │   │   ├── CountUp.tsx             — анимированный счётчик (Hero stats)
│   │   │   ├── DecryptedText.tsx       — scramble текст (Hero rotating word)
│   │   │   ├── ElectricLogo.tsx        — эл. обводка по контуру SVG (Contact, + IntersectionObserver)
│   │   │   ├── Folder.tsx/.css         — анимированная папка соцсетей (About Me, hover+tap)
│   │   │   ├── GlareHover.tsx/.css     — блик (primary кнопки)
│   │   │   ├── HorizontalCarousel.css  — горизонтальная карусель (Projects/Expertise/Testimonials mobile)
│   │   │   ├── LogoLoop.tsx/.css       — бесконечный loop (SkillCarousel)
│   │   │   ├── PixelBlast.tsx/.css     — WebGL фон (Three.js)
│   │   │   ├── ShinyText.tsx           — переливающийся текст
│   │   │   ├── SpotlightCard.tsx/.css  — радиальный spotlight (Projects, Expertise, About Me)
│   │   │   ├── StarBorder.tsx/.css     — анимированная обводка (secondary кнопки)
│   │   │   ├── TiltedCard.tsx/.css     — 3D наклон (фото Hero)
│   │   │   └── VerticalCarousel.css    — keyframes для вертикальных каруселей (Testimonials desktop)
│   │   └── (ui/ удалена — пустая)
│   └── lib/
│       └── utils.ts            — cn() утилита (shadcn инфраструктура)
├── public/
│   └── images/
│       ├── logo.svg                — логотип
│       ├── hayk-photo.png          — фото для Hero
│       ├── hayk-photo2.png         — НЕ ИСПОЛЬЗУЕТСЯ (осталась от старого About Me layout)
│       ├── Signature.svg           — подпись для Footer
│       ├── projects/               — 6 обложек проектов
│       ├── skills/                 — 21 SVG иконка скиллов
│       ├── expertise/              — 6 SVG иконок для Expertise
│       └── Scoial Link Icons/      — SVG логотипы соцсетей (LinkedIn, Instagram, Behance)
├── CLAUDE.md                   — этот файл
├── README.md                   — короткое описание проекта
├── components.json             — shadcn конфиг (base-nova style, neutral palette)
├── .mcp.json                   — MCP серверы (shadcn + reactbits)
├── _notes/                     — (gitignored) Obsidian vault — рабочие заметки между сессиями
├── DESIGN-spotify.md           — (gitignored) ref дизайна
├── DESIGN-uber.md              — (gitignored) ref дизайна
├── spotify/DESIGN.md           — (gitignored) ref
└── awesome-design-md/          — (gitignored) ref
```

### npm зависимости (из package.json)
**Прод:** `@base-ui/react`, `class-variance-authority`, `clsx`, `gsap`, `motion`, `next` (16.2.3), `postprocessing`, `react` (19.2.4), `tailwind-merge`, `three`, `tw-animate-css`
**Dev:** `@tailwindcss/postcss`, `typescript`, `eslint`, `eslint-config-next`, `shadcn`, `tailwindcss` v4
*(`lucide-react` удалён в cleanup 2026-04-14 — не использовался.)*

## Current Status
**Phase 1 — Documentation (COMPLETE)**
- [x] Downloaded DESIGN.md files (Spotify + Uber)
- [x] Created CLAUDE.md
- [x] User confirmed CLAUDE.md

**Phase 2 — Project Initialization (COMPLETE)**
- [x] Created Next.js project (TypeScript, Tailwind CSS v4, App Router)
- [x] Initialized Git repository
- [x] Installed shadcn/ui (base-nova style, neutral palette)
- [x] Configured design system: all brand colors, Roboto font, dark theme
- [x] Created folder structure: sections, shared, ui, hooks, lib, assets
- [x] Created placeholder components for all 8 sections + page assembly
- [x] SEO meta tags configured (title, description, OpenGraph)
- [x] Flaticon uicons CDN connected (regular-rounded v2.6.0)
- [x] MCP servers configured: shadcn + reactbits (.mcp.json)
- [x] Build passes with zero errors

**Phase 3 — Section Development (9 из 9 — ВСЕ ГОТОВО ✅)**
- [x] Header — auto-hide, glassmorphism, GlareHover CTA
- [x] Hero (#home) — DecryptedText scramble, GlareHover/StarBorder кнопки, **CountUp для статистики** (7/125+/72/8), TiltedCard фото, bg-black/20 badge
- [x] PixelBlast background — WebGL фон на всю страницу
- [x] Latest Projects (#work) — 6 карточек, SpotlightCard, solid иконки Mobile/Web в brand-red, star убрана, sync appearance
- [x] SkillCarousel — 21 скилл, text-lg, Jitter без подписи, Maze opacity-50
- [x] Areas of Expertise (#expertise) — 3×2 grid, 6 кастомных SVG-иконок 36×36 brand-red. **id изменён с "about" на "expertise"** (2026-04-15 поздний вечер)
- [x] **About Me** (#about) — текст+папка слева (без карточки) + Skills карточка справа, Folder соцсети (hover-open). Файл `AboutMe.tsx`. **Перестроена 2026-04-17**
- [x] **Contact** (#contact) — ElectricLogo (+ IntersectionObserver для CPU) + форма, **синхронное появление** (один AnimatedContent). Formspree = заглушка
- [x] **Testimonials** — 3 вертикальные карусели (левая↓, центральная↑, правая↓), 12 сгенерированных отзывов, gradient overlays, solid #0a0a0a фон
- [x] **Footer** — Copyright | Quote (abs center) | Signature SVG, h-px separator
- [x] **Unified glass-style** на всех стеклянных поверхностях: `bg-white/[0.015] backdrop-blur-[20px] border-white/10 hover:border-white/15`
- [x] **Глобальное CSS**: скроллбар скрыт, horizontal overflow запрещён (`overflow-x: clip`, не `hidden` — иначе ломает sticky)

**Project Cleanup (2026-04-14)**
- [x] Удалены Next.js boilerplate SVG: file/globe/next/vercel/window.svg
- [x] Удалён дубль `public/images/Project Cover images/`
- [x] Удалены пустые папки `src/assets/`, `src/hooks/`
- [x] Почищены все `.DS_Store` файлы
- [x] Удалена неиспользуемая npm-зависимость `lucide-react`
- [x] Обновлён README.md
- [x] Build passes чисто

**Project Cleanup (2026-04-16)**
- [x] Удалены неиспользуемые shared-компоненты: `ElectricBorder.tsx/.css`, `PixelLogo.tsx`, `GradualBlur.tsx`
- [x] Удалён GradualBlur import + закомментированный JSX из `layout.tsx`
- [x] Удалён `src/components/ui/button.tsx` (shadcn placeholder, не использовался)
- [x] Почищены все `.DS_Store` файлы
- [x] Оставлены: `src/lib/utils.ts`, `components.json` (shadcn инфраструктура)
- [x] ElectricLogo: добавлен IntersectionObserver (пауза анимации вне viewport)

### Header Details (for reference)
- Logo: public/images/logo.svg (32x30px) + "Hayk" (text-lg, white) "Manukyan" (text-lg, text-muted), gap-3
- Nav links: Home, My Work, About Me, Contact Me (text-sm, gap-11)
- CTA: "Let's talk" — GlareHover (bg-brand, glareColor=#ffa8a8, 800ms) + ShinyText (pauseOnHover)
- Auto-hide: скролл вниз → скрывается, скролл вверх → появляется (transition 300ms)
- Glass effect: bg-[#0a0a0a]/80 backdrop-blur-xl border-white/5
- Mobile: hamburger menu

### Hero Details (for reference)
- Title: "Hello I'm A Designer With / Passion To [слово]" (select-none cursor-default)
  - Scramble эффект (DecryptedText) — только на красном слове, inline с "Passion To" (whitespace-nowrap)
  - Первое переключение через 3 сек, далее каждые 3 сек, speed={80}
  - dynamic import с ssr: false (предотвращает hydration mismatch)
- Rotating words: Research, Design, Create, Innovate, Orchestrating, Automating, Optimising, Leading, Coordinating
- AnimatedContent: каскадное появление (заголовок 0s → кнопки 0.2s → фото 0.3s → статистика 0.4s)
- Кнопки:
  - "View Work" — GlareHover (bg-brand, glareColor=#ffa8a8) + ShinyText (speed=3.5, delay=3, pauseOnHover) + scale hover
  - "Download CV" — StarBorder (color=#F23F3B, speed=8s) + ShinyText (speed=3.5, delay=3, pauseOnHover) + scale hover
  - Gap между кнопками: gap-6
  - rounded-lg (8px), px-5 py-3
- Статистика: 7 / 125+ / 72 / 8 — компактная, text-secondary, без анимации, mt-14 lg:mt-20
- Фото: стеклянная карточка (bg-white/[0.03] backdrop-blur-3xl rounded-lg p-3) →
  - TiltedCard внутри (rotateAmplitude=4, scaleOnHover=1.03, 340x440px, фото border-radius 7px)
  - Бейдж "Available for freelance" поверх фото (bg-black/60 backdrop-blur-2xl rounded-full)
  - Фото: public/images/hayk-photo.png
- CV: public/images/Hayk_Manukyan_CV.pdf — ОЖИДАЕТ файл от пользователя
- Контейнер: max-w-[1280px], px-6

### Projects Details (for reference)
- Заголовок "Latest Projects" — AnimatedContent (threshold=0, delay=0.5, появляется с Hero)
- 6 карточек в сетке 3x2 (sm:2col, lg:3col, gap-5)
- Карточка: SpotlightCard (spotlightColor=rgba(242,63,59,0.15)) + стеклянный стиль (bg-white/[0.03] backdrop-blur-3xl)
- Структура карточки: фото сверху (padding p-3, rounded-md) → снизу: название (слева) + теги с ★ разделителем (справа)
- Tooltip "View Page — Coming Soon" поверх фото при наведении (задержка 0.5s, исчезает сразу)
- Hover: border-white/10, scale 1.02
- Кнопка "View All Works" — StarBorder + ShinyText + иконка fi-rr-eye
- Фото проектов: public/images/projects/ (housed, fintrack-pro, medicare-ux, shopflow, edupath, travelmind)
- Проекты: Housed (Real Estate/Mobile App), FinTrack Pro (FinTech/Web App), MediCare UX (Healthcare/Mobile App), ShopFlow (E-Commerce/Web App), EduPath (EdTech/Mobile App), TravelMind (Travel/Web App)

### SkillCarousel Details (for reference)
- 21 скилл: Figma, Illustrator, Photoshop, Adobe, Zeplin, Framer, Jitter, Claude, Gemini, Perplexity, Maze, UX Tweak, Useberry, HTML, CSS, React, Next.js, Slack, Jira, ClickUp, Microsoft 365
- Файлы в `public/images/skills/` — **PascalCase с расширением .svg** (пользователь назвал вручную):
  `Figma.svg Illustrator.svg Photoshop.svg Adobe.svg Zeplin.svg Framer.svg Jitter.svg Claude.svg Gemini.svg Perplexity.svg Maze.svg "UX Tweak.svg" Useberry.svg HTML.svg CSS.svg React.svg Next-js.svg Slack.svg Jira.svg ClickUp.svg Microsoft_365.svg`
- LogoLoop параметры: `speed={80} gap={75} hoverSpeed={30} logoHeight={38} direction="left" fadeOut fadeOutColor="#0a0a0a" scaleOnHover`
- renderItem: ячейка `logoloop__node gap-3` → иконка `h-[38px] w-auto grayscale` + текст `text-text-muted text-base font-medium`
- Секция без заголовка, `py-16`, полная ширина (не max-w-1280) для edge-to-edge fade
- Fade в LogoLoop.css увеличен: `clamp(40px, 15%, 240px)` (было `clamp(24px, 8%, 120px)`)

### Expertise Details (for reference — финал 2026-04-15)
- 6 областей (пользователь выбрал из 12): Design and Prototyping Tools Mastery, User Research and Usability Testing, AI Driven Practice, Data Driven Design and Analytics, Design Phase Management and Scalability, Cross Functional Collaboration and Communication
- Описания (2 предложения на каждую) — сгенерированы Claude, см. `src/components/sections/Expertise.tsx`
- Иконки — **ПЛЕЙСХОЛДЕРЫ из Flaticon uicons** (пользователь даст финальные позже): palette / search / brain / chart-histogram / settings-sliders / users
- **Иконка — простой `<i>`, 24px, brand red `#F23F3B`, `display: block`** (display:block убирает inline-baseline shift у шрифт-иконок), `mb-6` до заголовка
- Структура карточки: иконка (mb-6) → h3 `text-base font-semibold text-white mb-3` → p `text-sm text-text-secondary leading-relaxed`
- Выравнивание: `flex flex-col items-start text-left` (левое — глобальное правило)
- Карточка = SpotlightCard: `h-full bg-white/[0.06] backdrop-blur-[20px] border border-white/5 hover:border-white/15 rounded-lg transition-transform duration-200 hover:scale-[1.02] p-4`
- AnimatedContent: `distance={40} duration={0.7} delay={index * 0.1} revealOverlay`
- `id="expertise"` — отдельный id (навигация "About Me" теперь ведёт на секцию About Me)
- **Без cursor-pointer** — карточка ничего не кликает

### About Me Details (for reference — перестроена 2026-04-17)
- Файл: `src/components/sections/AboutMe.tsx`
- `id="about"` — Header-ссылка "About Me" ведёт сюда
- `py-[127px] lg:py-[176px]`
- **Layout: 2 блока в ряд** (`flex-row, items-center`):
  - **Левая (без карточки)**: заголовок `text-2xl sm:text-3xl lg:text-4xl font-bold` → описание `text-sm` → текст про соцсети `text-sm text-muted` → Folder (red, size=1.2, hover-open). Ширина `lg:w-[403px]`
  - **Правая**: SpotlightCard с borderGlow, Hard Skills (12) + Soft Skills (12), pill chips (`fi-sr-star` + `text-xs`), gap `gap-[7px]`
- **Folder** (`shared/Folder.tsx`): анимированная папка, открывается при hover, внутри 3 бумажки с иконками соцсетей (LinkedIn, Instagram, Behance), `transformOrigin: "top left"`
- **Social links**: LinkedIn (`/in/hayk-manukyanofficial/`), Instagram (`/_______hayk_________/`), Behance (`/haykmanukyanofficial`)

### Testimonials Details (for reference — 2026-04-16)
- 3 вертикальные карусели: левая↓, центральная↑, правая↓ (CSS animation)
- 12 сгенерированных отзывов (4 на колонку) на основе опыта Hayk
- Glass-карточки, красные аватар-инициалы (все `bg-brand`)
- Gradient overlays (`linear-gradient` to/from `#0a0a0a`) сверху и снизу (GradualBlur не используется)
- Сплошной `#0a0a0a` фон за секцией (блокирует PixelBlast, ±4px overflow)
- Hover-пауза убрана — непрерывная анимация
- CSS keyframes: `VerticalCarousel.css`
- `py-[127px] lg:py-[176px]`

### Footer Details (for reference — 2026-04-16)
- 3 элемента в одну линию: Copyright (left) | Quote centered absolutely | Signature SVG (right)
- Copyright: "© 2026 Hayk Manukyan. All rights reserved." (`text-xs text-text-muted`)
- Quote: "Live Love Laugh" (`text-sm text-text-muted`)
- Signature: `/images/Signature.svg` (`h-10 opacity-30`)
- Разделительная линия `h-px bg-white/10` над контентом

### ⚠️ Glass-эксперименты (GlassIcons/GlassSurface/GlassChip) удалены
2026-04-15 потрачен целый день на попытки собрать "стеклянный эффект" для иконок Expertise — ни один вариант не заработал. Все удалены. Финал: простая иконка в brand red.
**Правило**: не пытаться снова. См. `_notes/Decisions.md` → "Glass-эксперименты ЗАКРЫТЫ".

### Design Decisions (for reference)
- Background: #0a0a0a (основной), surface-0 = #0a0a0a
- Сетка: все секции используют max-w-[1280px] px-6 — единая вертикальная линия
- Кнопки: rounded-lg (8px), hover scale 1.04, active scale 0.97
- Фото внутри карточки: border-radius всегда на 10% меньше чем у карточки
- ShinyText: все кнопки, speed=3.5, delay=3, pauseOnHover=true
- GlareHover: primary кнопки (glareColor=#ffa8a8, opacity=0.3, angle=-30, size=275, duration=800ms)
- StarBorder: secondary кнопки (color=#F23F3B, speed=8s, с паузой ~3s)
- SpotlightCard: карточки проектов (красный spotlight при наведении)

### PixelBlast Background (for reference)
- Компонент: src/components/shared/PixelBlast.tsx (Three.js WebGL)
- Обёртка: src/components/shared/BackgroundEffect.tsx (dynamic import, ssr: false)
- Подключён в layout.tsx как absolute фон (скроллится с контентом)
- Параметры: variant="square", pixelSize=8, color="#141011", patternScale=4.5, patternDensity=1, rippleSpeed=0.3, rippleThickness=0.23, speed=1, edgeFade=0.2, transparent

---

## 📚 Obsidian Vault — рабочие заметки
В папке `_notes/` (gitignored — локально) — структурированные заметки по сессиям:
- `_notes/INDEX.md` — точка входа, список всех заметок
- `_notes/Next Session.md` — что делать в следующей сессии (**читать при старте**)
- `_notes/Sessions.md` — лог работы (новые сверху)
- `_notes/Decisions.md` — все принятые решения (цвета, анимации, параметры)
- `_notes/User Profile.md` — про Hayk, стиль коммуникации
- `_notes/Components.md` — справка по shared-компонентам
- `_notes/Open Questions.md` — открытые вопросы, ждущие ответа

**Правила**:
- Читай `_notes/Next Session.md` первым в новой сессии
- Обновляй `_notes/Sessions.md` и `_notes/Next Session.md` в конце каждой сессии
- Обновляй `_notes/Decisions.md` сразу после принятия решения
- Когда получаешь ответ на вопрос из `_notes/Open Questions.md` — перенеси в `_notes/Decisions.md` и удали из Open Questions

---

## 🔖 Next Session Pickup — Финализация (все 9/9 секций готовы)

**ВАЖНО: это инструкция для новой сессии. При старте прочитай этот блок первым.**
**ПОДРОБНАЯ ВЕРСИЯ**: `_notes/Next Session.md` — там детальный план.

### Состояние проекта: 9 из 9 секций готовы ✅
**Все секции завершены**: Header, Hero, Projects, SkillCarousel, Expertise, About Me, Contact, Testimonials, Footer + PixelBlast фон + полировка дизайн-системы.

### Порядок секций в page.tsx (финал 2026-04-17)
```
Hero (#home) → Projects (#work) → SkillCarousel → About Me (#about)
→ Expertise (#expertise) → Contact (#contact) → Testimonials → Footer
```

### Следующие шаги — финализация
1. **Formspree endpoint** для Contact — заменить console.log заглушку
2. **CV PDF** для Hero Download CV button
3. **Реальные отзывы** для Testimonials (сейчас 12 сгенерированных)
4. **Текст About Me** — финализация (сейчас черновик)
5. **Удалить `hayk-photo2.png`** — не используется (спросить пользователя)
6. **Деплой на Vercel**

### 📚 ОБЯЗАТЕЛЬНО прочитать в новой сессии (по приоритету)
1. `_notes/Next Session.md` — полный план финализации
2. `_notes/Sessions.md` — последние сессии (2026-04-17: mobile + About Me rebuild)
3. `_notes/Decisions.md` — все дизайн-решения
4. `_notes/Components.md` — справка по shared (BubbleMenu, HorizontalCarousel — новые)
5. `_notes/Open Questions.md` — отложенные вопросы

### Правила поведения
- **ВСЕГДА уточнять перед решениями** (даже мелкими) — главное правило пользователя
- Все комментарии в коде — **на русском**
- Объяснения — **простыми словами**
- Обновлять `_notes/Sessions.md` и `_notes/Next Session.md` по ходу работы
- Обновлять `_notes/Decisions.md` **сразу** после принятия решения
- В конце сессии — **чистка/обновление всех заметок** (пользователь всегда напоминает)

### Дизайн-система (финал — применять ко всему новому)
**Glass**: `bg-white/[0.015] backdrop-blur-[20px] border-white/10 hover:border-white/15`
**Section padding** (финал 2026-04-17): Projects/Expertise/About/Testimonials `py-[102px] lg:py-[176px]`; Contact `py-[92px] lg:py-[161px]`; SkillCarousel `py-[85px] lg:py-[106px]`; Hero `pt-[82px] pb-[49px] lg:pt-[141px] lg:pb-[86px]`
**Mobile carousels**: Projects 6s, Expertise 7s, Testimonials 8s/10s — `HorizontalCarousel.css`, dark fade 10px, pause on `:active`
**Card padding по умолчанию**: `p-4`
