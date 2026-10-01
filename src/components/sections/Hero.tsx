import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/routing";
import { site, whatsappUrl } from "@/content/site";
import { photos, photoUrl } from "@/content/photos";
import { ButtonLink } from "../ui/Button";

type Fact = { title: string; body: string };

// Hero and the three key facts form one screen: on desktop the block fills
// the viewport below the navbar and the blue facts bar sits at its bottom.
// Copy is sized so ID and EN headlines both stay on two lines and the whole
// block fits viewports from ~650px tall. Photo fills the right ~60% and
// fades into white. Mobile: copy and the WhatsApp button first (the answer
// comes before the picture), then a shorter photo, then the facts.
export function Hero() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const facts = t.raw("facts.items") as Fact[];

  return (
    <section id="top" aria-labelledby="hero-title" className="flex flex-col bg-bg md:min-h-[calc(100dvh-4.5rem-1px)]">
      <div className="relative flex flex-1 flex-col overflow-hidden md:justify-center">
        <div className="relative order-last aspect-[16/9] w-full md:absolute md:inset-y-0 md:right-0 md:order-none md:aspect-auto md:w-[58%]">
          <Image
            src={photoUrl(photos.hero)}
            alt={t("hero.photoAlt")}
            fill
            preload
            sizes="(min-width: 768px) 58vw, 100vw"
            className="object-cover object-[70%_center]"
          />
          <div
            aria-hidden="true"
            className="absolute inset-0 hidden bg-gradient-to-r from-bg via-bg/70 via-25% to-transparent to-60% md:block"
          />
        </div>

        <div className="relative mx-auto w-full max-w-7xl px-4 pt-8 pb-10 sm:px-6 md:py-8">
          <div className="md:max-w-[42rem]">
            <p className="text-lg font-semibold text-accent-strong">{t("hero.eyebrow")}</p>
            <h1 id="hero-title" className="mt-3 text-4xl leading-[1.12] font-semibold tracking-tight text-ink md:text-[2.75rem] xl:text-5xl">
              {t("hero.title")}
            </h1>
            <p className="mt-5 max-w-[36rem] text-xl leading-relaxed text-ink-soft">{t("hero.subtitle")}</p>

            <div className="mt-7 flex flex-col items-start gap-1">
              <ButtonLink
                id="hero-cta"
                href={whatsappUrl(locale)}
                external
                externalLabel={t("common.opensNewTab")}
                icon={<WhatsappLogo aria-hidden="true" size={26} weight="fill" />}
                className="min-h-16 px-8 text-xl"
              >
                {t("common.ctaWhatsapp")}
              </ButtonLink>
              <p className="text-lg text-ink-soft">
                {t("common.orCall")}{" "}
                <a href={site.phoneHref} className="inline-flex min-h-14 items-center font-semibold text-ink underline decoration-brand decoration-2 underline-offset-4">
                  {site.phoneDisplay}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* The five-second answer to "what is DHA". */}
      <div className="bg-accent px-4 py-7 text-on-accent sm:px-6 md:py-6">
        <h2 className="sr-only">{t("facts.label")}</h2>
        <ul className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3 md:gap-0 md:divide-x md:divide-white/30">
          {facts.map((fact) => (
            <li key={fact.title} className="md:px-8 md:first:pl-0 md:last:pr-0">
              <p className="text-xl font-semibold">{fact.title}</p>
              <p className="mt-0.5 text-lg">{fact.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
