"use client";

// Bespoke Solutions page: grid of capability cards (e.g. "Custom Fuel
// Dashboards"). No product screenshot exists for a one-off custom build, so
// unlike ReportingShowcase each card gets a small custom line-icon instead of
// a single dashboard image that would misrepresent the range of what gets
// built. These icons are simplified in-house illustrations, not stand-ins for
// real product art — swap CAPABILITY_ICON for real assets if/when they exist.
import type { CapabilitiesGridContent, Capability } from "@/data/mockContent";
import { useFadeInOnScroll } from "@/hooks/useFadeInOnScroll";

export interface CapabilitiesGridProps {
  content: CapabilitiesGridContent;
}

// Shared line weight/viewBox so all five icons read as one consistent set.
const ICON_PROPS = {
  viewBox: "0 0 96 80",
  fill: "none",
} as const;
const LINE = "stroke-brand-900/25";
const ACCENT_A = "stroke-orange-500";
const ACCENT_B = "stroke-brand-500";

function DashboardIcon() {
  return (
    <svg {...ICON_PROPS} className="h-20 w-24">
      <rect x="14" y="10" width="68" height="44" rx="4" className={LINE} strokeWidth="2" />
      <path d="M6 68h84l-10-14H16L6 68Z" className={LINE} strokeWidth="2" strokeLinejoin="round" />
      <path d="M28 44V28" className={ACCENT_A} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M38 44V22" className={ACCENT_B} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M48 44V32" className={ACCENT_A} strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="66" cy="30" r="9" className={ACCENT_B} strokeWidth="2.5" />
      <path d="M66 24v6l4 4" className={ACCENT_B} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function LoyaltyIcon() {
  return (
    <svg {...ICON_PROPS} className="h-20 w-24">
      <rect x="10" y="24" width="52" height="34" rx="6" className={LINE} strokeWidth="2" />
      <path d="M10 34h52" className={LINE} strokeWidth="2" />
      <path d="M20 48h16" className={LINE} strokeWidth="2" strokeLinecap="round" />
      <path
        d="M74 16l4.2 8.6 9.5 1.4-6.85 6.7 1.6 9.5L74 37.7l-8.45 4.5 1.6-9.5L60.3 26l9.5-1.4L74 16Z"
        className={ACCENT_A}
        strokeWidth="2.5"
        strokeLinejoin="round"
      />
      <path d="M64 56c6 4 12 4 18 0" className={ACCENT_B} strokeWidth="2" strokeLinecap="round" strokeDasharray="1 5" />
    </svg>
  );
}

function ReportingIcon() {
  return (
    <svg {...ICON_PROPS} className="h-20 w-24">
      <path d="M24 8h32l12 12v52a2 2 0 0 1-2 2H24a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z" className={LINE} strokeWidth="2" strokeLinejoin="round" />
      <path d="M56 8v12h12" className={LINE} strokeWidth="2" strokeLinejoin="round" />
      <path d="M30 46l8-10 7 6 9-12" className={ACCENT_A} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="34" cy="62" r="10" className="fill-white" />
      <circle cx="34" cy="62" r="9" className={ACCENT_B} strokeWidth="2.5" />
      <path d="M30 62l3 3 6-6" className={ACCENT_B} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IotIcon() {
  return (
    <svg {...ICON_PROPS} className="h-20 w-24">
      {/* central hub */}
      <rect x="40" y="30" width="16" height="26" rx="5" className={LINE} strokeWidth="2" />
      <circle cx="48" cy="43" r="2.5" className={LINE} strokeWidth="2" />
      {/* signal arcs */}
      <path d="M42 26a8.5 8.5 0 0 1 12 0" className={ACCENT_B} strokeWidth="2" strokeLinecap="round" />
      <path d="M45 22a4.2 4.2 0 0 1 6 0" className={ACCENT_B} strokeWidth="2" strokeLinecap="round" />
      {/* connected nodes */}
      <path d="M40 40L18 30" className={LINE} strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />
      <rect x="6" y="20" width="16" height="16" rx="4" className={ACCENT_A} strokeWidth="2.5" />
      <path d="M56 40l22-10" className={LINE} strokeWidth="2" strokeDasharray="1 5" strokeLinecap="round" />
      <rect x="74" y="20" width="16" height="16" rx="4" className={ACCENT_B} strokeWidth="2.5" />
    </svg>
  );
}

function WorkflowIcon() {
  return (
    <svg {...ICON_PROPS} className="h-20 w-24">
      {/* step 1: the manual process, on paper */}
      <rect x="2" y="24" width="24" height="28" rx="5" className={LINE} strokeWidth="2" />
      <path d="M8 32h12M8 38h12M8 44h8" className={ACCENT_A} strokeWidth="2" strokeLinecap="round" />

      <path d="M28 38h10" className={LINE} strokeWidth="2" strokeLinecap="round" />
      <path d="M35 33l4 5-4 5" className={LINE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* step 2: automated */}
      <rect x="36" y="24" width="24" height="28" rx="5" className={LINE} strokeWidth="2" />
      <path d="M50 30l-7 12h6l-2 8 9-13h-6l2-7z" className={ACCENT_A} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />

      <path d="M62 38h10" className={LINE} strokeWidth="2" strokeLinecap="round" />
      <path d="M69 33l4 5-4 5" className={LINE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* step 3: done */}
      <rect x="70" y="24" width="24" height="28" rx="5" className={LINE} strokeWidth="2" />
      <path d="M76 38l5 6 9-13" className={ACCENT_B} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

const CAPABILITY_ICON: Record<string, () => JSX.Element> = {
  "Custom Fuel Dashboards": DashboardIcon,
  "Loyalty & Rewards Engines": LoyaltyIcon,
  "Automated Reporting": ReportingIcon,
  "Hardware & IoT Integrations": IotIcon,
  "Workflow Automation": WorkflowIcon,
};

function CapabilityCard({ capability }: { capability: Capability }) {
  const Icon = CAPABILITY_ICON[capability.title];

  return (
    <div className="flex flex-col gap-2 rounded-3xl border border-[#C2DB86] bg-white p-6 text-left">
      <p className="text-base font-semibold text-brand-900">{capability.title}</p>
      <p className="text-sm leading-relaxed text-brand-900/60">{capability.description}</p>

      {Icon && (
        <div className="mt-4 flex flex-1 items-center justify-center py-8">
          <Icon />
        </div>
      )}
    </div>
  );
}

export default function CapabilitiesGrid({ content }: CapabilitiesGridProps) {
  const sectionRef = useFadeInOnScroll<HTMLElement>();

  return (
    <section ref={sectionRef} className="mx-auto max-w-[1536px] px-4 pt-20 text-center sm:px-8">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>
      <p className="mx-auto mt-2 max-w-xl text-sm text-brand-900/50">{content.subheading}</p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {content.capabilities.map((capability) => (
          <CapabilityCard key={capability.title} capability={capability} />
        ))}
      </div>
    </section>
  );
}
