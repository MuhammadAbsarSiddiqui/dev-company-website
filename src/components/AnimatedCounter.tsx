"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function AnimatedCounter({ value, suffix = "", prefix = "", decimals = 0 }: { value: number, suffix?: string, prefix?: string, decimals?: number }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const target = { val: 0 };
    
    ScrollTrigger.create({
      trigger: ref.current,
      start: "top 90%",
      onEnter: () => {
        gsap.to(target, {
          val: value,
          duration: 2,
          ease: "expo.out",
          onUpdate: () => {
            if (ref.current) {
              ref.current.innerText = prefix + target.val.toFixed(decimals) + suffix;
            }
          }
        });
      },
      once: true
    });
  }, [value, suffix, prefix, decimals]);

  return <span ref={ref} className="tabular-nums font-medium">0{suffix}</span>;
}
