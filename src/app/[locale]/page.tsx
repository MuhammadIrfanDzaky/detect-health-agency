import { useTranslations } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";
import type { Locale } from "@/i18n/routing";
import { site } from "@/content/site";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { FloatingWhatsApp } from "@/components/FloatingWhatsApp";
import { HeroCtaWatcher } from "@/components/HeroCtaWatcher";
import { Hero } from "@/components/sections/Hero";
import { Care } from "@/components/sections/Care";
import { Hospitals } from "@/components/sections/Hospitals";
import { Itinerary } from "@/components/sections/Itinerary";
import { Travel } from "@/components/sections/Travel";
import { Checklist } from "@/components/sections/Checklist";
import { Testimonial } from "@/components/sections/Testimonial";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";

export default function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = use(params);
  setRequestLocale(locale as Locale);
  const t = useTranslations();

  return (
    <>
      <JsonLd description={t("meta.description")} locale={locale} />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:inline-flex focus:min-h-14 focus:items-center focus:rounded-full focus:bg-bg focus:px-6 focus:text-lg focus:font-semibold focus:text-ink focus:shadow-soft"
      >
        {t("nav.skipToContent")}
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Care />
        <Hospitals />
        <Itinerary />
        <Checklist />
        <Travel />
        <Testimonial />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <FloatingWhatsApp />
      <HeroCtaWatcher />
    </>
  );
}

// Built only from static site data, never from user input.
function JsonLd({ description, locale }: { description: string; locale: string }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "TravelAgency",
    name: site.name,
    legalName: site.legalName,
    url: `${site.url}/${locale}`,
    logo: `${site.url}/brand/dha-icon.png`,
    description,
    telephone: `+${site.whatsappNumber}`,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Binjai",
      addressRegion: "Sumatera Utara",
      addressCountry: "ID",
    },
    areaServed: "ID",
    knowsAbout: ["Medical tourism", "Medical check-up", "Malaysia"],
    sameAs: [site.instagramUrl, site.facebookUrl],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
