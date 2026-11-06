import { getDictionary } from "@/content";
import { images } from "@/data/images";
import { rentalAnchor, rentalMeta, rentalSlugs } from "@/data/services";
import { localePath, type Locale } from "@/lib/i18n";
import { Reveal } from "@/components/animations/Reveal";
import { EnquiryButton, WhatsAppButton } from "@/components/shared/ctas";
import { Ornament } from "@/components/shared/primitives";
import { RentalShowcase } from "./RentalShowcase";

export function EquipmentRental({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const r = t.home.rental;
  const base = localePath(locale, "/services");
  const items = rentalSlugs.map((slug) => {
    const img = images[rentalMeta[slug].image];
    return {
      slug,
      href: `${base}#${rentalAnchor(slug)}`,
      title: t.rental[slug].title,
      short: t.rental[slug].short,
      image: { src: img.src, alt: img.alt[locale] },
    };
  });

  return (
    <section className="on-night relative overflow-hidden bg-night text-on-night" aria-labelledby="rental-title">
      <div aria-hidden="true" className="jaali pointer-events-none absolute inset-0 text-white/[0.03]" />
      <div className="container-x section-y relative">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow">{r.eyebrow}</p>
            <h2 id="rental-title" className="display-lg mt-5">
              {r.title}
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:pt-12">
            <p className="lead">{r.lead}</p>
          </Reveal>
        </div>

        <div className="mt-16">
          <RentalShowcase items={items} learnMore={t.common.learnMore} />
        </div>

        <div className="mt-20 grid gap-12 border-t border-white/12 pt-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h3 className="display-md">{r.reasonsTitle}</h3>
            <Ornament className="mt-6 w-28 text-accent-soft" />
          </Reveal>
          <ul className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            {r.reasons.map((reason, i) => (
              <Reveal as="li" key={reason.title} delay={i * 0.08}>
                <p className="font-display text-5xl text-accent-soft/70">{String(i + 1).padStart(2, "0")}</p>
                <h4 className="mt-3 font-body text-lg font-semibold">{reason.title}</h4>
                <p className="mt-2 text-on-night-muted">{reason.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>

        <Reveal className="mt-14 flex flex-col gap-6 rounded-sm border border-white/12 bg-white/[0.03] p-6 md:flex-row md:items-center md:justify-between md:p-8">
          <p className="max-w-2xl text-on-night-muted">{r.note}</p>
          <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
            <WhatsAppButton locale={locale} topic="rental" label={t.common.rentalWhatsapp} context="home_rental" />
            <EnquiryButton locale={locale} label={t.common.rentalEnquiry} className="btn btn-outline" context="home_rental" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
