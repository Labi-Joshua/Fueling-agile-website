"use client";

// Homepage hero: headline, subheadline, two CTA buttons, and the dashboard
// screenshot mockup below it. Elements marked `.hero-animate` fade/slide in on
// page load via GSAP.
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { HeroContent, DashboardImage } from "@/data/mockContent";
import DashboardMockup from "@/components/ui/DashboardMockup";

export interface HeroProps {
  content: HeroContent;
  dashboardImage: DashboardImage;
}

export default function Hero({ content, dashboardImage }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Staggered fade/slide-up entrance for the headline, subheadline, and CTA row
  useGSAP(
    () => {
      gsap.from(".hero-animate", {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.15,
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef}>
      <section className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-20 text-center sm:px-8 sm:py-28">
        <h1 className="hero-animate max-w-3xl font-heading text-4xl font-normal leading-[110%] tracking-[-2px] text-brand-900 sm:text-[64px]">
          {content.headline}
        </h1>
        <p className="hero-animate max-w-2xl text-lg text-brand-900/60">
          {content.subheadline}
        </p>
        <div className="hero-animate flex flex-col gap-4 sm:flex-row">
          <button
            type="button"
            className="rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
          >
            {content.primaryCtaText}
          </button>
          <button
            type="button"
            className="rounded-full border border-brand-900/20 px-8 py-4 text-sm font-semibold text-brand-900 transition-colors hover:border-brand-900"
          >
            {content.secondaryCtaText}
          </button>
        </div>
      </section>

      {/* Product/dashboard screenshot mockup, framed below the hero copy */}
      <DashboardMockup imageSrc={dashboardImage.src} imageAlt={dashboardImage.alt} />
    </div>
  );
}
