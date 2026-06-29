# SHARAVANAN R — Portfolio

Personal portfolio of Sharavanan R, Electronics & Communication Engineering student at Rajalakshmi Institute of Technology, Chennai. Built with a focus on performance, interactivity, and a premium dark aesthetic.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.9 (App Router, Turbopack) |
| Language | TypeScript 5 |
| UI Library | React 19 |
| Styling | Tailwind CSS 4 + Custom CSS |
| Animation | Framer Motion 12 |
| 3D Graphics | Three.js 0.185 |
| Smooth Scroll | @studio-freight/react-lenis |
| Icons | lucide-react |
| Form Backend | Web3Forms |
| Fonts | Bebas Neue · JetBrains Mono (via `next/font/google`) |
| Image Processing | sharp (build-time WebP conversion) |

---

## Project Structure

```
sharavanan-portfolio/
├── public/
│   ├── favicon-16x16.png       # Favicon source variants (keep for reference)
│   ├── favicon-32x32.png       # Copied to src/app/icon.png for serving
│   ├── apple-touch-icon.png    # Copied to src/app/apple-icon.png for serving
│   ├── site.webmanifest        # PWA manifest
│   ├── sharavanan.webp         # Hero photo (WebP, ~40 KB)
│   ├── Resume (2).pdf          # Downloadable resume
│   ├── innsole.webp            # Project images (WebP)
│   ├── printe.webp
│   ├── highnoontrivia.webp
│   ├── sololevelling.webp
│   ├── crowdshield.webp
│   ├── react.png               # Skill badge icons
│   ├── c++.png
│   ├── c.png
│   ├── firebase.png
│   ├── java.png
│   └── supabase.png
├── scripts/
│   └── optimize-images.mjs    # PNG → WebP conversion script
├── src/
│   ├── app/
│   │   ├── icon.png            # SR favicon served with cache-busting hash (copied from public/favicon-32x32.png)
│   │   ├── apple-icon.png      # iOS icon served via App Router (copied from public/apple-touch-icon.png)
│   │   ├── layout.tsx          # Root layout, next/font, preload, metadata
│   │   ├── page.tsx            # Page composition + dynamic imports + Lenis
│   │   └── globals.css         # Global styles, CSS variables, responsive layout
│   └── components/
│       ├── Navbar.tsx          # Fixed nav with hamburger dropdown
│       ├── Hero.tsx            # Landing section with typing animation
│       ├── About.tsx           # Bio + responsive HUD card
│       ├── Skills.tsx          # Interactive Three.js physics canvas (lazy-init)
│       ├── Projects.tsx        # Filterable project grid
│       ├── Journey.tsx         # Scroll-driven timeline
│       ├── Contact.tsx         # Form + social links with mouse-repel effect
│       └── ParallaxWrapper.tsx # Scroll-driven scale/fade HOC
├── .env.local                  # Local secrets (gitignored)
├── .env.example                # Env var reference (committed)
└── CLAUDE.md                   # AI assistant instructions
```

---

## Sections

**Hero** — Full-viewport landing with animated name, typing role rotator (*Electronics Engineer · Robotics Enthusiast · Automation Architect · Backend Developer*), photo, and gold corner brackets.

**About** — Two-column bio with a glassmorphic HUD card showing institution, degree, year, focus, and a live blinking status indicator.

**Skills** — Interactive Three.js canvas. Skill badges (React, C++, C, Firebase, Java, Supabase) behave as physics particles — drag them, they bounce off each other and return to center. The canvas initialises only when scrolled into view.

**Projects** — Filterable grid of 8 projects across Hardware, Backend, Fullstack, Frontend, and In Dev categories. Each card shows role, stack tags, status badge, and GitHub link.

**Journey** — Vertical timeline with a scroll-driven progress line that fills as you read through 5 milestones from 2023 to 2026.

**Contact** — Split panel: social links (GitHub, LinkedIn, Email) with a mouse-tracking repel effect on the left; Web3Forms-powered contact form on the right.

---

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
git clone https://github.com/sharan-06/sharavanan-portfolio.git
cd sharavanan-portfolio
npm install
```

### Environment Variables

Copy `.env.example` and fill in your key:

```bash
cp .env.example .env.local
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | API key from [web3forms.com](https://web3forms.com) — required for the contact form |

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Production Build

```bash
npm run build
npm run start
```

---

## Image Optimization

Project images are pre-converted to WebP at build time using `sharp`. To regenerate them after adding new images:

```bash
node scripts/optimize-images.mjs
```

| Image | Original | WebP |
|---|---|---|
| `sharavanan.png` (hero) | ~1,880 KB | ~40 KB |
| Project thumbnails | varies | 75% quality, max 800 px wide |

---

## Performance Notes

| Optimization | Detail |
|---|---|
| Hero image | Loaded with `fetchPriority="high"` + `<link rel="preload">` in `<head>` |
| Fonts | Self-hosted via `next/font/google` with `display: swap` — no extra DNS roundtrip |
| Code splitting | Below-fold sections (About, Skills, Projects, Journey, Contact) are dynamic imports |
| Skills canvas | `IntersectionObserver` defers Three.js RAF loop until section is in viewport |
| Bundle | `framer-motion` and `lucide-react` tree-shaken via `optimizePackageImports` |
| Console logs | Stripped from production build via `compiler.removeConsole` |

---

## Design System

| Token | Value |
|---|---|
| Background | `#050505` |
| Gold accent | `#FFD700` |
| Body text | `#A0A0A0` |
| Heading font | Bebas Neue |
| Mono font | JetBrains Mono |
| Glassmorphism | `backdrop-filter: blur(28px) saturate(180%) brightness(1.06)` |

Responsive breakpoint: **768px** (mobile ↔ desktop). Mobile layout uses `100svh` units, a flex-based centering strategy for the hero, and a compact dropdown navbar.

---

## Projects Featured

| Project | Category | Stack |
|---|---|---|
| INNSOLE | Hardware | Li-Po Battery, Peltier Module, DC-DC Buck Converter |
| TRACKEASY | Backend | Flutter, Dart, OpenStreetMap API, Firebase |
| PRINT-E | Backend | Python, NoSQL, Firebase, Next.js |
| KERA AIR | Backend | Next.js, MQTT, Firebase, NoSQL |
| HIGH NOON TRIVIA | Fullstack | Next.js, Open-Trivia API |
| SOLO LEVELLING APP | Fullstack | Google ML Kit, Flutter, Isar |
| CROWDSHIELD | Frontend | Edge-AI, Next.js, ESP32 |
| J.A.R.V.I.S | In Dev | Python, Ollama, FastAPI, Linux |

---

## License

This project is personal portfolio work. All content, design, and code are © 2026 Sharavanan R.
