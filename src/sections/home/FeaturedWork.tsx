/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { TransitionLink as Link } from "@/components/TransitionLink";
import { ArrowRight } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "IntelliTrade",
    category: "Financial Tech",
    tags: ["Next.js", "AI/ML", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1642543348745-03b1219733d9?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "FlowDesk",
    category: "Productivity",
    tags: ["React", "Node.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "ShipSync",
    category: "Logistics",
    tags: ["React Native", "GraphQL", "Redis"],
    image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "AuraOS",
    category: "Web3",
    tags: ["Solidity", "TypeScript", "Framer"],
    image: "https://images.unsplash.com/photo-1634152962476-4b8a00e1915c?q=80&w=1200&auto=format&fit=crop",
  }
];

export function FeaturedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const setCursorState = useThemeStore((state) => state.setCursorState);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Header reveal
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: headerRef.current,
        start: "top 85%",
        once: true
      }
    });

    const label = headerRef.current?.querySelector('.section-label');
    const heading = headerRef.current?.querySelector('h2');
    const subhead = headerRef.current?.querySelector('p');
    const link = headerRef.current?.querySelector('.view-all-link');

    if (label) gsap.to(label, { opacity: 1, duration: 1 });
    if (heading) {
      tl.fromTo(heading, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2);
    }
    if (subhead) {
      tl.fromTo(subhead, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.4);
    }
    if (link) {
      tl.fromTo(link, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 0.6);
    }

    // Cards reveal
    const cards = sectionRef.current.querySelectorAll('.work-card');
    cards.forEach((card) => {
      gsap.fromTo(card, 
        { opacity: 0, y: 100 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 1.2, 
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%",
            once: true
          }
        }
      );
    });
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-40 px-8 md:px-16 w-full bg-[var(--bg-secondary)] border-t border-[var(--border)] overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-24 gap-8">
          <div className="max-w-3xl">
            <div className="section-label text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 opacity-0">
              SELECTED WORK
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold font-display leading-[1.05] tracking-tight mb-8 opacity-0">
              Products We&apos;ve Built.
            </h2>
            <p className="text-lg md:text-xl text-[var(--text-secondary)] leading-relaxed opacity-0 max-w-xl">
              Explore our featured SaaS applications, custom platforms, and mobile apps built to scale.
            </p>
          </div>
          <div className="view-all-link opacity-0 pb-2">
            <Link 
              href="/work" 
              className="group flex items-center gap-3 text-[var(--text-primary)] font-bold tracking-widest text-xs uppercase"
              onMouseEnter={() => setCursorState("link")}
              onMouseLeave={() => setCursorState("default")}
            >
              <span className="border-b border-[var(--text-primary)] pb-1 transition-colors hover:text-[var(--accent)] hover:border-[var(--accent)]">View All Projects</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Minimalist Staggered Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24 pb-20">
          {projects.map((project, index) => (
            <Link 
              href={`/work/${project.id}`} 
              key={project.id}
              className={cn(
                "group block",
                index % 2 !== 0 ? "md:mt-32" : ""
              )}
              onMouseEnter={() => setCursorState("button", "VIEW")}
              onMouseLeave={() => setCursorState("default")}
            >
              {/* Work Card Container */}
              <div className="work-card opacity-0 relative w-full aspect-[4/5] rounded-sm bg-[var(--bg-tertiary)]">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="work-card-image w-full h-full object-cover" 
                />
                
                {/* Overlay Content */}
                <div className="work-card-content">
                  <span className="work-card-title text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
                    {project.category}
                  </span>
                  <h3 className="work-card-title text-3xl md:text-4xl font-display font-bold text-[var(--text-primary)] mb-4">
                    {project.title}
                  </h3>
                  <div className="work-card-tags">
                    {project.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="text-[10px] uppercase tracking-wider px-3 py-1 bg-[var(--bg-primary)] border border-[var(--border-strong)] rounded-full text-[var(--text-primary)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* SVG Arrow */}
                <div className="work-card-arrow">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 19L19 5M19 5V15M19 5H9" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
