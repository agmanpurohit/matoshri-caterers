"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Subtle scroll parallax powered by GSAP ScrollTrigger.
 * GSAP is loaded lazily after hydration so it never blocks first paint,
 * and nothing runs for reduced-motion users or on small screens.
 */
export function Parallax({
  children,
  className = "",
  amount = 12,
  minWidth = 768,
}: {
  children: ReactNode;
  className?: string;
  /** Total travel as a percentage of the element height. */
  amount?: number;
  minWidth?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.innerWidth < minWidth) return;

    let cleanup = () => {};
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      const tween = gsap.fromTo(
        el,
        { yPercent: -amount / 2 },
        {
          yPercent: amount / 2,
          ease: "none",
          scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
      cleanup = () => {
        tween.scrollTrigger?.kill();
        tween.kill();
      };
    })();
    return () => {
      cancelled = true;
      cleanup();
    };
  }, [amount, minWidth]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
