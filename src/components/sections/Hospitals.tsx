import { useTranslations } from "next-intl";
import { hospitals } from "@/content/hospitals";
import { photos, photoUrl } from "@/content/photos";
import { HospitalDirectory, type HospitalItem } from "../HospitalDirectory";
import { Section, SectionHeading } from "../ui/Heading";

// Server side: resolve every string and image, then hand plain data to the
// interactive grid + detail dialog.
export function Hospitals() {
  const t = useTranslations("hospitals");

  const items: HospitalItem[] = hospitals.map((h) => {
    const hasDetails = t.has(`details.${h.id}.about`);
    return {
      id: h.id,
      name: h.name,
      city: t(`cities.${h.city}`),
      logo: h.logo,
      specialty: t(`specialties.${h.id}`),
      photo: h.photo ?? photoUrl(photos[h.city]),
      photoAlt: h.photo ? t("buildingAlt", { name: h.name }) : t(`photoAlt.${h.city}`),
      about: hasDetails ? t(`details.${h.id}.about`) : null,
      points: hasDetails ? (t.raw(`details.${h.id}.points`) as string[]) : [],
    };
  });

  return (
    <Section id="rs-mitra" labelledBy="rs-mitra-title" tone="tint">
      <SectionHeading id="rs-mitra-title" title={t("title")} body={t("body")} />
      <HospitalDirectory
        items={items}
        labels={{
          viewDetails: t("viewDetails"),
          close: t("close"),
          advantages: t("advantages"),
          detailsPending: t("detailsPending"),
        }}
      />
    </Section>
  );
}
