import { NextResponse, type NextRequest } from "next/server";

/**
 * Locale routing.
 *  - English is the default and lives at the root: /, /about, /services, /contact
 *    (internally rewritten to /en/...).
 *  - Hindi lives under /hi: /hi, /hi/about, ...
 *  - Any direct /en/... URL is permanently redirected to its un-prefixed
 *    version so English content is only ever indexed at one URL.
 *  - Visitors are never auto-redirected by browser language, so both versions
 *    stay independently crawlable.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(3) || "/";
    return NextResponse.redirect(url, 308);
  }

  if (pathname === "/hi" || pathname.startsWith("/hi/")) {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next internals, API routes, metadata files and anything with a file extension.
  matcher: ["/((?!api|_next|_vercel|sitemap.xml|robots.txt|favicon.ico|icon|apple-icon|.*\\..*).*)"],
};
