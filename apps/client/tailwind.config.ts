// tailwind config is required for editor support

import type { Config } from 'tailwindcss';
import sharedConfig from '@repo/tailwind-config';

const config: Pick<Config, 'content' | 'presets' | 'theme'> = {
  content: ['./src/app/**/*.tsx'],
  presets: [sharedConfig],
  theme: {
    extend: {
      colors: {
        primary: '#DD231B',
        secondary: '#A8130A',
        button: {
          primary: {
            default: '#DD231B',
            pressed: '#A8130A',
            disabled: 'rgba(221, 35, 27, 0.5)',
          },
          secondary: {
            borderColorDefault: '#DD231B',
            borderColorPressed: '#A8130A',
            borderColorDisabled: 'rgba(221, 35, 27, 0.5)',
          },
        },
      },
    },
  },
};

export default config;
