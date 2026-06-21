"use client";

import { motion, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useTransitionStore } from "@/stores/transitionStore";

gsap.registerPlugin(ScrollTrigger);

const anim: Variants = {
  initial: { height: "20vh" },
  open: (i: number) => ({
    height: "0vh",
    transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1], delay: 0.05 * i }
  }),
  closed: (i: number) => ({
    height: "20vh",
    transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1], delay: 0.05 * i }
  })
};

const textAnim: Variants = {
  initial: { opacity: 0 },
  open: { 
    opacity: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  },
  closed: { 
    opacity: 1,
    transition: { duration: 0.4, delay: 0.4, ease: "easeIn" }
  }
};

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { isTransitioning, endTransition } = useTransitionStore();

  // When pathname changes, it means the new route has finished loading and mounted.
  // We can now safely "open" the curtains.
  useEffect(() => {
    endTransition();
    
    // Refresh GSAP ScrollTrigger after curtains open to fix layout bugs
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [pathname, endTransition]);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-100 flex flex-col justify-start">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={anim}
            initial="initial"
            animate={isTransitioning ? "closed" : "open"}
            className="w-full bg-bg-primary border-b border-border-strong"
          />
        ))}
        
        {/* Centered DevStudio Logo overlay during transition */}
        <motion.div 
          variants={textAnim}
          initial="initial"
          animate={isTransitioning ? "closed" : "open"}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <span className="text-4xl md:text-6xl font-bold font-display tracking-[0.3em] uppercase text-text-primary">
            DevStudio
          </span>
        </motion.div>
      </div>
      {children}
    </>
  );
}
