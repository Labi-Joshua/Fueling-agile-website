"use client";

// Agile Flex solutions page: 2x2 grid of "who it's for" persona cards, each
// with a heading, description, and photo.
import { useState } from "react";
import Image from "next/image";
import type { PersonaGridContent, Persona } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface PersonaGridProps {
  content: PersonaGridContent;
}

function PersonaCard({ persona }: { persona: Persona }) {
  // TODO: dedicated persona photos haven't been provided yet, so this falls
  // back to a plain brand-tinted block instead of a broken image if the
  // source 404s (see the TODO on personaGridContent in mockContent.ts).
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <div className="flex flex-col gap-4 rounded-2xl bg-[#E4EFE6] p-6 text-left">
      <div>
        <p className="text-base font-semibold text-brand-900">{persona.title}</p>
        <p className="mt-1 text-sm leading-relaxed text-brand-900/60">{persona.description}</p>
      </div>

      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl bg-brand-500/10">
        {!imageFailed && (
          <Image
            src={persona.image.src}
            alt={persona.image.alt}
            fill
            sizes="(min-width: 768px) 440px, 100vw"
            className="object-cover"
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
    </div>
  );
}

export default function PersonaGrid({ content }: PersonaGridProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-4xl px-4 pt-36 text-center sm:px-8 sm:pt-44">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {content.personas.map((persona) => (
          <PersonaCard key={persona.title} persona={persona} />
        ))}
      </div>
    </section>
  );
}
