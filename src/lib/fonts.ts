import { Cormorant_Garamond, Manrope, Tiro_Devanagari_Hindi, Mukta } from "next/font/google";

/*
 * Font budget: only the weights actually used are loaded, Latin subset only
 * for English, Devanagari (+ Latin for numerals/brand words) for Hindi.
 * Each locale layout only applies — and therefore only preloads — its own pair.
 */
export const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["500"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-cormorant",
});

export const manrope = Manrope({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-manrope",
});

// Hindi fonts are not preloaded: the single shared layout would otherwise
// preload them on English pages too. They load on demand (display: swap).
export const tiro = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  preload: false,
  weight: "400",
  display: "swap",
  variable: "--font-tiro",
});

export const mukta = Mukta({
  subsets: ["devanagari", "latin"],
  preload: false,
  weight: ["400", "600"],
  display: "swap",
  variable: "--font-mukta",
});
