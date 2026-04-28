# METRA Sicherheitsdienste GmbH – Website Agent-Dokumentation

> **Sprache**: Deutsch (Website-Inhalte), Englisch (Code-Kommentare gemischt mit Deutsch)
> **Framework**: Astro 5.x mit Static Site Generation
> **Styling**: Tailwind CSS 3.x

---

## Projektübersicht

Dies ist die statische Corporate-Website der **METRA Sicherheitsdienste GmbH**, ein Sicherheitsdienstleister mit Sitz in Köln. Die Website ist SEO-optimiert, barrierefrei und mobil-first. Alle Inhalte sind auf Deutsch.

**Kerneigenschaften:**
- Deutsche Business-Website für die Sicherheitsbranche
- Dark-Theme Design mit gelber Akzentfarbe (`#dab252`)
- Mobile-first responsives Design
- WCAG-konform (ARIA-Labels, semantisches HTML, Tastaturnavigation, Skip-to-Content-Link, Focus-Visible-States)
- Umfangreiche Schema.org-Structured-Data (Organization, LocalBusiness, Service, BreadcrumbList, ContactPage)
- Cookie-Consent-Banner (localStorage-basiert, 3 Optionen: Alle akzeptieren, Ablehnen, Nur Essenzielle)
- Kontaktformular via Web3Forms
- WhatsApp-Integration (Floating-Button + Footer-Link)

---

## Technologie-Stack

| Kategorie | Technologie | Version |
|-----------|------------|---------|
| Framework | Astro | ^5.17.1 |
| Styling | Tailwind CSS | ^3.4.19 |
| PostCSS | autoprefixer | ^10.4.27 |
| TypeScript | Astro-Strict-Config | – |
| Bildoptimierung | Sharp | ^0.34.5 |
| Deployment | Netlify | Static Hosting |
| Formular-Handling | Web3Forms | Externe API |
| Schriftart | Inter | Self-hosted woff2 |

---

## Projektstruktur

```
/
├── src/
│   ├── components/
│   │   ├── CookieBanner.astro    # GDPR Cookie-Consent (localStorage)
│   │   ├── Footer.astro          # Footer mit Kontaktdaten, Leistungen, Rechtliches
│   │   ├── Header.astro          # Fixe Navigation mit Logo + Claim
│   │   ├── MobileMenu.astro      # Mobile Navigation mit JS + Noscript-Fallback
│   │   └── WhatsAppButton.astro  # Floating WhatsApp CTA (bottom-right)
│   ├── layouts/
│   │   └── Layout.astro          # Basis-Layout mit SEO, Schema.org, Critical CSS
│   ├── pages/                    # Dateibasiertes Routing
│   │   ├── index.astro           # Homepage (Hero, Trust Badges, Problem/Lösung, 4-Schritte-Prozess, 5 Leistungen, Concierge-Highlight, Kooperation, Qualifikationen)
│   │   ├── leistungen.astro      # Detaillierte Leistungsbeschreibungen (5 Services)
│   │   ├── kontakt.astro         # Kontaktformular (Web3Forms) + Kontaktdaten
│   │   ├── datenschutz.astro     # DSGVO-konforme Datenschutzerklärung
│   │   ├── impressum.astro       # Impressum (§ 5 TMG) – vatId & registration müssen ergänzt werden
│   │   └── 404.astro             # Custom 404-Fehlerseite
│   ├── styles/
│   │   └── global.css            # Tailwind-Direktiven + Custom Styles + Inter-Font
│   └── env.d.ts                  # Astro-Client-Typen + ImportMetaEnv (PUBLIC_WEB3FORMS_KEY)
├── public/
│   ├── fonts/
│   │   ├── inter-regular.woff2
│   │   ├── inter-600.woff2
│   │   └── inter-700.woff2
│   ├── images/
│   │   ├── logoneu.png           # Aktuelles Logo (PNG!)
│   │   ├── hero-sicherheit.webp
│   │   ├── service-baustelle.webp
│   │   ├── service-objekt.webp
│   │   ├── service-brandwache.webp
│   │   ├── service-concierge.webp
│   │   └── service-werk.webp
│   ├── favicon.ico
│   ├── favicon.svg
│   ├── manifest.json             # PWA-Manifest
│   ├── robots.txt
│   └── sitemap.xml
├── astro.config.mjs
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json                 # extends "astro/tsconfigs/strict"
├── netlify.toml                  # Build-Config + Security Headers
├── package.json                  # type: "module"
├── .env.example                  # PUBLIC_WEB3FORMS_KEY
└── .gitignore
```

---

## Build-Befehle

```bash
# Abhängigkeiten installieren
npm install

# Entwicklungsserver (localhost:4321)
npm run dev

# Produktions-Build
npm run build

# Build lokal previewen
npm run preview

# Astro CLI
npm run astro -- --help
```

