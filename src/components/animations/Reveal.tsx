import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll-reveal primitives.
 *
 * These are plain server-rendered elements carrying a `data-reveal` attribute.
 * Content is fully visible in the HTML; it is only pre-hidden by CSS once the
 * `js` class is on <html> (set before paint) and the visitor has not asked for
 * reduced motion. A single <RevealObserver/> marks elements as revealed when
 * they scroll into view. If JavaScript fails, nothing stays hidden.
 */

type Tag = "div" | "li" | "section" | "article" | "ul" | "ol";

const vars = (delay?: number, y?: number) =>
  ({
    ...(delay ? { "--reveal-delay": `${delay}s` } : {}),
    ...(y !== undefined ? { "--reveal-y": `${y}px` } : {}),
  }) as CSSProperties;

export function Reveal({
  children,
  className,
  delay = 0,
  y,
  as: As = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: Tag;
}) {
  return (
    <As data-reveal="" className={className} style={vars(delay, y)}>
      {children}
    </As>
  );
}

/** Container whose <StaggerItem> children reveal one after another. */
export function Stagger({ children, className, as: As = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  return (
    <As data-stagger="" className={className}>
      {children}
    </As>
  );
}

export function StaggerItem({ children, className, as: As = "div" }: { children: ReactNode; className?: string; as?: Tag }) {
  return (
    <As data-reveal="" className={className}>
      {children}
    </As>
  );
}

/** Image reveal: a curtain wipe uncovers the image while it settles from a slight zoom. */
export function ImageReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const positioned = /(^|\s)(absolute|fixed|sticky)(\s|$)/.test(className);
  return (
    <div data-reveal="image" className={`overflow-hidden ${positioned ? "" : "relative"} ${className}`} style={vars(delay)}>
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}
