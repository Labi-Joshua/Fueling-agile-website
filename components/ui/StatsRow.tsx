"use client";

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
  const valueRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useGSAP(
    () => {
      stats.forEach((stat, index) => {
        const match = stat.value.match(/^(\d+)(.*)$/);
        if (!match) return;

        const target = parseInt(match[1], 10);
        const suffix = match[2];
        const el = valueRefs.current[index];
        if (!el) return;

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
