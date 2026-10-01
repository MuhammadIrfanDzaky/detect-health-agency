import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["id", "en"],
  defaultLocale: "id",
  // Most Indonesian visitors use English-language browsers, so don't redirect
  // by Accept-Language; always land on Indonesian and let them switch.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
