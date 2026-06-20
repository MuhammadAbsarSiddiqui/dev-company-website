import { Hero } from "@/sections/home/Hero";
import { Philosophy } from "@/sections/home/Philosophy";
import { FeaturedWork } from "@/sections/home/FeaturedWork";
import { ServicesPreview } from "@/sections/home/ServicesPreview";
import { Process } from "@/sections/home/Process";
import { TechStack } from "@/sections/home/TechStack";
import { StatsBanner } from "@/sections/home/StatsBanner";
import { BlogPreview } from "@/sections/home/BlogPreview";
import { CTABanner } from "@/sections/home/CTABanner";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
  description: "DevStudio is a premium software development agency. We engineer custom SaaS, web, and mobile solutions with zero ambiguity.",
};

export default function Home() {
  return (
    <div className="w-full flex flex-col">
      <Hero />
      <Philosophy />
      <FeaturedWork />
      <ServicesPreview />
      <Process />
      <TechStack />
      <StatsBanner />
      <BlogPreview />
      <CTABanner />
    </div>
  );
}
