import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Library build. Storybook reuses the plugins from this file.
// Type declarations are emitted by `tsc -p tsconfig.build.json` (see docs/decisions.md, TypeScript 7).
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    lib: {
      entry: 'src/index.ts',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [/^react($|\/)/, /^react-dom($|\/)/, /^react-aria($|\/)/, /^react-aria-components($|\/)/],
    },
    sourcemap: true,
  },
});
