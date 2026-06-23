# Hayk Manukyan — Portfolio

Personal portfolio website for **Hayk Manukyan**, UX / Product Designer with 6+ years of experience.

**Live:** [haykportfolio-smoky.vercel.app](https://haykportfolio-smoky.vercel.app)

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 |
| Animations | GSAP, motion/react, custom CSS keyframes |
| 3D / WebGL | Three.js + postprocessing (PixelBlast background) |
| UI Components | shadcn/ui (base), custom shared components |
| Font | Roboto (Google Fonts) |
| Icons | Flaticon uicons CDN |
| Forms | Formspree |
| Hosting | Vercel |

## Architecture

```
src/
  app/              — Next.js App Router (layout, page, globals.css)
  components/
    primitives/      — design-system building blocks (Section, Card, Button, SectionHeading, ThemeToggle)
    sections/        — 9 page sections (Header, Hero, Projects, etc.)
    shared/          — reusable animated components (PixelBlast, LogoLoop, Lottie, etc.)
  lib/               — Utilities + hooks (cn, useTheme, useCarouselAutoScroll)
public/
  images/            — All static assets (SVG icons, PNG photos)
```

## Sections

1. **Hero** — Animated greeting, rotating word scramble, stats, photo
2. **Projects** — 6 project cards with spotlight effect
3. **Skill Carousel** — Infinite horizontal logo loop (21 skills)
4. **About Me** — Bio, social links folder, hard/soft skills
5. **Expertise** — 6 areas with animated Lottie icons
6. **Contact** — ElectricLogo animation + Formspree form
7. **Testimonials** — Vertical/horizontal carousels
8. **Footer** — Copyright, quote, signature

## Key Features

- Dark + light theme (toggle, persisted) with glass-morphism design system
- WebGL PixelBlast animated background (Three.js)
- Mobile-first responsive design with horizontal carousels
- BubbleMenu with GSAP animations (mobile navigation)
- Touch-interactive carousels (pause on press)
- Auto-hide header on scroll
- Formspree contact form integration

## Development

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # Production build
```

## License

All rights reserved. This is a personal portfolio project.
