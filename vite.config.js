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
        name: 'inline-css-and-minify-html',
        generateBundle(_, b) {
          let css = '';
          for (let k in b) if (k.endsWith('.css')) { css += b[k].source; delete b[k]; }
          for (let k in b) if (k.endsWith('.html') && b[k].type === 'asset') {
            b[k].source = b[k].source.replace('</head>', `<style>${css}</style></head>`)
              .replace(/<link[^>]*rel="stylesheet"[^>]*>/gi, '')
              .replace(/\n\s*/g, '').replace(/>\s+</g, '><').replace(/\s{2,}/g, ' ')
              .replace(/<!--.*?-->/g, '').trim();
          }
        }
      }]
    }
  },
  publicDir: 'public'
});