"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MagneticButton } from "@/components/MagneticButton";

export function CTABanner() {
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
        stagger: 0.15, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 w-full border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div ref={containerRef} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-sm p-12 md:p-16 relative overflow-hidden">
          
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[var(--accent)] rounded-full blur-[150px] opacity-10 pointer-events-none translate-x-1/2 -translate-y-1/2" />
          
          <div className="max-w-2xl relative z-10 opacity-0">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-6">
              Ready to build something extraordinary?
            </h2>
            <p className="text-xl text-[var(--text-secondary)] leading-relaxed">
              Let&apos;s turn your complex problem into an elegant solution.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0 opacity-0">
            <MagneticButton variant="primary">Start a Project</MagneticButton>
            <MagneticButton variant="secondary">Schedule a Call</MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
