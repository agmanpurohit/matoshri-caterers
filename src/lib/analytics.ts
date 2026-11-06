/**
 * Lightweight analytics event helper.
 * Events are sent to GA4 only when NEXT_PUBLIC_GA_MEASUREMENT_ID is configured
 * (the gtag script is injected by <Analytics />). No personal data is sent —
 * only the event name and non-identifying context such as page and topic.
 */
export type AnalyticsEvent =
  | "whatsapp_click"
  | "phone_click"
  | "service_enquiry"
  | "rental_enquiry"
  | "language_switch"
  | "cta_click";

type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function track(event: AnalyticsEvent, params: Params = {}) {
  if (typeof window === "undefined") return;
  try {
    window.gtag?.("event", event, { ...params, page_path: window.location.pathname });
  } catch {
    /* analytics must never break the UI */
  }
}
