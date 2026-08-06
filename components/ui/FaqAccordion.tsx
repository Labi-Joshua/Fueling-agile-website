"use client";

import { useState } from "react";
import type { FaqContent } from "@/data/mockContent";

export interface FaqAccordionProps {
  content: FaqContent;
}

export default function FaqAccordion({ content }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="mx-auto max-w-3xl px-4 pt-[180px] text-center sm:px-8">
      <span className="text-xs font-medium uppercase tracking-wide text-orange-500">
        {content.eyebrow}
      </span>
      <h2 className="mx-auto mt-3 max-w-2xl text-2xl font-semibold text-brand-900 sm:text-3xl">
        {content.heading}
      </h2>

      <div className="mt-10 divide-y divide-brand-900/10 border border-brand-900/10 text-left">
        {content.items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question} className={isOpen ? "bg-brand-900/[0.02]" : ""}>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left"
              >
                <span
                  className={`text-sm font-medium ${
                    isOpen ? "text-brand-500" : "text-brand-900"
                  }`}
                >
                  {item.question}
                </span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 12 12"
                  fill="none"
                  className={`shrink-0 text-brand-900/50 transition-transform ${
                    isOpen ? "rotate-180" : ""
                  }`}
                >
                  <path
                    d="M3 4.5L6 7.5L9 4.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              {isOpen && (
                <p className="px-6 pb-4 text-sm leading-relaxed text-brand-900/60">
                  {item.answer}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
