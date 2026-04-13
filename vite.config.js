import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          // Tell Vue that model-viewer is a custom element (no warnings)
          isCustomElement: (tag) => tag === 'model-viewer'
        }
      }
    })
  ],

  build: {
    // Target modern mobile browsers — smaller output
    target: 'es2017',

    // Minify CSS with faster engine
    cssMinify: true,

    // Optimize chunk strategy
    rollupOptions: {
      output: {
        // Split vendor libs from app code for better caching
        manualChunks: {
          vue: ['vue'],
        },
        // Hash-based filenames for long-term cache headers
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      }
    },

    // Warn if a chunk is over 500KB (models are in /public, not bundled)
    chunkSizeWarningLimit: 500,
  },

  // Dev server optimizations
  server: {
    // Enable pre-bundling of dependencies for faster dev reloads
    warmup: {
      clientFiles: ['./src/App.vue', './src/components/Hero.vue']
    }
  },

  // Optimize large deps during dev for faster HMR
  optimizeDeps: {
    include: ['vue'],
  },
})
