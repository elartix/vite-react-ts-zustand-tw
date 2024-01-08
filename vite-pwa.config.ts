import { type VitePWAOptions } from 'vite-plugin-pwa';

export const PWAConfig: Partial<VitePWAOptions> = {
  includeAssets: [
    'favicon.svg',
    'favicon.ico',
    'robots.txt',
    'apple-touch-icon.png',
  ],
  manifest: {
    name: process.env.REACT_APP_NAME,
    short_name: process.env.REACT_APP_SHORT_NAME,
    description: process.env.REACT_APP_DESCRIPTION,
    theme_color: '#ffffff',
    start_url: '/',
    scope: '/',
    icons: [
      {
        src: 'icon-48x48.png',
        sizes: '48x48',
        type: 'image/png',
      },
      {
        src: 'icon-72x72.png',
        sizes: '72x72',
        type: 'image/png',
      },
      {
        src: 'icon-96x96.png',
        sizes: '96x96',
        type: 'image/png',
      },
      {
        src: 'icon-128x128.png',
        sizes: '128x128',
        type: 'image/png',
      },
      {
        src: 'icon-144x144.png',
        sizes: '144x144',
        type: 'image/png',
      },
      {
        src: 'icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      },
      {
        src: 'icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'icon-384x384.png',
        sizes: '284x284',
        type: 'image/png',
      },
      {
        src: 'icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  devOptions: {
    enabled: true,
  },
  workbox: {
    sourcemap: true,
  },
};

export const getPWAConfig = ({ name, short_name, description }): Partial<VitePWAOptions> => ({
  ...PWAConfig,
  manifest: {
    ...PWAConfig.manifest,
    name,
    short_name,
    description
  }
});
