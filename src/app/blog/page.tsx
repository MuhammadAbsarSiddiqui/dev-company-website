/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useThemeStore } from "@/stores/themeStore";

const posts = [
  {
    id: 1,
    title: "Building Resilient Event-Driven Architectures",
    category: "Architecture",
    date: "Jun 12, 2026",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Why We Chose Next.js App Router for Enterprise",
    category: "Frontend",
    date: "May 28, 2026",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Scaling PostgreSQL: Lessons from 100M Rows",
    category: "Database",
    date: "Apr 15, 2026",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 4,
    title: "The Future of AI in Software Development",
    category: "AI/ML",
    date: "Mar 02, 2026",
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800"
  }
];

function BlogCard({ post }: { post: typeof posts[0] }) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const setCursorState = useThemeStore((state) => state.setCursorState);

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!cardRef.current || !imageRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate mouse position relative to center of card
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    // Max rotation is 5deg
    const rotateX = -(y / (rect.height / 2)) * 5;
    const rotateY = (x / (rect.width / 2)) * 5;

    // Image parallax opposite to mouse
    const imgX = -(x / (rect.width / 2)) * 10;
    const imgY = -(y / (rect.height / 2)) * 10;

    gsap.to(cardRef.current, {
      rotateX,
      rotateY,
      duration: 0.1,
      ease: "power2.out"
    });

    gsap.to(imageRef.current, {
      x: imgX,
      y: imgY,
      scale: 1.05,
      duration: 0.1,
      ease: "power2.out"
    });
  };

  const handleMouseLeave = () => {
    if (!cardRef.current || !imageRef.current) return;
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
    gsap.to(imageRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
    setCursorState("default");
  };

  return (
    <Link 
      ref={cardRef}
      href={`/blog/${post.id}`} 
      className="blog-card group cursor-none opacity-0 flex flex-col gap-6"
      onMouseEnter={() => setCursorState("button", "READ")}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-full aspect-[4/3] rounded-sm overflow-hidden bg-[var(--bg-tertiary)] border border-[var(--border)] relative perspective-1000">
        <img 
          ref={imageRef}
          src={post.image} 
          alt={post.title} 
          className="blog-card-image absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] object-cover" 
        />
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-[var(--text-muted)]">
          <span className="text-[var(--accent)]">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-[var(--border-strong)]" />
          <span>{post.date}</span>
        </div>
        <h3 className="text-2xl font-bold font-display text-[var(--text-primary)] leading-snug transition-colors duration-300 group-hover:text-[var(--accent)]">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

export default function BlogPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(".page-label", { opacity: 0 }, { opacity: 1, duration: 1 }, 0.2);
    tl.fromTo(".page-header", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.3);
    tl.fromTo(".blog-card", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.5);
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen px-8 md:px-16 pt-8 pb-32">
      <div className="max-w-7xl mx-auto">
        <div className="page-label text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 opacity-0">
          INSIGHTS & ENGINEERING
        </div>
        <h1 className="page-header text-5xl md:text-7xl lg:text-8xl font-bold font-display leading-tight mb-24 opacity-0 max-w-4xl">
          Thoughts on system design, architecture, and code.
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
