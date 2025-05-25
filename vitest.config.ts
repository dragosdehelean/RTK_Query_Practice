/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  mode: 'test', 
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    coverage: {
      provider: 'v8',
      reportsDirectory: './coverage',
      reporter: ['text', 'html'],
      // exclude: ['src/test', 'src/mocks', '**/*.d.ts'],
    },
  },
  define: {
    'import.meta.env.VITE_API_URL': JSON.stringify('https://jsonplaceholder.typicode.com')
  }
});