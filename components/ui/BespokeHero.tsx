// Bespoke Solutions page (/solutions/bespoke) hero: centered heading/subheading
// above a supporting image, with plain link CTAs instead of Hero.tsx's
// modal-opening button — this page has no fuel card product to route into the
// sitewide "Request fuel cards" modal.
import Image from "next/image";
import Link from "next/link";
import type { BespokeHeroContent } from "@/data/mockContent";

export interface BespokeHeroProps {
  content: BespokeHeroContent;
}

export default function BespokeHero({ content }: BespokeHeroProps) {
  return (
    <section className="mx-auto max-w-5xl px-4 pt-20 text-center sm:px-8 sm:pt-28">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h1 className="mx-auto mt-3 font-heading text-2xl font-normal leading-[110%] tracking-[-2px] text-brand-900 sm:text-[56px]">
        {content.heading}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-brand-900/50">{content.subheading}</p>

      <div className="mt-8 flex flex-row justify-center gap-3 sm:gap-4">
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

      {/* Image already has its own illustrated background baked in (same
          asset used edge-to-edge in FeatureRows on the homepage), so it's
          rendered directly with no extra card/panel wrapper around it. */}
      <div className="relative mx-auto mt-16 max-w-2xl">
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
