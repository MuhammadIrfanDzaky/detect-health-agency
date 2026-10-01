# Detect Health Agency — Landing Page

Landing page for **CV Detect Health Agency (DHA)**, a medical travel facilitator for Indonesian patients going to Malaysia. Bilingual (Bahasa Indonesia default, English), statically generated.

- **Stack:** Next.js 16 (App Router, SSG) · Tailwind CSS v4 · next-intl v4 · lucide-react
- **Routes:** `/id`, `/en` (`/` redirects to `/id`), `/sitemap.xml`, `/robots.txt`
- **Leads:** WhatsApp (`wa.me` with a prefilled message per language) and the existing Google Form. The site itself collects no data.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (checks types)
npm run start    # serve the production build
npm run lint
```

## Editing content (no coding needed)

| What | File |
|---|---|
| All page text, both languages | `messages/id.json`, `messages/en.json` (keep the same keys in both) |
| WhatsApp number, email, Google Form link, Instagram, Facebook | `src/content/site.ts` |
| WhatsApp prefilled greeting | `src/content/site.ts` → `whatsappGreeting` |
| Partner hospitals (name, city, logo) | `src/content/hospitals.ts` |
| Hospital card summary (one line) | `messages/*.json` → `hospitals.specialties` |
| Hospital profile in the dialog | `messages/*.json` → `hospitals.details` |
| Colors | `src/app/globals.css` → `@theme` |

After editing, run `npm run build` to make sure nothing broke.

### Logos and icons

- `public/brand/dha-logo.png`: DHA icon + name (navbar, footer). `public/brand/dha-icon.png`: icon only (JSON-LD logo).
- `src/app/icon.png` and `src/app/apple-icon.png`: favicon and home-screen icon, made from the DHA icon.
- `public/partners/*.png`: partner hospital logos, referenced from `src/content/hospitals.ts`.
- All logo PNGs had their white background made transparent and their margins trimmed. Originals stay in DHA's Canva.
- Brand blue `#4A90E2` (`--brand`) is used for icons and accents only; it is too light for white text, so buttons and links use darker shades of the same hue (`--accent`, `--accent-strong`).

### Partner hospitals section

All six hospitals show as one grid of cards (logo, name, city, one-line specialty). Clicking a card opens a detail dialog (`src/components/HospitalDirectory.tsx`) with a photo, a short `about`, and the "Kelebihan" list. The dialog does not repeat the card's specialty line, and `about` (who and where) should not repeat the `points` (strengths).

- Details: in `messages/id.json` and `messages/en.json`, add `hospitals.details.<hospitalId>` with an `about` sentence and a `points` list. Hospitals without details show a "coming soon, ask us on WhatsApp" note.
- Photos: hospital building photos (from DHA) live in `public/partners/photos/<id>.webp` and are set as `photo` in `src/content/hospitals.ts`. Convert new photos to WebP (about 860px wide) before adding them. If `photo` is null, the dialog shows the city photo.
- Source text for the profiles is DHA's `hospital.md` (kept out of git). The site copy is a lightly simplified version, with prices removed.

## Placeholders still to replace

Mock content is marked on the page with a **Contoh / Sample** badge.

| Item | Where |
|---|---|
| 10 testimonials (invented names; need real patients with consent) | `messages/*.json` -> `testimonial.items` |
| FAQ | `messages/*.json` -> `faq` |
| Opening hours and WhatsApp response time | `messages/*.json` -> `footer.hoursValue`, `footer.responseTime` |
| Photos (Unsplash stock, see below) | `src/content/photos.ts` |

Search the code for `PLACEHOLDER` to find each spot.

### Photo credits (Unsplash License, hotlinked)

Hero @silverkblack, airport meeting point @hidayatabuhady, Penang @zyteng, Kuala Lumpur @travelwithcm, Melaka @bari_21, Melaka river @fajrihfzh. Links are in `src/content/photos.ts`.

## Design direction

Audience is adults 30+ and seniors, so accessibility decides over aesthetics:

- Light theme only (white + DHA blue). No dark mode.
- Body text 18px minimum, nothing below 16px. Contrast: body >= 7:1, white on blue >= 4.5:1.
- Tap targets >= 56px. Links underlined. Icons always have a text label.
- Sections alternate white and light blue, each heading starts with a short blue bar.
- Hero answers "what is DHA" at once: photo with white fade, big WhatsApp button, visible phone number, then a blue strip with three facts.
- Numbered steps for "how it works". No scroll animations.
- Testimonials stay low-key: a smaller heading and one row of short cards with previous/next arrows (swipe on phones), not a highlight section.
- No prices anywhere. "Free consultation and support" is fine (confirmed by DHA).
- Stack: Tailwind v4 tokens in `src/app/globals.css`, Geist font, Phosphor icons.

## Content rules

- Do **not** advertise medical evacuation / ambulance or lab services — the related business permits (KBLI 86904, 86903) are not complete yet.
- Legal identifiers (NIB, AHU, NPWP) belong on a future "Tentang Kami" page, not on Home.
- `protected files/` holds confidential company documents. It is gitignored and must never be committed or deployed.

## Notes for developers

- next-intl's `createNextIntlPlugin()` is intentionally not used. It eagerly loads `@swc/core` and `@parcel/watcher` for its experimental message extractor, which failed to load in this environment. `next.config.ts` declares the equivalent `turbopack.resolveAlias` for `next-intl/config` instead.
- Locale detection from the browser language is off (`src/i18n/routing.ts`), so every visitor lands on Indonesian first.
- Security headers (CSP, frame-ancestors, etc.) are set in `next.config.ts`.
- `NEXT_PUBLIC_SITE_URL` sets the canonical URL, sitemap, and OG URLs (defaults to `http://localhost:3000`). Set it when a domain is chosen.
- Project scope and launch gates are tracked in `PROJECT-SCOPE.md`.
