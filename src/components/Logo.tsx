import Image from "next/image";

// Official DHA logo (from Canva), white made transparent. The lockups with the
// tagline are not used: at web sizes the tagline renders around 9px, which is
// unreadable for this audience, so the tagline is set as real text instead.
export function Logo({ size = "header" }: { size?: "header" | "footer" }) {
  return (
    <Image
      src="/brand/dha-logo.png"
      alt="Detect Health Agency"
      width={429}
      height={114}
      loading={size === "header" ? "eager" : "lazy"}
      className={size === "footer" ? "h-14 w-auto" : "h-11 w-auto"}
    />
  );
}
