import { useLocale, useTranslations } from "next-intl";
import { FacebookLogo, InstagramLogo } from "@phosphor-icons/react/dist/ssr";
import type { Locale } from "@/i18n/routing";
import { site, whatsappUrl } from "@/content/site";
import { Logo } from "./Logo";

// Contact details as label + value (no decorative icons). Social links use
// the platforms' own logos, which people recognise faster than the words.
export function Footer() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const year = new Date().getFullYear();
  const newTab = t("common.opensNewTab");
  const heading = "mb-4 text-xl font-semibold text-ink";
  const label = "text-base text-ink-soft";
  const value = "text-lg font-medium text-ink underline-offset-4 hover:underline";
  const social =
    "inline-flex size-12 items-center justify-center rounded-full bg-bg text-accent-strong transition-colors hover:bg-accent hover:text-on-accent";

  return (
    <footer className="bg-tint px-4 pt-16 pb-28 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <Logo size="footer" />
          <p className="mt-4 max-w-xs text-lg text-ink-soft">{t("footer.tagline")}</p>
        </div>

        <div className="md:col-span-4">
          <h2 className={heading}>{t("footer.contact")}</h2>
          <dl className="space-y-4">
            <div>
              <dt className={label}>{t("footer.phoneNote")}</dt>
              <dd>
                <a href={whatsappUrl(locale)} target="_blank" rel="noopener noreferrer" className={value}>
                  {site.phoneDisplay}
                  <span className="sr-only"> {newTab}</span>
                </a>
              </dd>
            </div>
            <div>
              <dt className={label}>{t("footer.email")}</dt>
              <dd>
                <a href={`mailto:${site.email}`} className={`break-all ${value}`}>{site.email}</a>
              </dd>
            </div>
            <div>
              <dt className={label}>{t("footer.address")}</dt>
              <dd className="text-lg font-medium text-ink">{site.city}</dd>
            </div>
          </dl>
        </div>

        <div className="md:col-span-4">
          {/* PLACEHOLDER: opening hours and response time */}
          <h2 className={heading}>{t("footer.hours")}</h2>
          <p className="text-lg text-ink">{t("footer.hoursValue")}</p>
          <p className="mt-1 text-lg text-ink-soft">{t("footer.responseTime")}</p>

          <h2 className={`mt-10 ${heading}`}>{t("footer.follow")}</h2>
          <ul className="flex gap-3">
            <li>
              <a href={site.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${newTab}`} title="Instagram" className={social}>
                <InstagramLogo aria-hidden="true" size={26} />
              </a>
            </li>
            <li>
              <a href={site.facebookUrl} target="_blank" rel="noopener noreferrer" aria-label={`Facebook ${newTab}`} title="Facebook" className={social}>
                <FacebookLogo aria-hidden="true" size={26} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <p className="mx-auto mt-14 max-w-7xl border-t border-rule pt-6 text-base text-ink-soft">
        © {year} {site.legalName}. {t("footer.rights")}
      </p>
    </footer>
  );
}
