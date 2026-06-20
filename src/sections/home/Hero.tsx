/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MagneticButton } from "@/components/MagneticButton";
import { AnimatedCounter } from "@/components/AnimatedCounter";

export function Hero() {
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(".hero-label", { opacity: 0 }, { opacity: 1, duration: 1 }, 0.2)
      .fromTo(".hero-line", 
      { clipPath: "inset(100% 0 0 0)" },
      { clipPath: "inset(0% 0 0 0)", duration: 1.2, stagger: 0.15, ease: "power4.out" },
      0.1
    )
    .fromTo(subheadRef.current, 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
      "-=0.6"
    )
    .fromTo([ctaRef.current, statsRef.current],
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1, stagger: 0.2, ease: "power3.out" },
      "-=0.6"
    );
  }, []);

  return (
    <section className="relative w-full h-screen min-h-[800px] flex items-center px-8 md:px-16 overflow-hidden">

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center">
        {/* Left 60% Text */}
        <div className="w-full md:w-[60%] flex flex-col items-start pt-20">
          <div className="overflow-hidden mb-6">
            <div className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] hero-label opacity-0">
              Software Development Studio
            </div>
          </div>
          
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold font-display leading-[1.05] tracking-tight mb-8">
            <div className="overflow-hidden"><div className="hero-line" style={{ clipPath: "inset(100% 0 0 0)" }}>We Build</div></div>
            <div className="overflow-hidden"><div className="hero-line" style={{ clipPath: "inset(100% 0 0 0)" }}>Software That</div></div>
            <div className="overflow-hidden"><div className="hero-line" style={{ clipPath: "inset(100% 0 0 0)" }}>Matters.</div></div>
          </h1>

          <p ref={subheadRef} className="text-lg md:text-xl text-[var(--text-secondary)] max-w-lg mb-12 leading-relaxed opacity-0">
            From idea to launch, we craft bespoke SaaS platforms, custom web applications, and mobile apps for ambitious teams.
          </p>

          <div ref={ctaRef} className="flex flex-wrap gap-4 mb-16 opacity-0">
            <MagneticButton variant="primary">Start a Project</MagneticButton>
            <MagneticButton variant="secondary">View Our Work</MagneticButton>
          </div>

          <div ref={statsRef} className="flex gap-12 opacity-0">
            <div>
              <div className="text-3xl font-display font-bold text-[var(--text-primary)]">
                <AnimatedCounter value={10} suffix="+" />
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-1">Products Built</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-[var(--text-primary)]">
                <AnimatedCounter value={99.9} suffix="%" decimals={1} />
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-1">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-[var(--text-primary)]">
                24/7
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-1">Support</div>
            </div>
          </div>
        </div>

        {/* Right 40% Visual */}
        <div className="hidden md:block w-[40%] h-[60vh] relative mt-20 perspective-1000">
          <div className="absolute inset-0 bg-[var(--bg-secondary)] rounded-sm border border-[var(--border)] overflow-hidden shadow-2xl transition-transform duration-1000" style={{ transform: "rotateY(-10deg) rotateX(5deg)" }} onMouseEnter={(e) => e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg)"} onMouseLeave={(e) => e.currentTarget.style.transform = "rotateY(-10deg) rotateX(5deg)"}>
            <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop" alt="Software Architecture Code" className="w-full h-full object-cover opacity-90" />
            <div className="absolute inset-0 bg-[var(--bg-primary)]/10 backdrop-blur-[1px]" />
          </div>
        </div>
      </div>
    </section>
  );
}
