import { defineConfig } from 'vitest/config';

import path from 'path';

export default defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    include: ['**/*.test.tsx', '__tests__/**/*.tsx'],
    exclude: ['node_modules', '.next'],

  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  esbuild: {
    jsx: 'automatic',
  },
});
