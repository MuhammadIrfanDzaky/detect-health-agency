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
      className={`inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-lg font-semibold whitespace-nowrap transition-[background-color,transform] duration-200 ease-out active:scale-[0.98] motion-reduce:transition-none motion-reduce:active:scale-100 ${tones[tone]} ${className}`}
    >
      {icon}
      {children}
      {external && externalLabel ? <span className="sr-only"> {externalLabel}</span> : null}
    </a>
  );
}
