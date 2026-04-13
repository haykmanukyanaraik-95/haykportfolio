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
- **Styling:** Tailwind CSS
- **Font:** Roboto (Google Fonts) — free substitute for proprietary fonts
- **Icons:** Flaticon CDN (user provides specific icons)
- **Forms:** Formspree (or similar) for contact form email delivery
- **Hosting:** Vercel (free tier)
- **Version Control:** GitHub

## Design System
Visual style combines two references with custom branding:

### Theme Foundation (from Spotify DESIGN.md)
Dark immersive backgrounds with layered surfaces:
- Background Level 0: `#121212` (deepest)
- Background Level 1: `#181818` (cards, containers)
- Background Level 2: `#1f1f1f` (interactive surfaces)
- Background Level 3: `#252525` (elevated cards)

### Layout & Structure (from Uber DESIGN.md)
- Split hero: text/CTA left, visual right
- Max container width: ~1136px, centered
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

### Button Style
Pill-shaped (border-radius: 9999px) — from both Spotify and Uber.
- Primary: `#F23F3B` background, white text
- Secondary: transparent, white text, `1px solid #555` border
- Hover: darken background or subtle background fill

### Typography (Roboto)
- Display/Hero: 52px, weight 700, line-height 1.2
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

## Key Animations
1. Hero title word switcher (horizontal transition)
2. Skill carousel (continuous horizontal scroll)
3. Testimonial double-row carousel (opposite directions)
4. Smooth scroll navigation
5. Potential: background visual effects from React libraries (user may provide)

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

## Current Status
**Phase 1 — Documentation (IN PROGRESS)**
- [x] Downloaded DESIGN.md files (Spotify + Uber)
- [x] Created CLAUDE.md
- [ ] User confirms CLAUDE.md is correct
- [ ] Proceed to Phase 2: Project initialization
