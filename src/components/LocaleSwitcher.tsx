"use client";

import { Fragment } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const names: Record<string, string> = { id: "Bahasa Indonesia", en: "English" };

// Compact text switch. scroll={false} keeps the reader at the same spot
// when the language changes.
export function LocaleSwitcher({ className = "" }: { className?: string }) {
  const t = useTranslations("nav");
  const locale = useLocale();
  const pathname = usePathname();

  return (
    <nav aria-label={t("language")} className={`flex items-center text-base ${className}`}>
      {routing.locales.map((l, i) => {
        const active = l === locale;
        return (
          <Fragment key={l}>
            {i > 0 ? <span aria-hidden="true" className="px-1 text-rule">|</span> : null}
            <Link
              href={pathname}
              locale={l}
              hrefLang={l}
              scroll={false}
              aria-current={active ? "true" : undefined}
              aria-label={names[l]}
              className={`inline-flex min-h-14 min-w-14 items-center justify-center font-semibold uppercase underline decoration-2 underline-offset-[6px] ${active ? "text-accent-strong decoration-accent-strong" : "text-ink-soft decoration-rule hover:text-ink hover:decoration-accent"}`}
            >
              {l}
            </Link>
          </Fragment>
        );
      })}
    </nav>
  );
}
