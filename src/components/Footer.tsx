"use client";

import { useEffect, useRef } from "react";
import { TransitionLink as Link } from "@/components/TransitionLink";
import { ArrowRight } from "lucide-react";
import { useThemeStore } from "@/stores/themeStore";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Footer() {
  const setCursorState = useThemeStore((state) => state.setCursorState);
  const textRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!textRef.current || !footerRef.current) return;
    
    gsap.fromTo(textRef.current, 
      { y: 150 },
      { 
        y: -100, 
        ease: "none",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top bottom",
          end: "bottom bottom",
          scrub: true
        }
      }
    );
  }, []);

  return (
    <footer ref={footerRef} className="relative min-h-[40vh] bg-bg-secondary text-text-primary pt-24 pb-8 px-8 md:px-16 overflow-hidden border-t border-border mt-24">
      <div className="max-w-7xl mx-auto flex flex-col justify-between h-full relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-2xl font-bold font-display uppercase tracking-tighter mb-4">DS DevStudio</h3>
            <p className="text-text-secondary text-sm leading-relaxed mb-6">
              We partner with ambitious teams to build world-class software products. End-to-end engineering from concept to scale.
            </p>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-6">Company</h4>
            <ul className="space-y-3 text-sm">
              {['Work', 'Services', 'About', 'Blog', 'Contact'].map(item => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase()}`} className="hover:text-accent transition-colors"
                    onMouseEnter={() => setCursorState("link")}
                    onMouseLeave={() => setCursorState("default")}
                  >{item}</Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-6">Services</h4>
            <ul className="space-y-3 text-sm text-text-secondary">
              <li>SaaS Platforms</li>
              <li>Web Applications</li>
              <li>Mobile Apps</li>
              <li>AI Integrations</li>
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-text-muted mb-6">Newsletter</h4>
            <p className="text-text-secondary text-sm leading-relaxed mb-4">
              Subscribe to our weekly dispatch of software engineering insights, case studies, and tools.
            </p>
            <div className="flex border-b border-border-strong focus-within:border-text-primary transition-colors">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="w-full bg-transparent py-2 text-sm outline-none placeholder-text-muted" 
              />
              <button className="p-2"
                onMouseEnter={() => setCursorState("button")}
                onMouseLeave={() => setCursorState("default")}
              >
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-text-muted border-t border-border pt-8">
          <p>© 2026 DevStudio. All rights reserved. Built with Next.js & GSAP.</p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-text-primary transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-text-primary transition-colors">Terms of Service</Link>
            
            <div className="flex items-center gap-4 ml-8 border-l border-border pl-8">
              {['Twitter', 'GitHub', 'LinkedIn'].map((social) => (
                <a 
                  key={social} 
                  href={`#${social.toLowerCase()}`}
                  className="social-icon"
                  onMouseEnter={() => setCursorState("link")}
                  onMouseLeave={() => setCursorState("default")}
                  aria-label={social}
                >
                  <span className="text-[10px] font-bold tracking-wider">{social.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Massive Background Logo */}
      <div ref={textRef} className="absolute bottom-[-10vw] right-[-5vw] text-[15vw] font-black tracking-tighter opacity-[0.03] select-none pointer-events-none font-display">
        DEVSTUDIO
      </div>
    </footer>
  );
}
