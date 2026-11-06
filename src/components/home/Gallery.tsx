"use client";

import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LazyMotion, m, useReducedMotion } from "motion/react";

// Animation features (incl. layout animations) are fetched asynchronously after hydration.
const loadFeatures = () => import("motion/react").then((mod) => mod.domMax);
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

export type GalleryItem = { src: string; alt: string; width: number; height: number; category: string };
type Labels = {
  filterLabel: string;
  all: string;
  categories: Record<string, string>;
  open: string;
  close: string;
  previous: string;
  next: string;
  counter: string;
  dialogLabel: string;
};

export function Gallery({ items, labels }: { items: GalleryItem[]; labels: Labels }) {
  const [filter, setFilter] = useState<string>("all");
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const reduce = useReducedMotion();

  const visible = useMemo(() => (filter === "all" ? items : items.filter((i) => i.category === filter)), [filter, items]);
  const cats = useMemo(() => Object.keys(labels.categories).filter((c) => items.some((i) => i.category === c)), [items, labels.categories]);

  const openAt = (i: number, el: HTMLElement) => {
    triggerRef.current = el;
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = useCallback(() => dialogRef.current?.close(), []);
  const step = useCallback((d: number) => setIndex((i) => (i === null ? i : (i + d + visible.length) % visible.length)), [visible.length]);

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    const onClose = () => {
      setIndex(null);
      triggerRef.current?.focus();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    dlg.addEventListener("close", onClose);
    dlg.addEventListener("keydown", onKey);
    return () => {
      dlg.removeEventListener("close", onClose);
      dlg.removeEventListener("keydown", onKey);
    };
  }, [step]);

  const current = index !== null ? visible[index] : null;

  return (
    <>
      <div role="group" aria-label={labels.filterLabel} className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {["all", ...cats].map((c) => {
          const active = filter === c;
          return (
            <button
              key={c}
              type="button"
              aria-pressed={active}
              onClick={() => setFilter(c)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                active ? "border-ink bg-ink text-paper" : "border-line text-ink-soft hover:border-ink hover:text-ink"
              }`}
            >
              {c === "all" ? labels.all : labels.categories[c]}
            </button>
          );
        })}
      </div>

      <LazyMotion features={loadFeatures} strict>
      <ul className="mt-10 columns-2 gap-3 md:columns-3 md:gap-4 xl:columns-4">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((item, i) => (
            <m.li
              key={item.src}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mb-3 break-inside-avoid md:mb-4"
            >
              <button
                type="button"
                onClick={(e) => openAt(i, e.currentTarget)}
                className="group relative block w-full overflow-hidden"
                aria-label={`${labels.open}: ${item.alt}`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.width}
                  height={item.height}
                  sizes="(min-width:1280px) 25vw, (min-width:768px) 33vw, 50vw"
                  className="h-auto w-full transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                />
                <span className="absolute inset-0 flex items-end justify-between gap-3 bg-gradient-to-t from-night/75 via-transparent to-transparent p-4 text-left opacity-0 transition-opacity duration-500 group-hover:opacity-100 group-focus-visible:opacity-100">
                  <span className="text-xs font-semibold tracking-widest text-white/90 uppercase">{labels.categories[item.category]}</span>
                  <Expand className="size-4 shrink-0 text-white" aria-hidden="true" />
                </span>
              </button>
            </m.li>
          ))}
        </AnimatePresence>
      </ul>
      </LazyMotion>

      <dialog
        ref={dialogRef}
        aria-label={labels.dialogLabel}
        onClick={(e) => e.target === dialogRef.current && close()}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-night/95 p-0 text-on-night backdrop:bg-night/80"
      >
        {current && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between p-4 md:p-6">
              <p className="text-sm text-on-night-muted" aria-live="polite">
                {labels.counter.replace("{current}", String((index ?? 0) + 1)).replace("{total}", String(visible.length))}
              </p>
              <button
                type="button"
                onClick={close}
                className="grid size-11 place-items-center rounded-full border border-white/25 hover:bg-white/10"
                aria-label={labels.close}
                autoFocus
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <figure className="relative flex min-h-0 flex-1 flex-col items-center justify-center px-14 md:px-24">
              <div className="relative h-full w-full">
                <Image src={current.src} alt={current.alt} fill sizes="100vw" className="object-contain" />
              </div>
              <figcaption className="px-4 py-5 text-center text-sm text-on-night-muted">
                {current.alt} · <span className="text-accent-soft">{labels.categories[current.category]}</span>
              </figcaption>
            </figure>
            <button
              type="button"
              onClick={() => step(-1)}
              className="absolute top-1/2 left-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 hover:bg-white/10 md:left-6"
              aria-label={labels.previous}
            >
              <ChevronLeft className="size-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              className="absolute top-1/2 right-2 grid size-11 -translate-y-1/2 place-items-center rounded-full border border-white/25 hover:bg-white/10 md:right-6"
              aria-label={labels.next}
            >
              <ChevronRight className="size-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </dialog>
    </>
  );
}
