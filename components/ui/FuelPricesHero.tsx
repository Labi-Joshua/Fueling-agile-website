import type { FuelPricesHeroContent } from "@/data/mockContent";

export interface FuelPricesHeroProps {
  content: FuelPricesHeroContent;
}

export default function FuelPricesHero({ content }: FuelPricesHeroProps) {
  return (
    <section className="mx-auto max-w-4xl px-4 pt-20 text-center sm:px-8 sm:pt-28">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h1 className="mx-auto mt-3 font-heading text-2xl font-normal leading-[110%] tracking-[-2px] text-brand-900 sm:text-[56px]">
        {content.heading}
      </h1>
      <p className="mx-auto mt-4 max-w-md text-sm text-brand-900/50">{content.subheading}</p>
    </section>
  );
}
