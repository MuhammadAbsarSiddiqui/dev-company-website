"use client";

import { useRef, useEffect, ReactNode } from "react";
import gsap from "gsap";
import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  strength?: number;
  radius?: number;
  label?: string; // Optional cursor label override
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export function MagneticButton({
  children,
  strength = 0.3,
  radius = 100,
  label = "CLICK",
  className,
  variant = "primary",
  ...props
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const setCursorState = useThemeStore((state) => state.setCursorState);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

      const handleMouseMove = (e: MouseEvent) => {
      const rect = button.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Update CSS variables for radial fill
      button.style.setProperty("--x", `${mouseX}px`);
      button.style.setProperty("--y", `${mouseY}px`);

      const h = rect.width / 2;
      const w = rect.height / 2;
      const x = mouseX - h;
      const y = mouseY - w;

      const distance = Math.sqrt(x * x + y * y);

      if (distance < radius) {
        gsap.to(button, {
          x: x * strength,
          y: y * strength,
          duration: 0.3,
          ease: "power2.out",
        });
      } else {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.7,
          ease: "elastic.out(1, 0.3)",
        });
      }
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.3)",
      });
      setCursorState("default");
    };
    
    const handleMouseEnter = () => {
      setCursorState("button", label);
    };

    window.addEventListener("mousemove", handleMouseMove);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [strength, radius, label, setCursorState]);

  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 font-medium rounded-sm transition-colors duration-300";
  const variants = {
    primary: "magnetic-button border border-text-primary text-text-primary",
    secondary: "bg-bg-secondary text-text-primary border border-border hover:border-text-primary",
    ghost: "bg-transparent text-text-primary hover:bg-bg-secondary"
  };

  return (
    <button
      ref={buttonRef}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      <span>{children}</span>
    </button>
  );
}
