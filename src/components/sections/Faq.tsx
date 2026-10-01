import { useTranslations } from "next-intl";
import { SampleBadge, Section, SectionHeading } from "../ui/Heading";

type Item = { q: string; a: string };

// PLACEHOLDER: mock FAQ. Every answer is visible (no accordion to open).
export function Faq() {
  const t = useTranslations();
  const items = t.raw("faq.items") as Item[];

  return (
    <Section id="faq" labelledBy="faq-title" tone="white">
      <SampleBadge label={t("common.placeholderBadge")} />
      <SectionHeading id="faq-title" title={t("faq.title")} className="mt-5" />

      <dl className="mt-12 grid gap-5 md:mt-14 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.q} className="rounded-2xl bg-tint p-6 sm:p-8">
            <dt className="text-xl font-semibold text-ink">{item.q}</dt>
            <dd className="mt-3 text-lg leading-relaxed text-ink-soft">{item.a}</dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
