import type { Metadata } from "next";
import { getDictionary } from "@/content";
import { images } from "@/data/images";
import { htmlLang, localePath, ogLocale, pagePaths, type Locale, type PageKey } from "./i18n";
import { site, siteUrl } from "./site";

/** Absolute URL for a locale + page (no trailing slash, except the bare origin). */
export function absoluteUrl(locale: Locale, page: PageKey): string {
  const path = localePath(locale, pagePaths[page]);
  return path === "/" ? siteUrl : `${siteUrl}${path}`;
}

/** hreflang alternates shared by every page. */
export function languageAlternates(page: PageKey) {
  return {
    [htmlLang.en]: absoluteUrl("en", page),
    [htmlLang.hi]: absoluteUrl("hi", page),
    "x-default": absoluteUrl("en", page),
  };
}

const ogImage = images.heroThalis.src.startsWith("http")
  ? `${images.heroThalis.src.split("?")[0]}?auto=format&fit=crop&w=1200&h=630&q=80`
  : `${siteUrl}${images.heroThalis.src}`;

export function buildMetadata(locale: Locale, page: PageKey): Metadata {
  const t = getDictionary(locale).meta[page];
  const url = absoluteUrl(locale, page);
  return {
    title: { absolute: t.title },
    description: t.description,
    alternates: {
      canonical: url,
      languages: languageAlternates(page),
    },
    openGraph: {
      type: "website",
      url,
      siteName: site.name[locale],
      title: t.title,
      description: t.description,
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[locale === "en" ? "hi" : "en"]],
      images: [{ url: ogImage, width: 1200, height: 630, alt: images.heroThalis.alt[locale] }],
    },
    twitter: {
      card: "summary_large_image",
      title: t.title,
      description: t.description,
      images: [ogImage],
    },
  };
}
