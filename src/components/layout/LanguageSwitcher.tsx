"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localePath, stripLocale, type Locale } from "@/lib/i18n";
import { track } from "@/lib/analytics";

/** Public base path (without locale prefix) for the current page. */
export function useBasePath() {
  const pathname = usePathname() || "/";
  // Tolerate the internal /en rewrite target as well as the public URL.
  const p = pathname === "/en" ? "/" : pathname.startsWith("/en/") ? pathname.slice(3) : pathname;
  return stripLocale(p);
}

/**
 * EN / हिंदी switch. Keeps the visitor on the same page in the other
 * language (e.g. /services ⇄ /hi/services).
 */
export function LanguageSwitcher({
  locale,
  label,
  tone = "dark",
  className = "",
}: {
  locale: Locale;
  label: string;
  tone?: "dark" | "light";
  className?: string;
}) {
  const base = useBasePath();
  const options: { code: Locale; text: string; lang: string }[] = [
    { code: "en", text: "EN", lang: "en-IN" },
    { code: "hi", text: "हिंदी", lang: "hi-IN" },
  ];
  const ring = tone === "light" ? "border-white/35" : "border-ink/20";
  return (
    <nav aria-label={label} className={className}>
      <ul className={`relative inline-flex items-center rounded-full border ${ring} p-1 text-sm`}>
        {options.map((o) => {
          const active = o.code === locale;
          return (
            <li key={o.code}>
              <Link
                href={localePath(o.code, base)}
                hrefLang={o.lang}
                lang={o.lang}
                aria-current={active ? "true" : undefined}
                onClick={() => !active && track("language_switch", { from: locale, to: o.code })}
                className={`relative block rounded-full px-3 py-1.5 font-semibold transition-colors duration-300 ${
                  active
                    ? tone === "light"
                      ? "bg-on-night text-night"
                      : "bg-ink text-paper"
                    : tone === "light"
                      ? "text-on-night/85 hover:text-on-night"
                      : "text-ink-soft hover:text-ink"
                }`}
              >
                {o.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
