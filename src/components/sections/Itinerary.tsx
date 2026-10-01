import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "../ui/Heading";

type Step = { title: string; body: string };

// Numbered steps on purpose: older readers follow an explicit sequence more
// easily (accessibility overrides the taste-skill "no step labels" default).
export function Itinerary() {
  const t = useTranslations("itinerary");
  const steps = t.raw("steps") as Step[];

  return (
    <Section id="alur" labelledBy="alur-title" tone="white">
      <SectionHeading id="alur-title" title={t("title")} />

      <ol className="mt-12 max-w-4xl md:mt-14">
        {steps.map((step, i) => (
          <li key={step.title} className="relative flex gap-6 pb-10 last:pb-0">
            {i < steps.length - 1 ? (
              <span aria-hidden="true" className="absolute top-14 bottom-0 left-7 w-0.5 -translate-x-1/2 bg-rule" />
            ) : null}
            <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-2xl font-semibold text-on-accent">
              <span className="sr-only">{t("stepLabel")} </span>
              {i + 1}
            </span>
            <div className="pt-2.5">
              <h3 className="text-2xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 max-w-[55ch] text-lg text-ink-soft">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
