import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getDictionary } from "@/content";
import { cateringAnchor, cateringMeta, cateringSlugs } from "@/data/services";
import { localePath, type Locale } from "@/lib/i18n";
import { Stagger, StaggerItem } from "@/components/animations/Reveal";
import { Icon, SectionHeading, SiteImage } from "@/components/shared/primitives";
import { Reveal } from "@/components/animations/Reveal";

export function ServicesOverview({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const s = t.home.services;
  const base = localePath(locale, "/services");

  return (
    <section className="section-y bg-paper-2" aria-labelledby="services-title">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <Reveal>
            <SectionHeading id="services-title" eyebrow={s.eyebrow} title={s.title} lead={s.lead} />
          </Reveal>
          <Reveal delay={0.1}>
            <Link href={base} className="btn btn-outline shrink-0">
              {t.common.viewAllServices}
              <ArrowUpRight className="arrow size-4" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>

        <Stagger as="ul" className="mt-16 grid gap-px overflow-hidden bg-line sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {cateringSlugs.map((slug, i) => {
            const item = t.catering[slug];
            const meta = cateringMeta[slug];
            return (
              <StaggerItem as="li" key={slug} className="bg-paper-2">
                <Link
                  href={`${base}#${cateringAnchor(slug)}`}
                  className="group relative flex h-full flex-row focus-visible:outline-offset-[-4px] sm:flex-col"
                  aria-label={`${item.title} — ${t.common.learnMore}`}
                >
                  <div className="relative aspect-square w-28 shrink-0 overflow-hidden sm:aspect-[4/3] sm:w-auto">
                    <SiteImage
                      name={meta.image}
                      locale={locale}
                      sizes="(min-width:1280px) 25vw, (min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-[1.2s] ease-[var(--ease-out-expo)] group-hover:scale-[1.07]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-night/60 via-transparent to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-100" />
                    <span className="absolute top-4 left-4 hidden font-body text-xs font-semibold tracking-widest text-white/90 sm:inline">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="absolute right-4 bottom-4 hidden size-11 place-items-center rounded-full bg-paper/90 text-ink transition-all duration-500 group-hover:rotate-[-8deg] group-hover:bg-green group-hover:text-white sm:grid">
                      <Icon name={meta.icon} className="size-5" />
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-6">
                    <h3 className="font-display text-xl sm:text-2xl">{item.title}</h3>
                    <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-ink-soft sm:mt-3 sm:line-clamp-none sm:text-[0.95rem]">{item.short}</p>
                    <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent sm:mt-5" aria-hidden="true">
                      <span className="relative">
                        {t.common.learnMore}
                        <span className="absolute -bottom-0.5 left-0 h-px w-full origin-left scale-x-0 bg-current transition-transform duration-500 group-hover:scale-x-100" />
                      </span>
                      <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </Stagger>
        <p className="mt-6 text-xs text-muted">{t.common.stockNotice}</p>
      </div>
    </section>
  );
}
