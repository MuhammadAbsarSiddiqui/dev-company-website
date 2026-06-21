"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransitionStore } from "@/stores/transitionStore";
import React from "react";

interface TransitionLinkProps extends Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export function TransitionLink({ href, children, className, ...props }: TransitionLinkProps) {
  const router = useRouter();
  const { startTransition } = useTransitionStore();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // If it's an external link or opens in new tab, let normal behavior happen
    if (href.startsWith('http') || props.target === '_blank') return;
    
    e.preventDefault();
    
    // Only transition if we are going to a different route
    if (window.location.pathname !== href) {
      startTransition();
      
      // Wait for the curtain to fully close before routing
      // The curtain exit animation is 0.8s + stagger, so 1000ms is safe.
      setTimeout(() => {
        router.push(href);
      }, 1000);
    }
  };

  return (
    <Link href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </Link>
  );
}
