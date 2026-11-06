import { ArrowRight, MessageCircle, Phone } from "lucide-react";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { site } from "@/lib/site";
import { telUrl, whatsappUrl, type WhatsAppTopic } from "@/lib/whatsapp";
import { TrackedLink } from "./TrackedLink";

export function WhatsAppButton({
  locale,
  topic = "general",
  label,
  className = "btn btn-whatsapp",
  context,
}: {
  locale: Locale;
  topic?: WhatsAppTopic;
  label?: string;
  className?: string;
  context?: string;
}) {
  const t = getDictionary(locale);
  return (
    <TrackedLink
      href={whatsappUrl(topic, locale)}
      external
      event={topic === "rental" ? "rental_enquiry" : "whatsapp_click"}
      eventParams={{ topic, context: context ?? "button", channel: "whatsapp" }}
      className={className}
    >
      <MessageCircle className="size-[1.1em]" aria-hidden="true" />
      <span>{label ?? t.common.whatsappUs}</span>
      <span className="sr-only">{t.common.opensWhatsapp}</span>
    </TrackedLink>
  );
}

export function CallButton({
  locale,
  phoneIndex = 0,
  label,
  className = "btn btn-outline",
  context,
  showNumber = false,
}: {
  locale: Locale;
  phoneIndex?: 0 | 1;
  label?: string;
  className?: string;
  context?: string;
  showNumber?: boolean;
}) {
  const t = getDictionary(locale);
  const phone = site.phones[phoneIndex];
  return (
    <TrackedLink
      href={telUrl(phone.e164)}
      event="phone_click"
      eventParams={{ context: context ?? "button", line: String(phoneIndex + 1) }}
      className={className}
      aria-label={label ? undefined : t.common.callNumber.replace("{number}", phone.display)}
    >
      <Phone className="size-[1.05em]" aria-hidden="true" />
      <span>{showNumber ? phone.display : (label ?? t.common.callNow)}</span>
    </TrackedLink>
  );
}

export function EnquiryButton({
  locale,
  label,
  className = "btn btn-primary",
  href,
  context,
}: {
  locale: Locale;
  label?: string;
  className?: string;
  href?: string;
  context?: string;
}) {
  const t = getDictionary(locale);
  return (
    <TrackedLink
      href={href ?? `${localePath(locale, "/contact")}#enquiry`}
      event="cta_click"
      eventParams={{ cta: "enquiry", context: context ?? "button" }}
      className={className}
    >
      <span>{label ?? t.common.requestEnquiry}</span>
      <ArrowRight className="arrow size-[1.05em]" aria-hidden="true" />
    </TrackedLink>
  );
}
