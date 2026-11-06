import { Fragment, type ElementType } from "react";

/**
 * Staggered word-by-word rise, driven purely by CSS so the heading paints
 * immediately (no hydration wait → good LCP). Each word is still plain text,
 * so screen readers and crawlers read the heading normally.
 */
export function TextReveal({
  text,
  as: As = "h1",
  className = "",
  delay = 0.15,
  step = 0.06,
  id,
}: {
  id?: string;
  text: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  step?: number;
}) {
  const words = text.split(" ");
  return (
    <As id={id} className={className}>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="word-mask">
            <span className="word-rise" style={{ animationDelay: `${delay + i * step}s` }}>
              {w}
            </span>
          </span>
          {i < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </As>
  );
}
