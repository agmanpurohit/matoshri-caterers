import type { ReactNode } from "react";

/**
 * Route transition. A template re-mounts on every navigation, so this CSS
 * fade-and-lift replays for each new page. Pure CSS: it never hides content
 * from crawlers or no-JS visitors, and reduced-motion users get no movement.
 */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