---

## Konfiguration

### `astro.config.mjs`

- `output: 'static'` – Static Site Generation
- `devToolbar: { enabled: false }`
- `compressHTML: true`
- `build.format: 'directory'` – Verzeichnis-basierte URLs
- `image.service: { entrypoint: 'astro/assets/services/sharp' }` – Bildoptimierung via Sharp

### `tailwind.config.js`

**Erweiterte Farben:**
- `background: '#00002e'` – Dunkler Hintergrund
- `accent: '#dab252'` – Gelbe Akzentfarbe
- `secondary: '#a0a3b8'` – Gedämpfter Grauton für Text
- `accent-hover: '#c9a14a'` – Dunkleres Gelb für Hover

**Erweiterte Animationen:**
- `fade-in` – Opacity 0 → 1 (0.6s)
- `fade-in-up` – Opacity 0 + translateY(20px) → Opacity 1 + translateY(0) (0.6s)

**Font-Family:** `sans: ['Inter', 'system-ui', ...]`

### `netlify.toml`

- Build-Command: `npm run build`
- Publish-Dir: `dist`
- Cache-Control für statische Assets (images, fonts, js, css): 1 Jahr
- Security Headers:
  - `X-Frame-Options: DENY`
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`
  - `Permissions-Policy` (Camera, Microphone, Geolocation deaktiviert)
  - `Content-Security-Policy` mit `connect-src 'self' https://api.web3forms.com`

### `tsconfig.json`

- Extends: `astro/tsconfigs/strict`
- Include: `.astro/types.d.ts`, `**/*`
- Exclude: `dist`

---

## Komponenten im Detail

### `Layout.astro`

- Basis-HTML mit `lang="de-DE"`
- Meta-Tags (SEO, Open Graph, Twitter Cards)
- Schema.org JSON-LD: Organization + LocalBusiness (mit GeoCoordinates)
- Preconnect zu `https://api.web3forms.com`
- Preload der self-hosted Inter-Fonts (regular, 600, 700)
- Critical CSS inline für Above-the-fold
- Skip-to-Content-Link als erstes fokussierbares Element
- `<slot />` für Seiteninhalt
- Bindet `CookieBanner` am Ende des Body ein

**Wichtige Konstanten im Layout:**
- `siteUrl = 'https://www.metra-sicherheitsdienste.de'`
- `LOGO_PATH = '/images/logoneu.png'` (nicht `logo-sicherheit.webp`!)

### `Header.astro`

- Fixe Position mit Backdrop-Blur (`bg-background/95 backdrop-blur-sm`)
- Logo-Bild (`/images/logoneu.png`) mit Claim darunter: *„Sicherheit & Struktur – auf die Sie bauen können."*
- Desktop-Navigation mit Active-Link-Unterstreichung (`aria-current="page"`)
- CTA-Button „Angebot anfordern" (Desktop)
- Mobile Hamburger-Button mit `aria-expanded`, `aria-controls`
- Spacer-Element (`h-24 md:h-28`) für fixen Header

### `MobileMenu.astro`

- Separates Overlay (`fixed inset-0 top-24 md:top-28 z-[100] bg-background`)
- Öffnen/Schließen via JS (DOMContentLoaded)
- ESC-Taste schließt Menü
- Resize auf Desktop schließt Menü
- Body-Scroll wird bei geöffnetem Menü blockiert
- Links schließen Menü bei Klick
- **Noscript-Fallback:** Statische Mobile-Navigation ohne JS, Hamburger-Button wird versteckt

### `CookieBanner.astro`

- Fixed bottom Banner mit `transform translate-y-full` → Slide-in Animation
- `role="dialog"`, `aria-modal="true"`, `aria-label="Cookie-Einwilligung"`
- localStorage-Key: `metra_sicherheit_cookie_consent`
- 3 Buttons: „Zustimmen" (accepted), „Ablehnen" (declined), „Nur Essenzielle" (essential)
- 1-Sekunde Verzögerung vor Anzeige
- Custom Event `cookieConsentAccepted` bei Zustimmung
- Link zu `/datenschutz`

### `WhatsAppButton.astro`

- Fixed Button (bottom-8 right-8, z-50)
- Telefonnummer: `491708888891` → `https://wa.me/491708888891`
- Gelbe Akzentfarbe, Notification-Dot (weiß mit Border)
- CSS Hover-Animation: `@keyframes gentle-pulse` (Scale 1 → 1.05)

### `Footer.astro`

- 4-Spalten-Grid (2 Spalten mobil)
- Spalten: Unternehmensinfo, Leistungen, Unternehmen, Kontakt
- WhatsApp-CTA im Kontakt-Bereich
- Rechtlicher Hinweis: § 34a GewO (Disclaimer-Box)
- Bottom Bar: Copyright + Links zu Impressum/Datenschutz

