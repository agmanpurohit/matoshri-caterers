import type { Metadata } from "next";
import "./globals.css";
import { cormorant, manrope } from "@/lib/fonts";
import { en } from "@/content/en";

export const metadata: Metadata = {
  title: en.meta.notFound.title,
  description: en.meta.notFound.description,
};

/** Fallback 404 for URLs that never reach a locale layout. */
export default function GlobalNotFound() {
  return (
    <html lang="en-IN" className={`${cormorant.variable} ${manrope.variable}`}>
      <body>
        <main className="on-night grid min-h-screen place-items-center bg-night px-5 text-center text-on-night">
          <div>
            <p className="font-display text-[clamp(6rem,20vw,12rem)] leading-none text-accent-soft/80">404</p>
            <h1 className="display-md mt-6">{en.notFound.title}</h1>
            <p className="lead mx-auto mt-4 max-w-lg">{en.notFound.text}</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="/" className="btn btn-light">
                {en.notFound.home}
              </a>
              <a href="/hi" className="btn btn-outline" lang="hi-IN">
                होम पर लौटें
              </a>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
