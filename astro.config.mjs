// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  // Dev Toolbar deaktivieren
  devToolbar: {
    enabled: false,
  },
  // Static Site Generation für maximale Performance
  output: 'static',
  // Bildoptimierung
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
    domains: [],
    remotePatterns: [],
  },
  // Komprimierung
  compressHTML: true,
  build: {
    format: 'directory',
  },
});
