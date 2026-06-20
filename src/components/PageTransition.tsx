"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const anim: Variants = {
  initial: { height: "20vh" },
  enter: (i: number) => ({
    height: "0vh",
    transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1], delay: 0.05 * i }
  }),
  exit: (i: number) => ({
    height: "20vh",
    transition: { duration: 0.8, ease: [0.87, 0, 0.13, 1], delay: 0.05 * i }
  })
};

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  // Refresh ScrollTrigger after route changes and animations to fix glitchy GSAP triggers
  useEffect(() => {
    const timeout = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="w-full min-h-screen">
        <div className="fixed inset-0 pointer-events-none z-[100] flex flex-col justify-start">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={anim}
              initial="initial"
              animate="enter"
              exit="exit"
              className="w-full bg-[var(--bg-primary)] border-b border-[var(--border-strong)]"
            />
          ))}
        </div>
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
