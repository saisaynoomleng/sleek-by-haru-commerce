import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { playwright } from '@vitest/browser-playwright';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['@testing-library/jest-dom/vitest'],
    browser: {
      enabled: false,
      provider: playwright(),
      instances: [{ browser: 'chromium' }],
    },
  },
});
