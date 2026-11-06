import { CalendarCheck, Hourglass, Leaf, MapPin, Map, LayoutGrid, Package, PhoneCall, type LucideIcon } from "lucide-react";
import { getDictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import { Reveal, Stagger, StaggerItem } from "@/components/animations/Reveal";

const icons: LucideIcon[] = [CalendarCheck, Hourglass, Leaf, MapPin, Map, LayoutGrid, Package, PhoneCall];

export function WhyChooseUs({ locale }: { locale: Locale }) {
  const t = getDictionary(locale);
  const w = t.home.why;
  return (
    <section className="section-y" aria-labelledby="why-title">
      <div className="container-x">
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow justify-center">{w.eyebrow}</p>
          <h2 id="why-title" className="display-lg mt-5">
            {w.title}
          </h2>
        </Reveal>

        <Stagger as="ul" className="mt-16 grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-4">
          {w.items.map((item, i) => {
            const I = icons[i];
            return (
              <StaggerItem as="li" key={item.title} className="group relative border-r border-b border-line p-8 transition-colors duration-500 hover:bg-paper-2">
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-green transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:scale-x-100"
                />
                <span className="grid size-14 place-items-center rounded-full border border-line text-green transition-all duration-500 group-hover:-rotate-6 group-hover:border-green group-hover:bg-green group-hover:text-white">
                  <I className="size-6" strokeWidth={1.4} aria-hidden="true" />
                </span>
                <h3 className="mt-6 font-display text-2xl">{item.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-ink-soft">{item.text}</p>
              </StaggerItem>
            );
          })}
        </Stagger>
      </div>
    </section>
  );
}
