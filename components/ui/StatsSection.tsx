"use client";

// Wraps the animated StatsRow counters with a CTA button below.
import type { StatsContent } from "@/data/mockContent";
import StatsRow from "@/components/ui/StatsRow";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface StatsSectionProps {
  content: StatsContent;
}

export default function StatsSection({ content }: StatsSectionProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section
      ref={sectionRef}
      className="mx-auto flex max-w-5xl flex-col items-center gap-12 px-4 pt-36 text-center sm:px-8 sm:pt-44"
    >
      <StatsRow stats={content.stats} />

      <div className="flex flex-col items-center gap-8">
        <div className="h-12 w-px bg-brand-900/10" />
        <button
          type="button"
          className="rounded-full bg-brand-500 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand-600"
        >
          {content.ctaText}
        </button>
      </div>
    </section>
  );
}
