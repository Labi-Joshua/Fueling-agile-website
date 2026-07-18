import type { HowItWorksStep } from "@/data/mockContent";

export interface HowItWorksProps {
  steps: HowItWorksStep[];
}

const icons: Record<HowItWorksStep["icon"], React.ReactNode> = {
  truck: (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
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

function ArcPattern() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {Array.from({ length: 9 }).map((_, i) => (
        <circle
          key={i}
          cx="400"
          cy="200"
          r={40 + i * 45}
          stroke="currentColor"
          strokeWidth="1"
          className="text-brand-900/10"
        />
      ))}
    </svg>
  );
}

export default function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 sm:px-8">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <div key={step.description} className="flex flex-col gap-4">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-900/[0.03]">
              <ArcPattern />
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

      <svg
        className="mx-auto mt-8 hidden w-full max-w-4xl text-brand-900/15 md:block"
        height="120"
        viewBox="0 0 1200 120"
        fill="none"
      >
        <path
          d="M100 0 C100 40, 140 40, 180 40 L1020 40 C1060 40, 1100 40, 1100 0"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M600 40 L600 120" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    </section>
  );
}
