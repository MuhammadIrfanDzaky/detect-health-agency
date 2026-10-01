import Image from "next/image";
import { useTranslations } from "next-intl";
import { photos, photoUrl } from "@/content/photos";
import { Section, SectionHeading } from "../ui/Heading";

type Item = { title: string; body: string };
type Group = { title: string; items: Item[] };

// Only services covered by DHA's active permits: never add medevac or lab services.

// Heading, then two grouped lists beside a tall photo. < md: photo, then groups.
export function Care() {
  const t = useTranslations("care");
  const groups = t.raw("groups") as Group[];

  return (
    <Section id="layanan" labelledBy="layanan-title" tone="white">
      <SectionHeading id="layanan-title" title={t("title")} body={t("body")} />

      <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-12 md:gap-12">
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-tint md:order-last md:col-span-5 md:aspect-auto md:min-h-[30rem]">
          <Image src={photoUrl(photos.pickup)} alt={t("photoAlt")} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </div>

        <div className="grid gap-12 sm:grid-cols-2 md:col-span-7">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="border-b-2 border-brand pb-3 text-xl font-semibold text-ink">{group.title}</h3>
              <ul className="mt-6 space-y-7">
                {group.items.map((item) => (
                  <li key={item.title}>
                    <p className="text-xl font-semibold text-ink">{item.title}</p>
                    <p className="mt-1 text-lg text-ink-soft">{item.body}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
