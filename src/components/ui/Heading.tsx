import type { ReactNode } from "react";

// Sections alternate white and light blue so each block reads as its own unit.
export function Section({
  id,
  labelledBy,
  tone,
  className = "",
  children,
}: {
  id?: string;
  labelledBy: string;
  tone: "white" | "tint";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={`px-4 py-20 sm:px-6 md:py-24 ${tone === "tint" ? "bg-tint" : "bg-bg"} ${className}`}
    >
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

// Section heading: short blue bar, large title, one supporting sentence.
export function SectionHeading({
  id,
  title,
  body,
  className = "",
}: {
  id: string;
  title: string;
  body?: string;
  className?: string;
}) {
  return (
    <div className={`max-w-[60ch] ${className}`}>
      <span aria-hidden="true" className="block h-1 w-12 rounded-full bg-brand" />
      <h2 id={id} className="mt-5 text-3xl leading-[1.15] font-semibold tracking-tight text-ink md:text-5xl">
        {title}
      </h2>
      {body ? <p className="mt-5 text-lg leading-relaxed text-ink-soft md:text-xl">{body}</p> : null}
    </div>
  );
}

// Marks mock content that still needs real data from DHA.
export function SampleBadge({ label }: { label: string }) {
  return (
    <span className="inline-flex rounded-full border border-ink-soft px-3 py-0.5 text-base font-medium text-ink-soft">
      {label}
    </span>
  );
}
