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

// Starter/Enterprise: plain white card whose only line-work is three
// separate "bracket" borders (rounded-open-top or rounded-open-bottom) around
// the header, the price/feature divider, and the CTA — no full card outline.
function PlainTierCard({ tier }: { tier: PricingTier }) {
  const percentIndex = tier.pricePercent.indexOf("%");
  const priceNumber = percentIndex === -1 ? tier.pricePercent : tier.pricePercent.slice(0, percentIndex);
  const priceSign = percentIndex === -1 ? "" : tier.pricePercent.slice(percentIndex);

  return (
    <div className="flex flex-1 flex-col rounded-[32px] bg-white px-6 pb-6 pt-1 text-left shadow-sm">
      <div className="rounded-t-3xl border-l border-r border-t border-[#DCE9AE] pb-6 pt-7">
        <p className="text-2xl font-semibold text-brand-900">{tier.name}</p>
        <p className="mt-1 text-sm text-brand-900/50">{tier.vehicleRange}</p>
      </div>

      <div className="pb-6 pt-6">
        <span className="text-5xl font-semibold text-brand-900">{priceNumber}</span>
        <span className="text-2xl font-semibold text-brand-900">{priceSign}</span>
        <span className="ml-1 text-sm text-brand-900/50">/ Month</span>
      </div>

      <div className="h-3 rounded-b-2xl border-b border-l border-r border-[#DCE9AE]" />

      {/* A feature ending in ":" is a lead-in label ("Everything in X,
          plus:"), rendered plain — every other feature gets a "+" marker. */}
      <ul className="flex flex-1 flex-col gap-2 py-6 text-sm text-brand-900/70">
        {tier.features.map((feature) =>
          feature.endsWith(":") ? (
            <li key={feature} className="text-brand-900/50">
              {feature}
            </li>
          ) : (
            <li key={feature} className="flex gap-2">
              <span className="text-brand-900/30">+</span>
              {feature}
            </li>
          )
        )}
      </ul>

      <div className="mt-auto flex justify-center rounded-t-2xl border-l border-r border-t border-[#DCE9AE] py-4">
        <button type="button" className="text-sm font-medium text-brand-900 transition-colors hover:text-brand-600">
          {tier.ctaText}
        </button>
      </div>
    </div>
  );
}

// Growth: the framed-chip card, popped above its neighbors — see the
// dedicated "Growth" styling task this reuses.
function HighlightedTierCard({ tier }: { tier: PricingTier }) {
  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-[28px] border border-brand-600 bg-brand-600 p-3 pb-0 text-left shadow-xl sm:-my-6">
      <div className="rounded-2xl bg-brand-500 px-6 py-6">
        <p className="text-xl font-semibold text-white">{tier.name}</p>
        <p className="mt-1 text-xs text-white/70">{tier.vehicleRange}</p>
      </div>

      <div className="flex flex-1 flex-col gap-6 px-6 pb-6 pt-6">
        <div>
          <span className="text-4xl font-semibold text-white">{tier.pricePercent}</span>
          <span className="text-sm text-white/70"> / Month</span>
        </div>

        <ul className="flex flex-col gap-2.5">
          {tier.features.map((feature) =>
            feature.endsWith(":") ? (
              <li key={feature} className="text-sm text-white/70">
                {feature}
              </li>
            ) : (
              <li key={feature} className="flex items-start gap-2 text-sm text-white/90">
                <CheckIcon className="text-white/70" />
                {feature}
              </li>
            )
          )}
        </ul>

        <button
          type="button"
          className="mt-auto w-full rounded-full bg-white px-6 py-3 text-sm font-semibold text-brand-600 transition-colors hover:bg-white/90"
        >
          {tier.ctaText}
        </button>
      </div>
    </div>
  );
}

function TierCard({ tier }: { tier: PricingTier }) {
  return tier.highlighted ? <HighlightedTierCard tier={tier} /> : <PlainTierCard tier={tier} />;
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

      <div className="mt-12 grid grid-cols-1 items-start gap-6 sm:grid-cols-3">
        {content.tiers.map((tier) => (
          <TierCard key={tier.name} tier={tier} />
        ))}
      </div>
    </section>
  );
}
