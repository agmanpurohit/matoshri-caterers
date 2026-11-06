"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeft, MessageCircle } from "lucide-react";
import { Ornament } from "@/components/shared/primitives";
import { whatsappUrl } from "@/lib/whatsapp";

/**
 * Localised 404. not-found files receive no params, so the locale is taken
 * from the URL on the client. Being a client component keeps every real page
 * statically prerendered (reading request headers here would make them dynamic).
 */
const copy = {
  en: {
    title: "This page seems to have left the party.",
    text: "The page you were looking for doesn’t exist or may have moved. Let’s get you back to the celebration.",
    home: "Back to Home",
    whatsapp: "WhatsApp Us",
  },
  hi: {
    title: "लगता है यह पेज दावत छोड़कर चला गया।",
    text: "आप जिस पेज को खोज रहे थे, वह मौजूद नहीं है या कहीं और चला गया है। चलिए, आपको वापस उत्सव में ले चलते हैं।",
    home: "होम पर लौटें",
    whatsapp: "व्हाट्सऐप करें",
  },
};

export default function NotFound() {
  const path = usePathname() || "";
  const locale = path === "/hi" || path.startsWith("/hi/") ? "hi" : "en";
  const t = copy[locale];
  return (
    <section className="on-night relative grid min-h-[88vh] place-items-center overflow-hidden bg-night pt-[var(--header-h)] text-on-night">
      <div aria-hidden="true" className="jaali pointer-events-none absolute inset-0 text-white/[0.03]" />
      <div className="container-x relative py-24 text-center">
        <p className="font-display text-[clamp(6rem,20vw,14rem)] leading-none text-accent-soft/80">404</p>
        <Ornament className="mx-auto mt-4 w-32 text-accent-soft" />
        <h1 className="display-md mx-auto mt-8 max-w-2xl">{t.title}</h1>
        <p className="lead mx-auto mt-5 max-w-xl">{t.text}</p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href={locale === "hi" ? "/hi" : "/"} className="btn btn-light">
            <ArrowLeft className="size-4" aria-hidden="true" />
            {t.home}
          </Link>
          <a href={whatsappUrl("general", locale)} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp">
            <MessageCircle className="size-4" aria-hidden="true" />
            {t.whatsapp}
          </a>
        </div>
      </div>
    </section>
  );
}
