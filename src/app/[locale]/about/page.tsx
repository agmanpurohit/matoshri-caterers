import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, Leaf, MapPin } from "lucide-react";
import { getDictionary } from "@/content";
import { cuisineMeta, cuisineSlugs } from "@/data/services";
import { isLocale, localePath } from "@/lib/i18n";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { ImageReveal, Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";
import { Parallax } from "@/components/animations/Parallax";
import { PageHero } from "@/components/shared/PageHero";
import { ContactCTA } from "@/components/shared/ContactCTA";
import { CallButton, WhatsAppButton } from "@/components/shared/ctas";
import { archClip, JsonLd, Ornament, SiteImage } from "@/components/shared/primitives";

export async function generateMetadata({ params }: PageProps<"/[locale]/about">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return buildMetadata(locale, "about");
}

export default async function AboutPage({ params }: PageProps<"/[locale]/about">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const a = t.about;
  const services = localePath(locale, "/services");

  return (
    <>
      <JsonLd data={breadcrumbSchema(locale, "about")} />
      <PageHero locale={locale} page="about" eyebrow={a.hero.eyebrow} title={a.hero.title} lead={a.hero.lead} image="jalMahal" />

      {/* 1. About */}
      <section className="section-y" aria-labelledby="who-title">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-20">
          <Reveal className="lg:col-span-6">
            <h2 id="who-title" className="display-lg">
              {a.who.title}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              {a.who.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <dt className="text-xs font-semibold tracking-widest text-muted uppercase">{a.facts.established}</dt>
                <dd className="mt-1 font-display text-4xl text-accent">{site.established}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-widest text-muted uppercase">{a.facts.location}</dt>
                <dd className="mt-2 font-display text-2xl">{site.location.locality[locale]}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold tracking-widest text-muted uppercase">{a.facts.pureVeg}</dt>
                <dd className="mt-2 font-display text-2xl">100%</dd>
              </div>
            </dl>
          </Reveal>
          <div className="relative lg:col-span-6">
            <ImageReveal className="aspect-[4/5] w-[78%]">
              <SiteImage name="thaliPortrait" locale={locale} sizes="(min-width:1024px) 38vw, 78vw" />
            </ImageReveal>
            <ImageReveal className="absolute right-0 bottom-[-8%] aspect-square w-[46%] border-8 border-paper" delay={0.2}>
              <SiteImage name="brassPots" locale={locale} sizes="(min-width:1024px) 22vw, 46vw" />
            </ImageReveal>
          </div>
        </div>
      </section>

      {/* 2. How it started */}
      <section className="on-night relative overflow-hidden bg-night text-on-night" aria-labelledby="start-title">
        <div aria-hidden="true" className="jaali pointer-events-none absolute inset-0 text-white/[0.03]" />
        <div className="container-x section-y relative grid gap-12 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            <p aria-hidden="true" className="font-display text-[clamp(7rem,20vw,15rem)] leading-[0.8] text-accent-soft/80">
              2005
            </p>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <h2 id="start-title" className="display-lg">
              {a.start.title}
            </h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-on-night-muted">
              {a.start.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 3 & 4. Identity + celebrations */}
      <section className="section-y" aria-label={`${a.identity.title} · ${a.celebrations.title}`}>
        <div className="container-x grid gap-px bg-line md:grid-cols-2">
          {[
            { icon: <Leaf className="size-6" strokeWidth={1.4} aria-hidden="true" />, ...a.identity, img: "steelThali" as const },
            { icon: <Ornament className="w-10" />, ...a.celebrations, img: "marigoldPrep" as const },
          ].map((block, i) => (
            <Reveal key={block.title} delay={i * 0.1} className="bg-paper">
              <article className="flex h-full flex-col p-8 md:p-12">
                <span className="grid size-14 place-items-center rounded-full border border-line text-green">{block.icon}</span>
                <h2 className="display-md mt-8">{block.title}</h2>
                <p className="mt-5 flex-1 text-lg leading-relaxed text-ink-soft">{block.text}</p>
                <div className="relative mt-10 aspect-[16/9] overflow-hidden">
                  <SiteImage name={block.img} locale={locale} sizes="(min-width:768px) 45vw, 100vw" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 5. Philosophy */}
      <section className="section-y bg-paper-2" aria-labelledby="philosophy-title">
        <div className="container-x">
          <Reveal>
            <h2 id="philosophy-title" className="display-lg max-w-3xl">
              {a.philosophy.title}
            </h2>
          </Reveal>
          <Stagger as="ol" className="mt-14 grid gap-10 md:grid-cols-3">
            {a.philosophy.points.map((pt, i) => (
              <StaggerItem as="li" key={pt.title} className="border-t border-ink pt-6">
                <p className="font-display text-5xl text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 font-display text-3xl">{pt.title}</h3>
                <p className="mt-3 text-ink-soft">{pt.text}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 6. Cuisine */}
      <section className="section-y" aria-labelledby="cuisine-title">
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h2 id="cuisine-title" className="display-lg">
              {a.cuisine.title}
            </h2>
            <p className="lead mt-6">{a.cuisine.text}</p>
            <Link href={`${services}#cuisine`} className="btn btn-outline mt-8">
              {t.servicesPage.hero.jumpCuisine}
              <ArrowUpRight className="arrow size-4" aria-hidden="true" />
            </Link>
          </Reveal>
          <Stagger as="ul" className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:col-span-7">
            {cuisineSlugs.map((c) => (
              <StaggerItem as="li" key={c} className="group relative aspect-[4/5] overflow-hidden">
                <SiteImage
                  name={cuisineMeta[c].image}
                  locale={locale}
                  sizes="(min-width:1024px) 18vw, (min-width:640px) 30vw, 50vw"
                  className="object-cover transition-transform duration-[1.2s] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-night/85 via-night/10 to-transparent" />
                <p className="absolute inset-x-0 bottom-0 p-4 font-display text-xl text-on-night">{t.cuisines[c].name}</p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* 7 & 8. Services + rental summaries */}
      <section className="on-night bg-night-2 text-on-night" aria-label={`${a.servicesTitle} · ${a.rentalTitle}`}>
        <div className="container-x grid md:grid-cols-2">
          {[
            { title: a.servicesTitle, text: a.servicesText, href: `${services}#catering`, img: "buffetElegant" as const },
            { title: a.rentalTitle, text: a.rentalText, href: `${services}#rental`, img: "largeCookingPots" as const },
          ].map((b, i) => (
            <Reveal key={b.title} delay={i * 0.1} className={`py-16 md:py-24 ${i === 0 ? "md:pr-12 md:border-r md:border-white/10" : "md:pl-12"}`}>
              <div className="relative aspect-[16/9] overflow-hidden">
                <Parallax className="absolute -inset-y-[10%] inset-x-0" amount={12}>
                  <SiteImage name={b.img} locale={locale} sizes="(min-width:768px) 45vw, 100vw" />
                </Parallax>
              </div>
              <h2 className="display-md mt-8">{b.title}</h2>
              <p className="mt-4 text-on-night-muted">{b.text}</p>
              <Link href={b.href} className="group mt-6 inline-flex items-center gap-2 font-semibold text-accent-soft">
                <span className="link-underline">{t.common.viewAllServices}</span>
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 9. Coverage */}
      <section className="section-y" aria-labelledby="coverage-title">
        <div className="container-x grid gap-10 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-7">
            <h2 id="coverage-title" className="display-lg">
              {a.coverageTitle}
            </h2>
            <p className="lead mt-6">{a.coverageText}</p>
            <p className="mt-8 inline-flex items-center gap-3 text-sm font-semibold">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              {t.footer.location}
            </p>
          </Reveal>
          <Reveal className="grid grid-cols-2 gap-3 lg:col-span-5" delay={0.1}>
            <div className="relative aspect-[3/4] overflow-hidden">
              <SiteImage name="hawaMahal" locale={locale} sizes="(min-width:1024px) 20vw, 50vw" />
            </div>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden">
              <SiteImage name="gujaratTemple" locale={locale} sizes="(min-width:1024px) 20vw, 50vw" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. Owner */}
      <section className="section-y bg-paper-2" aria-labelledby="owner-title">
        <div className="container-x grid gap-14 lg:grid-cols-12 lg:items-center">
          <Reveal className="lg:col-span-5">
            {/* Owner photograph not supplied yet: an elegant monogram placeholder, clearly labelled. */}
            <div className="relative mx-auto aspect-[4/5] max-w-sm bg-night text-on-night" style={{ clipPath: archClip }}>
              <div aria-hidden="true" className="jaali absolute inset-0 text-white/[0.05]" />
              <div className="absolute inset-0 grid place-items-center">
                <div className="text-center">
                  <p aria-hidden="true" className="font-display text-8xl text-accent-soft">
                    {locale === "hi" ? "उ" : "U"}
                  </p>
                  <Ornament className="mx-auto mt-4 w-24 text-accent-soft" />
                  <p className="mt-6 text-xs tracking-widest text-on-night-muted uppercase">{a.owner.photoNote}</p>
                </div>
              </div>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-7" delay={0.1}>
            <p className="eyebrow">{a.owner.eyebrow}</p>
            <h2 id="owner-title" className="display-lg mt-5">
              {a.owner.name}
            </h2>
            <p className="mt-3 text-sm font-semibold tracking-widest text-accent uppercase">{a.owner.role}</p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-ink-soft">
              {a.owner.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <CallButton locale={locale} showNumber className="btn btn-primary" context="about_owner" />
              <WhatsAppButton locale={locale} context="about_owner" />
            </div>
          </Reveal>
        </div>
      </section>

      <ContactCTA locale={locale} />
    </>
  );
}
