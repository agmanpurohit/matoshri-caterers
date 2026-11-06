import { ExternalLink, MapPin } from "lucide-react";
import { site } from "@/lib/site";

/**
 * Reusable map block.
 * - Shows a Google Maps embed ONLY when a verified embed URL is set in
 *   src/lib/site.ts (`googleMapsEmbedSrc`).
 * - Until then it shows the verified location text — never a guessed pin.
 */
export function MapEmbed({
  title,
  locationText,
  pendingText,
  openLabel,
}: {
  title: string;
  locationText: string;
  pendingText: string;
  openLabel: string;
}) {
  if (site.googleMapsEmbedSrc) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden border border-line">
        <iframe
          src={site.googleMapsEmbedSrc}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="absolute inset-0 h-full w-full border-0"
          allowFullScreen
        />
        {site.googleMapsUrl && (
          <a
            href={site.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-light absolute right-4 bottom-4 !min-h-0 !py-2 text-sm shadow-lg"
          >
            {openLabel}
            <ExternalLink className="size-4" aria-hidden="true" />
          </a>
        )}
      </div>
    );
  }

  return (
    <div className="relative grid aspect-[4/3] place-items-center overflow-hidden border border-line bg-paper-2">
      <div aria-hidden="true" className="jaali absolute inset-0 text-ink/[0.05]" />
      <div className="relative px-6 text-center">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-accent text-white shadow-lg">
          <MapPin className="size-7" aria-hidden="true" />
        </span>
        <p className="mt-6 font-display text-3xl">{locationText}</p>
        <p className="mt-3 text-sm text-muted">{pendingText}</p>
      </div>
    </div>
  );
}
