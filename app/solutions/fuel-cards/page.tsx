// Agile Flex PetrolKaart solutions page, linked from the navbar's "Our
// Solutions" dropdown.
import type { Metadata } from "next";
import Hero from "@/components/ui/Hero";
import ReportingShowcase from "@/components/ui/ReportingShowcase";
import PricingTiers from "@/components/ui/PricingTiers";
import HowItWorks from "@/components/ui/HowItWorks";
import PersonaGrid from "@/components/ui/PersonaGrid";
import Newsletter from "@/components/ui/Newsletter";
import {
  fuelCardHeroContent,
  fuelCardHeroImage,
  reportingShowcaseContent,
  pricingTiersContent,
  howItWorksContent,
  personaGridContent,
  newsletterContent,
} from "@/data/mockContent";

export const metadata: Metadata = {
  title: "Agile Flex PetrolKaart — Fueling Agile Nigeria",
  description: "A smarter way to pay for fuel — load, control, and track fleet fuel spend on one card.",
};

export default function FuelCardsPage() {
  return (
    <>
      {/* Page hero: headline, CTAs, two-card graphic (no active-cards badge on this page) */}
      <Hero content={fuelCardHeroContent} dashboardImage={fuelCardHeroImage} showActiveCardsBadge={false} />

      {/* "See it all in one place" reporting platform showcase */}
      <ReportingShowcase content={reportingShowcaseContent} />

      {/* Starter/Growth/Enterprise pricing tiers */}
      <PricingTiers content={pricingTiersContent} />

      {/* "How to Get Started" walkthrough, without the homepage's stat counters above it */}
      <HowItWorks content={howItWorksContent} />

      {/* "Who it's for" persona grid */}
      <PersonaGrid content={personaGridContent} />

      {/* Newsletter signup card, last section before the footer */}
      <Newsletter content={newsletterContent} />
    </>
  );
}
