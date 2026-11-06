"use client";

import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { TrackedLink } from "@/components/shared/TrackedLink";

/**
 * - Mobile: a sticky bottom bar with Call + WhatsApp (always reachable by thumb).
 * - Desktop: a floating WhatsApp button and a back-to-top control.
 */
export function FloatingActions({
  whatsappHref,
  phone,
  labels,
}: {
  whatsappHref: string;
  phone: { e164: string; display: string };
  labels: { call: string; whatsapp: string; floatingWhatsapp: string; backToTop: string; opensWhatsapp: string };
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > window.innerHeight * 0.8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toTop = () => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
    document.getElementById("main")?.focus({ preventScroll: true });
  };

  return (
    <>
      {/* Mobile sticky action bar */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper/95 px-3 pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] backdrop-blur-md md:hidden">
        <div className="grid grid-cols-2 gap-2">
          <TrackedLink
            href={`tel:${phone.e164}`}
            event="phone_click"
            eventParams={{ context: "mobile_bar" }}
            className="btn btn-outline !min-h-11 !py-2 text-sm"
          >
            <Phone className="size-4" aria-hidden="true" />
            {labels.call}
          </TrackedLink>
          <TrackedLink
            href={whatsappHref}
            external
            event="whatsapp_click"
            eventParams={{ context: "mobile_bar" }}
            className="btn btn-whatsapp !min-h-11 !py-2 text-sm"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {labels.whatsapp}
            <span className="sr-only">{labels.opensWhatsapp}</span>
          </TrackedLink>
        </div>
      </div>

      {/* Desktop floating controls */}
      <div className="fixed right-6 bottom-6 z-40 hidden flex-col items-end gap-3 md:flex">
        <button
          type="button"
          onClick={toTop}
          aria-label={labels.backToTop}
          tabIndex={show ? 0 : -1}
          aria-hidden={!show}
          className={`grid size-12 place-items-center rounded-full border border-line bg-paper text-ink shadow-lg transition-all duration-500 hover:-translate-y-0.5 ${
            show ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
          }`}
        >
          <ArrowUp className="size-5" aria-hidden="true" />
        </button>
        <TrackedLink
          href={whatsappHref}
          external
          event="whatsapp_click"
          eventParams={{ context: "floating" }}
          aria-label={`${labels.floatingWhatsapp} ${labels.opensWhatsapp}`}
          className="group relative grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-xl transition-transform duration-500 hover:scale-105"
        >
          <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-whatsapp opacity-20 [animation-duration:2.8s]" />
          <MessageCircle className="relative size-6" aria-hidden="true" />
        </TrackedLink>
      </div>
    </>
  );
}
