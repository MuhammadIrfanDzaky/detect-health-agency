import { useTranslations } from "next-intl";
import { SampleBadge, Section } from "../ui/Heading";

// PLACEHOLDER: mock testimonial (invented name). Replace with a real patient
// quote, with their consent, before launch.
export function Testimonial() {
  const t = useTranslations();

  return (
    <Section labelledBy="testimonial-label" tone="tint">
      <figure className="max-w-4xl">
        <div className="flex flex-wrap items-center gap-4">
          <span aria-hidden="true" className="block h-1 w-12 rounded-full bg-brand" />
          <p id="testimonial-label" className="text-xl font-semibold text-accent-strong">
            {t("testimonial.label")}
          </p>
          <SampleBadge label={t("common.placeholderBadge")} />
        </div>
        <blockquote className="mt-6 text-2xl leading-snug font-medium text-ink sm:text-3xl md:text-4xl">
          “{t("testimonial.quote")}”
        </blockquote>
        <figcaption className="mt-6 text-lg">
          <span className="block font-semibold text-ink">{t("testimonial.name")}</span>
          <span className="text-ink-soft">{t("testimonial.role")}</span>
        </figcaption>
      </figure>
    </Section>
  );
}
