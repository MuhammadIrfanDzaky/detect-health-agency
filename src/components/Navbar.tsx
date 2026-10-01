"use client";

import { useState } from "react";
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

// z-index scale: header 40, floating WhatsApp 30.
// Layout: logo left, main nav centred, language + WhatsApp right.
// The desktop WhatsApp button is logo-only (labelled for screen readers) and
// carries `after-hero`: it appears once the hero's own button has scrolled
// out of view (see HeroCtaWatcher).
export function Navbar() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-rule bg-bg">
      <div className="mx-auto grid h-18 max-w-7xl grid-cols-[auto_1fr] items-center gap-6 px-4 sm:px-6 lg:grid-cols-[1fr_auto_1fr]">
        <a href="#top" aria-label="Detect Health Agency" className="justify-self-start">
          <Logo />
        </a>

        <nav aria-label="Main" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a key={l.key} href={l.href} className="py-2 text-base font-medium text-ink hover:text-accent-strong hover:underline hover:underline-offset-4">
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
            className="after-hero inline-flex size-11 items-center justify-center rounded-full bg-accent text-on-accent transition-colors hover:bg-accent-strong"
          >
            <WhatsappLogo aria-hidden="true" size={24} weight="fill" />
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
          className="inline-flex min-h-11 items-center justify-self-end rounded-full border-2 border-ink px-5 text-base font-semibold whitespace-nowrap text-ink lg:hidden"
        >
          {open ? t("nav.closeMenuShort") : "Menu"}
        </button>
      </div>

      {open ? (
        <div id="mobile-menu" className="border-t border-rule bg-bg px-4 pb-8 lg:hidden">
          <nav aria-label="Mobile">
            <ul className="py-2">
              {links.map((l) => (
                <li key={l.key} className="border-b border-rule">
                  <a href={l.href} onClick={() => setOpen(false)} className="block py-4 text-xl font-semibold text-ink">
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
            <a href={site.phoneHref} className="inline-flex min-h-12 items-center justify-center text-lg font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
              {t("nav.call")} {site.phoneDisplay}
            </a>
            <LocaleSwitcher className="justify-center" />
          </div>
        </div>
      ) : null}
    </header>
  );
}
