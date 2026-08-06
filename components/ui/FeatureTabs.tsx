"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { FeaturesContent } from "@/data/mockContent";

export interface FeatureTabsProps {
  content: FeaturesContent;
}

const AUTO_ADVANCE_SECONDS = 5;

export default function FeatureTabs({ content }: FeatureTabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = content.tabs[activeIndex];
  const progressBarRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!progressBarRef.current) return;

      gsap.fromTo(
        progressBarRef.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: AUTO_ADVANCE_SECONDS,
          ease: "none",
          transformOrigin: "left center",
          onComplete: () => {
            setActiveIndex((prev) => (prev + 1) % content.tabs.length);
          },
        }
      );
    },
    { dependencies: [activeIndex] }
  );

  return (
    <section className="mx-auto max-w-6xl px-4 pt-[180px] text-center sm:px-8">
      <h2 className="text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.title}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-900/50">
        {content.subtitle}
      </p>

      <div className="mt-12 grid grid-cols-1 divide-y divide-brand-900/10 border-t border-brand-900/10 text-left sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {content.tabs.map((tab, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative flex flex-col gap-2 px-6 py-6 text-left transition-colors ${
                isActive ? "" : "opacity-60"
              }`}
            >
              <span className="absolute inset-x-0 top-0 h-0.5 bg-brand-900/10 sm:block">
                {isActive && (
                  <span
                    ref={progressBarRef}
                    className="block h-full w-full origin-left bg-brand-500"
                  />
                )}
              </span>
              <span className="flex items-center gap-2 text-sm font-semibold text-brand-900">
                {isActive && <span className="h-1.5 w-1.5 rounded-full bg-orange-500" />}
                {tab.label}
              </span>
              <p className="text-xs leading-relaxed text-brand-900/60">
                {tab.description}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mb-12 sm:mb-20">
        <Image
          src={activeTab.image.src}
          alt={activeTab.image.alt}
          width={2000}
          height={1170}
          className="h-auto w-full"
        />
      </div>
    </section>
  );
}
