"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, Phone } from "lucide-react";
import { localePath, type Locale } from "@/lib/i18n";
import { TrackedLink } from "@/components/shared/TrackedLink";
import { LanguageSwitcher, useBasePath } from "./LanguageSwitcher";
import { Wordmark } from "./Wordmark";

type NavLabels = {
  home: string;
  about: string;
  services: string;
  contact: string;
  openMenu: string;
  closeMenu: string;
  primary: string;
  call: string;
  whatsapp: string;
  language: string;
  menuTagline: string;
};

export function Header({
  locale,
  labels,
  whatsappHref,
  phone,
  opensWhatsapp,
}: {
  locale: Locale;
  labels: NavLabels;
  whatsappHref: string;
  phone: { e164: string; display: string };
  opensWhatsapp: string;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const base = useBasePath();
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const items = [
    { key: "home", href: "/", label: labels.home },
    { key: "about", href: "/about", label: labels.about },
    { key: "services", href: "/services", label: labels.services },
    { key: "contact", href: "/contact", label: labels.contact },
  ] as const;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu on navigation.
  useEffect(() => setOpen(false), [base, locale]);

  // Lock scroll, handle Escape, keep focus inside the open menu.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const panel = panelRef.current;
    panel?.querySelector<HTMLElement>("a,button")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
      if (e.key === "Tab" && panel) {
        const nodes = Array.from(panel.querySelectorAll<HTMLElement>("a,button")).concat(toggleRef.current ?? []);
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = scrolled && !open;
  const light = !solid; // light text over the dark hero / dark menu
  const isActive = (href: string) => (href === "/" ? base === "/" : base.startsWith(href));

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,backdrop-filter] duration-500 ${
        solid ? "bg-paper/92 shadow-[0_1px_0_var(--line)] backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="container-x flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link href={localePath(locale, "/")} className="relative z-10 shrink-0 rounded">
          <Wordmark locale={locale} tone={light ? "light" : "dark"} />
        </Link>

        <nav aria-label={labels.primary} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {items.map((it) => {
              const active = isActive(it.href);
              return (
                <li key={it.key}>
                  <Link
                    href={localePath(locale, it.href)}
                    aria-current={active ? "page" : undefined}
                    className={`group relative px-4 py-2 text-[0.95rem] font-medium transition-colors ${
                      light ? "text-on-night/90 hover:text-on-night" : "text-ink-soft hover:text-ink"
                    }`}
                  >
                    {it.label}
                    <span
                      aria-hidden="true"
                      className={`absolute inset-x-4 -bottom-0.5 h-px origin-left bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                        active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher locale={locale} label={labels.language} tone={light ? "light" : "dark"} className="hidden sm:block" />
          <TrackedLink
            href={`tel:${phone.e164}`}
            event="phone_click"
            eventParams={{ context: "header" }}
            className={`hidden items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold xl:inline-flex ${
              light ? "text-on-night" : "text-ink"
            }`}
          >
            <Phone className="size-4" aria-hidden="true" />
            {phone.display}
          </TrackedLink>
          <TrackedLink
            href={whatsappHref}
            external
            event="whatsapp_click"
            eventParams={{ context: "header", topic: "general" }}
            className="btn btn-whatsapp hidden !min-h-0 !py-2.5 md:inline-flex"
          >
            <MessageCircle className="size-4" aria-hidden="true" />
            {labels.whatsapp}
            <span className="sr-only">{opensWhatsapp}</span>
          </TrackedLink>

          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            className={`relative grid size-11 place-items-center rounded-full border lg:hidden ${
              light ? "border-white/35 text-on-night" : "border-ink/20 text-ink"
            }`}
          >
            <span className="relative block h-3 w-5" aria-hidden="true">
              <span
                className={`absolute left-0 top-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "translate-y-[5px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute bottom-0 left-0 h-[1.5px] w-full bg-current transition-transform duration-500 ease-[var(--ease-out-expo)] ${
                  open ? "-translate-y-[5.5px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {/* Mobile menu — CSS-driven circular reveal; inert while closed so it is skipped by keyboard and screen readers. */}
      <div
        id="mobile-menu"
        ref={panelRef}
        inert={!open}
        aria-hidden={!open}
        className={`mobile-menu on-night fixed inset-0 flex flex-col overflow-y-auto bg-night pt-[var(--header-h)] text-on-night lg:hidden ${
          open ? "is-open" : ""
        }`}
      >
        <div aria-hidden="true" className="jaali pointer-events-none absolute inset-0 text-white/[0.035]" />
        <nav aria-label={labels.primary} className="container-x relative flex-1 py-8">
          <ul className="space-y-1">
            {items.map((it, i) => (
              <li key={it.key} className="menu-item" style={{ transitionDelay: open ? `${0.15 + i * 0.06}s` : "0s" }}>
                <Link
                  href={localePath(locale, it.href)}
                  aria-current={isActive(it.href) ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className="flex items-baseline gap-4 border-b border-white/10 py-4 font-display text-4xl"
                >
                  <span className="font-body text-xs tracking-widest text-accent-soft">0{i + 1}</span>
                  {it.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-item mt-10 space-y-6" style={{ transitionDelay: open ? "0.45s" : "0s" }}>
            <LanguageSwitcher locale={locale} label={labels.language} tone="light" />
            <div className="flex flex-col gap-3 sm:flex-row">
              <TrackedLink
                href={whatsappHref}
                external
                event="whatsapp_click"
                eventParams={{ context: "mobile_menu" }}
                className="btn btn-whatsapp"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                {labels.whatsapp}
                <span className="sr-only">{opensWhatsapp}</span>
              </TrackedLink>
              <TrackedLink href={`tel:${phone.e164}`} event="phone_click" eventParams={{ context: "mobile_menu" }} className="btn btn-outline">
                <Phone className="size-4" aria-hidden="true" />
                {labels.call} {phone.display}
              </TrackedLink>
            </div>
            <p className="text-sm text-on-night-muted">{labels.menuTagline}</p>
          </div>
        </nav>
      </div>
    </header>
  );
}
