"use client";

// Site-wide smooth scrolling via Lenis, wired into GSAP's own ticker so
// ScrollTrigger's scrub/pin math (used by HowItWorks, WhyUs, ScrollHighlightText,
// etc.) stays perfectly in sync with the interpolated scroll position instead of
// the raw, steppy native scroll. This is the integration pattern GSAP's own docs
// recommend for pairing ScrollTrigger with Lenis.
// Also exposes the Lenis instance via context so components that programmatically
// scroll (e.g. the step-indicator dots in HowItWorks/WhyUs) can route through
// Lenis's own scrollTo instead of the native window.scrollTo — mixing the two
// causes the interpolated and native scroll positions to fight each other.
import { createContext, useContext, useEffect, useState } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LenisContext = createContext<Lenis | null>(null);

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    const instance = new Lenis({
      duration: 1.1,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    // Lenis can only be constructed client-side (it touches window/document
    // immediately), so this is the earliest point the instance can exist —
    // storing it in state here is what makes it available to context
    // consumers (useLenis) at all, not a derivable/avoidable render.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLenis(instance);

    instance.on("scroll", ScrollTrigger.update);

    // gsap.ticker reports elapsed time in seconds; Lenis expects milliseconds.
    function raf(time: number) {
      instance.raf(time * 1000);
    }
    gsap.ticker.add(raf);
    // Lenis already smooths scroll motion itself; letting GSAP's ticker also
    // smooth out lag spikes fights with it and can cause stutter, so it's
    // disabled per GSAP's recommended Lenis integration.
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}
