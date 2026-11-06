import type { ImageKey } from "./images";

/**
 * Service catalogue structure. Text for each slug lives in the locale
 * dictionaries (src/content/en.ts, src/content/hi.ts); this file only
 * holds language-independent structure: slug, icon and image.
 */
export const cateringSlugs = [
  "wedding",
  "engagement",
  "reception",
  "birthday",
  "anniversary",
  "family-functions",
  "religious-events",
  "festivals",
  "corporate",
  "community",
  "rajasthani",
  "custom",
] as const;
export type CateringSlug = (typeof cateringSlugs)[number];

export const rentalSlugs = [
  "utensils",
  "plates-dishes",
  "cooking-vessels",
  "crockery",
  "serving-equipment",
  "other-equipment",
] as const;
export type RentalSlug = (typeof rentalSlugs)[number];

export const cuisineSlugs = ["rajasthani", "north-indian", "gujarati", "south-indian", "punjabi", "regional"] as const;
export type CuisineSlug = (typeof cuisineSlugs)[number];

export type IconName =
  | "HeartHandshake"
  | "Gem"
  | "Sparkles"
  | "Cake"
  | "Heart"
  | "Users"
  | "Flame"
  | "PartyPopper"
  | "Briefcase"
  | "UsersRound"
  | "Castle"
  | "Wand"
  | "Utensils"
  | "CircleDot"
  | "CookingPot"
  | "Coffee"
  | "ConciergeBell"
  | "Package";

export const cateringMeta: Record<CateringSlug, { icon: IconName; image: ImageKey }> = {
  wedding: { icon: "HeartHandshake", image: "mandap" },
  engagement: { icon: "Gem", image: "henna" },
  reception: { icon: "Sparkles", image: "receptionOutdoor" },
  birthday: { icon: "Cake", image: "balloons" },
  anniversary: { icon: "Heart", image: "receptionTables" },
  "family-functions": { icon: "Users", image: "pooriSabzi" },
  "religious-events": { icon: "Flame", image: "diyas" },
  festivals: { icon: "PartyPopper", image: "sweetsDisplay" },
  corporate: { icon: "Briefcase", image: "buffetElegant" },
  community: { icon: "UsersRound", image: "buffetChafing" },
  rajasthani: { icon: "Castle", image: "dal" },
  custom: { icon: "Wand", image: "papdiChaat" },
};

export const rentalMeta: Record<RentalSlug, { icon: IconName; image: ImageKey }> = {
  utensils: { icon: "Utensils", image: "brassBowls" },
  "plates-dishes": { icon: "CircleDot", image: "brassThaliSet" },
  "cooking-vessels": { icon: "CookingPot", image: "largeCookingPots" },
  crockery: { icon: "Coffee", image: "platesStack" },
  "serving-equipment": { icon: "ConciergeBell", image: "ornateContainers" },
  "other-equipment": { icon: "Package", image: "vesselMarket" },
};

export const cuisineMeta: Record<CuisineSlug, { image: ImageKey }> = {
  rajasthani: { image: "dal" },
  "north-indian": { image: "paneerNaan" },
  gujarati: { image: "steelThali" },
  "south-indian": { image: "dosa" },
  punjabi: { image: "choleBhature" },
  regional: { image: "pavBhaji" },
};

/** Section anchors used on /services so cards elsewhere can deep-link. */
export const cateringAnchor = (slug: CateringSlug) => `catering-${slug}`;
export const rentalAnchor = (slug: RentalSlug) => `rental-${slug}`;
