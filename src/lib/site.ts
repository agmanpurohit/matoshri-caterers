/**
 * CENTRAL BUSINESS CONFIGURATION
 * ---------------------------------------------------------------
 * Every page, component, metadata tag and JSON-LD block reads business
 * facts from here. Update a value once and it changes everywhere.
 *
 * Values set to `null` are NOT YET VERIFIED. The UI hides anything that
 * depends on them (email links, map embed, logo image, social icons)
 * until a real value is supplied. Never put placeholder data here.
 */
export const site = {
  name: { en: "Matoshri Caterers", hi: "मातोश्री कैटरर्स" },
  owner: { en: "Ugam Singh Rajpurohit", hi: "उगम सिंह राजपुरोहित" },
  established: 2005,
  location: {
    locality: { en: "Sesali", hi: "सेसली" },
    region: { en: "Rajasthan", hi: "राजस्थान" },
    country: { en: "India", hi: "भारत" },
    countryCode: "IN",
  },
  phones: [
    { display: "+91 80800 80400", e164: "+918080080400" },
    { display: "+91 80800 60800", e164: "+918080060800" },
  ],
  whatsapp: "918080080400",
  serviceStates: ["Rajasthan", "Gujarat"] as const,

  /** Not available yet — supply a verified address to show it as a contact link. */
  email: null as string | null,
  /** Not available yet — paste the verified Google Maps share link of the business. */
  googleMapsUrl: null as string | null,
  /** Not available yet — paste the verified Google Maps EMBED src (https://www.google.com/maps/embed?pb=...). */
  googleMapsEmbedSrc: null as string | null,
  /**
   * Official logo, used exactly as supplied (original colours, no filters).
   * width/height are its intrinsic viewBox size so proportions never distort.
   * Set to null to fall back to the text wordmark.
   */
  logo: { src: "/logo/matoshri-logo.svg", width: 666, height: 340 } as { src: string; width: number; height: number } | null,
  /** Add only verified profile URLs. Empty entries are not rendered. */
  social: {} as Partial<Record<"instagram" | "facebook" | "youtube", string>>,
} as const;

/**
 * Search-engine indexing switch.
 * false = every page and file is sent with "noindex, nofollow" (robots meta tag
 * + X-Robots-Tag header), so search engines won't list the site or follow links.
 * Set to true when the site should appear in Google, then redeploy.
 */
export const allowIndexing = false;

export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.matoshricaterers.com").replace(/\/$/, "");

export const yearsOfService = () => new Date().getFullYear() - site.established;
