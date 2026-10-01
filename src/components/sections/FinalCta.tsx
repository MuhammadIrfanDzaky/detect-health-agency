import { useLocale, useTranslations } from "next-intl";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/routing";
import { site, whatsappUrl } from "@/content/site";
import { ButtonLink } from "../ui/Button";

// Full-width closing band on the brand blue: one clear action plus the phone number.
export function FinalCta() {
  const t = useTranslations();
  const locale = useLocale() as Locale;

  return (
    <section aria-labelledby="cta-title" className="bg-accent px-4 py-20 text-center text-on-accent sm:px-6 md:py-24">
      <div className="mx-auto max-w-4xl">
        <h2 id="cta-title" className="text-3xl leading-[1.15] font-semibold tracking-tight md:text-5xl">
          {t("cta.title")}
        </h2>
        <p className="mt-4 text-xl">{t("cta.body")}</p>
        <div className="mt-9 flex flex-col items-center justify-center gap-5 sm:flex-row sm:gap-8">
          <ButtonLink
            href={whatsappUrl(locale)}
            external
            externalLabel={t("common.opensNewTab")}
            tone="light"
            icon={<WhatsappLogo aria-hidden="true" size={26} weight="fill" />}
            className="min-h-16 px-8 text-xl"
          >
            {t("common.ctaWhatsapp")}
          </ButtonLink>
          <a href={site.phoneHref} className="inline-flex min-h-14 items-center text-xl font-semibold underline decoration-2 underline-offset-4">
            {t("common.orCall")} {site.phoneDisplay}
          </a>
        </div>
        <a
          href={site.consultationFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex min-h-14 items-center text-lg underline decoration-2 underline-offset-4"
        >
          {t("common.ctaForm")}
          <span className="sr-only"> {t("common.opensNewTab")}</span>
        </a>
      </div>
    </section>
  );
}
