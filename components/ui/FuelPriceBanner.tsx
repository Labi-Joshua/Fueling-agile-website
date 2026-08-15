"use client";

// Homepage ticker banner: a continuously auto-scrolling strip of the 10 most
// recently updated depot prices across both PMS and AGO (marquee effect),
// sitting above the hero and linking through to /pricing. Prices refresh live
// via TanStack Query (see hooks/useDepotPrices.ts); the page that renders this
// passes the server-fetched mock/initial list so there's never an empty state
// while the first live fetch resolves.
import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { DepotPrice } from "@/data/mockContent";
import { useDepotPrices } from "@/hooks/useDepotPrices";

export interface FuelPriceBannerProps {
  initialPrices: DepotPrice[];
  href: string;
}

const TICKER_SIZE = 10;

// Formats a raw number as a Naira currency string, e.g. 1969 -> "₦1,969.00"
function formatNaira(value: number): string {
  return `₦${value.toLocaleString("en-NG", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function ArrowUpRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 9L9 3M9 3H4M9 3V8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowDownRight() {
  return (
    <svg width="10" height="10" viewBox="0 0 12 12" fill="none">
      <path
        d="M3 3L9 9M9 9H4M9 9V4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function FuelPriceBanner({ initialPrices, href }: FuelPriceBannerProps) {
  // "all" merges PMS and AGO into one list (see lib/fuelPrices.ts), tagging each
  // row with its product so the ticker can show both fuel types at once.
  const { data: prices = [] } = useDepotPrices(initialPrices, "all");

  // Ticker shows the TICKER_SIZE most recently updated rows across both fuel
  // types. Rows without a real `updatedAt` (mock/placeholder data, which has no
  // upstream timestamp) sort to the back rather than crashing the comparison.
  const topPrices = [...prices]
    .sort((a, b) => {
      const aTime = a.updatedAt ? new Date(a.updatedAt).getTime() : 0;
      const bTime = b.updatedAt ? new Date(b.updatedAt).getTime() : 0;
      return bTime - aTime;
    })
    .slice(0, TICKER_SIZE);

  const trackRef = useRef<HTMLDivElement>(null);
  // Holds the running marquee tween so hover handlers below can pause/resume it.
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  // Continuously scrolls the price track left by 50% of its width, then loops
  // forever (`repeat: -1`). Because `items` below duplicates the price list,
  // scrolling exactly 50% seamlessly wraps back to an identical starting frame.
  useGSAP(() => {
    if (!trackRef.current) return;

    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 25,
      ease: "none",
      repeat: -1,
    });
  });

  // Prices are duplicated so the marquee can loop seamlessly (see useGSAP comment above)
  const items = [...topPrices, ...topPrices];

  return (
    // Pausing on hover lets users actually read a price before it scrolls away
    <Link
      href={href}
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
      className="block bg-[#262626] text-white transition-colors hover:bg-[#333333]"
    >
      <div className="mx-auto flex max-w-[1536px] items-center gap-6 px-4 py-2.5 sm:px-8">
        <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium">
          <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
          Recent Fuel Prices
        </span>

        <div className="relative min-w-0 flex-1 overflow-hidden">
          <div ref={trackRef} className="flex w-max items-center gap-6">
            {items.map((row, index) => {
              const isUp = row.change >= 0;

              return (
                <span
                  key={`${row.depot}-${index}`}
                  className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-xs"
                >
                  <span className="font-semibold uppercase text-white/90">{row.depot}</span>
                  <span className="uppercase text-white/40">{row.product}</span>
                  <span className="text-white/70">{formatNaira(row.price)}</span>
                  <span
                    className={`inline-flex items-center gap-0.5 ${
                      isUp ? "text-brand-500" : "text-red-400"
                    }`}
                  >
                    {isUp ? <ArrowUpRight /> : <ArrowDownRight />}
                    {Math.abs(row.changePercent).toFixed(2)}%
                  </span>
                </span>
              );
            })}
          </div>
        </div>

        <span className="ml-auto flex shrink-0 items-center gap-1 text-xs font-semibold text-brand-500">
          View all prices
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M3 1.5L8.5 6L3 10.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
