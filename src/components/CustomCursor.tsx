"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useMousePosition } from "@/hooks/useMousePosition";
import { useThemeStore } from "@/stores/themeStore";

export function CustomCursor() {
  const { x, y } = useMousePosition();
  const { cursorVariant, cursorLabel } = useThemeStore();
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    
    if (isReducedMotion || isTouchDevice) {
      if (dotRef.current) dotRef.current.style.display = "none";
      if (ringRef.current) ringRef.current.style.display = "none";
      return;
    }

    // Move inner dot instantly
    gsap.to(dotRef.current, {
      x,
      y,
      duration: 0,
    });

    // Move outer ring with lag
    gsap.to(ringRef.current, {
      x,
      y,
      duration: 0.15,
      ease: "power2.out",
    });
  }, [x, y]);

  useEffect(() => {
    if (cursorVariant === "button" || cursorVariant === "link") {
      gsap.to(ringRef.current, { scale: 1.5, opacity: 1.0, duration: 0.3 });
      if (cursorLabel) {
        gsap.to(textRef.current, { opacity: 1, scale: 1, duration: 0.3 });
      }
    } else {
      gsap.to(ringRef.current, { scale: 1, opacity: 0.6, duration: 0.3 });
      gsap.to(textRef.current, { opacity: 0, scale: 0.8, duration: 0.3 });
    }
  }, [cursorVariant, cursorLabel]);

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 bg-white rounded-full mix-blend-difference pointer-events-none z-[100]"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 -ml-4 -mt-4 border border-white rounded-full mix-blend-difference pointer-events-none z-[99] flex items-center justify-center"
      >
        <div ref={textRef} className="opacity-0 scale-80 text-[10px] font-bold tracking-widest text-white uppercase whitespace-nowrap absolute">
          {cursorLabel}
        </div>
      </div>
    </>
  );
}
