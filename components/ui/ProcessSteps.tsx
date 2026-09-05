"use client";

// Bespoke Solutions page: "How we work" section — a numbered row of process
// steps (Discover/Design/Build/Launch), each a plain themed card. Simpler
// than HowItWorks.tsx's pinned-scroll walkthrough since there's no per-step
// product screenshot to showcase here, just the process itself.
import type { ProcessStepsContent, ProcessStep } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface ProcessStepsProps {
  content: ProcessStepsContent;
}

// Card background/text treatment per step theme, matching HowItWorksStep/TrustPoint.
const THEME_STYLES: Record<ProcessStep["theme"], string> = {
  green: "bg-brand-500 text-white",
  lavender: "bg-[#E7E2F7] text-brand-900",
  mint: "bg-[#E4EFE6] text-brand-900",
};

function StepCard({ step, index }: { step: ProcessStep; index: number }) {
  const isDark = step.theme === "green";

  return (
    <div className={`flex flex-col gap-4 rounded-2xl p-6 text-left ${THEME_STYLES[step.theme]}`}>
      <span className={`text-sm font-semibold ${isDark ? "text-white/70" : "text-brand-900/40"}`}>
        {String(index + 1).padStart(2, "0")}
      </span>
      <div>
        <p className="text-base font-semibold">{step.title}</p>
        <p className={`mt-1 text-sm leading-relaxed ${isDark ? "text-white/80" : "text-brand-900/60"}`}>
          {step.description}
        </p>
      </div>
    </div>
  );
}

export default function ProcessSteps({ content }: ProcessStepsProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1536px] px-4 pt-36 text-center sm:px-8 sm:pt-44">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-900/50">{content.subheading}</p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {content.steps.map((step, index) => (
          <StepCard key={step.title} step={step} index={index} />
        ))}
      </div>
    </section>
  );
}
