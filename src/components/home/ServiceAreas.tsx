import { MapPin } from "lucide-react";
import { getDictionary } from "@/content";
import { gujaratCities, rajasthanCities } from "@/data/locations";
import type { Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { Reveal } from "@/components/animations/Reveal";
import { EnquiryButton, WhatsAppButton } from "@/components/shared/ctas";
import { RegionIllustration } from "./RegionIllustration";

export function ServiceAreas({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const c = t.home.coverage;
  const groups = [
    { label: c.rajasthan, cities: rajasthanCities },
    { label: c.gujarat, cities: gujaratCities },
  ];
  return (
    <section className="section-y relative overflow-hidden" aria-labelledby="coverage-title">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow">{c.eyebrow}</p>
            <h2 id="coverage-title" className="display-lg mt-5">
              {c.title}
            </h2>
            <p className="lead mt-6">{c.lead}</p>
            <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-line bg-paper-2 px-5 py-2.5 text-sm">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              <span>
                <span className="font-semibold">{c.base}:</span> {site.location.locality[locale]}, {site.location.region[locale]}
              </span>
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6">
            <RegionIllustration rajasthan={c.rajasthan} gujarat={c.gujarat} base={site.location.locality[locale]} />
          </Reveal>
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          {groups.map((g, gi) => (
            <Reveal key={g.label} delay={gi * 0.1}>
              <h3 className="flex items-center gap-4 font-display text-3xl">
                {g.label}
                <span className="h-px flex-1 bg-line" aria-hidden="true" />
              </h3>
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {g.cities.map((city) => (
                  <li
                    key={city.en}
                    className="rounded-full border border-line px-4 py-1.5 text-sm text-ink-soft transition-colors duration-300 hover:border-accent hover:text-accent"
                  >
                    {city[locale]}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 grid gap-8 border-t border-line pt-10 lg:grid-cols-12 lg:items-center">
          <div className="space-y-2 text-sm text-muted lg:col-span-7">
            <p>{c.examplesNote}</p>
            <p>{c.disclaimer}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:col-span-5 lg:justify-end">
            <EnquiryButton locale={locale} label={c.cta} context="coverage" />
            <WhatsAppButton locale={locale} topic="event" context="coverage" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
