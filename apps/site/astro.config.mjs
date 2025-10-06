import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/leetcode-ts',
  output: 'static',
  integrations: [react(), sitemap()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
