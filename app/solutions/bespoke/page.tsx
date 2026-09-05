// Bespoke Tech Solutions page, linked from the navbar's "Our Solutions"
// dropdown and the footer's "Solutions" column.
import type { Metadata } from "next";
import BespokeHero from "@/components/ui/BespokeHero";
import CapabilitiesGrid from "@/components/ui/CapabilitiesGrid";
import ProcessSteps from "@/components/ui/ProcessSteps";
import PersonaGrid from "@/components/ui/PersonaGrid";
import Newsletter from "@/components/ui/Newsletter";
import {
  bespokeHeroContent,
  capabilitiesContent,
  processStepsContent,
  bespokePersonaGridContent,
  bespokeNewsletterContent,
} from "@/data/mockContent";

export const metadata: Metadata = {
  title: "Bespoke Tech Solutions — Fueling Agile Nigeria",
  description: "Custom fuel and business tools, designed and built around exactly how your business runs.",
};

export default function BespokeSolutionsPage() {
  return (
    <>
      {/* Page hero: headline, subheadline, and link CTAs (no fuel-card modal here) */}
      <BespokeHero content={bespokeHeroContent} />

      {/* "What we build" capability cards */}
      <CapabilitiesGrid content={capabilitiesContent} />

      {/* "How we work" build process */}
      <ProcessSteps content={processStepsContent} />

      {/* "Who we build for" persona grid */}
      <PersonaGrid content={bespokePersonaGridContent} />

      {/* Newsletter signup card, last section before the footer */}
      <Newsletter content={bespokeNewsletterContent} />
    </>
  );
}
