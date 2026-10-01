import { useTranslations } from "next-intl";
import { TestimonialList, type Story } from "../TestimonialList";
import { Section } from "../ui/Heading";

// PLACEHOLDER: mock testimonials (invented names). Replace with real patient
// quotes, with their consent, before launch.
// Deliberately low-key: smaller heading than other sections, one compact row.
export function Testimonial() {
  const t = useTranslations();
  const stories = t.raw("testimonial.items") as Story[];

  return (
    <Section labelledBy="testimonial-label" tone="tint" className="!py-14 md:!py-16">
      <TestimonialList
        stories={stories}
        labels={{
          title: t("testimonial.label"),
          badge: t("common.placeholderBadge"),
          previous: t("testimonial.previous"),
          next: t("testimonial.next"),
          region: t("testimonial.region"),
        }}
      />
    </Section>
  );
}
