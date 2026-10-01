import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "../ui/Heading";

type Group = { title: string; items: string[] };

// Two checklists side by side on white panels (stacked < md).
export function Checklist() {
  const t = useTranslations("checklist");
  const groups = t.raw("groups") as Group[];

  return (
    <Section id="checklist" labelledBy="checklist-title" tone="tint">
      <SectionHeading id="checklist-title" title={t("title")} />

      <div className="mt-12 grid gap-6 md:mt-14 md:grid-cols-2">
        {groups.map((group) => (
          <div key={group.title} className="rounded-2xl bg-bg p-6 shadow-soft sm:p-8">
            <h3 className="text-2xl font-semibold text-ink">{group.title}</h3>
            <ul className="mt-5 list-disc space-y-3 pl-6 text-lg text-ink marker:text-brand md:text-xl">
              {group.items.map((item) => (
                <li key={item} className="pl-1">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="mt-10 text-lg font-medium text-ink md:text-xl">{t("note")}</p>
    </Section>
  );
}
