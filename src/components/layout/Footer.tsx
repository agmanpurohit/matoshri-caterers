import Link from "next/link";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import { getDictionary } from "@/content";
import { cateringAnchor, cateringSlugs, rentalAnchor, rentalSlugs } from "@/data/services";
import { localePath, type Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { Ornament } from "@/components/shared/primitives";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Wordmark } from "./Wordmark";

export function Footer({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const f = t.footer;
  const services = localePath(locale, "/services");
  const footerCatering = cateringSlugs.filter((s) => s !== "custom").slice(0, 8);

  return (
    <footer className="on-night relative overflow-hidden bg-night text-on-night">
      <div aria-hidden="true" className="jaali pointer-events-none absolute inset-0 text-white/[0.025]" />
      <div className="container-x relative pt-20 pb-28 lg:pb-12">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark locale={locale} tone="light" size="lg" />
            <p className="mt-6 max-w-sm text-on-night-muted">{f.intro}</p>
            <Ornament className="mt-8 w-28 text-accent-soft" />
            <div className="mt-8">
              <p className="mb-3 text-xs font-semibold tracking-widest text-on-night-muted uppercase">{f.language}</p>
              <LanguageSwitcher locale={locale} label={f.language} tone="light" />
            </div>
          </div>

          <nav aria-label={f.navTitle} className="lg:col-span-2">
            <h2 className="font-body text-xs font-semibold tracking-widest text-accent-soft uppercase">{f.navTitle}</h2>
            <ul className="mt-5 space-y-3">
              {(["home", "about", "services", "contact"] as const).map((k) => (
                <li key={k}>
                  <Link href={localePath(locale, k === "home" ? "/" : `/${k}`)} className="link-underline text-on-night/90 hover:text-on-night">
                    {t.nav[k]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h2 className="font-body text-xs font-semibold tracking-widest text-accent-soft uppercase">{f.cateringTitle}</h2>
            <ul className="mt-5 space-y-3">
              {footerCatering.map((s) => (
                <li key={s}>
                  <Link href={`${services}#${cateringAnchor(s)}`} className="link-underline text-on-night/90 hover:text-on-night">
                    {t.catering[s].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h2 className="font-body text-xs font-semibold tracking-widest text-accent-soft uppercase">{f.rentalTitle}</h2>
            <ul className="mt-5 space-y-3">
              {rentalSlugs.map((s) => (
                <li key={s}>
                  <Link href={`${services}#${rentalAnchor(s)}`} className="link-underline text-on-night/90 hover:text-on-night">
                    {t.rental[s].title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 grid gap-10 border-t border-white/10 pt-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h2 className="font-body text-xs font-semibold tracking-widest text-accent-soft uppercase">{f.contactTitle}</h2>
            <ul className="mt-5 space-y-3">
              {site.phones.map((p, i) => (
                <li key={p.e164}>
                  <TrackedLink
                    href={`tel:${p.e164}`}
                    event="phone_click"
                    eventParams={{ context: "footer", line: String(i + 1) }}
                    className="inline-flex items-center gap-3 text-lg hover:text-accent-soft"
                  >
                    <Phone className="size-4 text-accent-soft" aria-hidden="true" />
                    {p.display}
                  </TrackedLink>
                </li>
              ))}
              <li>
                <TrackedLink
                  href={whatsappUrl("general", locale)}
                  external
                  event="whatsapp_click"
                  eventParams={{ context: "footer" }}
                  className="inline-flex items-center gap-3 text-lg hover:text-accent-soft"
                >
                  <MessageCircle className="size-4 text-accent-soft" aria-hidden="true" />
                  {t.nav.whatsapp} · {site.phones[0].display}
                  <span className="sr-only">{t.common.opensWhatsapp}</span>
                </TrackedLink>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="text-lg hover:text-accent-soft">
                    {site.email}
                  </a>
                </li>
              )}
            </ul>
          </div>
          <div>
            <h2 className="font-body text-xs font-semibold tracking-widest text-accent-soft uppercase">{t.contactPage.location.title}</h2>
            <p className="mt-5 inline-flex items-start gap-3 text-lg">
              <MapPin className="mt-1.5 size-4 shrink-0 text-accent-soft" aria-hidden="true" />
              {f.location}
            </p>
          </div>
          <div>
            <h2 className="font-body text-xs font-semibold tracking-widest text-accent-soft uppercase">{f.coverageTitle}</h2>
            <p className="mt-5 text-on-night-muted">{f.coverageText}</p>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-white/10 pt-8 text-sm text-on-night-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name[locale]}. {f.rights}
          </p>
          <p className="max-w-xl md:text-right">{t.common.stockNotice}</p>
        </div>
      </div>
    </footer>
  );
}
