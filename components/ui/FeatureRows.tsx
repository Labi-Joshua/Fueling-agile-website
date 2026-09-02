"use client";

// Homepage feature showcase: each product/solution gets its own row, alternating
// image-left/text-right and text-left/image-right down the page. Each image
// already has its own swirl/background baked in, so it's rendered edge-to-edge
// with no card chrome around it.
import Image from "next/image";
import type { FeaturesContent } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface FeatureRowsProps {
  content: FeaturesContent;
}

export default function FeatureRows({ content }: FeatureRowsProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="mx-auto max-w-[1536px] px-4 pt-36 text-center sm:px-8 sm:pt-44"
    >
      <h2 className="text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.title}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-900/50">
        {content.subtitle}
      </p>

      <div className="mt-16 flex flex-col gap-20">
        {content.tabs.map((tab, index) => {
          // Even rows: image on the left. Odd rows: image on the right.
          const imageFirst = index % 2 === 0;

          return (
            <div
              key={tab.label}
              className="grid grid-cols-1 items-center gap-10 text-left md:grid-cols-2 md:gap-16"
            >
              <div className={imageFirst ? "md:order-1" : "md:order-2"}>
                <Image
                  src={tab.image.src}
                  alt={tab.image.alt}
                  width={2000}
                  height={1170}
                  className="h-auto w-full"
                />
              </div>

              <div className={imageFirst ? "md:order-2" : "md:order-1"}>
                <h3 className="text-2xl font-semibold text-brand-900 sm:text-3xl">
                  {tab.label}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-900/60">
                  {tab.description}
                </p>
                <button
                  type="button"
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
                >
                  {tab.ctaText}
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
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
