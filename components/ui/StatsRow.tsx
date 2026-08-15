"use client";

// Row of stat counters (e.g. "2400+ Gas Stations") that count up from 0 to their
// target value once scrolled into view. Each stat's numeric prefix is parsed out
// of its string value (e.g. "2400+" -> target 2400, suffix "+") so any non-numeric
// trailing text (like "+" or " mins") is preserved during the count-up animation.
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import type { Stat } from "@/data/mockContent";

gsap.registerPlugin(ScrollTrigger);

export interface StatsRowProps {
  stats: Stat[];
}

export default function StatsRow({ stats }: StatsRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // One ref per stat's numeric <span>, so each can be updated independently during count-up.
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      stats.forEach((stat, index) => {
        // Split e.g. "2400+" into numeric target (2400) and trailing suffix ("+")
        const match = stat.value.match(/^(\d+)(.*)$/);
        if (!match) return;

        const target = parseInt(match[1], 10);
        const suffix = match[2];
        const el = valueRefs.current[index];
        if (!el) return;

        // Tween a plain object from 0 -> target, writing the rounded value into
        // the DOM on every frame (GSAP has no built-in "tween a number into text" helper).
        const proxy = { val: 0 };

        gsap.to(proxy, {
          val: target,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
          onUpdate: () => {
            el.innerText = `${Math.round(proxy.val)}${suffix}`;
          },
        });
      });
    },
    { scope: containerRef, dependencies: [stats] }
  );

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col items-center justify-center divide-y divide-slate-200 sm:flex-row sm:divide-x sm:divide-y-0"
    >
      {stats.map((stat, index) => (
        <div
          key={stat.label}
          className="flex flex-col items-center gap-2 px-8 py-4 first:pt-0 last:pb-0 sm:py-0"
        >
          <span
            ref={(el) => {
              valueRefs.current[index] = el;
            }}
            className="text-center font-heading text-4xl font-normal leading-none text-brand-500 md:text-5xl"
          >
            0
          </span>
          <span className="text-xs text-brand-900/50 sm:text-sm">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}
