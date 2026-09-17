"use client";

// Agile Flex solutions page: 2x2 grid of "who it's for" persona cards, each
// with a heading, description, and photo.
import type { PersonaGridContent } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";
import ImageTextCard from "@/components/ui/ImageTextCard";

export interface PersonaGridProps {
  content: PersonaGridContent;
}

export default function PersonaGrid({ content }: PersonaGridProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1536px] px-4 pt-20 text-center sm:px-8">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-[36px]">
        {content.heading}
      </h2>

      <div className="mx-auto mt-12 grid max-w-[1088px] grid-cols-1 gap-6 sm:grid-cols-2">
        {content.personas.map((persona) => (
          <ImageTextCard
            key={persona.title}
            title={persona.title}
            description={persona.description}
            image={persona.image}
          />
        ))}
      </div>
    </section>
  );
}
