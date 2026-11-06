import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumbs({ items, label }: { items: { name: string; href?: string }[]; label: string }) {
  return (
    <nav aria-label={label}>
      <ol className="flex flex-wrap items-center gap-2 text-sm text-on-night-muted">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-2">
            {i > 0 && <ChevronRight className="size-3.5 opacity-60" aria-hidden="true" />}
            {it.href ? (
              <Link href={it.href} className="link-underline hover:text-on-night">
                {it.name}
              </Link>
            ) : (
              <span aria-current="page" className="text-on-night">
                {it.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
