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
    <section ref={sectionRef} className="py-24 md:py-32 w-full border-t border-border">
      <div className="max-w-7xl mx-auto px-8 md:px-16">
        <div ref={containerRef} className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 bg-bg-secondary border border-border rounded-sm p-12 md:p-16 relative overflow-hidden group">
          
          {/* Enhanced Background Effects */}
          <div className="absolute inset-0 z-0 opacity-40 transition-opacity duration-1000 group-hover:opacity-70 pointer-events-none">
             <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--liquid-2)] blur-[120px]" />
             <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--liquid-1)] blur-[100px]" />
          </div>
          
          <div className="max-w-2xl relative z-10 opacity-0">
            <div className="flex items-center gap-3 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.6)]" />
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-text-muted">Available for new projects</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-6 text-text-primary">
              Ready to build something extraordinary?
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed">
              Let&apos;s turn your complex problem into an elegant, scalable solution.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 relative z-10 shrink-0 opacity-0">
            <MagneticButton variant="primary" className="bg-text-primary !text-bg-primary border-transparent hover:scale-105 transition-transform">
              Start a Project
            </MagneticButton>
            <MagneticButton variant="secondary" className="backdrop-blur-md bg-bg-primary/50 hover:bg-bg-primary/80 transition-colors">
              Schedule a Call
            </MagneticButton>
          </div>
        </div>
      </div>
    </section>
  );
}
