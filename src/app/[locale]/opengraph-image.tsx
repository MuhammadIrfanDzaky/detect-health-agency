import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";

// Share card for WhatsApp, Facebook and X: white, DHA logo, the hero headline
// in the page's language, and a strip in the logo blue. Rendered at build time.
export const alt = "Detect Health Agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "hero" });
  const logo = await readFile(join(process.cwd(), "public/brand/dha-logo.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#ffffff",
          color: "#0b1b33",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", padding: "72px 80px 0" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={logoSrc} alt="" width={362} height={96} />
          <div style={{ marginTop: 56, fontSize: 64, fontWeight: 600, lineHeight: 1.15, maxWidth: 980 }}>{t("title")}</div>
          <div style={{ marginTop: 24, fontSize: 32, color: "#33415a" }}>{t("eyebrow")}</div>
        </div>
        <div style={{ height: 28, background: "#1e65b9" }} />
      </div>
    ),
    size,
  );
}
