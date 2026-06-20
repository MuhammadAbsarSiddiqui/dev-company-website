"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useThemeStore } from "@/stores/themeStore";
import { Moon, Sun } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { name: "Work", path: "/work" },
  { name: "Services", path: "/services" },
  { name: "About", path: "/about" },
  { name: "Blog", path: "/blog" },
  { name: "Contact", path: "/contact" },
];

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme, setCursorState } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-[height,background-color,backdrop-filter,border-color] duration-300 ease-out flex items-center px-8 md:px-16",
        scrolled
          ? "h-[60px] bg-[var(--bg-primary)]/80 backdrop-blur-md border-b border-[var(--border)]"
          : "h-[80px] bg-transparent border-b-transparent"
      )}
    >
      <div className="w-full max-w-7xl mx-auto flex items-center justify-between">
        <Link 
          href="/"
          className="text-xl font-bold tracking-tighter uppercase font-display"
          onMouseEnter={() => setCursorState("link")}
          onMouseLeave={() => setCursorState("default")}
        >
          DevStudio.
        </Link>

        <nav className="hidden md:flex items-center space-x-8">
          {links.map((link) => (
              <Link
              key={link.path}
              href={link.path}
              className="nav-link text-sm font-medium tracking-wide uppercase text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors duration-300"
              onMouseEnter={() => setCursorState("link")}
              onMouseLeave={() => setCursorState("default")}
            >
              <span>{link.name}</span>
              <span className="absolute top-full left-0 text-[var(--text-primary)]">{link.name}</span>
            </Link>
          ))}
          
          <button 
            onClick={toggleTheme}
            className="p-2 ml-4 rounded-full hover:bg-[var(--bg-secondary)] transition-colors"
            onMouseEnter={() => setCursorState("button", "THEME")}
            onMouseLeave={() => setCursorState("default")}
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>
        </nav>
      </div>
    </header>
  );
}
