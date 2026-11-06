import type { ImageKey } from "./images";

export const galleryCategories = [
  "food",
  "rajasthani",
  "north-indian",
  "gujarati",
  "south-indian",
  "wedding",
  "buffet",
  "dining",
  "equipment",
] as const;
export type GalleryCategory = (typeof galleryCategories)[number];

/** Order matters: it is the default display order of the gallery. */
export const galleryItems: { image: ImageKey; category: GalleryCategory }[] = [
  { image: "thaliSpread", category: "gujarati" },
  { image: "buffetElegant", category: "buffet" },
  { image: "dal", category: "rajasthani" },
  { image: "paneerCurry", category: "north-indian" },
  { image: "receptionOutdoor", category: "wedding" },
  { image: "bananaLeafMeal", category: "south-indian" },
  { image: "papdiChaat", category: "food" },
  { image: "brassPots", category: "equipment" },
  { image: "jalebi", category: "food" },
  { image: "heroThalis", category: "rajasthani" },
  { image: "banquetNight", category: "dining" },
  { image: "idliDosa", category: "south-indian" },
  { image: "paneerNaan", category: "north-indian" },
  { image: "buffetChafing", category: "buffet" },
  { image: "ceremonyStage", category: "wedding" },
  { image: "steelThali", category: "gujarati" },
  { image: "thaliPortrait", category: "food" },
  { image: "metalContainers", category: "equipment" },
  { image: "samosa", category: "food" },
  { image: "receptionTables", category: "dining" },
  { image: "dalMakhani", category: "north-indian" },
  { image: "paneerTikka", category: "north-indian" },
  { image: "ladles", category: "equipment" },
  { image: "mandap", category: "wedding" },
  { image: "paniPuri", category: "food" },
];
