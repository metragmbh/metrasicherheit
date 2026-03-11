# METRA Sicherheitsdienste Website - Agent Documentation

> **Language**: German (website content), English (code comments mixed with German)
> **Framework**: Astro 5.x with Static Site Generation
> **Styling**: Tailwind CSS 3.x

## Project Overview

This is the corporate website for **METRA Sicherheitsdienste GmbH**, a security services company based in Cologne, Germany. The website is a static, SEO-optimized, accessible single-page application (SPA) feel with multiple routes.

### Key Characteristics

- **German-language** business website for the security industry
- **Dark theme** design with yellow accent color (#fdf153)
- **Mobile-first responsive** design
- **WCAG accessibility** compliant (ARIA labels, semantic HTML, keyboard navigation, skip-to-content link, focus-visible states)
- **SEO-optimized** with Schema.org structured data (Organization, LocalBusiness, Service, BreadcrumbList, ContactPage), meta tags, Open Graph, Twitter Cards
- **Cookie consent** banner implemented (localStorage-based, 3 options: Accept All, Decline, Essential Only)
- **Contact form** via Web3Forms (requires access key configuration)
- **WhatsApp integration** for direct messaging (floating button + footer link)

## Technology Stack

| Category | Technology | Version |
|----------|------------|---------|
| Framework | Astro | ^5.17.1 |
| Styling | Tailwind CSS | ^3.4.19 |
| PostCSS | autoprefixer | ^10.4.27 |
| Type System | TypeScript (via Astro) | strict config |
| Deployment | Netlify | static hosting |
| Form Handling | Web3Forms | external API |
| Font | Inter | self-hosted woff2 |

## Project Structure

```
/
├── src/
│   ├── components/          # Reusable Astro components
│   │   ├── CookieBanner.astro    # GDPR cookie consent with localStorage
│   │   ├── Footer.astro          # Site footer with contact info
│   │   ├── Header.astro          # Navigation header with claim under logo
│   │   └── WhatsAppButton.astro  # Floating WhatsApp CTA (bottom-right)
│   ├── layouts/
│   │   └── Layout.astro          # Base HTML layout with SEO, Schema.org
│   ├── pages/               # File-based routing
│   │   ├── index.astro           # Homepage (hero, 5 services teaser, process, cooperation)
│   │   ├── leistungen.astro      # Services page (5 detailed services)
│   │   ├── kontakt.astro         # Contact page with Web3Forms form
│   │   ├── datenschutz.astro     # Privacy policy (DSGVO compliant)
│   │   └── impressum.astro       # Legal imprint (§ 5 TMG)
│   └── styles/
│       └── global.css            # Tailwind imports + custom styles + Inter font
├── public/                  # Static assets
│   ├── fonts/               # Self-hosted Inter font files (regular, 600, 700)
│   ├── images/              # WebP images (logo, hero, 5 service images)
│   ├── favicon.ico/svg
│   ├── robots.txt
│   └── sitemap.xml
├── astro.config.mjs         # Astro configuration (static output, Sharp images)
├── tailwind.config.js       # Tailwind customization (colors, animations)
├── postcss.config.js        # PostCSS plugins
├── tsconfig.json            # TypeScript strict config
├── netlify.toml             # Netlify deployment & security headers
└── package.json
```

## Build Commands

```bash
# Install dependencies
npm install

# Development server (localhost:4321)
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview

# Astro CLI commands
npm run astro -- --help
```

## Configuration Details

### Astro Config (`astro.config.mjs`)

```javascript
{
  devToolbar: { enabled: false },     // Dev Toolbar disabled
  output: 'static',                   // Static Site Generation
  image: {
    service: { entrypoint: 'astro/assets/services/sharp' },
  },
  compressHTML: true,                 // HTML compression enabled
  build: { format: 'directory' },     // Directory-based URLs
}
```

### Tailwind Config (`tailwind.config.js`)

Custom theme extensions:

```javascript
// Colors
background: '#17181d',      // Dark background
accent: '#fdf153',          // Yellow accent
secondary: '#d2d1d9',       // Light gray text
'accent-hover': '#e5d94a',  // Darker yellow on hover

// Font Family
sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif']

// Animations
'fade-in': fadeIn 0.6s ease-out
'fade-in-up': fadeInUp 0.6s ease-out (translateY 20px → 0)
```

### Netlify Config (`netlify.toml`)

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Security headers**: 
  - Cache-Control for static assets (1 year)
  - X-Frame-Options: DENY
  - X-Content-Type-Options: nosniff
  - Referrer-Policy: strict-origin-when-cross-origin
  - Content-Security-Policy (CSP) allowing connections to `https://api.web3forms.com`

## Key Components

### Layout.astro

Base layout providing:
- HTML5 boilerplate with German lang attribute (`de-DE`)
- Meta tags (SEO, Open Graph, Twitter Cards)
- Schema.org JSON-LD (Organization + LocalBusiness with GeoCoordinates)
- Preconnect to Web3Forms API
- Preload self-hosted Inter fonts (regular, 600, 700)
- Critical CSS inline for above-the-fold
- Skip-to-content link for accessibility
- Cookie banner inclusion

### Header.astro

- Fixed position navigation with backdrop blur (`bg-background/95 backdrop-blur-sm`)
- Logo with claim underneath: "Sicherheit & Struktur – auf die Sie bauen können."
- Desktop navigation with active link highlighting (underline indicator)
- CTA button "Angebot anfordern"
- Mobile hamburger menu with slide-out drawer
- ARIA attributes: `aria-label`, `aria-expanded`, `aria-controls`, `aria-current`
- ESC key closes mobile menu

### CookieBanner.astro

- GDPR-compliant cookie consent
- Fixed bottom banner with transform animation
- Stores preference in localStorage (`metra_sicherheit_cookie_consent`)
- Three options: Accept All, Decline, Essential Only
- Dispatches custom event `cookieConsentAccepted` on acceptance
- Links to `/datenschutz` page

### WhatsAppButton.astro

- Fixed floating button (bottom-right, z-50)
- Yellow accent color matching theme
- Gentle pulse animation on hover
- Phone number: `+491708888891`
- Notification dot indicator

## Pages

| Route | File | Purpose |
|-------|------|---------|
| `/` | `index.astro` | Homepage with hero, benefits, 4-step process, 5 services teaser, concierge highlight, cooperation section |
| `/leistungen` | `leistungen.astro` | Detailed service descriptions (5 services), benefits grid, CTA section |
| `/kontakt` | `kontakt.astro` | Contact form, contact info sidebar, WhatsApp link, quick response promise |
| `/impressum` | `impressum.astro` | Legal imprint (§ 5 TMG) - vatId and registration need completion |
| `/datenschutz` | `datenschutz.astro` | Privacy policy (DSGVO) with all required sections |

## Services (5 main offerings)

1. **Baustellensicherheit** - Construction site security
2. **Objektschutz** - Property protection
3. **Brandwachen** - Fire watch services
4. **Empfangs- & Concierge-Dienste** - Premium reception & concierge (highlighted as premium)
5. **Werkschutz / Industrieschutz** - Industrial security

Each service has: title, description, image, icon (SVG path), features list

## Contact Form Setup

The contact form uses **Web3Forms** (configured in `src/pages/kontakt.astro`):

```typescript
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY'; // Replace this!
```

**To configure:**
1. Sign up at https://web3forms.com/
2. Get your access key
3. Replace `YOUR_ACCESS_KEY` in `src/pages/kontakt.astro`

**Form features:**
- Honeypot field (`botcheck`) for bot protection - must remain empty
- Client-side validation (required fields marked with *)
- Service selection dropdown
- Privacy checkbox (required, links to datenschutz)
- Loading states with spinner
- Success/error message display
- Reply-to email auto-populated from email field

## Code Style Guidelines

### Astro Components
- Use TypeScript for component props interfaces
- Prefix component-scoped variables with interface `Props`
- Use semantic HTML5 elements (`section`, `article`, `nav`, `main`, `address`)
- Always include `aria-label` or `aria-labelledby` for interactive elements
- Use `aria-hidden="true"` for decorative elements

### Styling Conventions
- **Tailwind classes** for all styling
- Color usage:
  - `text-white` - primary text
  - `text-secondary` - muted text (#d2d1d9)
  - `text-accent` - yellow highlights (#fdf153)
  - `bg-background` - dark background (#17181d)
  - `bg-accent` / `hover:bg-accent-hover` - buttons
- Spacing scale: use `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8` for container
- Responsive breakpoints: `sm:`, `md:`, `lg:`

### Accessibility Requirements
- All images must have descriptive `alt` text
- Form inputs must have associated `<label>` elements
- Focus states: use `focus-visible:ring-2 focus-visible:ring-accent`
- Skip-to-content link must be first focusable element
- Mobile menu: `aria-expanded`, `aria-controls`, ESC to close

### Icons
- Use inline SVG with Heroicons-style paths
- Set `aria-hidden="true"` on decorative icons
- Current color inheritance via `fill="currentColor"` or `stroke="currentColor"`

## Testing Checklist

Before deploying changes, verify:

- [ ] All pages render without errors (`npm run build`)
- [ ] Responsive design works on mobile, tablet, desktop
- [ ] Navigation works (including mobile menu toggle)
- [ ] Contact form submits correctly (test with Web3Forms)
- [ ] Cookie banner appears for new users (clear localStorage to test)
- [ ] WhatsApp button opens correct chat
- [ ] No console errors
- [ ] Accessibility: keyboard navigation works (Tab, Shift+Tab)
- [ ] Accessibility: skip link works (focus then Enter)
- [ ] Accessibility: focus indicators visible (yellow ring)
- [ ] SEO: meta tags present on all pages (title, description, canonical)
- [ ] SEO: Schema.org data validates (use Google's Rich Results Test)
- [ ] Images load correctly (check WebP format, lazy loading)

## Security Considerations

1. **CSP Headers**: Configured in `netlify.toml`
   - `default-src 'self'`
   - `connect-src 'self' https://api.web3forms.com`
   - `script-src 'self' 'unsafe-inline'` (required for inline scripts)

2. **Form Security**: 
   - Honeypot field (`botcheck`) must remain empty
   - Client-side validation before submission
   - Privacy checkbox required

3. **No sensitive data** in repository (no API keys, credentials in code)

## Performance Optimizations

- Static site generation (no server runtime)
- Self-hosted fonts with `font-display: swap`
- Image optimization via Sharp (Astro's built-in service)
- HTML compression enabled
- Preconnect to Web3Forms API
- Lazy loading for below-fold images (`loading="lazy"`)
- Hero image uses `fetchpriority="high"`
- Long cache headers for static assets (1 year via Netlify)

## Relation to METRA Baulogistik

This website is the sister company to METRA Baulogistik. Both websites share:
- Same design system (colors, fonts, layout patterns)
- Same company address (Im Mediapark 5, 50670 Köln)
- Same owner/contact person (Sascha Trajkovic)
- Cross-linking in cooperation section on homepage
- Same claim: "Sicherheit & Struktur – auf die Sie bauen können."

## External Dependencies

| Service | Purpose | URL |
|---------|---------|-----|
| Web3Forms | Contact form handling | https://api.web3forms.com |
| WhatsApp | Direct messaging | https://wa.me/491708888891 |
| Netlify | Hosting & CDN | https://www.netlify.com |

## Deployment

**Platform**: Netlify

**Automatic deployment triggers:**
- Push to `master` branch deploys to production
- Build command: `npm run build`
- Output directory: `dist`

**Environment variables:** None currently required (Web3Forms key is in code - replace before launch)

## ⚠️ IMPORTANT: Before Launch

### 1. Configure Web3Forms
Replace `YOUR_ACCESS_KEY` in `src/pages/kontakt.astro` with actual Web3Forms access key.

### 2. Update Legal Information
In `src/pages/impressum.astro`:
- `vatId`: Add actual VAT ID (USt-IdNr.)
- `registration`: Add commercial register number (Handelsregisternummer)

### 3. Verify All Images Present
Check `public/images/` contains:
- `logo-sicherheit.webp`
- `hero-sicherheit.webp`
- `service-baustelle.webp`
- `service-objekt.webp`
- `service-brandwache.webp`
- `service-concierge.webp`
- `service-werk.webp`

## License & Legal

- Website content: © METRA Sicherheitsdienste GmbH
- Company address: Im Mediapark 5, 50670 Köln, Germany
- Geschäftsführer: Sascha Trajkovic
- This is proprietary code for the company's website

---

Last updated: March 2026
