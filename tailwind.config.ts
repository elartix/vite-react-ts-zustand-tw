import type { Config } from 'tailwindcss';

import { nextui } from '@nextui-org/react';
import formsPlugin from '@tailwindcss/forms';
import uiPlugin from '@headlessui/tailwindcss';
// @ts-ignore
import { fontFamily } from 'tailwindcss/defaultTheme';
import typographyPlugin from '@tailwindcss/typography';
import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
// @ts-ignore
import hideScrollbarPlugin from 'tailwind-scrollbar-hide';


const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      spacing: {
        '13': '3.25rem',
        '15': '3.75rem',
        '17': '4.25rem',
        '18': '4.5rem',
        '19': '4.75rem',
        '21': '5.25rem',
        '22': '5.5rem',
        '23': '5.75rem',
        '68': '17rem',
        '76': '19rem',
        '84': '21rem',
        '88': '22rem',
        '92': '23rem',
        '128': '32rem',
        '144': '36rem',
      },
      colors: {
        star: '#FFC107',
        dark: '#0A112D',
        ebony: '#07071A',
        'neutral-150': 'rgb(248, 248, 248)',
      },
      fontFamily: {
        sans: ['Inter', ...fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      backgroundSize: {
        '50%': '50%',
      },
      screens: {
        '3xl': '1600px',
      },
      maxHeight: {
        'screen-vh': 'calc(var(--vh, 1vh) * 100)',
      },
      minHeight: {
        'screen-vh': 'calc(var(--vh, 1vh) * 100)',
      },
      height: {
        'screen-vh': 'calc(var(--vh, 1vh) * 100)',
      },
      width: {
        'max-content': 'max-content',
      },
      minWidth: {
        screen: '100vw',
      },
      maxWidth: {
        screen: '100vw',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        'navbar-move': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0%)' },
        }
      },
      animation: {
        'navbar-move': 'navbar-move 0.15s ease-in-out',
      }
    },
  },
  plugins: [
    uiPlugin,
    // formsPlugin,
    typographyPlugin,
    aspectRatioPlugin,
    hideScrollbarPlugin,
    nextui({
      prefix: 'nsui', // prefix for themes variables
      themes: {
        light: {
          // ...
          colors: {
            // background: 'none'//'transparent'
            background: 'rgb(248, 248, 248)'
          },
        },
        dark: {
          // ...
          colors: {
            background: '#000'
          },
        },
        // ... custom themes
      },
    }),
  ],
};
export default config;
