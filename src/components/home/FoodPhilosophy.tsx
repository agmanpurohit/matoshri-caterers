import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { ImageReveal, Reveal } from "@/components/animations/Reveal";
import { Parallax } from "@/components/animations/Parallax";
import { SiteImage, archClip } from "@/components/shared/primitives";

export function FoodPhilosophy({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const p = t.home.philosophy;
  return (
    <section className="section-y relative overflow-hidden bg-paper-2" aria-labelledby="philosophy-title">
      <div className="container-x grid gap-14 lg:grid-cols-12 lg:gap-20">
        {/* Sticky image stack (sticky storytelling on desktop) */}
        <div className="lg:col-span-5">
          <div className="relative lg:sticky lg:top-[calc(var(--header-h)+2rem)]">
            <div className="relative aspect-[4/5] overflow-hidden" style={{ clipPath: archClip }}>
              <Parallax className="absolute -inset-y-[10%] inset-x-0" amount={14}>
                <SiteImage name="rotiGreens" locale={locale} sizes="(min-width:1024px) 40vw, 100vw" />
              </Parallax>
            </div>
            <ImageReveal className="absolute -right-2 -bottom-10 aspect-square w-[42%] border-8 border-paper-2 md:-right-8" delay={0.2}>
              <SiteImage name="samosa" locale={locale} sizes="(min-width:1024px) 18vw, 40vw" />
            </ImageReveal>
          </div>
        </div>

        <div className="lg:col-span-7 lg:pt-6">
          <Reveal>
            <p className="eyebrow">{p.eyebrow}</p>
            <h2 id="philosophy-title" className="display-lg mt-5">
              {p.title}
            </h2>
          </Reveal>
          <div className="mt-10 space-y-6 text-lg leading-relaxed text-ink-soft">
            {p.paragraphs.map((para, i) => (
              <Reveal key={i}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <h3 className="font-body text-xs font-bold tracking-[0.22em] text-accent uppercase">{p.cuisinesTitle}</h3>
            <ul className="mt-6 grid gap-x-8 sm:grid-cols-2">
              {p.cuisines.map((c, i) => (
                <li key={c} className="group flex items-baseline gap-4 border-b border-line py-4">
                  <span className="font-body text-xs text-muted tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-2xl transition-colors duration-300 group-hover:text-accent">{c}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-muted italic">{p.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
