// Bespoke Solutions page (/solutions/bespoke) hero: two-column layout —
// eyebrow/heading/subheadline/CTAs on the left, a supporting illustration in
// a bordered card on the right (stacks to a single column on mobile). Same
// two-column shape as the homepage's Hero.tsx, but with plain link CTAs
// instead of Hero.tsx's modal-opening button — this page has no fuel card
// product to route into the sitewide "Request fuel cards" modal.
import Image from "next/image";
import Link from "next/link";
import type { BespokeHeroContent } from "@/data/mockContent";

export interface BespokeHeroProps {
  content: BespokeHeroContent;
}

export default function BespokeHero({ content }: BespokeHeroProps) {
  return (
    <section className="mx-auto grid max-w-[1536px] grid-cols-1 items-center gap-12 px-4 pt-20 sm:px-8 lg:grid-cols-[1fr_1.4fr] lg:gap-8">
      <div className="flex flex-col items-start text-left lg:px-8">
        <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
          {content.eyebrow}
        </span>
        <h1 className="mt-2 font-heading text-4xl font-normal leading-[110%] tracking-[-2px] text-brand-900 sm:text-[52px]">
          {content.heading}
        </h1>
        <p className="mt-4 max-w-md text-lg text-brand-900/60">{content.subheading}</p>

        <div className="mt-8 flex flex-row gap-3 sm:gap-4">
          <Link
            href={content.ctaHref}
            className="flex items-center justify-center gap-2 rounded-full bg-brand-500 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600 sm:px-8 sm:py-4"
          >
            {content.ctaText}
            <svg width="14" height="14" viewBox="0 0 12 12" fill="none">
              <path
                d="M3 1.5L8.5 6L3 10.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      {/* Supporting illustration — its background/border/shadow are already
          baked into the source image, so it's rendered as-is with no card
          chrome around it. */}
      <Image
        src={content.image.src}
        alt={content.image.alt}
        width={2000}
        height={1590}
        className="h-auto w-full"
        priority
      />
    </section>
  );
}
