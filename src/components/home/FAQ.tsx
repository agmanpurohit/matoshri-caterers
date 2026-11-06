"use client";

import { useId, useState } from "react";
import { Plus } from "lucide-react";

/**
 * Accessible accordion (WAI-ARIA disclosure pattern).
 * Every answer is rendered in the HTML (crawlable); collapsed panels are made
 * inert so keyboard and screen-reader users only meet the open ones.
 * The height animation is pure CSS (grid-template-rows 0fr → 1fr).
 */
export function FAQ({ items, defaultOpen = 0 }: { items: { q: string; a: string }[]; defaultOpen?: number }) {
  const [open, setOpen] = useState<number | null>(defaultOpen);
  const uid = useId();

  return (
    <ul className="border-t border-line">
      {items.map((it, i) => {
        const isOpen = open === i;
        const btnId = `${uid}-q${i}`;
        const panelId = `${uid}-a${i}`;
        return (
          <li key={i} className="border-b border-line">
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : i)}
                className="group flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span className={`font-display text-xl transition-colors duration-300 md:text-2xl ${isOpen ? "text-accent" : "group-hover:text-accent"}`}>
                  {it.q}
                </span>
                <span
                  aria-hidden="true"
                  className={`mt-1 grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-500 ${
                    isOpen ? "rotate-45 border-green bg-green text-white" : "border-line text-ink group-hover:border-green"
                  }`}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              inert={!isOpen}
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-[var(--ease-out-expo)] ${
                isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pr-12 pb-7 leading-relaxed text-ink-soft">{it.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
