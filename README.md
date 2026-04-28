# METRA Sicherheitsdienste Website

Website für METRA Sicherheitsdienste GmbH - Professionelle Sicherheitslösungen für Baustellen, Immobilien und Unternehmen.

## 🚀 Projekt-Struktur

```
/
├── src/
│   ├── components/          # Wiederverwendbare Komponenten
│   │   ├── CookieBanner.astro
│   │   ├── Footer.astro
│   │   ├── Header.astro
│   │   └── WhatsAppButton.astro
│   ├── layouts/
│   │   └── Layout.astro     # Basis-Layout mit SEO
│   ├── pages/               # Dateibasiertes Routing
│   │   ├── index.astro      # Homepage
│   │   ├── leistungen.astro # Services-Seite
│   │   ├── kontakt.astro    # Kontaktformular
│   │   ├── datenschutz.astro
│   │   └── impressum.astro
│   └── styles/
│       └── global.css       # Tailwind + Custom Styles
├── public/                  # Statische Assets
│   ├── fonts/               # Inter Schriftarten
│   ├── images/              # Bilder (Platzhalter)
│   ├── favicon.ico/svg
│   ├── robots.txt
│   └── sitemap.xml
└── package.json
```

## 🛠️ Installation

```bash
npm install
```

## 🧞 Commands

| Command           | Action                                       |
|:------------------|:---------------------------------------------|
| `npm install`     | Dependencies installieren                    |
| `npm run dev`     | Dev Server starten (localhost:4321)          |
| `npm run build`   | Production Build erstellen                   |
| `npm run preview` | Build lokal previewen                        |

## 📝 WICHTIG: Vor dem Launch zu erledigen

### 1. Bilder hinzufügen
Folgende Bilder in `public/images/` ablegen:
- `logo-sicherheit.webp` (Logo)
- `hero-sicherheit.webp` (Hero-Bild)
- `service-baustelle.webp`
- `service-objekt.webp`
- `service-brandwache.webp`
- `service-concierge.webp`
- `service-werk.webp`

### 2. Web3Forms Access Key
In `src/pages/kontakt.astro`:
```javascript
const WEB3FORMS_ACCESS_KEY = 'IHR_ACCESS_KEY';
```

### 3. Rechtliche Daten ergänzen
In `src/pages/impressum.astro`:
- `vatId` (USt-IdNr.)
- `registration` (Handelsregisternummer)

## 🎨 Design

- **Hintergrund:** #00002e (Dunkel)
- **Akzentfarbe:** #dab252 (Gelb)
- **Schriftart:** Inter (Self-hosted)
- **Framework:** Astro 5.x + Tailwind CSS

## 📱 Pages

- `/` - Homepage mit 5 Services
- `/leistungen` - Detaillierte Leistungsbeschreibungen
- `/kontakt` - Kontaktformular + Kontaktdaten
- `/impressum` - Rechtliche Angaben
- `/datenschutz` - DSGVO Erklärung

## 🔗 Verwandte Website

- [METRA Baulogistik](https://www.metra-baulogistik.de)
