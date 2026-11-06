import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { fill, getDictionary } from "@/content";
import {
  cateringAnchor,
  cateringMeta,
  cateringSlugs,
  cuisineMeta,
  cuisineSlugs,
  rentalAnchor,
  rentalMeta,
  rentalSlugs,
  type CateringSlug,
} from "@/data/services";
import { isLocale } from "@/lib/i18n";
import { breadcrumbSchema, servicesSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { WhatsAppTopic } from "@/lib/whatsapp";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { CallButton, EnquiryButton, WhatsAppButton } from "@/components/shared/ctas";
import { Icon, JsonLd, SectionHeading, SiteImage } from "@/components/shared/primitives";

export async function generateMetadata({ params }: PageProps<"/[locale]/services">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "services");
}

const topicFor = (slug: CateringSlug): WhatsAppTopic =>
  slug === "wedding" || slug === "engagement" || slug === "reception" ? "wedding" : "event";

export default async function ServicesPage({ params }: PageProps<"/[locale]/services">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const sp = t.servicesPage;

  const jump = [
    { href: "#catering", label: sp.hero.jumpCatering },
    { href: "#rental", label: sp.hero.jumpRental },
    { href: "#cuisine", label: sp.hero.jumpCuisine },
    { href: "#enquiry-form", label: sp.hero.jumpForm },
  ];

  return (
    <>
      <JsonLd data={[breadcrumbSchema(locale, "services"), servicesSchema(locale)]} />
      <PageHero locale={locale} page="services" eyebrow={sp.hero.eyebrow} title={sp.hero.title} lead={sp.hero.lead} image="buffetChafing">
        <nav aria-label={sp.hero.eyebrow}>
          <ul className="flex flex-wrap gap-2">
            {jump.map((j) => (
              <li key={j.href}>
                <a
                  href={j.href}
                  className="inline-flex rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-on-night transition-colors hover:bg-on-night hover:text-night"
                >
                  {j.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </PageHero>

      {/* A. EVENT CATERING */}
      <section id="catering" className="section-y" aria-labelledby="catering-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="catering-title" eyebrow={sp.catering.eyebrow} title={sp.catering.title} lead={sp.catering.lead} />
          </Reveal>

          <div className="mt-20 space-y-24 lg:space-y-32">
            {cateringSlugs.map((slug, i) => {
              const s = t.catering[slug];
              const meta = cateringMeta[slug];
              const flip = i % 2 === 1;
              return (
                <article key={slug} id={cateringAnchor(slug)} className="grid scroll-mt-28 gap-10 lg:grid-cols-12 lg:items-center lg:gap-16">
                  <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
                    <ImageReveal className="aspect-[4/5]">
                      <SiteImage name={meta.image} locale={locale} sizes="(min-width:1024px) 40vw, 100vw" />
                    </ImageReveal>
                  </div>
                  <Reveal className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
                    <div className="flex items-center gap-4">
                      <span className="grid size-12 place-items-center rounded-full border border-line text-green">
                        <Icon name={meta.icon} className="size-5" />
                      </span>
                      <span className="font-body text-xs font-semibold tracking-widest text-muted">{String(i + 1).padStart(2, "0")} / 12</span>
                    </div>
                    <h3 className="display-md mt-6">{s.title}</h3>
                    <p className="mt-5 text-lg leading-relaxed text-ink-soft">{s.description}</p>

                    <div className="mt-8 grid gap-8 md:grid-cols-2">
                      <div>
                        <h4 className="font-body text-xs font-bold tracking-[0.2em] text-accent uppercase">{sp.catering.requirementsLabel}</h4>
                        <ul className="mt-4 space-y-2.5">
                          {s.requirements.map((r) => (
                            <li key={r} className="flex gap-3 text-[0.95rem] text-ink-soft">
                              <Check className="mt-1 size-4 shrink-0 text-green" aria-hidden="true" />
                              {r}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-body text-xs font-bold tracking-[0.2em] text-accent uppercase">{sp.catering.planningLabel}</h4>
                        <p className="mt-4 text-[0.95rem] leading-relaxed text-ink-soft">{s.planning}</p>
                      </div>
                    </div>

                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                      <WhatsAppButton
                        locale={locale}
                        topic={topicFor(slug)}
                        label={fill(sp.catering.enquire, { service: s.title })}
                        context={`services_${slug}`}
                      />
                      <EnquiryButton locale={locale} href="#enquiry-form" className="btn btn-outline" context={`services_${slug}`} />
                    </div>
                  </Reveal>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* B. EQUIPMENT RENTAL */}
      <section id="rental" className="on-night relative overflow-hidden bg-night text-on-night" aria-labelledby="rental-title">
        <div aria-hidden="true" className="jaali pointer-events-none absolute inset-0 text-white/[0.03]" />
        <div className="container-x section-y relative">
          <Reveal>
            <SectionHeading id="rental-title" eyebrow={sp.rental.eyebrow} title={sp.rental.title} lead={sp.rental.lead} />
          </Reveal>
          <div className="mt-16 grid gap-px bg-white/10 md:grid-cols-2">
            {rentalSlugs.map((slug, i) => {
              const r = t.rental[slug];
              const meta = rentalMeta[slug];
              return (
                <Reveal as="article" key={slug} delay={(i % 2) * 0.08} className="bg-night">
                  <div id={rentalAnchor(slug)} className="flex h-full scroll-mt-28 flex-col p-6 md:p-10">
                    <div className="relative aspect-[16/9] overflow-hidden">
                      <SiteImage name={meta.image} locale={locale} sizes="(min-width:768px) 45vw, 100vw" />
                    </div>
                    <div className="mt-8 flex items-center gap-4">
                      <span className="grid size-11 place-items-center rounded-full border border-white/20 text-accent-soft">
                        <Icon name={meta.icon} className="size-5" />
                      </span>
                      <h3 className="font-display text-3xl">{r.title}</h3>
                    </div>
                    <h4 className="mt-6 font-body text-xs font-bold tracking-[0.2em] text-accent-soft uppercase">{sp.rental.coversLabel}</h4>
                    <p className="mt-2 text-on-night-muted">{r.description}</p>
                    <h4 className="mt-5 font-body text-xs font-bold tracking-[0.2em] text-accent-soft uppercase">{sp.rental.usefulLabel}</h4>
                    <p className="mt-2 flex-1 text-on-night-muted">{r.useful}</p>
                    <div className="mt-8">
                      <WhatsAppButton
                        locale={locale}
                        topic="rental"
                        label={fill(sp.rental.enquire, { service: r.title })}
                        context={`rental_${slug}`}
                        className="btn btn-whatsapp w-full sm:w-auto"
                      />
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
          <p className="mt-6 text-xs text-on-night-muted">{t.common.stockNotice}</p>
        </div>
      </section>

      {/* C. INDIAN CUISINE */}
      <section id="cuisine" className="section-y bg-paper-2" aria-labelledby="cuisine-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="cuisine-title" eyebrow={sp.cuisine.eyebrow} title={sp.cuisine.title} lead={sp.cuisine.lead} />
          </Reveal>
          <Stagger as="ul" className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {cuisineSlugs.map((c, i) => (
              <StaggerItem as="li" key={c} className="group">
                <div className="relative aspect-[5/4] overflow-hidden">
                  <SiteImage
                    name={cuisineMeta[c].image}
                    locale={locale}
                    sizes="(min-width:1024px) 30vw, (min-width:640px) 45vw, 100vw"
                    className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-105"
                  />
                </div>
                <div className="mt-6 flex items-baseline gap-4 border-b border-line pb-4">
                  <span className="font-body text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-display text-3xl">{t.cuisines[c].name}</h3>
                </div>
                <p className="mt-4 text-ink-soft">{t.cuisines[c].text}</p>
              </StaggerItem>
            ))}
          </Stagger>
          <p className="mt-12 text-sm text-muted italic">{t.home.philosophy.note}</p>
        </div>
      </section>

      {/* D. ENQUIRY FORM */}
      <section id="enquiry-form" className="section-y scroll-mt-20" aria-labelledby="form-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="form-title" eyebrow={sp.form.eyebrow} title={sp.form.title} lead={sp.form.lead} />
            <div className="mt-10 space-y-3">
              <CallButton locale={locale} showNumber className="btn btn-outline w-full" context="services_form" />
              <CallButton locale={locale} phoneIndex={1} showNumber className="btn btn-outline w-full" context="services_form" />
            </div>
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <div className="border border-line bg-[#fffdf9] p-6 shadow-[0_30px_80px_-40px_rgba(21,33,26,0.35)] md:p-10">
              <EnquiryForm t={t.form} whatsappNumber={site.whatsapp} idPrefix="svc" />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA locale={locale} />
    </>
  );
}
