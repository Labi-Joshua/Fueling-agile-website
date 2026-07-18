"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export interface TextRevealProps {
  text: string;
  emphasisWord?: string;
}

export default function TextReveal({ text, emphasisWord }: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      gsap.from(".text-reveal-word", {
        y: "100%",
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.03,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="mx-auto max-w-4xl px-4 py-20 text-center sm:px-8 sm:py-28">
      <h2 className="text-3xl font-normal tracking-tight text-slate-400 md:text-5xl">
        {words.map((word, index) => (
          <span key={`${word}-${index}`} className="mr-[0.3em] inline-block overflow-hidden align-bottom">
            <span
              className={`text-reveal-word inline-block ${
                word.replace(/[.,]/g, "") === emphasisWord
                  ? "text-brand-900"
                  : ""
              }`}
            >
              {word}
            </span>
          </span>
        ))}
      </h2>
    </div>
  );
}
