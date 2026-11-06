"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One IntersectionObserver for the whole site. Marks [data-reveal] elements
 * with [data-revealed] as they enter the viewport; CSS does the animation.
 * Re-scans after every client-side navigation.
 */
export function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const reveal = (el: Element) => el.setAttribute("data-revealed", "");
    const pending = () => document.querySelectorAll("[data-reveal]:not([data-revealed])");

    if (!("IntersectionObserver" in window)) {
      pending().forEach(reveal);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            reveal(e.target);
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.01 },
    );
    const scan = () => pending().forEach((el) => io.observe(el));
    scan();
    // Catch content that mounts slightly later (e.g. after a route transition).
    const t = window.setTimeout(scan, 300);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, [pathname]);

  return null;
}
