import { defineConfig } from 'vite';

export default defineConfig({
  base: '/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    cssCodeSplit: false,
    rollupOptions: {
      input: 'index.html',
      output: {
        codeSplitting: false
      },
      plugins: [{
        name: 'minify-html',
        generateBundle(_, b) {
          for (let f in b) if (f.endsWith('.html') && b[f].type === 'asset') 
            b[f].source = b[f].source.replace(/\n\s*/g, '').replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ').replace(/<!--.*?-->/g, '').trim();
        }
      }]
    }
  },
  publicDir: 'public'
});