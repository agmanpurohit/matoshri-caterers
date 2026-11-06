/**
 * Schema.org JSON-LD builders. Only verified business facts are used:
 * no ratings, reviews, price range, opening hours, street address,
 * coordinates or branches are emitted.
 *
 * FAQPage markup is intentionally NOT emitted: since 2023 Google only shows
 * FAQ rich results for well-known government and health sites, so the FAQ is
 * plain accessible HTML instead.
 */
import { getDictionary } from "@/content";
import { cateringSlugs, rentalSlugs, cateringAnchor, rentalAnchor } from "@/data/services";
import { images } from "@/data/images";
import { absoluteUrl } from "./seo";
import { htmlLang, type Locale, type PageKey } from "./i18n";
import { site, siteUrl } from "./site";

export const businessId = `${siteUrl}/#business`;
export const websiteId = `${siteUrl}/#website`;

const areaServed = [
  { "@type": "State", name: "Rajasthan", containedInPlace: { "@type": "Country", name: "India" } },
  { "@type": "State", name: "Gujarat", containedInPlace: { "@type": "Country", name: "India" } },
];

export function businessSchema(locale: Locale) {
  const t = getDictionary(locale);
  const sameAs = Object.values(site.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    "@id": businessId,
    name: site.name.en,
    alternateName: site.name.hi,
    description: t.meta.home.description,
    url: absoluteUrl(locale, "home"),
    image: images.heroThalis.src.startsWith("http") ? images.heroThalis.src : `${siteUrl}${images.heroThalis.src}`,
    ...(site.logo ? { logo: `${siteUrl}${site.logo.src}` } : {}),
    telephone: site.phones[0].e164,
    contactPoint: site.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.e164,
      contactType: "customer service",
      areaServed: ["Rajasthan", "Gujarat"],
      availableLanguage: ["English", "Hindi"],
    })),
    ...(site.email ? { email: site.email } : {}),
    address: {
      "@type": "PostalAddress",
      addressLocality: site.location.locality.en,
      addressRegion: site.location.region.en,
      addressCountry: site.location.countryCode,
    },
    ...(site.googleMapsUrl ? { hasMap: site.googleMapsUrl } : {}),
    foundingDate: String(site.established),
    servesCuisine: ["Indian", "Vegetarian", "Rajasthani", "North Indian", "Gujarati", "South Indian", "Punjabi"],
    areaServed,
    knowsLanguage: ["en-IN", "hi-IN"],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function websiteSchema(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${websiteId}-${locale}`,
    url: absoluteUrl(locale, "home"),
    name: site.name[locale],
    inLanguage: htmlLang[locale],
    publisher: { "@id": businessId },
  };
}

export function breadcrumbSchema(locale: Locale, page: PageKey) {
  const t = getDictionary(locale);
  const items = [{ name: t.common.breadcrumbHome, url: absoluteUrl(locale, "home") }];
  if (page !== "home") items.push({ name: t.nav[page], url: absoluteUrl(locale, page) });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({ "@type": "ListItem", position: i + 1, name: it.name, item: it.url })),
  };
}

export function servicesSchema(locale: Locale) {
  const t = getDictionary(locale);
  const base = absoluteUrl(locale, "services");
  const svc = (name: string, description: string, serviceType: string, anchor: string) => ({
    "@type": "Service",
    "@id": `${base}#${anchor}`,
    name,
    description,
    serviceType,
    provider: { "@id": businessId },
    areaServed,
    url: `${base}#${anchor}`,
  });
  const items = [
    ...cateringSlugs.map((s) => svc(t.catering[s].title, t.catering[s].short, "Vegetarian catering", cateringAnchor(s))),
    ...rentalSlugs.map((s) => svc(t.rental[s].title, t.rental[s].short, "Catering equipment rental", rentalAnchor(s))),
  ];
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: t.meta.services.title,
    itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, item })),
  };
}
