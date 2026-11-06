import Image from "next/image";
import type { ReactNode } from "react";
import {
  Briefcase,
  Cake,
  Castle,
  CircleDot,
  Coffee,
  ConciergeBell,
  CookingPot,
  Flame,
  Gem,
  Heart,
  HeartHandshake,
  Package,
  PartyPopper,
  Sparkles,
  Users,
  UsersRound,
  Utensils,
  Wand,
  type LucideIcon,
} from "lucide-react";
import { images, type ImageKey } from "@/data/images";
import type { IconName } from "@/data/services";
import type { Locale } from "@/lib/i18n";

const icons: Record<IconName, LucideIcon> = {
  HeartHandshake,
  Gem,
  Sparkles,
  Cake,
  Heart,
  Users,
  Flame,
  PartyPopper,
  Briefcase,
  UsersRound,
  Castle,
  Wand,
  Utensils,
  CircleDot,
  CookingPot,
  Coffee,
  ConciergeBell,
  Package,
};

export function Icon({ name, className }: { name: IconName; className?: string }) {
  const C = icons[name];
  return <C className={className} aria-hidden="true" strokeWidth={1.4} />;
}

/** Image from the central registry, with locale-specific alt text. */
export function SiteImage({
  name,
  locale,
  sizes,
  priority,
  className = "object-cover",
  fill = true,
  decorative = false,
  quality,
}: {
  /** Lower quality for images sitting under dark overlays (must be listed in next.config images.qualities). */
  quality?: 50 | 75;
  name: ImageKey;
  locale: Locale;
  sizes: string;
  /** Preload with high fetch priority — use only for the LCP image of a page. */
  priority?: boolean;
  className?: string;
  fill?: boolean;
  decorative?: boolean;
}) {
  const img = images[name];
  const alt = decorative ? "" : img.alt[locale];
  if (fill) {
    return <Image src={img.src} alt={alt} fill sizes={sizes} quality={quality} preload={priority} fetchPriority={priority ? "high" : undefined} className={className} />;
  }
  return (
    <Image src={img.src} alt={alt} width={img.width} height={img.height} sizes={sizes} quality={quality} preload={priority} fetchPriority={priority ? "high" : undefined} className={className} />
  );
}

export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is escaped for "<" to prevent breaking out of the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export function SectionHeading({
  eyebrow,
  title,
  lead,
  as: As = "h2",
  align = "left",
  className = "",
  id,
}: {
  eyebrow?: string;
  title: string;
  lead?: ReactNode;
  as?: "h1" | "h2" | "h3";
  align?: "left" | "center";
  className?: string;
  id?: string;
}) {
  const center = align === "center";
  return (
    <div className={`${center ? "mx-auto text-center" : ""} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${center ? "justify-center" : ""}`}>{eyebrow}</p>}
      <As id={id} className="display-lg mt-5">
        {title}
      </As>
      {lead && <div className="lead mt-6">{lead}</div>}
    </div>
  );
}

/** Ornamental divider inspired by Rajasthani jharokha arches. Decorative only. */
export function Ornament({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 120 16" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M0 8h44" />
      <path d="M76 8h44" />
      <path d="M60 1c4 3 8 4 12 7-4 3-8 4-12 7-4-3-8-4-12-7 4-3 8-4 12-7z" />
      <circle cx="60" cy="8" r="1.6" fill="currentColor" />
      <circle cx="48" cy="8" r="1" fill="currentColor" />
      <circle cx="72" cy="8" r="1" fill="currentColor" />
    </svg>
  );
}

/** Arch (jharokha) silhouette used to frame imagery. */
export const archClip = "polygon(0 18%, 6% 9%, 16% 3.5%, 30% 0.6%, 50% 0, 70% 0.6%, 84% 3.5%, 94% 9%, 100% 18%, 100% 100%, 0 100%)";

export function StockNotice({ text, className = "" }: { text: string; className?: string }) {
  return <p className={`text-xs leading-relaxed text-muted ${className}`}>{text}</p>;
}
