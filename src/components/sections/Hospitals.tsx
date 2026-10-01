import Image from "next/image";
import { useTranslations } from "next-intl";
import { cities, hospitals } from "@/content/hospitals";
import { photos, photoUrl } from "@/content/photos";
import { Section, SectionHeading } from "../ui/Heading";

// One card per city: small photo strip as a place cue, then each partner
// hospital as logo + name + one-line specialty. Longer details stay behind
// a "More details" toggle so the list remains scannable.
// Three columns from lg, single column below.
export function Hospitals() {
  const t = useTranslations("hospitals");

  return (
    <Section id="rs-mitra" labelledBy="rs-mitra-title" tone="tint">
      <SectionHeading id="rs-mitra-title" title={t("title")} body={t("body")} />

      <div className="mt-12 grid items-start gap-6 md:mt-14 lg:grid-cols-3">
        {cities.map(({ key }) => {
          const list = hospitals.filter((h) => h.city === key);
          return (
            <article key={key} className="overflow-hidden rounded-2xl bg-bg shadow-soft">
              <div className="relative h-32 bg-tint-strong">
                <Image src={photoUrl(photos[key])} alt={t(`photoAlt.${key}`)} fill sizes="(min-width: 1024px) 30vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-2xl font-semibold text-ink">{t(`cities.${key}`)}</h3>
                  <span className="text-base font-medium text-ink-soft">{t("count", { count: list.length })}</span>
                </div>

                <ul className="mt-5 divide-y divide-rule border-t border-rule">
                  {list.map((h) => (
                    <li key={h.id} className="py-5">
                      {h.logo ? (
                        <Image src={h.logo} alt="" width={240} height={64} className="h-10 w-auto max-w-[12rem] object-contain object-left" />
                      ) : null}
                      <p className="mt-3 text-lg font-semibold text-ink">{h.name}</p>
                      <p className="text-lg text-ink-soft">{t(`specialties.${h.id}`)}</p>

                      {t.has(`details.${h.id}.about`) ? (
                        <details className="mt-3">
                          <summary className="inline-flex min-h-11 cursor-pointer list-none items-center text-lg font-semibold text-accent-strong underline decoration-2 underline-offset-4 [&::-webkit-details-marker]:hidden">
                            {t("more")}
                          </summary>
                          <div className="mt-2 rounded-2xl bg-tint p-4">
                            <p className="text-lg text-ink">{t(`details.${h.id}.about`)}</p>
                            <ul className="mt-3 list-disc space-y-2 pl-6 text-lg text-ink marker:text-brand">
                              {(t.raw(`details.${h.id}.points`) as string[]).map((point) => (
                                <li key={point}>{point}</li>
                              ))}
                            </ul>
                          </div>
                        </details>
                      ) : null}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
