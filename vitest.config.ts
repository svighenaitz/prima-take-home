import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'
 
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
    include: ['__tests__/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    exclude: ['**/node_modules/**', '**/dist/**', '**/e2e/**', '**/src/**/*.{test,spec}.{js,jsx,ts,tsx}'],
    coverage: {
      provider: 'v8', // or 'istanbul'
      reporter: ['text', 'json', 'html'],
      exclude: [
        // Add patterns for files to exclude from coverage
        '**/node_modules/**',
        '**/.next/**',
        '**/dist/**',
        '**/e2e/**',
        // Configuration files
        '**/eslint.config.js',
        '**/next-env.d.ts',
        '**/next.config.js',
        '**/playwright.config.ts',
        '**/postcss.config.js',
        '**/prettier.config.js',
        '**/vitest.config.ts',
        // Specific files
        '**/src/env.js',
        '**/src/pages/_app.tsx',
        '**/src/pages/api/trpc/[trpc].ts',
        '**/src/pages/explore/index.tsx',
        '**/src/server/api/root.ts',
        '**/src/server/api/trpc.ts',
        '**/src/server/api/routers/post.ts'
      ]
    }
  },
})