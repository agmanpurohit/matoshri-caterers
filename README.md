# Matoshri Caterers — Website

A bilingual (English / Hindi) website for Matoshri Caterers, a pure vegetarian catering and equipment-rental business in Sesali, Rajasthan, established in 2005.

Built with Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, GSAP (parallax and timeline), Motion (gallery only, lazy-loaded), React Hook Form, Zod and Lucide icons. The site is fully static: there is no backend.

## Commands

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build (all 8 pages are statically generated)
npm start          # serve the production build
npm run typecheck
```

## Routes

| Page | English | Hindi |
|---|---|---|
| Home | `/` | `/hi` |
| About | `/about` | `/hi/about` |
| Services | `/services` | `/hi/services` |
| Contact | `/contact` | `/hi/contact` |

`src/proxy.ts` internally rewrites English URLs to `/en/...` and permanently redirects any public `/en/...` URL to its unprefixed form, so each page has a single canonical URL. Visitors are never redirected based on browser language.

## Where things live

| What | File |
|---|---|
| Business facts (phones, owner, location, email, maps, logo, socials) | `src/lib/site.ts` |
| All English copy and metadata | `src/content/en.ts` |
| All Hindi copy (type-checked to match the English) | `src/content/hi.ts` |
| Photos (one registry; alt text in both languages) | `src/data/images.ts` |
| Service slugs, icons and image mapping | `src/data/services.ts` |
| Example service cities | `src/data/locations.ts` |
| Gallery items | `src/data/gallery.ts` |
| WhatsApp prefilled messages | `src/lib/whatsapp.ts` |
| Colour tokens (derived from the logo) | `:root` in `src/app/globals.css` |
| SEO metadata, hreflang, canonical | `src/lib/seo.ts` |
| JSON-LD (FoodEstablishment, WebSite, BreadcrumbList, Services) | `src/lib/schema.ts` |
| Sitemap / robots | `src/app/sitemap.ts`, `src/app/robots.ts` |
| Enquiry form | `src/components/shared/EnquiryForm.tsx` |

## Environment variables

Copy `.env.example` to `.env.local` (or set these in Vercel):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Production domain without a trailing slash. Used in canonical URLs, hreflang, the sitemap and JSON-LD. **Set this to the real domain before launch.** |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | GA4 ID. Analytics only loads when this is set. Events tracked: `whatsapp_click`, `phone_click`, `service_enquiry`, `rental_enquiry`, `language_switch`, `cta_click`. |

### How the enquiry form works

Enquiries go through WhatsApp only. After the form validates the details (in English or Hindi), it opens WhatsApp with a message to +91 80800 80400 that already contains every field. The visitor reviews it and taps send. The form never claims an enquiry was received; it only confirms that WhatsApp was opened, and offers a link in case a popup blocker stopped it. Because nothing is sent to a server, the site needs no backend, API keys or spam filtering.

## Adding missing business assets

1. **Official logo:** done. The original file is at `public/logo/matoshri-logo.svg`, byte-identical to what was supplied, and is configured in `site.logo` (`src/lib/site.ts`). It is shown unaltered in the header, footer, mobile menu and JSON-LD `logo`. On dark backgrounds it sits on a cream plate rather than being recoloured. The favicon (`src/app/icon.svg`) is the logo's circular emblem, extracted unchanged. To replace the logo, swap the file and update `width`/`height`.
2. **Real photos:** add them to `public/images/`, then edit the entry in `src/data/images.ts`: `src`, `width`, `height`, `alt` in both languages, and `placeholder: false`. No component changes are needed. Once real photos replace the stock ones, remove the "representative images" notices (`common.stockNotice`).
3. **Google Maps:** set `site.googleMapsUrl` (the share link) and `site.googleMapsEmbedSrc` (the `https://www.google.com/maps/embed?pb=...` src). The Contact page map turns on automatically, and `hasMap` is added to the JSON-LD.
4. **Business email (optional):** set `site.email` to show it as a contact link in the footer and on the Contact page. Enquiries keep going through WhatsApp.
5. **Social profiles:** add verified URLs to `site.social`. They are emitted as `sameAs` in the JSON-LD.
6. **Owner photo:** the About page currently shows a labelled monogram placeholder.

## Brand palette

Derived from the logo's three colours. The logo itself is never recoloured, and the UI uses tuned shades so text meets WCAG AA contrast:

| Token | Value | Role |
|---|---|---|
| `--brand-green` | `#008000` (exact logo green) | brand moments, icons, FAQ/active states (4.8:1 on cream) |
| `--brand-saffron` / `--brand-red` | `#f15a24` / `#ed2b2f` (exact) | decorative only |
| `--accent` | `#b8431a` | deepened saffron for eyebrows, links and primary buttons (5.0:1) |
| `--accent-soft` | `#f47c45` | saffron on dark sections (6.5:1) |
| `--night` | `#0f1c15` | deep green-black dark sections |
| `--whatsapp` | `#0a7a32` | WhatsApp buttons (white text 5.5:1) |

## Content accuracy notes

- Only verified facts are used. There are no prices, counts, reviews, awards, hours, street address, coordinates or branches anywhere, including the JSON-LD.
- The temporary photos are free-licence Unsplash images, each manually checked to show only vegetarian food. They are labelled on the site as representative.
- The cities on the home page are service-area examples, not offices.
- `FAQPage` schema is deliberately left out: Google currently limits FAQ rich results to government and health sites.
- **Please confirm the Hindi spelling of Sesali (सेसली)** and of the owner's name (उगम सिंह राजपुरोहित) in `src/lib/site.ts`.

## Deployment (Vercel)

Import the repository, set the environment variables above, and deploy. No other configuration is required.
