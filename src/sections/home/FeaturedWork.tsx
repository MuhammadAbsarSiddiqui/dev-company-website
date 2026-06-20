/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "IntelliTrade",
    category: "SaaS",
    description: "AI-powered trading intelligence platform. Real-time market analysis, predictive signals, and portfolio management for serious traders.",
    tags: ["Next.js", "TypeScript", "AI/ML", "PostgreSQL"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "FlowDesk",
    category: "Web App",
    description: "Enterprise task management reimagined. Kanban, calendar, and analytics in a unified workspace that teams actually enjoy using.",
    tags: ["React", "Node.js", "Drizzle", "Tailwind"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "ShipSync",
    category: "Mobile",
    description: "Cross-platform mobile app for logistics tracking. Real-time shipment visibility, driver management, and automated notifications.",
    tags: ["React Native", "Expo", "GraphQL", "Redis"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?auto=format&fit=crop&q=80&w=800",
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
          y: card.classList.contains('offset-card') ? 40 : 0, 
          duration: 1, 
          ease: "expo.out",
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
    <section ref={sectionRef} className="py-24 md:py-32 px-8 md:px-16 w-full bg-[var(--bg-secondary)] border-t border-[var(--border)]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <div className="section-label text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 opacity-0">
              SELECTED WORK
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-6 opacity-0">
              Products We&apos;ve Built.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed opacity-0">
              Explore our featured SaaS applications, custom platforms, and mobile apps built to scale.
            </p>
          </div>
          <div className="view-all-link opacity-0 pb-2">
            <Link 
              href="/work" 
              className="group flex items-center gap-2 text-[var(--text-primary)] font-bold tracking-widest text-xs uppercase"
              onMouseEnter={() => setCursorState("link")}
              onMouseLeave={() => setCursorState("default")}
            >
              <span className="border-b border-[var(--text-primary)] pb-1 transition-colors hover:text-[var(--accent)] hover:border-[var(--accent)]">All Projects</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Broken Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 pb-12">
          {projects.map((project, index) => (
            <Link 
              href={`/work/${project.id}`} 
              key={project.id}
              className={cn(
                "work-card block group cursor-none relative opacity-0 rounded-sm",
                index === 0 ? "md:col-span-2 aspect-[21/9]" : "md:col-span-1 aspect-[4/5]",
                index % 2 !== 0 && index !== 0 ? "md:translate-y-10 offset-card" : ""
              )}
              onMouseEnter={() => setCursorState("button", "VIEW")}
              onMouseLeave={() => setCursorState("default")}
            >
              <div className="w-full h-full rounded-sm relative bg-[var(--bg-tertiary)] border-none">
                {/* Image */}
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="work-card-image absolute inset-0 w-full h-full object-cover" 
                />
                
                {/* Content */}
                <div className="work-card-content">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
                    {project.category}
                  </div>
                  
                  <h3 className="work-card-title text-3xl md:text-4xl font-bold font-display text-[var(--text-primary)] mb-4">
                    {project.title}
                  </h3>

                  <p className="work-card-title text-[var(--text-secondary)] mb-6 hidden md:block max-w-lg">
                    {project.description}
                  </p>
                  
                  <div className="work-card-tags">
                    {project.tags.map((tag) => (
                      <span 
                        key={tag} 
                        className="text-[10px] uppercase tracking-wider px-3 py-1 border border-[var(--border-strong)] rounded-full text-[var(--text-muted)] bg-[var(--bg-primary)]/50 backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Arrow */}
                <svg className="work-card-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
