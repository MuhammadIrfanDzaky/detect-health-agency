import type { ComponentProps, ReactNode } from "react";

type ExternalProps = {
  external?: boolean;
  externalLabel?: string;
};

type ButtonProps = ComponentProps<"a"> &
  ExternalProps & {
    icon?: ReactNode;
    // "light" is for use on the blue brand background.
    tone?: "accent" | "light";
  };

const tones = {
  accent: "bg-accent text-on-accent hover:bg-accent-strong",
  light: "bg-bg text-accent-strong hover:bg-tint",
};

// Primary action: large (56px+) full pill.
export function ButtonLink({
  icon,
  external,
  externalLabel,
  tone = "accent",
  className = "",
  children,
  ...rest
}: ButtonProps) {
  return (
    <a
      {...rest}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-lg font-semibold whitespace-nowrap transition-[background-color,transform] duration-200 ease-out active:scale-[0.98] ${tones[tone]} ${className}`}
    >
      {icon}
      {children}
      {external && externalLabel ? <span className="sr-only"> {externalLabel}</span> : null}
    </a>
  );
}

// Secondary action: an underlined text link, never a second button.
export function TextLink({
  external,
  externalLabel,
  className = "",
  children,
  ...rest
}: ComponentProps<"a"> & ExternalProps) {
  return (
    <a
      {...rest}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`inline-flex min-h-12 items-center text-lg font-semibold text-accent-strong underline decoration-2 underline-offset-[6px] hover:text-ink ${className}`}
    >
      {children}
      {external && externalLabel ? <span className="sr-only"> {externalLabel}</span> : null}
    </a>
  );
}
