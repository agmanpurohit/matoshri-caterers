import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { Reveal } from "@/components/animations/Reveal";
import { CallButton, EnquiryButton, WhatsAppButton } from "./ctas";
import { Ornament, SiteImage } from "./primitives";

/** Closing call-to-action band used at the bottom of pages. */
export function ContactCTA({ locale, title, text }: { locale: Locale; title?: string; text?: string }) {
  const t = getDictionary(locale);
  return (
    <section className="on-night relative isolate overflow-hidden bg-night text-on-night" aria-labelledby="final-cta-title">
      <div className="absolute inset-0 -z-10">
        <SiteImage name="diyas" locale={locale} sizes="100vw" quality={50} className="object-cover opacity-30" decorative />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(15,28,21,0.55),var(--night)_75%)]" />
      </div>
      <div className="container-x section-y text-center">
        <Reveal>
          <Ornament className="mx-auto w-32 text-accent-soft" />
          <h2 id="final-cta-title" className="display-lg mx-auto mt-8 max-w-4xl">
            {title ?? t.home.finalCta.title}
          </h2>
          <p className="lead mx-auto mt-6 max-w-2xl">{text ?? t.home.finalCta.text}</p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <CallButton locale={locale} className="btn btn-light" context="final_cta" />
            <WhatsAppButton locale={locale} topic="quotation" context="final_cta" />
            <EnquiryButton locale={locale} className="btn btn-outline" context="final_cta" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
