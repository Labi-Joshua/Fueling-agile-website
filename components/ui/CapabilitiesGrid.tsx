"use client";

// Bespoke Solutions page: grid of capability cards (e.g. "Custom Fuel
// Dashboards"), each with a small illustration inset inside its own
// pale-green panel.
import Image from "next/image";
import type { CapabilitiesGridContent, Capability } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

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

function CapabilityCard({ capability }: { capability: Capability }) {
  const image = CAPABILITY_IMAGE[capability.title];

  return (
    <div className="flex flex-col gap-2 rounded-3xl border border-[#C2DB86] bg-white p-6 text-left">
      <p className="text-lg font-semibold text-brand-900">{capability.title}</p>
      <p className="text-sm leading-relaxed text-brand-900/60">{capability.description}</p>

      {image && (
        <div className="relative mt-auto aspect-square w-full overflow-hidden rounded-2xl bg-[#F3F9E1] p-10">
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 640px) 360px, 100vw" className="object-contain p-2" />
        </div>
      )}
    </div>
  );
}

export default function CapabilitiesGrid({ content }: CapabilitiesGridProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1536px] px-4 pt-20 text-center sm:px-8">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-900/50">{content.subheading}</p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {content.capabilities.map((capability) => (
          <CapabilityCard key={capability.title} capability={capability} />
        ))}
      </div>
    </section>
  );
}
