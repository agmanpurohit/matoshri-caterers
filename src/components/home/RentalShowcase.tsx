"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";

export type RentalShowcaseItem = {
  slug: string;
  href: string;
  title: string;
  short: string;
  image: { src: string; alt: string };
};

/**
 * Interactive rental index: hovering or focusing a category swaps the featured
 * photograph. Each row is a real link to its section on the Services page.
 */
export function RentalShowcase({ items, learnMore }: { items: RentalShowcaseItem[]; learnMore: string }) {
  const [active, setActive] = useState(0);
  const current = items[active];

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
      <div className="relative hidden aspect-[4/5] self-start overflow-hidden lg:sticky lg:top-[calc(var(--header-h)+2rem)] lg:col-span-5 lg:block">
        {/* All six photos are stacked; the active one fades/zooms in (CSS only). */}
        {items.map((it, i) => (
          <div
            key={it.slug}
            aria-hidden={active !== i}
            className={`absolute inset-0 transition-[opacity,transform] duration-[900ms] ease-[var(--ease-out-expo)] ${
              active === i ? "scale-100 opacity-100" : "scale-[1.06] opacity-0"
            }`}
          >
            <Image src={it.image.src} alt={active === i ? it.image.alt : ""} fill sizes="(min-width:1024px) 40vw, 0px" className="object-cover" />
          </div>
        ))}
        <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-night/80 to-transparent p-6 pt-20">
          <p className="font-display text-2xl text-on-night">{current.title}</p>
        </div>
      </div>

      <ol className="lg:col-span-7">
        {items.map((it, i) => (
          <li key={it.slug} className="border-b border-white/12 first:border-t">
            <Link
              href={it.href}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              className="group grid grid-cols-[auto_1fr_auto] items-start gap-5 py-6 md:gap-8 md:py-7"
            >
              <span className={`pt-2 font-body text-xs font-semibold tracking-widest transition-colors ${active === i ? "text-accent-soft" : "text-on-night-muted"}`}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>
                <span
                  className={`block font-display text-3xl transition-all duration-500 md:text-4xl ${
                    active === i ? "translate-x-1 text-on-night" : "text-on-night/75"
                  }`}
                >
                  {it.title}
                </span>
                <span className="mt-2 block max-w-lg text-on-night-muted">{it.short}</span>
                {/* Mobile image */}
                <span className="relative mt-5 block aspect-[16/9] overflow-hidden lg:hidden">
                  <Image src={it.image.src} alt={it.image.alt} fill sizes="(max-width:1023px) 90vw, 0px" className="object-cover" />
                </span>
              </span>
              <span
                className={`mt-2 grid size-11 place-items-center rounded-full border transition-all duration-500 ${
                  active === i ? "border-accent-soft bg-accent-soft text-night" : "border-white/25 text-on-night"
                }`}
              >
                <ArrowUpRight className="size-4" aria-hidden="true" />
                <span className="sr-only">{learnMore}</span>
              </span>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}
