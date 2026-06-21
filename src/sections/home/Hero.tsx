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
    <section className="relative w-full min-h-[90vh] pt-8 md:pt-12 pb-20 flex items-start px-8 md:px-16 overflow-hidden">

      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-16">
        {/* Left 60% Text */}
        <div className="w-full md:w-[55%] flex flex-col items-start">
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
                <AnimatedCounter value={10} /><span className="text-[var(--accent)]">+</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-1">Products Built</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-[var(--text-primary)]">
                <AnimatedCounter value={99.9} decimals={1} /><span className="text-[var(--accent)]">%</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-1">Uptime</div>
            </div>
            <div>
              <div className="text-3xl font-display font-bold text-[var(--text-primary)]">
                <AnimatedCounter value={24} /><span className="text-[var(--text-muted)]">/7</span>
              </div>
              <div className="text-xs uppercase tracking-widest text-[var(--text-muted)] mt-1">Support</div>
            </div>
          </div>
        </div>

        {/* Right 45% Visual - 3D Glass Image */}
        <div className="hidden md:block w-[45%] h-[60vh] relative perspective-1000">
          <div 
            className="absolute inset-0 bg-transparent rounded-sm overflow-hidden transition-transform duration-1000 flex items-center justify-center" 
            style={{ transform: "rotateY(-10deg) rotateX(5deg)" }} 
            onMouseEnter={(e) => e.currentTarget.style.transform = "rotateY(0deg) rotateX(0deg) scale(1.02)"} 
            onMouseLeave={(e) => e.currentTarget.style.transform = "rotateY(-10deg) rotateX(5deg) scale(1)"}
          >
            <img 
              src="/hero-glass.png" 
              alt="3D Floating Glass Panes" 
              className="w-full h-full object-cover rounded-sm filter drop-shadow-2xl" 
            />
          </div>
        </div>
      </div>
    </section>
  );
}
