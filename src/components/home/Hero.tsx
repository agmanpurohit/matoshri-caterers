import { ArrowDown, ArrowRight } from "lucide-react";
import { getDictionary } from "@/content";
import { localePath, type Locale } from "@/lib/i18n";
import { TextReveal } from "@/components/animations/TextReveal";
import { Parallax } from "@/components/animations/Parallax";
import { EnquiryButton, WhatsAppButton } from "@/components/shared/ctas";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { archClip, SiteImage } from "@/components/shared/primitives";

export function Hero({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const h = t.home.hero;
  return (
    <section className="on-night relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-night text-on-night" aria-labelledby="hero-title">
      {/* Background photograph with cinematic settle-in and parallax */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <Parallax className="absolute -inset-y-[8%] inset-x-0" amount={14} minWidth={0}>
          <div className="hero-zoom absolute inset-0">
            <SiteImage name="heroThalis" locale={locale} sizes="100vw" priority quality={50} className="object-cover" />
          </div>
        </Parallax>
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(15,28,21,0.94)_0%,rgba(15,28,21,0.78)_42%,rgba(15,28,21,0.35)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-night to-transparent" />
      </div>

      <div className="container-x relative flex flex-1 items-center pt-[calc(var(--header-h)+2.5rem)] pb-14">
        <div className="grid w-full items-center gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <p className="eyebrow fade-up" style={{ animationDelay: "0.05s" }}>
              {h.eyebrow}
            </p>
            <TextReveal id="hero-title" text={h.title} className="display-xl mt-7 max-w-[18ch]" delay={0.15} step={0.05} />
            <p className="lead fade-up mt-8 max-w-2xl" style={{ animationDelay: "0.55s" }}>
              {h.lead}
            </p>
            <div className="fade-up mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap" style={{ animationDelay: "0.7s" }}>
              <TrackedLink
                href={localePath(locale, "/services")}
                event="cta_click"
                eventParams={{ cta: "explore_services", context: "hero" }}
                className="btn btn-light"
              >
                {t.common.exploreServices}
                <ArrowRight className="arrow size-4" aria-hidden="true" />
              </TrackedLink>
              <EnquiryButton locale={locale} label={t.common.requestCateringEnquiry} className="btn btn-outline" context="hero" />
              <WhatsAppButton locale={locale} context="hero" />
            </div>
          </div>

          {/* Arch-framed secondary image (desktop) */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="relative ml-auto w-full max-w-sm">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 bg-accent-soft/25"
                style={{ clipPath: archClip }}
              />
              <div className="relative aspect-[3/4] overflow-hidden" style={{ clipPath: archClip }}>
                <SiteImage name="thaliSpread" locale={locale} sizes="(min-width:1024px) 384px, 0px" className="object-cover" />
                <div className="curtain absolute inset-0 bg-night" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="container-x flex flex-col gap-6 py-6 md:flex-row md:items-center md:justify-between">
          <ul className="grid grid-cols-2 gap-x-8 gap-y-3 text-sm text-on-night/90 md:flex md:flex-wrap md:gap-x-10">
            {h.highlights.map((item, i) => (
              <li key={item} className="fade-up flex items-center gap-3" style={{ animationDelay: `${0.85 + i * 0.08}s` }}>
                <span aria-hidden="true" className="size-1.5 rotate-45 bg-accent-soft" />
                {item}
              </li>
            ))}
          </ul>
          <a href="#introduction" className="group hidden items-center gap-3 text-xs tracking-[0.2em] text-on-night-muted uppercase md:inline-flex">
            {h.scroll}
            <span className="grid size-9 place-items-center rounded-full border border-white/25 transition-transform duration-500 group-hover:translate-y-1">
              <ArrowDown className="size-4" aria-hidden="true" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
