import { type Config } from 'tailwindcss';

import plugin from 'tailwindcss/plugin';
import defaultTheme from 'tailwindcss/defaultTheme';
import headlessuiPlugin from '@headlessui/tailwindcss';
import typographyPlugin from '@tailwindcss/typography';
import tailwindcssAnimated from 'tailwindcss-animated';
import aspectRatioPlugin from '@tailwindcss/aspect-ratio';
import hideScrollbarPlugin from 'tailwind-scrollbar-hide';
import { heroui, commonColors, semanticColors } from '@heroui/theme';


const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: ['class', '[data-mode="dark"]'],
  theme: {
    extend: {
      borderColor: {
        DEFAULT: '#ff0000',
      },
      fontSize: {
        xs: '0.75rem',
      },
      spacing: {
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        18: '4.5rem',
        19: '4.75rem',
        21: '5.25rem',
        22: '5.5rem',
        23: '5.75rem',
        68: '17rem',
        76: '19rem',
        84: '21rem',
        88: '22rem',
        92: '23rem',
        128: '32rem',
        144: '36rem',
      },
      colors: {
        star: '#FFC107',
        dark: '#0A112D',
        ebony: '#07071A',
        black: '#191925',
        midnight: '#101720',
        obsidian: '#0B1215',
        'neutral-150': 'rgb(248, 248, 248)',
      },
      fontFamily: {
        sans: ['var(--font-inter)', ...defaultTheme.fontFamily.sans],
        roboto: ['var(--font-roboto)', ...defaultTheme.fontFamily.sans],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'pattern-grid-cell-light': 'url(\'/grid-cell-light.svg\')',
        'pattern-grid-cell-dark': 'url(\'/grid-cell-dark.svg\')',
        'counselor-cover-profile-1': 'url(\'/profile-covers/profile-cover-1.png\')',
        'counselor-cover-profile-2': 'url(\'/profile-covers/profile-cover-2.png\')',
        'counselor-cover-profile-3': 'url(\'/profile-covers/profile-cover-3.png\')',
      },
      backgroundSize: {
        '50%': '50%',
      },
      boxShadow: {
        'inner-sm': 'inset 0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'inner-md': 'inset 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'inner-lg': 'inset 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'inner-xl': 'inset 0 8px 10px -6px rgb(0 0 0 / 0.1)',
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
        },
        sploosh: {
          '0%': {
            boxShadow: '0 0 0 0px rgba(71, 225, 141, .7)',
            background: 'rgba(71, 225, 141, .7)'
          },
          '80%': {
            background: 'rgba(66, 166, 223, 0)'
          },
          '100%': {
            boxShadow: '0 0 0 4rem rgba(66, 166, 223, 0)'
          }
        },
        splooshr: {
          '0%': {
            boxShadow: '0 0 0 0px rgba(225, 71, 117, .7)',
            background: 'rgba(225,71,117,0.7)'
          },
          '80%': {
            background: 'rgba(225, 71, 117, 0)'
          },
          '100%': {
            boxShadow: '0 0 0 4rem rgba(225, 71, 117, 0)'
          }
        },
        'text-shimmer': {
          from: { backgroundPosition: '0 0' },
          to: { backgroundPosition: '-200% 0' },
        },
      },
      animation: {
        'navbar-move': 'navbar-move 0.15s ease-in-out',
        'sploosh-green': 'sploosh 2s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
        'sploosh-red': 'splooshr 2s cubic-bezier(0.165, 0.84, 0.44, 1) infinite',
        'text-shimmer': 'text-shimmer 2.5s ease-out infinite alternate',
      }
    },
  },
  plugins: [
    plugin(({ matchUtilities, theme }) => {
      matchUtilities(
        {
          'divide-pad': (value) => ({
            '&[class*="divide-x"] > *': {
              paddingLeft: value,
              paddingRight: value,
              '&:first-child': {
                paddingLeft: '0',
              },
              '&:last-child': {
                paddingRight: '0',
              },
            },
            '&[class*="divide-y"] > *': {
              paddingTop: value,
              paddingBottom: value,
              '&:first-child': {
                paddingTop: '0',
              },
              '&:last-child': {
                paddingBottom: '0',
              },
            },
          }),
        },
        {
          values: theme('spacing'),
        },
      );
    }),
    headlessuiPlugin,
    // formsPlugin,
    typographyPlugin,
    aspectRatioPlugin,
    hideScrollbarPlugin,
    tailwindcssAnimated,
    heroui({
      prefix: 'heroui', // prefix for themes variables
      addCommonColors: true,
      layout: {
        dividerWeight: '1px', // h-divider the default height applied to the divider component
        disabledOpacity: '0.3', // opacity-[0.3] // this value is applied as opacity-[value] when the component is disabled
        hoverOpacity: '1',
        fontSize: {
          tiny: '0.75rem', // text-tiny
          small: '0.875rem', // text-small
          medium: '1rem', // text-medium
          large: '1.125rem', // text-large
        },
        lineHeight: {
          tiny: '1rem', // text-tiny
          small: '1.25rem', // text-small
          medium: '1.5rem', // text-medium
          large: '1.75rem', // text-large
        },
        radius: {
          small: '4px', // rounded-small
          medium: '10px', // rounded-medium
          large: '14px', // rounded-large
        },
        borderWidth: {
          small: '1px', //small: '1px', // border-small
          medium: '1px', // medium: '2px', // border-medium (default)
          large: '2px', //large: '3px', // border-large
        },
      },
      themes: {
        light: {
          layout: {
            hoverOpacity: 0.8, //  this value is applied as opacity-[value] when the component is hovered
            boxShadow: {
              // shadow-small
              small:
                '0px 0px 5px 0px rgb(0 0 0 / 0.02), 0px 2px 10px 0px rgb(0 0 0 / 0.06), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
              // shadow-medium
              medium:
                '0px 0px 15px 0px rgb(0 0 0 / 0.03), 0px 2px 30px 0px rgb(0 0 0 / 0.08), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
              // shadow-large
              large:
                '0px 0px 30px 0px rgb(0 0 0 / 0.04), 0px 30px 60px 0px rgb(0 0 0 / 0.12), 0px 0px 1px 0px rgb(0 0 0 / 0.3)',
            },
          },
          colors: {
            ...semanticColors.light,
            // background: 'none'//'transparent'
            background: 'rgb(248, 248, 248)',
            default: {
              200: '#e9e8e9' // used as the default border color
            },
            primary: {
              50: '#e6f1fd',
              100: '#cce2fc',
              200: '#99c5f8',
              300: '#66a9f5',
              400: '#338cf1',
              500: '#006fee',
              600: '#0059be',
              700: '#00438f',
              800: '#002c5f',
              900: '#001630',
              DEFAULT: '#006fee',
              foreground: '#ffffff',
              // DEFAULT_v1: '#2a63fb',
              // DEFAULT_v2: '#006fee',
              // foreground: '#006fee'
            },
            success: {
              50: '#e6f9e7',
              100: '#ccf3d0',
              200: '#99e7a1',
              300: '#66da71',
              400: '#33ce42',
              500: '#00c213',
              600: '#009b0f',
              700: '#00740b',
              800: '#004e08',
              900: '#002704',
              DEFAULT: '#00c213',
              foreground: '#ffffff'
            },
            danger: {
              50: '#fef2f2',
              100: '#ffe1e1',
              200: '#ffc8c8',
              300: '#ffa2a2',
              400: '#fd6c6c',
              500: '#f53333',
              600: '#e31f1f',
              700: '#bf1616',
              800: '#9e1616',
              900: '#831919',
              DEFAULT: '#f53333',
              foreground: '#ffffff'
            }
          },
        },
        dark: {
          layout: {
            hoverOpacity: 0.9, //  this value is applied as opacity-[value] when the component is hovered
            boxShadow: {
              // shadow-small
              small:
                '0px 0px 5px 0px rgb(0 0 0 / 0.05), 0px 2px 10px 0px rgb(0 0 0 / 0.2), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
              // shadow-medium
              medium:
                '0px 0px 15px 0px rgb(0 0 0 / 0.06), 0px 2px 30px 0px rgb(0 0 0 / 0.22), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
              // shadow-large
              large:
                '0px 0px 30px 0px rgb(0 0 0 / 0.07), 0px 30px 60px 0px rgb(0 0 0 / 0.26), inset 0px 0px 1px 0px rgb(255 255 255 / 0.15)',
            },
          },
          colors: {
            ...semanticColors.dark,
            background: '#101720'
          },
        },
      },
    }),
  ],
};
export default config;
