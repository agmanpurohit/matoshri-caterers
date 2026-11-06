"use client";

import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { track, type AnalyticsEvent } from "@/lib/analytics";

type Props = {
  href: string;
  event: AnalyticsEvent;
  eventParams?: Record<string, string>;
  children: ReactNode;
  external?: boolean;
} & Omit<ComponentProps<"a">, "href" | "children">;

/**
 * Anchor that records a privacy-friendly analytics event on click.
 * External links (WhatsApp) open in a new tab; tel: links open the dialer.
 */
export function TrackedLink({ href, event, eventParams, children, external, onClick, ...rest }: Props) {
  const handle: ComponentProps<"a">["onClick"] = (e) => {
    track(event, eventParams);
    onClick?.(e);
  };
  if (href.startsWith("/") && !external) {
    return (
      <Link href={href} onClick={handle} {...rest}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} onClick={handle} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})} {...rest}>
      {children}
    </a>
  );
}
