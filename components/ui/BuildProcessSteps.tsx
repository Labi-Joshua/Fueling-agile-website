"use client";

// Bespoke Solutions page: "get started" walkthrough, rendered right after
// CapabilitiesGrid — each step gets its own tilted illustration (with the
// same decorative ring flourish used behind the homepage newsletter card)
// alternating sides, and its own "Get in touch" CTA.
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { BuildProcessContent, BuildProcessStep } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface BuildProcessStepsProps {
  content: BuildProcessContent;
}

function StepImage({ step }: { step: BuildProcessStep }) {
  // TODO: no dedicated illustration exists yet for this step (see the TODO
  // on buildProcessContent in mockContent.ts) — falls back to a plain
  // tinted block instead of a broken image if the source 404s.
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-sm">
      <div className="pointer-events-none absolute -inset-16 -z-10">
        <Image src="/newsletter-rings.png" alt="" fill sizes="500px" className="object-contain" />
      </div>

      <div className="absolute inset-6 -rotate-3 overflow-hidden rounded-3xl bg-[#F3F9E1] shadow-xl">
        {!imageFailed ? (
          <Image
            src={step.image.src}
            alt={step.image.alt}
            fill
            sizes="(min-width: 768px) 384px, 100vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center px-6 text-center text-xs text-brand-900/30">
            {step.title}
          </div>
        )}
      </div>
    </div>
  );
}

export default function BuildProcessSteps({ content }: BuildProcessStepsProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1536px] px-4 pt-20 text-center sm:px-8">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-[36px]">
        {content.heading}
      </h2>

      <div className="mt-16 flex flex-col gap-16 sm:gap-24">
        {content.steps.map((step, index) => {
          const imageFirst = index % 2 === 0;

          return (
            <div
              key={step.title}
              className="grid grid-cols-1 items-center gap-10 text-left md:grid-cols-2 md:gap-16"
            >
              <div className={imageFirst ? "md:order-1" : "md:order-2"}>
                <StepImage step={step} />
              </div>

              <div className={imageFirst ? "md:order-2" : "md:order-1"}>
                <h3 className="text-2xl font-semibold text-brand-900 sm:text-3xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-brand-900/60">
                  {step.description}
                </p>
                <Link
                  href={content.ctaHref}
                  className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
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
          );
        })}
      </div>
    </section>
  );
}
