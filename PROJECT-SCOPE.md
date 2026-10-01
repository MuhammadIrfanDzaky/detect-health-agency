# Project Scope & Competency Ledger

- **Category:** brochure (no modifiers)
- **Security tags:** always, deploy
- **Classified:** 2026-09-29
- **Last audit:** 2026-09-29
- **Gates open:** 7 blocking competencies not yet `applied` (2 are `n/a`); development phase, localhost only

Context: landing page (Home, ID + EN) for CV Detect Health Agency. Next.js (App Router, SSG) + Tailwind + next-intl. Leads go to WhatsApp and the existing Google Form — the site itself collects no data and has no backend.

## Blocking (must be `applied` before launch)
| # | Competency | Status | Evidence / reason |
|---|---|---|---|
| 11 | SEO & Metadata | deferred | Implemented: per-locale `generateMetadata` (title, description, canonical, hreflang, OG, Twitter) in `src/app/[locale]/layout.tsx`, `src/app/sitemap.ts`, `src/app/robots.ts`, JSON-LD. Still missing: OG image and real domain in `NEXT_PUBLIC_SITE_URL`. Reopen: before first deploy |
| 13 | Performance | deferred | Must be measured on a real deploy. Reopen: first deploy |
| 8 | UI/UX & Responsiveness | deferred | Mobile-first build; no horizontal overflow at 375px (checked in browser). Full visual pass at 360/768/1280 still pending |
| 33 | Transactional Email | n/a | No own form; leads via WhatsApp + Google Form. Reopen if a native form or Cal.com booking is added |
| 27 | Security & SSL | deferred | Security headers planned in `next.config.ts`; HTTPS depends on host. Reopen: first deploy |
| 28 | Rate Limiting | n/a | No public endpoint of our own. Reopen with #33 |
| 6 | Legal & Compliance | deferred | Site collects no personal data itself. Reopen: before public launch (privacy page), or when analytics/form is added |
| 2 | Documentation | deferred | `README.md` has run steps, content-editing table, placeholder list. Missing: redeploy steps (no host yet). Reopen: before handover |
| 49 | Bus Factor | deferred | Domain/hosting not chosen yet (user decision after localhost dev). Reopen: domain purchase |

## Recommended
| # | Competency | Status | Evidence / reason |
|---|---|---|---|
| 10 | Accessibility | deferred | Contrast, alt text, focus, aria on accordion/toggle planned. Reopen: section build complete |
| 44 | Logging & Monitoring | deferred | Uptime check after deploy |
| 51 | Product Analytics | deferred | Client will want lead counts; needs privacy page first |
| 38 | Cache & CDN | deferred | Static SSG output; host CDN on deploy |
| 30 | Dependency & Supply Chain | deferred | Dependabot/Renovate once repo is on GitHub |
| 35 | Hosting & Deployment | deferred | Host not chosen yet |

## Deferred by decision
| # | Competency | Reason | Reopen when |
|---|---|---|---|
| 15-24 | Backend / data competencies | No user-writable data | Any native form, booking, or CMS |
| 25, 26 | Auth & permissions | No login | CMS or admin added |
| 43 | Automated Testing | Single page | Site grows past a handful of pages |

## Not applicable
| # | Competency | Why |
|---|---|---|
| 23, 39, 40, 45 | Queues, scale, feature flags, tracing | Static brochure site |

## Security checks
| ID | Check | Severity | → # | Status | Evidence / reason |
|---|---|---|---|---|---|
| SEC-01 | Injection | critical | 27 | n/a | No server input handling |
| SEC-02 | XSS | critical | 27 | PASS | Only `dangerouslySetInnerHTML` is JSON-LD in `src/app/[locale]/page.tsx`, built from static data with `<` escaped; no user input rendered |
| SEC-03 | Mass assignment | critical | 18 | n/a | No data writes |
| SEC-08 | Insecure deserialization | high | 18 | n/a | No server input |
| SEC-12 | Rate limiting | high | 28 | n/a | No own endpoint |
| SEC-20 | IDOR | critical | 26 | n/a | No user data |
| SEC-24 | Secrets management | critical | 29 | PASS | No secrets used; `.gitignore` covers `.env*` and `/protected files/` (verified with `git check-ignore`) |
| SEC-25 | Verbose errors | high | 46 | FAIL | Pending production build check |
| SEC-26 | Unbounded data fetching | high | 14 | n/a | No data fetching |
| SEC-29 | Source maps in production | medium | 35 | PASS | `productionBrowserSourceMaps: false` in `next.config.ts` |
| SEC-30 | HTTPS enforced | critical | 27 | FAIL | Depends on host; first deploy |
| SEC-31 | Security headers | high | 27 | PASS | CSP, `frame-ancestors 'none'`, X-Frame-Options, nosniff, Referrer-Policy, Permissions-Policy via `headers()` in `next.config.ts`; verified with `curl -I` on localhost. Re-verify on deploy |
| SEC-32 | CORS | high | 27 | n/a | No API routes |
| SEC-33 | Web cache poisoning | medium | 38 | FAIL | Review on deploy |
| SEC-34 | Dependencies | high | 30 | PASS | `npm audit --omit=dev`: 0 vulnerabilities (2026-09-29). Automate with Dependabot later (#30) |
| SEC-36 | Shadow endpoints | medium | 14 | FAIL | Review on deploy |
| SEC-38 | Denial of wallet | high | 5 | FAIL | Spend caps on host at deploy |
| SEC-39 | Subdomain takeover | medium | 36 | FAIL | DNS review at domain setup |

## Business constraints (from legal documents review)
- Do not advertise medical evacuation / ambulance (KBLI 86904 permit not issued) or lab / health-support services (KBLI 86903 standard not verified).
- Never publish personal data from `protected files/` (NIK, birth dates, bank account). Legal identifiers (NIB, AHU, NPWP) belong on a future "Tentang Kami" page only.
