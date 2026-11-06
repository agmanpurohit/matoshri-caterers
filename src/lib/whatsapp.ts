import { site } from "./site";
import type { Locale } from "./i18n";

export type WhatsAppTopic = "general" | "wedding" | "event" | "rental" | "quotation";

const messages: Record<Locale, Record<WhatsAppTopic, string>> = {
  en: {
    general: "Hello Matoshri Caterers, I would like to enquire about your catering services. Please share the details.",
    wedding: "Hello Matoshri Caterers, I am planning a wedding and would like to discuss your pure vegetarian catering services.",
    event: "Hello Matoshri Caterers, I am organising an event and would like to discuss catering for it.",
    rental: "Hello Matoshri Caterers, I would like to enquire about utensils, dishes, cooking pots and crockery rental for an event.",
    quotation: "Hello Matoshri Caterers, I would like to request a catering quotation for my upcoming event.",
  },
  hi: {
    general: "नमस्ते मातोश्री कैटरर्स, मैं आपकी कैटरिंग सेवाओं के बारे में जानकारी चाहता/चाहती हूँ। कृपया विवरण साझा करें।",
    wedding: "नमस्ते मातोश्री कैटरर्स, हमारे यहाँ शादी है और मैं आपकी शुद्ध शाकाहारी कैटरिंग सेवाओं के बारे में बात करना चाहता/चाहती हूँ।",
    event: "नमस्ते मातोश्री कैटरर्स, मैं एक कार्यक्रम आयोजित कर रहा/रही हूँ और उसकी कैटरिंग के बारे में बात करना चाहता/चाहती हूँ।",
    rental: "नमस्ते मातोश्री कैटरर्स, मुझे एक कार्यक्रम के लिए बर्तन, थालियाँ, बड़े भगोने और क्रॉकरी किराये पर लेने के बारे में जानकारी चाहिए।",
    quotation: "नमस्ते मातोश्री कैटरर्स, मुझे अपने आने वाले कार्यक्रम के लिए कैटरिंग का कोटेशन चाहिए।",
  },
};

export function whatsappMessage(topic: WhatsAppTopic, locale: Locale): string {
  return messages[locale][topic];
}

/** Official click-to-chat link with a correctly encoded, prefilled message. */
export function whatsappUrl(topic: WhatsAppTopic = "general", locale: Locale = "en", customText?: string): string {
  const text = customText ?? messages[locale][topic];
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
}

export const telUrl = (e164: string) => `tel:${e164}`;
