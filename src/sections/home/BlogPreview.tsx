/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      transformPerspective: 1000,
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
      <div className="w-full aspect-[4/3] rounded-sm overflow-hidden bg-bg-tertiary border border-border relative perspective-1000 pointer-events-none">
        <img 
          ref={imageRef}
          src={post.image} 
          alt={post.title} 
          className="blog-card-image absolute inset-[-20px] w-[calc(100%+40px)] h-[calc(100%+40px)] object-cover" 
        />
      </div>
      <div className="flex flex-col gap-3 relative">
        <div className="flex items-center gap-3 text-xs font-bold tracking-widest uppercase text-text-muted transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 absolute top-[-20px]">
          <span className="text-accent">{post.category}</span>
          <span className="w-1 h-1 rounded-full bg-border-strong" />
          <span>{post.date}</span>
        </div>
        <h3 className="text-2xl font-bold font-display text-text-primary leading-snug transition-all duration-300 group-hover:text-accent group-hover:translate-y-2 mt-2">
          {post.title}
        </h3>
      </div>
    </Link>
  );
}

export function BlogPreview() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const setCursorState = useThemeStore((state) => state.setCursorState);

  useEffect(() => {
    if (!sectionRef.current) return;
    
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
    if (heading) tl.fromTo(heading, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2);
    if (subhead) tl.fromTo(subhead, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.4);
    if (link) tl.fromTo(link, { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 0.8, ease: "power3.out" }, 0.6);

    const cards = sectionRef.current.querySelectorAll('.blog-card');
    gsap.fromTo(cards, 
      { opacity: 0, y: 40 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".blog-grid",
          start: "top 85%",
          once: true
        }
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-8 md:px-16 w-full bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto">
        
        <div ref={headerRef} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-2xl">
            <div className="section-label text-xs font-bold tracking-[0.2em] uppercase text-accent mb-6 opacity-0">
              LATEST INSIGHTS
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display leading-[1.1] mb-6 opacity-0">
              Thoughts on Engineering.
            </h2>
            <p className="text-lg text-text-secondary leading-relaxed opacity-0">
              Deep dives into system design, architecture, and the future of software.
            </p>
          </div>
          <div className="view-all-link opacity-0 pb-2">
            <Link 
              href="/blog" 
              className="group flex items-center gap-2 text-text-primary font-bold tracking-widest text-xs uppercase"
              onMouseEnter={() => setCursorState("link")}
              onMouseLeave={() => setCursorState("default")}
            >
              <span className="border-b border-text-primary pb-1 transition-colors hover:text-accent hover:border-accent">Read the Blog</span>
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        <div className="blog-grid grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

      </div>
    </section>
  );
}
