import type { MetadataRoute } from "next";
import { locales, type PageKey } from "@/lib/i18n";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

const pages: { key: PageKey; priority: number; changeFrequency: "monthly" | "yearly" }[] = [
  { key: "home", priority: 1, changeFrequency: "monthly" },
  { key: "services", priority: 0.9, changeFrequency: "monthly" },
  { key: "about", priority: 0.7, changeFrequency: "yearly" },
  { key: "contact", priority: 0.8, changeFrequency: "yearly" },
];

/** One entry per page per language, each listing its hreflang alternates. */
export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return pages.flatMap((p) =>
    locales.map((locale) => ({
      url: absoluteUrl(locale, p.key),
      lastModified,
      changeFrequency: p.changeFrequency,
      priority: locale === "en" ? p.priority : Math.round(p.priority * 90) / 100,
      alternates: { languages: languageAlternates(p.key) },
    })),
  );
}
