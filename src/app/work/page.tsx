/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: 1,
    title: "IntelliTrade",
    category: "SaaS",
    tags: ["Next.js", "AI", "Postgres"],
    image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=1200",
  },
  {
    id: 2,
    title: "FlowDesk",
    category: "Web App",
    tags: ["React", "Node.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 3,
    title: "ShipSync",
    category: "Mobile",
    tags: ["React Native", "GraphQL"],
    image: "https://images.unsplash.com/photo-1586528116311-ad8ed7c508b0?auto=format&fit=crop&q=80&w=800",
  },
  {
    id: 4,
    title: "AuraAnalytics",
    category: "Dashboard",
    tags: ["Vue", "D3.js", "Firebase"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
  }
];

const categories = ["All", "SaaS", "Web App", "Mobile", "Dashboard"];

export default function WorkPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const setCursorState = useThemeStore((state) => state.setCursorState);
  
  const [activeCategory, setActiveCategory] = useState("All");
  const filteredProjects = activeCategory === "All" ? projects : projects.filter(p => p.category === activeCategory);
  const pillRef = useRef<HTMLDivElement>(null);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(".page-label", { opacity: 0 }, { opacity: 1, duration: 1 }, 0.2);
    tl.fromTo(".page-header", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.3);
    tl.fromTo(".filter-container", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.4);
    tl.fromTo(".work-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.5);
  }, []);

  // Filter Tabs Pill Animation
  useEffect(() => {
    const activeIndex = categories.indexOf(activeCategory);
    const activeTab = tabsRef.current[activeIndex];
    
    if (activeTab && pillRef.current) {
      gsap.to(pillRef.current, {
        x: activeTab.offsetLeft,
        width: activeTab.offsetWidth,
        duration: 0.5,
        ease: "expo.out"
      });
    }
  }, [activeCategory]);

  return (
    <div ref={containerRef} className="w-full min-h-screen px-8 md:px-16 pt-8 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="page-label text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 opacity-0">
          OUR PORTFOLIO
        </div>
        <h1 className="page-header text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-16 opacity-0 max-w-3xl">
          Digital experiences engineered to perfection.
        </h1>

        {/* Filter Tabs */}
        <div className="filter-container relative flex items-center gap-2 mb-16 pb-4 border-b border-[var(--border)] overflow-x-auto opacity-0 hide-scrollbar">
          <div 
            ref={pillRef} 
            className="filter-tab-bg" 
            style={{ width: 0, x: 0 }}
          />
          {categories.map((cat, i) => (
            <button
              key={cat}
              ref={el => { tabsRef.current[i] = el; }}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "filter-tab text-sm font-medium tracking-wide uppercase whitespace-nowrap",
                activeCategory === cat ? "active" : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              )}
              onMouseEnter={() => setCursorState("button", "FILTER")}
              onMouseLeave={() => setCursorState("default")}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, i) => (
            <Link 
              href={`/work/${project.id}`} 
              key={project.id}
              className={cn("work-card block group cursor-none relative rounded-sm opacity-0", i % 2 !== 0 ? "md:mt-24" : "")}
              onMouseEnter={() => setCursorState("button", "VIEW")}
              onMouseLeave={() => setCursorState("default")}
            >
              <div className="w-full aspect-[4/5] relative bg-[var(--bg-tertiary)] border-none">
                <img src={project.image} alt={project.title} className="work-card-image absolute inset-0 w-full h-full object-cover" />
                
                <div className="work-card-content">
                  <div className="text-[10px] font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-2">
                    {project.category}
                  </div>
                  <h3 className="work-card-title text-3xl font-bold font-display text-[var(--text-primary)] mb-4">
                    {project.title}
                  </h3>
                  <div className="work-card-tags">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[10px] uppercase tracking-wider px-3 py-1 border border-[var(--border-strong)] rounded-full text-[var(--text-muted)] bg-[var(--bg-primary)]/50 backdrop-blur-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <svg className="work-card-arrow" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="var(--text-primary)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
