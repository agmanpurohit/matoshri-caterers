import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowUpRight, MapPin, MessageCircle, Phone, User, Building2 } from "lucide-react";
import { getDictionary } from "@/content";
import { isLocale } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { telUrl, whatsappUrl, type WhatsAppTopic } from "@/lib/whatsapp";
import { Reveal } from "@/components/animations/Reveal";
import { PageHero } from "@/components/shared/PageHero";
import { EnquiryForm } from "@/components/shared/EnquiryForm";
import { MapEmbed } from "@/components/shared/MapEmbed";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { WhatsAppButton } from "@/components/shared/ctas";
import { JsonLd, SectionHeading, SiteImage } from "@/components/shared/primitives";
import { FAQ } from "@/components/home/FAQ";

export async function generateMetadata({ params }: PageProps<"/[locale]/contact">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "contact");
}

const topics: WhatsAppTopic[] = ["general", "wedding", "event", "rental", "quotation"];
/** FAQ entries most relevant to contacting / booking (indices into the FAQ list). */
const contactFaqIdx = [1, 6, 7, 11, 12, 13];

export default async function ContactPage({ params }: PageProps<"/[locale]/contact">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const c = t.contactPage;

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, "contact")} />
      <PageHero locale={locale} page="contact" eyebrow={c.hero.eyebrow} title={c.hero.title} lead={c.hero.lead} image="banquetNight" />

      {/* Direct contact */}
      <section className="section-y" aria-labelledby="direct-title">
        <div className="container-x">
          <h2 id="direct-title" className="sr-only">
            {c.phone.title}
          </h2>
          <div className="grid gap-px bg-line lg:grid-cols-3">
            {/* Phone */}
            <Reveal className="bg-paper p-8 md:p-10">
              <span className="grid size-14 place-items-center rounded-full bg-accent text-white">
                <Phone className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-8 font-display text-3xl">{c.phone.title}</h3>
              <p className="mt-3 text-ink-soft">{c.phone.text}</p>
              <ul className="mt-8 space-y-2">
                {site.phones.map((p, i) => (
                  <li key={p.e164}>
                    <TrackedLink
                      href={telUrl(p.e164)}
                      event="phone_click"
                      eventParams={{ context: "contact_page", line: String(i + 1) }}
                      className="group flex items-center justify-between gap-4 border-b border-line py-3 font-display text-2xl transition-colors hover:text-accent md:text-3xl"
                    >
                      {p.display}
                      <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* WhatsApp topics */}
            <Reveal className="bg-paper p-8 md:p-10" delay={0.08}>
              <span className="grid size-14 place-items-center rounded-full bg-whatsapp text-white">
                <MessageCircle className="size-6" aria-hidden="true" />
              </span>
              <h3 className="mt-8 font-display text-3xl">{c.whatsapp.title}</h3>
              <p className="mt-3 text-ink-soft">{c.whatsapp.text}</p>
              <ul className="mt-8 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <li key={topic}>
                    <TrackedLink
                      href={whatsappUrl(topic, locale)}
                      external
                      event={topic === "rental" ? "rental_enquiry" : "whatsapp_click"}
                      eventParams={{ context: "contact_topics", topic }}
                      className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2.5 text-sm font-medium transition-colors hover:border-whatsapp hover:bg-whatsapp hover:text-white"
                    >
                      <MessageCircle className="size-4" aria-hidden="true" />
                      {c.whatsapp.topics[topic]}
                      <span className="sr-only">{t.common.opensWhatsapp}</span>
                    </TrackedLink>
                  </li>
                ))}
              </ul>
            </Reveal>

            {/* Business details */}
            <Reveal className="bg-paper p-8 md:p-10" delay={0.16}>
              <dl className="space-y-6">
                {[
                  { icon: Building2, label: c.details.business, value: site.name[locale] },
                  { icon: User, label: c.details.owner, value: site.owner[locale] },
                  { icon: MapPin, label: c.details.location, value: t.footer.location },
                  { icon: MessageCircle, label: c.details.whatsapp, value: site.phones[0].display },
                ].map(({ icon: I, label, value }) => (
                  <div key={label} className="grid grid-cols-[1.25rem_1fr] gap-x-4">
                    <dt className="col-start-2 row-start-1 text-xs font-semibold tracking-widest text-muted uppercase">
                      <I className="absolute -ml-9 mt-1 size-5 text-accent" strokeWidth={1.5} aria-hidden="true" />
                      {label}
                    </dt>
                    <dd className="col-start-2 mt-1 text-lg">{value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Location + coverage */}
      <section className="pb-20 lg:pb-32" aria-labelledby="location-title">
        <div className="container-x grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <MapEmbed
              title={c.location.mapTitle}
              locationText={t.footer.location}
              pendingText={c.location.mapPending}
              openLabel={c.location.openMap}
            />
          </Reveal>
          <Reveal className="lg:col-span-5" delay={0.1}>
            <h2 id="location-title" className="display-md">
              {c.location.title}
            </h2>
            <p className="lead mt-4">{c.location.text}</p>
            <h2 className="display-md mt-12">{c.coverage.title}</h2>
            <p className="lead mt-4">{c.coverage.text}</p>
            {site.email && (
              <p className="mt-8">
                <a href={`mailto:${site.email}`} className="link-underline font-semibold text-accent">
                  {site.email}
                </a>
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* Enquiry form */}
      <section id="enquiry" className="section-y scroll-mt-20 bg-paper-2" aria-labelledby="contact-form-title">
        <div className="container-x grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <SectionHeading id="contact-form-title" eyebrow={c.form.eyebrow} title={c.form.title} lead={c.form.lead} />
          </Reveal>
          <Reveal className="lg:col-span-8" delay={0.1}>
            <div className="border border-line bg-[#fffdf9] p-6 shadow-[0_30px_80px_-40px_rgba(21,33,26,0.35)] md:p-10">
              <EnquiryForm t={t.form} whatsappNumber={site.whatsapp} idPrefix="contact" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Equipment rental enquiry */}
      <section className="on-night relative isolate overflow-hidden bg-night text-on-night" aria-labelledby="rental-cta-title">
        <div className="absolute inset-0 -z-10">
          <SiteImage name="brassPots" locale={locale} sizes="100vw" className="object-cover opacity-35" decorative />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/85 to-night/40" />
        </div>
        <div className="container-x flex flex-col gap-8 py-20 md:flex-row md:items-center md:justify-between">
          <Reveal className="max-w-2xl">
            <h2 id="rental-cta-title" className="display-md">
              {c.rental.title}
            </h2>
            <p className="lead mt-4">{c.rental.text}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <WhatsAppButton locale={locale} topic="rental" label={t.common.rentalWhatsapp} context="contact_rental" />
          </Reveal>
        </div>
      </section>

      {/* Contact assistance FAQ */}
      <section className="section-y" aria-labelledby="assist-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h2 id="assist-title" className="display-lg">
              {c.assistance.title}
            </h2>
          </Reveal>
          <div className="lg:col-span-8">
            <FAQ items={contactFaqIdx.map((i) => t.faqs[i])} />
          </div>
        </div>
      </section>
    </>
  );
}
