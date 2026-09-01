import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },    build: {
      // Aggressive optimization for performance
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true,
          passes: 3,
          pure_funcs: ['console.log', 'console.info'],
        },
        mangle: true,
        format: {
          comments: false,
        },
      },
      // Code splitting strategy for optimal caching
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            // Vendor dependencies
            if (id.includes('node_modules/react')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/motion')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-ui';
            }
            if (id.includes('node_modules/zustand') || id.includes('node_modules/clsx') || id.includes('node_modules/tailwind-merge')) {
              return 'vendor-utils';
            }
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: 'assets/[name]-[hash][extname]',
        },
      },
      // Increase chunk size warning threshold
      chunkSizeWarningLimit: 600,
      // Enable CSS code splitting
      cssCodeSplit: true,
      // Source maps only for errors
      sourcemap: false,
      // Report compressed size
      reportCompressedSize: true,
    },  };
});
