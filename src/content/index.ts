import { en, type Dictionary } from "./en";
import { hi } from "./hi";
import type { Locale } from "@/lib/i18n";

const dictionaries: Record<Locale, Dictionary> = { en, hi };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

/** Replace {placeholders} in a template string. */
export function fill(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (_, k) => String(values[k] ?? `{${k}}`));
}

export type { Dictionary };
