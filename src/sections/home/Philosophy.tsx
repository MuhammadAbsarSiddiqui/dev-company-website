"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

export function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    
    // Split heading into words
    if (headingRef.current) {
      const words = headingRef.current.innerText.split(' ');
      headingRef.current.innerHTML = words.map(w => `<span class="inline-block overflow-hidden"><span class="word inline-block">${w}&nbsp;</span></span>`).join('');
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        once: true
      }
    });

    // Typewriter label
    if (labelRef.current) {
      const text = labelRef.current.getAttribute("data-text") || "";
      labelRef.current.innerText = "";
      gsap.to(labelRef.current, { opacity: 1, duration: 0 }); // Make visible
      
      const charDelay = 0.03;
      text.split('').forEach((char, i) => {
        tl.to(labelRef.current, {
          onStart: () => {
            if (labelRef.current) labelRef.current.innerText += char;
          },
          duration: charDelay
        }, i * charDelay);
      });
      tl.add("labelDone");
    }

    tl.fromTo(headingRef.current?.querySelectorAll('.word') || [],
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.03, ease: "power3.out" },
      "labelDone-=0.2"
    );

    tl.fromTo(bodyRef.current,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    );

    tl.fromTo(mediaRef.current,
      { scale: 0.95, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "power2.out" },
      "-=0.6"
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-8 md:px-16 w-full bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16 items-center">
        <div className="w-full md:w-1/2">
          <div 
            ref={labelRef} 
            data-text="OUR PHILOSOPHY" 
            className="text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 opacity-0 h-4"
          />
          <h2 ref={headingRef} className="text-4xl md:text-5xl lg:text-6xl font-bold font-display leading-[1.1] mb-8">
            We partner with ambitious teams to build software that matters.
          </h2>
          <p ref={bodyRef} className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-lg opacity-0">
            No templates. No shortcuts. Every project is built from first principles, with obsessive attention to performance, design, and maintainability. From system architecture to micro-interactions, we ensure every detail of your product screams quality.
          </p>
        </div>
        
        <div className="w-full md:w-1/2 perspective-1000">
          <div ref={mediaRef} className="opacity-0 bg-[var(--bg-secondary)] border border-[var(--border)] rounded-sm p-6 md:p-8 font-mono text-sm sm:text-base leading-relaxed overflow-hidden shadow-2xl transform rotate-y-[5deg] rotate-x-[2deg] transition-transform duration-700 hover:rotate-0">
            <div className="flex gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-[var(--border-strong)]" />
              <div className="w-3 h-3 rounded-full bg-[var(--border-strong)]" />
              <div className="w-3 h-3 rounded-full bg-[var(--border-strong)]" />
            </div>
            <CodeTypingEffect />
          </div>
        </div>
      </div>
    </section>
  );
}

function CodeTypingEffect() {
  const [lines, setLines] = useState<string[]>([]);
  const [cursorVisible, setCursorVisible] = useState(true);
  
  useEffect(() => {
    const codeLines = [
      "import { Architecture } from '@devstudio/core';",
      "",
      "const project = new Architecture({",
      "  performance: 'obsessive',",
      "  design: 'first-principles',",
      "  maintainability: true,",
      "});",
      "",
      "project.build().then(() => {",
      "  console.log('Quality guaranteed.');",
      "});"
    ];

    let currentLine = 0;
    
    const interval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setLines(prev => [...prev, codeLines[currentLine]]);
        currentLine++;
      } else {
        clearInterval(interval);
      }
    }, 600);

    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 500);

    return () => {
      clearInterval(interval);
      clearInterval(cursorInterval);
    };
  }, []);

  return (
    <div className="text-[var(--text-muted)] h-[280px]">
      {lines.map((line, i) => (
        <div key={i} className="animate-fade-in opacity-0" style={{ animationFillMode: "forwards" }}>
          {(line || '').replace(/('.*?')/g, '<span class="text-[var(--accent)] opacity-80">$1</span>')
               .replace(/\b(import|from|const|new|true|then)\b/g, '<span class="text-blue-400">$1</span>')
               .replace(/\b(Architecture|console)\b/g, '<span class="text-purple-400">$1</span>')
               .split('\n')
               .map((l, index) => <div key={index} dangerouslySetInnerHTML={{ __html: l || '&nbsp;' }} />)}
        </div>
      ))}
      <div className="inline-block mt-1">
        <span className={cn("inline-block w-2 h-4 bg-[var(--accent)] ml-1 align-middle transition-opacity duration-100", cursorVisible ? "opacity-100" : "opacity-0")} />
      </div>
    </div>
  );
}
