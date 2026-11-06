import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Script from "next/script";
import "../globals.css";
import { getDictionary } from "@/content";
import { cormorant, manrope, mukta, tiro } from "@/lib/fonts";
import { htmlLang, isLocale, locales } from "@/lib/i18n";
import { businessSchema, websiteSchema } from "@/lib/schema";
import { allowIndexing, site, siteUrl } from "@/lib/site";
import { whatsappUrl } from "@/lib/whatsapp";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { JsonLd } from "@/components/shared/primitives";
import { RevealObserver } from "@/components/animations/RevealObserver";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(siteUrl),
    applicationName: site.name[locale],
    authors: [{ name: site.name.en }],
    formatDetection: { telephone: true, email: false, address: false },
    robots: allowIndexing
      ? { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large" } }
      : { index: false, follow: false, googleBot: { index: false, follow: false } },
  };
}

export const viewport: Viewport = {
  themeColor: "#0f1c15",
  width: "device-width",
  initialScale: 1,
};

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

export default async function LocaleLayout({ children, params }: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);
  const fontVars = locale === "hi" ? `${tiro.variable} ${mukta.variable}` : `${cormorant.variable} ${manrope.variable}`;
  const whatsappHref = whatsappUrl("general", locale);
  const phone = site.phones[0];

  return (
    <html lang={htmlLang[locale]} className={fontVars} suppressHydrationWarning>
      <head>
        {/* Enables JS-only reveal styles before first paint; without JS everything stays visible. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only z-[100] rounded bg-ink px-4 py-3 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          {t.nav.skip}
        </a>
        <Header
          locale={locale}
          labels={{ ...t.nav }}
          whatsappHref={whatsappHref}
          phone={{ e164: phone.e164, display: phone.display }}
          opensWhatsapp={t.common.opensWhatsapp}
        />
        <main id="main" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer locale={locale} />
        <FloatingActions
          whatsappHref={whatsappHref}
          phone={{ e164: phone.e164, display: phone.display }}
          labels={{
            call: t.nav.call,
            whatsapp: t.nav.whatsapp,
            floatingWhatsapp: t.common.floatingWhatsapp,
            backToTop: t.common.backToTop,
            opensWhatsapp: t.common.opensWhatsapp,
          }}
        />
        <RevealObserver />
        <JsonLd data={[businessSchema(locale), websiteSchema(locale)]} />

        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('js',new Date());gtag('config','${GA_ID}',{anonymize_ip:true});`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
