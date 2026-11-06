import { z } from "zod";
import type { Dictionary } from "@/content";

export const eventTypeValues = [
  "wedding",
  "engagement",
  "reception",
  "birthday",
  "anniversary",
  "religious",
  "corporate",
  "family",
  "festival",
  "other",
] as const;
export const serviceValues = ["catering", "rental", "both", "custom"] as const;

/** Today's date (YYYY-MM-DD) in India Standard Time. */
export const todayIST = () => new Date(Date.now() + 5.5 * 3600 * 1000).toISOString().slice(0, 10);

/** Normalise "+91 98xxxxxxxx", "098…", "98-…" to 10 digits. */
export const normalisePhone = (v: string) => {
  const digits = v.replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) return digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) return digits.slice(1);
  return digits;
};

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Validation for the enquiry form (messages come from the locale dictionary). */
export function enquirySchema(e: Dictionary["form"]["errors"]) {
  return z.object({
    name: z.string().trim().min(1, e.nameRequired).min(2, e.nameShort).max(80, e.nameShort),
    phone: z
      .string()
      .trim()
      .refine((v) => /^[6-9]\d{9}$/.test(normalisePhone(v)), e.phoneInvalid),
    email: z
      .string()
      .trim()
      .max(120, e.emailInvalid)
      .refine((v) => v === "" || emailRe.test(v), e.emailInvalid),
    eventType: z.string().refine((v) => (eventTypeValues as readonly string[]).includes(v), e.eventTypeRequired),
    eventDate: z
      .string()
      .trim()
      .refine((v) => v === "" || (/^\d{4}-\d{2}-\d{2}$/.test(v) && v >= todayIST()), e.dateInvalid),
    city: z.string().trim().min(2, e.cityRequired).max(80, e.cityRequired),
    guests: z
      .string()
      .trim()
      .refine((v) => v === "" || (/^\d{1,6}$/.test(v) && +v >= 1 && +v <= 100000), e.guestsInvalid),
    service: z.string().refine((v) => (serviceValues as readonly string[]).includes(v), e.serviceRequired),
    message: z.string().trim().max(1500, e.messageLong),
  });
}

export type EnquiryInput = z.infer<ReturnType<typeof enquirySchema>>;
