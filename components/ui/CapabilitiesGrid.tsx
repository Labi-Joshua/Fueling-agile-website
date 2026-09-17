"use client";

// Bespoke Solutions page: grid of capability cards (e.g. "Custom Fuel
// Dashboards"), styled identically to the "Who we build for" persona grid —
// reuses the same ImageTextCard component, just with an illustration instead
// of a photo.
import type { CapabilitiesGridContent } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import ImageTextCard from "@/components/ui/ImageTextCard";

export interface CapabilitiesGridProps {
  content: CapabilitiesGridContent;
}

const CAPABILITY_IMAGE: Record<string, { src: string; alt: string }> = {
  "Custom Fuel Dashboards": { src: "/capability-dashboards.png", alt: "Illustration of a laptop showing fuel spend dashboards next to a fuel pump" },
  "Loyalty & Rewards Engines": { src: "/capability-loyalty.png", alt: "Illustration of a rewards card with a loyalty star badge" },
  "Automated Reporting": { src: "/capability-reporting.png", alt: "Illustration of reports with a refresh icon and a verified checkmark" },
  "Hardware & IoT Integrations": { src: "/capability-iot.png", alt: "Illustration of a sensor connected to a fuel pump and a delivery truck" },
  "Workflow Automation": { src: "/capability-workflow.png", alt: "Illustration of a document turning into an automated, completed task" },
};

export default function CapabilitiesGrid({ content }: CapabilitiesGridProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1536px] px-4 pt-20 text-center sm:px-8">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-[36px]">
        {content.heading}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-900/50">{content.subheading}</p>

      {/* flex-wrap + justify-center (rather than a grid) so a partial last
          row — e.g. 2 cards left over from a row of 3 — centers itself
          instead of hugging the left edge under an empty trailing column. */}
      <div className="mt-12 flex flex-wrap justify-center gap-6">
        {content.capabilities.map((capability) => (
          <div key={capability.title} className="w-full sm:w-[calc((100%-3rem)/3)]">
            <ImageTextCard
              title={capability.title}
              description={capability.description}
              image={CAPABILITY_IMAGE[capability.title]}
              aspectClassName="aspect-[15/16]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
