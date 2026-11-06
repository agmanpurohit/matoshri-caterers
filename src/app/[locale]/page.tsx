import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary } from "@/content";
import { galleryItems } from "@/data/gallery";
import { images } from "@/data/images";
import { isLocale } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { Reveal } from "@/components/animations/Reveal";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { ServicesOverview } from "@/components/home/ServicesOverview";
import { EquipmentRental } from "@/components/home/EquipmentRental";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { FoodPhilosophy } from "@/components/home/FoodPhilosophy";
import { ServiceAreas } from "@/components/home/ServiceAreas";
import { HeritageTimeline } from "@/components/home/HeritageTimeline";
import { Gallery } from "@/components/home/Gallery";
import { FAQ } from "@/components/home/FAQ";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { JsonLd, SectionHeading } from "@/components/shared/primitives";

export async function generateMetadata({ params }: PageProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "home");
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const g = t.home.gallery;

  const gallery = galleryItems.map(({ image, category }) => {
    const img = images[image];
    return { src: img.src, alt: img.alt[locale], width: img.width, height: img.height, category };
  });

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, "home")} />
      <Hero locale={locale} />
      <Introduction locale={locale} />
      <ServicesOverview locale={locale} />
      <EquipmentRental locale={locale} />
      <WhyChooseUs locale={locale} />
      <FoodPhilosophy locale={locale} />
      <ServiceAreas locale={locale} />

      <section className="on-night section-y relative overflow-hidden bg-night-2 text-on-night" aria-labelledby="journey-title">
        <div aria-hidden="true" className="jaali pointer-events-none absolute inset-0 text-white/[0.025]" />
        <div className="container-x relative">
          <HeritageTimeline items={t.home.journey.items} eyebrow={t.home.journey.eyebrow} title={t.home.journey.title} />
        </div>
      </section>

      <section className="section-y" aria-labelledby="gallery-title">
        <div className="container-x">
          <Reveal>
            <SectionHeading id="gallery-title" eyebrow={g.eyebrow} title={g.title} lead={g.lead} />
          </Reveal>
          <div className="mt-12">
            <Gallery
              items={gallery}
              labels={{
                filterLabel: g.filterLabel,
                all: g.all,
                categories: g.categories,
                open: g.open,
                close: g.close,
                previous: g.previous,
                next: g.next,
                counter: g.counter,
                dialogLabel: g.dialogLabel,
              }}
            />
          </div>
          <p className="mt-6 text-xs text-muted">{t.common.stockNotice}</p>
        </div>
      </section>

      <section className="section-y bg-paper-2" aria-labelledby="faq-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
              <SectionHeading id="faq-title" eyebrow={t.home.faq.eyebrow} title={t.home.faq.title} lead={t.home.faq.lead} />
            </div>
          </Reveal>
          <div className="lg:col-span-8">
            <FAQ items={t.faqs} />
          </div>
        </div>
      </section>

      <ContactCTA locale={locale} />
    </>
  );
}
