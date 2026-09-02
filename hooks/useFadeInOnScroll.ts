"use client";

// Fades + slides up a section as it scrolls into view, matching the homepage
// hero's on-load entrance (same duration/easing) so every section animates in
// consistently, just triggered by scroll position instead of mount.
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export function useFadeInOnScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      gsap.from(ref.current, {
        y: 24,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
        },
      });
    },
    { scope: ref }
  );

  return ref;
}
