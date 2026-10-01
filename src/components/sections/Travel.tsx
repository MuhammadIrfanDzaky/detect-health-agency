import Image from "next/image";
import { useTranslations } from "next-intl";
import { photos, photoUrl } from "@/content/photos";

// Full-width photo with a white panel for the copy (no dark scrim).
// < md: photo above, panel below.
export function Travel() {
  const t = useTranslations("travel");

  return (
    <section aria-labelledby="travel-title" className="bg-bg px-4 py-20 sm:px-6 md:py-24">
      <div className="relative mx-auto max-w-7xl md:flex md:min-h-[32rem] md:items-end">
        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-tint md:absolute md:inset-0 md:aspect-auto">
          <Image src={photoUrl(photos.travel)} alt={t("photoAlt")} fill sizes="(min-width: 1280px) 1280px, 100vw" className="object-cover" />
        </div>
        <div className="relative -mt-10 mx-4 rounded-2xl bg-bg p-6 shadow-soft sm:p-8 md:m-10 md:max-w-xl md:p-10">
          <span aria-hidden="true" className="block h-1 w-12 rounded-full bg-brand" />
          <h2 id="travel-title" className="mt-5 text-3xl leading-[1.15] font-semibold tracking-tight text-ink md:text-4xl">
            {t("title")}
          </h2>
          <p className="mt-4 text-lg text-ink-soft md:text-xl">{t("body")}</p>
        </div>
      </div>
    </section>
  );
}
