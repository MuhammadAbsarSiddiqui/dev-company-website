"use client";
import { useEffect } from "react";
import { useThemeStore } from "@/stores/themeStore";

export function ThemeInit() {
  const setTheme = useThemeStore((state) => state.setTheme);

  useEffect(() => {
    const saved = localStorage.getItem("theme") as "light" | "dark" | null;
    if (saved) {
      setTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  }, [setTheme]);

  return null;
}
