"use client";

// Homepage "Why Fueling Agile?" section: a step indicator + trust-point copy
// on the left, and a colored panel on the right showing that point's
// illustration. Pins once it reaches the vertical center of the viewport,
// staying centered there while the user scrolls through it — scrolling
// down/up advances/reverses the active point, with each point's image
// crossfading + parallaxing in direct proportion to scroll position (not a
// fixed-duration transition) so the motion visibly tracks the scroll itself —
// and only releases once every point has been scrolled past, at which point
// the section continues scrolling with the rest of the page. Clicking a step
// in the indicator smooth-scrolls straight to it. Same mechanism as
// HowItWorks.tsx's "How to Get Started" walkthrough.
import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { WhyUsContent, TrustPoint } from "@/data/mockContent";
import { useLenis } from "@/components/providers/SmoothScrollProvider";
import { useRequestFuelCardModal } from "@/components/providers/RequestFuelCardModalProvider";

gsap.registerPlugin(ScrollTrigger);

export interface WhyUsProps {
  content: WhyUsContent;
}

// Panel background per point theme (see TrustPoint in mockContent.ts).
const THEME_PANEL: Record<TrustPoint["theme"], string> = {
  green: "bg-brand-500",
  lavender: "bg-[#E7E2F7]",
  mint: "bg-[#E4EFE6]",
};

// Scroll distance dedicated to each point while the section is pinned,
// expressed as a fraction of the viewport height so the pace feels the same
// on any screen size.
const VH_PER_STEP = 0.8;

export default function WhyUs({ content }: WhyUsProps) {
  const lenis = useLenis();
  const { open: openRequestFuelCardModal } = useRequestFuelCardModal();
  const sectionRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const points = content.points;
  const activePoint = points[activeIndex];

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      gsap.from(sectionRef.current, {
        y: 12,
        opacity: 0,
        duration: 0.35,
        ease: "power3.out",
        scrollTrigger: { trigger: sectionRef.current, start: "top 85%" },
      });

      // Crossfades + gently parallaxes every point's image by how close scroll
      // progress is to that point's own "slot" — 1 when it's dead centered,
      // fading and drifting out toward its neighbors — so the swap reads as
      // continuous motion driven by scroll, not a click-timed transition.
      // Also drives activeIndex, which the dot indicator and copy read.
      const segments = Math.max(1, points.length - 1);

      function applyProgress(progress: number) {
        const raw = progress * segments;

        points.forEach((_, i) => {
          const panelEl = panelRefs.current[i];
          if (!panelEl) return;

          const distance = gsap.utils.clamp(-1, 1, raw - i);
          gsap.set(panelEl, {
            opacity: 1 - Math.abs(distance),
            y: distance * 24,
            scale: 1 - Math.abs(distance) * 0.05,
          });
        });

        setActiveIndex(gsap.utils.clamp(0, points.length - 1, Math.round(raw)));
      }

      triggerRef.current = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "center center",
        end: () => `+=${window.innerHeight * VH_PER_STEP * segments}`,
        pin: sectionRef.current,
        scrub: 1,
        onUpdate: (self) => applyProgress(self.progress),
      });

      applyProgress(triggerRef.current.progress);
    },
    { scope: sectionRef, dependencies: [points.length] }
  );

  // Smooth-scrolls to the middle of a point's pinned scroll range. Native
  // scroll events fire throughout, so the crossfade above animates in step
  // with the scroll exactly as it would for a manual scroll.
  function goToStep(index: number) {
    const trigger = triggerRef.current;
    if (!trigger) {
      setActiveIndex(index);
      return;
    }
    const targetProgress = index / Math.max(1, points.length - 1);
    const targetY = trigger.start + targetProgress * (trigger.end - trigger.start);
    if (lenis) {
      lenis.scrollTo(targetY, { duration: 1 });
    } else {
      window.scrollTo({ top: targetY, behavior: "smooth" });
    }
  }

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1536px] px-4 pt-36 text-center sm:px-8 sm:pt-44">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mt-3 text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-900/50">{content.subtitle}</p>

      <div className="mt-16 grid grid-cols-1 items-center gap-12 text-left lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col items-start">
          {/* Step indicator: a pill-shaped track holding the active point as an
              elongated pill and the rest as dots */}
          <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-900/5 p-2">
            {points.map((point, index) => (
              <button
                key={point.title}
                type="button"
                onClick={() => goToStep(index)}
                aria-label={`Show point ${index + 1}: ${point.title}`}
                aria-current={index === activeIndex}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex ? "w-6 bg-brand-500" : "w-2 bg-brand-900/15"
                }`}
              />
            ))}
          </div>

          <h3 className="mt-6 text-xl font-semibold text-brand-900 sm:text-2xl">
            {activePoint.title}
          </h3>
          {/* Fixed height (tall enough for the longest point's copy) so the
              CTAs below don't shift up/down as descriptions swap length. */}
          <p className="mt-3 h-20 max-w-sm text-sm leading-relaxed text-brand-900/50">
            {activePoint.description}
          </p>

          <div className="mt-8 flex flex-row gap-3 sm:gap-4">
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
        </div>

        {/* Colored panel, one per point, sized to the same 544x501 mockup spec
            as HowItWorks (scales down proportionally below that). All points
            render at once, each crossfading + parallaxing per applyProgress above. */}
        <div className="relative mx-auto aspect-[544/501] w-full max-w-[544px] overflow-hidden rounded-2xl">
          {points.map((point, index) => (
            <div
              key={point.title}
              ref={(el) => {
                panelRefs.current[index] = el;
              }}
              className={`absolute inset-0 opacity-0 first:opacity-100 ${THEME_PANEL[point.theme]}`}
            >
              <Image
                src={point.image.src}
                alt={point.image.alt}
                fill
                sizes="(min-width: 1024px) 544px, 100vw"
                className="object-cover object-bottom"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
