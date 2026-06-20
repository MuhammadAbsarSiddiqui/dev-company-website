# DevStudio — Premium Animation Website Implementation Plan

> 

---

## Table of Contents
1. [Design Philosophy & Anti-Patterns](#1-design-philosophy--anti-patterns)
2. [Tech Stack Architecture](#2-tech-stack-architecture)
3. [Global Animation Systems](#3-global-animation-systems)
4. [Component-Level Animation Specs](#4-component-level-animation-specs)
5. [Animation Easing Library](#5-animation-easing-library)
6. [Performance Budget](#6-performance-budget)
7. [File Structure](#7-file-structure)
8. [Component API Examples](#8-component-api-examples)
9. [Theme Implementation](#9-theme-implementation)
10. [Quality Checklist](#10-quality-checklist)
11. [Content Reference (All Pages)](#11-content-reference-all-pages)

---

## 1. Design Philosophy & Anti-Patterns

### What We Avoid
These patterns make websites look AI-generated, cheap, or childish. Do not use them.

| Pattern | Why It Looks Cheap | Our Fix |
|--------|------------------|---------|
| Harsh pure black (`#000`) backgrounds | Crushes shadow detail, feels like a template | Rich black with subtle warmth (`#0a0a0f`) or cool undertones |
| Neon accent colors | Dated "crypto startup 2021" aesthetic | Muted, desaturated accents with high luminosity |
| Massive border-radius (12px+) on cards | Bootstrap energy | Sharp edges (4px max) or fully geometric |
| Center-aligned everything | Lacks editorial confidence | Asymmetric layouts, intentional misalignment |
| Generic multi-colored tech icons | Clip-art aesthetic | Monochrome line icons, 1.5px stroke weight |
| "Scroll down" indicators / bouncing arrows | Patronizing, noisy | Motion itself guides the eye |
| Equal-width grid columns everywhere | Predictable, lazy | Broken grids, overlapping elements, varying scales |
| Gradient text fills | Overused, hard to read | Solid colors only, use contrast for hierarchy |
| Box shadows with high blur + spread | Floats everything, no grounding | 1px borders or very subtle, tight shadows |
| All-caps body text | Shouting, poor readability | All-caps reserved for tiny labels only (10-11px) |

### Our Aesthetic Direction
- **Editorial meets engineering** — Think *Monocle* magazine meets early Vercel marketing.
- **Negative space as a design element** — Generous margins that breathe. Do not fill whitespace.
- **Typography as hierarchy** — One display typeface (sharp, geometric, e.g., "Geist" or "Satoshi"), one body typeface (humanist, e.g., "Inter" or "Manrope").
- **Motion with purpose** — Every animation answers a user question or reveals information. No decoration.
- **Asymmetry by default** — Left-heavy layouts, offset grids, text that bleeds off edges.

---

## 2. Tech Stack Architecture

```
Next.js 15 (App Router)
├── React Server Components (static shells)
├── Client Components (islands for animation only)
│
├── Animation Layer
│   ├── GSAP + ScrollTrigger (scroll-driven sequences, timelines)
│   ├── Framer Motion (gestures, layout animations, AnimatePresence)
│   ├── Lenis (smooth scroll, momentum-based, premium feel)
│   └── Custom WebGL (hero background ONLY if performance allows)
│
├── Styling
│   ├── Tailwind CSS (utility tokens)
│   ├── CSS Custom Properties (theme switching)
│   └── Custom CSS (complex keyframes, clip-paths)
│
├── State Management
│   ├── Zustand (theme, nav, cursor state)
│   └── React Context (minimal, only where prop drilling is worse)
│
└── Performance
    ├── next/image (priority loading, blur placeholders)
    ├── will-change management (GSAP handles this automatically)
    └── requestAnimationFrame throttling for custom effects
```

### Dependencies
```bash
npm install gsap @gsap/react lenis framer-motion zustand
# Fonts: @fontsource-variable/inter or next/font/google
```

---

## 3. Global Animation Systems

### 3.1 Smooth Scroll Engine (Lenis)
Initialize Lenis with a slow, heavy interpolation. This makes the page feel expensive.

```typescript
// hooks/useSmoothScroll.ts
const lenis = new Lenis({
  lerp: 0.08,              // Slower interpolation = premium weight
  duration: 1.2,           // Longer travel time
  smoothWheel: true,
  wheelMultiplier: 0.8,    // Slightly dampened scroll
})

// Sync with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time) => lenis.raf(time * 1000))
gsap.ticker.lagSmoothing(0)
```

### 3.2 Custom Cursor System
Replace the default cursor. This is not a gimmick — it unifies the interactive language.

- **Inner dot:** 8px, `mix-blend-mode: difference`, always visible.
- **Outer ring:** 40px, stroke only, scale 0 → 1 when hovering interactive elements.
- **Text label:** On hover over links/buttons, show contextual label ("VIEW", "READ", "EXPAND").
- **Behavior:** Outer ring magnet-snaps to button centers (moves 30% toward cursor within 100px radius).
- **Disabled on:** Touch devices, `prefers-reduced-motion: reduce`.

### 3.3 Page Transition Orchestration
Do NOT use fade-to-white. That is the most generic transition possible.

- **Exit:** Content splits into 5 horizontal slices, each slides up with 0.05s stagger.
- **Overlay:** A solid color panel (theme-aware) wipes across via `clip-path` or `transform: scaleX`.
- **Enter:** Slices reassemble from bottom with stagger.
- **Duration:** 0.8s total.
- **Easing:** `expo.inOut` (dramatic, not bouncy).

### 3.4 Theme Switching (Light/Dark)
Instant switch with no flash of unstyled content.

1. CSS variables update immediately (0ms).
2. Images crossfade (300ms) if they have light/dark variants.
3. Canvas/WebGL uniforms transition (600ms).
4. **Trigger:** Sun/moon icon in nav. Icon morphs via SVG path animation (not rotation).
5. **Persistence:** `localStorage` + `prefers-color-scheme` fallback.

---

## 4. Component-Level Animation Specs

### 4.1 Navigation
- **Layout:** Fixed top, 80px height. Glassmorphism activates ONLY after 100px scroll (not immediately).
- **Load:** Logo draws in via SVG `stroke-dashoffset` (1.2s). Nav links fade in with 0.05s stagger from right.
- **Scroll behavior:** After 100px, nav shrinks to 60px, `backdrop-filter: blur(12px)`, `border-bottom: 1px solid rgba(255,255,255,0.05)`.
- **Hover:** Link text slides up; duplicate text slides in from below ("slot machine" effect). Underline is a 1px line that grows from center outward.
- **Mobile:** Hamburger morphs to close via SVG path interpolation. Full-screen overlay with links staggered 0.1s.

### 4.2 Hero Section
- **Layout:** 100vh, asymmetric. Left 60% text, right 40% visual. Text is left-aligned, NOT centered.
- **Background:** 
  - Option A (WebGL): Flowing noise field with subtle color shift.
  - Option B (CSS): 3 large blurred gradient orbs (20vw) moving via `@keyframes`, `mix-blend-mode: screen`, `opacity: 0.3`.
- **Headline reveal:** Split by line. Each line clips in from bottom (`clip-path: inset(100% 0 0 0)` → `inset(0)`). Stagger: 0.15s. Easing: `power4.out`.
- **Subhead:** Fades in + `translateY(20px → 0)`, starts after headline completes.
- **Stats:** Counter animation (0 → target) over 2s with `easeOutExpo`. Numbers use `font-variant-numeric: tabular-nums` to prevent jitter.
- **CTA Button:** Magnetic effect (moves 30% toward cursor within 100px radius). On hover, background fills from cursor position (radial `clip-path` expansion).

### 4.3 Section Reveals (Global Pattern)
Every section below the fold uses this pattern, triggered by IntersectionObserver at 15% visibility:

1. **Section label** (e.g., "OUR PHILOSOPHY") — typewriter effect, 30ms per character.
2. **Heading** — word-by-word fade + `translateY(40px → 0)`, stagger 0.03s.
3. **Body text** — lines fade in with 0.1s stagger.
4. **Media** — `scale(0.95 → 1)` + `opacity(0 → 1)`, 1s duration.
5. **Parallax:** Images move at 0.8x scroll speed (subtle, not gimmicky).

### 4.4 Philosophy Section (Homepage)
- **Layout:** Text left, code visual right.
- **Code Block:** Not a static image. It is a simulated typing animation:
  - Cursor blinks (CSS animation).
  - Lines appear one by one (not char-by-char — too slow).
  - Syntax highlighting fades in after each line appears.
  - Occasional "backspace" and retype to feel human.
  - Duration: ~8s loop, pauses on hover.

### 4.5 Portfolio / Work Grid
- **Layout:** Broken grid. First item spans 2 columns. Alternating vertical offsets (even items have `translateY(40px)`).
- **Card Hover (this is critical):**
  - Image: `scale(1.05)` + slight `rotate(1deg)` + `brightness(1.1)`.
  - Overlay: Gradient fades in from bottom (not a solid black mask).
  - Title: Slides up from below the image boundary.
  - Tags: Stagger in 0.02s each.
  - Arrow icon: Draws itself via SVG stroke animation.
  - Cursor changes to "VIEW" label.
- **Filter Animation:** Not instant grid reflow. Items exit with `scale(0.9)` + `opacity(0)`, grid reshuffles with FLIP technique, items enter with stagger.

### 4.6 Services Section
- **Layout:** Accordion-style expandable cards, NOT static grids.
- **Interaction:**
  - Default: All cards collapsed, showing only icon + title.
  - Hover: Card expands slightly (height increase), background shifts subtly.
  - Click: Active card expands fully, others compress.
  - Transition: Spring physics (`stiffness: 300, damping: 30`) — organic, not linear.
  - Content reveal: Inner elements stagger in.

### 4.7 Process Timeline (Discover → Design → Build → Launch)
- **Layout:** Horizontal on desktop, vertical on mobile. Connected by a line that draws itself.
- **Animation (ScrollTrigger-driven):**
  1. Line draws from left to right as user scrolls (SVG `stroke-dashoffset`).
  2. Each node (01, 02, 03, 04) pulses when the line reaches it.
  3. Node number counts up (0 → 1, 0 → 2, etc.).
  4. Description fades in after node activates.
  5. Active node has a "glow" ring (`box-shadow` animation).

### 4.8 Tech Stack Marquee
- **Layout:** Full-width, infinite horizontal scroll.
- **Animation:**
  - Two rows, opposite directions.
  - Row 1: scrolls left, speed 50px/s.
  - Row 2: scrolls right, speed 40px/s.
  - Hover: Pauses smoothly (lerp to 0). Hovered item scales 1.1.
  - Items: Monochrome by default, full color on hover.

### 4.9 Blog Cards
- **Layout:** 3-column, but middle card is offset vertically by 30px.
- **Hover:**
  - Image: Parallax shift (mouse position drives `translateX/Y` within ±10px).
  - Date: Slides in from left (hidden by default).
  - "Read" arrow: Extends line length, arrowhead moves forward.
  - Card: Subtle lift (`translateY(-4px)`) + shadow increase.

### 4.10 Contact Form
- **Layout:** Split screen. Left: Contact info (sticky). Right: Form.
- **Input Animation:**
  - Focus: Border color transitions smoothly. Label floats up (scales to 0.85 and moves up — no snapping).
  - Typing: Subtle glow under active field.
  - Submit: Button text changes to loading state with dot animation, then success checkmark draws itself.

### 4.11 Footer
- **Layout:** Massive. Minimum 40vh. Logo is huge (15vw), intentionally cropped by viewport edges.
- **Animation:**
  - Logo: Parallax (moves slower than scroll).
  - Links: Stagger in on scroll into view.
  - Newsletter input: Focus expands width by 20%.
  - Social icons: Hover rotates 360deg over 0.6s (playful but controlled).

---

## 5. Animation Easing Library

Do NOT use default CSS easings (`ease`, `ease-in-out`). Define and use these exclusively:

```typescript
// lib/easings.ts
export const easings = {
  // Dramatic entrances — primary for reveals
  expoOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  expoIn: "cubic-bezier(0.7, 0, 0.84, 0)",
  expoInOut: "cubic-bezier(0.87, 0, 0.13, 1)",

  // Soft, premium — for subtle movements
  softOut: "cubic-bezier(0.33, 1, 0.68, 1)",
  softInOut: "cubic-bezier(0.65, 0, 0.35, 1)",

  // Elastic — use SPARINGLY, only for micro-interactions
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",

  // Linear — for continuous motion only
  linear: "linear",
}
```

For GSAP, use the built-in equivalents: `power4.out`, `expo.inOut`, `back.out(1.2)`.

---

## 6. Performance Budget

| Metric | Target | Implementation |
|--------|--------|----------------|
| First Contentful Paint | < 1.2s | Preload critical fonts, inline critical CSS |
| Largest Contentful Paint | < 2.5s | Priority loading for hero image, lazy rest |
| Time to Interactive | < 3.5s | Defer non-critical animations until after idle |
| Cumulative Layout Shift | < 0.05 | Fixed dimensions for all media, no font swaps |
| Animation frame rate | 60fps | `will-change` only during animation, then remove |

### Critical Performance Rules
1. **No blur filters during scroll** — GPU killer. Use pre-blurred images or opacity layers.
2. **No layout-triggering animations** — Never animate `width`, `height`, `top`, `left`, `margin`, `padding`. Use `transform` and `opacity` only.
3. **Limit simultaneous GSAP tweens** to 10 maximum on screen at once.
4. **Use `content-visibility: auto`** for below-fold sections.
5. **Throttle mouse events** to 16ms (or use GSAP's built-in ticker).
6. **Lazy-load Lenis** if `prefers-reduced-motion` is set.

---

## 7. File Structure

```
app/
├── layout.tsx                    # Root, providers, smooth scroll init
├── page.tsx                      # Home composition
├── work/
│   └── page.tsx
├── services/
│   └── page.tsx
├── about/
│   └── page.tsx
├── blog/
│   └── page.tsx
├── contact/
│   └── page.tsx
│
├── sections/                     # Page-specific section components
│   ├── home/
│   │   ├── Hero.tsx
│   │   ├── Philosophy.tsx
│   │   ├── FeaturedWork.tsx
│   │   ├── ServicesPreview.tsx
│   │   ├── Process.tsx
│   │   ├── TechStack.tsx
│   │   ├── BlogPreview.tsx
│   │   └── CTABanner.tsx
│   ├── work/
│   │   ├── WorkHeader.tsx
│   │   ├── WorkGrid.tsx
│   │   └── WorkFilters.tsx
│   ├── services/
│   │   ├── ServicesHeader.tsx
│   │   ├── ServiceCards.tsx
│   │   └── FAQ.tsx
│   ├── about/
│   │   ├── AboutHero.tsx
│   │   ├── Values.tsx
│   │   ├── Timeline.tsx
│   │   └── Team.tsx
│   ├── blog/
│   │   ├── BlogHeader.tsx
│   │   ├── BlogGrid.tsx
│   │   └── BlogFilters.tsx
│   └── contact/
│       ├── ContactHero.tsx
│       ├── ContactInfo.tsx
│       └── ContactForm.tsx
│
├── components/                   # Reusable, shared across pages
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── PageTransition.tsx
│   ├── CustomCursor.tsx
│   ├── MagneticButton.tsx
│   ├── TextReveal.tsx
│   ├── ParallaxImage.tsx
│   ├── SplitText.tsx
│   ├── AnimatedCounter.tsx
│   ├── FilterGrid.tsx
│   ├── AccordionCard.tsx
│   ├── Timeline.tsx
│   ├── Marquee.tsx
│   ├── InputField.tsx
│   ├── ThemeToggle.tsx
│   └── SectionLabel.tsx
│
├── hooks/
│   ├── useSmoothScroll.ts
│   ├── useMousePosition.ts
│   ├── useInView.ts
│   ├── useMagneticEffect.ts
│   ├── useTextReveal.ts
│   └── useReducedMotion.ts
│
├── lib/
│   ├── easings.ts
│   ├── animations.ts             # Shared animation configs
│   └── utils.ts
│
├── stores/
│   └── themeStore.ts
│
├── styles/
│   ├── globals.css
│   ├── variables.css             # CSS custom properties for themes
│   └── animations.css            # Complex keyframes, clip-paths
│
└── types/
    └── index.ts
```

---

## 8. Component API Examples

Use these exact APIs to maintain consistency.

### MagneticButton
```tsx
<MagneticButton
  strength={0.3}          // 0-1, how much it follows cursor
  radius={100}            // px, activation radius
  onClick={handleClick}
>
  Start a Project
</MagneticButton>
```

### TextReveal
```tsx
<TextReveal
  as="h1"
  splitBy="word"          // "char" | "word" | "line"
  stagger={0.03}
  duration={0.8}
  easing={easings.expoOut}
>
  We Build Software That Matters
</TextReveal>
```

### ParallaxImage
```tsx
<ParallaxImage
  src="/project.jpg"
  speed={0.8}             // 1 = normal, 0.5 = half speed
  scale={[1.1, 1]}        // [start, end] scale during scroll
/>
```

### SectionLabel
```tsx
<SectionLabel
  text="OUR PHILOSOPHY"
  animation="typewriter"  // "typewriter" | "fade"
/>
```

---

## 9. Theme Implementation

```css
/* styles/variables.css */
:root {
  /* Light Theme */
  --bg-primary: #fafaf9;
  --bg-secondary: #f5f5f4;
  --bg-tertiary: #e7e5e4;
  --text-primary: #1c1917;
  --text-secondary: #78716c;
  --text-muted: #a8a29e;
  --accent: #dc2626;           /* Muted red, not neon */
  --accent-hover: #b91c1c;
  --border: #e7e5e4;
  --border-strong: #d6d3d1;

  /* Animation Tokens */
  --transition-fast: 150ms;
  --transition-base: 300ms;
  --transition-slow: 600ms;
  --transition-dramatic: 1200ms;
}

[data-theme="dark"] {
  --bg-primary: #0a0a0f;       /* Rich black, NOT #000 */
  --bg-secondary: #12121a;
  --bg-tertiary: #1c1c24;
  --text-primary: #f5f5f5;
  --text-secondary: #a8a29e;
  --text-muted: #78716c;
  --accent: #f87171;           /* Softer red in dark */
  --accent-hover: #fca5a5;
  --border: #27272a;
  --border-strong: #3f3f46;
}
```

### Theme Toggle Component
- Position: Far right of navigation.
- Visual: Sun icon (4 rays) morphs to moon (crescent) via SVG path interpolation.
- Duration: 400ms.
- Easing: `softInOut`.

---

## 10. Quality Checklist

Before marking any page complete, verify every item:

- [ ] All animations respect `prefers-reduced-motion: reduce` (disable or simplify).
- [ ] No two animations on the same page use identical timing + easing (variety = craft).
- [ ] Typography remains readable during all motion states.
- [ ] Mobile has reduced or eliminated complex animations (simpler fades, no WebGL).
- [ ] No "loading spinner" states — use skeletons or progressive enhancement.
- [ ] Every hover state has a corresponding focus state (keyboard accessibility).
- [ ] Animation does not delay content availability (text is readable before it finishes animating).
- [ ] Site feels fast on mid-range devices (test on a 3-year-old laptop).
- [ ] No pure black (`#000`) or pure white (`#ffffff`) backgrounds.
- [ ] Border radius never exceeds 4px on cards/containers.
- [ ] All icons are monochrome line style (1.5px stroke), never multi-colored.
- [ ] No gradient text fills anywhere.
- [ ] No center-aligned headings longer than 3 words.
- [ ] Footer contains a CTA (do not dead-end the About page).

---

## 11. Content Reference (All Pages)

Use this exact content structure. Text can be refined later, but sections and hierarchy must match.

### Homepage (`/`)
1. **Hero**
   - Label: "SOFTWARE DEVELOPMENT STUDIO"
   - Headline: "We Build Software That Matters"
   - Subhead: "From idea to launch, we craft bespoke SaaS platforms, custom web applications, and mobile apps for ambitious teams."
   - Stats: 10+ Products Built, 99.9% Uptime, 24/7 Support
   - CTAs: "View Our Work" (secondary), "Start a Project" (primary)

2. **Philosophy**
   - Label: "OUR PHILOSOPHY"
   - Headline: "We partner with ambitious teams to build software that matters."
   - Body: "No templates. No shortcuts. Every project is built from first principles, with obsessive attention to performance, design, and maintainability. From system architecture to micro-interactions, we ensure every detail of your product screams quality."
   - Visual: Animated code block (`studio.ts`)

3. **Featured Work**
   - Label: "SELECTED WORK"
   - Headline: "Products We've Built"
   - Subhead: "Explore our featured SaaS applications, custom platforms, and mobile apps built to scale."
   - Link: "All Projects →"
   - Cards (3):
     - **IntelliTrade** — SaaS — "AI-powered trading intelligence platform. Real-time market analysis, predictive signals, and portfolio management for serious traders." — Tags: Next.js, TypeScript, AI/ML, PostgreSQL
     - **FlowDesk** — Web App — "Enterprise task management reimagined. Kanban, calendar, and analytics in a unified workspace that teams actually enjoy using." — Tags: React, Node.js, Drizzle, Tailwind
     - **ShipSync** — Mobile — "Cross-platform mobile app for logistics tracking. Real-time shipment visibility, driver management, and automated notifications." — Tags: React Native, Expo, GraphQL, Redis

4. **Services Preview**
   - Label: "WHAT WE DO"
   - Headline: "Full-Stack Software Services"
   - Subhead: "We deliver end-to-end design, development, and scaling for modern digital products."
   - Cards (4):
     - **SaaS Product Development** — "End-to-end SaaS platforms from concept to scale. We handle architecture, UX, backend, and deployment." — Features: Multi-tenant Architecture, Role-Based Access Control (RBAC), API Rate Limiting & Gateway Security, Stripe & Subscription Integration, Enterprise Auditing & Logging. Stack: Next.js, Node.js, PostgreSQL, Docker, AWS.
     - **Custom Web Applications** — "Tailored web apps that solve real business problems. Fast, scalable, and maintainable from day one." — Features: Real-Time WebSocket Syncing, Server-Side Rendering (SSR), Responsive Fluid Layouts, Optimized Content Delivery Networks, Complex Data Visualizations. Stack: React, TypeScript, Tailwind CSS, Redux, Vercel.
     - **Mobile App Development** — "Native and cross-platform mobile experiences that users love, built with React Native and Expo." — Features: Consult iOS & Android Codebases, Push Notification Architecture, Biometric Auth (FaceID/TouchID), Offline-First Data Storage, Geofencing & Map Integration. Stack: React Native, Expo, TypeScript, Firebase, Stripe.
     - **AI & Automation** — "Intelligent systems that work for you. Integrate LLMs, ML models, and automation pipelines into your product." — Features: LLM Fine-Tuning & Prompt Design, Vector Search Architectures, Custom Machine Learning Pipelines, Retrieval-Augmented Generation (RAG), Robotic Process Automation (RPA). Stack: Python, OpenAI API, LangChain, Pinecone, FastAPI.

5. **Process**
   - Label: "HOW WE WORK"
   - Headline: "From Idea to Launch"
   - Subhead: "Our 4-step development lifecycle engineered to deliver rapid, high-quality product rollouts."
   - Steps:
     - 01 Discover — "We understand your problem deeply — users, market, constraints, and goals."
     - 02 Design — "We craft the solution visually. UX wireframes, system design, and architecture."
     - 03 Build — "We write code that lasts. Test-driven, documented, and production-ready."
     - 04 Launch — "We ship and iterate. Deploy, monitor, and continuously improve."

6. **Tech Stack**
   - Label: "TECH STACK"
   - Headline: "Built With the Best"
   - Subhead: "We choose fast, modern, and reliable tools to build products that scale without friction."
   - Marquee items: Python, PostgreSQL, AWS, Docker, GraphQL, Redis, React, Next.js, TypeScript, Node.js, Python, PostgreSQL, AWS, Docker, GraphQL, Redis, React, Next.js, TypeScript, Node.js, Python, Tailwind CSS, Figma, Prisma, Supabase, Vercel, React Native, Expo, OpenAI, Stripe, Kubernetes, Tailwind CSS, Figma, Prisma, Supabase, Vercel, React Native, Expo, OpenAI, Stripe, Kubernetes

7. **Stats Banner**
   - Label: "BY THE NUMBERS"
   - Headline: "Proof in the Numbers"
   - Subhead: "Our engineering standards translated into clean, measurable software performance."
   - Stats: 10+ Products Built, 99.9% Uptime, <100ms API Response, 24/7 Support

8. **Blog Preview**
   - Label: "INSIGHTS"
   - Headline: "From the Blog"
   - Subhead: "Thoughts, tutorials, and post-mortems from our engineering and design sprints."
   - Link: "Read All Articles"
   - Cards (3):
     - "How We Built a Real-Time Trading Dashboard with Next.js" — Engineering — Jun 12, 2025 — 8 min read
     - "The No-Gradient Design Philosophy: Why We Banned Gradients" — Design — May 28, 2025 — 5 min read
     - "Integrating LLMs Into Production SaaS: A Practical Guide" — AI & Automation — May 10, 2025 — 12 min read

9. **CTA Banner**
   - Label: "GET IN TOUCH"
   - Headline: "Have a project in mind?"
   - Subhead: "Let's build something great together. Get in touch to schedule a free consult and technical architecture audit."
   - CTA: "Start a Project"

### Work Page (`/work`)
- Label: "PORTFOLIO"
- Headline: "Our Projects."
- Subhead: "We design, build, and scale digital products that make a difference. Explore our latest SaaS, web applications, and mobile apps."
- Filters: All, SaaS, Web App, Mobile
- Counter: "Showing 6 projects"
- Grid (6 cards, same hover spec as homepage):
  1. IntelliTrade — SaaS — 2024
  2. FlowDesk — Web App — 2024
  3. ShipSync — Mobile — 2025
  4. ApexAnalytics — SaaS — 2023 — "High-throughput data ingestion pipeline and analytics engine. Processes billions of events daily with sub-second queries." — Tags: Rust, Apache Kafka, ClickHouse
  5. CarePulse — Mobile — 2024 — "Patient portal and healthcare booking application with automated SMS notifications, secure records, and doctor dashboards." — Tags: Next.js, Appwrite, Tailwind, Twilio
  6. DevStore — Web App — 2025 — "Ultra-fast headless e-commerce template with instantaneous searching, dynamic cart management, and seamless Stripe integration." — Tags: Shopify, Hydrogen, GraphQL, Tailwind

### Services Page (`/services`)
- Label: "SERVICES & ARCHITECTURE"
- Headline: "We Engineer High-Availability Products."
- Subhead: "We code from first principles, converting complex system designs into clean, resilient, and scale-ready codebases built to stand the test of time."
- Full service cards (same 4 as homepage, but expanded with code editor visuals alternating left/right):
  - SaaS Product Development (left text, right code visual)
  - Custom Web Applications (left code visual, right text)
  - Mobile App Development (left text, right code visual)
  - AI & Automation (left code visual, right text)
- FAQ Section:
  - "How long does a typical software project take?"
  - "Do you provide ongoing support after launch?"
  - "What is your communication process during a sprint?"
  - "Can you work with our existing development team?"
- CTA: "Ready to build?" — "Consult with our software architects to sketch a roadmap, cost breakdown, and timeline estimation for your platform." — Button: "Consult With Us →"

### About Page (`/about`)
- Label: "ABOUT US"
- Headline: "Built to Build."
- Subhead: "We are a team of developer-designers and system architects who believe software should be fast, beautiful, and built to scale. We partner with product builders to transform ambitious ideas into robust codebases."
- Values Section:
  - Label: "CORE VALUES"
  - Headline: "What Guides Us"
  - Cards (3):
    - **Craftsmanship** — "We code from first principles. No cheap templates, no shortcuts, just clean and maintainable architecture."
    - **Partnership** — "We do not build transactional relationships. We embed directly with your product teams as true partners."
    - **Transparency** — "Direct communication. No account managers or agency intermediaries. Talk directly to the builders."
- Timeline:
  - Label: "MILESTONES"
  - Headline: "Our Journey"
  - 2022 — Studio Founded — "DevStudio was founded with a clear focus: build high-performance software products that stand the test of time."
  - 2023 — Scaling Out — "Expanded the engineering team and successfully deployed our first 5 enterprise SaaS applications."
  - 2024 — AI Integration — "Partnered with LLM research teams to build modern vector search and RAG platforms for enterprise partners."
  - 2025 — Looking Ahead — "Continuing to pioneer high-speed web rendering, mobile platforms, and robust system integrations."
- Team:
  - Label: "THE TEAM"
  - Headline: "Meet the Builders"
  - Cards (3):
    - **Muhammad Ahsar** — Founder & Principal Architect — "Software engineer obsessed with Web performance, animation libraries, and distributed systems." — Focus: Docker, AWS
    - **Sarah Jenkins** — Lead UX Designer — "Visual designer specializing in minimal design systems, typography, and interactive prototyping." — Focus: Figma, UI/UX
    - **Alex Rivera** — Senior System Engineer — "Systems developer focused on Go, Rust, database optimization, and cloud operations." — Focus: React, Node

### Blog Page (`/blog`)
- Label: "INSIGHTS & IDEAS"
- Headline: "The Studio Blog."
- Subhead: "Thought leadership, practical technical tutorials, and product design guides fresh from our development studio."
- Filters: All, Engineering, Design, AI & Automation, Product
- Search: "Search articles..."
- Grid: Same 3 articles as homepage preview, plus expandability for more.
- Each card shows: category badge, title, excerpt, date, read time, "Read →" link.

### Contact Page (`/contact`)
- Label: "CONTACT"
- Headline: "Let's Build."
- Subhead: "Have an idea, draft specification, or existing product that needs scaling? Shoot us a message or schedule a call directly."
- Left Column — "Connect Directly":
  - Email: hello@devstudio.io
  - Studio Office: Karachi, Pakistan
  - Hours: Mon – Fri, 9am – 6pm (PKT)
  - Strategy Session CTA: "Schedule a Strategy Session" — "Book a 30-minute discovery Zoom video call directly with our architects. Select a date and timezone to begin scheduling." — Button: "Open Schedule Window"
- Right Column — "Project Details" (Form):
  - Your Name
  - Email Address
  - Project Category: SaaS Platform, Web Application, Mobile App, AI Integration (selectable pills)
  - Estimated Budget: $10k – $25k, $25k – $50k, $50k – $100k, $100k+ (selectable pills)
  - Project Description (textarea)
  - Submit: "Send Message"

### Global Footer
- **Column 1 — Brand:**
  - Logo: DS DevStudio
  - "We partner with ambitious teams to build world-class software products. End-to-end engineering from concept to scale."
  - Social: GitHub, X (Twitter), LinkedIn icons
- **Column 2 — Company:** Work, Services, About, Blog, Contact
- **Column 3 — Services:** SaaS Platforms, Web Applications, Mobile Apps, AI Integrations
- **Column 4 — Newsletter:**
  - "Subscribe to our weekly dispatch of software engineering insights, case studies, and tools."
  - Input: Email + arrow submit
- **Bottom Bar:**
  - "© 2026 DevStudio. All rights reserved. Built with Next.js & GSAP."
  - Links: Privacy Policy, Terms of Service

---

*End of Implementation Plan*
