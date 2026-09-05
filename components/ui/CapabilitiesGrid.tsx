"use client";

// Bespoke Solutions page: grid of capability cards (e.g. "Custom Fuel
// Dashboards"), each a plain title/description card — no product screenshot
// exists for a one-off custom build, so unlike ReportingShowcase this section
// stays text-only rather than showing a single dashboard image that would
// misrepresent the range of what gets built.
import type { CapabilitiesGridContent, Capability } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface CapabilitiesGridProps {
  content: CapabilitiesGridContent;
}

function CapabilityCard({ capability }: { capability: Capability }) {
  return (
    <div className="flex flex-col gap-2 rounded-2xl border border-brand-900/10 bg-[#E4EFE6] p-6 text-left">
      <p className="text-base font-semibold text-brand-900">{capability.title}</p>
      <p className="text-sm leading-relaxed text-brand-900/60">{capability.description}</p>
    </div>
  );
}

export default function CapabilitiesGrid({ content }: CapabilitiesGridProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1536px] px-4 pt-36 text-center sm:px-8 sm:pt-44">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-900/50">{content.subheading}</p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {content.capabilities.map((capability) => (
          <CapabilityCard key={capability.title} capability={capability} />
        ))}
      </div>
    </section>
  );
}
