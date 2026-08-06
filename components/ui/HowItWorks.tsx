import Image from "next/image";
import type { HowItWorksContent, HowItWorksStep } from "@/data/mockContent";

export interface HowItWorksProps {
  content: HowItWorksContent;
}

const icons: Record<HowItWorksStep["icon"], React.ReactNode> = {
  truck: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M2 7h11v9H2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M13 10h4l4 3.5V16h-8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="6" cy="17.5" r="1.75" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="17.5" r="1.75" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  card: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="5"
        width="20"
        height="14"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path d="M2 9.5h20" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  ),
  fuel: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M4 21V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M2 21h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path
        d="M14 10h1.5a1.5 1.5 0 0 1 1.5 1.5V13a1.5 1.5 0 0 0 1.5 1.5v0A1.5 1.5 0 0 0 20 13v-4l-2-2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M6 6h6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

export default function HowItWorks({ content }: HowItWorksProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-[180px] text-center sm:px-8">
      <h2 className="text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.title}
      </h2>
      <p className="mt-2 text-sm text-brand-900/50">{content.subtitle}</p>

      <div className="mt-12 grid grid-cols-1 gap-8 text-left md:grid-cols-3">
        {content.steps.map((step) => (
          <div key={step.description} className="flex flex-col gap-4">
            <div className="relative aspect-[4/3] overflow-hidden bg-brand-500/10">
              <Image
                src={step.image.src}
                alt={step.image.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex items-start gap-3">
              <span className="mt-0.5 text-brand-500">{icons[step.icon]}</span>
              <p className="text-sm leading-relaxed text-brand-900/70">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
