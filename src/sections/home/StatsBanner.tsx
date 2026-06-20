"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export function StatsBanner() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return;
    
    gsap.fromTo(containerRef.current.children, 
      { opacity: 0, y: 30 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 w-full border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div ref={containerRef} className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-8">
          <div className="flex flex-col gap-2 opacity-0">
            <div className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)]">
              <AnimatedCounter value={2} suffix="M+" />
            </div>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)]">Lines of Code</div>
          </div>
          <div className="flex flex-col gap-2 opacity-0">
            <div className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)]">
              <AnimatedCounter value={4} suffix="k+" />
            </div>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)]">Coffee Cups</div>
          </div>
          <div className="flex flex-col gap-2 opacity-0">
            <div className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)]">
              <AnimatedCounter value={25} suffix="+" />
            </div>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)]">Global Clients</div>
          </div>
          <div className="flex flex-col gap-2 opacity-0">
            <div className="text-4xl md:text-5xl font-bold font-display text-[var(--text-primary)]">
              <AnimatedCounter value={10} suffix="+" />
            </div>
            <div className="text-xs font-bold tracking-widest uppercase text-[var(--text-muted)]">Years Experience</div>
          </div>
        </div>
      </div>
    </section>
  );
}
