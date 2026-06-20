"use client";

import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { motion, AnimatePresence } from "framer-motion";
import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/lib/utils";
import { Code2, Smartphone, Blocks, Sparkles, ArrowRight } from "lucide-react";

const services = [
  {
    id: 1,
    title: "SaaS Product Development",
    icon: Blocks,
    desc: "End-to-end SaaS platforms from concept to scale. We handle architecture, UX, backend, and deployment.",
    features: ["Multi-tenant Architecture", "Role-Based Access Control", "Stripe Integration", "API Rate Limiting"],
    stack: "Next.js, Node.js, PostgreSQL, AWS"
  },
  {
    id: 2,
    title: "Custom Web Applications",
    icon: Code2,
    desc: "Tailored web apps that solve real business problems. Fast, scalable, and maintainable from day one.",
    features: ["Real-Time Syncing", "Server-Side Rendering", "Fluid Layouts", "Complex Visualizations"],
    stack: "React, TypeScript, Tailwind CSS, Vercel"
  },
  {
    id: 3,
    title: "Mobile App Development",
    icon: Smartphone,
    desc: "Native and cross-platform mobile experiences that users love, built with React Native and Expo.",
    features: ["iOS & Android Codebases", "Push Notifications", "Biometric Auth", "Offline-First"],
    stack: "React Native, Expo, Firebase, Stripe"
  },
  {
    id: 4,
    title: "AI & Automation",
    icon: Sparkles,
    desc: "Intelligent systems that work for you. Integrate LLMs, ML models, and automation pipelines into your product.",
    features: ["LLM Fine-Tuning", "Vector Search Architectures", "RAG Systems", "RPA"],
    stack: "Python, OpenAI API, LangChain, Pinecone"
  }
];

export function ServicesPreview() {
  const [activeId, setActiveId] = useState<number>(1);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const setCursorState = useThemeStore((state) => state.setCursorState);

  useEffect(() => {
    if (!sectionRef.current || !headerRef.current) return;
    
    const tl = gsap.timeline({
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
    if (heading) tl.fromTo(heading, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.2);
    if (subhead) tl.fromTo(subhead, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.4);

    const accordion = sectionRef.current.querySelector('.accordion-container');
    if (accordion) {
      tl.fromTo(accordion, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, 0.4);
    }
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-32 px-8 md:px-16 w-full bg-[var(--bg-primary)]">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        
        {/* Header - Sticky on desktop */}
        <div ref={headerRef} className="w-full lg:w-1/3">
          <div className="lg:sticky lg:top-32">
            <div className="section-label text-xs font-bold tracking-[0.2em] uppercase text-[var(--accent)] mb-6 opacity-0">
              WHAT WE DO
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display leading-[1.1] mb-6 opacity-0">
              Full-Stack Software Services.
            </h2>
            <p className="text-lg text-[var(--text-secondary)] leading-relaxed mb-8 opacity-0">
              We deliver end-to-end design, development, and scaling for modern digital products.
            </p>
          </div>
        </div>

        {/* Accordion List */}
        <div className="w-full lg:w-2/3 flex flex-col gap-4 accordion-container opacity-0">
          {services.map((service) => {
            const isActive = activeId === service.id;
            const Icon = service.icon;
            
            return (
              <motion.div
                key={service.id}
                layout
                onClick={() => setActiveId(service.id)}
                className={cn(
                  "service-card rounded-sm",
                  isActive ? "active" : "bg-[var(--bg-primary)]"
                )}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onMouseEnter={() => !isActive && setCursorState("button", "EXPAND")}
                onMouseLeave={() => setCursorState("default")}
              >
                <motion.div layout className="p-6 md:p-8 flex items-center gap-4 md:gap-6">
                  <div className={cn("p-4 rounded-full transition-colors duration-500", isActive ? "bg-[var(--text-primary)] text-[var(--bg-primary)]" : "bg-[var(--bg-tertiary)] text-[var(--text-secondary)]")}>
                    <Icon size={24} className="service-card-icon shrink-0" />
                  </div>
                  <motion.h3 layout className="text-xl md:text-2xl font-bold font-display flex-grow">
                    {service.title}
                  </motion.h3>
                  <motion.div
                    animate={{ rotate: isActive ? 90 : 0 }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    className="text-[var(--text-muted)] shrink-0 hidden sm:block"
                  >
                    <ArrowRight size={24} />
                  </motion.div>
                </motion.div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    >
                      <div className="px-6 pb-8 md:px-8 md:pb-8 pt-0 sm:pl-[104px]">
                        <motion.p 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 }}
                          className="text-[var(--text-secondary)] leading-relaxed mb-6"
                        >
                          {service.desc}
                        </motion.p>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                          <div>
                            <motion.h4 
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                              className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)] mb-3"
                            >
                              Features
                            </motion.h4>
                            <ul className="space-y-2">
                              {service.features.map((feat, i) => (
                                <motion.li 
                                  key={feat}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: 0.2 + (i * 0.05) }}
                                  className="text-sm text-[var(--text-primary)] flex items-center gap-2"
                                >
                                  <div className="w-1 h-1 rounded-full bg-[var(--accent)] shrink-0" />
                                  {feat}
                                </motion.li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <motion.h4 
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
                              className="text-[10px] font-bold tracking-widest uppercase text-[var(--text-muted)] mb-3"
                            >
                              Tech Stack
                            </motion.h4>
                            <motion.p 
                              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
                              className="text-sm text-[var(--text-primary)]"
                            >
                              {service.stack}
                            </motion.p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
