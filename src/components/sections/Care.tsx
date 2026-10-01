import Image from "next/image";
import { useTranslations } from "next-intl";
import { photos, photoUrl } from "@/content/photos";
import { Section, SectionHeading } from "../ui/Heading";

type Item = { title: string; body: string };
type Group = { title: string; items: Item[] };

// Only services covered by DHA's active permits: never add medevac or lab services.

// md+: heading and both groups on the left, the photo on the right stretched
// to the same height, so neither side leaves an empty block. Items sit in two
// columns inside each group (4 items = 2 rows, 2 items = 1 row), which keeps
// the short group from trailing whitespace. < md: heading, photo, groups.
export function Care() {
  const t = useTranslations("care");
  const groups = t.raw("groups") as Group[];

  return (
    <Section id="layanan" labelledBy="layanan-title" tone="white" className="!py-14 md:!py-20">
      <div className="grid gap-10 md:grid-cols-12 md:gap-x-12 md:gap-y-10">
        <SectionHeading id="layanan-title" title={t("title")} body={t("body")} className="md:col-span-7" />

        <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-tint md:col-span-5 md:col-start-8 md:row-span-2 md:row-start-1 md:aspect-auto md:min-h-[24rem]">
          <Image src={photoUrl(photos.pickup)} alt={t("photoAlt")} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
        </div>

        <div className="space-y-10 md:col-span-7">
          {groups.map((group) => (
            <div key={group.title}>
              <h3 className="border-b-2 border-brand pb-3 text-xl font-semibold text-ink">{group.title}</h3>
              <ul className="mt-5 grid gap-x-8 gap-y-5 sm:grid-cols-2">
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
