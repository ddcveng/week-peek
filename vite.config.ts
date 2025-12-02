import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

// With Node types available, derive __dirname reliably
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const entryPath = path.resolve(__dirname, 'src/index.ts');

export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler'
      }
    }
  },
  build: {
    minify: 'esbuild',
    lib: {
      entry: entryPath,
      name: 'WeekPeek',
      formats: ['iife', 'es'],
      fileName: (format) => (format === 'iife' ? 'week-peek.iife.min.js' : 'week-peek.es')
    },
    rollupOptions: {
      // Bundle everything for script-tag convenience
      external: [],
      output: {
        // Keep stable filenames without hashes for CDN/script-tag use
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.endsWith('.css')) {
            return 'style.css';
          }
          return '[name][extname]';
        }
      }
    }
  }
});

