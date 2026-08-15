"use client";

// Large heading whose words progressively darken/highlight one-by-one as the
// user scrolls past it, driven by GSAP's ScrollTrigger `scrub` mode (animation
// progress is tied directly to scroll position, not time).
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export interface ScrollHighlightTextProps {
  text: string;
}

export default function ScrollHighlightText({ text }: ScrollHighlightTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  // Each word is wrapped in its own <span> so GSAP can stagger-animate them individually.
  const words = text.split(" ");

  useGSAP(
    () => {
      gsap.to(".highlight-word", {
        color: "#737373",
        stagger: 0.1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "center 40%",
          scrub: 1,
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="mx-auto max-w-5xl px-4 pt-[32px] sm:px-8 sm:pt-[180px]">
      <h2 className="mx-auto max-w-5xl text-center text-[36px] font-normal leading-[120%] tracking-[-1px] text-[#A6A6A6] sm:text-[45px]">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="highlight-word mr-[0.3em] inline-block">
            {word}
          </span>
        ))}
      </h2>
    </div>
  );
}
