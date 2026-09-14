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
      className={`flex flex-col overflow-hidden rounded-2xl border p-1.5 pb-0 text-left sm:rounded-[28px] sm:p-3 ${
        tier.highlighted
          ? "border-brand-600 bg-brand-600 shadow-xl"
          : "border-[#C2DB86] bg-[#F3F9E1]"
      }`}
    >
      {/* Header chip — inset from the frame above, its own rounded-bottom
          corners reveal the frame color peeking out on either side. */}
      <div
        className={`rounded-xl px-2.5 py-3 sm:rounded-2xl sm:px-6 sm:py-6 ${
          tier.highlighted ? "border border-white/30 bg-brand-500" : "border border-[#C2DB86] bg-white"
        }`}
      >
        <p
          className={`font-semibold ${
            tier.highlighted ? "text-sm text-white sm:text-xl" : "text-xs text-brand-900 sm:text-lg"
          }`}
        >
          {tier.name}
        </p>
        <p
          className={`mt-1 text-[10px] leading-tight sm:text-xs ${
            tier.highlighted ? "text-white/70" : "text-brand-900/50"
          }`}
        >
          {tier.vehicleRange}
        </p>
      </div>

      <div className="flex flex-1 flex-col gap-3 px-2.5 pb-2.5 pt-3 sm:gap-6 sm:px-6 sm:pb-6 sm:pt-6">
        <div>
          <span
            className={`text-lg font-semibold sm:text-4xl ${tier.highlighted ? "text-white" : "text-brand-900"}`}
          >
            {tier.pricePercent}
          </span>
          <span className={`text-[10px] sm:text-sm ${tier.highlighted ? "text-white/70" : "text-brand-900/50"}`}>
            {" "}
            / Month
          </span>
        </div>

        {/* A feature ending in ":" is a lead-in label ("Everything in X,
            plus:"), rendered plain — every other feature gets a checkmark. */}
        <ul className="flex flex-col gap-1 sm:gap-2.5">
          {tier.features.map((feature) =>
            feature.endsWith(":") ? (
              <li
                key={feature}
                className={`text-[10px] leading-snug sm:text-sm ${
                  tier.highlighted ? "text-white/70" : "text-brand-900/50"
                }`}
              >
                {feature}
              </li>
            ) : (
              <li
                key={feature}
                className={`flex items-start gap-1 text-[10px] leading-snug sm:gap-2 sm:text-sm ${
                  tier.highlighted ? "text-white/90" : "text-brand-900/70"
                }`}
              >
                <CheckIcon className={`h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 ${tier.highlighted ? "text-white/70" : "text-brand-900/30"}`} />
                {feature}
              </li>
            )
          )}
        </ul>

        <button
          type="button"
          className="mt-auto w-full rounded-full border border-[#C2DB86] bg-white px-2 py-2 text-[10px] font-semibold text-brand-600 transition-colors hover:bg-white/90 sm:px-6 sm:py-3 sm:text-sm"
        >
          {tier.ctaText}
        </button>
      </div>
    </div>
  );
}

export default function PricingTiers({ content }: PricingTiersProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-4xl px-4 pt-20 text-center sm:px-8">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-900/50">{content.subheading}</p>

      <div className="mt-12 grid grid-cols-3 gap-2 sm:gap-6">
        {content.tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>
    </section>
  );
}
