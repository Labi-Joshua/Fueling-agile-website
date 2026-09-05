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
    <section className="mx-auto grid max-w-[1536px] grid-cols-1 items-center gap-12 px-4 pt-20 sm:px-8 sm:pt-28 lg:grid-cols-[1fr_1.4fr] lg:gap-8">
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
            href={content.primaryCtaHref}
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
          </Link>
          <Link
            href={content.secondaryCtaHref}
            className="flex items-center justify-center rounded-full border border-brand-500 px-5 py-3 text-sm font-semibold text-brand-500 transition-colors hover:bg-brand-500/5 sm:px-8 sm:py-4"
          >
            {content.secondaryCtaText}
          </Link>
        </div>
      </div>

      {/* Supporting illustration in a bordered card. TODO: content.image
          currently points at the homepage feature tab's placeholder graphic,
          which already has its own colored background baked in — swap in the
          dedicated isometric dashboard illustration once that file is
          provided, sized to sit on a plain background within this card. */}
      <div className="relative overflow-hidden rounded-3xl border border-brand-900/10 bg-white p-6 sm:p-10">
        <Image
          src={content.image.src}
          alt={content.image.alt}
          width={2000}
          height={1590}
          className="h-auto w-full rounded-2xl"
          priority
        />
      </div>
    </section>
  );
}
