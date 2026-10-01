import type { Locale } from "@/i18n/routing";

// Contact details come from DHA's NIB, Lynk.id, and social profiles.
export const site = {
  name: "Detect Health Agency",
  shortName: "DHA",
  legalName: "CV Detect Health Agency",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  whatsappNumber: "6282324766877",
  phoneDisplay: "0823-2476-6877",
  phoneHref: "tel:+6282324766877",
  email: "detecthealthagency@gmail.com",
  consultationFormUrl: "https://forms.gle/9YbzoUzARcCPyGpt5",
  instagramUrl: "https://www.instagram.com/detecthealthagency/",
  facebookUrl: "https://www.facebook.com/detecthealthagency/",
  city: "Binjai, Sumatera Utara",
} as const;

const whatsappGreeting: Record<Locale, string> = {
  id: "Halo DHA, saya ingin konsultasi gratis tentang rencana berobat/MCU di Malaysia.",
  en: "Hi DHA, I'd like a free consultation about my medical trip / check-up plan in Malaysia.",
};

export function whatsappUrl(locale: Locale) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(whatsappGreeting[locale])}`;
}
