"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ServicesPreview } from "@/sections/home/ServicesPreview";

export default function ServicesPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(".page-label", { opacity: 0 }, { opacity: 1, duration: 1 }, 0.2);
    tl.fromTo(".page-header", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.3);
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-8 md:px-16 mb-16">
        <div className="page-label text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 opacity-0">
          CAPABILITIES
        </div>
        <h1 className="page-header text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight opacity-0 max-w-4xl">
          Comprehensive engineering for ambitious products.
        </h1>
      </div>
      
      {/* Reuse the ServicesPreview accordion block from homepage */}
      <ServicesPreview />
    </div>
  );
}