---

## Seiten im Detail

| Route | Datei | Beschreibung |
|-------|-------|--------------|
| `/` | `index.astro` | Hero mit Bild, Trust Badges, Problem/Lösung, 4-Schritte-Prozess, 5 Service-Teaser (mit Bildern), Concierge-Highlight (Premium-Sektion), „Warum METRA", Qualifikationen |
| `/leistungen` | `leistungen.astro` | Detaillierte Service-Beschreibungen (5 Services, abwechselnd Bild/Text), Trust Badges, Benefits-Grid, Prozess-Teaser, CTA-Sektion |
| `/kontakt` | `kontakt.astro` | Kontaktformular (Web3Forms), Kontakt-Sidebar (Adresse, Telefon, E-Mail, WhatsApp), Schema.org ContactPage |
| `/impressum` | `impressum.astro` | Impressum (§ 5 TMG) – **vatId & registration müssen noch ergänzt werden** |
| `/datenschutz` | `datenschutz.astro` | DSGVO-konforme Datenschutzerklärung (7 Abschnitte) |
| `/404` | `404.astro` | Custom 404 mit Navigation |

### Gemeinsame Muster in allen Seiten

Alle Seiten (außer 404) folgen diesem Muster:
```astro
<Layout title="..." description="..." canonical="/route">
  <script type="application/ld+json" set:html={JSON.stringify(schemaBreadcrumb)} />
  <Header />
  <MobileMenu />
  <main id="main-content">...</main>
  <Footer />
  <WhatsAppButton />
</Layout>
```

Jede Seite hat eine **Breadcrumb-Navigation** (visuell + Schema.org JSON-LD).

---

## Services (5 Hauptleistungen)

1. **Objektschutz** – Bürogebäude, Wohnanlagen, Gewerbeobjekte
2. **Baustellensicherheit** – Baustellenbewachung jeder Größe
3. **Werkschutz / Industrieschutz** – Industrieanlagen, Produktionsstandorte
4. **Brandwachen** – Feuergefährliche Arbeiten, Präventivüberwachung
5. **Empfangs- & Concierge-Dienste** – Premium-Service (markiert mit `isPremium: true`)

Jeder Service hat: `id`, `title`, `description`, `image` (WebP), `icon` (SVG-Path), `features` (Array), optional `isPremium`.

---

## Kontaktformular (Web3Forms)

**Konfiguration in `src/pages/kontakt.astro`:**
```astro
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = import.meta.env.PUBLIC_WEB3FORMS_KEY || 'YOUR_ACCESS_KEY';
```

**Umgebungsvariable:** `PUBLIC_WEB3FORMS_KEY` (siehe `.env.example`)

**Formular-Features:**
- Honeypot-Feld (`botcheck`) – muss leer bleiben
- Client-seitige Validierung (Pflichtfelder mit `*`)
- Service-Auswahl-Dropdown
- Privacy-Checkbox (Pflicht, Link zu `/datenschutz`)
- Loading-State mit Spinner
- Success/Error-Messages mit `aria-live="polite"`
- Reply-To wird automatisch aus E-Mail-Feld gesetzt
- Async Submission via `fetch` API

**Wichtig:** Wenn `WEB3FORMS_ACCESS_KEY === 'YOUR_ACCESS_KEY'` wird eine Warnung im UI angezeigt.

---

## Code-Style-Richtlinien

### Astro-Komponenten

- TypeScript für Props-Interfaces (immer `interface Props`)
- Semantisches HTML5 (`section`, `article`, `nav`, `main`, `address`)
- `aria-label` oder `aria-labelledby` für interaktive Elemente
- `aria-hidden="true"` für dekorative Elemente
- `<slot />` in Layout für Children

### Styling-Konventionen

- **Tailwind-Klassen** für alles Styling
- Farb-Schema:
  - `text-white` – Primärer Text
  - `text-secondary` – Gedämpfter Text
  - `text-accent` – Gelbe Highlights
  - `bg-background` – Dunkler Hintergrund
  - `bg-accent` / `hover:bg-accent-hover` – Buttons
- Container: `max-w-7xl mx-auto px-5 sm:px-6 lg:px-8`
- Responsive Breakpoints: `sm:`, `md:`, `lg:`
- `sr-only` / `focus:not-sr-only` für Skip-Link
- `focus-visible:ring-2 focus-visible:ring-accent` für Fokus-Indikatoren

### Accessibility (WCAG)

- Alle Bilder haben beschreibenden `alt`-Text
- Formular-Inputs haben assoziierte `<label>`-Elemente
- Focus-States sichtbar (gelber Ring)
- Skip-to-Content-Link als erstes fokussierbares Element
- Mobile Menu: `aria-expanded`, `aria-controls`, ESC zum Schließen
- `aria-current="page"` für aktive Navigationseinträge
- `role="dialog"` und `aria-modal="true"` für Modal-Komponenten (Cookie-Banner)
- `prefers-reduced-motion` wird in `global.css` berücksichtigt

