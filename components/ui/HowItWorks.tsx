"use client";

// Homepage "How to Get Started" section: a 2x2 grid of colored cards, each
// pairing a short title/description with an illustration or product
// screenshot bleeding out of the bottom of the card.
import Image from "next/image";
import type { HowItWorksContent, HowItWorksStep } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface HowItWorksProps {
  content: HowItWorksContent;
}

// Background + text color treatment per card theme (see HowItWorksStep in mockContent.ts)
const THEME_STYLES: Record<HowItWorksStep["theme"], { bg: string; heading: string; body: string }> = {
  green: { bg: "bg-brand-500", heading: "text-white", body: "text-white/80" },
  lavender: { bg: "bg-[#E7E2F7]", heading: "text-brand-900", body: "text-brand-900/60" },
  mint: { bg: "bg-[#E4EFE6]", heading: "text-brand-900", body: "text-brand-900/60" },
};

export default function HowItWorks({ content }: HowItWorksProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1536px] px-4 pt-36 text-center sm:px-8 sm:pt-44">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.title}
      </h2>
      <p className="mt-2 text-sm text-brand-900/50">{content.subtitle}</p>

      <div className="mt-12 grid grid-cols-1 gap-6 text-left md:grid-cols-2">
        {content.steps.map((step) => {
          const theme = THEME_STYLES[step.theme];

          return (
            <div
              key={step.title}
              className={`relative aspect-[4/3] overflow-hidden rounded-2xl sm:aspect-[16/11] ${theme.bg}`}
            >
              <div className="relative z-10 p-8">
                <h3 className={`text-xl font-semibold ${theme.heading}`}>{step.title}</h3>
                <p className={`mt-2 max-w-xs text-sm leading-relaxed ${theme.body}`}>
                  {step.description}
                </p>
              </div>

              {/* Illustration/screenshot. Confined to the bottom two-thirds of the
                  card (never above top-1/3) so it can never overlap the text above,
                  regardless of description length or breakpoint — while still
                  bleeding past the card's right/bottom edges via overflow-hidden. */}
              <div className="absolute inset-x-0 bottom-0 top-1/3">
                <Image
                  src={step.image.src}
                  alt={step.image.alt}
                  fill
                  className="object-contain object-right-bottom"
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
