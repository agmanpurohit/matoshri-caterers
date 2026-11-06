import Image from "next/image";
import { site } from "@/lib/site";
import type { Locale } from "@/lib/i18n";

/**
 * Brand mark.
 * - The official logo (`site.logo`) is rendered exactly as supplied: original
 *   colours, no filters, intrinsic aspect ratio (height set, width auto).
 * - On dark backgrounds (`tone="light"`) the logo sits on a cream plate, because
 *   its green would otherwise lack contrast — the logo itself is never recoloured.
 * - If `site.logo` is null, a text wordmark is shown instead.
 */
export function Wordmark({ locale, tone = "dark", size = "md" }: { locale: Locale; tone?: "dark" | "light"; size?: "md" | "lg" }) {
  if (site.logo) {
    const img = (
      <Image
        src={site.logo.src}
        alt={site.name[locale]}
        width={site.logo.width}
        height={site.logo.height}
        unoptimized
        preload
        className={size === "lg" ? "h-[96px] w-auto" : "h-[54px] w-auto lg:h-[62px]"}
      />
    );
    return (
      <span
        className={`inline-flex items-center transition-[background-color,box-shadow,padding] duration-500 ${
          tone === "light" ? "rounded-xl bg-paper px-2.5 py-1 shadow-[0_6px_24px_-8px_rgba(0,0,0,0.45)]" : "px-0 py-1"
        }`}
      >
        {img}
      </span>
    );
  }

  const isHi = locale === "hi";
  const color = tone === "light" ? "text-on-night" : "text-ink";
  return (
    <span className={`inline-flex flex-col leading-none ${color}`} data-temporary-wordmark>
      <span className={`font-display ${size === "lg" ? "text-4xl" : "text-[1.7rem]"} ${isHi ? "" : "italic"} tracking-tight`}>
        {isHi ? "मातोश्री" : "Matoshri"}
      </span>
      <span
        className={`mt-1 font-body ${size === "lg" ? "text-xs" : "text-[0.62rem]"} font-semibold ${isHi ? "tracking-[0.12em]" : "tracking-[0.42em]"} uppercase opacity-80`}
      >
        {isHi ? "कैटरर्स" : "Caterers"}
      </span>
    </span>
  );
}