### Icons

- Inline-SVGs im Heroicons-Stil
- `aria-hidden="true"` auf dekorativen Icons
- `fill="currentColor"` oder `stroke="currentColor"`
- Standard-Größen: `w-5 h-5` oder `w-6 h-6`

---

## Testing-Checkliste

Vor jedem Deploy:

- [ ] `npm run build` läuft fehlerfrei durch
- [ ] Responsive Design funktioniert (Mobil, Tablet, Desktop)
- [ ] Navigation funktioniert (inkl. Mobile-Menu-Toggle)
- [ ] Kontaktformular lässt sich absenden (mit Web3Forms testen)
- [ ] Cookie-Banner erscheint für neue Nutzer (localStorage löschen zum Testen)
- [ ] WhatsApp-Button öffnet korrekten Chat
- [ ] Keine Console-Fehler
- [ ] Tastaturnavigation funktioniert (Tab, Shift+Tab)
- [ ] Skip-Link funktioniert (Focus dann Enter)
- [ ] Focus-Indikatoren sichtbar (gelber Ring)
- [ ] Meta-Tags auf allen Seiten vorhanden (title, description, canonical)
- [ ] Bilder laden korrekt (WebP-Format, Lazy Loading)
- [ ] Schema.org-Daten validieren (Google Rich Results Test)

---

## Sicherheitsaspekte

1. **CSP-Header** in `netlify.toml`:
   - `default-src 'self'`
   - `connect-src 'self' https://api.web3forms.com`
   - `script-src 'self' 'unsafe-inline'` (für Inline-Scripts nötig)
   - `form-action 'self' https://api.web3forms.com`

2. **Formular-Sicherheit:**
   - Honeypot-Feld (`botcheck`) muss leer bleiben
   - Client-seitige Validierung vor Absenden
   - Privacy-Checkbox ist Pflicht

3. **Keine sensiblen Daten** im Repository (keine API-Keys im Code, `.env.example` als Vorlage)

---

## Performance-Optimierungen

- Static Site Generation (kein Server-Runtime)
- Self-hosted Fonts mit `font-display: swap`
- Bildoptimierung via Sharp (Astro integriert)
- HTML-Komprimierung aktiviert
- Preconnect zu Web3Forms API
- Lazy Loading für Below-the-fold Bilder (`loading="lazy"`)
- Hero-Bild: `fetchpriority="high"` + `loading="eager"`
- Lange Cache-Header für statische Assets (1 Jahr via Netlify)
- Critical CSS inline in `Layout.astro`

---

## Unternehmensdaten

- Adresse: Im Mediapark 5, 50670 Köln
- Geschäftsführer: D. Mrkaja
- Claim: *„Sicherheit & Struktur – auf die Sie bauen können."*

---

## Externe Abhängigkeiten

| Service | Zweck | URL |
|---------|-------|-----|
| Web3Forms | Kontaktformular-Handling | https://api.web3forms.com |
| WhatsApp | Direktnachricht | https://wa.me/491708888891 |
| Netlify | Hosting & CDN | https://www.netlify.com |

---

## Deployment

**Plattform:** Netlify

- Push auf `master` deployed automatisch in Production
- Build-Command: `npm run build`
- Output-Verzeichnis: `dist`

---

## ⚠️ WICHTIG: Vor dem Launch

### 1. Web3Forms konfigurieren
Setze `PUBLIC_WEB3FORMS_KEY` in einer `.env`-Datei oder passe `src/pages/kontakt.astro` an.

### 2. Rechtliche Daten ergänzen
In `src/pages/impressum.astro`:
- `vatId`: Tatsächliche USt-IdNr. eintragen
- `registration`: Handelsregisternummer eintragen

### 3. Bilder prüfen
`public/images/` muss enthalten:
- `logoneu.png` (Logo – aktuell PNG, nicht WebP!)
- `hero-sicherheit.webp`
- `service-baustelle.webp`
- `service-objekt.webp`
- `service-brandwache.webp`
- `service-concierge.webp`
- `service-werk.webp`

### 4. Sitemap-Daten aktualisieren
In `public/sitemap.xml` die `<lastmod>`-Daten bei größeren Änderungen anpassen.

---

## Lizenz & Rechtliches

- Website-Inhalt: © METRA Sicherheitsdienste GmbH
- Adresse: Im Mediapark 5, 50670 Köln, Deutschland
- Geschäftsführer: D. Mrkaja
- Proprietärer Code für die Unternehmenswebsite

---

*Letzte Aktualisierung: 28. April 2026*
