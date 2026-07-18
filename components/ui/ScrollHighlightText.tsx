"use client";

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
    <div ref={containerRef} className="mx-auto max-w-4xl px-4 pt-[180px] sm:px-8">
      <h2 className="mx-auto max-w-4xl text-center text-[45px] font-normal leading-[120%] tracking-[-1px] text-[#A6A6A6]">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="highlight-word mr-[0.3em] inline-block">
            {word}
          </span>
        ))}
      </h2>
    </div>
  );
}
