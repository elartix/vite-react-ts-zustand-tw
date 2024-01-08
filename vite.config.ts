// import * as fs from 'fs';
import { resolve } from 'path';
import svgr from 'vite-plugin-svgr';
import { VitePWA } from 'vite-plugin-pwa';
import react from '@vitejs/plugin-react-swc';
// import react from '@vitejs/plugin-react';
import VitePluginHtmlEnv from 'vite-plugin-html-env';
import envCompatible from 'vite-plugin-env-compatible';
import EnvironmentPlugin from 'vite-plugin-environment';
import { type ConfigEnv, defineConfig, loadEnv, splitVendorChunkPlugin } from 'vite';

import { getPWAConfig, PWAConfig } from './vite-pwa.config';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }: ConfigEnv) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      emptyOutDir: true,
      sourcemap: process.env.GENERATE_SOURCEMAP as unknown as boolean || true,
      commonjsOptions: {
        strictRequires: [
          new RegExp('@fortawesome\/[\\w]+-[\\w]+-svg-icons\/fa[\\w]+\.js')
        ]
      },
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
        },
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return id.toString().split('node_modules/')[1].split('/')[0].toString();
            }
          }
        }
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
      VitePWA(getPWAConfig({
        name: env.REACT_APP_TITLE,
        short_name: env.REACT_APP_SHORT_NAME,
        description: env.REACT_APP_DESCRIPTION
      })),
      splitVendorChunkPlugin()
    ],
    server: {
      host: process.env.HOST || 'localhost',
      // @ts-ignore
      /* https: (process.env.HTTPS && {
        key: fs.readFileSync(process.env.SSL_KEY_FILE),
        cert: fs.readFileSync(process.env.SSL_CRT_FILE),
      }), */
      // this ensures that the browser opens upon server start
      open: true,
      // this sets a default port to 3000
      port: process.env.PORT as unknown as number || 5173,
    }
  };
});
