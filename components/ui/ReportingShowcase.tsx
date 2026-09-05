"use client";

// Agile Flex solutions page: "See it all in one place" reporting-platform
// showcase — eyebrow/heading/subheading above a single dashboard screenshot
// in a colored panel. Same visual language as a HowItWorks step panel, but
// static (no crossfade/pin — there's only one image here).
import Image from "next/image";
import type { ReportingShowcaseContent } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface ReportingShowcaseProps {
  content: ReportingShowcaseContent;
}

export default function ReportingShowcase({ content }: ReportingShowcaseProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-4xl px-4 pt-36 text-center sm:px-8 sm:pt-44">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-900/50">{content.subheading}</p>

      <div className="relative mx-auto mt-12 aspect-[5084/2156] w-full overflow-hidden rounded-2xl bg-[#E4EFE6]">
        <Image
          src={content.image.src}
          alt={content.image.alt}
          fill
          sizes="(min-width: 1024px) 896px, 100vw"
          className="object-contain object-bottom"
        />
      </div>
    </section>
  );
}
