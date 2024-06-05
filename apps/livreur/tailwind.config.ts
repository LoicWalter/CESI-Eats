// tailwind config is required for editor support

import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'content' | 'presets' | 'theme'> = {
  content: ['./src/app/**/*.tsx'],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        primary: '#49ADF4',
        secondary: '#005BC6',
        button: {
          primary: {
            default: '#49ADF4',
            pressed: '#005BC6',
            disabled: 'rgba(36, 124, 227, 0.5)',
          },
          secondary: {
            borderColorDefault: '#49ADF4',
            borderColorPressed: '#005BC6',
            borderColorDisabled: 'rgba(36, 124, 227, 0.5)',
          },
        },
      },
    },
  },
};

export default config;
