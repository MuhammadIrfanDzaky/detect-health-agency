"use client";

import { useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import { WhatsappLogo } from "@phosphor-icons/react";
import type { Locale } from "@/i18n/routing";
import { site, whatsappUrl } from "@/content/site";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { ButtonLink } from "./ui/Button";

const links = [
  { href: "#layanan", key: "services" },
  { href: "#rs-mitra", key: "hospitals" },
  { href: "#alur", key: "itinerary" },
  { href: "#faq", key: "faq" },
] as const;

//// z-index scale: header 40, floating WhatsApp 30.
// Layout: logo left, main nav centred, language + WhatsApp right.
// The desktop WhatsApp button is logo-only (labelled for screen readers) and
// carries `after-hero`: it appears once the hero's own button has scrolled
// out of view (see HeroCtaWatcher).
// The mobile menu is a native <details>, so it opens (and the language switch
// inside it is reachable) even if JavaScript fails. JS only closes it after a
// link is chosen or on Escape.
export function Navbar() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const menuRef = useRef<HTMLDetailsElement>(null);
  const closeMenu = () => {
    if (menuRef.current) menuRef.current.open = false;
  };

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[auto_1fr] items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr]">
        <a href="#top" aria-label="Detect Health Agency" className="inline-flex min-h-14 items-center justify-self-start">
          <Logo />
        </a>

        <nav aria-label={t("nav.mainNavigation")} className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="inline-flex min-h-14 items-center text-base font-medium text-ink underline decoration-rule decoration-2 underline-offset-4 hover:text-accent-strong hover:decoration-accent"
            >
              {t(`nav.${l.key}`)}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-5 justify-self-end lg:flex">
          <LocaleSwitcher />
          <a
            href={whatsappUrl(locale)}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${t("floating.label")} ${t("common.opensNewTab")}`}
            title={t("common.ctaWhatsapp")}
            className="after-hero inline-flex size-14 items-center justify-center rounded-full bg-accent text-on-accent transition-colors hover:bg-accent-strong motion-reduce:transition-none"
          >
            <WhatsappLogo aria-hidden="true" size={28} weight="fill" />
          </a>
        </div>

        <details
          ref={menuRef}
          onKeyDown={(e) => {
            if (e.key === "Escape" && menuRef.current?.open) {
              closeMenu();
              menuRef.current.querySelector("summary")?.focus();
            }
          }}
          className="group justify-self-end lg:hidden"
        >
          <summary className="inline-flex min-h-14 cursor-pointer list-none items-center rounded-full border-2 border-ink px-6 text-lg font-semibold whitespace-nowrap text-ink [&::-webkit-details-marker]:hidden">
            <span className="group-open:hidden">Menu</span>
            <span className="hidden group-open:inline">{t("nav.closeMenuShort")}</span>
          </summary>

          {/* Positioned against the sticky header, so it spans the full width below the bar. */}
          <div className="absolute inset-x-0 top-full border-t border-b border-rule bg-bg px-4 pb-8 shadow-soft sm:px-6">
            <nav aria-label={t("nav.mobileNavigation")}>
              <ul className="py-2">
                {links.map((l) => (
                  <li key={l.key} className="border-b border-rule">
                    <a href={l.href} onClick={closeMenu} className="flex min-h-16 items-center text-xl font-semibold text-ink">
                      {t(`nav.${l.key}`)}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 flex flex-col gap-4">
              <ButtonLink
                href={whatsappUrl(locale)}
                external
                externalLabel={t("common.opensNewTab")}
                icon={<WhatsappLogo aria-hidden="true" size={24} weight="fill" />}
                className="w-full"
              >
                {t("common.ctaWhatsapp")}
              </ButtonLink>
              <a href={site.phoneHref} className="inline-flex min-h-14 items-center justify-center text-lg font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
                {t("nav.call")} {site.phoneDisplay}
              </a>
              <LocaleSwitcher className="justify-center" />
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
