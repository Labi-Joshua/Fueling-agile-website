"use client";

// Agile Flex solutions page: 3-column pricing tier cards (Starter/Growth/
// Enterprise), with the middle tier visually highlighted as the recommended plan.
import type { PricingTiersContent, PricingTier } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface PricingTiersProps {
  content: PricingTiersContent;
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg width="14" height="14" viewBox="0 0 12 12" fill="none" className={`mt-0.5 shrink-0 ${className ?? ""}`}>
      <path d="M2 6.5L4.5 9L10 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function TierCard({ tier }: { tier: PricingTier }) {
  return (
    <div
      className={`flex flex-col gap-6 rounded-2xl border p-6 text-left ${
        tier.highlighted ? "border-brand-500 bg-brand-500 text-white" : "border-brand-900/10 bg-[#E4EFE6]"
      }`}
    >
      <div>
        <p className={`text-base font-semibold ${tier.highlighted ? "text-white" : "text-brand-900"}`}>{tier.name}</p>
        <p className={`mt-1 text-xs ${tier.highlighted ? "text-white/70" : "text-brand-900/50"}`}>{tier.vehicleRange}</p>
      </div>

      <div>
        <span className={`text-4xl font-semibold ${tier.highlighted ? "text-white" : "text-brand-900"}`}>
          {tier.pricePercent}
        </span>
        <span className={`text-sm ${tier.highlighted ? "text-white/70" : "text-brand-900/50"}`}> /month</span>
      </div>

      <ul className="flex flex-col gap-2">
        {tier.features.map((feature) => (
          <li
            key={feature}
            className={`flex items-start gap-2 text-sm ${tier.highlighted ? "text-white/90" : "text-brand-900/70"}`}
          >
            <CheckIcon className={tier.highlighted ? "text-white" : "text-orange-500"} />
            {feature}
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={`mt-auto rounded-full px-6 py-3 text-sm font-semibold transition-colors ${
          tier.highlighted
            ? "bg-white text-brand-900 hover:bg-white/90"
            : "border border-brand-500 text-brand-500 hover:bg-brand-500/5"
        }`}
      >
        {tier.ctaText}
      </button>
    </div>
  );
}

export default function PricingTiers({ content }: PricingTiersProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-4xl px-4 pt-36 text-center sm:px-8 sm:pt-44">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-900/50">{content.subheading}</p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {content.tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>
    </section>
  );
}
