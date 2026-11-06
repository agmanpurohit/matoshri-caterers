import type { ReactNode } from "react";
import { getDictionary } from "@/content";
import type { ImageKey } from "@/data/images";
import { localePath, type Locale } from "@/lib/i18n";
import { TextReveal } from "@/components/animations/TextReveal";
import { Breadcrumbs } from "./Breadcrumbs";
import { Ornament, SiteImage } from "./primitives";

/** Hero used by About, Services and Contact. */
export function PageHero({
  locale,
  page,
  eyebrow,
  title,
  lead,
  image,
  children,
}: {
  locale: Locale;
  page: "about" | "services" | "contact";
  eyebrow: string;
  title: string;
  lead: string;
  image: ImageKey;
  children?: ReactNode;
}) {
  const t = getDictionary(locale);
  return (
    <section className="on-night relative isolate overflow-hidden bg-night text-on-night">
      <div className="absolute inset-0 -z-10">
        <div className="hero-zoom absolute inset-0">
          <SiteImage name={image} locale={locale} sizes="100vw" priority quality={50} className="object-cover opacity-55" decorative />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-night/70 via-night/55 to-night" />
      </div>
      <div className="container-x pt-[calc(var(--header-h)+3.5rem)] pb-20 lg:pt-[calc(var(--header-h)+6rem)] lg:pb-28">
        <div className="fade-up" style={{ animationDelay: "0.05s" }}>
          <Breadcrumbs
            label={t.common.breadcrumbLabel}
            items={[{ name: t.common.breadcrumbHome, href: localePath(locale, "/") }, { name: t.nav[page] }]}
          />
        </div>
        <p className="eyebrow fade-up mt-10" style={{ animationDelay: "0.1s" }}>
          {eyebrow}
        </p>
        <TextReveal text={title} className="display-xl mt-6 max-w-5xl" />
        <p className="lead fade-up mt-8 max-w-2xl" style={{ animationDelay: "0.5s" }}>
          {lead}
        </p>
        {children && (
          <div className="fade-up mt-10" style={{ animationDelay: "0.65s" }}>
            {children}
          </div>
        )}
        <Ornament className="fade-up mt-14 w-32 text-accent-soft" />
      </div>
    </section>
  );
}
