"use client";

// Homepage hero: two-column layout — eyebrow/headline/subheadline/CTAs on the
// left, a fleet-dashboard-and-card graphic on the right (stacks to a single
// column on mobile). Elements marked `.hero-animate` fade/slide in on page load via GSAP.
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { HeroContent, DashboardImage } from "@/data/mockContent";
import ActiveCardsBadge from "@/components/ui/ActiveCardsBadge";
import { useRequestFuelCardModal } from "@/components/providers/RequestFuelCardModalProvider";

export interface HeroProps {
  content: HeroContent;
  dashboardImage: DashboardImage;
  showActiveCardsBadge?: boolean;
}

export default function Hero({ content, dashboardImage, showActiveCardsBadge = true }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { open: openRequestFuelCardModal } = useRequestFuelCardModal();

  // Staggered fade/slide-up entrance for the eyebrow, headline, subheadline,
  // CTA row, and graphic
  useGSAP(
    () => {
      gsap.from(".hero-animate", {
        y: 12,
        opacity: 0,
        duration: 0.35,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: containerRef }
  );

  return (
    <section
      ref={containerRef}
      className="mx-auto grid max-w-[1536px] grid-cols-1 items-center gap-12 px-4 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-[1fr_1.4fr] lg:gap-8"
    >
      <div className="flex flex-col items-start px-8 text-left">
        <span className="hero-animate text-xs font-semibold uppercase tracking-wide text-orange-500">
          {content.eyebrow}
        </span>
        <h1 className="hero-animate mt-2 font-heading text-4xl font-normal leading-[110%] tracking-[-2px] text-brand-900 sm:text-[52px]">
          {content.headline}
        </h1>
        <p className="hero-animate mt-4 max-w-md text-lg text-brand-900/60">
          {content.subheadline}
        </p>
        <div className="hero-animate mt-16 flex flex-row gap-3 sm:gap-4">
          <button
            type="button"
            onClick={openRequestFuelCardModal}
            className="flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 sm:px-8 sm:py-4"
          >
            {content.primaryCtaText}
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 1.5L8.5 6L3 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            className="rounded-full border border-brand-500 px-5 py-3 text-sm font-semibold text-brand-500 transition-colors hover:bg-brand-500/5 sm:px-8 sm:py-4"
          >
            {content.secondaryCtaText}
          </button>
        </div>

        {showActiveCardsBadge && (
          <div className="hero-animate mt-6">
            <ActiveCardsBadge />
          </div>
        )}
      </div>

      {/* Fleet dashboard + card graphic — its background/shadow/circular
          accent are all baked into the source PNG, so it's rendered as-is. */}
      <div className="hero-animate relative">
        <Image
          src={dashboardImage.src}
          alt={dashboardImage.alt}
          width={1600}
          height={1264}
          className="h-auto w-full"
          priority
        />
      </div>
    </section>
  );
}
