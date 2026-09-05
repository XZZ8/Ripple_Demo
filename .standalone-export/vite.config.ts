import tailwindcss from '@tailwindcss/postcss';
import react from '@vitejs/plugin-react';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const exportRoot = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(exportRoot, '..');

export default defineConfig({
  root: exportRoot,
  base: './',
  publicDir: path.join(projectRoot, 'public'),
  css: { postcss: { plugins: [tailwindcss()] } },
  plugins: [react()],
  resolve: { alias: { '@': projectRoot } },
  build: {
    outDir: path.join(exportRoot, 'dist'),
    emptyOutDir: true,
    rollupOptions: {
      input: path.join(exportRoot, 'index.html'),
      output: { inlineDynamicImports: true },
    },
  },
});
