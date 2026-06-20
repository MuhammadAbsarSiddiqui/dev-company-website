"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useThemeStore } from "@/stores/themeStore";
import { MagneticButton } from "@/components/MagneticButton";

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(".page-label", { opacity: 0 }, { opacity: 1, duration: 1 }, 0.2);
    tl.fromTo(".page-header", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.3);
    tl.fromTo(".page-body", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.5);
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen bg-[var(--bg-primary)] px-8 md:px-16 py-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/2">
          <div className="page-label text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 opacity-0">
            OUR STORY
          </div>
          <h1 className="page-header text-5xl md:text-7xl font-bold font-display leading-tight mb-8 opacity-0">
            Built by engineers, for engineers.
          </h1>
          <div className="page-body space-y-6 text-lg text-[var(--text-secondary)] leading-relaxed opacity-0">
            <p>
              DevStudio was founded on a simple premise: most software agencies prioritize speed and templates over quality and maintainability. We wanted to build a place where engineering excellence is the default, not an upsell.
            </p>
            <p>
              We are a collective of senior developers, system architects, and designers who have built scalable products for startups and enterprises alike. We don&apos;t just write code; we solve complex business problems through elegant, performant technology.
            </p>
            <p>
              When you work with us, you work directly with the people building your product. No middle-managers, no outsourced B-teams. Just pure, focused execution.
            </p>
          </div>
          <div className="page-body mt-12 opacity-0">
            <MagneticButton variant="primary">Join the Team</MagneticButton>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="page-body w-full aspect-square rounded-sm overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border)] opacity-0 perspective-1000">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200" 
              alt="Team collaborating" 
              className="w-full h-full object-cover transition-transform duration-1000 hover:scale-105" 
            />
          </div>
        </div>
      </div>
    </div>
  );
}
