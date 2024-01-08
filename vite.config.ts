// import * as fs from 'fs';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc';
// import react from '@vitejs/plugin-react';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import envCompatible from 'vite-plugin-env-compatible';
import EnvironmentPlugin from 'vite-plugin-environment';

import { PWAConfig } from './vite-pwa.config';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    sourcemap: process.env.GENERATE_SOURCEMAP as unknown as boolean || true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
    },
  },
  define: {
    // By default, Vite doesn't include shims for NodeJS/
    // necessary for segment analytics lib to work
    // global: {},
    global: 'globalThis',
  },
  resolve: {
    alias: {
      '~': resolve(__dirname, 'node_modules'),
      '@': resolve(__dirname, 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
  },
  cacheDir: './.cache',
  publicDir: 'public',
  plugins: [
    envCompatible(),
    VitePluginHtmlEnv({
      prefix: '%',
      suffix: '%',
      envPrefixes: ['VITE_', 'VITE_APP_', 'REACT_APP_']
    }),
    EnvironmentPlugin('all', { prefix: 'VITE_APP_' }),
    EnvironmentPlugin('all', { prefix: 'REACT_APP_' }),
    // eslintPlugin({ cache: false }),
    react({
      // jsxRuntime: 'classic'
      // Removes React Devtools in production build
      // removeDevtoolsInProd: true,

      // Exclude storybook stories
      // exclude: /\.stories\.(t|j)sx?$/,
    }),
    svgr(),
    VitePWA(PWAConfig)
  ],
  server: {
    host: process.env.HOST || 'localhost',
    // @ts-ignore
    https: /* (process.env.HTTPS && {
      key: fs.readFileSync(process.env.SSL_KEY_FILE),
      cert: fs.readFileSync(process.env.SSL_CRT_FILE),
    }) ||  */false,
    // this ensures that the browser opens upon server start
    open: true,
    // this sets a default port to 3000
    port: process.env.PORT as unknown as number || 5173,
  },
  esbuild: {
    loader: 'jsx',
    include: [
      // Business as usual for .jsx and .tsx files
      'src/**/*.jsx',
      'node_modules/**/*.jsx',

      // Add these lines to allow all .js files to contain JSX
      'src/**/*.js',
      'node_modules/**/*.js',
    ],
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  /* test: {
    css: false,
    include: ['src/!**!/__tests__/!*'],
    globals: true,
    environment: 'jsdom',
    setupFiles: 'src/setupTests.js',
    clearMocks: true,
  } */
});
