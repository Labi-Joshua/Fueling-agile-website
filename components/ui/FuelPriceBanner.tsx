"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import type { DepotPrice } from "@/data/mockContent";

export interface FuelPriceBannerProps {
  prices: DepotPrice[];
  href: string;
}

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

export default function FuelPriceBanner({ prices, href }: FuelPriceBannerProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);

  useGSAP(() => {
    if (!trackRef.current) return;

    tweenRef.current = gsap.to(trackRef.current, {
      xPercent: -50,
      duration: 25,
      ease: "none",
      repeat: -1,
    });
  });

  const items = [...prices, ...prices];

  return (
    <Link
      href={href}
      onMouseEnter={() => tweenRef.current?.pause()}
      onMouseLeave={() => tweenRef.current?.play()}
      className="flex items-center gap-6 bg-[#262626] px-4 py-2.5 text-white transition-colors hover:bg-[#333333] sm:px-8"
    >
      <span className="flex shrink-0 items-center gap-1.5 text-xs font-medium">
        <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
        Live Prices
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
    </Link>
  );
}
