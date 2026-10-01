import { useTranslations } from "next-intl";
import { Section, SectionHeading } from "../ui/Heading";

type Step = { title: string; body: string };

// Numbered steps on purpose: older readers follow an explicit sequence more
// easily (accessibility overrides the taste-skill "no step labels" default).
// Desktop (lg): one horizontal row of five steps joined by a line, so the
// whole flow fits on a single screen. Below lg: a compact vertical list.
export function Itinerary() {
  const t = useTranslations("itinerary");
  const steps = t.raw("steps") as Step[];

  return (
    <Section id="alur" labelledBy="alur-title" tone="white" className="!py-14 md:!py-20">
      <SectionHeading id="alur-title" title={t("title")} />

      <ol className="mt-8 grid gap-6 md:mt-12 lg:grid-cols-5">
        {steps.map((step, i) => (
          <li key={step.title} className="relative flex gap-5 lg:flex-col lg:gap-0">
            {i < steps.length - 1 ? (
              <>
                {/* Connector: vertical below lg, horizontal from lg */}
                <span aria-hidden="true" className="absolute top-14 -bottom-6 left-7 w-0.5 -translate-x-1/2 bg-rule lg:hidden" />
                <span aria-hidden="true" className="absolute top-7 right-[-1.5rem] left-14 hidden h-0.5 -translate-y-1/2 bg-rule lg:block" />
              </>
            ) : null}
            <span className="relative flex size-14 shrink-0 items-center justify-center rounded-full bg-accent text-2xl font-semibold text-on-accent">
              <span className="sr-only">{t("stepLabel")} </span>
              {i + 1}
            </span>
            <div className="pt-2.5 lg:pt-5 lg:pr-2">
              <h3 className="text-xl font-semibold text-ink">{step.title}</h3>
              <p className="mt-2 text-lg text-ink-soft">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
