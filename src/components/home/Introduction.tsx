import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { localePath } from "@/lib/i18n";
import { ImageReveal, Reveal } from "@/components/animations/Reveal";
import { Parallax } from "@/components/animations/Parallax";
import { archClip, Ornament, SiteImage } from "@/components/shared/primitives";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function Introduction({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const it = t.home.intro;
  return (
    <section id="introduction" className="grain section-y relative overflow-hidden" aria-labelledby="intro-title">
      <div className="container-x relative grid gap-14 lg:grid-cols-12 lg:gap-20">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)]">
            <Reveal>
              <p className="eyebrow">{it.eyebrow}</p>
              <h2 id="intro-title" className="display-lg mt-5">
                {it.title}
              </h2>
            </Reveal>
            <Reveal delay={0.15} className="relative mt-12 hidden md:block">
              <div className="relative aspect-[4/5] max-w-sm overflow-hidden" style={{ clipPath: archClip }}>
                <Parallax className="absolute -inset-y-[10%] inset-x-0" amount={16}>
                  <SiteImage name="dalMakhani" locale={locale} sizes="(min-width:768px) 384px, 0px" />
                </Parallax>
              </div>
            </Reveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-16">
          <div className="space-y-7 text-lg leading-relaxed text-ink-soft">
            {it.paragraphs.map((p, i) => (
              <Reveal key={i} delay={i * 0.05}>
                <p className={i === 0 ? "text-xl text-ink md:text-2xl md:leading-relaxed" : ""}>
                  {p}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <figure className="border-l-2 border-accent-soft pl-8">
              <blockquote className="font-display text-3xl leading-snug text-ink md:text-4xl">“{it.quote}”</blockquote>
              <figcaption className="mt-4 text-sm text-muted">{it.quoteNote}</figcaption>
            </figure>
          </Reveal>

          <Reveal className="mt-14 grid grid-cols-2 gap-4">
            <ImageReveal className="aspect-[4/5]">
              <SiteImage name="sweetsDisplay" locale={locale} sizes="(min-width:1024px) 30vw, 50vw" />
            </ImageReveal>
            <ImageReveal className="mt-16 aspect-[4/5]" delay={0.15}>
              <SiteImage name="brassThaliSet" locale={locale} sizes="(min-width:1024px) 30vw, 50vw" />
            </ImageReveal>
          </Reveal>

          <Reveal className="mt-12 flex items-center gap-6">
            <Ornament className="w-24 text-accent-soft" />
            <Link href={localePath(locale, "/about")} className="group inline-flex items-center gap-2 font-semibold text-accent">
              <span className="link-underline">{t.common.aboutUs}</span>
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
