"use client";

import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { CustomCursor } from "./CustomCursor";
import { ThemeInit } from "./ThemeInit";
import { ReactNode } from "react";

export function ClientLayout({ children }: { children: ReactNode }) {
  useSmoothScroll();

  return (
    <>
      <ThemeInit />
      <CustomCursor />
      {children}
    </>
  );
}
