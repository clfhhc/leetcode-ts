import { defineConfig } from 'astro/config';
import solid from '@astrojs/solid-js';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://your-username.github.io',
  base: '/leetcode-ts',
  output: 'static',
  integrations: [solid(), sitemap()],
  vite: {
    resolve: {
      alias: {
        '@': '/src',
      },
    },
  },
});
