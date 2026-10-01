import { useLocale, useTranslations } from "next-intl";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/routing";
import { whatsappUrl } from "@/content/site";

// Mobile only (desktop has the navbar button). Labelled pill, easier to
// recognise and tap than an icon-only circle. Appears after the hero CTA.
export function FloatingWhatsApp() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  return (
    <a
      href={whatsappUrl(locale)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${t("floating.label")} ${t("common.opensNewTab")}`}
      className="after-hero fixed right-4 bottom-4 z-30 inline-flex lg:!hidden min-h-14 items-center gap-2.5 rounded-full bg-accent px-5 text-lg font-semibold text-on-accent shadow-soft transition-[background-color,transform] duration-200 hover:bg-accent-strong active:scale-95 sm:right-6 sm:bottom-6"
    >
      <WhatsappLogo aria-hidden="true" size={26} weight="fill" />
      {t("floating.short")}
    </a>
  );
}
