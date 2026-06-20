"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

const steps = [
  { num: "01", title: "Discover", desc: "We understand your problem deeply — users, market, constraints, and goals." },
  { num: "02", title: "Design", desc: "We craft the solution visually. UX wireframes, system design, and architecture." },
  { num: "03", title: "Build", desc: "We write code that lasts. Test-driven, documented, and production-ready." },
  { num: "04", title: "Launch", desc: "We ship and iterate. Deploy, monitor, and continuously improve." },
];

export function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);
  const [activeStep, setActiveStep] = useState<number>(-1);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;
    
    // Header reveal
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

    // Timeline Animation
    if (!timelineRef.current || !lineRef.current) return;

    const pathLength = lineRef.current.getTotalLength();
    gsap.set(lineRef.current, { strokeDasharray: pathLength, strokeDashoffset: pathLength });

    ScrollTrigger.create({
      trigger: timelineRef.current,
      start: "top 70%",
      end: "bottom 50%",
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;
        gsap.to(lineRef.current, {
          strokeDashoffset: pathLength - (progress * pathLength),
          duration: 0.1,
          overwrite: "auto"
        });
        
        const step = Math.floor(progress * 4);
        setActiveStep(Math.min(step, 3));
      }
    });

    gsap.fromTo(".process-node", 
      { opacity: 0, y: 20 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.1,
        scrollTrigger: {
          trigger: timelineRef.current,
          start: "top 80%",
          once: true
        }
      }
    );

  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-8 md:px-16 w-full bg-[var(--bg-secondary)] border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <div ref={headerRef} className="max-w-3xl mb-24">
          <div className="section-label text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 opacity-0">
            HOW WE WORK
          </div>
          <h2 className="text-4xl md:text-5xl font-bold font-display leading-[1.1] mb-6 opacity-0">
            From Idea to Launch.
          </h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed opacity-0">
            Our 4-step development lifecycle engineered to deliver rapid, high-quality product rollouts.
          </p>
        </div>

        <div ref={timelineRef} className="relative w-full pb-16">
          {/* Desktop SVG Line */}
          <div className="hidden md:block absolute top-[28px] left-[50px] right-[50px] h-[2px] z-0">
            <svg className="w-full h-full preserve-3d" preserveAspectRatio="none" viewBox="0 0 1000 2">
              <path d="M0 1 L1000 1" stroke="var(--border-strong)" strokeWidth="2" fill="none" />
              <path ref={lineRef} d="M0 1 L1000 1" stroke="var(--text-primary)" strokeWidth="2" fill="none" />
            </svg>
          </div>

          {/* Mobile Vertical Line */}
          <div className="block md:hidden absolute top-[28px] bottom-0 left-[28px] w-[2px] bg-[var(--border-strong)] z-0">
             <div 
               className="w-full bg-[var(--text-primary)] transition-[height] duration-300 ease-out"
               style={{ height: `${(activeStep / 3) * 100}%` }}
             />
          </div>

          <div className="flex flex-col md:flex-row justify-between relative z-10 gap-12 md:gap-4">
            {steps.map((step, index) => {
              const isActive = index <= activeStep;
              const isCurrent = index === activeStep;

              return (
                <div key={step.num} className="process-node flex flex-row md:flex-col items-start md:items-center w-full md:w-1/4 opacity-0 relative">
                  
                  {/* Node Circle */}
                  <div className="flex-shrink-0 relative">
                    <div className={cn(
                      "w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold font-display transition-[border-color,color] duration-500 relative z-10 border-2 bg-[var(--bg-secondary)]",
                      isActive ? "border-[var(--text-primary)] text-[var(--text-primary)]" : "border-[var(--border-strong)] text-[var(--text-muted)]"
                    )}>
                      {isActive ? step.num : "00"}
                    </div>
                    {/* Glow effect */}
                    <div className={cn(
                      "absolute inset-0 rounded-full bg-[var(--text-primary)] blur-md transition-opacity duration-500",
                      isCurrent ? "opacity-30" : "opacity-0"
                    )} />
                  </div>

                  {/* Content */}
                  <div className="ml-8 md:ml-0 md:mt-8 md:text-center pt-2 md:pt-0">
                    <h3 className={cn(
                      "text-2xl font-bold font-display mb-3 transition-colors duration-500",
                      isActive ? "text-[var(--text-primary)]" : "text-[var(--text-muted)]"
                    )}>
                      {step.title}
                    </h3>
                    <p className={cn(
                      "text-[var(--text-secondary)] leading-relaxed transition-opacity duration-500 text-sm md:text-base",
                      isActive ? "opacity-100" : "opacity-0"
                    )}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
