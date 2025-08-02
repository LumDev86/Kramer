import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import type { UserConfig } from 'vitest/config';

const config: UserConfig = {
  plugins: [react()],
  server: {
    port: 3000, // 👈 esto es lo nuevo
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
  },
};

export default defineConfig(config);
