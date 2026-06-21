"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { MagneticButton } from "@/components/MagneticButton";

export default function ContactPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const tl = gsap.timeline();
    tl.fromTo(".page-label", { opacity: 0 }, { opacity: 1, duration: 1 }, 0.2);
    tl.fromTo(".page-header", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.3);
    tl.fromTo(".page-form", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power3.out" }, 0.5);
  }, []);

  return (
    <div ref={containerRef} className="w-full min-h-screen px-8 md:px-16 pt-8 pb-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-16">
        <div className="w-full md:w-1/2">
          <div className="page-label text-xs font-bold tracking-[0.2em] uppercase text-accent mb-6 opacity-0">
            GET IN TOUCH
          </div>
          <h1 className="page-header text-5xl md:text-7xl font-bold font-display leading-tight mb-8 opacity-0">
            Let&apos;s start a conversation.
          </h1>
          <p className="page-header text-lg text-text-secondary leading-relaxed mb-12 opacity-0 max-w-md">
            Whether you have a fully fleshed-out RFP or just an idea on a napkin, we&apos;re ready to help you build it.
          </p>
          
          <div className="page-header space-y-8 opacity-0">
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-text-muted mb-2">Email</h3>
              <p className="text-xl font-medium text-text-primary">hello@devstudio.com</p>
            </div>
            <div>
              <h3 className="text-xs font-bold tracking-widest uppercase text-text-muted mb-2">Office</h3>
              <p className="text-xl font-medium text-text-primary">
                120 Tech Boulevard<br />
                Suite 400<br />
                San Francisco, CA 94105
              </p>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2">
          <div className="page-form bg-bg-secondary border border-border rounded-sm p-8 md:p-12 opacity-0">
            <form className="flex flex-col gap-8" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest uppercase text-text-primary">Name</label>
                <input type="text" className="w-full bg-bg-primary border border-border-strong rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors" placeholder="Jane Doe" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest uppercase text-text-primary">Email</label>
                <input type="email" className="w-full bg-bg-primary border border-border-strong rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors" placeholder="jane@company.com" />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold tracking-widest uppercase text-text-primary">Project Details</label>
                <textarea rows={5} className="w-full bg-bg-primary border border-border-strong rounded-sm px-4 py-3 text-text-primary focus:outline-none focus:border-accent transition-colors resize-none" placeholder="Tell us about your project..." />
              </div>
              <div className="pt-4">
                <MagneticButton variant="primary">Send Message</MagneticButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
