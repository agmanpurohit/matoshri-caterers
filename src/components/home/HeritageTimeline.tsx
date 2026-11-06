"use client";

import { useEffect, useRef } from "react";

type Item = { year: string; title: string; text: string };

/**
 * Heritage timeline. A GSAP ScrollTrigger scrubs the vertical progress line
 * and lights up each milestone as it is reached. Without JS or with reduced
 * motion, the full timeline is simply shown.
 */
export function HeritageTimeline({ items, eyebrow, title }: { items: Item[]; eyebrow: string; title: string }) {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el || !line.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([import("gsap"), import("gsap/ScrollTrigger")]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        gsap.fromTo(
          line.current,
          { scaleY: 0 },
          { scaleY: 1, ease: "none", scrollTrigger: { trigger: el, start: "top 70%", end: "bottom 60%", scrub: 0.6 } },
        );
        gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-milestone]")).forEach((m) => {
          gsap.fromTo(
            m,
            { opacity: 0.25, x: 24 },
            {
              opacity: 1,
              x: 0,
              duration: 0.9,
              ease: "expo.out",
              scrollTrigger: { trigger: m, start: "top 75%", toggleActions: "play none none reverse" },
            },
          );
          const dot = m.querySelector("[data-dot]");
          if (dot)
            gsap.fromTo(
              dot,
              { scale: 0.4, backgroundColor: "rgba(244,124,69,0.25)" },
              { scale: 1, backgroundColor: "#f47c45", scrollTrigger: { trigger: m, start: "top 75%", toggleActions: "play none none reverse" } },
            );
        });
      }, el);
    })();
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, []);

  return (
    <div className="grid gap-14 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id="journey-title" className="display-lg mt-5">
            {title}
          </h2>
          <p aria-hidden="true" className="mt-10 font-display text-[clamp(6rem,14vw,11rem)] leading-none text-accent-soft/25">
            2005
          </p>
        </div>
      </div>
      <div ref={root} className="relative lg:col-span-7">
        <div aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-px bg-white/15" />
        <div ref={line} aria-hidden="true" className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-accent-soft" />
        <ol className="space-y-16">
          {items.map((it) => (
            <li key={it.year} data-milestone className="relative pl-14">
              <span data-dot aria-hidden="true" className="absolute top-2 left-0 size-6 rounded-full border-4 border-night bg-accent-soft ring-1 ring-accent-soft" />
              <p className="font-display text-4xl text-accent-soft md:text-5xl">{it.year}</p>
              <h3 className="mt-3 font-body text-xl font-semibold">{it.title}</h3>
              <p className="mt-3 max-w-xl text-on-night-muted">{it.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
