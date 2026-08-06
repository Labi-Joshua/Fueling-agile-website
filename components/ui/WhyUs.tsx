import Image from "next/image";
import type { WhyUsContent } from "@/data/mockContent";

export interface WhyUsProps {
  content: WhyUsContent;
}

export default function WhyUs({ content }: WhyUsProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-8">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-8 text-left md:grid-cols-3">
        {content.points.map((point) => (
          <div key={point.title} className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-500/10">
              <Image
                src={point.image.src}
                alt={point.image.alt}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-semibold text-brand-500">{point.title}</p>
              <p className="mt-1 text-sm leading-relaxed text-brand-900/60">
                {point.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
