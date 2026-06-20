"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useThemeStore } from "@/stores/themeStore";

const row1 = [
  "Python", "PostgreSQL", "AWS", "Docker", "GraphQL", "Redis", "React", "Next.js", "TypeScript", "Node.js",
  "Tailwind CSS", "Prisma", "Supabase", "Vercel", "Figma", "React Native"
];

const row2 = [
  "Expo", "OpenAI", "Stripe", "Kubernetes", "Redis", "TypeScript", "Node.js", "Python", "GraphQL", "Next.js",
  "AWS", "Docker", "React", "PostgreSQL", "Supabase", "Vercel"
];

export function TechStack() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const setCursorState = useThemeStore((state) => state.setCursorState);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;
    
    const headerTl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        once: true
      }
    });

    const label = headerRef.current.querySelector('.section-label');
    const heading = headerRef.current.querySelector('h2');
    const subhead = headerRef.current.querySelector('p');

    if (label) gsap.to(label, { opacity: 1, duration: 1 });
    if (heading) headerTl.fromTo(heading, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2);
    if (subhead) headerTl.fromTo(subhead, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.4);

  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 w-full bg-[var(--bg-primary)] overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 md:px-16 mb-20">
        <div ref={headerRef} className="max-w-3xl">
          <div className="section-label text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 opacity-0">
            TECH STACK
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display leading-[1.1] mb-6 opacity-0">
            Built With the Best.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed opacity-0">
            We choose fast, modern, and reliable tools to build products that scale without friction.
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 md:gap-8 select-none">
        <div 
          className="relative flex overflow-hidden w-full group"
          onMouseEnter={() => setCursorState("none")}
          onMouseLeave={() => setCursorState("default")}
        >
          <div className="animate-marquee flex gap-6 md:gap-8 hover:[animation-play-state:paused] shrink-0 w-max pr-6 md:pr-8">
            {[...row1, ...row1].map((item, i) => (
              <div 
                key={`${item}-${i}`} 
                className="shrink-0 px-6 py-3 md:px-8 md:py-4 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-lg md:text-xl font-bold font-display text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-[color,border-color,transform,box-shadow] duration-300 cursor-none"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div 
          className="relative flex overflow-hidden w-full group"
          onMouseEnter={() => setCursorState("none")}
          onMouseLeave={() => setCursorState("default")}
        >
          <div className="animate-marquee-reverse flex gap-6 md:gap-8 hover:[animation-play-state:paused] shrink-0 w-max pr-6 md:pr-8">
            {[...row2, ...row2].map((item, i) => (
              <div 
                key={`${item}-${i}`} 
                className="shrink-0 px-6 py-3 md:px-8 md:py-4 rounded-full border border-[var(--border)] bg-[var(--bg-secondary)] text-lg md:text-xl font-bold font-display text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:border-[var(--text-primary)] hover:scale-110 hover:-translate-y-1 hover:shadow-lg transition-[color,border-color,transform,box-shadow] duration-300 cursor-none"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
