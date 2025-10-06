import { defineConfig } from 'vitest/config';
import { resolve } from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@types': resolve(__dirname, '../packages/types/src'),
      '@runner': resolve(__dirname, '../packages/runner/src'),
      '@cli': resolve(__dirname, '../packages/cli/src'),
    },
  },
});
