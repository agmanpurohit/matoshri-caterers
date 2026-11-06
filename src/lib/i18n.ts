export const locales = ["en", "hi"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const htmlLang: Record<Locale, string> = { en: "en-IN", hi: "hi-IN" };
export const ogLocale: Record<Locale, string> = { en: "en_IN", hi: "hi_IN" };

export const isLocale = (v: string): v is Locale => (locales as readonly string[]).includes(v);

export type PageKey = "home" | "about" | "services" | "contact";
export const pagePaths: Record<PageKey, string> = {
  home: "/",
  about: "/about",
  services: "/services",
  contact: "/contact",
};

/** Build a public URL path for a locale. English has no prefix. */
export function localePath(locale: Locale, path: string = "/"): string {
  const clean = path === "/" ? "" : path.startsWith("/") ? path : `/${path}`;
  if (locale === "en") return clean || "/";
  return `/hi${clean}`;
}

/** Strip the locale prefix from a public pathname, returning the base path. */
export function stripLocale(pathname: string): string {
  if (pathname === "/hi") return "/";
  if (pathname.startsWith("/hi/")) return pathname.slice(3);
  return pathname || "/";
}
